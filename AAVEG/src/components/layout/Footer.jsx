import React from 'react';
import { Link } from 'react-router-dom';
import { Skull, MapPin, Calendar, Shield, Trophy } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from '../common/SocialIcons';
import { navLinks, primaryCTA } from '../../data/navigation';
import collegeLogo from '../../assets/logos/college-logo.png';
import Button from '../common/Button';
import Magnetic from '../ui/Magnetic';
import ShinyText from '../ui/ShinyText';
import FloatingElements from '../ui/FloatingElements';
import GridBackground from '../ui/GridBackground';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#030405',
        borderTop: '1px solid rgba(255, 77, 0, 0.2)',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Aceternity Grid Background & Ambient Lighting */}
      <GridBackground
        pattern="cross"
        color="rgba(255, 77, 0, 0.04)"
        mask="radial"
        fadeDirection="bottom"
      />

      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '250px',
          background: 'radial-gradient(ellipse at top, rgba(255, 77, 0, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10" style={{ paddingTop: '4.5rem', paddingBottom: '3rem' }}>
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand Info */}
          <div>
            <FloatingElements duration={5} distance={4}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                <img
                  src={collegeLogo}
                  alt="Poornima College of Engineering"
                  style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
            </FloatingElements>

            <h3
              className="font-cinematic"
              style={{
                fontSize: '1.6rem',
                fontWeight: '900',
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                marginBottom: '0.5rem',
              }}
            >
              <ShinyText text="AAVEG 2026" shimmerColor="#FF8533" />
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              The Official Hostel Fest of Poornima College of Engineering. A cinematic horror celebration of
              brotherhood, sport, rivalries, and glory.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={15} style={{ color: 'var(--accent-bright)' }} />
                28th – 30th October 2026
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} style={{ color: 'var(--accent-bright)' }} />
                ISI-6, RIICO Institutional Area, Sitapura, Jaipur
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-cinematic"
              style={{
                fontSize: '1.05rem',
                color: '#FFFFFF',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                borderLeft: '3px solid var(--accent-primary)',
                paddingLeft: '10px',
              }}
            >
              NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Magnetic strength={0.15}>
                    {item.to ? (
                      <Link
                        to={item.to}
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.9rem',
                          letterSpacing: '0.05em',
                          textDecoration: 'none',
                          transition: 'color 0.25s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-bright)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>›</span>
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.9rem',
                          letterSpacing: '0.05em',
                          textDecoration: 'none',
                          transition: 'color 0.25s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-bright)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        <span style={{ color: 'var(--accent-primary)', fontSize: '0.75rem' }}>›</span>
                        {item.label}
                      </a>
                    )}
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>

          {/* House Portal & Registration Action */}
          <div>
            <h4
              className="font-cinematic"
              style={{
                fontSize: '1.05rem',
                color: '#FFFFFF',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                borderLeft: '3px solid var(--accent-primary)',
                paddingLeft: '10px',
              }}
            >
              HOUSE PORTAL
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              8 Houses clash across Sports, Esports, and Cultural arenas. Select your house to represent your fraternity.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%' }}>
              <Magnetic strength={0.15} style={{ width: '100%', display: 'block' }}>
                <Button
                  to="/houses"
                  variant="primary"
                  size="sm"
                  icon={<Shield size={15} />}
                  style={{ width: '100%', display: 'flex' }}
                >
                  SELECT YOUR HOUSE
                </Button>
              </Magnetic>

              <Magnetic strength={0.15} style={{ width: '100%', display: 'block' }}>
                <Button
                  to="/leaderboard"
                  variant="outline"
                  size="sm"
                  icon={<Trophy size={15} />}
                  style={{ width: '100%', display: 'flex' }}
                >
                  VIEW LIVE LEADERBOARD
                </Button>
              </Magnetic>
            </div>
          </div>

          {/* Connect & Socials */}
          <div>
            <h4
              className="font-cinematic"
              style={{
                fontSize: '1.05rem',
                color: '#FFFFFF',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                borderLeft: '3px solid var(--accent-primary)',
                paddingLeft: '10px',
              }}
            >
              FOLLOW THE MADNESS
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Get live event announcements, fixture schedules, and horror night updates.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem' }}>
              <Magnetic strength={0.35}>
                <a
                  href="https://instagram.com/aaveg_pce"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(255, 77, 0, 0.1)',
                    border: '1px solid rgba(255, 77, 0, 0.3)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Aaveg on Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              </Magnetic>

              <Magnetic strength={0.35}>
                <a
                  href="https://linkedin.com/school/poornima-college-of-engineering"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(255, 77, 0, 0.1)',
                    border: '1px solid rgba(255, 77, 0, 0.3)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Aaveg on LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
              </Magnetic>

              <Magnetic strength={0.35}>
                <a
                  href="https://youtube.com/@poornimacollege"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(255, 77, 0, 0.1)',
                    border: '1px solid rgba(255, 77, 0, 0.3)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Aaveg on YouTube"
                >
                  <YoutubeIcon size={18} />
                </a>
              </Magnetic>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Official Hashtag: <span style={{ color: 'var(--accent-bright)', fontWeight: '700' }}>#Aaveg2026</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Skull size={16} style={{ color: 'var(--accent-bright)' }} />
            <span>
              SOME NIGHTS{' '}
              <strong style={{ color: 'var(--accent-bright)', letterSpacing: '0.1em' }}>
                <ShinyText text="HAUNT FOREVER." shimmerColor="#FF8533" />
              </strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Designed with passion by</span>
            <strong style={{ color: '#F3EFE8' }}>Divyansh Yadav CSE, Vinay Avasthi CSR</strong>
          </div>

          <div>© {new Date().getFullYear()} Poornima College of Engineering. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}

