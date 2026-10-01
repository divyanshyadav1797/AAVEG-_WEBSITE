import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import GlassContainer from '../common/GlassContainer';

export default function FeatureCard({
  title,
  subtitle,
  image,
  to,
  href,
  tag,
  badgeColor = '#FF4D00',
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const targetLink = href || to || '#';
  const isExternal = targetLink.startsWith('http');

  return (
    <a
      ref={cardRef}
      href={targetLink}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="feature-film-card group relative block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        textDecoration: 'none',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
        display: 'block',
      }}
    >
      <GlassContainer
        className="h-full overflow-hidden border border-[#FF4D00]/25 group-hover:border-[#FF5A14]/70 transition-colors"
        style={{
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
        }}
      >
        {/* Background Film Image with Dark Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: '16px',
            zIndex: 0,
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.65) contrast(1.15)',
            }}
          />
          {/* Gothic Dark & Blood Orange Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(5,5,5,0.2) 0%, rgba(8,9,11,0.7) 50%, rgba(5,5,5,0.95) 100%)',
            }}
          />
        </div>

        {/* Top Tag / Pill */}
        {tag && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 2,
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              background: 'rgba(10, 12, 14, 0.75)',
              border: `1px solid ${badgeColor}`,
              boxShadow: `0 0 10px ${badgeColor}33`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {tag}
          </div>
        )}

        {/* Card Content Footer */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <h3
              className="font-cinematic"
              style={{
                fontSize: '1.45rem',
                fontWeight: '900',
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '4px',
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                transition: 'color 0.3s ease',
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.4',
                maxWidth: '260px',
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Action Circle Arrow */}
          <div
            style={{
              width: '42px',
              height: '42px',
              minWidth: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 77, 0, 0.15)',
              border: '1px solid rgba(255, 77, 0, 0.45)',
              color: '#FFFFFF',
              boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease, background 0.3s ease',
            }}
          >
            <ArrowUpRight size={20} />
          </div>
        </div>
      </GlassContainer>
    </a>
  );
}
