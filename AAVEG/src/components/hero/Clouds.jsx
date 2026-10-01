import React from 'react';

export default function Clouds({ cloudsRef }) {
  return (
    <div
      ref={cloudsRef}
      className="hero-layer-clouds"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '75%',
        zIndex: 4,
        pointerEvents: 'none',
        overflow: 'hidden',
        mixBlendMode: 'screen',
        opacity: 0.6,
      }}
    >
      {/* Cloud Layer 1: Left drift */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: 0,
          width: '200%',
          height: '100%',
          background: 'radial-gradient(ellipse 65% 45% at 30% 30%, rgba(120, 100, 90, 0.28) 0%, transparent 60%)',
          animation: 'cloudDriftLeft 65s linear infinite',
          filter: 'blur(35px)',
        }}
      />

      {/* Cloud Layer 2: Right drift */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '-50%',
          width: '200%',
          height: '100%',
          background: 'radial-gradient(ellipse 70% 40% at 60% 40%, rgba(200, 110, 40, 0.18) 0%, transparent 65%)',
          animation: 'cloudDriftRight 50s linear infinite',
          filter: 'blur(45px)',
        }}
      />
    </div>
  );
}
