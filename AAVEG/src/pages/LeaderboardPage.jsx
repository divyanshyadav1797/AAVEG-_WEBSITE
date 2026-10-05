import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Film, Gamepad2 } from 'lucide-react';
import HostelWars from '../components/home/HostelWars';
import GridBackground from '../components/ui/GridBackground';
import ShinyText from '../components/ui/ShinyText';
import Magnetic from '../components/ui/Magnetic';
import Button from '../components/common/Button';

export default function LeaderboardPage() {
  return (
    <div
      className="leaderboard-page"
      style={{
        paddingTop: 'calc(var(--header-height) + 1.5rem)',
        paddingBottom: '5rem',
        backgroundColor: '#040507',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'visible',
        width: '100%',
        color: '#EDE8E1',
      }}
    >
      {/* Aceternity Grid Background */}
      <GridBackground
        pattern="cross"
        color="rgba(255, 77, 0, 0.07)"
        mask="radial"
        fadeDirection="center"
      />

      <div className="container relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Navigation Bar with Sequence Links & House Selection CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
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
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FF4D00';
                  e.currentTarget.style.borderColor = 'rgba(255, 77, 0, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'rgba(255, 77, 0, 0.2)';
                }}
              >
                <ArrowLeft size={16} />
                <span>
                  <ShinyText text="BACK TO HOME" shimmerColor="#FF8533" />
                </span>
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
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: 'rgba(18, 20, 24, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Film size={14} />
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
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: 'rgba(18, 20, 24, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Gamepad2 size={14} />
                <span>MINI-GAMES</span>
              </Link>
            </Magnetic>
          </div>

          {/* House Selection Button accessible from Leaderboard */}
          <Magnetic strength={0.2}>
            <Button
              to="/houses"
              variant="primary"
              size="sm"
              icon={<Shield size={14} />}
              style={{ fontWeight: '800', padding: '7px 18px' }}
            >
              SELECT YOUR HOUSE
            </Button>
          </Magnetic>
        </div>
      </div>

      {/* Main Leaderboard & War Arena */}
      <HostelWars />
    </div>
  );
}

