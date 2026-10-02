import React from 'react';

/**
 * GlitchText Component
 * Text glitch animation removed as requested for crisp, distraction-free legibility.
 * Preserves class names, inline styles, and children/text props.
 */
export default function GlitchText({
  text,
  children,
  className = '',
  style = {},
  // Unused animation props retained for API backwards compatibility
  speed: _speed,
  maxIterations: _maxIterations,
  characters: _characters,
  triggerOnHover: _triggerOnHover,
  ...props
}) {
  const content = text !== undefined ? text : children;

  return (
    <span
      className={`glitch-text-element inline-block ${className}`}
      style={{
        display: 'inline-block',
        ...style,
      }}
      {...props}
    >
      {content}
    </span>
  );
}

