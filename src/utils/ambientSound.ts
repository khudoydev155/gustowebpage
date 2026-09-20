// Ambient Café Atmosphere Web Audio Generator (Whisper-quiet acoustic warmth)
let audioCtx: AudioContext | null = null;
let noiseNode: AudioNode | null = null;
let gainNode: GainNode | null = null;
let isPlaying = false;

export function toggleAmbientAudio(onStateChange?: (playing: boolean) => void): boolean {
  if (isPlaying) {
    if (gainNode && audioCtx) {
      gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (noiseNode) {
          try {
            (noiseNode as AudioBufferSourceNode).stop();
            noiseNode.disconnect();
          } catch {
            // ignore
          }
          noiseNode = null;
        }
        isPlaying = false;
        onStateChange?.(false);
      }, 800);
    } else {
      isPlaying = false;
      onStateChange?.(false);
    }
    return false;
  }

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const bufferSize = audioCtx.sampleRate * 4;
    const buffer = audioCtx.createBuffer(2, bufferSize, audioCtx.sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    // Warm, soft acoustic pink noise filtered like distant café murmurs and soft espresso steam
    let b0L = 0, b1L = 0, b2L = 0;
    let b0R = 0, b1R = 0, b2R = 0;

    for (let i = 0; i < bufferSize; i++) {
      const whiteL = Math.random() * 2 - 1;
      const whiteR = Math.random() * 2 - 1;

      b0L = 0.99886 * b0L + whiteL * 0.0555179;
      b1L = 0.99332 * b1L + whiteL * 0.0750759;
      b2L = 0.96900 * b2L + whiteL * 0.1538520;
      left[i] = (b0L + b1L + b2L + whiteL * 0.5362) * 0.04;

      b0R = 0.99886 * b0R + whiteR * 0.0555179;
      b1R = 0.99332 * b1R + whiteR * 0.0750759;
      b2R = 0.96900 * b2R + whiteR * 0.1538520;
      right[i] = (b0R + b1R + b2R + whiteR * 0.5362) * 0.04;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Low-pass warmth filter mimicking the acoustics of heavy wood and stone
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 1.2);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    source.start(0);
    noiseNode = source;
    isPlaying = true;
    onStateChange?.(true);
    return true;
  } catch (err) {
    console.warn('Web Audio Ambient not supported:', err);
    isPlaying = false;
    onStateChange?.(false);
    return false;
  }
}

export function isAmbientAudioPlaying(): boolean {
  return isPlaying;
}
