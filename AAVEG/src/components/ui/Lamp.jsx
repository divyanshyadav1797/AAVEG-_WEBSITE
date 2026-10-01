import React from 'react';

/**
 * Aceternity UI - Lamp Component
 * Creates an iconic radiant cone lighting effect with neon gradients converging at the center.
 */
export default function Lamp({
  children,
  className = '',
  color = '#FF4D00',
  secondaryColor = '#FF9A3C',
}) {
  return (
    <div
      className={`lamp-container relative flex flex-col items-center justify-center overflow-hidden w-full ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        paddingTop: '3rem',
        paddingBottom: '2rem',
      }}
    >
      {/* Light Source Cones */}
      <div
        className="lamp-glow-source relative flex items-center justify-center w-full"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '140px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* Left Conic Light Beam */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '50%',
            width: 'clamp(280px, 40vw, 550px)',
            height: '160px',
            background: `conic-gradient(from 70deg at 50% 50%, ${color} 0%, transparent 60%)`,
            transform: 'rotate(-25deg)',
            opacity: 0.45,
            filter: 'blur(35px)',
          }}
        />

        {/* Right Conic Light Beam */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 'clamp(280px, 40vw, 550px)',
            height: '160px',
            background: `conic-gradient(from 290deg at 50% 50%, transparent 40%, ${color} 100%)`,
            transform: 'rotate(25deg)',
            opacity: 0.45,
            filter: 'blur(35px)',
          }}
        />

        {/* Center Radiant Core Bloom */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            width: 'clamp(200px, 35vw, 420px)',
            height: '80px',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${secondaryColor} 0%, ${color} 50%, transparent 80%)`,
            filter: 'blur(28px)',
            opacity: 0.7,
          }}
        />

        {/* Top Crisp Light Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            width: 'clamp(240px, 45vw, 600px)',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${secondaryColor}, #FFFFFF, ${secondaryColor}, transparent)`,
            boxShadow: `0 0 15px 2px ${color}, 0 0 30px ${color}`,
          }}
        />
      </div>

      {/* Illuminated Content */}
      <div
        className="lamp-content relative z-10 w-full"
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '-40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
