import React from 'react';

/**
 * Luminous Realistic White Full Moon
 *
 * Designed with:
 * 1. Radiant Silvery-White Core: Brilliant #FFFFFF core with soft pearlescent
 *    shading that pops intensely against the midnight sky without blending in.
 * 2. Multi-Tier Moonlight Glow & Optical Halo: Clean, crisp edge with multi-layered
 *    lunar white/ice-blue bloom and ethereal volumetric crepuscular rays.
 * 3. High-Definition Photorealistic Lunar Maria & Craters:
 *    - Delicate silver-slate basalt maria (Oceanus Procellarum, Mare Imbrium,
 *      Mare Serenitatis, Mare Tranquillitatis, Mare Crisium).
 *    - Tycho impact crater with brilliant white starburst ejecta rays.
 *    - Copernicus and Kepler impact ray systems.
 * 4. Subtle atmospheric shredded clouds drifting across for depth.
 */
export default function Moon({ moonRef, style = {} }) {
  return (
    <div
      ref={moonRef}
      className="hero-layer-moon"
      style={{
        position: 'absolute',
        top: 'clamp(15px, 4vh, 55px)',
        right: 'clamp(20px, 7vw, 130px)',
        width: 'clamp(160px, 19vw, 275px)',
        height: 'clamp(160px, 19vw, 275px)',
        borderRadius: '50%',
        zIndex: 3,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* =================================================================== */}
      {/* 1. DEEP OUTER CELESTIAL MOONLIGHT ATMOSPHERIC HAZE                  */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: '-90%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240, 248, 255, 0.42) 0%, rgba(200, 225, 255, 0.24) 30%, rgba(130, 165, 220, 0.12) 55%, transparent 72%)',
          animation: 'moonGlow 6s ease-in-out infinite alternate',
          filter: 'blur(26px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* =================================================================== */}
      {/* 2. SECONDARY RADIANT SILVERY-WHITE CORONA                           */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: '-35%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.65) 0%, rgba(225, 240, 255, 0.4) 40%, rgba(175, 205, 245, 0.18) 65%, transparent 78%)',
          filter: 'blur(14px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* =================================================================== */}
      {/* 3. OPTICAL 22-DEGREE ICE-CRYSTAL LUNAR HALO RING                    */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: '-26%',
          borderRadius: '50%',
          border: '1.5px solid rgba(225, 240, 255, 0.32)',
          boxShadow: '0 0 18px rgba(200, 225, 255, 0.28), inset 0 0 12px rgba(225, 240, 255, 0.18)',
          filter: 'blur(2.5px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* =================================================================== */}
      {/* 4. ETHEREAL VOLUMETRIC CREPUSCULAR GOD RAYS (Moonlight Shafts)      */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: '-60%',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(245, 250, 255, 0.22) 15deg, transparent 32deg, rgba(220, 238, 255, 0.25) 55deg, transparent 80deg, rgba(240, 248, 255, 0.2) 115deg, transparent 140deg, rgba(225, 242, 255, 0.24) 180deg, transparent 210deg, rgba(240, 248, 255, 0.2) 250deg, transparent 280deg, rgba(220, 238, 255, 0.22) 315deg, transparent 345deg)',
          animation: 'moonRaySpin 65s linear infinite',
          filter: 'blur(10px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* =================================================================== */}
      {/* 5. LUMINOUS BRILLIANT WHITE FULL MOON (Crisp Contrast & Pure Glow)  */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 42% 38%, #FFFFFF 0%, #FFFFFF 42%, #F8FAFD 65%, #ECF3FC 82%, #D5E3F5 94%, #B8CCE4 100%)',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.95), 0 0 25px rgba(255, 255, 255, 1), 0 0 55px rgba(220, 240, 255, 0.85), 0 0 100px rgba(180, 215, 255, 0.5), 0 0 160px rgba(140, 190, 255, 0.3), inset -8px -8px 20px rgba(140, 165, 200, 0.3), inset 6px 6px 14px rgba(255, 255, 255, 1)',
          overflow: 'hidden',
        }}
      >
        {/* Photorealistic High-Definition Lunar Topography SVG */}
        <svg
          viewBox="0 0 200 200"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.34,
            mixBlendMode: 'multiply',
          }}
        >
          <defs>
            <filter id="whiteMoonMariaBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
            <filter id="whiteMoonDeepMariaBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>

          {/* =============================================================== */}
          {/* LUNAR MARIA: Layered Volumetric Basalt Plains                   */}
          {/* =============================================================== */}
          {/* Oceanus Procellarum (Ocean of Storms - western plain) */}
          <path
            d="M 38 42 C 48 30, 72 28, 88 38 C 98 44, 105 60, 95 78 C 88 92, 70 102, 54 98 C 36 94, 28 78, 30 60 C 32 48, 34 44, 38 42 Z"
            fill="#546175"
            filter="url(#whiteMoonDeepMariaBlur)"
          />

          {/* Mare Imbrium (Sea of Rains - circular impact basin) */}
          <path
            d="M 68 45 C 85 36, 108 42, 114 58 C 118 72, 106 88, 92 92 C 76 96, 60 88, 58 72 C 56 60, 62 48, 68 45 Z"
            fill="#4F5B6E"
            filter="url(#whiteMoonMariaBlur)"
          />

          {/* Sinus Iridum (Bay of Rainbows notch with Montes Jura mountain curve) */}
          <path
            d="M 60 48 C 65 42, 74 44, 76 50 C 72 54, 64 52, 60 48 Z"
            fill="#434E5F"
            filter="url(#whiteMoonMariaBlur)"
          />

          {/* Mare Serenitatis */}
          <path
            d="M 112 58 C 126 52, 142 60, 144 74 C 146 86, 134 96, 120 94 C 108 92, 104 80, 106 68 C 108 62, 110 59, 112 58 Z"
            fill="#4E5A6C"
            filter="url(#whiteMoonMariaBlur)"
          />

          {/* Mare Tranquillitatis */}
          <path
            d="M 125 82 C 144 78, 160 88, 162 102 C 164 116, 148 126, 132 124 C 118 122, 114 110, 116 98 C 118 88, 122 84, 125 82 Z"
            fill="#4A5668"
            filter="url(#whiteMoonDeepMariaBlur)"
          />

          {/* Mare Crisium (Foreshortened 3D oval on eastern limb) */}
          <ellipse cx="166" cy="74" rx="14" ry="10" fill="#445062" filter="url(#whiteMoonMariaBlur)" transform="rotate(-18 166 74)" />
          <ellipse cx="166" cy="74" rx="15" ry="11" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.6" transform="rotate(-18 166 74)" />

          {/* Mare Fecunditatis & Mare Nectaris */}
          <path
            d="M 140 120 C 158 118, 172 130, 170 144 C 168 156, 150 164, 136 158 C 124 152, 126 138, 132 128 C 135 122, 138 121, 140 120 Z"
            fill="#525F72"
            filter="url(#whiteMoonMariaBlur)"
          />

          {/* Mare Nubium & Mare Humorum */}
          <path
            d="M 68 116 C 88 112, 102 126, 100 140 C 98 152, 82 160, 68 156 C 54 152, 52 136, 58 126 C 62 118, 65 117, 68 116 Z"
            fill="#505D70"
            filter="url(#whiteMoonDeepMariaBlur)"
          />
          <ellipse cx="46" cy="138" rx="9" ry="7" fill="#4C586B" filter="url(#whiteMoonMariaBlur)" transform="rotate(12 46 138)" />

          {/* =============================================================== */}
          {/* 3D LUNAR MOUNTAIN RANGES: Montes Apenninus & Caucasus Ridges     */}
          {/* =============================================================== */}
          <g opacity="0.8">
            {/* Montes Apenninus (Curving mountain wall bordering Mare Imbrium) */}
            <path
              d="M 85 58 Q 94 68 98 78 Q 102 88 108 95"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeDasharray="2 1.5 3 2"
            />
            <path
              d="M 86 59 Q 95 69 99 79 Q 103 89 109 96"
              fill="none"
              stroke="#2C3542"
              strokeWidth="0.9"
            />
            {/* Montes Caucasus (Northern ridge) */}
            <path
              d="M 98 52 Q 106 46 112 40"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.1"
              strokeDasharray="2 1"
            />
          </g>

          {/* =============================================================== */}
          {/* 3D CRATERS: Elevated Rims, Shadow Basins & Central Peaks        */}
          {/* =============================================================== */}
          {/* Tycho Impact: 3D Relief Basin, Central Peak & Radiant Ejecta Rays */}
          <g id="crater-tycho-3d">
            {/* Geodesic Ejecta Ray Streamers wrapping around sphere */}
            <line x1="102" y1="166" x2="35" y2="105" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.8" />
            <line x1="102" y1="166" x2="22" y2="128" stroke="#FFFFFF" strokeWidth="1.1" opacity="0.65" />
            <line x1="102" y1="166" x2="60" y2="80" stroke="#FFFFFF" strokeWidth="1.3" opacity="0.75" />
            <line x1="102" y1="166" x2="95" y2="70" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
            <line x1="102" y1="166" x2="135" y2="85" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
            <line x1="102" y1="166" x2="165" y2="115" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.8" />
            <line x1="102" y1="166" x2="180" y2="148" stroke="#FFFFFF" strokeWidth="1.1" opacity="0.65" />
            <line x1="102" y1="166" x2="70" y2="192" stroke="#FFFFFF" strokeWidth="1.3" opacity="0.7" />
            <line x1="102" y1="166" x2="130" y2="194" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.65" />

            {/* Tycho Raised Outer Rim & Basin */}
            <circle cx="102" cy="166" r="5.4" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.95" />
            <circle cx="102" cy="166" r="4.2" fill="#384355" />
            <ellipse cx="103" cy="167" rx="3.2" ry="2.6" fill="#263040" />
            {/* Tycho Central Mountain Peak (Specular White) */}
            <circle cx="101.8" cy="165.8" r="1.3" fill="#FFFFFF" />
          </g>

          {/* Copernicus Impact: Terraced 3D Rims & Starburst Network */}
          <g id="crater-copernicus-3d">
            <path
              d="M 68 94 L 54 80 M 68 94 L 60 74 M 68 94 L 75 72 M 68 94 L 86 78 M 68 94 L 90 92 M 68 94 L 80 106 M 68 94 L 56 102"
              stroke="#FFFFFF"
              strokeWidth="1.1"
              opacity="0.7"
            />
            {/* Outer Terraced Rim */}
            <circle cx="68" cy="94" r="5.2" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.88" />
            {/* Shadow Basin */}
            <circle cx="68" cy="94" r="4" fill="#364152" />
            <ellipse cx="69" cy="94.5" rx="3" ry="2.4" fill="#283240" />
            {/* Dual Central Peaks */}
            <circle cx="67.5" cy="93.8" r="0.9" fill="#FFFFFF" />
            <circle cx="68.8" cy="94.2" r="0.8" fill="#FFFFFF" />
          </g>

          {/* Kepler Impact: Brilliant Rayed Crater */}
          <g id="crater-kepler-3d">
            <line x1="44" y1="92" x2="32" y2="82" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.65" />
            <line x1="44" y1="92" x2="35" y2="102" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
            <line x1="44" y1="92" x2="55" y2="88" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.65" />
            <circle cx="44" cy="92" r="3.2" fill="#3A4658" stroke="#FFFFFF" strokeWidth="0.9" />
            <circle cx="43.8" cy="91.8" r="1" fill="#FFFFFF" />
          </g>

          {/* Aristarchus Plateau (Most Reflective 3D Feature on Moon) */}
          <g id="aristarchus-3d">
            <ellipse cx="40" cy="65" rx="3.8" ry="3.2" fill="#FFFFFF" opacity="0.98" />
            <ellipse cx="40" cy="65" rx="2" ry="1.6" fill="#DCE8F8" />
            <line x1="40" y1="65" x2="30" y2="58" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
            <line x1="40" y1="65" x2="48" y2="56" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
          </g>

          {/* Plato Crater (Dark Basalt Lake nestled in White Alpes Mountains) */}
          <g id="crater-plato-3d">
            <ellipse cx="78" cy="46" rx="4.8" ry="3.2" fill="none" stroke="#FFFFFF" strokeWidth="1.1" transform="rotate(-12 78 46)" />
            <ellipse cx="78" cy="46" rx="3.8" ry="2.5" fill="#2A3342" transform="rotate(-12 78 46)" />
          </g>

          {/* Grimaldi Crater on Western Limb (Foreshortened 3D basin) */}
          <g id="crater-grimaldi-3d">
            <ellipse cx="24" cy="98" rx="3.2" ry="5.5" fill="#303A4A" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.85" transform="rotate(8 24 98)" />
          </g>

          {/* Langrenus & Petavius Craters on Eastern Limb */}
          <g id="craters-eastern-limb-3d">
            <ellipse cx="168" cy="116" rx="3.4" ry="4.8" fill="#343E50" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.85" transform="rotate(-10 168 116)" />
            <circle cx="167.6" cy="115.8" r="0.9" fill="#FFFFFF" />
            <ellipse cx="162" cy="142" rx="3.8" ry="5.2" fill="#323C4C" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" transform="rotate(-15 162 142)" />
          </g>

          {/* Lunar Rilles (Rima Hyginus / Ariadaeus Faults) */}
          <path d="M 88 102 Q 95 106 104 104" fill="none" stroke="#252F3C" strokeWidth="0.7" opacity="0.7" />
          <path d="M 104 104 Q 112 102 120 106" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.6" />
        </svg>

        {/* Fine Procedural Regolith Basalt Grain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.25) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.35) 1px, transparent 1px)',
            backgroundSize: '4px 4px, 8px 8px',
            backgroundPosition: '0 0, 2px 2px',
            opacity: 0.28,
          }}
        />

        {/* Subtle Spherical 3D Limb Depth (Soft, Non-Dulling) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 78% 78%, rgba(80, 105, 140, 0.28) 0%, rgba(130, 160, 200, 0.1) 45%, transparent 70%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Ethereal Luminous Moonlight Mist Ribbon */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '-40%',
            width: '180%',
            height: '18%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22) 50%, transparent)',
            filter: 'blur(4px)',
            transform: 'rotate(-8deg)',
            animation: 'cloudDriftLeft 26s linear infinite',
          }}
        />
      </div>
    </div>
  );
}

