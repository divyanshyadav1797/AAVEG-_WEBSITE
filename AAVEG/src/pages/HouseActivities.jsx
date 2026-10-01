import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Gamepad2, Music, ExternalLink, CheckCircle, Shield } from 'lucide-react';
import { HOUSES } from '../data/registration';
import GlassContainer from '../components/common/GlassContainer';
import Button from '../components/common/Button';
import CardSpotlight from '../components/ui/CardSpotlight';
import BackgroundBeams from '../components/ui/BackgroundBeams';
import Meteors from '../components/ui/Meteors';
import MovingBorder from '../components/ui/MovingBorder';
import GlitchText from '../components/ui/GlitchText';
import Magnetic from '../components/ui/Magnetic';
import ShinyText from '../components/ui/ShinyText';
import FloatingElements from '../components/ui/FloatingElements';
import FocusCards from '../components/ui/FocusCards';
import GridBackground from '../components/ui/GridBackground';

export default function HouseActivities() {
  const { houseId } = useParams();

  // Find the selected house, fallback to house-1 if not found
  const house = HOUSES.find((h) => h.id === houseId) || HOUSES[0];

  const activitiesList = [
    {
      key: 'sports',
      title: 'SPORTS',
      subtitle: 'PHYSICAL VALOR & STADIUM WARS',
      icon: <Trophy size={36} style={{ color: '#FF4D00' }} />,
      color: '#FF4D00',
      description:
        'Represent your house in floodlit box cricket, high-intensity futsal, volleyball tournaments, arm-wrestling cages, and the inter-hostel tug-of-war.',
      events: ['Inter-Hostel Box Cricket', '5v5 Turf Futsal', 'Arm Wrestling Cage', 'Tug of War Derby', 'Track Sprint'],
      formUrl: house.activities.sports.formUrl,
    },
    {
      key: 'esports',
      title: 'ESPORTS',
      subtitle: 'LAN INFERNO & DIGITAL DOMINANCE',
      icon: <Gamepad2 size={36} style={{ color: '#3A86FF' }} />,
      color: '#3A86FF',
      description:
        '12-hour high-stakes LAN tournament hosted in high-spec gaming labs. Full squad battles and individual fighting game showdowns.',
      events: ['Valorant 5v5 Championship', 'BGMI Squad Battle Royale', 'EA Sports FC / FIFA 24', 'Tekken 8 Showdown'],
      formUrl: house.activities.esports.formUrl,
    },
    {
      key: 'cultural',
      title: 'CULTURAL',
      subtitle: 'HAUTE COUTURE & ROCK STAGE',
      icon: <Music size={36} style={{ color: '#9D4EDD' }} />,
      color: '#9D4EDD',
      description:
        'The dark theatrical soul of AAVEG. Gothic haute couture fashion runways, 8-band college rock clashes, rap cyphers, and spooky cosplay.',
      events: ['Gothic Masquerade Runway', 'Battle of the College Bands', 'Rap Cypher Faceoff', 'Character Cosplay Parade'],
      formUrl: house.activities.cultural.formUrl,
    },
  ];

  return (
    <div
      className="house-activities-page relative min-h-screen w-full"
      style={{
        paddingTop: 'calc(var(--header-height) + 2rem)',
        paddingBottom: '5rem',
        backgroundColor: '#040507',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow & Aceternity Volumetric Beams tailored to the house color */}
      <BackgroundBeams color={house.color} />
      <Meteors number={14} color={house.color} />
      <GridBackground color={`${house.color}12`} maskRadius="65%">

      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '850px',
          height: '450px',
          background: `radial-gradient(ellipse at center, ${house.accentGlow} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        {/* Navigation & Switch House Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          <Magnetic strength={0.2}>
            <Link
              to="/houses"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: '700',
                textDecoration: 'none',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = house.color)}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <ArrowLeft size={16} />
              <span>← SWITCH HOUSE (CURRENT: {house.name.toUpperCase()})</span>
            </Link>
          </Magnetic>

          {/* Active House Badge with Annnimate Floating motion */}
          <FloatingElements duration={3} distance={4} rotate={2}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 18px',
                borderRadius: '25px',
                background: 'rgba(15, 18, 22, 0.85)',
                border: `1.5px solid ${house.color}`,
                boxShadow: `0 0 20px ${house.accentGlow}`,
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{house.sigil}</span>
              <span
                style={{
                  fontFamily: 'var(--font-cinematic)',
                  fontSize: '0.9rem',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '0.1em',
                }}
              >
                {house.name.toUpperCase()}
              </span>
            </div>
          </FloatingElements>
        </div>

        {/* Page Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: '800',
              letterSpacing: '0.24em',
              color: house.color,
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            STAGE 02 OF 02 • ACTIVITY REGISTRATION
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-cinematic)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: '900',
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              textShadow: '0 4px 25px rgba(0,0,0,0.9)',
            }}
          >
            SELECT ACTIVITY FOR{' '}
            <span style={{ color: house.color, textShadow: `0 0 30px ${house.accentGlow}` }}>
              <ShinyText color={house.color} shimmerColor="#FFFFFF" speed={3}>
                <GlitchText text={house.name.toUpperCase()} speed={30} maxIterations={5} />
              </ShinyText>
            </span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            Each house uses dedicated registration forms. Click an activity below to open the official Google Form
            configured specifically for <strong>{house.name}</strong>.
          </p>
        </div>

        {/* The 3 Activities with Aceternity FocusCards & CardSpotlight 3D Tilt */}
        <FocusCards
          cards={activitiesList}
          gridClassName="gap-8 mb-16"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
          renderCard={(act, idx, isHovered) => (
            <CardSpotlight
              key={act.key}
              color={act.color}
              glowRadius={380}
              tilt={true}
              style={{
                padding: '2.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: isHovered ? `2px solid ${act.color}` : `1.5px solid ${act.color}55`,
                background: isHovered ? 'rgba(16, 18, 24, 0.98)' : 'rgba(12, 14, 18, 0.92)',
                borderRadius: '20px',
                position: 'relative',
                height: '100%',
                boxShadow: isHovered
                  ? `0 0 40px ${act.color}44, 0 15px 40px rgba(0,0,0,0.9)`
                  : 'none',
              }}
            >
              {/* Activity Top */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <FloatingElements duration={3.5 + idx * 0.4} distance={4} rotate={2}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: `${act.color}18`,
                        border: `1px solid ${act.color}44`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 20px ${act.color}33`,
                      }}
                    >
                      {act.icon}
                    </div>
                  </FloatingElements>

                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      letterSpacing: '0.16em',
                      color: house.color,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {house.name}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    letterSpacing: '0.2em',
                    color: act.color,
                    textTransform: 'uppercase',
                  }}
                >
                  {act.subtitle}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-cinematic)',
                    fontSize: '1.9rem',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                    marginBottom: '1rem',
                  }}
                >
                  <ShinyText color="#FFFFFF" shimmerColor={act.color} speed={3.5}>
                    {act.title}
                  </ShinyText>
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                  }}
                >
                  {act.description}
                </p>

                {/* Sub-events Checklist */}
                <div style={{ marginBottom: '2rem' }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      letterSpacing: '0.15em',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    FEATURED COMPETITIONS:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', padding: 0 }}>
                    {act.events.map((ev, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.84rem',
                          color: '#F0ECE4',
                        }}
                      >
                        <CheckCircle size={14} style={{ color: act.color }} />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Activity Google Form Button with MovingBorder & Magnetic */}
              <Magnetic strength={0.25}>
                <MovingBorder duration={3000} color={act.color} borderRadius="12px" style={{ width: '100%' }}>
                  <a
                    href={act.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${act.color} 0%, #0c0d10 160%)`,
                      border: `1.5px solid ${act.color}`,
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      fontWeight: '800',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: `0 8px 25px ${act.color}44`,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 10px 30px ${act.color}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = `0 8px 25px ${act.color}44`;
                    }}
                  >
                    <span>OPEN {act.title} GOOGLE FORM</span>
                    <ExternalLink size={16} />
                  </a>
                </MovingBorder>
              </Magnetic>
            </CardSpotlight>
          )}
        />
      </div>
      </GridBackground>
    </div>
  );
}
