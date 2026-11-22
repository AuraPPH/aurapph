export type PenetrationStage = 'SURFACE' | 'PARTIAL' | 'THROUGH';

export interface PadVisualMetrics {
  /** Approximate stained surface area in cm², saturating at full pad coverage */
  stainAreaCm2: number;
  /** Penetration classification derived from simulated blood volume */
  penetrationStage: PenetrationStage;
  /** Whether underside bleed-through is visible on the PE backsheet */
  undersideVisible: boolean;
  /** Underside penetration area divided by top area, rounded percentage (0–100) */
  penetrationRatioPct: number;
  /** Longitudinal spread along the core (length grows faster than width) */
  stainScaleX: number;
  /** Lateral spread across the pad width */
  stainScaleY: number;
  /** Underside stain scale relative to top stain */
  undersideScaleX: number;
  undersideScaleY: number;
  undersideOpacity: number;
  /** Blood physics colour palette */
  haloColor: string;
  haloOpacity: number;
  midColor: string;
  midOpacity: number;
  coreColor: string;
  coreOpacity: number;
  /** Clot visibility (0..1) and count (0..4) for high volume */
  clotOpacity: number;
  clotCount: number;
  /** Specular wet pooling sheen opacity (0..0.16), activates around >= 600 mL */
  sheenOpacity: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

function lerpHexColor(hexA: string, hexB: string, t: number): string {
  const f = clamp(t, 0, 1);
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const ar = (a >> 16) & 255;
  const ag = (a >> 8) & 255;
  const ab = a & 255;
  const br = (b >> 16) & 255;
  const bg = (b >> 8) & 255;
  const bb = b & 255;
  const r = Math.round(lerp(ar, br, f));
  const g = Math.round(lerp(ag, bg, f));
  const bl = Math.round(lerp(ab, bb, f));
  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
}

/**
 * Pure model mapping simulated blood volume (100–1,400 mL) to visual pad metrics:
 * - Saturating area curve (caps cleanly at full maternity pad coverage ~230 cm²)
 * - Longitudinal core-guided spreading (length grows faster than width)
 * - Blood physics darkening, clot emergence, and pooling sheen >= 600 mL
 * - Penetration stage (SURFACE / PARTIAL / THROUGH) and underside ratio
 */
export function computePadVisualMetrics(volumeMl: number): PadVisualMetrics {
  const v = clamp(volumeMl, 100, 1400);

  // Saturating exponential coverage curve: rises briskly through 100-750 mL, plateaus near ~228 cm²
  const maxAreaCm2 = 228;
  const sat = 1 - Math.exp(-v / 360);
  const stainAreaCm2 = Math.round(clamp(maxAreaCm2 * sat, 32, maxAreaCm2));

  // Normalised growth factor 0..1 (reaches ~0.92 by 900 mL, saturates at 1.0 by 1,250 mL)
  const areaNorm = clamp((sat - (1 - Math.exp(-100 / 360))) / (1 - (1 - Math.exp(-100 / 360))), 0, 1);

  // Length (X) grows faster along the absorbent core channel than width (Y), capped inside pad seam
  const stainScaleX = Number(lerp(0.38, 1.0, Math.pow(areaNorm, 0.72)).toFixed(3));
  const stainScaleY = Number(lerp(0.44, 0.96, Math.pow(areaNorm, 0.95)).toFixed(3));

  // Penetration classification
  let penetrationStage: PenetrationStage;
  if (v < 300) {
    penetrationStage = 'SURFACE';
  } else if (v <= 650) {
    penetrationStage = 'PARTIAL';
  } else {
    penetrationStage = 'THROUGH';
  }

  // Underside penetration visibility & ratio (underside area / top area)
  const undersideVisible = v >= 300;
  let penetrationRatioPct = 0;
  if (undersideVisible) {
    // Rises smoothly from ~14% at 300 mL to ~86% at 1,400 mL
    const penNorm = clamp((v - 300) / 1100, 0, 1);
    penetrationRatioPct = Math.round(lerp(14, 86, Math.pow(penNorm, 0.78)));
  }

  // Underside stain is strictly smaller and more diffuse than the top stain
  const ratioScale = undersideVisible ? Math.sqrt(penetrationRatioPct / 100) : 0;
  const undersideScaleX = Number((stainScaleX * clamp(ratioScale * 0.94, 0, 0.88)).toFixed(3));
  const undersideScaleY = Number((stainScaleY * clamp(ratioScale * 0.92, 0, 0.86)).toFixed(3));
  const undersideOpacity = undersideVisible
    ? Number(lerp(0.32, 0.78, clamp((v - 300) / 900, 0, 1)).toFixed(2))
    : 0;

  // Blood colour physics:
  // Low (100-350): brighter fresh red with translucent edges
  // Mid (350-750): deeper arterial/venous crimson
  // High (750-1400): dark maroon with clots and wet pooling sheen
  const tMid = clamp((v - 150) / 450, 0, 1);
  const tHigh = clamp((v - 600) / 650, 0, 1);

  const haloColor =
    v <= 600
      ? lerpHexColor('#E5989E', '#C96A72', tMid)
      : lerpHexColor('#C96A72', '#9A434B', tHigh);
  const haloOpacity = Number(lerp(0.24, 0.32, clamp((v - 100) / 1100, 0, 1)).toFixed(2));

  const midColor =
    v <= 600
      ? lerpHexColor('#CC2B32', '#96151D', tMid)
      : lerpHexColor('#96151D', '#580A10', tHigh);
  const midOpacity = Number(lerp(0.76, 0.95, clamp((v - 100) / 700, 0, 1)).toFixed(2));

  const coreColor =
    v <= 600
      ? lerpHexColor('#A61B22', '#6B0D14', tMid)
      : lerpHexColor('#6B0D14', '#330509', tHigh);
  const coreOpacity = Number(lerp(0.82, 0.98, clamp((v - 100) / 600, 0, 1)).toFixed(2));

  // Clots: appear in mid-high to high range (2–4 irregular near-black shapes)
  let clotCount = 0;
  let clotOpacity = 0;
  if (v >= 600) {
    const clotNorm = clamp((v - 600) / 550, 0, 1);
    clotOpacity = Number(lerp(0.35, 0.92, clotNorm).toFixed(2));
    if (v >= 1000) {
      clotCount = 4;
    } else if (v >= 780) {
      clotCount = 3;
    } else {
      clotCount = 2;
    }
  }

  // Soft specular pooling sheen (white ellipse up to ~15% opacity once volume >= ~600 mL)
  const sheenOpacity =
    v >= 580 ? Number(lerp(0.05, 0.15, clamp((v - 580) / 520, 0, 1)).toFixed(3)) : 0;

  return {
    stainAreaCm2,
    penetrationStage,
    undersideVisible,
    penetrationRatioPct,
    stainScaleX,
    stainScaleY,
    undersideScaleX,
    undersideScaleY,
    undersideOpacity,
    haloColor,
    haloOpacity,
    midColor,
    midOpacity,
    coreColor,
    coreOpacity,
    clotOpacity,
    clotCount,
    sheenOpacity,
  };
}
