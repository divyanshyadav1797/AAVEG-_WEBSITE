import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, Film, Gamepad2 } from 'lucide-react';
import CircularHouseSelector from '../components/houses/CircularHouseSelector';
import Spotlight from '../components/ui/Spotlight';
import BackgroundBeams from '../components/ui/BackgroundBeams';
import GlitchText from '../components/ui/GlitchText';
import Magnetic from '../components/ui/Magnetic';
import ShinyText from '../components/ui/ShinyText';
import FloatingElements from '../components/ui/FloatingElements';
import GridBackground from '../components/ui/GridBackground';

export default function HouseSelection() {
  return (
    <div
      className="house-selection-page"
      style={{
        paddingTop: 'calc(var(--header-height) + 2rem)',
        paddingBottom: '5rem',
        backgroundColor: '#040507',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {/* Aceternity UI - Theatrical Corner Spotlight */}
      <Spotlight fill="#FF3B00" opacity={0.26} />

      {/* Aceternity UI - Volumetric Background Beams */}
      <BackgroundBeams color="#FF4D00" />
      <GridBackground color="rgba(255, 77, 0, 0.05)" maskRadius="60%">

      {/* Background Scary Atmospheric Fog Glow */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(255, 59, 0, 0.16) 0%, rgba(180, 20, 0, 0.05) 55%, transparent 75%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container relative z-10" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        {/* Navigation Strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <Magnetic strength={0.2}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: '600',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(18, 20, 24, 0.6)',
                border: '1px solid rgba(255, 77, 0, 0.2)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4D00')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <ArrowLeft size={16} />
              <span>OVERVIEW</span>
            </Link>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Link
              to="/movie-saga"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: '600',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(18, 20, 24, 0.6)',
                border: '1px solid rgba(255, 77, 0, 0.2)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4D00')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Film size={15} />
              <span>MOVIE SAGA</span>
            </Link>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Link
              to="/games"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: '600',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(18, 20, 24, 0.6)',
                border: '1px solid rgba(255, 77, 0, 0.2)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4D00')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Gamepad2 size={15} />
              <span>MINI-GAMES</span>
            </Link>
          </Magnetic>
        </div>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <FloatingElements duration={4} distance={4} rotate={1}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: '700',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--accent-bright)',
                marginBottom: '0.75rem',
              }}
            >
              <Flame size={16} />
              <span>STAGE 01 OF 02 • HOUSE AFFILIATION</span>
            </div>
          </FloatingElements>

          <h1
            style={{
              fontFamily: 'var(--font-cinematic)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              fontWeight: '900',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              lineHeight: '1.1',
              marginBottom: '1rem',
              textShadow: '0 4px 25px rgba(0,0,0,0.9), 0 0 35px rgba(255, 59, 0, 0.5)',
            }}
          >
            CHOOSE YOUR{' '}
            <span style={{ color: '#FF4D00' }}>
              <ShinyText color="#FF4D00" shimmerColor="#FFE9A0" speed={3}>
                <GlitchText text="HOUSE" speed={35} maxIterations={5} />
              </ShinyText>
            </span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Rotate the circular dial below to select your hostel house (House 1 to House 8).
            Next, you will choose your activity (Sports, Esports, or Cultural) to open your dedicated registration form.
          </p>
        </div>

        {/* Circular House Selector Component */}
        <CircularHouseSelector />
      </div>
      </GridBackground>
    </div>
  );
}

