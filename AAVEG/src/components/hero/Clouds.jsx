import React from 'react';

/**
 * Realistic Cinematic Storm Clouds
 * Multi-strata turbulent dark clouds with moon-lit edges
 * and subtle atmospheric density variations.
 */
export default function Clouds({ cloudsRef, isLightning = false, style = {} }) {
  return (
    <div
      ref={cloudsRef}
      className="hero-layer-clouds"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '80%',
        zIndex: 4,
        pointerEvents: 'none',
        overflow: 'hidden',
        mixBlendMode: 'screen',
        opacity: isLightning ? 0.95 : 0.68,
        transition: 'opacity 0.12s ease-out',
        ...style,
      }}
    >
      {/* Layer 1: High Storm Strata (Deep charcoal-indigo heavy cloud bank) */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: 0,
          width: '200%',
          height: '110%',
          background: 'radial-gradient(ellipse 75% 55% at 40% 30%, rgba(95, 75, 90, 0.32) 0%, rgba(40, 25, 45, 0.2) 45%, transparent 70%)',
          animation: 'cloudDriftLeft 85s linear infinite',
          filter: 'blur(45px)',
        }}
      />

      {/* Layer 2: Fractured Low Scud Clouds (Silvery Moonlit highlights) */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '-40%',
          width: '220%',
          height: '90%',
          background: 'radial-gradient(ellipse 65% 40% at 65% 35%, rgba(220, 235, 255, 0.2) 0%, rgba(120, 140, 180, 0.12) 40%, transparent 68%)',
          animation: 'cloudDriftRight 65s linear infinite',
          filter: 'blur(35px)',
        }}
      />

      {/* Layer 3: Ominous Dark Wisps (Shredded mist patches) */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '-20%',
          width: '180%',
          height: '70%',
          background: 'radial-gradient(ellipse 50% 30% at 35% 50%, rgba(140, 110, 175, 0.16) 0%, transparent 60%)',
          animation: 'cloudDriftLeft 45s linear infinite',
          filter: 'blur(28px)',
        }}
      />
    </div>
  );
}
