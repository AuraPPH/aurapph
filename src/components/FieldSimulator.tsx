import React, { useMemo, useState } from 'react';
import {
  ALERT_STATES,
  EMOTIVE_CHECKLIST,
  ILLUSTRATIVE_STAMP,
  LanguageCode,
  LightingCondition,
  SIMULATOR_MAX_ML,
  SIMULATOR_MIN_ML,
  SIMULATOR_PRESETS,
  computeSimulation,
  formatMl,
} from '../utils/triveni';
import { Modal } from './Modal';
import { PadVisual } from './PadVisual';

export const FieldSimulator: React.FC = () => {
  const [trueVolumeMl, setTrueVolumeMl] = useState<number>(430);
  const [lighting, setLighting] = useState<LightingCondition>('daylight');
  const [tilted, setTilted] = useState<boolean>(false);
  const [lang, setLang] = useState<LanguageCode>('en');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [protocolOpen, setProtocolOpen] = useState<boolean>(false);

  const result = useMemo(
    () => computeSimulation({ trueVolumeMl, lighting, tilted }),
    [trueVolumeMl, lighting, tilted]
  );

  const toggleStep = (id: string) => {
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="simulator"
      className="py-16 sm:py-20 border-b border-[#CFCAC0]"
      aria-labelledby="simulator-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Top Stamp */}
        <div className="border border-[#141716] bg-[#EAE6DC] px-4 py-2.5 mb-8 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.08em] uppercase text-[#141716]">
            PROTOTYPE SIMULATION — ILLUSTRATIVE RANGES ONLY · NOT CLINICALLY VALIDATED
          </span>
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525855]">
            FIG 7.1 — INTERACTIVE SPEC MOCKUP
          </span>
        </div>

        <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
          07 — FIELD SIMULATOR
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <h2
            id="simulator-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-normal text-[#141716] max-w-2xl"
          >
            Test how TRIVENI turns volume and field conditions into a range and action.
          </h2>
          <p className="text-sm text-[#525855] max-w-md leading-relaxed">
            Suboptimal lighting or capture tilt widens the bounded range rather than faking false
            precision. Notice there is no green state — low readings always keep monitoring active.
          </p>
        </div>

        {/* Grid: Output stacks ABOVE controls on mobile (< 768px), sits RIGHT of controls on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controls Column (bottom on mobile, left on desktop) */}
          <div className="order-2 md:order-1 md:col-span-7 border border-[#CFCAC0] bg-[#F4F2EC]">
            {/* Preset Scenarios */}
            <div className="p-5 sm:p-6 border-b border-[#CFCAC0]">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-3">
                PRESET SCENARIOS (DAYLIGHT · FLAT CAPTURE)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SIMULATOR_PRESETS.map((preset) => {
                  const isActive =
                    trueVolumeMl === preset.volumeMl && lighting === 'daylight' && !tilted;
                  const stateMeta = ALERT_STATES[preset.expectedState];
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setTrueVolumeMl(preset.volumeMl);
                        setLighting('daylight');
                        setTilted(false);
                        setCheckedSteps({});
                      }}
                      aria-pressed={isActive}
                      className={`min-h-[44px] px-3.5 py-2.5 border text-left font-mono text-xs tracking-[0.04em] transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                        isActive
                          ? 'border-[#141716] bg-[#141716] text-[#F4F2EC]'
                          : 'border-[#CFCAC0] bg-[#EAE6DC] text-[#141716] hover:border-[#141716]'
                      }`}
                    >
                      <span className="tabular-nums">{preset.label}</span>
                      <span
                        className="w-3 h-3 shrink-0 border border-[#141716]/30"
                        style={{ backgroundColor: stateMeta.colorHex }}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume Slider */}
            <div className="p-5 sm:p-6 border-b border-[#CFCAC0]">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <label
                  htmlFor="sim-volume-slider"
                  className="font-mono text-xs tracking-[0.08em] uppercase text-[#141716] font-medium"
                >
                  True blood volume (simulated input)
                </label>
                <span
                  data-testid="sim-input-volume"
                  className="font-mono text-lg font-semibold tabular-nums text-[#141716]"
                >
                  {formatMl(trueVolumeMl)} mL
                </span>
              </div>
              <input
                id="sim-volume-slider"
                type="range"
                min={SIMULATOR_MIN_ML}
                max={SIMULATOR_MAX_ML}
                step={10}
                value={trueVolumeMl}
                onChange={(e) => setTrueVolumeMl(Number(e.target.value))}
                className="spec-slider"
              />
              <div className="flex justify-between font-mono text-[11px] text-[#525855] tabular-nums mt-1">
                <span>100 mL</span>
                <span>350</span>
                <span>500</span>
                <span>1,000</span>
                <span>1,400 mL</span>
              </div>
            </div>

            {/* Condition Toggle Chips */}
            <div className="p-5 sm:p-6 border-b border-[#CFCAC0]">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-3">
                CAPTURE CONDITIONS (WIDENS BOUNDED UNCERTAINTY)
              </p>
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="Capture conditions">
                <button
                  type="button"
                  onClick={() => setLighting('daylight')}
                  aria-pressed={lighting === 'daylight'}
                  className={`min-h-[44px] px-4 border font-mono text-xs tracking-[0.06em] uppercase transition-colors cursor-pointer ${
                    lighting === 'daylight'
                      ? 'border-[#141716] bg-[#141716] text-[#F4F2EC]'
                      : 'border-[#CFCAC0] bg-[#F4F2EC] text-[#141716] hover:border-[#141716]'
                  }`}
                >
                  Daylight
                </button>
                <button
                  type="button"
                  onClick={() => setLighting((prev) => (prev === 'dim' ? 'daylight' : 'dim'))}
                  aria-pressed={lighting === 'dim'}
                  className={`min-h-[44px] px-4 border font-mono text-xs tracking-[0.06em] uppercase transition-colors cursor-pointer ${
                    lighting === 'dim'
                      ? 'border-[#141716] bg-[#141716] text-[#F4F2EC]'
                      : 'border-[#CFCAC0] bg-[#F4F2EC] text-[#141716] hover:border-[#141716]'
                  }`}
                >
                  Dim Room {lighting === 'dim' ? '(+5%)' : ''}
                </button>
                <button
                  type="button"
                  onClick={() => setTilted((prev) => !prev)}
                  aria-pressed={tilted}
                  className={`min-h-[44px] px-4 border font-mono text-xs tracking-[0.06em] uppercase transition-colors cursor-pointer ${
                    tilted
                      ? 'border-[#141716] bg-[#141716] text-[#F4F2EC]'
                      : 'border-[#CFCAC0] bg-[#F4F2EC] text-[#141716] hover:border-[#141716]'
                  }`}
                >
                  Tilted Capture {tilted ? '(+6%)' : ''}
                </button>
              </div>
              <p className="mt-3 font-mono text-[11px] text-[#525855] tabular-nums">
                CURRENT HALF-WIDTH SPREAD: ±{result.spreadPct}% · MIDPOINT: {formatMl(result.midpointMl)} mL
              </p>
            </div>

            {/* State Threshold Reference Ledger */}
            <div className="p-5 sm:p-6 bg-[#EAE6DC]">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-3">
                FOUR-STATE THRESHOLD SPECIFICATION (NO GREEN STATE)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[#CFCAC0]">
                {(['BLUE', 'AMBER', 'RED', 'DARK_RED'] as const).map((id) => {
                  const s = ALERT_STATES[id];
                  const active = result.state.id === id;
                  return (
                    <div
                      key={id}
                      className={`p-3 border-r border-b border-[#CFCAC0] ${
                        active ? 'bg-[#F4F2EC]' : 'bg-[#EAE6DC]'
                      }`}
                    >
                      <span
                        className="inline-block font-mono text-[10px] font-semibold tracking-[0.08em] px-1.5 py-0.5"
                        style={{ backgroundColor: s.colorHex, color: s.textColorHex }}
                      >
                        {s.labelEn}
                      </span>
                      <p className="font-mono text-xs text-[#141716] mt-2 tabular-nums">
                        {s.thresholdRule}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Phone Output Mockup (TOP on mobile, RIGHT on desktop) */}
          <div className="order-1 md:order-2 md:col-span-5">
            <div
              data-testid="simulator-phone"
              data-state={result.state.id}
              className="border border-[#141716] bg-[#F4F2EC]"
            >
              {/* Phone Top Status Bar */}
              <div className="px-4 py-2.5 bg-[#141716] text-[#F4F2EC] flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase">
                  AURAPPH · OFFLINE
                </span>
                <div
                  className="inline-flex border border-[#525855]"
                  role="group"
                  aria-label="Phone display language"
                >
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    aria-pressed={lang === 'en'}
                    className={`min-h-[44px] min-w-[44px] px-3 font-mono text-xs cursor-pointer ${
                      lang === 'en'
                        ? 'bg-[#F4F2EC] text-[#141716] font-semibold'
                        : 'bg-[#141716] text-[#CFCAC0] hover:text-[#F4F2EC]'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('hi')}
                    aria-pressed={lang === 'hi'}
                    className={`min-h-[44px] min-w-[48px] px-3 text-xs cursor-pointer border-l border-[#525855] ${
                      lang === 'hi'
                        ? 'bg-[#F4F2EC] text-[#141716] font-semibold'
                        : 'bg-[#141716] text-[#CFCAC0] hover:text-[#F4F2EC]'
                    }`}
                    style={{ fontFamily: 'var(--font-hindi)' }}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              {/* Mandatory Illustrative Stamp */}
              <div className="px-4 py-2 bg-[#EAE6DC] border-b border-[#CFCAC0]">
                <p className="font-mono text-[10px] tracking-[0.09em] uppercase text-[#525855] text-center">
                  {ILLUSTRATIVE_STAMP}
                </p>
              </div>

              {/* Interactive Layered Maternity Pad Visual */}
              <PadVisual volumeMl={trueVolumeMl} lighting={lighting} tilted={tilted} />

              {/* Primary Readout: Range + State */}
              <div className="p-5 border-b border-[#CFCAC0]">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#525855]">
                    {lang === 'en' ? 'ESTIMATED RANGE' : 'अनुमानित रक्तस्राव सीमा'}
                  </span>
                  <span
                    data-testid="simulator-state-chip"
                    className="font-mono text-xs font-semibold tracking-[0.08em] px-2.5 py-1"
                    style={{
                      backgroundColor: result.state.colorHex,
                      color: result.state.textColorHex,
                      fontFamily: lang === 'hi' ? 'var(--font-hindi)' : 'var(--font-mono)',
                    }}
                  >
                    {lang === 'en' ? result.state.labelEn : result.state.labelHi}
                  </span>
                </div>

                <p
                  data-testid="simulator-range-output"
                  className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-[#141716] tabular-nums"
                >
                  {result.rangeLabel}
                </p>

                <p
                  data-testid="simulator-state-subline"
                  className="mt-2.5 text-sm font-medium text-[#141716] leading-snug"
                  style={{ fontFamily: lang === 'hi' ? 'var(--font-hindi)' : 'var(--font-sans)' }}
                >
                  {lang === 'en' ? result.state.sublineEn : result.state.sublineHi}
                </p>

                <p className="mt-2 font-mono text-[10px] tracking-[0.06em] uppercase text-[#525855]">
                  CONDITIONS: {lighting === 'daylight' ? 'DAYLIGHT' : 'DIM ROOM'} ·{' '}
                  {tilted ? 'TILTED CAPTURE' : 'FLAT CAPTURE'}
                </p>
              </div>

              {/* Action Checklist (AMBER / RED / DARK RED) or Monitoring Ledger (BLUE) */}
              <div className="p-5">
                {result.showChecklist ? (
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#525855] mb-3">
                      {lang === 'en'
                        ? 'E-MOTIVE FIRST-RESPONSE BUNDLE'
                        : 'E-MOTIVE प्राथमिक उपचार सूची'}
                    </p>
                    <ul className="divide-y divide-[#CFCAC0] border-t border-b border-[#CFCAC0]">
                      {EMOTIVE_CHECKLIST.map((item) => {
                        const checked = !!checkedSteps[item.id];
                        return (
                          <li key={item.id}>
                            <label className="flex items-center gap-3 min-h-[44px] py-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleStep(item.id)}
                                className="w-4 h-4 accent-[#141716] shrink-0"
                              />
                              <span className="font-mono text-[11px] text-[#525855] tabular-nums shrink-0">
                                {item.step}
                              </span>
                              <span
                                className={`text-sm ${
                                  checked ? 'line-through text-[#525855]' : 'text-[#141716] font-medium'
                                }`}
                                style={{
                                  fontFamily:
                                    lang === 'hi' ? 'var(--font-hindi)' : 'var(--font-sans)',
                                }}
                              >
                                {lang === 'en' ? item.en : item.hi}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <div className="border border-[#CFCAC0] bg-[#EAE6DC] p-4">
                    <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#1D5B8C] font-semibold mb-1.5">
                      {lang === 'en' ? 'ACTIVE SURVEILLANCE' : 'सक्रिय निगरानी'}
                    </p>
                    <p
                      className="text-sm text-[#141716] leading-relaxed"
                      style={{
                        fontFamily: lang === 'hi' ? 'var(--font-hindi)' : 'var(--font-sans)',
                      }}
                    >
                      {lang === 'en'
                        ? 'No reading is ever marked safe or all-clear. Re-check pad and maternal vitals every 15 minutes during the first hour.'
                        : 'कोई भी माप "सुरक्षित" नहीं माना जाता। पहले घंटे में हर 15 मिनट में पैड और वाइटल्स की जाँच करें।'}
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-[#CFCAC0] flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#525855]">
                    STICKY ESCALATION ENABLED
                  </span>
                  <button
                    type="button"
                    onClick={() => setProtocolOpen(true)}
                    className="min-h-[44px] px-4 border border-[#141716] bg-[#F4F2EC] hover:bg-[#141716] hover:text-[#F4F2EC] text-[#141716] font-mono text-xs tracking-[0.06em] uppercase transition-colors cursor-pointer"
                  >
                    View protocol
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Modal */}
      <Modal
        open={protocolOpen}
        onClose={() => setProtocolOpen(false)}
        eyebrow="PROTOTYPE ACTION REFERENCE · E-MOTIVE BUNDLE"
        title="First-response PPH checklist"
      >
        <div className="border border-[#B81D24] bg-[#EAE6DC] px-4 py-3 mb-5">
          <p className="font-mono text-xs font-semibold tracking-[0.06em] uppercase text-[#B81D24]">
            Illustrative only — not medical advice.
          </p>
          <p className="text-xs text-[#141716] mt-1">
            AuraPPH is a student research prototype and is not a certified medical device. Always
            follow facility obstetric protocols and qualified clinical judgement.
          </p>
        </div>

        <ol className="divide-y divide-[#CFCAC0] border-t border-b border-[#CFCAC0]">
          {EMOTIVE_CHECKLIST.map((item) => (
            <li key={item.id} className="py-3.5 flex items-start gap-4">
              <span className="font-mono text-xs font-semibold text-[#525855] pt-0.5 tabular-nums">
                {item.step}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#141716]">{item.en}</p>
                <p
                  className="text-xs text-[#525855] mt-0.5"
                  style={{ fontFamily: 'var(--font-hindi)' }}
                >
                  {item.hi}
                </p>
                <p className="text-sm text-[#525855] mt-1 leading-relaxed">{item.detailEn}</p>
              </div>
            </li>
          ))}
        </ol>
      </Modal>
    </section>
  );
};
