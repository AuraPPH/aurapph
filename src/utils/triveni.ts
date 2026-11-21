export type AlertStateId = 'BLUE' | 'AMBER' | 'RED' | 'DARK_RED';

export type LightingCondition = 'daylight' | 'dim';

export type LanguageCode = 'en' | 'hi';

export interface AlertStateMeta {
  id: AlertStateId;
  labelEn: string;
  labelHi: string;
  sublineEn: string;
  sublineHi: string;
  colorHex: string;
  textColorHex: string;
  thresholdRule: string;
}

export interface ChecklistItem {
  id: string;
  step: string;
  en: string;
  hi: string;
  detailEn: string;
}

export interface SimulationInput {
  trueVolumeMl: number;
  lighting: LightingCondition;
  tilted: boolean;
}

export interface SimulationResult {
  lowMl: number;
  highMl: number;
  midpointMl: number;
  spreadPct: number;
  rangeLabel: string;
  state: AlertStateMeta;
  showChecklist: boolean;
}

export interface PresetScenario {
  id: string;
  label: string;
  volumeMl: number;
  expectedState: AlertStateId;
}

export const ILLUSTRATIVE_STAMP = 'ILLUSTRATIVE — NOT A REAL MEASUREMENT';

/**
 * TRIVENI Hard Rule 1:
 * Exactly four states: BLUE, AMBER, RED, DARK RED.
 * Never green. Never "safe", "normal", or "all clear".
 */
export const ALERT_STATES: Record<AlertStateId, AlertStateMeta> = {
  BLUE: {
    id: 'BLUE',
    labelEn: 'BLUE',
    labelHi: 'नीला (BLUE)',
    sublineEn: 'Below threshold so far — keep monitoring',
    sublineHi: 'अभी सीमा से नीचे — निगरानी जारी रखें',
    colorHex: '#1D5B8C',
    textColorHex: '#F4F2EC',
    thresholdRule: '< 350 mL',
  },
  AMBER: {
    id: 'AMBER',
    labelEn: 'AMBER',
    labelHi: 'अंबर (AMBER)',
    sublineEn: 'Approaching PPH threshold — start first-response bundle',
    sublineHi: 'PPH सीमा के निकट — प्राथमिक उपचार शुरू करें',
    colorHex: '#C88A1E',
    textColorHex: '#141716',
    thresholdRule: '350–500 mL',
  },
  RED: {
    id: 'RED',
    labelEn: 'RED',
    labelHi: 'लाल (RED)',
    sublineEn: 'PPH threshold crossed — execute E-MOTIVE bundle now',
    sublineHi: 'PPH सीमा पार — तुरंत E-MOTIVE उपचार शुरू करें',
    colorHex: '#B81D24',
    textColorHex: '#F4F2EC',
    thresholdRule: '500–1,000 mL',
  },
  DARK_RED: {
    id: 'DARK_RED',
    labelEn: 'DARK RED',
    labelHi: 'गहरा लाल (DARK RED)',
    sublineEn: 'Severe PPH range — emergency escalation + transfer',
    sublineHi: 'गंभीर रक्तस्राव सीमा — आपातकालीन सहायता व रेफरल',
    colorHex: '#6E0E14',
    textColorHex: '#F4F2EC',
    thresholdRule: '> 1,000 mL',
  },
};

