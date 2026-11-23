import React from 'react';
import { useInViewOnce } from '../hooks/useInView';

export const TriveniSection: React.FC = () => {
  const { ref, isVisible } = useInViewOnce<HTMLElement>(0.2);

  return (
    <section
      id="triveni"
      ref={ref}
      className="py-16 sm:py-20 border-b border-[#CFCAC0]"
      aria-labelledby="triveni-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
          05 — THE TRIVENI METHOD
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <h2
            id="triveni-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] font-normal text-[#141716]"
          >
            Three streams. <span className="italic">One range.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#525855] max-w-md leading-relaxed">
            TRIVENI replaces opaque neural guesswork with three independent, auditable deterministic
            streams that converge into a bounded range, an alert state, and a clinical checklist.
          </p>
        </div>

        {/* Animated SVG Convergence Diagram */}
        <figure className="border border-[#CFCAC0] bg-[#EAE6DC] p-4 sm:p-6 mb-8 overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#CFCAC0]">
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#141716]">
              CONVERGENCE PIPELINE — ZERO NEURAL WEIGHTS
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525855]">
              FIG 5.1 — TRIVENI ARCHITECTURE
            </span>
          </div>

          <svg
            viewBox="0 0 960 280"
            className="w-full h-auto min-w-[640px] sm:min-w-0"
            role="img"
            aria-label="Diagram showing three deterministic streams — OPTICS, AMOUNT, and CLINICAL LEDGER — converging into one output node labelled RANGE + STATE + ACTION"
          >
            {/* Background guide grid lines */}
            <line x1="250" y1="20" x2="250" y2="260" stroke="#CFCAC0" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="590" y1="20" x2="590" y2="260" stroke="#CFCAC0" strokeWidth="1" strokeDasharray="3 3" />

            {/* Stream 1 box: OPTICS */}
            <g>
              <rect x="16" y="24" width="220" height="58" fill="#F4F2EC" stroke="#141716" strokeWidth="1.25" />
              <text x="32" y="47" fill="#525855" fontFamily="IBM Plex Mono, monospace" fontSize="10">
                STREAM 01
              </text>
              <text x="32" y="68" fill="#141716" fontFamily="IBM Plex Mono, monospace" fontSize="14" fontWeight="600">
                OPTICS
              </text>
            </g>

            {/* Stream 2 box: AMOUNT */}
            <g>
              <rect x="16" y="111" width="220" height="58" fill="#F4F2EC" stroke="#141716" strokeWidth="1.25" />
              <text x="32" y="134" fill="#525855" fontFamily="IBM Plex Mono, monospace" fontSize="10">
                STREAM 02
              </text>
              <text x="32" y="155" fill="#141716" fontFamily="IBM Plex Mono, monospace" fontSize="14" fontWeight="600">
                AMOUNT
              </text>
            </g>

            {/* Stream 3 box: CLINICAL LEDGER */}
            <g>
              <rect x="16" y="198" width="220" height="58" fill="#F4F2EC" stroke="#141716" strokeWidth="1.25" />
              <text x="32" y="221" fill="#525855" fontFamily="IBM Plex Mono, monospace" fontSize="10">
                STREAM 03
              </text>
              <text x="32" y="242" fill="#141716" fontFamily="IBM Plex Mono, monospace" fontSize="14" fontWeight="600">
                CLINICAL LEDGER
              </text>
            </g>

            {/* Converging Animated Lines */}
            <path
              d="M 236 53 L 430 53 L 520 140 L 620 140"
              fill="none"
              stroke="#141716"
              strokeWidth="2"
              className="triveni-path"
              data-drawn={isVisible ? 'true' : 'false'}
            />
            <path
              d="M 236 140 L 620 140"
              fill="none"
              stroke="#B81D24"
              strokeWidth="2.25"
              className="triveni-path"
              data-drawn={isVisible ? 'true' : 'false'}
              style={{ transitionDelay: '160ms' }}
            />
            <path
              d="M 236 227 L 430 227 L 520 140 L 620 140"
              fill="none"
              stroke="#141716"
              strokeWidth="2"
              className="triveni-path"
              data-drawn={isVisible ? 'true' : 'false'}
              style={{ transitionDelay: '320ms' }}
            />

            {/* Intermediate annotations along lines */}
            <text x="330" y="44" textAnchor="middle" fill="#525855" fontFamily="IBM Plex Mono, monospace" fontSize="10">
              FLASH / NO-FLASH INDICES
            </text>
            <text x="330" y="131" textAnchor="middle" fill="#B81D24" fontFamily="IBM Plex Mono, monospace" fontSize="10">
              AREA × DEPTH × CALIBRATION
            </text>
            <text x="330" y="246" textAnchor="middle" fill="#525855" fontFamily="IBM Plex Mono, monospace" fontSize="10">
              VITALS + STICKY ESCALATION
            </text>

            {/* Convergence Junction Marker */}
            <rect x="514" y="134" width="12" height="12" fill="#B81D24" stroke="#141716" strokeWidth="1.5" />

            {/* Output Node */}
            <g>
              <rect x="620" y="92" width="324" height="96" fill="#141716" stroke="#141716" strokeWidth="1.5" />
              <text x="642" y="120" fill="#CFCAC0" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" letterSpacing="1.2">
                DETERMINISTIC OUTPUT
              </text>
              <text x="642" y="149" fill="#F4F2EC" fontFamily="IBM Plex Mono, monospace" fontSize="15" fontWeight="600">
                RANGE + STATE + ACTION
              </text>
              <text x="642" y="171" fill="#CFCAC0" fontFamily="IBM Plex Mono, monospace" fontSize="10.5">
                BOUNDED mL · 4-STATE · E-MOTIVE
              </text>
            </g>
          </svg>
        </figure>

        {/* Three hairline stream panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#CFCAC0]">
          <article className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855]">
              STREAM 01
            </p>
            <h3 className="font-mono text-base font-semibold tracking-[0.06em] text-[#141716] mt-1 mb-3">
              OPTICS
            </h3>
            <p className="text-sm text-[#525855] leading-relaxed">
              Channel-ratio spectroscopy indices from a flash pair: how much of the stain is blood,
              and how deep it goes.
            </p>
          </article>

          <article className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855]">
              STREAM 02
            </p>
            <h3 className="font-mono text-base font-semibold tracking-[0.06em] text-[#141716] mt-1 mb-3">
              AMOUNT
            </h3>
            <p className="text-sm text-[#525855] leading-relaxed">
              Stain area × penetration × lab calibration tables, plus a resonance-mass research arm
              that weighs with the phone&apos;s own vibration sensor.
            </p>
          </article>

          <article className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855]">
              STREAM 03
            </p>
            <h3 className="font-mono text-base font-semibold tracking-[0.06em] text-[#141716] mt-1 mb-3">
              CLINICAL LEDGER
            </h3>
            <p className="text-sm text-[#525855] leading-relaxed">
              Every pad is one ledger entry — no double-counting. Vitals and deterioration override
              any photo. Escalation is sticky: states only go up unless a clinician signs off.
            </p>
          </article>
        </div>

        {/* Open the black box — pipeline + formulas + worked example */}
        <div className="mt-8 border border-[#141716] bg-[#F4F2EC]">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3 border-b border-[#141716]">
            <span className="font-mono text-xs font-semibold tracking-[0.12em] uppercase text-[#141716]">
              Open the black box — the actual pipeline
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#B81D24]">
              Spec v0.1 · Parameters uncalibrated
            </span>
          </div>

          {/* Pipeline strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[#CFCAC0]">
            {[
              { step: 'STAGE 1', name: 'RAW PAIR', detail: 'Flash + no-flash RAW frames, locked exposure & white balance' },
              { step: 'STAGE 2', name: 'RECTIFY', detail: 'Card fiducials → homography, mm scale, white-balance normalisation' },
              { step: 'STAGE 3', name: 'SEGMENT', detail: 'Stain mask, blood-signal index, specular pooling, underside penetration' },
              { step: 'STAGE 4', name: 'BOUND', detail: 'Area × penetration × pad table → bounded range + state' },
            ].map((s, i) => (
              <div
                key={s.step}
                className={`p-5 ${i < 3 ? 'lg:border-r' : ''} border-[#CFCAC0] ${i % 2 === 0 ? 'border-r lg:border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''}`}
              >
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#525855]">
                  {s.step}
                </p>
                <p className="font-mono text-sm font-semibold tracking-[0.06em] text-[#141716] mt-1">
                  {s.name} {i < 3 && <span className="text-[#B81D24]">→</span>}
                </p>
                <p className="text-[13px] text-[#525855] leading-relaxed mt-1.5">{s.detail}</p>
              </div>
            ))}
          </div>

          {/* Formulas */}
          <div className="px-4 sm:px-6 py-5 border-b border-[#CFCAC0] overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm leading-[2] text-[#141716] whitespace-nowrap">
              <p>
                <span className="text-[#525855]">OPTICS&nbsp;&nbsp;</span>
                BSI = blood-signal index from flash / no-flash channel ratios, read against the
                card&apos;s clean margin
              </p>
              <p>
                <span className="text-[#525855]">AMOUNT&nbsp;&nbsp;</span>
                V_range = A_stain (cm²) × penetration class × k_pad ± σ_capture
              </p>
              <p>
                <span className="text-[#525855]">LEDGER&nbsp;&nbsp;</span>
                session = Σ pad ranges · state = f(cumulative, vitals, deterioration) · escalation
                sticky
              </p>
            </div>
            <p className="mt-3 text-sm text-[#525855] leading-relaxed">
              σ_capture is not decoration: dim light adds ±5% half-width, a tilted capture ±6% —
              poor conditions widen the range instead of borrowing false precision. k_pad comes from
              the bench calibration table for the selected pad type; until bench calibration runs,
              every parameter above is a design value, not a measurement.
            </p>
          </div>

          {/* Worked example */}
          <div className="px-4 sm:px-6 py-5 bg-[#EAE6DC]">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-3">
              One worked example — synthetic, illustrative
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs sm:text-[13px] text-[#141716]">
              <span className="px-2.5 py-1.5 border border-[#141716] bg-[#F4F2EC]">STAIN 212 CM²</span>
              <span aria-hidden="true">→</span>
              <span className="px-2.5 py-1.5 border border-[#141716] bg-[#F4F2EC]">PENETRATION: THROUGH</span>
              <span aria-hidden="true">→</span>
              <span className="px-2.5 py-1.5 border border-[#141716] bg-[#F4F2EC]">LEDGER + VITALS</span>
              <span aria-hidden="true">→</span>
              <span className="px-2.5 py-1.5 bg-[#C88A1E] text-[#141716] font-semibold">
                550–680 ML · AMBER
              </span>
            </div>
            <p className="mt-3 text-sm text-[#525855] leading-relaxed">
              The same sample a nurse would eyeball at ≈320 mL. Every intermediate value on this
              strip is inspectable — that is the whole point of a deterministic method.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
