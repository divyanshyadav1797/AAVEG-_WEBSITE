// Web Audio API Ambient Atmosphere & Sound Effects Generator
// Generates haunting ambient sounds dynamically with zero external asset loading

let audioCtx = null;
let ambientGain = null;
let isMuted = true;

export const initAudio = () => {
  if (typeof window === 'undefined') return;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const startAmbientSound = () => {
  if (typeof window === 'undefined') return;
  initAudio();
  if (!audioCtx) return;

  if (ambientGain) {
    ambientGain.gain.setTargetAtTime(0.12, audioCtx.currentTime, 1.5);
    isMuted = false;
    return;
  }

  try {
    ambientGain = audioCtx.createGain();
    ambientGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 3);
    ambientGain.connect(audioCtx.destination);

    // Deep sub-drone
    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
    
    // Slight detune for haunting phase beat
    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(56.5, audioCtx.currentTime);

    // Filter to soften into deep dark atmospheric rumble
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, audioCtx.currentTime);

    // Low Frequency Oscillator for subtle breathing swell
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.15, audioCtx.currentTime); // 6.6s breath cycle
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(40, audioCtx.currentTime);
    lfo.connect(filter.frequency);
    lfo.start();

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(ambientGain);

    osc1.start();
    osc2.start();

    isMuted = false;
  } catch (e) {
    console.warn('Audio initialisation suppressed:', e);
  }
};

export const stopAmbientSound = () => {
  if (ambientGain && audioCtx) {
    ambientGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.5);
    isMuted = true;
  }
};

export const toggleAudio = () => {
  if (isMuted) {
    startAmbientSound();
    return true;
  } else {
    stopAmbientSound();
    return false;
  }
};

export const isAudioActive = () => !isMuted;

// Gothic Bell / Click Chime
export const playGothicChime = () => {
  if (typeof window === 'undefined' || isMuted) return;
  initAudio();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 1.2);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.3);
  } catch (e) {
    // Suppress silently if user hasn't interacted with audio yet
  }
};
