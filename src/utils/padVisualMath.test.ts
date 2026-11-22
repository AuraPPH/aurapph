import test from 'node:test';
import assert from 'node:assert/strict';
import { computePadVisualMetrics } from './padVisualMath';

test('stain area grows monotonically on a saturating curve and caps within pad bounds', () => {
  const volumes = [100, 285, 430, 675, 950, 1150, 1400];
  let prevArea = 0;
  for (const v of volumes) {
    const m = computePadVisualMetrics(v);
    assert.ok(m.stainAreaCm2 >= prevArea, `Expected monotonic area growth at ${v} mL`);
    assert.ok(m.stainAreaCm2 <= 228, `Area must cap at full pad coverage, got ${m.stainAreaCm2}`);
    assert.ok(m.stainScaleX <= 1.0 && m.stainScaleY <= 1.0, 'Stain scale must never exceed pad');
    prevArea = m.stainAreaCm2;
  }

  // Saturating curve check: early increment (100->500) adds more cm² than late increment (900->1300)
  const earlyGain =
    computePadVisualMetrics(500).stainAreaCm2 - computePadVisualMetrics(100).stainAreaCm2;
  const lateGain =
    computePadVisualMetrics(1300).stainAreaCm2 - computePadVisualMetrics(900).stainAreaCm2;
  assert.ok(earlyGain > lateGain, 'Area growth should follow a saturating curve');
});

test('length grows faster than width along the absorbent core channel', () => {
  const low = computePadVisualMetrics(150);
  const mid = computePadVisualMetrics(500);
  const deltaX = mid.stainScaleX - low.stainScaleX;
  const deltaY = mid.stainScaleY - low.stainScaleY;
  assert.ok(deltaX > deltaY, `Expected longitudinal delta (${deltaX}) > lateral delta (${deltaY})`);
});

test('penetration stage progresses SURFACE -> PARTIAL -> THROUGH and underside visibility obeys volume', () => {
  const low = computePadVisualMetrics(220);
  assert.equal(low.penetrationStage, 'SURFACE');
  assert.equal(low.undersideVisible, false);
  assert.equal(low.penetrationRatioPct, 0);

  const mid = computePadVisualMetrics(480);
  assert.equal(mid.penetrationStage, 'PARTIAL');
  assert.equal(mid.undersideVisible, true);
  assert.ok(mid.penetrationRatioPct > 0 && mid.penetrationRatioPct < 60);
  assert.ok(mid.undersideScaleX < mid.stainScaleX);

  const high = computePadVisualMetrics(1150);
  assert.equal(high.penetrationStage, 'THROUGH');
  assert.equal(high.undersideVisible, true);
  assert.ok(high.penetrationRatioPct > mid.penetrationRatioPct);
  assert.ok(high.undersideScaleX < high.stainScaleX, 'Underside stain stays smaller than top');
});

test('clots and specular pooling sheen activate at high blood volumes (>= 600 mL)', () => {
  const low = computePadVisualMetrics(285);
  assert.equal(low.clotCount, 0);
  assert.equal(low.sheenOpacity, 0);

  const red = computePadVisualMetrics(675);
  assert.ok(red.clotCount >= 2);
  assert.ok(red.sheenOpacity > 0 && red.sheenOpacity <= 0.16);

  const severe = computePadVisualMetrics(1150);
  assert.equal(severe.clotCount, 4);
  assert.ok(severe.clotOpacity > red.clotOpacity);
  assert.ok(severe.sheenOpacity >= red.sheenOpacity && severe.sheenOpacity <= 0.16);
});
