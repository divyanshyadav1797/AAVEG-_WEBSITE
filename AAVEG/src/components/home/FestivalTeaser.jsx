import React, { useRef, useState } from 'react';
import { Play, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
import GlassContainer from '../common/GlassContainer';
import Button from '../common/Button';
import SectionTitle from '../common/SectionTitle';

export default function FestivalTeaser({ isModalOpen, onToggleModal }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <>
      <section
        className="cinematic-scene section-spacer py-24 relative overflow-hidden"
        style={{
          paddingTop: '6rem',
          paddingBottom: '6rem',
          position: 'relative',
          zIndex: 10,
        }}
        id="teaser"
      >
        <div className="container">
          <SectionTitle
            tagline="CINEMATIC GLIMPSE"
            title="YOU'VE SEEN THE NIGHT. NOW ENTER IT."
            highlightWord="ENTER"
            subtitle="Catch the pulse of AAVEG. Four days of unbridled youth, gothic lights, and unforgettable nights."
          />

          {/* 16:9 Cinematic Video Display with Liquid Glass Rim */}
          <div
            style={{
              position: 'relative',
              maxWidth: '1000px',
              margin: '2rem auto 0',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 77, 0, 0.25)',
              border: '1.5px solid rgba(255, 77, 0, 0.35)',
              background: '#050505',
            }}
          >
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.1) brightness(0.9)',
                }}
              >
                <source src="/assets/videos/teaser.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Dark Gradient Overlay for Theater Feel */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, transparent 40%, rgba(5,5,5,0.7) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Center Play / Pause Big Button Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <button
                  type="button"
                  onClick={togglePlay}
                  className="interactive-cursor group"
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    background: 'rgba(255, 77, 0, 0.28)',
                    border: '2px solid rgba(255, 120, 40, 0.8)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 35px rgba(255, 77, 0, 0.6), inset 0 0 15px rgba(255, 77, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    transition: 'all 0.3s ease',
                  }}
                  title={isPlaying ? 'Pause Preview' : 'Play Preview'}
                  aria-label="Play or pause teaser preview"
                >
                  {isPlaying ? (
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>❚❚</span>
                  ) : (
                    <Play size={28} style={{ fill: '#FFF', marginLeft: '4px' }} />
                  )}
                </button>
              </div>

              {/* Bottom Video Controls Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 2,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#FF3B00',
                      boxShadow: '0 0 10px #FF3B00',
                      animation: 'pumpkinFlicker 1.5s infinite',
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.15em', color: '#F3EFE8', textTransform: 'uppercase' }}>
                    OFFICIAL TEASER • AAVEG 2026
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={toggleMute}
                    style={{
                      padding: '8px',
                      borderRadius: '50%',
                      background: 'rgba(10, 10, 10, 0.7)',
                      border: '1px solid rgba(255, 77, 0, 0.3)',
                      color: '#FFF',
                      cursor: 'pointer',
                    }}
                    title={isMuted ? 'Unmute' : 'Mute'}
                    aria-label="Toggle mute"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <button
                    type="button"
                    onClick={onToggleModal}
                    style={{
                      padding: '8px',
                      borderRadius: '50%',
                      background: 'rgba(10, 10, 10, 0.7)',
                      border: '1px solid rgba(255, 77, 0, 0.3)',
                      color: '#FFF',
                      cursor: 'pointer',
                    }}
                    title="Fullscreen Mode"
                    aria-label="Open fullscreen teaser"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trigger button */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Button
              onClick={onToggleModal}
              variant="outline"
              size="lg"
              icon={<Play size={16} style={{ fill: 'currentColor' }} />}
            >
              WATCH IN CINEMA MODE
            </Button>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal Overlay */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(3, 4, 5, 0.96)',
            backdropFilter: 'blur(25px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          className="teaser-cinema-modal"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onToggleModal}
            style={{
              position: 'absolute',
              top: '24px',
              right: '28px',
              padding: '12px',
              borderRadius: '50%',
              background: 'rgba(255, 77, 0, 0.2)',
              border: '1px solid rgba(255, 77, 0, 0.5)',
              color: '#FFFFFF',
              cursor: 'pointer',
              zIndex: 10,
            }}
            aria-label="Close cinema modal"
          >
            <X size={26} />
          </button>

          <div
            style={{
              width: '100%',
              maxWidth: '1100px',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 0 100px rgba(255, 77, 0, 0.4)',
              border: '2px solid rgba(255, 77, 0, 0.5)',
            }}
          >
            <video
              controls
              autoPlay
              style={{
                width: '100%',
                maxHeight: '80vh',
                display: 'block',
                background: '#000',
              }}
            >
              <source src="/assets/videos/teaser.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-cinematic)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontSize: '1rem',
            }}
          >
            AAVEG 2026 • 20–23 OCTOBER • POORNIMA COLLEGE OF ENGINEERING
          </div>
        </div>
      )}
    </>
  );
}
