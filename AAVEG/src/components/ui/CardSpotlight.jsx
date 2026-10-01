import React, { useState, useRef } from 'react';

/**
 * Aceternity UI & React Bits - CardSpotlight Component
 * Interactive glass card with a cursor-following radial spotlight and subtle 3D perspective tilt.
 */
export default function CardSpotlight({
  children,
  className = '',
  color = '#FF4D00',
  glowRadius = 320,
  style = {},
  onClick,
  tilt = true,
}) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6; // max 6 deg
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: -1000, y: -1000 });
    if (tilt) {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`card-spotlight-root relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        position: 'relative',
        borderRadius: '16px',
        border: `1px solid ${isHovered ? `${color}77` : 'rgba(255, 255, 255, 0.08)'}`,
        background: 'rgba(12, 14, 18, 0.82)',
        backdropFilter: 'blur(16px)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isHovered
          ? `0 15px 35px rgba(0, 0, 0, 0.8), 0 0 25px ${color}33`
          : '0 8px 25px rgba(0, 0, 0, 0.6)',
        ...tiltStyle,
        ...style,
      }}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${glowRadius}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}26 0%, transparent 80%)`,
          zIndex: 1,
        }}
      />

      {/* Subtle border highlight line that tracks the cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}66 0%, transparent 100%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          borderRadius: 'inherit',
          zIndex: 2,
        }}
      />

      {/* Card Contents */}
      <div style={{ position: 'relative', zIndex: 5 }}>{children}</div>
    </div>
  );
}
