import React from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import GlassContainer from '../common/GlassContainer';
import { FESTIVAL_CONFIG } from '../../data/config';

export default function FinalCTA() {
  return (
    <section
      className="cinematic-scene section-spacer py-32 relative overflow-hidden"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
      }}
      id="register-cta"
    >
      {/* Background fiery crater glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at bottom, rgba(255, 77, 0, 0.25) 0%, rgba(201, 47, 21, 0.12) 45%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative z-10" style={{ position: 'relative', zIndex: 10 }}>
        
        <GlassContainer
          radius={24}
          className="p-12 border border-[#FF4D00]/40 max-w-4xl mx-auto shadow-[0_20px_60px_rgba(255,77,0,0.2)]"
          style={{
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: ' clamp(2rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3rem)',
            background: 'linear-gradient(180deg, rgba(20, 15, 12, 0.75) 0%, rgba(8, 8, 10, 0.92) 100%)',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: '700',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent-bright)',
              marginBottom: '1.25rem',
            }}
          >
            <Flame size={18} style={{ color: '#FF4D00' }} />
            THE GOTHIC GATES ARE UNLOCKED
          </div>

          {/* Heading */}
          <h2
            className="font-cinematic"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.6rem)',
              fontWeight: '900',
              lineHeight: '1.1',
              color: '#FFFFFF',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 30px rgba(255,77,0,0.5)',
            }}
          >
            READY TO ENTER THE <span style={{ color: 'var(--accent-primary)' }}>MADNESS?</span>
          </h2>

          <div
            className="font-cinematic"
            style={{
              fontSize: 'clamp(1.4rem, 3.2vw, 2.4rem)',
              fontWeight: '900',
              letterSpacing: '0.18em',
              color: 'var(--accent-glow)',
              marginBottom: '1.5rem',
            }}
          >
            AAVEG • 2026
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6',
              marginBottom: '2.5rem',
            }}
          >
            Seats in the arena are limited. Register your hostel, gather your crew, and take your place in Poornima history.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
            }}
          >
            <Button
              href={FESTIVAL_CONFIG.googleFormUrl}
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
              style={{
                fontSize: '1.1rem',
                padding: '16px 42px',
                boxShadow: '0 0 35px rgba(255, 77, 0, 0.65)',
              }}
            >
              REGISTER VIA GOOGLE FORM →
            </Button>

            <Button
              onClick={() => {
                const el = document.getElementById('festival-movie');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline"
              size="lg"
            >
              EXPLORE FESTIVAL SAGA
            </Button>
          </div>

          {/* Metadata Footer */}
          <div
            style={{
              marginTop: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 77, 0, 0.2)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ color: '#F3EFE8' }}>📅 28th – 30th OCTOBER 2026</span>
            <span>📍 POORNIMA COLLEGE OF ENGINEERING, JAIPUR</span>
            <span>⚡ FIVE HOSTELS • ONE CROWN</span>
          </div>
        </GlassContainer>

      </div>
    </section>

  );
}
