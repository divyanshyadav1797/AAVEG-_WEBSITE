import React from 'react';

/**
 * Anatomically accurate horror bat silhouette with curved wing bones,
 * thumb claw, scalloped membrane, and demonic head.
 */
function RealisticBat({ size = 36, flapDuration = '0.45s', style = {} }) {
  return (
    <svg
      width={size}
      height={size * 0.58}
      viewBox="0 0 100 58"
      fill="#050406"
      style={{
        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.9))',
        ...style,
      }}
    >
      {/* Dynamic Flapping Wings */}
      <path
        d="M 50 38
           C 54 26, 68 12, 88 16
           C 95 18, 99 24, 94 30
           C 87 27, 80 34, 76 42
           C 71 36, 64 39, 58 48
           C 54 44, 52 41, 50 38
           C 48 41, 46 44, 42 48
           C 36 39, 29 36, 24 42
           C 20 34, 13 27, 6 30
           C 1 24, 5 18, 12 16
           C 32 12, 46 26, 50 38 Z"
        style={{
          transformOrigin: '50% 38%',
          animation: `batFlap ${flapDuration} ease-in-out infinite`,
        }}
      />
      {/* Bat Head & Pointed Gothic Ears */}
      <path d="M 45 32 L 42 21 L 46 26 L 50 24 L 54 26 L 58 21 L 55 32 Z" fill="#030204" />
      {/* Reflective glowing eye pins */}
      <circle cx="47" cy="27" r="1.1" fill="#FF4D00" />
      <circle cx="53" cy="27" r="1.1" fill="#FF4D00" />
    </svg>
  );
}

export default function Bats({ batsRef, style = {} }) {
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
        ...style,
      }}
    >
      {/* DISTANT FLOCK SWARMING AROUND CLOCKTOWER (Depth plane 1) */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '42%',
          width: '180px',
          height: '140px',
          opacity: 0.68,
        }}
      >
        <div style={{ position: 'absolute', top: '15%', left: '20%', transform: 'scale(0.38) rotate(-18deg)' }}>
          <RealisticBat size={24} flapDuration="0.32s" />
        </div>
        <div style={{ position: 'absolute', top: '35%', left: '55%', transform: 'scale(0.42) rotate(12deg)' }}>
          <RealisticBat size={24} flapDuration="0.36s" />
        </div>
        <div style={{ position: 'absolute', top: '65%', left: '30%', transform: 'scale(0.35) rotate(-8deg)' }}>
          <RealisticBat size={22} flapDuration="0.3s" />
        </div>
        <div style={{ position: 'absolute', top: '45%', left: '80%', transform: 'scale(0.4) rotate(24deg)' }}>
          <RealisticBat size={25} flapDuration="0.34s" />
        </div>
        <div style={{ position: 'absolute', top: '8%', left: '70%', transform: 'scale(0.32) rotate(-14deg)' }}>
          <RealisticBat size={22} flapDuration="0.29s" />
        </div>
      </div>

      {/* MIDGROUND BATS PATROLLING ACROSS BLOOD MOON (Depth plane 2) */}
      <div style={{ position: 'absolute', top: '14%', right: '22%', transform: 'scale(1.1) rotate(-14deg)' }}>
        <RealisticBat size={42} flapDuration="0.44s" />
      </div>

      <div style={{ position: 'absolute', top: '9%', right: '13%', transform: 'scale(0.85) rotate(16deg)' }}>
        <RealisticBat size={34} flapDuration="0.52s" />
      </div>

      <div style={{ position: 'absolute', top: '23%', right: '31%', transform: 'scale(0.95) rotate(-6deg)' }}>
        <RealisticBat size={38} flapDuration="0.46s" />
      </div>

      <div style={{ position: 'absolute', top: '12%', left: '32%', transform: 'scale(0.8) rotate(12deg)' }}>
        <RealisticBat size={32} flapDuration="0.48s" />
      </div>

      <div style={{ position: 'absolute', top: '20%', left: '18%', transform: 'scale(0.7) rotate(-22deg)', opacity: 0.85 }}>
        <RealisticBat size={30} flapDuration="0.54s" />
      </div>

      {/* FOREGROUND CLOSE-RANGE CINEMATIC SWOOPING BATS (Depth plane 3) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          animation: 'batFlyAcross 22s ease-in-out infinite 2s',
          filter: 'blur(0.8px)',
        }}
      >
        <RealisticBat size={68} flapDuration="0.34s" />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          animation: 'batFlyAcross 28s ease-in-out infinite 14s',
          filter: 'blur(1.4px)',
        }}
      >
        <RealisticBat size={82} flapDuration="0.31s" />
      </div>
    </div>
  );
}
