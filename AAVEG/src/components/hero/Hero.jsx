import React from 'react';
import { Calendar, MapPin, Users, Play, ChevronDown, Shield, Sparkles } from 'lucide-react';
import HeroBackground from './HeroBackground';
import Button from '../common/Button';
import AavegHorrorText from './AavegHorrorText';
import Spotlight from '../ui/Spotlight';
import SparklesCore from '../ui/SparklesCore';
import Meteors from '../ui/Meteors';
import MovingBorder from '../ui/MovingBorder';
import GlitchText from '../ui/GlitchText';
import ShinyText from '../ui/ShinyText';
import FloatingElements from '../ui/FloatingElements';
import Magnetic from '../ui/Magnetic';

export default function Hero({ onOpenTeaser }) {
  return (
    <section
      className="hero-section relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 'var(--header-height)',
      }}
      id="hero"
    >
      {/* Aceternity UI - Sweeping Theatrical Horror Spotlight */}
      <Spotlight fill="#FF3B00" opacity={0.28} />

      {/* Aceternity UI - Stardust & Fiery Ember Particles */}
      <SparklesCore particleColor="#FF4D00" particleDensity={45} minSize={0.8} maxSize={2.6} />

      {/* Aceternity UI - Shooting Ember Meteors */}
      <Meteors number={10} color="#FF7A32" />

      {/* Cinematic Horror Atmospheric Background (Moon, Clouds, Gothic Monolith silhouette, Fog, Bats, Embers) */}
      <HeroBackground />

      {/* Main Hero Foreground Content */}
      <div
        className="container relative z-20 flex flex-col items-center text-center"
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: '1.5rem',
          paddingBottom: '3rem',
        }}
      >
        {/* Fest Subtitle Tag with React Bits Glitch Decryption & ShinyText */}
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.78rem, 1.4vw, 0.95rem)',
            fontWeight: '700',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: '0.45rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontWeight: '800' }}>
            <ShinyText color="#FF3B00" shimmerColor="#FFE29A" speed={3.5}>
              THE HAUNTED HOSTEL FESTIVAL 2026
            </ShinyText>
          </span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span style={{ color: '#D6CFC7' }}>
            <GlitchText text="STEP INTO THE MADNESS" speed={35} maxIterations={6} />
          </span>
        </div>

        {/* Master Dominating Distressed Horror Title: AAVEG (Artwork with blood & smoke) */}
        <AavegHorrorText />

        {/* Catchphrase */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: '0.5rem',
            maxWidth: '680px',
          }}
        >
          IT'S NOT JUST A FEST.{' '}
          <span style={{ color: '#FF4D00', fontWeight: '800', textShadow: '0 0 16px rgba(255, 77, 0, 0.7)' }}>
            <GlitchText text="IT'S A FEELING." speed={40} maxIterations={8} />
          </span>
        </p>

        {/* Date, Location, Slogan Badges with Annnimate FloatingElements */}
        <FloatingElements duration={5} distance={6} rotate={1}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.75rem, 2vw, 1.8rem)',
              margin: '1.5rem 0',
              padding: '10px 24px',
              borderRadius: '30px',
              background: 'rgba(10, 12, 16, 0.85)',
              border: '1px solid rgba(255, 77, 0, 0.35)',
              backdropFilter: 'blur(12px)',
              fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
              color: 'var(--text-secondary)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(255, 77, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} style={{ color: 'var(--accent-bright)' }} />
              <span style={{ color: '#F3EFE8', fontWeight: '600' }}>28th – 30th October 2026</span>
            </div>

            <div className="desktop-only" style={{ opacity: 0.3 }}>
              |
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} style={{ color: 'var(--accent-bright)' }} />
              <span>Poornima College of Engineering, Jaipur</span>
            </div>

            <div className="desktop-only" style={{ opacity: 0.3 }}>
              |
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} style={{ color: 'var(--accent-bright)' }} />
              <span>8 Houses. Infinite Rivalry.</span>
            </div>
          </div>
        </FloatingElements>

        {/* Primary Action Buttons with Aceternity MovingBorder & React Bits Magnetic */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            marginTop: '0.5rem',
          }}
        >
          {/* Main Action: MovingBorder Animated Button with Magnetic feel */}
          <Magnetic strength={0.25}>
            <MovingBorder duration={3200} color="#FF3B00">
              <Button
                to="/houses"
                variant="primary"
                size="lg"
                icon={<Shield size={18} />}
                style={{
                  borderRadius: '30px',
                  padding: '14px 32px',
                  fontSize: '1rem',
                }}
              >
                SELECT YOUR HOUSE
              </Button>
            </MovingBorder>
          </Magnetic>

          {/* Watch Official Teaser with Magnetic pull */}
          <Magnetic strength={0.2}>
            <Button
              onClick={onOpenTeaser}
              variant="outline"
              size="lg"
              icon={<Play size={17} style={{ fill: 'currentColor' }} />}
            >
              WATCH TEASER
            </Button>
          </Magnetic>

          {/* Experience The Movie with Magnetic pull */}
          <Magnetic strength={0.2}>
            <Button
              onClick={() => {
                const el = document.getElementById('festival-movie');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="glass"
              size="lg"
              icon={<ChevronDown size={18} />}
            >
              THE MOVIE SAGA
            </Button>
          </Magnetic>
        </div>

        {/* Scroll To Explore Indicator */}
        <div
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.75,
            cursor: 'pointer',
          }}
          onClick={() => {
            const el = document.getElementById('festival-movie');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div
            style={{
              width: '20px',
              height: '32px',
              borderRadius: '12px',
              border: '1.5px solid rgba(255, 77, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div
              style={{
                width: '3px',
                height: '6px',
                borderRadius: '2px',
                background: 'var(--accent-bright)',
                animation: 'batFlap 1.2s infinite',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            SCROLL TO ENTER MOVIE
          </span>
        </div>
      </div>
    </section>
  );
}
