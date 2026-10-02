import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { navLinks, primaryCTA } from '../../data/navigation';
import Button from '../common/Button';
import SoundToggle from '../common/SoundToggle';
import MobileMenu from './MobileMenu';
import Magnetic from '../ui/Magnetic';
import ShinyText from '../ui/ShinyText';
import collegeLogo from '../../assets/logos/college-logo.png';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          backgroundColor: scrolled ? 'rgba(8, 9, 11, 0.9)' : 'transparent',
          backgroundImage: scrolled ? 'none' : 'linear-gradient(to bottom, rgba(5,5,5,0.95), rgba(5,5,5,0.6), transparent)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 77, 0, 0.25)' : '1px solid rgba(255, 77, 0, 0.1)',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.85)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Dedicated Replaceable College Logo Area */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
            title="AAVEG 2026 - Poornima College of Engineering"
          >
            <div
              style={{
                height: scrolled ? '42px' : '52px',
                maxWidth: '240px',
                display: 'flex',
                alignItems: 'center',
                transition: 'height 0.3s ease',
                position: 'relative',
              }}
            >
              {/* College Logo Image */}
              <img
                src={collegeLogo}
                alt="Poornima College of Engineering Logo"
                style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.8))',
                  transition: 'transform 0.3s ease',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentElement.querySelector('.logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />

              <div
                className="logo-fallback"
                style={{ display: 'none', flexDirection: 'column', justifyContent: 'center' }}
              >
                <span style={{
                  fontFamily: 'var(--font-cinematic)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.1em',
                }}>
                  POORNIMA
                </span>
                <span style={{
                  fontSize: '10px',
                  color: '#9ca3af',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}>
                  COLLEGE OF ENGINEERING
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links with Magnetic physics & ShinyText */}
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            {navLinks.map((item) => {
              const isActive = location.pathname === item.to;
              if (item.to) {
                return (
                  <Magnetic key={item.label} strength={0.2}>
                    <Link
                      to={item.to}
                      style={{
                        color: isActive ? '#FF5A14' : 'var(--text-secondary)',
                        letterSpacing: '0.16em',
                        fontSize: '13px',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        padding: '4px 0',
                        position: 'relative',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#FF5A14'; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                      {isActive ? (
                        <ShinyText text={item.label} shimmerColor="#FFA04D" />
                      ) : (
                        item.label
                      )}
                    </Link>
                  </Magnetic>
                );
              }
              return (
                <Magnetic key={item.label} strength={0.2}>
                  <a
                    href={item.href}
                    style={{
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.16em',
                      fontSize: '13px',
                      textDecoration: 'none',
                      display: 'inline-block',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      padding: '4px 0',
                      position: 'relative',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FF5A14'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    {item.label}
                  </a>
                </Magnetic>
              );
            })}
          </nav>

          {/* Right Area: Sound Toggle & CTA with Magnetic pull */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Magnetic strength={0.25}>
              <div>
                <SoundToggle />
              </div>
            </Magnetic>

            <div className="desktop-only">
              <Magnetic strength={0.2}>
                <Button
                  to={primaryCTA.to}
                  variant="primary"
                  size="sm"
                  icon={<Shield size={14} />}
                >
                  {primaryCTA.label}
                </Button>
              </Magnetic>
            </div>

            {/* Mobile Menu Trigger with Magnetic feel */}
            <div className="mobile-only">
              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    borderRadius: '8px',
                    background: 'rgba(255, 77, 0, 0.15)',
                    border: '1px solid rgba(255, 77, 0, 0.35)',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                  id="mobile-menu-toggle"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </Magnetic>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPath={location.pathname}
      />
    </>
  );
}
