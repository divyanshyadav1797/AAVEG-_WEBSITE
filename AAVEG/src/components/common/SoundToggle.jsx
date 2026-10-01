import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleAudio, isAudioActive } from '../../utils/sound';

export default function SoundToggle() {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    const newState = toggleAudio();
    setActive(newState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="interactive-cursor flex-center"
      style={{
        padding: '7px 12px',
        borderRadius: '20px',
        background: active ? 'rgba(255, 77, 0, 0.18)' : 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${active ? 'rgba(255, 77, 0, 0.45)' : 'rgba(255, 255, 255, 0.1)'}`,
        backdropFilter: 'blur(10px)',
        color: active ? '#FF7A32' : 'var(--text-muted)',
        fontSize: '0.75rem',
        fontWeight: '600',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        gap: '6px',
        transition: 'all 0.3s ease',
      }}
      title={active ? 'Mute Atmosphere Audio' : 'Play Haunted Atmosphere Audio'}
      aria-label="Toggle Atmosphere Sound"
    >
      {active ? <Volume2 size={15} /> : <VolumeX size={15} />}
      <span className="desktop-only">{active ? 'SOUND ON' : 'ATMOSPHERE'}</span>
      {active && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '10px' }}>
          <span className="wave-bar" style={{ width: '2px', height: '6px', background: '#FF4D00', animation: 'batFlap 0.8s infinite' }} />
          <span className="wave-bar" style={{ width: '2px', height: '10px', background: '#FF4D00', animation: 'batFlap 0.6s infinite 0.2s' }} />
          <span className="wave-bar" style={{ width: '2px', height: '4px', background: '#FF4D00', animation: 'batFlap 0.9s infinite 0.4s' }} />
        </span>
      )}
    </button>
  );
}
