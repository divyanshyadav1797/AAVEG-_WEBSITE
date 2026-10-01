import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { HOUSES } from '../../data/registration';
import Button from '../common/Button';
import SparklesCore from '../ui/SparklesCore';
import Meteors from '../ui/Meteors';
import MovingBorder from '../ui/MovingBorder';
import GlitchText from '../ui/GlitchText';
import Magnetic from '../ui/Magnetic';
import ShinyText from '../ui/ShinyText';
import FloatingElements from '../ui/FloatingElements';
import GridBackground from '../ui/GridBackground';

export default function CircularHouseSelector({ onSelectHouse }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const totalHouses = HOUSES.length;
  const anglePerStep = 360 / totalHouses;

  const currentHouse = HOUSES[activeIndex];

  // Rotate to specific house index
  const selectHouseIndex = (index) => {
    const diff = index - activeIndex;
    let shortestDiff = diff;
    if (diff > totalHouses / 2) shortestDiff = diff - totalHouses;
    if (diff < -totalHouses / 2) shortestDiff = diff + totalHouses;

    setRotationAngle((prev) => prev - shortestDiff * anglePerStep);
    setActiveIndex((index + totalHouses) % totalHouses);
  };

  const nextHouse = () => {
    selectHouseIndex((activeIndex + 1) % totalHouses);
  };

  const prevHouse = () => {
    selectHouseIndex((activeIndex - 1 + totalHouses) % totalHouses);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextHouse();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevHouse();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const handleHouseConfirm = () => {
    if (onSelectHouse) {
      onSelectHouse(currentHouse);
    } else {
      navigate(`/house/${currentHouse.id}`);
    }
  };

  return (
    <div
      ref={containerRef}
      className="circular-selector-wrapper relative w-full flex flex-col items-center select-none"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1rem 4rem',
      }}
    >
      {/* Top Selector Status with Annnimate Floating motion */}
      <FloatingElements duration={4} distance={4} rotate={1}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '25px',
            background: 'rgba(255, 77, 0, 0.12)',
            border: '1px solid rgba(255, 77, 0, 0.35)',
            color: 'var(--accent-bright)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            fontWeight: '700',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          <Sparkles size={14} />
          <span>
            <ShinyText color="var(--accent-bright)" shimmerColor="#FFFFFF" speed={3.5}>
              SELECT YOUR HOSTEL HOUSE • 0{activeIndex + 1} OF 08
            </ShinyText>
          </span>
        </div>
      </FloatingElements>

      {/* Main Radial Dial Stage with Aceternity GridBackground */}
      <GridBackground color={`${currentHouse.color}15`} maskRadius="60%">
        <div
          className="radial-stage relative"
          onTouchStart={(e) => {
            startX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = e.changedTouches[0].clientX - startX.current;
            if (diff > 45) {
              prevHouse();
            } else if (diff < -45) {
              nextHouse();
            }
          }}
          style={{
            position: 'relative',
            width: 'clamp(280px, 86vw, 620px)',
            height: 'clamp(280px, 86vw, 620px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            touchAction: 'pan-y',
          }}
        >
          {/* Outer Gothic Astrolabe Compass Ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px dashed rgba(255, 77, 0, 0.25)',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(255, 59, 0, 0.08)',
              pointerEvents: 'none',
            }}
          />

          {/* Secondary Decorative Ring */}
          <div
            style={{
              position: 'absolute',
              inset: '12%',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              pointerEvents: 'none',
            }}
          />

          {/* The 8 House Nodes Positioned in 360-degree Orbit */}
          <div
            className="orbit-container"
            style={{
              position: 'absolute',
              inset: 0,
              transform: `rotate(${rotationAngle}deg)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transformOrigin: 'center center',
            }}
          >
            {HOUSES.map((house, idx) => {
              const angle = (idx * anglePerStep * Math.PI) / 180;
              // Radius of orbit in percent from center
              const radius = 42; 
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const isActive = idx === activeIndex;

              return (
                <div
                  key={house.id}
                  onClick={() => selectHouseIndex(idx)}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) rotate(${-rotationAngle}deg) scale(${isActive ? 1.22 : 0.95})`,
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                    zIndex: isActive ? 20 : 10,
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                  }}
                >
                  {/* Node Orb */}
                  <div
                    style={{
                      width: 'clamp(40px, 9vw, 66px)',
                      height: 'clamp(40px, 9vw, 66px)',
                      borderRadius: '50%',
                      background: isActive
                        ? `radial-gradient(circle at 35% 35%, ${house.color} 0%, #150805 100%)`
                        : 'rgba(18, 20, 24, 0.85)',
                      border: `2px solid ${isActive ? '#FFFFFF' : `${house.color}77`}`,
                      boxShadow: isActive
                        ? `0 0 25px ${house.color}, 0 8px 20px rgba(0,0,0,0.9)`
                        : '0 4px 15px rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span style={{ fontSize: 'clamp(0.95rem, 2vw, 1.35rem)' }}>{house.sigil}</span>
                    <span
                      style={{
                        fontSize: '0.6rem',
                        fontFamily: 'var(--font-cinematic)',
                        fontWeight: '800',
                        letterSpacing: '0.08em',
                        color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                        marginTop: '1px',
                      }}
                    >
                      H{house.number}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Celestial Sparks Aura around the radial dial */}
          <SparklesCore particleColor={currentHouse.color} particleDensity={22} minSize={0.6} maxSize={2.0} />

          {/* Center Stage: Active Selected House Showcase with Aceternity MovingBorder */}
          <MovingBorder
            duration={3600}
            color={currentHouse.color}
            borderRadius="50%"
            style={{
              position: 'relative',
              zIndex: 15,
              width: 'clamp(185px, 48vw, 310px)',
              height: 'clamp(185px, 48vw, 310px)',
            }}
          >
            <div
              className="center-showcase"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(22, 25, 30, 0.95) 0%, rgba(10, 11, 14, 0.98) 100%)',
                border: `2px solid ${currentHouse.color}`,
                boxShadow: `0 0 45px ${currentHouse.accentGlow}, inset 0 0 35px ${currentHouse.accentGlow}, 0 20px 50px rgba(0,0,0,0.95)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1.5rem',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Big Sigil with Annnimate Floating motion */}
              <FloatingElements duration={3} distance={6} rotate={3}>
                <div
                  style={{
                    fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
                    lineHeight: '1',
                    filter: `drop-shadow(0 0 15px ${currentHouse.color})`,
                    marginBottom: '6px',
                  }}
                >
                  {currentHouse.sigil}
                </div>
              </FloatingElements>

              {/* House Title with React Bits Glitch Decryption & ShinyText */}
              <h3
                style={{
                  fontFamily: 'var(--font-cinematic)',
                  fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                <ShinyText color={currentHouse.color} shimmerColor="#FFFFFF" speed={3}>
                  <GlitchText text={currentHouse.name} speed={30} maxIterations={5} />
                </ShinyText>
              </h3>

              {/* Motto */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.72rem, 1.4vw, 0.85rem)',
                  fontWeight: '600',
                  color: currentHouse.color,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: '1.3',
                  maxWidth: '220px',
                  marginBottom: '14px',
                }}
              >
                "{currentHouse.motto}"
              </p>

            {/* Direct Proceed Button */}
            <Magnetic strength={0.25}>
              <button
                onClick={handleHouseConfirm}
                style={{
                  padding: '8px 18px',
                  borderRadius: '25px',
                  background: currentHouse.color,
                  border: '1px solid #FFFFFF',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: `0 4px 18px ${currentHouse.accentGlow}`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <span>SELECT & PROCEED</span>
                <ArrowRight size={14} />
              </button>
            </Magnetic>
          </div>
        </MovingBorder>
      </div>
      </GridBackground>

      {/* Navigation Controls: Prev / Next & Quick House Chips */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          marginTop: '2.5rem',
        }}
      >
        <Magnetic strength={0.3}>
          <button
            onClick={prevHouse}
            aria-label="Previous House"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 77, 0, 0.12)',
              border: '1px solid rgba(255, 77, 0, 0.4)',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 77, 0, 0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 77, 0, 0.12)')}
          >
            <ChevronLeft size={22} />
          </button>
        </Magnetic>

        <span
          style={{
            fontFamily: 'var(--font-cinematic)',
            fontSize: '1rem',
            fontWeight: '800',
            letterSpacing: '0.15em',
            color: '#FFFFFF',
          }}
        >
          {currentHouse.name}
        </span>

        <Magnetic strength={0.3}>
          <button
            onClick={nextHouse}
            aria-label="Next House"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 77, 0, 0.12)',
              border: '1px solid rgba(255, 77, 0, 0.4)',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 77, 0, 0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 77, 0, 0.12)')}
          >
            <ChevronRight size={22} />
          </button>
        </Magnetic>
      </div>

      {/* Quick House Selector Pill Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '1.5rem',
          maxWidth: '680px',
        }}
      >
        {HOUSES.map((h, i) => (
          <button
            key={h.id}
            onClick={() => selectHouseIndex(i)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              background: activeIndex === i ? h.color : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${activeIndex === i ? '#FFF' : 'rgba(255, 255, 255, 0.12)'}`,
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: activeIndex === i ? '800' : '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {h.name}
          </button>
        ))}
      </div>
    </div>
  );
}
