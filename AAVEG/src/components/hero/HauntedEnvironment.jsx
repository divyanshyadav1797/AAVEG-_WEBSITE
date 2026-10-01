import React from 'react';

export default function HauntedEnvironment({ buildingRef }) {
  return (
    <div
      ref={buildingRef}
      className="hero-layer-building"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Background Gothic Monolith / Hostel Silhouette */}
      <svg
        viewBox="0 0 1600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Distant Spire Towers (Sinister dark gothic silhouettes) */}
        <g id="distant-towers" fill="#08090D" opacity="0.95">
          {/* Far Left Spire */}
          <polygon points="120,450 145,260 170,450" />
          <rect x="130" y="450" width="30" height="220" />
          {/* Main Central Left Castle Block */}
          <rect x="220" y="320" width="380" height="420" />
          <polygon points="210,320 230,220 250,320" />
          <polygon points="410,320 430,210 450,320" />
          <polygon points="570,320 590,230 610,320" />

          {/* Center Clocktower Silhouette */}
          <rect x="680" y="240" width="160" height="500" />
          <polygon points="670,240 760,110 850,240" />

          {/* Right Tower Complex (Near Moon) */}
          <rect x="980" y="340" width="420" height="400" />
          <polygon points="1040,340 1065,220 1090,340" />
          <polygon points="1220,340 1260,150 1300,340" />
          <polygon points="1350,340 1380,240 1410,340" />
        </g>

        {/* Sinister Blood-Amber Windows with Dim Unsettling Glow */}
        <g id="glowing-windows" fill="#E64A19" opacity="0.85" style={{ animation: 'windowFlicker 5s ease-in-out infinite' }}>
          {/* Central Windows */}
          <rect x="735" y="310" width="20" height="42" rx="10" />
          <rect x="765" y="310" width="20" height="42" rx="10" />
          <rect x="750" y="380" width="22" height="46" rx="11" />
          
          {/* Left Wing Windows */}
          <rect x="280" y="410" width="18" height="38" rx="9" />
          <rect x="340" y="410" width="18" height="38" rx="9" />
          <rect x="440" y="410" width="18" height="38" rx="9" />
          <rect x="500" y="410" width="18" height="38" rx="9" />

          {/* Right Wing Windows */}
          <rect x="1050" y="420" width="22" height="46" rx="11" />
          <rect x="1110" y="420" width="22" height="46" rx="11" />
          <rect x="1245" y="390" width="30" height="60" rx="15" />
          <rect x="1330" y="430" width="22" height="46" rx="11" />
          <rect x="1250" y="520" width="28" height="54" rx="14" />
        </g>

        {/* Foreground Gnarled Dead Trees & Jagged Horizon */}
        <g id="ground-trees" fill="#030405">
          {/* Ground contour with jagged graveyard rocks */}
          <path d="M 0 680 Q 250 640 500 690 T 1000 670 T 1600 690 L 1600 900 L 0 900 Z" />

          {/* Left Dead Gnarled Spooky Tree */}
          <path d="M 0 450 Q 80 500 70 650 Q 90 600 130 540 Q 140 500 120 460 Q 150 490 180 470 Q 140 550 110 680 L 0 700 Z" />
          
          {/* Right Dead Tree Framing Moon */}
          <path d="M 1600 350 Q 1480 430 1490 580 Q 1470 510 1430 480 Q 1390 450 1420 410 Q 1440 460 1470 480 Q 1480 400 1520 330 Q 1500 450 1530 650 L 1600 660 Z" />
        </g>
      </svg>
    </div>
  );
}
