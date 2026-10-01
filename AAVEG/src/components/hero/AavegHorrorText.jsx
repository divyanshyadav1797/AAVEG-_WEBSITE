import React from 'react';
import aavegTitleLogo from '../../assets/images/hero/aaveg-title-logo.png';

/**
 * AavegHorrorText Component
 * Renders the authentic user-provided "AAVEG - THE HOSTEL FEST" horror artwork
 * with integrated blood splatter, dark smoke, and glowing crimson embers.
 */
export default function AavegHorrorText() {
  return (
    <div
      className="aaveg-horror-text-wrapper relative flex flex-col items-center select-none"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0.25rem 0 0.85rem 0',
        width: '100%',
        maxWidth: 'min(94vw, 1040px)',
      }}
    >
      {/* Sinister Blood-Red & Ember Backlight Glow behind artwork */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '105%',
          height: '135%',
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(255, 45, 0, 0.42) 0%, rgba(180, 15, 0, 0.18) 45%, transparent 72%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Semantic Accessibility Heading */}
      <h1 className="sr-only">AAVEG - The Hostel Fest</h1>

      {/* Primary "AAVEG The Hostel Fest" Authentic Horror Artwork */}
      <img
        src={aavegTitleLogo}
        alt="AAVEG - The Hostel Fest"
        className="aaveg-hero-title-artwork"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: 'auto',
          maxHeight: 'clamp(220px, 42vw, 440px)',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 28px rgba(255, 45, 0, 0.45)) drop-shadow(0 15px 35px rgba(0,0,0,0.95))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
