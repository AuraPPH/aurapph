import React, { useEffect, useState } from 'react';
import { useInViewOnce, usePrefersReducedMotion } from '../hooks/useInView';

function useCountUp(target: number, active: boolean, durationMs = 900): number {
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState<number>(reducedMotion ? target : 0);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, active, durationMs, reducedMotion]);

  return value;
}

export const ProblemSection: React.FC = () => {
  const { ref, isVisible } = useInViewOnce<HTMLElement>(0.05);

  const lowPct = useCountUp(33, isVisible, 800);
  const highPct = useCountUp(50, isVisible, 900);
  const globalDeaths = useCountUp(70000, isVisible, 1000);
  const indiaMmr = useCountUp(88, isVisible, 850);
  const emotiveVisual = useCountUp(51, isVisible, 800);
  const emotiveMeasured = useCountUp(93, isVisible, 950);

  return (
    <section
      id="problem"
      ref={ref}
      className="py-16 sm:py-20 border-b border-[#CFCAC0]"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
          02 — THE PROBLEM
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <h2
            id="problem-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-normal text-[#141716] max-w-2xl"
          >
            Visual estimation fails when every hundred millilitres matters.
          </h2>
          <p className="text-sm sm:text-base text-[#525855] max-w-md leading-relaxed">
            In rural primary health centres and labour rooms without calibrated collection drapes,
            blood loss is judged by eye — systematically under-reading haemorrhage until shock sets in.
          </p>
        </div>

        {/* Stat Ledger — 4-column hairline grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#CFCAC0]">
          <div className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-[#141716] tabular-nums">
              {lowPct}–{highPct}%
            </p>
            <p className="mt-3 text-sm text-[#141716] leading-snug">
              Visual estimates under-read actual blood loss
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.06em] uppercase text-[#525855]">
              Published studies
            </p>
          </div>

          <div className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-[#141716] tabular-nums">
              ~{globalDeaths.toLocaleString('en-US')}
            </p>
            <p className="mt-3 text-sm text-[#141716] leading-snug">
              Women die from postpartum haemorrhage each year worldwide
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.06em] uppercase text-[#525855]">
              WHO
            </p>
          </div>

          <div className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-[#141716] tabular-nums">
              {indiaMmr}
            </p>
            <p className="mt-3 text-sm text-[#141716] leading-snug">
              India&apos;s maternal mortality ratio per 100,000 live births
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.06em] uppercase text-[#525855]">
              SRS 2020–22
            </p>
          </div>

          <div className="p-6 border-r border-b border-[#CFCAC0] bg-[#EAE6DC]">
            <p className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-[#B81D24] tabular-nums">
              {emotiveVisual}% → {emotiveMeasured}%
            </p>
            <p className="mt-3 text-sm text-[#141716] leading-snug">
              PPH detection rate — usual care vs the E-MOTIVE intervention (calibrated drape +
              first-response bundle)
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.06em] uppercase text-[#525855]">
              E-MOTIVE trial, NEJM 2023
            </p>
          </div>
        </div>

        {/* Simple flat SVG bar chart: Guessed vs Actual */}
        <figure className="mt-8 border border-[#CFCAC0] bg-[#EAE6DC] p-5 sm:p-6 overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#CFCAC0]">
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#141716]">
              TYPICAL VISUAL UNDER-ESTIMATION AT PPH ONSET
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525855]">
              FIG 2.1 — ILLUSTRATIVE SCALE
            </span>
          </div>

          <svg
            viewBox="0 0 880 185"
            className="w-full h-auto min-w-[620px] sm:min-w-0"
            role="img"
            aria-label="Bar chart showing Guessed blood loss bar significantly shorter than Actual blood loss bar, with the gap labelled Visual Under-Estimation Zone"
          >
            {/* Axis baseline */}
            <line x1="110" y1="20" x2="110" y2="140" stroke="#141716" strokeWidth="1" />
            <line x1="110" y1="140" x2="840" y2="140" stroke="#CFCAC0" strokeWidth="1" />

            {/* Vertical scale ticks */}
            {[
              { x: 110, label: '0' },
              { x: 292, label: '250 mL' },
              { x: 475, label: '500 mL (PPH)' },
              { x: 657, label: '750 mL' },
              { x: 840, label: '1,000 mL' },
            ].map((tick) => (
              <g key={tick.label}>
                <line
                  x1={tick.x}
                  y1="20"
                  x2={tick.x}
                  y2="146"
                  stroke={tick.label.includes('500') ? '#B81D24' : '#CFCAC0'}
                  strokeWidth="1"
                  strokeDasharray={tick.label.includes('500') ? '4 3' : undefined}
                />
                <text
                  x={tick.x}
                  y="164"
                  textAnchor="middle"
                  fill={tick.label.includes('500') ? '#B81D24' : '#525855'}
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="11"
                >
                  {tick.label}
                </text>
              </g>
            ))}

            {/* Bar 1: Guessed */}
            <text
              x="98"
              y="56"
              textAnchor="end"
              fill="#141716"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="12"
              fontWeight="600"
            >
              GUESSED
            </text>
            <rect x="110" y="34" width="248" height="34" fill="#525855" />
            <text
              x="234"
              y="56"
              textAnchor="middle"
              fill="#F4F2EC"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="11"
            >
              ~340 mL (EYEBALL)
            </text>

            {/* Visual under-estimation zone hatched block */}
            <rect
              x="358"
              y="34"
              width="226"
              height="34"
              fill="#F4F2EC"
              stroke="#B81D24"
              strokeWidth="1.25"
              strokeDasharray="4 3"
            />
            <text
              x="471"
              y="55"
              textAnchor="middle"
              fill="#B81D24"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="10.5"
              fontWeight="600"
            >
              VISUAL UNDER-ESTIMATION ZONE
            </text>

            {/* Bar 2: Actual */}
            <text
              x="98"
              y="112"
              textAnchor="end"
              fill="#141716"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="12"
              fontWeight="600"
            >
              ACTUAL
            </text>
            <rect x="110" y="90" width="474" height="34" fill="#B81D24" />
            <text
              x="347"
              y="112"
              textAnchor="middle"
              fill="#F4F2EC"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="11"
              fontWeight="500"
            >
              ~650 mL MEASURED (33–50% HIGHER)
            </text>
          </svg>
        </figure>
      </div>
    </section>
  );
};
