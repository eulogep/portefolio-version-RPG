import { useRef, useEffect } from 'react';

class AudioEffects {
  constructor() {
    this.audioContext = null;
    this.sounds = new Map();
    this.enabled = true;
    this.masterVolume = 0.3;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      this.enabled = false;
    }
  }

  // Resume audio context (required for user interaction)
  async resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // Create oscillator-based sound effects
  createOscillatorSound(frequency, duration = 200, type = 'sine', volume = 0.1) {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  // Create complex sound effects
  createComplexSound(config) {
    if (!this.enabled || !this.audioContext) return;

    const { frequencies, duration = 300, volume = 0.1, envelope = 'linear' } = config;
    
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.createOscillatorSound(freq, duration / frequencies.length, 'sine', volume);
      }, index * (duration / frequencies.length / 2));
    });
  }

  // Predefined sound effects
  playHoverSound() {
    this.createOscillatorSound(440, 100, 'sine', 0.05);
  }

  playClickSound() {
    this.createComplexSound({
      frequencies: [600, 800],
      duration: 150,
      volume: 0.08
    });
  }

  playSuccessSound() {
    this.createComplexSound({
      frequencies: [523, 659, 784],
      duration: 400,
      volume: 0.1
    });
  }

  playErrorSound() {
    this.createComplexSound({
      frequencies: [200, 150],
      duration: 300,
      volume: 0.08
    });
  }

  playXPSound() {
    this.createComplexSound({
      frequencies: [523, 659, 784, 988],
      duration: 500,
      volume: 0.06
    });
  }

  playLevelUpSound() {
    this.createComplexSound({
      frequencies: [523, 659, 784, 988, 1175],
      duration: 800,
      volume: 0.08
    });
  }

  playNotificationSound() {
    this.createOscillatorSound(800, 200, 'square', 0.05);
  }

  playGameStartSound() {
    this.createComplexSound({
      frequencies: [330, 415, 523],
      duration: 600,
      volume: 0.07
    });
  }

  playGameEndSound() {
    this.createComplexSound({
      frequencies: [523, 415, 330, 262],
      duration: 800,
      volume: 0.07
    });
  }

  playTypingSound() {
    this.createOscillatorSound(Math.random() * 200 + 400, 50, 'square', 0.02);
  }

  playScrollSound() {
    this.createOscillatorSound(300 + Math.random() * 100, 30, 'sawtooth', 0.01);
  }

  // Ambient sounds
  playAmbientLoop(type = 'space') {
    if (!this.enabled || !this.audioContext) return;

    const configs = {
      space: {
        frequency: 60,
        modulation: 0.5,
        duration: 10000
      },
      digital: {
        frequency: 200,
        modulation: 2,
        duration: 8000
      },
      energy: {
        frequency: 100,
        modulation: 1.5,
        duration: 12000
      }
    };

    const config = configs[type] || configs.space;
    
    const oscillator = this.audioContext.createOscillator();
    const lfo = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const lfoGain = this.audioContext.createGain();
    
    // Setup modulation
    lfo.frequency.setValueAtTime(config.modulation, this.audioContext.currentTime);
    lfoGain.gain.setValueAtTime(20, this.audioContext.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    
    // Setup main oscillator
    oscillator.frequency.setValueAtTime(config.frequency, this.audioContext.currentTime);
    oscillator.type = 'sawtooth';
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Volume control
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.02 * this.masterVolume, this.audioContext.currentTime + 1);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + config.duration / 1000);
    
    oscillator.start(this.audioContext.currentTime);
    lfo.start(this.audioContext.currentTime);
    
    oscillator.stop(this.audioContext.currentTime + config.duration / 1000);
    lfo.stop(this.audioContext.currentTime + config.duration / 1000);
  }

  // White noise generator for sci-fi effects
  createWhiteNoise(duration = 100, volume = 0.02) {
    if (!this.enabled || !this.audioContext) return;

    const bufferSize = this.audioContext.sampleRate * (duration / 1000);
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    gainNode.gain.setValueAtTime(volume * this.masterVolume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);
    
    source.start(this.audioContext.currentTime);
  }

  // Enable/disable sounds
  setEnabled(enabled) {
    this.enabled = enabled;
  }

  // Set master volume
  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  // Destroy audio context
  destroy() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Create singleton instance
const audioEffects = new AudioEffects();

// React hook for using audio effects
export const useAudioEffects = () => {
  const audioRef = useRef(audioEffects);

  useEffect(() => {
    // Resume audio context on first user interaction
    const handleFirstInteraction = () => {
      audioRef.current.resumeContext();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return audioRef.current;
};

// Sound effect trigger functions
export const soundEffects = {
  hover: () => audioEffects.playHoverSound(),
  click: () => audioEffects.playClickSound(),
  success: () => audioEffects.playSuccessSound(),
  error: () => audioEffects.playErrorSound(),
  xp: () => audioEffects.playXPSound(),
  levelUp: () => audioEffects.playLevelUpSound(),
  notification: () => audioEffects.playNotificationSound(),
  gameStart: () => audioEffects.playGameStartSound(),
  gameEnd: () => audioEffects.playGameEndSound(),
  typing: () => audioEffects.playTypingSound(),
  scroll: () => audioEffects.playScrollSound(),
  ambientSpace: () => audioEffects.playAmbientLoop('space'),
  ambientDigital: () => audioEffects.playAmbientLoop('digital'),
  ambientEnergy: () => audioEffects.playAmbientLoop('energy'),
  whiteNoise: () => audioEffects.createWhiteNoise(),
};

export default audioEffects;