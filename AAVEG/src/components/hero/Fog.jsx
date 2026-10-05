import React from 'react';

/**
 * Volumetric Luminous Graveyard Mist
 * Multi-layer rolling vapor with warm amber moonlight scattering
 * and deep violet-indigo atmospheric undertones.
 */
export default function Fog({ fogRef, style = {} }) {
  return (
    <div
      ref={fogRef}
      className="hero-layer-fog"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '48%',
        zIndex: 8,
        pointerEvents: 'none',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Layer 1: Ground-Hugging Rolling Amber Mist (Moonlight reflection) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-20%',
          width: '145%',
          height: '85%',
          background: 'radial-gradient(ellipse 70% 50% at 55% 90%, rgba(255, 95, 15, 0.26) 0%, rgba(180, 45, 10, 0.16) 40%, rgba(35, 15, 25, 0.35) 70%, transparent 90%)',
          filter: 'blur(30px)',
          animation: 'fogDriftSlow 20s ease-in-out infinite alternate',
          mixBlendMode: 'screen',
        }}
      />

      {/* Layer 2: Rolling Billow Wave (Catching purple-violet sky bounce) */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-25%',
          width: '155%',
          height: '65%',
          background: 'radial-gradient(ellipse 65% 40% at 30% 80%, rgba(170, 70, 220, 0.15) 0%, rgba(255, 120, 30, 0.18) 45%, transparent 75%)',
          filter: 'blur(26px)',
          animation: 'fogRollDense 15s ease-in-out infinite alternate',
          mixBlendMode: 'screen',
        }}
      />

      {/* Layer 3: Creeping Ground Bed Fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40%',
          background: 'linear-gradient(to top, rgba(5, 4, 8, 0.95) 0%, rgba(15, 10, 18, 0.6) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}
