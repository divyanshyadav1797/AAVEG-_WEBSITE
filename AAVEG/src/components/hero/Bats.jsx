import React from 'react';

// Single Bat Silhouette with flapping wings
function Bat({ size = 32, className = '', style = {}, flapDuration = '0.6s' }) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 100 55"
      fill="#0A0908"
      className={className}
      style={{
        filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.8))',
        ...style,
      }}
    >
      {/* Bat Wings with Flap CSS animation */}
      <path
        d="M 50 35 
           C 55 20, 70 5, 95 12 
           C 85 22, 80 38, 75 48 
           C 65 38, 55 42, 50 35 
           C 45 42, 35 38, 25 48 
           C 20 38, 15 22, 5 12 
           C 30 5, 45 20, 50 35 Z"
        style={{
          transformOrigin: '50% 35%',
          animation: `batFlap ${flapDuration} ease-in-out infinite`,
        }}
      />
      {/* Bat Head & Ears */}
      <polygon points="46,26 50,18 54,26" />
      <polygon points="43,24 45,16 48,22" />
      <polygon points="52,22 55,16 57,24" />
      {/* Tiny demonic eye dots */}
      <circle cx="48" cy="24" r="1" fill="#FF4D00" />
      <circle cx="52" cy="24" r="1" fill="#FF4D00" />
    </svg>
  );
}

export default function Bats({ batsRef }) {
  return (
    <div
      ref={batsRef}
      className="hero-layer-bats"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 11,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Bat 1: Near Moon right side */}
      <div style={{ position: 'absolute', top: '16%', right: '24%', transform: 'scale(1.2) rotate(-12deg)' }}>
        <Bat size={44} flapDuration="0.45s" />
      </div>

      {/* Bat 2: Flying near moon top */}
      <div style={{ position: 'absolute', top: '11%', right: '14%', transform: 'scale(0.85) rotate(18deg)' }}>
        <Bat size={32} flapDuration="0.55s" />
      </div>

      {/* Bat 3: Midground center flight */}
      <div style={{ position: 'absolute', top: '22%', right: '35%', transform: 'scale(1) rotate(-6deg)' }}>
        <Bat size={38} flapDuration="0.48s" />
      </div>

      {/* Bat 4: Distant small bat */}
      <div style={{ position: 'absolute', top: '28%', right: '18%', transform: 'scale(0.6) rotate(15deg)', opacity: 0.7 }}>
        <Bat size={26} flapDuration="0.65s" />
      </div>

      {/* Bat 5: Left sky distant bat */}
      <div style={{ position: 'absolute', top: '19%', left: '22%', transform: 'scale(0.7) rotate(-22deg)', opacity: 0.8 }}>
        <Bat size={30} flapDuration="0.52s" />
      </div>

      {/* Bat 6: Left high bat */}
      <div style={{ position: 'absolute', top: '12%', left: '38%', transform: 'scale(0.9) rotate(8deg)' }}>
        <Bat size={36} flapDuration="0.42s" />
      </div>

      {/* Dramatic Crossing Bat (Animated across the screen) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          animation: 'batFlyAcross 24s ease-in-out infinite 3s',
        }}
      >
        <Bat size={58} flapDuration="0.38s" />
      </div>
    </div>
  );
}
