import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Crown, Flame } from 'lucide-react';
import HostelWars from '../components/home/HostelWars';
import GridBackground from '../components/ui/GridBackground';
import ShinyText from '../components/ui/ShinyText';
import Magnetic from '../components/ui/Magnetic';
import FloatingElements from '../components/ui/FloatingElements';

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
        {/* Back Link with React Bits Magnetic physics */}
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
              marginBottom: '1.5rem',
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
              <ShinyText text="BACK TO FESTIVAL SAGA" shimmerColor="#FF8533" />
            </span>
          </Link>
        </Magnetic>
      </div>

      {/* Main Leaderboard & War Arena */}
      <HostelWars />
    </div>
  );
}