export const EMOTIVE_CHECKLIST: ChecklistItem[] = [
  {
    id: 'massage',
    step: '01',
    en: 'Uterine massage',
    hi: 'गर्भाशय की मालिश करें (Uterine massage)',
    detailEn: 'Perform sustained bimanual or fundal uterine massage until firm.',
  },
  {
    id: 'oxytocin',
    step: '02',
    en: 'Oxytocin',
    hi: 'ऑक्सीटोसिन दें (Oxytocin)',
    detailEn: 'Administer uterotonic drug per facility standing orders.',
  },
  {
    id: 'txa',
    step: '03',
    en: 'TXA within 3 hours',
    hi: '3 घंटे के भीतर TXA दें',
    detailEn: 'Tranexamic acid 1 g IV as early as possible within 3 hours of birth.',
  },
  {
    id: 'iv-fluids',
    step: '04',
    en: 'IV fluids',
    hi: 'IV फ्लूइड्स शुरू करें',
    detailEn: 'Establish wide-bore IV access and begin isotonic crystalloid infusion.',
  },
  {
    id: 'examine',
    step: '05',
    en: 'Examine',
    hi: 'जाँच करें (गर्भाशय, नाल, चोट)',
    detailEn: 'Check genital tract for tears, retained placental tissue, and bladder distension.',
  },
  {
    id: 'call-refer',
    step: '06',
    en: 'Call / refer',
    hi: 'वरिष्ठ डॉक्टर को बुलाएं / रेफर करें',
    detailEn: 'Activate senior clinician, blood bank alert, or emergency obstetric referral.',
  },
];

export const SIMULATOR_MIN_ML = 100;
export const SIMULATOR_MAX_ML = 1400;

export function formatMl(value: number): string {
  return Math.round(value).toLocaleString('en-US');
}

export function classifyStateByMidpoint(midpointMl: number): AlertStateId {
  if (midpointMl < 350) return 'BLUE';
  if (midpointMl <= 500) return 'AMBER';
  if (midpointMl <= 1000) return 'RED';
  return 'DARK_RED';
}

/**
 * Computes an illustrative TRIVENI blood-loss range from a simulated true volume
 * and capture conditions. Always returns a range (never a single mL value).
 */
export function computeSimulation(input: SimulationInput): SimulationResult {
  const clamped = Math.max(SIMULATOR_MIN_ML, Math.min(SIMULATOR_MAX_ML, input.trueVolumeMl));

  // Base half-width ~11.5% (~12% per spec); widens under suboptimal capture conditions.
  let halfWidthFraction = 0.115;
  if (input.lighting === 'dim') {
    halfWidthFraction += 0.05;
  }
  if (input.tilted) {
    halfWidthFraction += 0.06;
  }

  const rawLow = clamped * (1 - halfWidthFraction);
  const rawHigh = clamped * (1 + halfWidthFraction);

  let lowMl = Math.max(50, Math.round(rawLow / 10) * 10);
  let highMl = Math.round(rawHigh / 10) * 10;

  // Guarantee a strict range (never a single number)
  if (highMl <= lowMl) {
    highMl = lowMl + 20;
  }

  const midpointMl = Math.round((lowMl + highMl) / 2);
  const stateId = classifyStateByMidpoint(midpointMl);
  const state = ALERT_STATES[stateId];

  return {
    lowMl,
    highMl,
    midpointMl,
    spreadPct: Math.round(halfWidthFraction * 100),
    rangeLabel: `${formatMl(lowMl)}–${formatMl(highMl)} mL`,
    state,
    showChecklist: stateId !== 'BLUE',
  };
}

export const SIMULATOR_PRESETS: PresetScenario[] = [
  {
    id: 'preset-blue',
    label: '250–320 mL · BLUE',
    volumeMl: 285,
    expectedState: 'BLUE',
  },
  {
    id: 'preset-amber',
    label: '380–480 mL · AMBER',
    volumeMl: 430,
    expectedState: 'AMBER',
  },
  {
    id: 'preset-red',
    label: '600–750 mL · RED',
    volumeMl: 675,
    expectedState: 'RED',
  },
  {
    id: 'preset-darkred',
    label: '1,020–1,280 mL · DARK RED',
    volumeMl: 1150,
    expectedState: 'DARK_RED',
  },
];

export function shouldShowUnderestimationInsight(
  hasAdjustedGuess: boolean,
  hasRevealedTriveni: boolean
): boolean {
  return hasAdjustedGuess && hasRevealedTriveni;
}
