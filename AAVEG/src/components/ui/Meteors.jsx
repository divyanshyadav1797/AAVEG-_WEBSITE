import React, { useMemo } from 'react';

/**
 * Aceternity UI - Meteors Component
 * Produces falling fire embers / diagonal meteor streaks across dark backgrounds.
 * Optimized with useMemo and hardware-accelerated transforms.
 */
export default function Meteors({ number = 16, color = '#FF4D00' }) {
  const meteorItems = useMemo(() => {
    return Array.from({ length: number }).map((_, idx) => ({
      id: `meteor-${idx}`,
      left: Math.floor(Math.random() * 100),
      delay: (Math.random() * 5).toFixed(2),
      duration: (Math.random() * 4 + 3).toFixed(2),
      size: Math.floor(Math.random() * 2) + 1,
    }));
  }, [number]);

  return (
    <div
      className="meteors-container pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {meteorItems.map((item) => (
        <span
          key={item.id}
          className="meteor-item absolute"
          style={{
            position: 'absolute',
            top: '-10px',
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 0 1px ${color}10, 0 0 10px 1px ${color}`,
            transform: 'rotate(215deg)',
            animation: `meteorFall ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
            willChange: 'transform',
          }}
        >
          {/* Meteor Tail */}
          <span
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '60px',
              height: '1px',
              background: `linear-gradient(90deg, ${color}, transparent)`,
            }}
          />
        </span>
      ))}
    </div>
  );
}

