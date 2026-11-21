import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ALERT_STATES,
  EMOTIVE_CHECKLIST,
  SIMULATOR_PRESETS,
  classifyStateByMidpoint,
  computeSimulation,
  shouldShowUnderestimationInsight,
} from './triveni';

test('always outputs a strict blood-loss range, never a single mL value', () => {
  for (let vol = 100; vol <= 1400; vol += 50) {
    const res = computeSimulation({ trueVolumeMl: vol, lighting: 'daylight', tilted: false });
    assert.ok(res.lowMl < res.highMl, `Expected lowMl < highMl for ${vol}`);
    assert.match(res.rangeLabel, /\d[\d,]*–\d[\d,]* mL/);
  }
});

test('dim room and tilted capture each widen the output range', () => {
  const base = computeSimulation({ trueVolumeMl: 600, lighting: 'daylight', tilted: false });
  const dim = computeSimulation({ trueVolumeMl: 600, lighting: 'dim', tilted: false });
  const tilted = computeSimulation({ trueVolumeMl: 600, lighting: 'daylight', tilted: true });
  const both = computeSimulation({ trueVolumeMl: 600, lighting: 'dim', tilted: true });

  const baseSpan = base.highMl - base.lowMl;
  const dimSpan = dim.highMl - dim.lowMl;
  const tiltedSpan = tilted.highMl - tilted.lowMl;
  const bothSpan = both.highMl - both.lowMl;

  assert.ok(dimSpan > baseSpan, 'Dim room should widen range');
  assert.ok(tiltedSpan > baseSpan, 'Tilted capture should widen range');
  assert.ok(bothSpan > dimSpan && bothSpan > tiltedSpan, 'Both conditions should widen range most');
});

test('state classification strictly obeys BLUE < 350, AMBER 350-500, RED 500-1000, DARK RED > 1000', () => {
  assert.equal(classifyStateByMidpoint(100), 'BLUE');
  assert.equal(classifyStateByMidpoint(349), 'BLUE');
  assert.equal(classifyStateByMidpoint(350), 'AMBER');
  assert.equal(classifyStateByMidpoint(500), 'AMBER');
  assert.equal(classifyStateByMidpoint(501), 'RED');
  assert.equal(classifyStateByMidpoint(1000), 'RED');
  assert.equal(classifyStateByMidpoint(1001), 'DARK_RED');
  assert.equal(classifyStateByMidpoint(1400), 'DARK_RED');
});

test('presets match their exact state and clean daylight range', () => {
  for (const preset of SIMULATOR_PRESETS) {
    const res = computeSimulation({
      trueVolumeMl: preset.volumeMl,
      lighting: 'daylight',
      tilted: false,
    });
    assert.equal(res.state.id, preset.expectedState, `Preset ${preset.id} state mismatch`);
    assert.ok(
      preset.label.startsWith(res.rangeLabel),
      `Preset ${preset.id} label "${preset.label}" should start with "${res.rangeLabel}"`
    );
  }
});

test('TRIVENI hard rules: no green state and never uses forbidden reassurance words', () => {
  const forbidden = /\b(safe|normal|all clear|green)\b/i;
  for (const meta of Object.values(ALERT_STATES)) {
    assert.doesNotMatch(meta.labelEn, forbidden);
    assert.doesNotMatch(meta.sublineEn, forbidden);
    assert.notEqual(meta.colorHex.toLowerCase(), '#00ff00');
  }
  assert.equal(Object.keys(ALERT_STATES).length, 4);
});

test('checklist is hidden for BLUE and shown for AMBER, RED, and DARK_RED', () => {
  const blue = computeSimulation({ trueVolumeMl: 250, lighting: 'daylight', tilted: false });
  const amber = computeSimulation({ trueVolumeMl: 430, lighting: 'daylight', tilted: false });
  const red = computeSimulation({ trueVolumeMl: 700, lighting: 'daylight', tilted: false });
  const darkRed = computeSimulation({ trueVolumeMl: 1200, lighting: 'daylight', tilted: false });

  assert.equal(blue.showChecklist, false);
  assert.equal(amber.showChecklist, true);
  assert.equal(red.showChecklist, true);
  assert.equal(darkRed.showChecklist, true);
  assert.equal(EMOTIVE_CHECKLIST.length, 6);
});

test('underestimation insight shows only after guessing AND revealing TRIVENI', () => {
  assert.equal(shouldShowUnderestimationInsight(false, false), false);
  assert.equal(shouldShowUnderestimationInsight(true, false), false);
  assert.equal(shouldShowUnderestimationInsight(false, true), false);
  assert.equal(shouldShowUnderestimationInsight(true, true), true);
});
