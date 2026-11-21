import React, { useCallback, useRef, useState } from 'react';
import { ILLUSTRATIVE_STAMP, shouldShowUnderestimationInsight } from '../utils/triveni';

export const SplitViewfinder: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dividerPct, setDividerPct] = useState<number>(52);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [userGuessMl, setUserGuessMl] = useState<number>(300);
  const [hasAdjustedGuess, setHasAdjustedGuess] = useState<boolean>(false);
  const [hasRevealedTriveni, setHasRevealedTriveni] = useState<boolean>(false);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, rawPct));
    setDividerPct(clamped);
    setHasRevealedTriveni(true);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleDividerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setDividerPct((prev) => Math.max(8, prev - 5));
      setHasRevealedTriveni(true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setDividerPct((prev) => Math.min(92, prev + 5));
      setHasRevealedTriveni(true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setDividerPct(8);
      setHasRevealedTriveni(true);
    } else if (e.key === 'End') {
      e.preventDefault();
      setDividerPct(92);
      setHasRevealedTriveni(true);
    }
  };

  const showInsight = shouldShowUnderestimationInsight(hasAdjustedGuess, hasRevealedTriveni);

  return (
    <figure className="mt-6 border border-[#CFCAC0] bg-[#EAE6DC]">
      {/* Top viewfinder header strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-[#CFCAC0] bg-[#F4F2EC]">
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#525855]">
          FIG 1.1 — SYNTHETIC SAMPLE, ILLUSTRATIVE
        </span>
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#141716] border border-[#CFCAC0] bg-[#EAE6DC] px-2 py-0.5">
          {ILLUSTRATIVE_STAMP}
        </span>
      </div>

      {/* Tap-to-switch controls (essential on small screens, convenient everywhere) */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-[#CFCAC0] bg-[#EAE6DC]">
        <div className="inline-flex border border-[#CFCAC0] bg-[#F4F2EC]" role="group" aria-label="Viewfinder comparison mode">
          <button
            type="button"
            onClick={() => {
              setDividerPct(86);
            }}
            aria-pressed={dividerPct > 65}
            className={`min-h-[44px] px-3.5 font-mono text-xs tracking-[0.06em] uppercase transition-colors cursor-pointer ${
              dividerPct > 65
                ? 'bg-[#141716] text-[#F4F2EC]'
                : 'bg-[#F4F2EC] text-[#141716] hover:bg-[#EAE6DC]'
            }`}
          >
            Visual guess
          </button>
          <button
            type="button"
            onClick={() => {
              setDividerPct(14);
              setHasRevealedTriveni(true);
            }}
            aria-pressed={dividerPct < 35}
            className={`min-h-[44px] px-3.5 font-mono text-xs tracking-[0.06em] uppercase border-l border-[#CFCAC0] transition-colors cursor-pointer ${
              dividerPct < 35
                ? 'bg-[#141716] text-[#F4F2EC]'
                : 'bg-[#F4F2EC] text-[#141716] hover:bg-[#EAE6DC]'
            }`}
          >
            TRIVENI
          </button>
        </div>
        <span className="hidden sm:inline font-mono text-[11px] text-[#525855]">
          DRAG DIVIDER OR USE ← / → KEYS
        </span>
      </div>

      {/* Mobile-only unclipped readout strip (<640px) so divider never slices corner badge text */}
      <div className="grid grid-cols-2 border-b border-[#CFCAC0] bg-[#F4F2EC] sm:hidden">
        <div className="p-2.5 border-r border-[#CFCAC0]">
          <span className="font-mono text-[10px] font-semibold text-[#141716] tabular-nums block">
            VISUAL GUESS ≈ 320 mL
          </span>
          <span className="font-mono text-[9px] text-[#525855] block mt-0.5">
            EYEBALL ESTIMATE
          </span>
        </div>
        <div className="p-2.5">
          <div className="flex flex-wrap items-center gap-1">
            <span className="font-mono text-[10px] font-semibold text-[#141716] tabular-nums">
              550–680 mL
            </span>
            <span className="font-mono text-[9px] font-semibold px-1 py-0.5 bg-[#C88A1E] text-[#141716]">
              AMBER
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#525855] block mt-0.5">
            TRIVENI RANGE
          </span>
        </div>
      </div>

      {/* Interactive Split-Reality Canvas */}
      <div
        ref={containerRef}
        data-testid="split-viewfinder"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[240px] sm:h-[320px] md:h-[340px] select-none touch-none overflow-hidden cursor-ew-resize bg-[#EAE6DC]"
      >
        {/* RIGHT / FULL LAYER: TRIVENI OPTICAL + AREA OVERLAY */}
        <div className="absolute inset-0 bg-[#E6E2D6]">
          <svg
            viewBox="0 0 960 410"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
            role="img"
            aria-label="Abstract flat technical diagram of a maternity pad and calibration card comparing visual estimation against TRIVENI range measurement"
          >
            {/* Technical millimeter measurement grid */}
            <defs>
              <pattern id="triveni-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#CFCAC0" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="960" height="400" fill="url(#triveni-grid)" />

            {/* Printed Reference Calibration Card (Right side of pad) */}
            <g transform="translate(725, 118)">
              <rect x="0" y="0" width="98" height="156" fill="#F4F2EC" stroke="#141716" strokeWidth="1.5" />
              <rect x="10" y="10" width="24" height="24" fill="#141716" />
              <rect x="64" y="10" width="24" height="24" fill="#141716" />
              <rect x="10" y="122" width="24" height="24" fill="#141716" />
              <rect x="64" y="122" width="24" height="24" fill="#141716" />
              {/* Greyscale reflectance patches */}
              <rect x="14" y="46" width="70" height="14" fill="#141716" />
              <rect x="14" y="64" width="70" height="14" fill="#525855" />
              <rect x="14" y="82" width="70" height="14" fill="#CFCAC0" />
              <rect x="14" y="100" width="70" height="14" fill="#F4F2EC" stroke="#141716" strokeWidth="0.75" />
              <text
                x="49"
                y="174"
                textAnchor="middle"
                fill="#141716"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="10"
              >
                REF CARD 50×80mm
              </text>
            </g>

            {/* Abstract Flat Maternity Pad Outline */}
            <g transform="translate(150, 88)">
              {/* Outer pad perimeter (technical flat contour) */}
              <path
                d="M 48 0 L 472 0 L 520 34 L 520 186 L 472 220 L 48 220 L 0 186 L 0 34 Z"
                fill="#F4F2EC"
                stroke="#141716"
                strokeWidth="1.5"
              />
              {/* Inner absorbent core stitching */}
              <rect
                x="46"
                y="26"
                width="428"
                height="168"
                fill="none"
                stroke="#CFCAC0"
                strokeWidth="1"
                strokeDasharray="6 4"
              />

              {/* Flat geometric crimson stain contour — abstract, non-graphic */}
              <polygon
                points="116,52 214,34 342,42 426,74 446,126 392,174 286,188 164,178 96,136 92,84"
                fill="#B81D24"
                fillOpacity="0.88"
              />
              {/* Saturation depth sub-contour (TRIVENI optical depth zone) */}
              <polygon
                points="178,72 276,62 356,88 364,136 292,158 192,150 156,112"
                fill="#6E0E14"
                fillOpacity="0.65"
              />

              {/* TRIVENI segmentation bounding box + crosshairs */}
              <rect
                x="92"
                y="34"
                width="354"
                height="154"
                fill="none"
                stroke="#141716"
                strokeWidth="1.25"
                strokeDasharray="4 3"
              />
              {/* Corner brackets */}
              <path d="M 92 48 L 92 34 L 106 34" fill="none" stroke="#141716" strokeWidth="2.5" />
              <path d="M 432 34 L 446 34 L 446 48" fill="none" stroke="#141716" strokeWidth="2.5" />
              <path d="M 92 174 L 92 188 L 106 188" fill="none" stroke="#141716" strokeWidth="2.5" />
              <path d="M 432 188 L 446 188 L 446 174" fill="none" stroke="#141716" strokeWidth="2.5" />

              {/* Optical sampling points */}
              <circle cx="268" cy="110" r="5" fill="#F4F2EC" stroke="#141716" strokeWidth="1.5" />
              <line x1="252" y1="110" x2="284" y2="110" stroke="#141716" strokeWidth="1" />
              <line x1="268" y1="94" x2="268" y2="126" stroke="#141716" strokeWidth="1" />

              {/* Dimension callout lines */}
              <line x1="92" y1="240" x2="446" y2="240" stroke="#141716" strokeWidth="1" />
              <line x1="92" y1="234" x2="92" y2="246" stroke="#141716" strokeWidth="1" />
              <line x1="446" y1="234" x2="446" y2="246" stroke="#141716" strokeWidth="1" />
              <text
                x="269"
                y="256"
                textAnchor="middle"
                fill="#141716"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="11"
              >
                STAIN AREA × DEPTH CALIBRATION · FLASH PAIR
              </text>
            </g>
          </svg>

          {/* Right side label (sm+ overlay; mobile uses dedicated strip above) */}
          <div className="hidden sm:block absolute top-4 right-4 bg-[#F4F2EC] border border-[#141716] px-3 py-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.06em] text-[#141716] tabular-nums">
                TRIVENI RANGE 550–680 mL
              </span>
              <span className="font-mono text-[10px] font-semibold tracking-[0.1em] px-1.5 py-0.5 bg-[#C88A1E] text-[#141716]">
                AMBER
              </span>
            </div>
            <p className="font-mono text-[10px] tracking-[0.06em] text-[#525855] mt-1">
              OPTICS + AMOUNT + LEDGER · ILLUSTRATIVE
            </p>
          </div>
        </div>

        {/* LEFT CLIPPED LAYER: UNAIDED VISUAL GUESS */}
        <div
          className="absolute inset-0 bg-[#EAE6DC]"
          style={{ clipPath: `inset(0 ${100 - dividerPct}% 0 0)` }}
        >
          <svg
            viewBox="0 0 960 410"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
            aria-hidden="true"
          >
            {/* Plain surface — no calibration grid */}
            <rect x="0" y="0" width="960" height="410" fill="#EAE6DC" />

            {/* Uncalibrated Reference Card placeholder (faded) */}
            <g transform="translate(725, 118)" opacity="0.35">
              <rect x="0" y="0" width="98" height="156" fill="#F4F2EC" stroke="#CFCAC0" strokeWidth="1" />
            </g>

            {/* Same abstract flat maternity pad without optical overlay */}
            <g transform="translate(150, 88)">
              <path
                d="M 48 0 L 472 0 L 520 34 L 520 186 L 472 220 L 48 220 L 0 186 L 0 34 Z"
                fill="#F4F2EC"
                stroke="#CFCAC0"
                strokeWidth="1.5"
              />
              <rect
                x="46"
                y="26"
                width="428"
                height="168"
                fill="none"
                stroke="#CFCAC0"
                strokeWidth="1"
              />
              {/* Flat crimson stain shape without saturation depth callouts */}
              <polygon
                points="116,52 214,34 342,42 426,74 446,126 392,174 286,188 164,178 96,136 92,84"
                fill="#B81D24"
                fillOpacity="0.82"
              />
              <text
                x="260"
                y="256"
                textAnchor="middle"
                fill="#525855"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="11"
              >
                UNAIDED EYE — DEPTH & ABSORPTION INVISIBLE
              </text>
            </g>
          </svg>

          {/* Left side label (sm+ overlay; mobile uses dedicated strip above) */}
          <div className="hidden sm:block absolute top-4 left-4 bg-[#F4F2EC] border border-[#CFCAC0] px-3 py-2">
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.06em] text-[#141716] tabular-nums block">
              VISUAL GUESS ≈ 320 mL
            </span>
            <span className="font-mono text-[10px] tracking-[0.06em] text-[#525855] mt-0.5 block">
              EYEBALL ESTIMATE · NO CALIBRATION
            </span>
          </div>
        </div>

        {/* Vertical Divider Line + Accessible Keyboard Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparison divider between visual guess and TRIVENI measurement"
          aria-valuemin={8}
          aria-valuemax={92}
          aria-valuenow={Math.round(dividerPct)}
          onKeyDown={handleDividerKeyDown}
          style={{ left: `${dividerPct}%` }}
          className="absolute top-0 bottom-0 -ml-[1px] w-[2px] bg-[#141716] z-20 focus-visible:outline-2 focus-visible:outline-[#B81D24]"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-[#141716] text-[#F4F2EC] border border-[#F4F2EC] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5.5 4L2 8L5.5 12" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 4L14 8L10.5 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Guess First interactive touch bar */}
      <figcaption className="border-t border-[#CFCAC0] bg-[#F4F2EC] px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between gap-2 mb-1">
              <label
                htmlFor="hero-guess-slider"
                className="font-mono text-xs tracking-[0.06em] uppercase text-[#141716]"
              >
                Guess first — your estimate:
              </label>
              <span
                data-testid="hero-guess-value"
                className="font-mono text-sm font-semibold tabular-nums text-[#141716]"
              >
                {userGuessMl} mL
              </span>
            </div>
            <input
              id="hero-guess-slider"
              type="range"
              min={100}
              max={900}
              step={10}
              value={userGuessMl}
              onChange={(e) => {
                setUserGuessMl(Number(e.target.value));
                setHasAdjustedGuess(true);
              }}
              className="spec-slider"
            />
          </div>

          <div className="md:max-w-md md:text-right">
            {showInsight ? (
              <p
                data-testid="underestimation-insight"
                className="text-sm font-medium text-[#141716] border border-[#141716] bg-[#EAE6DC] px-3.5 py-2.5 text-left"
              >
                Most people guess low. Studies find visual estimates under-read blood loss by 33–50%.
              </p>
            ) : (
              <p className="font-mono text-xs text-[#525855]">
                {hasAdjustedGuess
                  ? 'Now drag the divider left (or tap TRIVENI) to compare.'
                  : 'Slide to guess the volume, then drag the divider to reveal TRIVENI.'}
              </p>
            )}
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
