import React from 'react';

export default function Moon({ moonRef }) {
  return (
    <div
      ref={moonRef}
      className="hero-layer-moon"
      style={{
        position: 'absolute',
        top: '8%',
        right: '12%',
        width: 'clamp(180px, 22vw, 320px)',
        height: 'clamp(180px, 22vw, 320px)',
        borderRadius: '50%',
        zIndex: 3,
        pointerEvents: 'none',
      }}
    >
      {/* Outer Halo Glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-35%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 170, 70, 0.45) 0%, rgba(255, 77, 0, 0.15) 45%, transparent 70%)',
          animation: 'moonGlow 6s ease-in-out infinite',
        }}
      />

      {/* Moon Disc */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #FFF2DD 0%, #E2BE93 50%, #9B6C42 85%, #422612 100%)',
          boxShadow: '0 0 50px rgba(255, 140, 20, 0.5), inset -15px -15px 40px rgba(20, 10, 5, 0.85)',
          overflow: 'hidden',
        }}
      >
        {/* Crater Details */}
        <div style={{ position: 'absolute', top: '25%', left: '30%', width: '18%', height: '22%', borderRadius: '50%', background: 'rgba(110, 70, 40, 0.25)', filter: 'blur(3px)' }} />
        <div style={{ position: 'absolute', top: '48%', left: '20%', width: '25%', height: '28%', borderRadius: '50%', background: 'rgba(100, 60, 30, 0.3)', filter: 'blur(4px)' }} />
        <div style={{ position: 'absolute', top: '60%', left: '55%', width: '30%', height: '25%', borderRadius: '50%', background: 'rgba(90, 50, 25, 0.35)', filter: 'blur(4px)' }} />
        <div style={{ position: 'absolute', top: '15%', left: '60%', width: '14%', height: '14%', borderRadius: '50%', background: 'rgba(110, 70, 40, 0.2)', filter: 'blur(2px)' }} />

        {/* Surface texture grain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '4px 4px',
          }}
        />
      </div>
    </div>
  );
}
