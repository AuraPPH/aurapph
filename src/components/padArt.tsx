import React, { useId, useMemo } from 'react';
import { computePadVisualMetrics } from '../utils/padVisualMath';

/**
 * Contoured anatomical maternity pad geometry (~2.2:1 length:width, wider posterior third on right,
 * contoured waist at mid-section, rounded anterior end on left).
 * Spans x: 20..294 (length 274), y: 26..158 (rear width 132, waist 92, front width 102).
 */
export const PAD_OUTER_PATH =
  'M 62 39 C 96 34, 126 45, 154 46 C 184 47, 210 26, 248 26 C 279 26, 295 51, 295 92 C 295 133, 279 158, 248 158 C 210 158, 184 137, 154 138 C 126 139, 96 150, 62 145 C 33 141, 20 119, 20 92 C 20 65, 33 43, 62 39 Z';

/** Inner heat-sealed perimeter flange boundary (~4.5px inset from outer skirt) */
export const PAD_CUSHION_PATH =
  'M 63 44 C 95 39.5, 126 49.5, 154 50.5 C 184 51.5, 210 31.5, 247 31.5 C 274 31.5, 290 54, 290 92 C 290 130, 274 152.5, 247 152.5 C 210 152.5, 184 132.5, 154 133.5 C 126 134.5, 95 144.5, 63 140 C 38 136.5, 26 117, 26 92 C 26 67, 38 47.5, 63 44 Z';

/** Ultrasonic stitched seam line inset inside the flange */
export const PAD_SEAM_PATH =
  'M 64 46.5 C 95 42.5, 126 52, 154 53 C 184 54, 210 34.5, 246 34.5 C 272 34.5, 287 56, 287 92 C 287 128, 272 149.5, 246 149.5 C 210 149.5, 184 130, 154 131 C 126 132, 95 141.5, 64 137.5 C 40.5 134.5, 29 115.5, 29 92 C 29 68.5, 40.5 49.5, 64 46.5 Z';

/** Raised inset absorbent pulp core channel */
export const ABSORBENT_CORE_PATH =
  'M 70 59 C 100 56.5, 128 62.5, 156 62.5 C 186 62.5, 210 49.5, 242 49.5 C 264 49.5, 276 66, 276 92 C 276 118, 264 134.5, 242 134.5 C 210 134.5, 186 121.5, 156 121.5 C 128 121.5, 100 127.5, 70 125 C 50 123, 41 109.5, 41 92 C 41 74.5, 50 61, 70 59 Z';

/** Embossed anti-bunching fluid retention channel grooves inside core */
export const CORE_CHANNEL_OUTER =
  'M 78 68 C 106 66, 130 70, 156 70 C 186 70, 208 60, 236 60 C 254 60, 264 73, 264 92 C 264 111, 254 124, 236 124 C 208 124, 186 114, 156 114 C 130 114, 106 118, 78 116 C 62 114, 54 104, 54 92 C 54 80, 62 70, 78 68 Z';

export const CORE_CHANNEL_INNER =
  'M 102 79 C 134 76, 174 75, 212 76 C 232 76.5, 244 83, 244 92 C 244 101, 232 107.5, 212 108 C 174 109, 134 108, 102 105 C 88 103.5, 81 98.5, 81 92 C 81 85.5, 88 80.5, 102 79 Z';

/** Organic 3-layer stain shapes centred slightly rear of centre (180, 92) */
export const STAIN_HALO_PATH =
  'M 72 71 C 104 57, 152 53, 196 49 C 236 46, 270 61, 273 91 C 276 120, 244 137, 200 136 C 156 135, 106 130, 74 114 C 52 104, 50 81, 72 71 Z';

export const STAIN_MID_PATH =
  'M 90 74 C 120 62, 158 59, 196 56 C 230 53.5, 260 67, 262 92 C 264 116, 236 130, 198 129 C 160 128, 122 123, 92 111 C 72 102, 70 83, 90 74 Z';

export const STAIN_CORE_PATH =
  'M 120 80 C 144 71, 172 69, 200 68 C 226 67, 245 76.5, 246 92 C 247 107.5, 228 117, 201 116 C 173 115, 144 112, 121 104 C 106 98, 105 86, 120 80 Z';

