import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TopBar } from './components/TopBar';
import { SplitViewfinder } from './components/SplitViewfinder';
import { ProblemSection } from './components/ProblemSection';
import { TriveniSection } from './components/TriveniSection';
import { ScopeSection } from './components/ScopeSection';
import { FieldSimulator } from './components/FieldSimulator';
import { PrivacySection } from './components/PrivacySection';
import { ValidationSection } from './components/ValidationSection';
import { DownloadAndTeam } from './components/DownloadAndTeam';
import { Toast } from './components/Toast';
import { useInViewOnce } from './hooks/useInView';

const STATUS_LEDGER_ROWS = [
  { item: 'App design + algorithm spec', status: 'DONE', emphasis: 'done' as const },
  { item: 'Android app', status: 'IN DEVELOPMENT', emphasis: 'active' as const },
  { item: 'Bench validation', status: 'PLANNED', emphasis: 'pending' as const },
  { item: 'Clinical testing', status: 'NOT STARTED', emphasis: 'pending' as const },
  { item: 'APK download', status: 'NOT AVAILABLE YET', emphasis: 'pending' as const },
];

const FIELD_PRINCIPLES = [
  {
    index: '01',
    title: 'No internet permission',
    body: 'Designed for labour rooms with zero cell coverage. Runs 100% offline with no network stack or cloud dependency.',
  },
  {
    index: '02',
    title: 'No black-box AI — auditable formulas only',
    body: 'Every optical ratio, area factor, and escalation rule can be inspected, audited, and calibrated by hand.',
  },
  {
    index: '03',
    title: 'Works on budget Android phones',
    body: 'Native Kotlin + OpenCV targeted at Android 9+ devices with ~2 GB RAM — the phone a nurse already carries.',
  },
  {
    index: '04',
    title: 'Hindi · Gujarati · English, big touch targets',
    body: 'Clear Devanagari readouts, pre-recorded voice guidance in three languages, and ≥48 dp gloved-hand controls.',
  },
];

const TIMELINE_STEPS = [
  {
    time: 'T + 00 MIN',
    title: 'Birth',
    note: 'Third stage of labour completes; routine postpartum monitoring begins.',
  },
  {
    time: 'T + 15 MIN',
    title: 'First pad check',
    note: 'Absorbent pads conceal soaked volume beneath a smaller surface stain.',
  },
  {
    time: 'T + 35 MIN',
    title: '500 mL can pass unnoticed',
    note: 'Eyeball guesses under-read loss by 33–50%, delaying first-response treatment.',
  },
  {
    time: 'T + 60–90 MIN',
    title: 'The golden window closes',
    note: 'Without early measurement and E-MOTIVE intervention, hypovolaemic shock accelerates.',
  },
];

const RevealWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, isVisible } = useInViewOnce<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className="reveal-block" data-visible={isVisible ? 'true' : 'false'}>
      {children}
    </div>
  );
};

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showApkToast = useCallback(() => {
    setToastMessage('The APK is in bench calibration. This button will go live only after validation.');
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToastMessage(null);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return (
    <div id="top" className="min-h-screen bg-[#F4F2EC] text-[#141716]">
      {/* 1. Top Bar */}
      <TopBar />

      <main>
        {/* 2. Hero */}
        <section className="pt-8 sm:pt-10 pb-14 sm:pb-16 border-b border-[#CFCAC0]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#B81D24] font-medium mb-3">
              OFFLINE ANDROID · ZERO AI · ZERO SERVERS
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] leading-[1.06] font-normal tracking-[-0.015em] text-[#141716] max-w-4xl">
              Mothers don&apos;t die from lack of care. They die from a{' '}
              <span className="italic">50% guess.</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#525855] leading-relaxed max-w-2xl">
              AuraPPH turns one photo of a maternity pad into a blood-loss range and the action to
              take next — on the phone a nurse already owns, with no internet at all.
            </p>

            {/* Primary + Secondary CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#simulator"
                className="min-h-[44px] px-6 inline-flex items-center justify-center bg-[#B81D24] text-[#F4F2EC] hover:bg-[#6E0E14] transition-colors font-mono text-xs font-semibold tracking-[0.08em] uppercase"
              >
                Try the simulator
              </a>
              <a
                href="#triveni"
                className="min-h-[44px] px-6 inline-flex items-center justify-center border border-[#141716] bg-[#F4F2EC] text-[#141716] hover:bg-[#141716] hover:text-[#F4F2EC] transition-colors font-mono text-xs font-semibold tracking-[0.08em] uppercase"
              >
                Read the TRIVENI method
              </a>
            </div>

            {/* Mono Telemetry Strip */}
            <div className="mt-6 border-t border-b border-[#CFCAC0] py-2.5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] sm:text-xs tracking-[0.08em] uppercase text-[#141716]">
              <span>INTERNET PERMISSION: NONE</span>
              <span className="text-[#CFCAC0]" aria-hidden="true">
                ·
              </span>
              <span>COMPUTE: 100% ON-DEVICE</span>
              <span className="text-[#CFCAC0]" aria-hidden="true">
                ·
              </span>
              <span>COST: ₹0</span>
            </div>

            {/* Split-Reality Viewfinder */}
            <SplitViewfinder />
          </div>
        </section>

        {/* 3. Status Ledger — WHAT EXISTS TODAY */}
        <section
          id="status"
          className="py-14 sm:py-16 border-b border-[#CFCAC0] bg-[#EAE6DC]"
          aria-labelledby="status-heading"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-2">
                  01 — WHAT EXISTS TODAY
                </p>
                <h2
                  id="status-heading"
                  className="font-serif text-2xl sm:text-3xl font-normal text-[#141716]"
                >
                  Honest pre-release ledger.
                </h2>
              </div>
              <p className="font-mono text-xs text-[#525855]">
                NO FINISHED APK · NO VALIDATION DATA YET
              </p>
            </div>

            <div className="border border-[#CFCAC0] bg-[#F4F2EC] overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#CFCAC0] bg-[#EAE6DC]">
                    <th className="py-3 px-4 sm:px-6 font-mono text-[11px] tracking-[0.1em] uppercase text-[#525855] font-medium">
                      COMPONENT
                    </th>
                    <th className="py-3 px-4 sm:px-6 font-mono text-[11px] tracking-[0.1em] uppercase text-[#525855] font-medium text-right">
                      CURRENT STATUS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CFCAC0]">
                  {STATUS_LEDGER_ROWS.map((row) => (
                    <tr key={row.item}>
                      <td className="py-3.5 px-4 sm:px-6 text-sm sm:text-base text-[#141716] font-medium">
                        {row.item}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <span
                          className={`inline-block font-mono text-[11px] tracking-[0.08em] uppercase px-2.5 py-1 border ${
                            row.emphasis === 'done'
                              ? 'bg-[#141716] text-[#F4F2EC] border-[#141716]'
                              : row.emphasis === 'active'
                              ? 'bg-[#EAE6DC] text-[#141716] border-[#141716]'
                              : 'bg-[#F4F2EC] text-[#525855] border-[#CFCAC0]'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. The Problem */}
        <ProblemSection />

        {/* 5. Built for the field */}
        <section
          id="field"
          className="py-16 sm:py-20 border-b border-[#CFCAC0]"
          aria-labelledby="field-heading"
        >
          <RevealWrapper>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
                03 — BUILT FOR THE FIELD
              </p>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <h2
                  id="field-heading"
                  className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-normal text-[#141716] max-w-xl"
                >
                  Engineered for ASHA, ANM, and rural labour rooms.
                </h2>
                <div className="border border-[#CFCAC0] bg-[#EAE6DC] px-5 py-3.5">
                  <p
                    className="text-xl sm:text-2xl font-medium text-[#141716]"
                    style={{ fontFamily: 'var(--font-hindi)' }}
                  >
                    अंदाज़ा नहीं, माप।
                  </p>
                  <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525855] mt-1">
                    Not a guess. A measurement.
                  </p>
                </div>
              </div>

              {/* 2×2 Hairline Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#CFCAC0]">
                {FIELD_PRINCIPLES.map((cell) => (
                  <div
                    key={cell.index}
                    className="p-6 sm:p-8 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]"
                  >
                    <span className="font-mono text-xs text-[#525855] tabular-nums">
                      {cell.index}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#141716] mt-2 mb-3">
                      {cell.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#525855] leading-relaxed">
                      {cell.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </section>

        {/* 6. How it works */}
        <section
          id="how-it-works"
          className="py-16 sm:py-20 border-b border-[#CFCAC0] bg-[#EAE6DC]"
          aria-labelledby="how-heading"
        >
          <RevealWrapper>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
                04 — HOW IT WORKS
              </p>
              <h2
                id="how-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-normal text-[#141716] mb-6"
              >
                Three steps at the bedside.
              </h2>

              <div className="border border-[#141716] bg-[#F4F2EC] mb-10">
                <div className="flex items-center justify-between border-b border-[#141716] px-4 py-2.5">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-[#141716]">
                    Film — How a reading works
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#525855]">
                    80 sec · 16:9 · Sound on
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_420px]">
                  <div className="p-6 sm:p-8">
                    <p className="text-[15px] text-[#525855] leading-relaxed max-w-[52ch]">
                      The full flow, start to finish: lay the pad beside the card, capture the
                      flash / no-flash pair, and read the range, the state and the next action —
                      exactly as it happens at the bedside. No internet, no account, nothing
                      leaves the phone.
                    </p>
                    <div className="mt-8 border-t border-[#CFCAC0]">
                      <div className="flex items-baseline gap-4 py-3 border-b border-[#CFCAC0]">
                        <span className="font-mono text-xs font-semibold text-[#B81D24]">0:00</span>
                        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#141716] w-24 shrink-0">
                          Capture
                        </span>
                        <span className="text-sm text-[#525855]">Pad + card, flash pair, frame lock</span>
                      </div>
                      <div className="flex items-baseline gap-4 py-3 border-b border-[#CFCAC0]">
                        <span className="font-mono text-xs font-semibold text-[#B81D24]">0:24</span>
                        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#141716] w-24 shrink-0">
                          Triveni
                        </span>
                        <span className="text-sm text-[#525855]">Optics · Amount · Clinical Ledger</span>
                      </div>
                      <div className="flex items-baseline gap-4 py-3">
                        <span className="font-mono text-xs font-semibold text-[#B81D24]">0:48</span>
                        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#141716] w-24 shrink-0">
                          Result
                        </span>
                        <span className="text-sm text-[#525855]">Range · state · E-MOTIVE checklist</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:border-l border-t md:border-t-0 border-[#141716] bg-[#EAE6DC] flex items-center">
                    <video
                      className="w-full aspect-video block"
                      controls
                      preload="metadata"
                      playsInline
                      poster="/src/assets/how-to-use-poster.jpg"
                      aria-label="How to use AuraPPH — 80 second explainer film"
                    >
                      <source src="/src/assets/how-to-use.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#CFCAC0]">
                {/* Step 1 */}
                <div className="p-6 sm:p-8 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-semibold tracking-[0.12em] text-[#525855]">
                      STEP 01
                    </span>
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <rect x="4" y="10" width="22" height="24" stroke="#141716" strokeWidth="1.5" />
                      <polygon points="10,16 20,15 21,26 11,27" fill="#B81D24" />
                      <rect x="30" y="12" width="10" height="20" fill="#EAE6DC" stroke="#141716" strokeWidth="1.5" />
                      <rect x="32" y="14" width="3" height="3" fill="#141716" />
                      <rect x="32" y="27" width="3" height="3" fill="#141716" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#141716] leading-snug">
                    Place the printed reference card beside the pad.
                  </h3>
                  <p className="mt-3 text-sm text-[#525855] leading-relaxed">
                    A laminated black-and-greyscale calibration card sets exact millimeter scale and
                    ambient white balance with zero special hardware.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-6 sm:p-8 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-semibold tracking-[0.12em] text-[#525855]">
                      STEP 02
                    </span>
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <rect x="6" y="8" width="32" height="28" stroke="#141716" strokeWidth="1.5" />
                      <circle cx="22" cy="22" r="7" stroke="#141716" strokeWidth="1.5" />
                      <path d="M22 12V15M22 29V32M12 22H15M29 22H32" stroke="#B81D24" strokeWidth="1.5" />
                      <path d="M31 11L35 11" stroke="#141716" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#141716] leading-snug">
                    Capture — flash + no-flash photo pair, on-device.
                  </h3>
                  <p className="mt-3 text-sm text-[#525855] leading-relaxed">
                    Camera2 captures two frames back-to-back, computes deterministic optical and
                    area features in RAM, and deletes the raw images immediately.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-6 sm:p-8 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-semibold tracking-[0.12em] text-[#525855]">
                      STEP 03
                    </span>
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                      <rect x="10" y="4" width="24" height="36" stroke="#141716" strokeWidth="1.5" />
                      <rect x="14" y="10" width="16" height="5" fill="#C88A1E" />
                      <line x1="14" y1="21" x2="30" y2="21" stroke="#141716" strokeWidth="1.5" />
                      <line x1="14" y1="27" x2="26" y2="27" stroke="#141716" strokeWidth="1.5" />
                      <line x1="14" y1="33" x2="28" y2="33" stroke="#141716" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#141716] leading-snug">
                    Read the range + state + next action.
                  </h3>
                  <p className="mt-3 text-sm text-[#525855] leading-relaxed">
                    The screen shows a bounded mL range, one of four alert states, and the matching
                    E-MOTIVE action checklist with voice prompts.
                  </p>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </section>

        {/* 7. TRIVENI */}
        <TriveniSection />

        {/* 7b. Scope & Limits */}
        <ScopeSection />

        {/* 8. Ninety Minutes */}
        <section
          id="ninety-minutes"
          className="py-16 sm:py-20 border-b border-[#CFCAC0] bg-[#EAE6DC]"
          aria-labelledby="ninety-heading"
        >
          <RevealWrapper>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
                07 — NINETY MINUTES
              </p>
              <h2
                id="ninety-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-normal text-[#141716] mb-10"
              >
                How an unmeasured haemorrhage unfolds.
              </h2>

              {/* Static 4-step horizontal timeline (stacks vertically on mobile) */}
              <ol className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-[#CFCAC0]">
                {TIMELINE_STEPS.map((step, idx) => (
                  <li
                    key={step.title}
                    className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC] flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-xs font-semibold tracking-[0.08em] text-[#525855] tabular-nums">
                          {step.time}
                        </span>
                        <span
                          className={`font-mono text-[11px] font-semibold tabular-nums ${
                            idx >= 2 ? 'text-[#B81D24]' : 'text-[#525855]'
                          }`}
                        >
                          0{idx + 1} / 04
                        </span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#141716] leading-snug">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#525855] leading-relaxed">{step.note}</p>
                  </li>
                ))}
              </ol>

              <p className="mt-6 font-serif italic text-xl sm:text-2xl text-[#141716]">
                PPH kills fast. The first hour decides.
              </p>
            </div>
          </RevealWrapper>
        </section>

        {/* 9. Field Simulator */}
        <FieldSimulator />

        {/* 10. Privacy & Engineering (The ONE dark section) */}
        <PrivacySection />

        {/* 11. Validation — Proof, in progress */}
        <ValidationSection />

        {/* 12, 13, 14. Download, Team & Footer */}
        <DownloadAndTeam onShowApkToast={showApkToast} />
      </main>

      <Toast message={toastMessage} onDismiss={dismissToast} />
    </div>
  );
}
