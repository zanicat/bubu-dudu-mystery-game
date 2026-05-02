let ctx = null;

function getCtx() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch { ctx = null; }
  }
  if (ctx && ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function playNote(freq, when, duration, type = 'sine', gain = 0.18, detune = 0) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(gain, when + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  osc.connect(g).connect(c.destination);
  osc.start(when);
  osc.stop(when + duration + 0.05);
}

export function playFindChime() {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime;
  playNote(523.25, t0 + 0.00, 0.22, 'sine', 0.18);  // C5
  playNote(659.25, t0 + 0.08, 0.22, 'sine', 0.18);  // E5
  playNote(783.99, t0 + 0.16, 0.30, 'sine', 0.20, 5); // G5
}

export function playUnlock() {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime;
  playNote(523.25, t0 + 0.00, 0.18, 'sine', 0.18);
  playNote(659.25, t0 + 0.08, 0.18, 'sine', 0.18);
  playNote(783.99, t0 + 0.16, 0.18, 'sine', 0.18);
  playNote(1046.5, t0 + 0.24, 0.40, 'sine', 0.22);
  playNote(130.81, t0 + 0.00, 0.42, 'triangle', 0.08);
}

export function playSoftClick() {
  const c = getCtx();
  if (!c) return;
  playNote(800, c.currentTime, 0.05, 'triangle', 0.06);
}

export function playMiss() {
  const c = getCtx();
  if (!c) return;
  playNote(220, c.currentTime, 0.08, 'sine', 0.04);
}