/** Irregular small near-black clot silhouettes nested inside saturated core */
export const CLOT_SHAPES = [
  'M 174 85 C 179 81.5, 189 83.5, 191 89 C 192 93.5, 185 96.5, 178 95.5 C 172 94.5, 170 88.5, 174 85 Z',
  'M 205 94 C 211 90.5, 218.5 93.5, 217.5 100 C 215.5 105.5, 207 105.5, 203 101.5 C 200 98.5, 201 95.5, 205 94 Z',
  'M 155 93 C 160 90.5, 166.5 93, 165.5 98 C 164.5 102.5, 158.5 102.5, 154.5 99.5 C 152 97.5, 152.5 94.5, 155 93 Z',
  'M 216 78.5 C 221 76.5, 227.5 79.5, 226.5 84.5 C 225.5 89, 219.5 89, 215.5 86 C 213.5 84, 213.5 80.5, 216 78.5 Z',
];

/** Sculpted standing elastic leak-guard cuff ribbons (filled bands with 4-tone walls) */
export const TOP_CUFF_BAND =
  'M 56 54.5 C 92 49.5, 126 57, 156 57 C 187 57, 213 42, 246 42 C 264 42, 275 49, 281 59 L 276.5 61.5 C 271 53.5, 261 48, 245 48 C 214 48, 188 62.5, 156 62.5 C 126 62.5, 93 55.5, 59 60 Z';

export const TOP_CUFF_RIDGE =
  'M 58 55.8 C 93 51, 126 58.3, 156 58.3 C 187 58.3, 213 43.4, 246 43.4 C 263 43.4, 274 50, 279.5 59.5';

export const TOP_CUFF_ANCHOR =
  'M 59 59.5 C 93 55, 126 62, 156 62 C 188 62, 214 47.5, 245 47.5 C 261 47.5, 271 53, 276 61';

export const BOTTOM_CUFF_BAND =
  'M 56 129.5 C 92 134.5, 126 127, 156 127 C 187 127, 213 142, 246 142 C 264 142, 275 135, 281 125 L 276.5 122.5 C 271 130.5, 261 136, 245 136 C 214 136, 188 121.5, 156 121.5 C 126 121.5, 93 128.5, 59 124 Z';

export const BOTTOM_CUFF_RIDGE =
  'M 58 128.2 C 93 133, 126 125.7, 156 125.7 C 187 125.7, 213 140.6, 246 140.6 C 263 140.6, 274 134, 279.5 124.5';

export const BOTTOM_CUFF_ANCHOR =
  'M 59 124.5 C 93 129, 126 122, 156 122 C 188 122, 214 136.5, 245 136.5 C 261 136.5, 271 131, 276 123';

/** Precomputed gather/ruched pleat stations along both elastic cuffs */
export const CUFF_GATHERS = [
  { x: 68, topY: 56.2, angle: -8 },
  { x: 82, topY: 54.6, angle: -2 },
  { x: 96, topY: 55.2, angle: 6 },
  { x: 110, topY: 57.0, angle: 10 },
  { x: 124, topY: 58.6, angle: 8 },
  { x: 138, topY: 59.5, angle: 3 },
  { x: 152, topY: 59.8, angle: 0 },
  { x: 166, topY: 59.4, angle: -5 },
  { x: 180, topY: 57.6, angle: -12 },
  { x: 194, topY: 54.2, angle: -18 },
  { x: 208, topY: 49.8, angle: -17 },
  { x: 222, topY: 46.5, angle: -10 },
  { x: 236, topY: 45.0, angle: -3 },
  { x: 250, topY: 45.4, angle: 7 },
  { x: 263, topY: 48.2, angle: 20 },
  { x: 273, topY: 53.4, angle: 36 },
];

