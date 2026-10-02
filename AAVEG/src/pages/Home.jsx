import React, { useState, useEffect, useRef } from 'react';
import { X, Film, Sparkles } from 'lucide-react';
import Hero from '../components/hero/Hero';
import FestivalMovieJourney from '../components/home/FestivalMovieJourney';
import AavegGamesSection from '../components/games/AavegGamesSection';
import ThreeScrollExperience from '../components/home/ThreeScrollExperience';

/**
 * Home Page Component
 * Integrates full-page 3D scroll-driven flythrough powered by Three.js
 * Seamlessly transitions from the uppermost Hero down through the 4-Act Festival Journey
 * and culminates in the Horror Games Arcade.
 */
export default function Home() {
  const [pageProgress, setPageProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [activeSector, setActiveSector] = useState(0);
  const [isTeaserOpen, setIsTeaserOpen] = useState(false);

  const lastScrollYRef = useRef(0);

  // Global Page Scroll Listener with Velocity Damping
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

          setPageProgress(pct);

          // Calculate instantaneous scroll velocity
          const delta = Math.abs(scrollY - lastScrollYRef.current);
          lastScrollYRef.current = scrollY;
          setScrollVelocity(delta);

          // Sector breakdown across full page
          if (pct < 14) {
            setActiveSector(0); // Hero
          } else if (pct < 32) {
            setActiveSector(1); // Act 1: The Awakening
          } else if (pct < 54) {
            setActiveSector(2); // Act 2: The 4 Nights
          } else if (pct < 74) {
            setActiveSector(3); // Act 3: 8 Houses
          } else if (pct < 88) {
            setActiveSector(4); // Act 4: The Final Arena
          } else {
            setActiveSector(5); // Horror Arcade Mini-Games
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Smoothly decay velocity when scroll stops
    const decayInterval = setInterval(() => {
      setScrollVelocity((prev) => (prev > 0.5 ? prev * 0.82 : 0));
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(decayInterval);
    };
  }, []);

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
      {/* 00. Global Full-Page Three.js Scroll Engine inspired by re-the-drive */}
      <ThreeScrollExperience
        scrollProgress={pageProgress}
        scrollVelocity={scrollVelocity}
        activeSector={activeSector}
      />

      {/* 01. The Uppermost Part: Master Cinematic Hero matching authentic media title */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero onOpenTeaser={() => setIsTeaserOpen(true)} />
      </div>

      {/* 02. The Scrolling Movie Thing: 4-Act Cinematic Festival Journey with Glass UI */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <FestivalMovieJourney />
      </div>

      {/* 03. The Climax: Two Fun Endless Single-Player Horror Games (Thunder Shield & Pumpkin Jump) */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <AavegGamesSection />
      </div>

      {/* Fullscreen Cinematic Teaser Modal */}
      {isTeaserOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(2, 3, 5, 0.94)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 3vw, 2.5rem)',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
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
                padding: '1.25rem 1.75rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 77, 0, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Film size={20} style={{ color: '#FF3B00' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-cinematic)',
                    fontSize: '1.1rem',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: '0.1em',
                  }}
                >
                  AAVEG 2026 • OFFICIAL CINEMATIC TEASER
                </span>
              </div>

              <button
                onClick={() => setIsTeaserOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Close Teaser"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player Display */}
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 Aspect Ratio
                height: 0,
                backgroundColor: '#000000',
              }}
            >
              <iframe
                title="Aaveg 2026 Festival Teaser"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&rel=0"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Note */}
            <div
              style={{
                padding: '1rem 1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <span>OCTOBER 28–30, 2026 • POORNIMA COLLEGE OF ENGINEERING</span>
              <button
                onClick={() => {
                  setIsTeaserOpen(false);
                  const el = document.getElementById('festival-movie');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  color: '#FF4D00',
                  fontWeight: '700',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={14} />
                ENTER FESTIVAL SAGA →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
