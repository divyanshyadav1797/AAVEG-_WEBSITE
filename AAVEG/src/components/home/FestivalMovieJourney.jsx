import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Sparkles,
  MapPin,
  Clock,
  Radio,
  Trophy,
  Shield,
  ArrowRight,
  Calendar,
  Film,
  Compass,
} from 'lucide-react';
import GlassContainer from '../common/GlassContainer';
import Button from '../common/Button';
import CardSpotlight from '../ui/CardSpotlight';
import BackgroundBeams from '../ui/BackgroundBeams';
import Meteors from '../ui/Meteors';
import MovingBorder from '../ui/MovingBorder';
import GlitchText from '../ui/GlitchText';
import TextGenerateEffect from '../ui/TextGenerateEffect';
import Lamp from '../ui/Lamp';
import Magnetic from '../ui/Magnetic';
import FloatingElements from '../ui/FloatingElements';
import ShinyText from '../ui/ShinyText';
import FocusCards from '../ui/FocusCards';
import GridBackground from '../ui/GridBackground';

export default function FestivalMovieJourney() {
  const [activeAct, setActiveAct] = useState(0);
  const [activeNightTab, setActiveNightTab] = useState(0);
  const [movieProgress, setMovieProgress] = useState(0);

  const actRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // 4 Cinematic Movie Chapters
  const chapters = [
    { id: 0, tag: 'ACT 01', name: 'THE AWAKENING', title: 'WHAT IS AAVEG?' },
    { id: 1, tag: 'ACT 02', name: 'THE 4 NIGHTS', title: 'THE SAGA OF CHAOS' },
    { id: 2, tag: 'ACT 03', name: 'EIGHT HOUSES', title: 'THE BATTLE FOR THE CROWN' },
    { id: 3, tag: 'ACT 04', name: 'THE ARENA', title: 'ENTER THE ARENA' },
  ];

  // The 4 Nights Data
  const nights = [
    {
      night: 'NIGHT 01',
      date: '28 OCT 2026',
      title: 'NIGHT OF THE SPECTERS',
      subtitle: 'TORCH MARCH & OPENING REVELATION',
      color: '#FF4D00',
      time: '6:00 PM – MIDNIGHT',
      venue: 'Amphitheatre & Main Quadrangle',
      summary:
        'Over 1,500 hostellers march with blazing torches through the dark campus gates, carrying their house banners to inaugurate the 2026 games.',
      highlights: ['Torchlit Grand March', 'Acoustic Graveyard Sessions', 'Unveiling 2026 Trophy', 'Midnight Flashmob'],
    },
    {
      night: 'NIGHT 02',
      date: '29 OCT 2026',
      title: 'THE CLASH OF HOUSES',
      subtitle: 'SPORTS WAR & LAN INFERNO',
      color: '#FFA04D',
      time: '10:00 AM – 11:30 PM',
      venue: 'Floodlit Sports Grounds & Tech Labs',
      summary:
        'Eight rival houses face off in high-stakes floodlit box cricket, arm-wrestling cages, and a 12-hour non-stop PC/Console LAN championship.',
      highlights: ['Box Cricket & Futsal Derby', 'Valorant & BGMI LAN War', 'Hostel Tug-of-War', 'Rap Cypher Battles'],
    },
    {
      night: 'NIGHT 03',
      date: '30 OCT 2026',
      title: 'THE GOTHIC MASQUERADE',
      subtitle: 'HAUTE COUTURE & ROCK SUPREMACY',
      color: '#FF3B00',
      time: '5:30 PM – 11:00 PM',
      venue: 'Main PCE Auditorium',
      summary:
        'The most sinister and spectacular evening: gothic fashion runways, spooky cosplay masquerade, and an earth-shaking battle of 8 college rock bands.',
      highlights: ['Gothic Runway Competition', 'Battle of the College Bands', 'Spooky Cosplay Arena', 'Midnight Carnival'],
    },
    {
      night: 'NIGHT 04',
      date: 'FINALE NIGHT',
      title: 'EDM INFERNO & CORONATION',
      subtitle: 'CROWNING OF THE CHAMPION HOUSE',
      color: '#FFD166',
      time: '8:00 PM – TILL DAWN',
      venue: 'Main Festival Grounds',
      summary:
        'The grand climax of AAVEG. Golden firework cascades erupt as the 2026 Champion House lifts the crown, before celebrity DJs take over the stage.',
      highlights: ['Championship Cup Ceremony', 'Celebrity DJ & Laser Storm', 'The Forever Bonfire', 'Hostel Anthem Choir'],
    },
  ];

  // The 8 Houses Data
  const houses = [
    { name: 'HOUSE 1', tag: 'SCARLET TITANS', color: '#FF3B00', motto: 'Unyielding Strength & Primal Fury', sigil: '⚔️' },
    { name: 'HOUSE 2', tag: 'SOLAR PHOENIX', color: '#FF7A32', motto: 'Rising Above Ashes to Reign', sigil: '🐺' },
    { name: 'HOUSE 3', tag: 'GOLDEN VALIANT', color: '#FFD166', motto: 'Honor, Valor & Golden Legacy', sigil: '⚡' },
    { name: 'HOUSE 4', tag: 'EMERALD VIPERS', color: '#06D6A0', motto: 'Lethal Precision & Relentless Will', sigil: '👁️' },
    { name: 'HOUSE 5', tag: 'COBALT THUNDER', color: '#118AB2', motto: 'Strategic Dominance & Raw Power', sigil: '🐍' },
    { name: 'HOUSE 6', tag: 'SHADOW SPECTRES', color: '#9D4EDD', motto: 'Mastery in Silence & Decisive Strikes', sigil: '🔥' },
    { name: 'HOUSE 7', tag: 'CRIMSON BERSERKERS', color: '#EF476F', motto: 'Fearless Spirit in Every Clash', sigil: '🦅' },
    { name: 'HOUSE 8', tag: 'FROST MONARCHS', color: '#4CC9F0', motto: 'Cold Logic, Absolute Supremacy', sigil: '💀' },
  ];

  // Track active act on scroll using IntersectionObserver
  // Track active act and journey scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const sectionEl = document.getElementById('festival-movie');
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const totalHeight = sectionEl.offsetHeight - window.innerHeight;
        if (totalHeight > 0) {
          const currentScrolled = -rect.top;
          const pct = Math.min(100, Math.max(0, (currentScrolled / totalHeight) * 100));
          setMovieProgress(pct);
        }
      }

      // Check which act is currently most visible in viewport
      actRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveAct(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAct = (actIdx) => {
    if (actRefs[actIdx] && actRefs[actIdx].current) {
      actRefs[actIdx].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="festival-movie"
      className="movie-story-wrapper relative w-full"
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* Target Anchors for header navigation jumps */}
      <div id="about" style={{ position: 'absolute', top: 0, height: '1px' }} />
      <div id="nights" style={{ position: 'absolute', top: '25%', height: '1px' }} />

      {/* Sticky Director's Filmstrip HUD */}
      <div
        className="movie-directors-hud sticky top-0 z-30 w-full"
        style={{
          position: 'sticky',
          top: 'var(--header-height)',
          zIndex: 35,
          background: 'rgba(5, 6, 9, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 77, 0, 0.25)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.85)',
          padding: '0.75rem 1.5rem',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Live Recording Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#FF3B00',
                display: 'inline-block',
                boxShadow: '0 0 10px #FF3B00',
                animation: 'pumpkinFlicker 1.8s infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: '800',
                letterSpacing: '0.22em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
              }}
            >
              REC • {chapters[activeAct].tag} // {chapters[activeAct].name}
            </span>
          </div>

          {/* Act Jump Controls */}
          <div
            className="flex items-center gap-1 sm:gap-2 flex-wrap"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => scrollToAct(idx)}
                style={{
                  background: activeAct === idx ? 'rgba(255, 59, 0, 0.25)' : 'transparent',
                  border: `1px solid ${activeAct === idx ? '#FF4D00' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '20px',
                  padding: '4px 12px',
                  fontFamily: 'var(--font-cinematic)',
                  fontSize: '0.75rem',
                  fontWeight: activeAct === idx ? '900' : '600',
                  color: activeAct === idx ? '#FF5A14' : 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.25s ease',
                }}
              >
                <span>{ch.tag}</span>
                <span className="desktop-only" style={{ opacity: 0.7 }}>
                  • {ch.name}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Action */}
          <Button to="/houses" variant="primary" size="sm">
            SELECT HOUSE
          </Button>
        </div>

        {/* Thin Scrub Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2px',
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${movieProgress}%`,
              background: 'linear-gradient(90deg, #FF3B00, #FF9A3C)',
              boxShadow: '0 0 8px #FF3B00',
              transition: 'width 0.15s ease-out',
            }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACT 01: THE AWAKENING (WHAT IS AAVEG?)                                    */}
      {/* ========================================================================= */}
      <div
        ref={actRefs[0]}
        id="act-01"
        className="movie-act relative py-24 sm:py-32 overflow-hidden"
        style={{
          position: 'relative',
          padding: '6rem 1.5rem',
          borderBottom: '1px solid rgba(255, 77, 0, 0.15)',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(200, 45, 0, 0.08) 0%, transparent 65%)',
        }}
      >
        {/* Aceternity UI - Volumetric Horror Beams & Geometric Tech Grid */}
        <BackgroundBeams color="#FF3B00" />
        <GridBackground color="rgba(255, 77, 0, 0.06)" maskRadius="65%">

        <div className="container relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          {/* Act Badge with Annnimate Floating motion */}
          <FloatingElements duration={4} distance={5} rotate={1}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '30px',
                background: 'rgba(255, 77, 0, 0.12)',
                border: '1px solid rgba(255, 77, 0, 0.35)',
                color: 'var(--accent-bright)',
                fontSize: '0.82rem',
                fontWeight: '800',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              <Flame size={15} />
              <span>ACT 01 // PROLOGUE • THE AWAKENING OF MADNESS</span>
            </div>
          </FloatingElements>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Anton', var(--font-cinematic)",
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: '900',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: '1.02',
              maxWidth: '920px',
              margin: '0 auto 1.5rem auto',
              textShadow: '0 4px 25px rgba(0,0,0,0.9), 0 0 40px rgba(255, 59, 0, 0.45)',
            }}
          >
            WHAT IS{' '}
            <ShinyText color="#FF3B00" shimmerColor="#FFE59E" speed={3.2}>
              AAVEG?
            </ShinyText>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
              color: '#D8D1C7',
              maxWidth: '820px',
              lineHeight: '1.7',
              margin: '0 auto 3rem auto',
            }}
          >
            AAVEG is not merely an annual college event. It is a 4-day supernatural adrenaline phenomenon where
            routine campus rules dissolve into midnight torch marches, ground-shaking stadium rivalries, and memories
            etched in fire.
          </p>

          {/* 4 Pillars with Aceternity FocusCards & CardSpotlight 3D Tilt */}
          <FocusCards
            cards={[
              { num: '35+', label: 'ARENA TOURNAMENTS', desc: 'Sports derbies, LAN gaming battles, and cultural stages.' },
              { num: '1,500+', label: 'HOSTELLERS CLASHING', desc: 'United by fraternity, separated only by house pride.' },
              { num: '04', label: 'HAUNTED NIGHTS', desc: 'From torchlit graveyard acoustics to EDM inferno finale.' },
              { num: '01', label: 'ETERNAL TROPHY', desc: 'Only one house hoists the legendary Aaveg Cup.' },
            ]}
            gridClassName="max-w-[1150px] mx-auto mb-12"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
            renderCard={(stat, i, isHovered) => (
              <CardSpotlight
                key={i}
                color="#FF4D00"
                glowRadius={280}
                tilt={true}
                style={{
                  padding: '2.2rem 1.4rem',
                  textAlign: 'center',
                  background: isHovered ? 'rgba(22, 14, 10, 0.95)' : 'rgba(12, 14, 18, 0.88)',
                  border: isHovered ? '1.5px solid #FF4D00' : '1px solid rgba(255, 77, 0, 0.25)',
                  boxShadow: isHovered ? '0 0 30px rgba(255, 77, 0, 0.35)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                    fontSize: '3.4rem',
                    color: '#FF4D00',
                    lineHeight: '1',
                    marginBottom: '8px',
                    textShadow: '0 0 20px rgba(255, 77, 0, 0.55)',
                  }}
                >
                  <ShinyText color="#FF4D00" shimmerColor="#FFF4D0" speed={4}>
                    {stat.num}
                  </ShinyText>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-cinematic)',
                    fontSize: '0.92rem',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    letterSpacing: '0.12em',
                    marginBottom: '6px',
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                  {stat.desc}
                </div>
              </CardSpotlight>
            )}
          />

          <Magnetic strength={0.25}>
            <Button
              onClick={() => scrollToAct(1)}
              variant="outline"
              size="lg"
              icon={<ArrowRight size={18} />}
            >
              EXPLORE THE 4 NIGHTS →
            </Button>
          </Magnetic>
        </div>
        </GridBackground>
      </div>

      {/* ========================================================================= */}
      {/* ACT 02: THE 4 NIGHTS (THE SAGA OF CHAOS)                                  */}
      {/* ========================================================================= */}
      <div
        ref={actRefs[1]}
        id="act-02"
        className="movie-act relative py-24 sm:py-32 overflow-hidden"
        style={{
          position: 'relative',
          padding: '6rem 1.5rem',
          borderBottom: '1px solid rgba(255, 77, 0, 0.15)',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 120, 0, 0.06) 0%, transparent 70%)',
        }}
      >
        {/* Aceternity UI - Falling Ember Meteors */}
        <Meteors number={12} color="#FFA04D" />

        <div className="container relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '30px',
                background: 'rgba(255, 120, 40, 0.12)',
                border: '1px solid rgba(255, 120, 40, 0.35)',
                color: '#FFA04D',
                fontSize: '0.82rem',
                fontWeight: '800',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              <Calendar size={15} />
              <span>ACT 02 // CHRONICLES • THE 4 NIGHTS</span>
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Anton', var(--font-cinematic)",
                fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
                fontWeight: '900',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.9)',
              }}
            >
              THE FOUR NIGHTS OF <span style={{ color: '#FF7A32' }}>RECKONING</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto' }}>
              Four distinct chapters. Four unforgettable spectacles under the Sitapura midnight sky.
            </p>
          </div>

          {/* Interactive Night Selector Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '2.5rem',
            }}
          >
            {nights.map((n, idx) => (
              <Magnetic key={idx} strength={0.2}>
                <button
                  onClick={() => setActiveNightTab(idx)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '30px',
                    background: activeNightTab === idx ? `${n.color}25` : 'rgba(255, 255, 255, 0.04)',
                    border: `1.5px solid ${activeNightTab === idx ? n.color : 'rgba(255, 255, 255, 0.12)'}`,
                    color: activeNightTab === idx ? '#FFFFFF' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-cinematic)',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: activeNightTab === idx ? `0 0 20px ${n.color}44` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: n.color,
                    }}
                  />
                  <span>{n.night}</span>
                  <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>({n.date})</span>
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Active Night Spotlight Card with Aceternity CardSpotlight */}
          {(() => {
            const cur = nights[activeNightTab];
            return (
              <CardSpotlight
                color={cur.color}
                glowRadius={420}
                tilt={true}
                style={{
                  maxWidth: '1020px',
                  margin: '0 auto',
                  padding: 'clamp(1.5rem, 4vw, 3rem)',
                  border: `1.5px solid ${cur.color}66`,
                  background: 'rgba(14, 16, 22, 0.94)',
                  boxShadow: `0 15px 50px rgba(0,0,0,0.9), 0 0 35px ${cur.color}22`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '1.25rem',
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: cur.color,
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        letterSpacing: '0.2em',
                        marginBottom: '4px',
                      }}
                    >
                      {cur.night} • {cur.date} • {cur.subtitle}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Bebas Neue', 'Anton', var(--font-cinematic)",
                        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                        color: '#FFFFFF',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        margin: 0,
                      }}
                    >
                      {cur.title}
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                      <Clock size={16} style={{ color: cur.color }} />
                      <span style={{ fontWeight: '700', color: '#FFFFFF' }}>{cur.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                      <MapPin size={16} style={{ color: cur.color }} />
                      <span>{cur.venue}</span>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    marginBottom: '2rem',
                  }}
                >
                  {cur.summary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cur.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${cur.color}55`,
                        fontSize: '0.88rem',
                        fontWeight: '700',
                        color: '#FFFFFF',
                      }}
                    >
                      <Sparkles size={14} style={{ color: cur.color }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </CardSpotlight>
            );
          })()}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACT 03: EIGHT HOUSES • THE BATTLE FOR THE CROWN                          */}
      {/* ========================================================================= */}
      <div
        ref={actRefs[2]}
        id="act-03"
        className="movie-act relative py-24 sm:py-32 overflow-hidden"
        style={{
          position: 'relative',
          padding: '6rem 1.5rem',
          borderBottom: '1px solid rgba(255, 77, 0, 0.15)',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(157, 78, 221, 0.08) 0%, transparent 70%)',
        }}
      >
        <div className="container relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '30px',
              background: 'rgba(255, 77, 0, 0.12)',
              border: '1px solid rgba(255, 77, 0, 0.35)',
              color: '#FF7A32',
              fontSize: '0.82rem',
              fontWeight: '800',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Trophy size={15} />
            <span>ACT 03 // FACTIONS • INTER-HOUSE BLOOD RIVALRY</span>
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Anton', var(--font-cinematic)",
              fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
              fontWeight: '900',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.9)',
            }}
          >
            EIGHT HOUSES • ONE GOLDEN <span style={{ color: '#FFD166' }}>CROWN</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              lineHeight: '1.6',
              margin: '0 auto 3rem auto',
            }}
          >
            Hostellers turn competitors. Friendly rooms become battlefields. Points tally continuously across Sports,
            Esports, and Cultural arenas until one house conquers.
          </p>

          {/* 8 Houses with Aceternity FocusCards & CardSpotlight */}
          <FocusCards
            cards={houses}
            gridClassName="max-w-[1200px] mx-auto mb-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
            renderCard={(h, idx, isHovered) => (
              <CardSpotlight
                key={idx}
                color={h.color}
                glowRadius={240}
                tilt={true}
                style={{
                  padding: '1.6rem 1rem',
                  textAlign: 'center',
                  border: isHovered ? `1.5px solid ${h.color}` : `1px solid ${h.color}44`,
                  background: isHovered ? 'rgba(16, 18, 24, 0.98)' : 'rgba(12, 14, 18, 0.9)',
                  boxShadow: isHovered ? `0 0 35px ${h.color}55, 0 10px 30px rgba(0,0,0,0.9)` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <FloatingElements duration={3.5 + idx * 0.3} distance={5} rotate={2}>
                  <div
                    style={{
                      fontSize: '2.2rem',
                      marginBottom: '6px',
                      filter: `drop-shadow(0 0 12px ${h.color})`,
                    }}
                  >
                    {h.sigil}
                  </div>
                </FloatingElements>

                <h4
                  style={{
                    fontFamily: 'var(--font-cinematic)',
                    fontSize: '1.25rem',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    marginBottom: '2px',
                  }}
                >
                  <ShinyText color={h.color} shimmerColor="#FFFFFF" speed={3.5}>
                    {h.name}
                  </ShinyText>
                </h4>

                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    letterSpacing: '0.15em',
                    color: h.color,
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  {h.tag}
                </span>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                  "{h.motto}"
                </p>
              </CardSpotlight>
            )}
          />

          <Magnetic strength={0.25}>
            <MovingBorder duration={3400} color="#FF7A32" borderRadius="30px" style={{ display: 'inline-block' }}>
              <Button to="/houses" variant="primary" size="lg" icon={<Compass size={18} />}>
                OPEN CIRCULAR HOUSE SELECTOR
              </Button>
            </MovingBorder>
          </Magnetic>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACT 04: THE FINAL ARENA & REGISTRATION GATEWAY                           */}
      {/* ========================================================================= */}
      <div
        ref={actRefs[3]}
        id="act-04"
        className="movie-act relative py-24 sm:py-36 overflow-hidden"
        style={{
          position: 'relative',
          padding: '4rem 1.5rem 6rem',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 59, 0, 0.12) 0%, transparent 65%)',
        }}
      >
        {/* Aceternity UI - Atmospheric Background Beams & Embers */}
        <BackgroundBeams color="#FF4D00" />
        <Meteors number={16} color="#FF3B00" />

        {/* Aceternity UI - Radiant Cone Lamp Lighting Effect */}
        <Lamp color="#FF3B00" secondaryColor="#FFA04D">
          <div className="container relative z-10" style={{ maxWidth: '1020px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <FloatingElements duration={4} distance={4} rotate={1}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 18px',
                  borderRadius: '30px',
                  background: 'rgba(255, 77, 0, 0.15)',
                  border: '1px solid rgba(255, 77, 0, 0.4)',
                  color: 'var(--accent-bright)',
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                <Sparkles size={15} />
                <span>ACT 04 // THE FINAL ARENA • REGISTRATION CODEX</span>
              </div>
            </FloatingElements>

            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Anton', var(--font-cinematic)",
                fontSize: 'clamp(3rem, 7vw, 5.8rem)',
                fontWeight: '900',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                lineHeight: '1.04',
                marginBottom: '1.25rem',
                textShadow: '0 4px 25px rgba(0,0,0,0.9), 0 0 50px rgba(255, 59, 0, 0.6)',
              }}
            >
              WILL YOU SPECTATE, OR WILL YOU{' '}
              <ShinyText color="#FF3B00" shimmerColor="#FFEAA7" speed={3}>
                CONQUER?
              </ShinyText>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                color: '#D8D1C7',
                maxWidth: '750px',
                lineHeight: '1.7',
                margin: '0 auto 3rem auto',
              }}
            >
              Select your House to unlock the dedicated registration gateway for Sports Championships,
              LAN Gaming Arenas, and Gothic Cultural Stages.
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
              <Magnetic strength={0.25}>
                <MovingBorder duration={2800} color="#FF3B00" borderRadius="30px">
                  <Button
                    to="/houses"
                    variant="primary"
                    size="xl"
                    icon={<Shield size={20} />}
                    style={{
                      fontSize: '1.15rem',
                      padding: '16px 38px',
                      boxShadow: '0 0 40px rgba(255, 59, 0, 0.6), 0 8px 30px rgba(0,0,0,0.8)',
                    }}
                  >
                    SELECT YOUR HOUSE & REGISTER
                  </Button>
                </MovingBorder>
              </Magnetic>

              <Magnetic strength={0.3}>
                <Button
                  to="/leaderboard"
                  variant="glass"
                  size="xl"
                  icon={<Trophy size={20} />}
                  style={{
                    fontSize: '1.15rem',
                    padding: '16px 34px',
                  }}
                >
                  VIEW LIVE STANDINGS
                </Button>
              </Magnetic>
            </div>
          </div>
        </Lamp>
      </div>
    </section>
  );
}