/** Multi-part physical calibration card corner beside the pad (4-tone beveled cardstock) */
export const CalibrationCardCorner: React.FC<{ uid: string }> = ({ uid }) => (
  <g transform="translate(306, 15)">
    {/* Contact shadow on bedside mat */}
    <rect x="2.5" y="3.5" width="64" height="94" fill="#141716" fillOpacity="0.14" />
    {/* Physical cardstock thickness rim (south & east 4-tone bevel) */}
    <polygon points="64,0 66,2 66,96 2,96 0,94 64,94" fill="#B6B0A2" />
    {/* Laminated matte cardstock body */}
    <rect
      x="0"
      y="0"
      width="64"
      height="94"
      fill={`url(#card-grad-${uid})`}
      stroke="#141716"
      strokeWidth="1"
    />
    {/* Top-left lit laminate edge */}
    <polyline points="1,92.5 1,1 62.5,1" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.8" />

    {/* Micro header strip */}
    <text
      x="6"
      y="10"
      fill="#525855"
      fontFamily="IBM Plex Mono, monospace"
      fontSize="5.2"
      letterSpacing="0.7"
    >
      CAL CARD · V1
    </text>

    {/* 4×3 high-contrast black/white checker fiducial matrix */}
    <g transform="translate(6, 14)">
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const dark = (row + col) % 2 === 0;
          return (
            <rect
              key={`${row}-${col}`}
              x={col * 13}
              y={row * 11}
              width="13"
              height="11"
              fill={dark ? '#141716' : '#FAF8F2'}
              stroke="#CFCAC0"
              strokeWidth="0.4"
            />
          );
        })
      )}
      <rect x="0" y="0" width="52" height="33" fill="none" stroke="#141716" strokeWidth="0.75" />
    </g>

    {/* 4-step neutral greyscale reflectance ramp */}
    <g transform="translate(6, 52)">
      <rect x="0" y="0" width="13" height="7" fill="#141716" />
      <rect x="13" y="0" width="13" height="7" fill="#525855" />
      <rect x="26" y="0" width="13" height="7" fill="#A6A196" />
      <rect x="39" y="0" width="13" height="7" fill="#F4F2EC" />
      <rect x="0" y="0" width="52" height="7" fill="none" stroke="#141716" strokeWidth="0.6" />
    </g>

    {/* Millimetre & centimetre precision ruler bar (0–5 CM) */}
    <g transform="translate(6, 67)">
      <line x1="0" y1="7" x2="52" y2="7" stroke="#141716" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5].map((cm) => {
        const x = cm * 10.4;
        return (
          <g key={cm}>
            <line x1={x} y1="2.5" x2={x} y2="10.5" stroke="#141716" strokeWidth={cm === 0 || cm === 5 ? '1.1' : '0.8'} />
            {cm < 5 && (
              <line x1={x + 5.2} y1="4.5" x2={x + 5.2} y2="8.5" stroke="#525855" strokeWidth="0.6" />
            )}
          </g>
        );
      })}
      <text
        x="26"
        y="20.5"
        textAnchor="middle"
        fill="#141716"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8.5"
        fontWeight="600"
        letterSpacing="0.5"
      >
        5 CM
      </text>
    </g>
  </g>
);

/**
 * The realistic maternity pad, top side — shared by the Field Simulator's
 * PadVisual panel and the hero SplitViewfinder. Pass svgAttrs (x/y/width/
 * height) to nest it inside another SVG.
 */
