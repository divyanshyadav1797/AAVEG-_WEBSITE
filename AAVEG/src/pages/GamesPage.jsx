import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Trophy, Gamepad2, Film, Sparkles } from 'lucide-react';
import AavegGamesSection from '../components/games/AavegGamesSection';
import Button from '../components/common/Button';
import Magnetic from '../components/ui/Magnetic';
import ShinyText from '../components/ui/ShinyText';
import FloatingElements from '../components/ui/FloatingElements';
import Spotlight from '../components/ui/Spotlight';
import GridBackground from '../components/ui/GridBackground';

/**
 * GamesPage Component
 * Dedicated page for the Aaveg Mini-Games Arcade (Thunder Shield & Pumpkin Jump).
 * Sequence culmination: Links back to Movie Saga and Home, with House Selection
 * and Leaderboard permanently accessible.
 */
export default function GamesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="games-page relative w-full"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#030406',
        color: '#FFFFFF',
      }}
    >
      <Spotlight fill="#FF4D00" opacity={0.2} />
      <GridBackground pattern="cross" color="rgba(255, 77, 0, 0.04)" mask="radial" />

      {/* Top Sub-Header & Sequence Breadcrumb Bar */}
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
          {/* Previous Step: Back to Movie Saga */}
          <Magnetic strength={0.2}>
            <Link
              to="/movie-saga"
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
              <span>← PREVIOUS: MOVIE SAGA</span>
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
            <Gamepad2 size={14} />
            <span>PAGE 3 OF 3 • HORROR ARCADE</span>
          </div>

          {/* Quick Direct Actions: House Selection & Leaderboard */}
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
                to="/leaderboard"
                variant="glass"
                size="sm"
                icon={<Trophy size={14} />}
                style={{
                  padding: '7px 16px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                }}
              >
                LEADERBOARD
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Main Mini-Games Arcade Section */}
      <div style={{ position: 'relative', zIndex: 10, paddingTop: '1rem' }}>
        <AavegGamesSection />
      </div>

      {/* Bottom Sequence Climax Banner */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          padding: '2rem 1.5rem 6rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '920px',
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
              <span>SEQUENCE COMPLETE // CLAIM YOUR GLORY</span>
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
            YOU SURVIVED THE ARCADE •{' '}
            <ShinyText color="#FF3B00" shimmerColor="#FFEAA7" speed={3}>
              NOW CONQUER THE WAR
            </ShinyText>
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto',
              lineHeight: '1.6',
            }}
          >
            Join your hostel house to represent your fraternity in Box Cricket, Valorant & BGMI LAN battles,
            Gothic Fashion, and Rock Band showdowns.
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
            {/* House Selection Main CTA */}
            <Magnetic strength={0.25}>
              <Button
                to="/houses"
                variant="primary"
                size="xl"
                icon={<Shield size={20} />}
                style={{
                  fontSize: '1.05rem',
                  padding: '16px 36px',
                  fontWeight: '800',
                  boxShadow: '0 0 35px rgba(255, 77, 0, 0.6), 0 8px 30px rgba(0,0,0,0.8)',
                }}
              >
                SELECT YOUR HOUSE & REGISTER
              </Button>
            </Magnetic>

            {/* Live Standings */}
            <Magnetic strength={0.25}>
              <Button
                to="/leaderboard"
                variant="glass"
                size="xl"
                icon={<Trophy size={18} />}
                style={{
                  fontSize: '1.05rem',
                  padding: '16px 30px',
                  fontWeight: '700',
                }}
              >
                VIEW LIVE STANDINGS
              </Button>
            </Magnetic>

            {/* Back to Movie Saga */}
            <Magnetic strength={0.2}>
              <Button
                to="/movie-saga"
                variant="outline"
                size="xl"
                icon={<Film size={18} />}
                style={{
                  fontSize: '1.05rem',
                  padding: '16px 28px',
                }}
              >
                ← BACK TO MOVIE SAGA
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
                  padding: '16px 24px',
                }}
              >
                HOME
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}
