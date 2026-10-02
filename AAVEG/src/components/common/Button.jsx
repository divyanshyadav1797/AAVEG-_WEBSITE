import React from 'react';
import { Link } from 'react-router-dom';
import { playGothicChime } from '../../utils/sound';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = null,
  disabled = false,
  style: customStyle = {},
  ...props
}) {
  const handleClick = (e) => {
    playGothicChime();
    if (onClick) onClick(e);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #FF4D00 0%, #D83B01 50%, #9E1A00 100%)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 120, 40, 0.7)',
          boxShadow: '0 4px 20px rgba(255, 77, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        };
      case 'outline':
        return {
          background: 'rgba(18, 20, 24, 0.8)',
          color: '#F3EFE8',
          border: '1px solid rgba(255, 77, 0, 0.45)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(255, 77, 0, 0.1)',
        };
      case 'glass':
        return {
          background: 'rgba(25, 28, 32, 0.65)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        };
      case 'danger':
        return {
          background: 'linear-gradient(135deg, #C92F15 0%, #851403 100%)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 50, 20, 0.5)',
          boxShadow: '0 4px 20px rgba(201, 47, 21, 0.5)',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '9px 18px', fontSize: '0.82rem', letterSpacing: '0.08em' };
      case 'lg':
        return { padding: '16px 36px', fontSize: '1.05rem', letterSpacing: '0.12em' };
      case 'md':
      default:
        return { padding: '12px 24px', fontSize: '0.92rem', letterSpacing: '0.09em' };
    }
  };

  const mergedStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-sans)',
    fontWeight: '700',
    textTransform: 'uppercase',
    borderRadius: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...customStyle,
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {icon && <span className="btn-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
        <span>{children}</span>
      </span>
      {/* Glow shimmer on hover */}
      <span
        className="btn-shimmer"
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent)',
          transform: 'skewX(-20deg)',
          transition: 'all 0.6s ease',
          pointerEvents: 'none',
        }}
      />
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`aaveg-btn interactive-cursor ${className}`}
        style={mergedStyles}
        onClick={handleClick}
        {...props}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={`aaveg-btn interactive-cursor ${className}`}
        style={mergedStyles}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`aaveg-btn interactive-cursor ${className}`}
      style={mergedStyles}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
}
