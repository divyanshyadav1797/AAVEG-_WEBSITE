import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Crown, Flame, Trophy, Clock, Sparkles, Shield, ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import CardSpotlight from '../ui/CardSpotlight';
import BackgroundBeams from '../ui/BackgroundBeams';
import Meteors from '../ui/Meteors';
import MovingBorder from '../ui/MovingBorder';
import Magnetic from '../ui/Magnetic';
import GlitchText from '../ui/GlitchText';
import ShinyText from '../ui/ShinyText';
import FocusCards from '../ui/FocusCards';
import FloatingElements from '../ui/FloatingElements';
import GridBackground from '../ui/GridBackground';
import { HOUSES } from '../../data/registration';

export default function HostelWars() {
  // Initialize with the 8 Houses and baseline battle points
  const initialHouses = HOUSES.map((h, i) => ({
    ...h,
    points: 1250 - i * 90 + (i === 0 ? 120 : 0),
  }));

  const [housesList, setHousesList] = useState(initialHouses);
  const [selectedHouseId, setSelectedHouseId] = useState('house-1');
  const [timeLeft, setTimeLeft] = useState({ days: 27, hours: 14, minutes: 20, seconds: 45 });

  // Countdown timer to October 28, 2026
  useEffect(() => {
    const targetDate = new Date('2026-10-28T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cheer / vote for house interaction
  const handleCheer = (houseId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#FF4D00', '#FFA04D', '#FFD166', '#FFFFFF'],
      disableForReducedMotion: true,
    });

    setHousesList((prev) => {
      const updated = prev.map((h) => (h.id === houseId ? { ...h, points: h.points + 10 } : h));
      // Sort dynamically descending by points
      return [...updated].sort((a, b) => b.points - a.points);
    });
  };

  return (
    <section
      className="cinematic-scene section-spacer py-24 relative overflow-hidden"
      style={{
        paddingTop: '3rem',
        paddingBottom: '6rem',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#040507',
      }}
      id="leaderboard"
    >
      {/* Aceternity UI - Volumetric Horror Beams, Grid & Falling Embers */}
      <GridBackground pattern="cross" color="rgba(255, 77, 0, 0.05)" mask="radial" />
      <BackgroundBeams color="#FF4D00" />
      <Meteors number={14} color="#FF7A32" />

      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '450px',
          background: 'radial-gradient(ellipse at center, rgba(255, 77, 0, 0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10" style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Title */}
        <SectionTitle
          tagline="THE ROYAL CLASH"
          title="EIGHT HOUSES • ONE CROWN"
          highlightWord="CROWN"
          subtitle="DIFFERENT ROOMS. ONE SPIRIT. WHO WILL RULE AAVEG 2026?"
        />

        {/* Live Status & Countdown Banner */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '12px 24px',
            borderRadius: '14px',
            background: 'rgba(18, 20, 24, 0.85)',
            border: '1px solid rgba(255, 77, 0, 0.3)',
            backdropFilter: 'blur(16px)',
            marginBottom: '3rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={18} style={{ color: 'var(--accent-bright)' }} />
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              <ShinyText text="LIVE LEADERBOARD • REAL-TIME HOUSE STANDINGS" shimmerColor="#FF8533" />
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock size={16} style={{ color: 'var(--accent-glow)' }} />
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
              EVENT BEGINS IN:
            </span>
            <div
              className="font-cinematic"
              style={{
                fontSize: '1.15rem',
                fontWeight: '900',
                color: 'var(--accent-bright)',
                letterSpacing: '0.12em',
              }}
            >
              <ShinyText
                text={`${String(timeLeft.days).padStart(2, '0')}D ${String(timeLeft.hours).padStart(2, '0')}H ${String(timeLeft.minutes).padStart(2, '0')}M ${String(timeLeft.seconds).padStart(2, '0')}S`}
                shimmerColor="#FFFFFF"
              />
            </div>
          </div>
        </div>

        {/* 8 Houses Majestic Podium Grid with Aceternity FocusCards & CardSpotlight */}
        <FocusCards
          blurAmount="1px"
          unfocusedOpacity={0.65}
          unfocusedScale={0.98}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {housesList.map((house, rankIndex) => {
            const isLeader = rankIndex === 0;
            const isSelected = selectedHouseId === house.id;

            return (
              <CardSpotlight
                key={house.id}
                color={house.color}
                glowRadius={280}
                tilt={true}
                className="group relative transition-all duration-400"
                style={{
                  border: `1.5px solid ${isSelected ? house.color : `${house.color}55`}`,
                  boxShadow: isLeader
                    ? `0 10px 40px ${house.accentGlow}, inset 0 1px 0 rgba(255,255,255,0.2)`
                    : `0 8px 25px rgba(0,0,0,0.8)`,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(14, 16, 22, 0.92)',
                  borderRadius: '16px',
                }}
                onClick={() => setSelectedHouseId(house.id)}
              >
                {/* Crown / Rank Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    background: isLeader ? 'rgba(229, 169, 60, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${isLeader ? '#E5A93C' : 'rgba(255, 255, 255, 0.15)'}`,
                    color: isLeader ? '#FFD166' : 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    letterSpacing: '0.1em',
                    zIndex: 5,
                  }}
                >
                  {isLeader ? (
                    <>
                      <Crown size={13} style={{ fill: '#FFD166' }} />
                      #1 RANK
                    </>
                  ) : (
                    `#${rankIndex + 1} RANK`
                  )}
                </div>

                {/* Banner Header */}
                <div
                  style={{
                    padding: '2rem 1.25rem 1rem 1.25rem',
                    textAlign: 'center',
                    borderBottom: `1px solid ${house.color}33`,
                    background: `linear-gradient(180deg, ${house.color}18 0%, transparent 100%)`,
                  }}
                >
                  <FloatingElements duration={4 + rankIndex * 0.3} distance={5}>
                    <div style={{ fontSize: '2.2rem', marginBottom: '4px', filter: `drop-shadow(0 0 12px ${house.color})` }}>
                      {house.sigil}
                    </div>
                  </FloatingElements>

                  <h3
                    className="font-cinematic"
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: '900',
                      color: '#FFFFFF',
                      letterSpacing: '0.08em',
                      margin: '4px 0',
                      textShadow: `0 0 15px ${house.accentGlow}`,
                    }}
                  >
                    <ShinyText text={house.name} shimmerColor={house.color} />
                  </h3>

                  <div
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.18em',
                      color: house.color,
                      fontWeight: '800',
                      textTransform: 'uppercase',
                    }}
                  >
                    {house.motto}
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '1.5rem 1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  {/* Points Counter */}
                  <div style={{ margin: '0.75rem 0' }}>
                    <div
                      className="font-cinematic"
                      style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        color: house.color,
                        lineHeight: '1',
                        textShadow: `0 0 20px ${house.accentGlow}`,
                      }}
                    >
                      <ShinyText text={house.points.toLocaleString()} shimmerColor="#FFFFFF" />
                    </div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        letterSpacing: '0.25em',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        marginTop: '4px',
                      }}
                    >
                      BATTLE POINTS
                    </div>
                  </div>

                  {/* Cheer Button with Magnetic physics */}
                  <div>
                    <Magnetic strength={0.15}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheer(house.id, e);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: `linear-gradient(135deg, ${house.color} 0%, rgba(0,0,0,0.85) 100%)`,
                          border: `1px solid ${house.color}`,
                          color: '#FFFFFF',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          boxShadow: `0 4px 15px ${house.accentGlow}`,
                        }}
                      >
                        <Flame size={14} style={{ fill: 'currentColor' }} />
                        CHEER (+10)
                      </button>
                    </Magnetic>

                    <div style={{ marginTop: '0.75rem' }}>
                      <Button
                        to={`/house/${house.id}`}
                        variant="outline"
                        size="sm"
                        style={{ width: '100%', fontSize: '0.75rem', padding: '6px 12px' }}
                      >
                        VIEW ACTIVITIES →
                      </Button>
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            );
          })}
        </FocusCards>

        {/* Bottom Banner with Aceternity MovingBorder */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
            EARN POINTS FOR YOUR HOUSE IN SPORTS DERBIES, LAN GAMING INFERNO & GOTHIC CULTURAL BATTLES.
          </p>
          <MovingBorder duration={3200} color="#FF4D00" borderRadius="30px" style={{ display: 'inline-block' }}>
            <Button to="/houses" variant="primary" size="lg" icon={<Shield size={18} />}>
              SELECT YOUR HOUSE TO ENTER THE ARENA
            </Button>
          </MovingBorder>
        </div>

      </div>
    </section>
  );
}

