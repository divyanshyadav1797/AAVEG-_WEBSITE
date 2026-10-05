import React, { useState, useEffect, useRef } from 'react';
import aavegTitleLogo from '../../assets/images/hero/aaveg-title-logo.png';

// Single Bat Silhouette with Flapping Wing Animation
function TitleBat({ size = 38, style = {} }) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 100 55"
      fill="#08090c"
      style={{
        filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 8px rgba(255, 59, 0, 0.5))',
        ...style,
      }}
    >
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
          animation: 'batFlap 0.42s ease-in-out infinite',
        }}
      />
      <polygon points="46,26 50,18 54,26" fill="#08090c" />
      <polygon points="43,24 45,16 48,22" fill="#08090c" />
      <polygon points="52,22 55,16 57,24" fill="#08090c" />
      <circle cx="48" cy="24" r="1.3" fill="#FF4D00" />
      <circle cx="52" cy="24" r="1.3" fill="#FF4D00" />
    </svg>
  );
}

/**
 * AavegHorrorText Component
 * Renders the authentic "AAVEG - THE HOSTEL FEST" horror artwork
 * with:
 * 1. Subtle 3D perspective depth effect with layered lighting and mouse tilt
 * 2. Elegant entrance bats swooping gracefully OVER the text on first site entry
 *    (designed specifically to be subtle, cinematic, and non-distracting)
 */
export default function AavegHorrorText() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showEntranceBats, setShowEntranceBats] = useState(true);
  const containerRef = useRef(null);

  // Subtle 3D Depth Mouse Follow
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12; // Max 6 deg tilt
      const y = (e.clientY / innerHeight - 0.5) * -10; // Max 5 deg tilt
      setTilt({ x: y, y: x });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Entrance Bats: Swoop over text on initial entry, then cleanly unmount after 3.8s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntranceBats(false);
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="aaveg-horror-text-wrapper relative flex flex-col items-center select-none"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0.15rem 0 0.5rem 0',
        width: '100%',
        maxWidth: 'min(92vw, 980px)',
        perspective: '1000px',
      }}
    >
      {/* 3D Depth Canvas Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1)',
        }}
      >
        {/* Layer 0: Deep Blood-Red & Ember Backlight Glow (translateZ -20px) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) translateZ(-20px)',
            width: '108%',
            height: '140%',
            background:
              'radial-gradient(ellipse at 50% 48%, rgba(255, 45, 0, 0.48) 0%, rgba(180, 15, 0, 0.2) 45%, transparent 72%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />



        {/* Layer 1: Primary "AAVEG The Hostel Fest" Authentic Horror Artwork (translateZ 15px) */}
        <img
          src={aavegTitleLogo}
          alt="AAVEG - The Hostel Fest"
          width="1962"
          height="801"
          fetchPriority="high"
          decoding="async"
          className="aaveg-hero-title-artwork"
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            height: 'auto',
            maxHeight: 'clamp(160px, 24vw, 320px)',
            objectFit: 'contain',
            transform: 'translateZ(15px)',
            filter:
              'drop-shadow(0 0 28px rgba(255, 45, 0, 0.45)) drop-shadow(0 18px 38px rgba(0,0,0,0.95))',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 2: Subtle Entrance Bats Flying OVER the text on first website entry (translateZ 45px) */}
        {showEntranceBats && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 25, // Placed directly over the text artwork
              pointerEvents: 'none',
              overflow: 'visible',
              transform: 'translateZ(45px)',
            }}
            aria-hidden="true"
          >
            {/* Bat 1: Swoops across the left and center */}
            <div
              style={{
                position: 'absolute',
                top: '45%',
                left: '20%',
                animation: 'batEntranceSwoop1 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards 0.25s',
                opacity: 0,
              }}
            >
              <TitleBat size={42} />
            </div>

            {/* Bat 2: Swoops directly across the middle 'AAVEG' lettering */}
            <div
              style={{
                position: 'absolute',
                top: '38%',
                left: '25%',
                animation: 'batEntranceSwoop2 3.1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards 0.65s',
                opacity: 0,
              }}
            >
              <TitleBat size={48} />
            </div>

            {/* Bat 3: Subtle escort bat swooping across top right */}
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '30%',
                animation: 'batEntranceSwoop3 2.9s cubic-bezier(0.25, 0.1, 0.25, 1) forwards 1.05s',
                opacity: 0,
              }}
            >
              <TitleBat size={34} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
