// GameKingdom Web Audio SFX utility — synthesized tones, no audio files needed
const SFX = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) {
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        return null;
      }
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, type, duration, vol = 0.3, delay = 0) {
    const c = getCtx();
    if (!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + delay);
    gain.gain.setValueAtTime(vol, c.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + duration + 0.01);
  }

  const sounds = {
    click() { tone(800, 'sine', 0.05, 0.25); },
    move()  { tone(400, 'sine', 0.08, 0.2); },
    hit()   { tone(200, 'square', 0.15, 0.3); },
    score() { tone(660, 'sine', 0.12, 0.3); tone(880, 'sine', 0.12, 0.25, 0.1); },
    win() {
      [[523, 0], [659, 0.1], [784, 0.2], [1047, 0.35]].forEach(([f, d]) =>
        tone(f, 'sine', 0.18, 0.3, d));
    },
    lose() {
      tone(440, 'sawtooth', 0.15, 0.25);
      tone(330, 'sawtooth', 0.2, 0.25, 0.15);
      tone(220, 'sawtooth', 0.3, 0.25, 0.3);
    },
    flip()  { tone(600, 'sine', 0.07, 0.2); tone(900, 'sine', 0.07, 0.15, 0.07); },
    wrong() { tone(150, 'square', 0.2, 0.3); tone(120, 'square', 0.2, 0.3, 0.1); },
  };

  return {
    play(name) {
      if (sounds[name]) {
        try { sounds[name](); } catch (e) { /* silently ignore audio errors */ }
      }
    }
  };
})();
