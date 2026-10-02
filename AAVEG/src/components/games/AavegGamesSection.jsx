import React, { useState, useEffect } from 'react';
import { Zap, Play, Trophy, Sparkles, Shield, Flame, Skull } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import CardSpotlight from '../ui/CardSpotlight';
import GridBackground from '../ui/GridBackground';
import BackgroundBeams from '../ui/BackgroundBeams';
import ShinyText from '../ui/ShinyText';
import Magnetic from '../ui/Magnetic';
import FloatingElements from '../ui/FloatingElements';
import ThunderShieldGame from './ThunderShieldGame';
import PumpkinJumpGame from './PumpkinJumpGame';

/**
 * AavegGamesSection Component
 * Displayed at the end of the Home page. Features 2 interactive cards for:
 * 1. THUNDER SHIELD (Protect the bat from attacking entities)
 * 2. PUMPKIN JUMP (T-Rex style haunted runner)
 * Clicking either card opens a full-screen interactive game modal with local high score storage.
 */
export default function AavegGamesSection() {
  const [activeGame, setActiveGame] = useState(null); // 'thunder' | 'pumpkin' | null
  const [thunderHighScore, setThunderHighScore] = useState(0);
  const [pumpkinHighScore, setPumpkinHighScore] = useState(0);

  // Sync high scores from localStorage
  const refreshHighScores = () => {
    setThunderHighScore(parseInt(localStorage.getItem('aaveg_thundershield_highscore') || '0', 10));
    setPumpkinHighScore(parseInt(localStorage.getItem('aaveg_pumpkinjump_highscore') || '0', 10));
  };

  useEffect(() => {
    refreshHighScores();
  }, [activeGame]);

  return (
    <section
      id="aaveg-games"
      className="cinematic-scene section-spacer"
      style={{
        paddingTop: '4rem',
        paddingBottom: '6rem',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambience */}
      <GridBackground pattern="cross" color="rgba(255, 77, 0, 0.05)" mask="radial" />
      <BackgroundBeams color="#FF4D00" />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(255, 77, 0, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Section Title */}
        <SectionTitle
          tagline="HORROR ARCADE"
          title="SURVIVE THE NIGHT • MINI-GAMES"
          highlightWord="MINI-GAMES"
          subtitle="TEST YOUR REFLEXES IN TWO ENDLESS SINGLE-PLAYER HORROR CHALLENGES"
        />

        {/* 2 Game Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {/* Card 1: THUNDER SHIELD */}
          <CardSpotlight
            color="#FF4D00"
            glowRadius={320}
            tilt={true}
            className="group cursor-pointer transition-all duration-300"
            style={{
              background: 'rgba(13, 16, 22, 0.9)',
              borderRadius: '20px',
              border: '1.5px solid rgba(255, 77, 0, 0.35)',
              padding: '2.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8)',
            }}
            onClick={() => setActiveGame('thunder')}
          >
            {/* Top High Score Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '16px',
                background: 'rgba(255, 77, 0, 0.15)',
                border: '1px solid rgba(255, 77, 0, 0.4)',
                fontSize: '0.75rem',
                fontWeight: '800',
                color: '#FF8533',
              }}
            >
              <Trophy size={14} />
              BEST: {thunderHighScore} PTS
            </div>

            <div>
              {/* Game Icon & Header */}
              <FloatingElements duration={4} distance={6}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(255, 77, 0, 0.3) 0%, rgba(216, 59, 1, 0.1) 100%)',
                    border: '1.5px solid #FF4D00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 0 20px rgba(255, 77, 0, 0.4)',
                  }}
                >
                  <Shield size={32} style={{ color: '#FF7700' }} />
                </div>
              </FloatingElements>

              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  color: '#FF4D00',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                ARCADE 01 • ENDLESS DEFENSE
              </div>

              <h3
                className="font-cinematic"
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '0.06em',
                  margin: '0 0 1rem 0',
                }}
              >
                <ShinyText text="THUNDER SHIELD" shimmerColor="#FF8533" />
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Protect the sacred night bat from hordes of attacking shadow entities and fire specters. Rotate your electric thunder shield to deflect enemies and build your combo!
              </p>

              {/* Game Highlights */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                  ⚡ 360° Shield Rotation
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                  🦇 3 Bat Lives
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                  💾 Saved High Scores
                </span>
              </div>
            </div>

            {/* Launch Button with Magnetic Feel */}
            <div>
              <Magnetic strength={0.15}>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #FF4D00 0%, #D83B01 100%)',
                    border: '1px solid rgba(255, 120, 40, 0.8)',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(255, 77, 0, 0.45)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Play size={16} style={{ fill: '#FFFFFF' }} />
                  PLAY THUNDER SHIELD
                </button>
              </Magnetic>
            </div>
          </CardSpotlight>

          {/* Card 2: PUMPKIN JUMP */}
          <CardSpotlight
            color="#FF7700"
            glowRadius={320}
            tilt={true}
            className="group cursor-pointer transition-all duration-300"
            style={{
              background: 'rgba(13, 16, 22, 0.9)',
              borderRadius: '20px',
              border: '1.5px solid rgba(255, 120, 40, 0.35)',
              padding: '2.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8)',
            }}
            onClick={() => setActiveGame('pumpkin')}
          >
            {/* Top High Score Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '16px',
                background: 'rgba(255, 120, 40, 0.15)',
                border: '1px solid rgba(255, 120, 40, 0.4)',
                fontSize: '0.75rem',
                fontWeight: '800',
                color: '#FFA04D',
              }}
            >
              <Trophy size={14} />
              BEST: {pumpkinHighScore} PTS
            </div>

            <div>
              {/* Game Icon & Header */}
              <FloatingElements duration={4.5} distance={6}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(255, 120, 40, 0.3) 0%, rgba(200, 60, 0, 0.1) 100%)',
                    border: '1.5px solid #FF7700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    fontSize: '2rem',
                    boxShadow: '0 0 20px rgba(255, 120, 40, 0.4)',
                  }}
                >
                  🎃
                </div>
              </FloatingElements>

              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  color: '#FF7700',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                ARCADE 02 • GRAVEYARD RUNNER
              </div>

              <h3
                className="font-cinematic"
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '0.06em',
                  margin: '0 0 1rem 0',
                }}
              >
                <ShinyText text="PUMPKIN JUMP" shimmerColor="#FFB366" />
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                T-Rex style endless runner! Jump the fiery Jack-o'-Lantern over sinister gravestones, cursed spike fences, and swooping phantom bats. Double-jump for airborne maneuvers!
              </p>

              {/* Game Highlights */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                  🏃 T-Rex Style Endless Run
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                  🦘 Double-Jump Physics
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                  🔥 Speed Scales Up
                </span>
              </div>
            </div>

            {/* Launch Button with Magnetic Feel */}
            <div>
              <Magnetic strength={0.15}>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #FF7700 0%, #C43D00 100%)',
                    border: '1px solid rgba(255, 140, 60, 0.8)',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(255, 120, 40, 0.45)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Play size={16} style={{ fill: '#FFFFFF' }} />
                  PLAY PUMPKIN JUMP
                </button>
              </Magnetic>
            </div>
          </CardSpotlight>
        </div>

      </div>

      {/* Full-Screen Game Card Modals */}
      {activeGame === 'thunder' && (
        <ThunderShieldGame onClose={() => setActiveGame(null)} />
      )}

      {activeGame === 'pumpkin' && (
        <PumpkinJumpGame onClose={() => setActiveGame(null)} />
      )}
    </section>
  );
}
