import React from 'react';

/**
 * Aceternity UI - MovingBorder Component
 * Renders an animated luminous gradient beam traveling along the border of buttons or containers.
 */
export default function MovingBorder({
  children,
  duration = 3500,
  className = '',
  as: Component = 'div',
  containerClassName = '',
  color = '#FF4D00',
  borderRadius = '30px',
  style = {},
  ...props
}) {
  return (
    <Component
      className={`relative p-[1px] overflow-hidden ${containerClassName}`}
      style={{
        position: 'relative',
        padding: '1.5px',
        overflow: 'hidden',
        borderRadius: borderRadius,
        background: 'transparent',
        ...style,
      }}
      {...props}
    >
      {/* Animated Conic Gradient Traveling Beam */}
      <div
        className="moving-border-beam absolute inset-0"
        style={{
          position: 'absolute',
          inset: '-100%',
          width: '300%',
          height: '300%',
          top: '-100%',
          left: '-100%',
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, ${color} 88%, #FFE680 94%, ${color} 100%)`,
          animation: `spinBorder ${duration}ms linear infinite`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Inner Children Layer */}
      <div
        className={`relative z-10 ${className}`}
        style={{
          position: 'relative',
          zIndex: 10,
          borderRadius: 'inherit',
        }}
      >
        {children}
      </div>
    </Component>
  );
}
