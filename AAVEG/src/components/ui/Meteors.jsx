import React from 'react';

/**
 * Aceternity UI - Meteors Component
 * Produces falling fire embers / diagonal meteor streaks across dark backgrounds.
 */
export default function Meteors({ number = 20, color = '#FF4D00' }) {
  const meteors = new Array(number).fill(true);

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
      {meteors.map((_, idx) => {
        const left = Math.floor(Math.random() * 100);
        const delay = (Math.random() * 5).toFixed(2);
        const duration = (Math.random() * 4 + 3).toFixed(2);
        const size = Math.floor(Math.random() * 2) + 1;

        return (
          <span
            key={'meteor' + idx}
            className="meteor-item absolute"
            style={{
              position: 'absolute',
              top: '-10px',
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: `0 0 0 1px ${color}10, 0 0 10px 1px ${color}`,
              transform: 'rotate(215deg)',
              animation: `meteorFall ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            {/* Meteor Tail */}
            <span
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '65px',
                height: '1px',
                background: `linear-gradient(90deg, ${color}, transparent)`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
