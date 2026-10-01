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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-out ${
          scrolled
            ? 'py-3 bg-[#08090B]/90 backdrop-blur-md border-b border-[#FF4D00]/25 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
            : 'py-5 bg-gradient-to-b from-[#050505]/95 via-[#050505]/60 to-transparent border-b border-[#FF4D00]/10'
        }`}
        style={{
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="container flex-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Dedicated Replaceable College Logo Area */}
          <Link
            to="/"
            className="flex items-center gap-3 group interactive-cursor"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
            title="AAVEG 2026 - Poornima College of Engineering"
          >
            <div
              className="logo-wrapper relative"
              style={{
                height: scrolled ? '42px' : '52px',
                maxWidth: '240px',
                display: 'flex',
                alignItems: 'center',
                transition: 'height 0.3s ease',
              }}
            >
              {/* College Logo Image */}
              <img
                src={collegeLogo}
                alt="Poornima College of Engineering Logo"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.8))',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentElement.querySelector('.logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              
              <div
                className="logo-fallback hidden flex-col justify-center"
                style={{ display: 'none' }}
              >
                <span className="font-cinematic text-sm font-bold text-white tracking-wider">
                  POORNIMA
                </span>
                <span className="text-[10px] text-gray-400 tracking-widest uppercase">
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
                      className="interactive-cursor relative py-1 text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 hover:text-[#FF5A14]"
                      style={{
                        color: isActive ? '#FF5A14' : 'var(--text-secondary)',
                        letterSpacing: '0.16em',
                        fontSize: '13px',
                        textDecoration: 'none',
                        display: 'inline-block',
                      }}
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
                    className="interactive-cursor relative py-1 text-[13px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 hover:text-[#FF5A14]"
                    style={{
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.16em',
                      fontSize: '13px',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
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

            <div className="desktop-only" style={{ display: 'block' }}>
              <Magnetic strength={0.2}>
                <div>
                  <Button
                    to={primaryCTA.to}
                    variant="primary"
                    size="sm"
                    icon={<Shield size={14} />}
                    className="shadow-[0_0_20px_rgba(255,77,0,0.4)]"
                  >
                    {primaryCTA.label}
                  </Button>
                </div>
              </Magnetic>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="interactive-cursor md:hidden flex-center p-2 rounded-lg text-white"
              style={{
                display: 'none',
                background: 'rgba(255, 77, 0, 0.15)',
                border: '1px solid rgba(255, 77, 0, 0.35)',
                color: '#FFFFFF',
              }}
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
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
