import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Shield } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from '../common/SocialIcons';
import { navLinks, primaryCTA } from '../../data/navigation';
import Button from '../common/Button';

export default function MobileMenu({ isOpen, onClose, currentPath }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 5, 5, 0.98)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2rem 1.5rem',
        overflowY: 'auto',
      }}
      className="mobile-menu-drawer"
    >
      {/* Top Bar inside Menu */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 77, 0, 0.2)',
          paddingBottom: '1.25rem',
        }}
      >
        <div>
          <span
            className="font-cinematic"
            style={{ fontSize: '1.25rem', fontWeight: '900', color: '#FFFFFF', letterSpacing: '0.1em' }}
          >
            AAVEG <span style={{ color: 'var(--accent-bright)' }}>2026</span>
          </span>
          <div
            style={{
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Poornima College of Engineering
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '8px',
            borderRadius: '50%',
            background: 'rgba(255, 77, 0, 0.15)',
            border: '1px solid rgba(255, 77, 0, 0.4)',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      {/* Nav Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '2.5rem 0' }}>
        {navLinks.map((item) => {
          if (item.to) {
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  color: currentPath === item.to ? '#FF5A14' : 'var(--text-primary)',
                  fontFamily: 'var(--font-cinematic)',
                  fontSize: '1.35rem',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <span>{item.label}</span>
                <ArrowRight size={18} style={{ opacity: 0.5, color: '#FF4D00' }} />
              </Link>
            );
          }
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-cinematic)',
                fontSize: '1.35rem',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <span>{item.label}</span>
              <ArrowRight size={18} style={{ opacity: 0.5, color: '#FF4D00' }} />
            </a>
          );
        })}
      </nav>

      {/* Primary Mobile CTA & Socials */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Button
          to={primaryCTA.to}
          variant="primary"
          size="lg"
          onClick={onClose}
          icon={<Shield size={18} />}
          style={{ width: '100%' }}
        >
          {primaryCTA.label}
        </Button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 77, 0, 0.15)',
          }}
        >
          <a
            href="https://instagram.com/aaveg_pce"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)' }}
          >
            <InstagramIcon size={20} />
          </a>
          <a
            href="https://linkedin.com/school/poornima-college-of-engineering"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)' }}
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="https://youtube.com/@poornimacollege"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)' }}
          >
            <YoutubeIcon size={20} />
          </a>
        </div>

        <div
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
          }}
        >
          HOSTELS. FRIENDS. FOREVER. • #Aaveg2026
        </div>
      </div>
    </div>
  );
}
