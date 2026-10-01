import React from 'react';

/**
 * React Bits - ShinyText Component
 * Creates an animated metallic/fiery shimmering text reflection sweep across text.
 */
export default function ShinyText({
  children,
  disabled = false,
  speed = 4,
  className = '',
  color = '#FFFFFF',
  shimmerColor = '#FF8A3D',
  style = {},
}) {
  return (
    <span
      className={`shiny-text inline-block ${className}`}
      style={{
        display: 'inline-block',
        color: disabled ? color : 'transparent',
        backgroundImage: disabled
          ? 'none'
          : `linear-gradient(120deg, ${color} 0%, ${color} 35%, ${shimmerColor} 50%, #FFFFFF 55%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: disabled ? 'unset' : 'text',
        backgroundClip: disabled ? 'unset' : 'text',
        animation: disabled ? 'none' : `shimmerSweep ${speed}s linear infinite`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
