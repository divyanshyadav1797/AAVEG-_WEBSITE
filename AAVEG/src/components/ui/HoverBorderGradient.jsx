import React, { useState, useEffect } from 'react';

/**
 * Aceternity UI - HoverBorderGradient Component
 * Creates an interactive border with an animated rotating radial/conic gradient glow.
 */
export default function HoverBorderGradient({
  children,
  containerClassName = '',
  className = '',
  as: Tag = 'button',
  duration = 1.2,
  clockwise = true,
  color = '#FF4D00',
  borderRadius = '24px',
  style = {},
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState('TOP');

  const rotateDirection = (currentDirection) => {
    const directions = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const index = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (index - 1 + directions.length) % directions.length
      : (index + 1) % directions.length;
    return directions[nextIndex];
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  const movingMap = {
    TOP: 'radial-gradient(40% 60% at 50% 0%, #FFFFFF 0%, rgba(255, 77, 0, 0.6) 50%, transparent 100%)',
    LEFT: 'radial-gradient(35% 55% at 0% 50%, #FFFFFF 0%, rgba(255, 77, 0, 0.6) 50%, transparent 100%)',
    BOTTOM: 'radial-gradient(40% 60% at 50% 100%, #FFFFFF 0%, rgba(255, 77, 0, 0.6) 50%, transparent 100%)',
    RIGHT: 'radial-gradient(35% 55% at 100% 50%, #FFFFFF 0%, rgba(255, 77, 0, 0.6) 50%, transparent 100%)',
  };

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center p-[1px] overflow-hidden transition-all duration-300 ${containerClassName}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5px',
        overflow: 'hidden',
        borderRadius,
        background: 'rgba(255, 255, 255, 0.08)',
        border: 'none',
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      {/* Animated glowing border layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: movingMap[direction],
          filter: 'blur(3px)',
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Internal Content container */}
      <div
        className={`relative z-10 w-full h-full ${className}`}
        style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: `calc(${borderRadius} - 1.5px)`,
          background: '#0D0E12',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </Tag>
  );
}
