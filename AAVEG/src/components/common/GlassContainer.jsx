import React from 'react';

/**
 * Lightweight, GPU-accelerated liquid glass panel
 */
export default function GlassContainer({
  children,
  className = '',
  style = {},
  glow = false,
  ...props
}) {
  return (
    <div
      className={`liquid-glass-panel ${glow ? 'panel-glow' : ''} ${className}`}
      style={{
        background: 'rgba(12, 14, 17, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 77, 0, 0.22)',
        borderRadius: '16px',
        boxShadow: glow
          ? '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 59, 0, 0.2)'
          : '0 12px 35px rgba(0, 0, 0, 0.75)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
