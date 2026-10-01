import React from 'react';

/**
 * Aceternity UI - BackgroundBeams Component
 * Laser-crisp volumetric horror beams with animated radiant glow paths.
 */
export default function BackgroundBeams({ className = '', color = '#FF3B00' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <svg
        className="absolute w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.35,
        }}
      >
        <g stroke={color} strokeWidth="1" strokeOpacity="0.3">
          {/* Diagonal Laser Beams */}
          <line x1="-100" y1="0" x2="600" y2="900" strokeDasharray="6 6" />
          <line x1="200" y1="0" x2="900" y2="900" strokeDasharray="8 8" />
          <line x1="600" y1="0" x2="1300" y2="900" strokeDasharray="10 10" />
          <line x1="1000" y1="0" x2="1700" y2="900" strokeDasharray="6 6" />
          
          <line x1="1500" y1="0" x2="800" y2="900" strokeDasharray="8 8" strokeOpacity="0.2" />
          <line x1="1100" y1="0" x2="400" y2="900" strokeDasharray="12 12" strokeOpacity="0.2" />
        </g>
        
        {/* Ambient Center Glow */}
        <circle cx="720" cy="450" r="300" fill={color} fillOpacity="0.06" filter="blur(80px)" />
      </svg>
    </div>
  );
}
