import React from 'react';

export default function Fog({ fogRef }) {
  return (
    <div
      ref={fogRef}
      className="hero-layer-fog"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60%',
        zIndex: 8,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Bottom Dense Mist Ground */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-20%',
          width: '140%',
          height: '100%',
          background: 'radial-gradient(ellipse 80% 50% at 50% 90%, rgba(25, 12, 5, 0.7) 0%, rgba(200, 70, 10, 0.15) 45%, transparent 75%)',
          filter: 'blur(30px)',
          animation: 'fogDriftSlow 18s ease-in-out infinite alternate',
        }}
      />

      {/* Floating Fog Wisps Layer 2 */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '120%',
          height: '45%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 80, 0, 0.08) 50%, rgba(10, 8, 8, 0.8) 100%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
}
