import React from 'react';

export default function Pumpkin({ pumpkinRef, style = {} }) {
  return (
    <div
      ref={pumpkinRef}
      className="hero-pumpkin-wrapper"
      style={{
        position: 'absolute',
        bottom: '8%',
        left: '6%',
        width: 'clamp(140px, 16vw, 240px)',
        zIndex: 10,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Pumpkin Ground Shadow & Ember Pool */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12px',
          left: '10%',
          width: '80%',
          height: '24px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(255, 90, 0, 0.4) 0%, rgba(0, 0, 0, 0.85) 60%, transparent 80%)',
          filter: 'blur(8px)',
        }}
      />

      {/* SVG Jack-o'-Lantern */}
      <svg
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: 'auto',
          animation: 'pumpkinFlicker 3.5s ease-in-out infinite alternate',
          transformOrigin: 'bottom center',
        }}
      >
        {/* Pumpkin Stem */}
        <path
          d="M 98 42 C 95 25, 105 12, 118 6 C 114 12, 110 24, 106 42 Z"
          fill="#3B4F26"
          stroke="#1F2E12"
          strokeWidth="2"
        />

        {/* Outer Pumpkin Lobes (Dark Burnt Orange with Creepy Ridges) */}
        <g id="pumpkin-body">
          {/* Back Lobes */}
          <ellipse cx="65" cy="100" rx="35" ry="58" fill="#7A2202" />
          <ellipse cx="135" cy="100" rx="35" ry="58" fill="#7A2202" />
          {/* Mid Lobes */}
          <ellipse cx="78" cy="105" rx="32" ry="60" fill="#B83A00" />
          <ellipse cx="122" cy="105" rx="32" ry="60" fill="#B83A00" />
          {/* Front Center Lobes */}
          <ellipse cx="100" cy="108" rx="38" ry="62" fill="#D64800" />
          
          {/* Top highlight gradient */}
          <ellipse cx="100" cy="80" rx="32" ry="30" fill="url(#pumpkin-top-light)" opacity="0.35" />
        </g>

        {/* Sinister Carved Face with Inner Flame Glow */}
        <g id="carved-face">
          {/* Left Eye */}
          <polygon
            points="65,85 82,98 62,105"
            fill="#FFE066"
            style={{
              filter: 'drop-shadow(0 0 8px #FF4D00)',
            }}
          />
          {/* Right Eye */}
          <polygon
            points="135,85 118,98 138,105"
            fill="#FFE066"
            style={{
              filter: 'drop-shadow(0 0 8px #FF4D00)',
            }}
          />

          {/* Triangular Nose */}
          <polygon
            points="100,105 92,118 108,118"
            fill="#FFE066"
            style={{
              filter: 'drop-shadow(0 0 6px #FF4D00)',
            }}
          />

          {/* Wicked Jagged Carved Mouth */}
          <path
            d="M 52 135 
               L 65 145 L 75 138 L 85 148 L 100 138 L 115 148 L 125 138 L 135 145 L 148 135 
               L 140 152 L 130 158 L 118 152 L 100 162 L 82 152 L 70 158 L 60 152 Z"
            fill="#FFE680"
            style={{
              filter: 'drop-shadow(0 0 12px #FF3B00) drop-shadow(0 0 20px #FF8800)',
            }}
          />

          {/* Inner Tooth Highlights */}
          <polygon points="76,138 84,148 76,148" fill="#140602" />
          <polygon points="124,138 116,148 124,148" fill="#140602" />
          <polygon points="96,155 100,146 104,155" fill="#140602" />
        </g>

        <defs>
          <radialGradient id="pumpkin-top-light" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FFA04D" />
            <stop offset="100%" stopColor="#B83A00" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
