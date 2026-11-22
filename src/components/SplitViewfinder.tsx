import React, { useCallback, useRef, useState } from 'react';
import { ILLUSTRATIVE_STAMP, shouldShowUnderestimationInsight } from '../utils/triveni';
import { PadFrontSvg } from './padArt';

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
            aria-label="Realistic maternity pad with calibration card comparing visual estimation against TRIVENI range measurement"
          >
            {/* Technical millimeter measurement grid */}
            <defs>
              <pattern id="triveni-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#CFCAC0" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="960" height="400" fill="url(#triveni-grid)" />

            {/* Realistic maternity pad (shared PadFrontSvg, 615 mL scenario) with its
                own detailed calibration card; TRIVENI analysis overlay on top */}
            <PadFrontSvg
              volumeMl={615}
              svgAttrs={{ x: 140, y: 74, width: 540, height: 262, className: '' }}
            />
            <g>
              {/* TRIVENI segmentation bounding box + crosshairs */}
              <rect
                x="160"
                y="103"
                width="407"
                height="204"
                fill="none"
                stroke="#141716"
                strokeWidth="1.25"
                strokeDasharray="4 3"
              />
              {/* Corner brackets */}
              <path d="M 160 117 L 160 103 L 174 103" fill="none" stroke="#141716" strokeWidth="2.5" />
              <path d="M 553 103 L 567 103 L 567 117" fill="none" stroke="#141716" strokeWidth="2.5" />
              <path d="M 160 293 L 160 307 L 174 307" fill="none" stroke="#141716" strokeWidth="2.5" />
              <path d="M 553 307 L 567 307 L 567 293" fill="none" stroke="#141716" strokeWidth="2.5" />

              {/* Optical sampling point at stain centre */}
              <circle cx="396" cy="205" r="5" fill="#F4F2EC" stroke="#141716" strokeWidth="1.5" />
              <line x1="380" y1="205" x2="412" y2="205" stroke="#141716" strokeWidth="1" />
              <line x1="396" y1="189" x2="396" y2="221" stroke="#141716" strokeWidth="1" />

              {/* Dimension callout lines */}
              <line x1="168" y1="348" x2="559" y2="348" stroke="#141716" strokeWidth="1" />
              <line x1="168" y1="342" x2="168" y2="354" stroke="#141716" strokeWidth="1" />
              <line x1="559" y1="342" x2="559" y2="354" stroke="#141716" strokeWidth="1" />
              <text
                x="364"
                y="368"
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

            {/* Same realistic pad photo — the unaided eye sees the identical
                stain but has no calibration, depth or absorption reading */}
            <PadFrontSvg
              volumeMl={615}
              svgAttrs={{ x: 140, y: 74, width: 540, height: 262, className: '' }}
            />
            <text
              x="364"
              y="368"
              textAnchor="middle"
              fill="#525855"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="11"
            >
              UNAIDED EYE — DEPTH & ABSORPTION INVISIBLE
            </text>
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
