import React, { useId, useMemo, useState } from 'react';
import { LightingCondition } from '../utils/triveni';
import { computePadVisualMetrics } from '../utils/padVisualMath';
import {
  PAD_OUTER_PATH,
  PAD_CUSHION_PATH,
  PAD_SEAM_PATH,
  STAIN_MID_PATH,
  STAIN_CORE_PATH,
  CalibrationCardCorner,
  PadFrontSvg,
} from './padArt';

interface PadVisualProps {
  volumeMl: number;
  lighting: LightingCondition;
  tilted: boolean;
}

export const PadVisual: React.FC<PadVisualProps> = ({ volumeMl, lighting, tilted }) => {
  const uid = useId().replace(/:/g, '');
  const [flipped, setFlipped] = useState(false);

  const metrics = useMemo(() => computePadVisualMetrics(volumeMl), [volumeMl]);

  const undersideTransform = `translate(180px, 92px) scale(${metrics.undersideScaleX}, ${metrics.undersideScaleY}) translate(-180px, -92px)`;

  return (
    <div
      data-testid="pad-visual-panel"
      data-flipped={flipped ? 'true' : 'false'}
      data-penetration={metrics.penetrationStage}
      data-lighting={lighting}
      data-tilted={tilted ? 'true' : 'false'}
      className="border-b border-[#CFCAC0] bg-[#F4F2EC]"
    >
      {/* Panel Header */}
      <div className="px-4 py-2 border-b border-[#CFCAC0] bg-[#EAE6DC] flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.11em] uppercase text-[#141716] font-medium">
          PAD VIEW — ILLUSTRATIVE
        </span>
        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#525855]">
          {flipped ? 'BACKSHEET SIDE' : 'TOP SIDE'}
        </span>
      </div>

      {/* Interactive Stage with Dim Room & Tilted Capture integration */}
      <div className="relative overflow-hidden bg-[#ECE8DE] px-3 py-3">
        <div
          className="pad-perspective-stage"
          style={{
            filter: lighting === 'dim' ? 'brightness(0.74) contrast(0.88)' : 'none',
            transition: 'filter 320ms ease',
          }}
        >
          <div
            className="pad-tilt-wrapper"
            style={{
              transform: tilted
                ? 'rotateX(15deg) rotateY(-11deg) rotateZ(-2deg) scale(0.96)'
                : 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)',
            }}
          >
            <div
              className="pad-flip-card"
              style={{
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* ================= FRONT FACE: TOP SIDE (ANATOMY PAINTER'S ORDER) ================= */}
              <div className="pad-flip-face pad-flip-front">
                <PadFrontSvg volumeMl={volumeMl} />
              </div>

              {/* ================= BACK FACE: BACKSHEET SIDE (ANATOMY PAINTER'S ORDER) ================= */}
              <div className="pad-flip-face pad-flip-back">
                <svg
                  viewBox="0 0 380 184"
                  className="w-full h-auto block"
                  role="img"
                  aria-label={
                    metrics.undersideVisible
                      ? `Illustrative maternity pad backsheet showing underside penetration ratio approximately ${metrics.penetrationRatioPct} percent`
                      : 'Illustrative maternity pad backsheet showing no penetration visible'
                  }
                >
                  <defs>
                    <filter id={`back-shadow-${uid}`} x="-8%" y="-12%" width="118%" height="130%">
                      <feDropShadow
                        dx="2.5"
                        dy="4.5"
                        stdDeviation="3.6"
                        floodColor="#141716"
                        floodOpacity="0.16"
                      />
                    </filter>
                    <filter id={`back-blur-${uid}`} x="-20%" y="-25%" width="140%" height="150%">
                      <feGaussianBlur stdDeviation="5.6" />
                    </filter>
                    {/* Four-tone matte PE-film backsheet shading */}
                    <linearGradient id={`pe-back-4tone-${uid}`} x1="12%" y1="0%" x2="88%" y2="100%">
                      <stop offset="0%" stopColor="#E4EDF2" />
                      <stop offset="22%" stopColor="#D5E0E7" />
                      <stop offset="58%" stopColor="#C8D5DD" />
                      <stop offset="88%" stopColor="#B4C4CE" />
                      <stop offset="100%" stopColor="#99ACB8" />
                    </linearGradient>
                    <linearGradient id={`pe-strip-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F4F8FA" stopOpacity="0.78" />
                      <stop offset="50%" stopColor="#E6EFF3" stopOpacity="0.62" />
                      <stop offset="100%" stopColor="#D3DFE6" stopOpacity="0.72" />
                    </linearGradient>
                    <clipPath id={`back-clip-${uid}`}>
                      <path d={PAD_SEAM_PATH} />
                    </clipPath>
                                      <pattern id={`mat-grid-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#DFD9CC" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  {/* Sterile bedside mat drafting grid */}
                  <rect x="0" y="0" width="380" height="184" fill={`url(#mat-grid-${uid})`} opacity="0.55" />
                  <g stroke="#C6C0B4" strokeWidth="0.75" fill="none">
                    <path d="M 8 16 L 8 8 L 16 8" />
                    <path d="M 8 168 L 8 176 L 16 176" />
                    <line x1="20" y1="172" x2="294" y2="172" />
                    <line x1="20" y1="168.5" x2="20" y2="175.5" />
                    <line x1="294" y1="168.5" x2="294" y2="175.5" />
                  </g>
                  <text
                    x="157"
                    y="179"
                    textAnchor="middle"
                    fill="#7C776D"
                    fontFamily="IBM Plex Mono, monospace"
                    fontSize="5.6"
                    letterSpacing="0.8"
                  >
                    UNDERSIDE PE BACKSHEET · PENETRATION INSPECTION
                  </text>

                  {/* Consistent multi-part calibration card corner */}
                  <CalibrationCardCorner uid={uid} />

                  {/* Folded mid-side adhesive wings with release tabs */}
                  <g>
                    <path d="M 127 45 C 134 31, 173 31, 182 47 Z" fill="#141716" fillOpacity="0.1" transform="translate(2, 2)" />
                    <path d="M 126.5 45 C 134 31.5, 173 31.5, 181.5 46.5 Z" fill="#C9D6DE" stroke="#99ABB6" strokeWidth="0.85" />
                    <path d="M 134 42 C 144 36.5, 165 36.5, 174 43" fill="none" stroke="#EBF2F6" strokeWidth="0.7" />
                    <path d="M 127 139 C 134 153, 173 153, 182 137 Z" fill="#141716" fillOpacity="0.13" transform="translate(2, 2.5)" />
                    <path d="M 126.5 139 C 134 152.5, 173 152.5, 181.5 137.5 Z" fill="#BCCBD5" stroke="#8FA2AE" strokeWidth="0.85" />
                  </g>

                  {/* Matte PE-film backsheet body (4-tone beveled cushion + heat-seal flange) */}
                  <g filter={`url(#back-shadow-${uid})`}>
                    <path
                      d={PAD_OUTER_PATH}
                      fill="#8E9FA9"
                      transform="translate(1, 1.2)"
                    />
                    <path
                      d={PAD_OUTER_PATH}
                      fill={`url(#pe-back-4tone-${uid})`}
                      stroke="#92A5B2"
                      strokeWidth="1.05"
                    />
                    {/* Heat-crimped PE perimeter flange */}
                    <path
                      d={PAD_CUSHION_PATH}
                      fill="none"
                      stroke="#94A7B4"
                      strokeWidth="2.4"
                      strokeDasharray="1.2 3.2"
                      strokeOpacity="0.55"
                    />
                    {/* Lit north-west polyethylene sheen rim */}
                    <path
                      d={PAD_CUSHION_PATH}
                      fill="none"
                      stroke="#F1F6F9"
                      strokeWidth="0.9"
                      strokeOpacity="0.75"
                    />
                  </g>

                  {/* Underside penetration bleed-through stain (smaller, darker, more diffuse through matte film) */}
                  <g clipPath={`url(#back-clip-${uid})`}>
                    {metrics.undersideVisible && (
                      <g
                        data-testid="pad-underside-stain"
                        className="pad-stain-animated"
                        style={{ transform: undersideTransform }}
                      >
                        <path
                          d={STAIN_MID_PATH}
                          fill="#471119"
                          fillOpacity={metrics.undersideOpacity * 0.65}
                          filter={`url(#back-blur-${uid})`}
                        />
                        <path
                          d={STAIN_CORE_PATH}
                          fill="#2B070D"
                          fillOpacity={metrics.undersideOpacity}
                          filter={`url(#back-blur-${uid})`}
                        />
                      </g>
                    )}
                  </g>

                  {/* Three longitudinal silicone adhesive release strips over the backsheet */}
                  <g>
                    {/* Upper narrow adhesive rail */}
                    <rect
                      x="60"
                      y="64"
                      width="196"
                      height="9"
                      fill={`url(#pe-strip-${uid})`}
                      stroke="#A4B6C2"
                      strokeWidth="0.6"
                      strokeDasharray="3 2"
                    />
                    {/* Central wide adhesive release strip with rear pull-tab notch */}
                    <rect
                      x="54"
                      y="79"
                      width="208"
                      height="26"
                      fill={`url(#pe-strip-${uid})`}
                      stroke="#9BB0BD"
                      strokeWidth="0.7"
                    />
                    <line x1="54" y1="92" x2="262" y2="92" stroke="#AFC0CB" strokeWidth="0.6" strokeDasharray="4 3" />
                    {/* Turned rear peel-tab corner */}
                    <polygon points="252,79 262,79 262,89" fill="#C4D2DA" stroke="#8FA3B0" strokeWidth="0.6" />
                    {/* Lower narrow adhesive rail */}
                    <rect
                      x="60"
                      y="111"
                      width="196"
                      height="9"
                      fill={`url(#pe-strip-${uid})`}
                      stroke="#A4B6C2"
                      strokeWidth="0.6"
                      strokeDasharray="3 2"
                    />
                  </g>

                  {/* Low-volume label when no underside penetration is visible */}
                  {!metrics.undersideVisible && (
                    <g data-testid="no-penetration-label">
                      <rect
                        x="69"
                        y="79"
                        width="178"
                        height="26"
                        fill="#F4F2EC"
                        fillOpacity="0.94"
                        stroke="#141716"
                        strokeWidth="1"
                      />
                      <text
                        x="158"
                        y="95.5"
                        textAnchor="middle"
                        fill="#141716"
                        fontFamily="IBM Plex Mono, monospace"
                        fontSize="9.5"
                        fontWeight="600"
                        letterSpacing="0.8"
                      >
                        NO PENETRATION VISIBLE
                      </text>
                    </g>
                  )}

                  {/* Subtle rear PE-film orientation print */}
                  <text
                    x="280"
                    y="92"
                    textAnchor="middle"
                    fill="#627581"
                    fontFamily="IBM Plex Mono, monospace"
                    fontSize="5.2"
                    letterSpacing="0.85"
                    transform="rotate(-90 280 92)"
                  >
                    PE BACKSHEET · 380 MM
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Dim Room ambient darkening overlay */}
        {lighting === 'dim' && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#0F1B1C]/22"
          />
        )}
      </div>

      {/* Mono Readouts + FLIP PAD Control Bar */}
      <div className="px-4 py-2.5 border-t border-[#CFCAC0] bg-[#F4F2EC] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5 font-mono text-[11px] tracking-[0.06em] uppercase tabular-nums">
          {flipped ? (
            <>
              <span data-testid="pad-penetration-ratio" className="text-[#141716] font-semibold">
                PENETRATION RATIO ≈ {metrics.penetrationRatioPct}%
              </span>
              <span className="text-[#525855]">
                PENETRATION: {metrics.penetrationStage}
              </span>
            </>
          ) : (
            <>
              <span data-testid="pad-stain-area" className="text-[#141716] font-semibold">
                STAIN ≈ {metrics.stainAreaCm2} CM²
              </span>
              <span data-testid="pad-penetration-stage" className="text-[#525855]">
                PENETRATION: {metrics.penetrationStage}
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
          aria-pressed={flipped}
          className="min-h-[44px] px-3.5 border border-[#141716] bg-[#EAE6DC] hover:bg-[#141716] hover:text-[#F4F2EC] text-[#141716] font-mono text-[11px] font-semibold tracking-[0.08em] uppercase transition-colors cursor-pointer shrink-0"
        >
          {flipped ? 'TOP SIDE' : 'FLIP PAD'}
        </button>
      </div>
    </div>
  );
};
