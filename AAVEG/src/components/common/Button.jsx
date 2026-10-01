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
          background: 'linear-gradient(135deg, #FF4D00 0%, #E62E00 60%, #9E1A00 100%)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 120, 40, 0.6)',
          boxShadow: '0 4px 20px rgba(255, 77, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        };
      case 'outline':
        return {
          background: 'rgba(18, 20, 22, 0.6)',
          color: '#F3EFE8',
          border: '1px solid rgba(255, 77, 0, 0.45)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(255, 77, 0, 0.1)',
        };
      case 'glass':
        return {
          background: 'rgba(25, 28, 32, 0.55)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.18)',
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
        return { padding: '8px 18px', fontSize: '0.85rem' };
      case 'lg':
        return { padding: '16px 36px', fontSize: '1.05rem', letterSpacing: '0.12em' };
      case 'md':
      default:
        return { padding: '12px 26px', fontSize: '0.95rem' };
    }
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: 'var(--font-sans)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    borderRadius: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    textDecoration: 'none',
    ...getVariantStyles(),
    ...getSizeStyles(),
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
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
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)',
          transform: 'skewX(-20deg)',
          transition: 'all 0.6s ease',
          pointerEvents: 'none',
        }}
      />
    </>
  );

  const hoverStyle = `
    .aaveg-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 77, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.4);
      border-color: rgba(255, 90, 20, 0.9);
    }
    .aaveg-btn:hover .btn-shimmer {
      left: 200%;
    }
    .aaveg-btn:active {
      transform: translateY(1px);
    }
  `;

  if (to) {
    return (
      <>
        <style>{hoverStyle}</style>
        <Link
          to={to}
          className={`aaveg-btn interactive-cursor ${className}`}
          style={baseStyles}
          onClick={handleClick}
          {...props}
        >
          {content}
        </Link>
      </>
    );
  }

  if (href) {
    return (
      <>
        <style>{hoverStyle}</style>
        <a
          href={href}
          className={`aaveg-btn interactive-cursor ${className}`}
          style={baseStyles}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {content}
        </a>
      </>
    );
  }

  return (
    <>
      <style>{hoverStyle}</style>
      <button
        type="button"
        disabled={disabled}
        className={`aaveg-btn interactive-cursor ${className}`}
        style={baseStyles}
        onClick={handleClick}
        {...props}
      >
        {content}
      </button>
    </>
  );
}
