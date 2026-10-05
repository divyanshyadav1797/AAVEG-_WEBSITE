import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Gamepad2, Film, Sparkles } from 'lucide-react';
import ThreeScrollExperience from '../components/home/ThreeScrollExperience';
import FestivalMovieJourney from '../components/home/FestivalMovieJourney';
import Button from '../components/common/Button';
import Magnetic from '../components/ui/Magnetic';
import ShinyText from '../components/ui/ShinyText';
import FloatingElements from '../components/ui/FloatingElements';

/**
 * MovieSagaPage Component
 * Dedicated page for the 3D scroll animation & the 4-Act Festival Movie Journey.
 * Links to previous page (Home) and next page (Mini-Games Arcade), with House Selection
 * accessible at all times.
 */
export default function MovieSagaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="movie-saga-page relative w-full"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#030406',
        color: '#FFFFFF',
      }}
    >
      {/* 01. 3D Scroll Engine (Jack-o'-lantern pumpkins flythrough tied to scrolling) */}
      <ThreeScrollExperience />

      {/* 02. Top Sub-Header & Sequence Breadcrumb Bar */}
      <div
        style={{
          paddingTop: 'calc(var(--header-height) + 1.25rem)',
          paddingBottom: '1rem',
          position: 'relative',
          zIndex: 40,
          background: 'linear-gradient(180deg, rgba(3, 4, 6, 0.95) 0%, rgba(3, 4, 6, 0.6) 80%, transparent 100%)',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Previous Step: Back to Home */}
          <Magnetic strength={0.2}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: '700',
                textDecoration: 'none',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '7px 16px',
                borderRadius: '20px',
                background: 'rgba(18, 20, 26, 0.75)',
                border: '1px solid rgba(255, 77, 0, 0.25)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF4D00';
                e.currentTarget.style.borderColor = 'rgba(255, 77, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'rgba(255, 77, 0, 0.25)';
              }}
            >
              <ArrowLeft size={15} />
              <span>← PREVIOUS: HOME</span>
            </Link>
          </Magnetic>

          {/* Sequence Step Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(255, 77, 0, 0.12)',
              border: '1px solid rgba(255, 77, 0, 0.35)',
              fontSize: '0.78rem',
              fontWeight: '800',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-bright)',
            }}
          >
            <Film size={14} />
            <span>PAGE 2 OF 3 • THE MOVIE SAGA</span>
          </div>

          {/* Quick Direct Actions: House Selection & Next Page */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Magnetic strength={0.2}>
              <Button
                to="/houses"
                variant="primary"
                size="sm"
                icon={<Shield size={14} />}
                style={{ padding: '7px 16px', fontSize: '0.8rem', fontWeight: '800' }}
              >
                SELECT YOUR HOUSE
              </Button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <Button
                to="/games"
                variant="glass"
                size="sm"
                icon={<Gamepad2 size={14} />}
                style={{
                  padding: '7px 16px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  border: '1px solid rgba(255, 77, 0, 0.4)',
                }}
              >
                NEXT: MINI-GAMES →
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* 03. The Scrolling Movie Journey: 4 Acts */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <FestivalMovieJourney />
      </div>

      {/* 04. Bottom Sequence Milestone: Forward to Games & House Selection */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          padding: '4rem 1.5rem 6rem 1.5rem',
          background: 'linear-gradient(180deg, transparent 0%, rgba(5, 7, 10, 0.95) 40%, #030406 100%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '3rem 2rem',
            borderRadius: '24px',
            background: 'rgba(12, 14, 20, 0.85)',
            border: '1.5px solid rgba(255, 77, 0, 0.35)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85), inset 0 0 30px rgba(255, 77, 0, 0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <FloatingElements duration={4} distance={4}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '20px',
                background: 'rgba(255, 77, 0, 0.15)',
                border: '1px solid rgba(255, 77, 0, 0.4)',
                color: 'var(--accent-bright)',
                fontSize: '0.8rem',
                fontWeight: '800',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} />
              <span>CHAPTER 2 COMPLETE // NEXT DESTINATION</span>
            </div>
          </FloatingElements>

          <h3
            style={{
              fontFamily: "'Bebas Neue', 'Anton', var(--font-cinematic)",
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: '900',
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              lineHeight: '1.1',
              marginBottom: '1rem',
            }}
          >
            READY TO SURVIVE THE{' '}
            <ShinyText color="#FF3B00" shimmerColor="#FFEAA7" speed={3}>
              HORROR ARCADE?
            </ShinyText>
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              margin: '0 auto 2.5rem auto',
              lineHeight: '1.6',
            }}
          >
            Test your reflexes in our custom single-player mini-games: Thunder Shield and Pumpkin Jump.
            Or jump directly into House Selection to claim your fraternity banner.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Primary Step 3 Link */}
            <Magnetic strength={0.25}>
              <Button
                to="/games"
                variant="primary"
                size="xl"
                icon={<Gamepad2 size={20} />}
                style={{
                  fontSize: '1.05rem',
                  padding: '16px 36px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #FF5500 0%, #D81159 100%)',
                  boxShadow: '0 0 35px rgba(255, 85, 0, 0.5), 0 8px 30px rgba(0,0,0,0.8)',
                }}
              >
                CONTINUE TO MINI-GAMES →
              </Button>
            </Magnetic>

            {/* Permanent House Selection Access */}
            <Magnetic strength={0.25}>
              <Button
                to="/houses"
                variant="outline"
                size="xl"
                icon={<Shield size={20} />}
                style={{
                  fontSize: '1.05rem',
                  padding: '16px 32px',
                  fontWeight: '800',
                }}
              >
                SELECT YOUR HOUSE
              </Button>
            </Magnetic>

            {/* Return to Home */}
            <Magnetic strength={0.2}>
              <Button
                to="/"
                variant="glass"
                size="xl"
                icon={<ArrowLeft size={18} />}
                style={{
                  fontSize: '1.05rem',
                  padding: '16px 28px',
                }}
              >
                BACK TO OVERVIEW
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}
