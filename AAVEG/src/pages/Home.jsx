import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Film, Sparkles, Shield, Gamepad2, ArrowRight } from 'lucide-react';
import Hero from '../components/hero/Hero';
import Button from '../components/common/Button';
import CardSpotlight from '../components/ui/CardSpotlight';
import GridBackground from '../components/ui/GridBackground';
import MovingBorder from '../components/ui/MovingBorder';
import Magnetic from '../components/ui/Magnetic';
import ShinyText from '../components/ui/ShinyText';
import FloatingElements from '../components/ui/FloatingElements';

/**
 * Home Page Component
 * Serves as the primary cinematic hook for AAVEG 2026.
 * Focused on the hero experience with minimal distraction, seamlessly guiding
 * users through the sequence: Home → Movie Saga → Mini-Games Arcade → House Selection.
 */
export default function Home() {
  const [isTeaserOpen, setIsTeaserOpen] = useState(false);
  const navigate = useNavigate();

  // Lock body scroll when cinematic teaser modal is open
  useEffect(() => {
    if (isTeaserOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isTeaserOpen]);

  return (
    <div
      className="home-page-container relative w-full"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#030406',
        color: '#FFFFFF',
      }}
    >
      {/* 01. The Uppermost Hook: Master Distressed Horror Hero */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero onOpenTeaser={() => setIsTeaserOpen(true)} />
      </div>

      {/* 02. The Festival Journey Gateway (Sequence of Pages) */}
      <section
        id="experience-sequence"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '2rem',
          paddingBottom: '5rem',
          backgroundColor: '#030406',
        }}
      >
        <GridBackground pattern="cross" color="rgba(255, 77, 0, 0.04)" mask="radial" />

        <div className="container relative z-10" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <FloatingElements duration={4} distance={4}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 18px',
                  borderRadius: '20px',
                  background: 'rgba(255, 77, 0, 0.12)',
                  border: '1px solid rgba(255, 77, 0, 0.35)',
                  color: 'var(--accent-bright)',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                <Sparkles size={14} />
                <span>EXPERIENCE SEQUENCE • 3 CHAPTERS</span>
              </div>
            </FloatingElements>

            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Anton', var(--font-cinematic)",
                fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                fontWeight: '900',
                color: '#FFFFFF',
                letterSpacing: '0.06em',
                lineHeight: '1.08',
                marginBottom: '1rem',
              }}
            >
              EXPLORE THE FESTIVAL{' '}
              <ShinyText color="#FF3B00" shimmerColor="#FFEAA7" speed={3}>
                STEP BY STEP
              </ShinyText>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
                color: 'var(--text-secondary)',
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: '1.6',
              }}
            >
              Follow the cinematic story from the opening horror hook down to the 4-act movie saga,
              the endless mini-games, and your hostel house registration.
            </p>
          </div>

          {/* 3 Step Sequence Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '1.75rem',
              marginBottom: '3.5rem',
            }}
          >
            {/* Step 1: Hook (Current) */}
            <CardSpotlight
              color="#FF3B00"
              glowRadius={280}
              tilt={true}
              style={{
                background: 'rgba(12, 14, 20, 0.85)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 77, 0, 0.3)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 77, 0, 0.15)',
                    border: '1px solid rgba(255, 77, 0, 0.4)',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: '#FF8533',
                    marginBottom: '1.25rem',
                    letterSpacing: '0.15em',
                  }}
                >
                  STEP 01 • ACTIVE HOOK
                </div>

                <h3
                  className="font-cinematic"
                  style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}
                >
                  THE HAUNTED FESTIVAL HOOK
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  The uppermost cinematic threshold. Immerse in the distressed festival identity, core dates, and college fraternity legacy.
                </p>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <Button
                  to="/houses"
                  variant="primary"
                  size="sm"
                  icon={<Shield size={14} />}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  SELECT YOUR HOUSE
                </Button>
              </div>
            </CardSpotlight>

            {/* Step 2: The Movie Saga */}
            <CardSpotlight
              color="#FFA04D"
              glowRadius={280}
              tilt={true}
              style={{
                background: 'rgba(15, 18, 26, 0.9)',
                borderRadius: '20px',
                border: '1.5px solid rgba(255, 119, 0, 0.45)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 119, 0, 0.2)',
                    border: '1px solid rgba(255, 119, 0, 0.5)',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: '#FFA04D',
                    marginBottom: '1.25rem',
                    letterSpacing: '0.15em',
                  }}
                >
                  STEP 02 • THE MOVIE SAGA
                </div>

                <h3
                  className="font-cinematic"
                  style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}
                >
                  4-ACT CINEMATIC CHRONICLE
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Full-page 3D scroll flythrough with sculpted Jack-o'-lanterns, revealing Act 01 Awakening, 4 Nights of Chaos, 8 Houses, and the Arena.
                </p>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <Button
                  to="/movie-saga"
                  variant="primary"
                  size="sm"
                  icon={<Film size={14} />}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #FF4D00 0%, #FF8533 100%)',
                    fontWeight: '800',
                  }}
                >
                  ENTER MOVIE SAGA →
                </Button>
              </div>
            </CardSpotlight>

            {/* Step 3: Horror Arcade */}
            <CardSpotlight
              color="#FF5500"
              glowRadius={280}
              tilt={true}
              style={{
                background: 'rgba(12, 14, 20, 0.85)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 77, 0, 0.3)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 77, 0, 0.15)',
                    border: '1px solid rgba(255, 77, 0, 0.4)',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: '#FF8533',
                    marginBottom: '1.25rem',
                    letterSpacing: '0.15em',
                  }}
                >
                  STEP 03 • HORROR ARCADE
                </div>

                <h3
                  className="font-cinematic"
                  style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.75rem' }}
                >
                  SURVIVE THE NIGHT GAMES
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Two endless single-player horror challenges: Thunder Shield (entity defense) and Pumpkin Jump (cemetery runner) with high scores.
                </p>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <Button
                  to="/games"
                  variant="glass"
                  size="sm"
                  icon={<Gamepad2 size={14} />}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  PLAY MINI-GAMES →
                </Button>
              </div>
            </CardSpotlight>
          </div>

          {/* Central Call-to-Action Bar */}
          <div
            style={{
              padding: '2rem',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(255, 77, 0, 0.12) 0%, rgba(10, 12, 16, 0.9) 100%)',
              border: '1.5px solid rgba(255, 77, 0, 0.35)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div>
              <h4
                className="font-cinematic"
                style={{ fontSize: '1.35rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}
              >
                BEGIN THE SEQUENCE
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Enter the Movie Saga to watch the lore unfold or select your house at any moment.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Magnetic strength={0.25}>
                <MovingBorder duration={3000} color="#FF3B00">
                  <Button
                    to="/movie-saga"
                    variant="primary"
                    size="md"
                    icon={<ArrowRight size={16} />}
                    style={{ fontWeight: '800', padding: '12px 28px' }}
                  >
                    CONTINUE TO MOVIE SAGA
                  </Button>
                </MovingBorder>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Button
                  to="/houses"
                  variant="outline"
                  size="md"
                  icon={<Shield size={16} />}
                  style={{ padding: '12px 24px' }}
                >
                  SELECT HOUSE
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Cinematic Teaser Modal */}
      {isTeaserOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsTeaserOpen(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(2, 3, 5, 0.94)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(0.75rem, 2vw, 1.5rem)',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              maxHeight: '94vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#080a0f',
              borderRadius: '20px',
              border: '1.5px solid rgba(255, 77, 0, 0.45)',
              overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 77, 0, 0.3)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 77, 0, 0.08)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Film size={18} style={{ color: '#FF3B00' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-cinematic)',
                    fontSize: '0.95rem',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                  }}
                >
                  AAVEG 2026 • OFFICIAL REEL TEASER
                </span>
              </div>

              <button
                onClick={() => setIsTeaserOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Close Teaser"
              >
                <X size={16} />
              </button>
            </div>

            {/* Video Player Display (Portrait 9:16 optimized for Instagram Reel) */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'min(620px, 72vh)',
                backgroundColor: '#000000',
                overflow: 'hidden',
              }}
            >
              <iframe
                title="Aaveg 2026 Festival Teaser Reel"
                src="https://www.instagram.com/reel/Dd-dPbgx_eO/embed"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  overflow: 'hidden',
                }}
                allowTransparency="true"
                allow="encrypted-media; autoplay"
                scrolling="no"
              />
            </div>

            {/* Modal Footer Note */}
            <div
              style={{
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-sans)',
                background: 'rgba(0, 0, 0, 0.45)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                flexShrink: 0,
              }}
            >
              <a
                href="https://www.instagram.com/reel/Dd-dPbgx_eO/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#FF4D00',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                @aaveg_poornima on IG ↗
              </a>
              <button
                onClick={() => {
                  setIsTeaserOpen(false);
                  navigate('/movie-saga');
                }}
                style={{
                  color: '#FFFFFF',
                  fontWeight: '700',
                  background: 'rgba(255, 77, 0, 0.2)',
                  border: '1px solid rgba(255, 77, 0, 0.4)',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.75rem',
                  transition: 'background 0.2s ease',
                }}
              >
                <Sparkles size={12} style={{ color: '#FF7A00' }} />
                ENTER SAGA →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