export const PadFrontSvg: React.FC<{
  volumeMl: number;
  svgAttrs?: React.SVGProps<SVGSVGElement>;
}> = ({ volumeMl, svgAttrs }) => {
  const uid = useId().replace(/:/g, '');
  const metrics = useMemo(() => computePadVisualMetrics(volumeMl), [volumeMl]);
  const stainTransform = `translate(180px, 92px) scale(${metrics.stainScaleX}, ${metrics.stainScaleY}) translate(-180px, -92px)`;
  return (
<svg
                  viewBox="0 0 380 184"
                  className="w-full h-auto block"
                  role="img"
                  aria-label={`Illustrative maternity pad top side showing approximately ${metrics.stainAreaCm2} square centimetres stained, ${metrics.penetrationStage.toLowerCase()} penetration`}
                 {...svgAttrs}>
                  <defs>
                    {/* Subtle matte non-woven cellulose fibre grain */}
                    <filter id={`fibre-${uid}`} x="0%" y="0%" width="100%" height="100%">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.95"
                        numOctaves="3"
                        seed="17"
                        result="noise"
                      />
                      <feColorMatrix type="saturate" values="0" in="noise" result="monoNoise" />
                      <feComponentTransfer in="monoNoise" result="softNoise">
                        <feFuncA type="linear" slope="0.068" />
                      </feComponentTransfer>
                    </filter>

                    {/* Two-tier ambient & contact shadow beneath physical pad */}
                    <filter id={`pad-shadow-${uid}`} x="-8%" y="-12%" width="118%" height="130%">
                      <feDropShadow
                        dx="2.5"
                        dy="4.5"
                        stdDeviation="3.6"
                        floodColor="#141716"
                        floodOpacity="0.16"
                      />
                    </filter>

                    {/* Soft cast shadow under standing leak-guard cuffs */}
                    <filter id={`cuff-shadow-${uid}`} x="-10%" y="-25%" width="120%" height="150%">
                      <feGaussianBlur stdDeviation="1.4" />
                    </filter>

                    {/* Feathered blood blur layers */}
                    <filter id={`blur-halo-${uid}`} x="-18%" y="-24%" width="136%" height="148%">
                      <feGaussianBlur stdDeviation="4.8" />
                    </filter>
                    <filter id={`blur-mid-${uid}`} x="-14%" y="-20%" width="128%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" />
                    </filter>
                    <filter id={`blur-core-${uid}`} x="-12%" y="-18%" width="124%" height="136%">
                      <feGaussianBlur stdDeviation="1.4" />
                    </filter>
                    <filter id={`blur-sheen-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.2" />
                    </filter>

                    {/* Calibration card matte laminate gradient */}
                    <linearGradient id={`card-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDFCF8" />
                      <stop offset="65%" stopColor="#F8F6F0" />
                      <stop offset="100%" stopColor="#EFECE3" />
                    </linearGradient>

                    {/* Four-tone PE-film backsheet shading (light from upper-left) */}
                    <linearGradient id={`pe-top-peek-${uid}`} x1="10%" y1="0%" x2="90%" y2="100%">
                      <stop offset="0%" stopColor="#E1EAF0" />
                      <stop offset="35%" stopColor="#CBD7DF" />
                      <stop offset="76%" stopColor="#B4C3CE" />
                      <stop offset="100%" stopColor="#94A7B4" />
                    </linearGradient>

                    {/* Four-tone outer sealed skirt flange */}
                    <linearGradient id={`flange-grad-${uid}`} x1="12%" y1="0%" x2="88%" y2="100%">
                      <stop offset="0%" stopColor="#F9F7F1" />
                      <stop offset="32%" stopColor="#EFECE2" />
                      <stop offset="74%" stopColor="#DDD7C8" />
                      <stop offset="100%" stopColor="#C5BEB0" />
                    </linearGradient>

                    {/* Four-tone sculpted non-woven pillow body */}
                    <linearGradient id={`body-4tone-${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="18%" stopColor="#FAF8F2" />
                      <stop offset="56%" stopColor="#F4F0E6" />
                      <stop offset="86%" stopColor="#E5DFD2" />
                      <stop offset="100%" stopColor="#CFC8B8" />
                    </linearGradient>

                    {/* Soft inner cushion perimeter bevel */}
                    <radialGradient id={`body-bevel-${uid}`} cx="44%" cy="40%" r="58%">
                      <stop offset="64%" stopColor="#FAF8F2" stopOpacity="0" />
                      <stop offset="88%" stopColor="#C4BCAE" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#9E9687" stopOpacity="0.44" />
                    </radialGradient>

                    {/* Four-tone domed absorbent pulp core */}
                    <radialGradient id={`core-4tone-${uid}`} cx="44%" cy="38%" r="56%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="46%" stopColor="#FAF8F2" />
                      <stop offset="78%" stopColor="#EDE8DC" />
                      <stop offset="94%" stopColor="#DDD6C7" />
                      <stop offset="100%" stopColor="#C7BFAF" />
                    </radialGradient>

                    {/* Four-tone standing leak-guard cuff ribbon shading */}
                    <linearGradient id={`cuff-top-4tone-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="28%" stopColor="#F8F5ED" />
                      <stop offset="72%" stopColor="#E3DDD0" />
                      <stop offset="100%" stopColor="#C2BBA9" />
                    </linearGradient>
                    <linearGradient id={`cuff-bot-4tone-${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="28%" stopColor="#F8F5ED" />
                      <stop offset="72%" stopColor="#E3DDD0" />
                      <stop offset="100%" stopColor="#C2BBA9" />
                    </linearGradient>

                    {/* Four-tone folded wing shading */}
                    <linearGradient id={`wing-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F7F4EC" />
                      <stop offset="45%" stopColor="#E9E4D9" />
                      <stop offset="82%" stopColor="#D4CEC0" />
                      <stop offset="100%" stopColor="#BAB3A4" />
                    </linearGradient>

                    {/* Recessed quilted diamond embossing pattern (paired shadow + lit highlight bevels) */}
                    <pattern
                      id={`quilt-emboss-${uid}`}
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      {/* Recessed groove shadow */}
                      <path
                        d="M 0 5 L 5 0 L 10 5 L 5 10 Z"
                        fill="none"
                        stroke="#C6BFB0"
                        strokeWidth="0.65"
                        strokeOpacity="0.72"
                      />
                      {/* Adjacent lit micro-ridge (+0.6px down-right) */}
                      <path
                        d="M 0.6 5.6 L 5.6 0.6 L 10.6 5.6 L 5.6 10.6 Z"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="0.55"
                        strokeOpacity="0.82"
                      />
                      {/* Embossed pin-dimple at diamond vertices */}
                      <circle cx="5" cy="0" r="0.75" fill="#B5AE9E" fillOpacity="0.6" />
                      <circle cx="0" cy="5" r="0.75" fill="#B5AE9E" fillOpacity="0.6" />
                    </pattern>

                    {/* Fine bedside sterile mat drafting grid */}
                    <pattern id={`mat-grid-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#DFD9CC" strokeWidth="0.5" />
                    </pattern>

                    {/* Clip paths so stain NEVER escapes the heat-sealed perimeter */}
                    <clipPath id={`body-clip-${uid}`}>
                      <path d={PAD_CUSHION_PATH} />
                    </clipPath>
                    <clipPath id={`stain-clip-${uid}`}>
                      <path d={PAD_SEAM_PATH} />
                    </clipPath>
                    <clipPath id={`core-clip-${uid}`}>
                      <path d={ABSORBENT_CORE_PATH} />
                    </clipPath>
                  </defs>

                  {/* 0. STERILE BEDSIDE MAT & SUBTLE REGISTRATION MARKS */}
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
                    380 MM MATERNITY PAD · ANTERIOR ← · → POSTERIOR
                  </text>

                  {/* CALIBRATION CARD CORNER (multi-part laminated reference card) */}
                  <CalibrationCardCorner uid={uid} />

                  {/* FOLDED ADHESIVE WING ASSEMBLIES (top & bottom mid-waist, multi-part) */}
                  <g>
                    {/* Top folded wing: contact shadow -> PE backing peek -> non-woven ear -> fold crease + emboss */}
                    <path d="M 127 45 C 134 31, 173 31, 182 47 Z" fill="#141716" fillOpacity="0.1" transform="translate(2, 2)" />
                    <path d="M 126 44.5 C 133.5 30, 173.5 30, 182 46.5 Z" fill="#C4D1DA" stroke="#9EB0BC" strokeWidth="0.7" />
                    <path d="M 127.5 45 C 135 32.5, 172 32.5, 180.5 47 Z" fill={`url(#wing-grad-${uid})`} stroke="#B8B1A2" strokeWidth="0.8" />
                    <path d="M 134 42 C 144 36.5, 165 36.5, 174 43" fill="none" stroke="#FFFFFF" strokeWidth="0.65" strokeOpacity="0.7" />
                    <path d="M 132 45 C 144 41.5, 164 41.5, 176 46" fill="none" stroke="#AEA797" strokeWidth="0.65" strokeDasharray="2 2" />

                    {/* Bottom folded wing */}
                    <path d="M 127 139 C 134 153, 173 153, 182 137 Z" fill="#141716" fillOpacity="0.13" transform="translate(2, 2.5)" />
                    <path d="M 126 139.5 C 133.5 154, 173.5 154, 182 137.5 Z" fill="#B5C4CE" stroke="#95A7B3" strokeWidth="0.7" />
                    <path d="M 127.5 139 C 135 151.5, 172 151.5, 180.5 137 Z" fill={`url(#wing-grad-${uid})`} stroke="#B0A899" strokeWidth="0.8" />
                    <path d="M 134 142 C 144 147.5, 165 147.5, 174 141" fill="none" stroke="#A69F90" strokeWidth="0.65" strokeDasharray="2 2" />
                  </g>

                  {/* LAYER 1: PE-FILM WATERPROOF BACKSHEET (offset 3px down-right, 4-tone matte PE lip) */}
                  <g transform="translate(3, 3)" filter={`url(#pad-shadow-${uid})`}>
                    {/* Deep contact occlusion edge */}
                    <path
                      d={PAD_OUTER_PATH}
                      fill="#8E9FA9"
                      transform="translate(0.9, 0.9)"
                    />
                    {/* Main PE-film silhouette */}
                    <path
                      d={PAD_OUTER_PATH}
                      fill={`url(#pe-top-peek-${uid})`}
                      stroke="#95A8B4"
                      strokeWidth="1"
                    />
                    {/* Subtle matte PE specular highlight rim */}
                    <path
                      d={PAD_OUTER_PATH}
                      fill="none"
                      stroke="#EBF2F6"
                      strokeWidth="0.8"
                      strokeOpacity="0.65"
                      transform="translate(-0.7, -0.7)"
                    />
                  </g>

                  {/* LAYER 2: PAD BODY ASSEMBLY (heat-sealed perimeter flange -> 4-tone sculpted cushion -> fibre noise -> ultrasonic stitched seam) */}
                  <g>
                    {/* 2a. Outer heat-sealed perimeter skirt flange */}
                    <path
                      d={PAD_OUTER_PATH}
                      fill={`url(#flange-grad-${uid})`}
                      stroke="#BEB7A8"
                      strokeWidth="0.95"
                    />
                    {/* Crisp lit north-west outer edge */}
                    <path
                      d={PAD_OUTER_PATH}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="0.7"
                      strokeOpacity="0.75"
                      clipPath={`url(#body-clip-${uid})`}
                    />
                    {/* Ultrasonic heat-crimp seal notches around perimeter flange */}
                    <path
                      d={PAD_CUSHION_PATH}
                      fill="none"
                      stroke="#BDB6A7"
                      strokeWidth="2.8"
                      strokeDasharray="1.2 3.2"
                      strokeOpacity="0.55"
                    />

                    {/* 2b. Raised 4-tone sculpted non-woven pad cushion */}
                    <path
                      d={PAD_CUSHION_PATH}
                      fill={`url(#body-4tone-${uid})`}
                      stroke="#C9C2B3"
                      strokeWidth="0.85"
                    />
                    <path d={PAD_CUSHION_PATH} fill={`url(#body-bevel-${uid})`} />

                    {/* 2c. Tactile cellulose fibre grain clipped to cushion */}
                    <rect
                      x="18"
                      y="24"
                      width="280"
                      height="136"
                      filter={`url(#fibre-${uid})`}
                      clipPath={`url(#body-clip-${uid})`}
                    />

                    {/* 2d. Double-pass ultrasonic stitched seam inset ~4px (dark recess + lit puff between stitches) */}
                    <path
                      d={PAD_SEAM_PATH}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeDasharray="2.2 2.6"
                      strokeOpacity="0.8"
                      transform="translate(0.5, 0.5)"
                    />
                    <path
                      d={PAD_SEAM_PATH}
                      fill="none"
                      stroke="#B3AB9B"
                      strokeWidth="0.9"
                      strokeDasharray="2.2 2.6"
                    />
                  </g>

                  {/* LAYER 3: RAISED ABSORBENT CORE ASSEMBLY (recessed moat -> 4-tone dome -> 3D diamond quilting -> flow retention channels) */}
                  <g>
                    {/* 3a. Recessed channel trench shadow around core perimeter */}
                    <path
                      d={ABSORBENT_CORE_PATH}
                      fill="none"
                      stroke="#C5BEB0"
                      strokeWidth="3.8"
                      strokeOpacity="0.52"
                      transform="translate(0.7, 0.9)"
                    />
                    <path
                      d={ABSORBENT_CORE_PATH}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeOpacity="0.7"
                      transform="translate(-0.7, -0.7)"
                    />

                    {/* 3b. Domed 4-tone pulp absorbent core */}
                    <path
                      d={ABSORBENT_CORE_PATH}
                      fill={`url(#core-4tone-${uid})`}
                      stroke="#C5BEB0"
                      strokeWidth="0.85"
                    />

                    {/* 3c. Recessed quilted diamond embossing clipped to core */}
                    <rect
                      x="38"
                      y="46"
                      width="242"
                      height="92"
                      fill={`url(#quilt-emboss-${uid})`}
                      clipPath={`url(#core-clip-${uid})`}
                    />

                    {/* 3d. Pressed anti-bunching fluid retention channels (paired shadow + highlight bevel) */}
                    <path
                      d={CORE_CHANNEL_OUTER}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.4"
                      strokeOpacity="0.75"
                      transform="translate(0.6, 0.7)"
                    />
                    <path
                      d={CORE_CHANNEL_OUTER}
                      fill="none"
                      stroke="#C7C0B0"
                      strokeWidth="1.15"
                      strokeOpacity="0.85"
                    />
                    <path
                      d={CORE_CHANNEL_INNER}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeOpacity="0.7"
                      transform="translate(0.5, 0.6)"
                    />
                    <path
                      d={CORE_CHANNEL_INNER}
                      fill="none"
                      stroke="#CFC8B8"
                      strokeWidth="0.95"
                      strokeOpacity="0.78"
                    />
                  </g>

                  {/* LAYER 4 (beneath stain so fluid soaks realistically over ink): PRINTED TECHNICAL MARKINGS */}
                  <g fill="#948E82" fontFamily="IBM Plex Mono, monospace">
                    <text
                      x="280"
                      y="92"
                      textAnchor="middle"
                      fontSize="5.2"
                      letterSpacing="0.85"
                      transform="rotate(-90 280 92)"
                    >
                      MATERNITY · 380 MM
                    </text>
                    <text
                      x="35"
                      y="92"
                      textAnchor="middle"
                      fontSize="4.6"
                      letterSpacing="0.7"
                      opacity="0.75"
                      transform="rotate(-90 35 92)"
                    >
                      FRONT
                    </text>
                  </g>

                  {/* LAYER 5: INTERACTIVE BLOOD STAIN (exact preserved behaviour: 3 feathered layers + clots + sheen, strictly clipped inside seam) */}
                  <g clipPath={`url(#stain-clip-${uid})`}>
                    <g
                      data-testid="pad-stain-group"
                      className="pad-stain-animated"
                      style={{ transform: stainTransform }}
                    >
                      {/* 5a. Outer pale-rose serum halo (~25% opacity, feathered edge) */}
                      <path
                        d={STAIN_HALO_PATH}
                        fill={metrics.haloColor}
                        fillOpacity={metrics.haloOpacity}
                        filter={`url(#blur-halo-${uid})`}
                        className="pad-stain-color"
                      />

                      {/* 5b. Mid stain body (organic core-guided spread) */}
                      <path
                        d={STAIN_MID_PATH}
                        fill={metrics.midColor}
                        fillOpacity={metrics.midOpacity}
                        filter={`url(#blur-mid-${uid})`}
                        className="pad-stain-color"
                      />

                      {/* 5c. Inner saturated core */}
                      <path
                        d={STAIN_CORE_PATH}
                        fill={metrics.coreColor}
                        fillOpacity={metrics.coreOpacity}
                        filter={`url(#blur-core-${uid})`}
                        className="pad-stain-color"
                      />

                      {/* 5d. Irregular near-black clots at high volumes */}
                      {CLOT_SHAPES.map((d, idx) => (
                        <path
                          key={idx}
                          d={d}
                          fill="#190306"
                          fillOpacity={idx < metrics.clotCount ? metrics.clotOpacity : 0}
                          className="pad-stain-color"
                        />
                      ))}

                      {/* 5e. Soft specular pooling sheen (>= ~600 mL, white ellipse up to 15% opacity) */}
                      <ellipse
                        cx="196"
                        cy="85"
                        rx="28"
                        ry="7.5"
                        transform="rotate(-7 196 85)"
                        fill="#FFFFFF"
                        fillOpacity={metrics.sheenOpacity}
                        filter={`url(#blur-sheen-${uid})`}
                        className="pad-stain-color"
                      />
                    </g>

                    {/* Faint embossed diamond quilting & channels showing through soaked textile fibres */}
                    <rect
                      x="38"
                      y="46"
                      width="242"
                      height="92"
                      fill={`url(#quilt-emboss-${uid})`}
                      opacity="0.22"
                      clipPath={`url(#core-clip-${uid})`}
                    />
                    <path
                      d={CORE_CHANNEL_OUTER}
                      fill="none"
                      stroke="#141716"
                      strokeWidth="0.65"
                      strokeOpacity="0.1"
                    />
                  </g>

                  {/* LAYER 6: RAISED ELASTIC LEAK-GUARD CUFFS (multi-part standing 3D ribbons with cast shadow, anchor seams, twin elastic strands & sculpted gathers) */}
                  <g>
                    {/* ---- TOP LEAK-GUARD CUFF ---- */}
                    {/* Cast shadow falling onto pad deck */}
                    <path
                      d={TOP_CUFF_BAND}
                      fill="#7D7669"
                      fillOpacity="0.25"
                      filter={`url(#cuff-shadow-${uid})`}
                      transform="translate(0.6, 2.2)"
                    />
                    {/* Base ultrasonic anchor tack line */}
                    <path
                      d={TOP_CUFF_ANCHOR}
                      fill="none"
                      stroke="#B3AC9D"
                      strokeWidth="0.7"
                      strokeDasharray="1.8 1.8"
                    />
                    {/* Sculpted 4-tone standing cuff ribbon */}
                    <path
                      d={TOP_CUFF_BAND}
                      fill={`url(#cuff-top-4tone-${uid})`}
                      stroke="#BDB6A7"
                      strokeWidth="0.65"
                    />
                    {/* Crisp lit top ridge highlight */}
                    <path
                      d={TOP_CUFF_RIDGE}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.05"
                      strokeOpacity="0.92"
                    />
                    {/* Twin internal elastic Lycra tension threads */}
                    <path
                      d={TOP_CUFF_RIDGE}
                      fill="none"
                      stroke="#CFC8B8"
                      strokeWidth="0.45"
                      strokeOpacity="0.7"
                      transform="translate(0, 1.8)"
                    />
                    {/* 16 sculpted ruched gather folds (paired shadow crease + lit pleat highlight) */}
                    {CUFF_GATHERS.map((g, i) => (
                      <g key={`tg-${i}`} transform={`translate(${g.x}, ${g.topY}) rotate(${g.angle})`}>
                        <line x1="0" y1="-2.4" x2="0.6" y2="2.5" stroke="#ABA393" strokeWidth="0.75" strokeOpacity="0.82" />
                        <line x1="1.1" y1="-2.2" x2="1.6" y2="2.4" stroke="#FFFFFF" strokeWidth="0.65" strokeOpacity="0.85" />
                      </g>
                    ))}

                    {/* ---- BOTTOM LEAK-GUARD CUFF ---- */}
                    {/* Cast shadow onto pad deck */}
                    <path
                      d={BOTTOM_CUFF_BAND}
                      fill="#7D7669"
                      fillOpacity="0.28"
                      filter={`url(#cuff-shadow-${uid})`}
                      transform="translate(0.6, -1.8)"
                    />
                    {/* Base ultrasonic anchor tack line */}
                    <path
                      d={BOTTOM_CUFF_ANCHOR}
                      fill="none"
                      stroke="#B3AC9D"
                      strokeWidth="0.7"
                      strokeDasharray="1.8 1.8"
                    />
                    {/* Sculpted 4-tone standing cuff ribbon */}
                    <path
                      d={BOTTOM_CUFF_BAND}
                      fill={`url(#cuff-bot-4tone-${uid})`}
                      stroke="#B8B0A0"
                      strokeWidth="0.65"
                    />
                    {/* Crisp lit cuff crest highlight */}
                    <path
                      d={BOTTOM_CUFF_RIDGE}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.05"
                      strokeOpacity="0.88"
                    />
                    {/* Twin internal elastic tension thread */}
                    <path
                      d={BOTTOM_CUFF_RIDGE}
                      fill="none"
                      stroke="#C5BEB0"
                      strokeWidth="0.45"
                      strokeOpacity="0.72"
                      transform="translate(0, -1.8)"
                    />
                    {/* 16 sculpted ruched gather folds */}
                    {CUFF_GATHERS.map((g, i) => {
                      const botY = 184 - g.topY;
                      return (
                        <g key={`bg-${i}`} transform={`translate(${g.x}, ${botY}) rotate(${-g.angle})`}>
                          <line x1="0" y1="-2.5" x2="0.6" y2="2.4" stroke="#A59D8D" strokeWidth="0.75" strokeOpacity="0.82" />
                          <line x1="1.1" y1="-2.4" x2="1.6" y2="2.2" stroke="#FFFFFF" strokeWidth="0.65" strokeOpacity="0.82" />
                        </g>
                      );
                    })}
                  </g>
                </svg>
  );
};
