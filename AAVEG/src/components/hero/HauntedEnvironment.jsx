import React from 'react';

/**
 * Hyper-Realistic Grand Gothic Castle & Fortress (Unified & Closer)
 *
 * Engineered with:
 * 1. Monolithic Connected Architecture: Zero gaps or fragments; all wings, keeps,
 *    curtain walls, and cloisters are seamlessly unified into one grand gothic citadel.
 * 2. Closer & Grander Scale: Tower spires and battlements rise boldly into the night sky,
 *    commanding the background directly beneath the blood moon.
 * 3. Realistic Architectural Detailing: Stone corbels, machicolations, pointed lancet
 *    arches with stone tracery, belfry louvers, stepped gables, and flying buttresses.
 * 4. Realistic Lantern & Candlelight: Warm flickering stained-glass windows and an
 *    illuminated clock face struck at midnight (XII).
 * 5. Watertight Solid Ground & Wild Cemetery Grass: Seamless continuous earth from X=0
 *    to X=1920 with dense grass blades and firmly rooted gnarled trees.
 */
export default function HauntedEnvironment({ buildingRef, style = {} }) {
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
        ...style,
      }}
    >
      <svg
        viewBox="0 0 1920 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <defs>
        {/* Subtle silvery moonlight rim glow behind castle rooflines */}
        <filter id="grandCastleRimGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="-3" stdDeviation="5" floodColor="#D4E4FC" floodOpacity="0.32" />
        </filter>

        {/* Candlelight Window Amber Glow */}
        <radialGradient id="castleAmber" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9C4" stopOpacity="1" />
          <stop offset="30%" stopColor="#FFA000" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#FF5722" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#BF360C" stopOpacity="0.3" />
        </radialGradient>

        {/* Occult Crimson Portal Glow */}
        <radialGradient id="castleOccultRed" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8A80" stopOpacity="1" />
          <stop offset="35%" stopColor="#FF1744" stopOpacity="0.95" />
          <stop offset="75%" stopColor="#B71C1C" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3E0000" stopOpacity="0.25" />
        </radialGradient>

        {/* Distant mountain ridge gradient */}
        <linearGradient id="mtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#251635" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#150d22" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#090610" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* =================================================================== */}
      {/* PLANE 1: DISTANT GOTHIC MOUNTAINS & CRAGS (Deep Background Layer)   */}
      {/* =================================================================== */}
      <g id="distant-mountain-ridge" fill="url(#mtnGrad)" opacity="0.88">
        <path d="M 0 740 L 150 685 L 300 720 L 480 655 L 660 695 L 840 645 L 1020 685 L 1200 625 L 1380 670 L 1580 635 L 1760 685 L 1920 665 L 1920 1000 L 0 1000 Z" />

        {/* Far Left Watchtower Needle */}
        <polygon points="210,480 206,560 214,560" />
        <path d="M 204 560 L 216 560 L 222 730 L 198 730 Z" />

        {/* Far Right Distant Spire */}
        <polygon points="1520,440 1515,530 1525,530" />
        <path d="M 1512 530 L 1528 530 L 1535 680 L 1505 680 Z" />
      </g>

      {/* =================================================================== */}
      {/* PLANE 1.5: MIDGROUND DEPTH (Left-Side Only Distant Misty Tree)      */}
      {/* =================================================================== */}
      <g id="midground-horror-forest" fill="#140d24" opacity="0.65">
        {/* Natural tapered trunk and main fork */}
        <path
          d="
            M 182 750
            C 184 660, 186 580, 192 510
            C 196 460, 206 410, 222 360
            C 214 395, 204 440, 200 490
            C 192 455, 180 420, 164 385
            C 176 415, 184 450, 186 490
            C 182 560, 178 650, 174 750
            Z
          "
        />
        {/* Soft curving secondary boughs */}
        <g fill="none" stroke="#140d24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 222 360 C 235 330, 252 305, 274 285" strokeWidth="3.2" />
          <path d="M 274 285 Q 292 270, 310 262" strokeWidth="2" />
          <path d="M 252 305 Q 268 288, 280 272" strokeWidth="1.8" />
          <path d="M 222 360 Q 240 375, 258 395" strokeWidth="2.4" />

          <path d="M 164 385 C 150 355, 134 330, 115 310" strokeWidth="3" />
          <path d="M 134 330 Q 120 310, 105 295" strokeWidth="1.8" />
          <path d="M 164 385 Q 152 405, 140 425" strokeWidth="2.2" />
        </g>
      </g>

      {/* =================================================================== */}
      {/* PLANE 2: GRAND CONNECTED GOTHIC CASTLE (Monolithic & Closer)        */}
      {/* =================================================================== */}
      <g id="grand-connected-castle" fill="#0d0a14" filter="url(#grandCastleRimGlow)">
        {/* 
        {/* 
          UNIFIED MONOLITHIC CASTLE FORTRESS SPANNING FULL FRAME (X: 0 to 1920)
          Seamless continuous silhouette across the entire horizon:
          Far-Left Bastion (0-300) -> Left Wing -> Central Keep (spire at 865) -> Right Abbey -> Far-Right Ramparts (1620-1920)
        */}
        <path
          d="
            M 0 850
            L 0 580
            L 30 580
            L 45 530
            L 60 580
            L 120 580
            L 135 510
            L 165 440
            L 175 440
            L 205 510
            L 245 560
            L 300 560
            L 330 500
            L 360 560
            L 440 560
            L 440 470
            L 480 410
            L 520 470
            L 600 470
            L 600 540
            L 720 540
            L 720 380
            L 780 380
            L 790 310
            L 860 210
            L 860 100
            L 870 100
            L 870 210
            L 940 310
            L 950 380
            L 1010 380
            L 1010 520
            L 1120 520
            L 1160 440
            L 1200 520
            L 1280 520
            L 1320 380
            L 1360 260
            L 1368 260
            L 1408 380
            L 1448 520
            L 1540 520
            L 1570 470
            L 1600 520
            L 1620 560
            L 1660 560
            L 1680 510
            L 1700 560
            L 1760 560
            L 1800 600
            L 1850 580
            L 1870 540
            L 1890 580
            L 1920 620
            L 1920 850
            Z
          "
        />

        {/* Far-Left Bastion Spire & Finial */}
        <line x1="170" y1="440" x2="170" y2="400" stroke="#0d0a14" strokeWidth="2.5" />
        <line x1="164" y1="415" x2="176" y2="415" stroke="#0d0a14" strokeWidth="2" />

        {/* Far-Left Rampart Crenellations */}
        <rect x="0" y="570" width="15" height="14" />
        <rect x="25" y="570" width="15" height="14" />
        <rect x="70" y="570" width="15" height="14" />
        <rect x="95" y="570" width="15" height="14" />
        <rect x="250" y="550" width="15" height="14" />
        <rect x="275" y="550" width="15" height="14" />

        {/* Left Wing Roof Dormers & Stone Chimneys */}
        <rect x="530" y="380" width="18" height="90" />
        <polygon points="524,380 539,350 554,380" />
        <rect x="650" y="440" width="22" height="100" />
        <polygon points="644,440 661,410 678,440" />

        {/* Left Wing Crenellations */}
        <rect x="300" y="550" width="16" height="15" />
        <rect x="328" y="550" width="16" height="15" />
        <rect x="372" y="550" width="16" height="15" />
        <rect x="400" y="550" width="16" height="15" />
        <rect x="600" y="530" width="18" height="15" />
        <rect x="630" y="530" width="18" height="15" />
        <rect x="660" y="530" width="18" height="15" />
        <rect x="690" y="530" width="18" height="15" />

        {/* Central Keep Needle Spire & Iron Finial Cross */}
        <line x1="865" y1="100" x2="865" y2="65" stroke="#0d0a14" strokeWidth="3" />
        <line x1="858" y1="78" x2="872" y2="78" stroke="#0d0a14" strokeWidth="2.5" />

        {/* Central Keep Crenellations */}
        <rect x="720" y="370" width="18" height="14" />
        <rect x="750" y="370" width="18" height="14" />
        <rect x="960" y="370" width="18" height="14" />
        <rect x="990" y="370" width="18" height="14" />

        {/* Stone Gargoyles */}
        <path d="M 720 380 C 695 375 690 395 705 400 C 718 402 720 392 720 380 Z" />
        <path d="M 1010 380 C 1035 375 1040 395 1025 400 C 1012 402 1010 392 1010 380 Z" />

        {/* Clock Dial (Struck at Midnight XII) */}
        <circle cx="865" cy="315" r="36" fill="#1b0e06" stroke="#FF7700" strokeWidth="2.2" opacity="0.95" />
        <circle cx="865" cy="315" r="30" fill="none" stroke="#FFAA00" strokeWidth="1.2" opacity="0.6" strokeDasharray="4 3" />
        <line x1="865" y1="315" x2="865" y2="288" stroke="#FFAA00" strokeWidth="2.6" opacity="0.95" />
        <line x1="865" y1="315" x2="869" y2="295" stroke="#FF6D00" strokeWidth="1.8" opacity="0.95" />
        <circle cx="865" cy="315" r="4.5" fill="#FFE082" />

        {/* Right Abbey Spire & Finial Cross */}
        <line x1="1364" y1="260" x2="1364" y2="225" stroke="#0d0a14" strokeWidth="3" />
        <line x1="1357" y1="238" x2="1371" y2="238" stroke="#0d0a14" strokeWidth="2.2" />

        {/* Right Abbey Flying Buttresses */}
        <path d="M 1200 620 C 1200 540 1225 500 1240 500 L 1240 535 C 1230 535 1215 570 1215 630 Z" />
        <path d="M 1448 535 C 1460 535 1485 570 1485 640 L 1470 650 C 1470 590 1450 550 1448 535 Z" />

        {/* Right Abbey Iron Weather Vane */}
        <line x1="1160" y1="440" x2="1160" y2="390" stroke="#0d0a14" strokeWidth="3" />
        <path d="M 1146 398 L 1174 398 M 1166 392 L 1178 398 L 1166 404" stroke="#0d0a14" strokeWidth="2.2" />

        {/* Far-Right Eastern Rampart Crenellations (Keeping low under Moon) */}
        <rect x="1625" y="550" width="16" height="14" />
        <rect x="1650" y="550" width="16" height="14" />
        <rect x="1710" y="550" width="16" height="14" />
        <rect x="1735" y="550" width="16" height="14" />
        <rect x="1805" y="590" width="16" height="14" />
        <rect x="1830" y="570" width="16" height="14" />

        {/* Central Ground Gothic Gatehouse / Portcullis Portal */}
        <path d="M 830 840 L 830 730 C 830 690 900 690 900 730 L 900 840 Z" fill="#040306" />
        <line x1="845" y1="710" x2="845" y2="840" stroke="#1c1628" strokeWidth="2.5" />
        <line x1="865" y1="700" x2="865" y2="840" stroke="#1c1628" strokeWidth="2.5" />
        <line x1="885" y1="710" x2="885" y2="840" stroke="#1c1628" strokeWidth="2.5" />
        <line x1="830" y1="740" x2="900" y2="740" stroke="#1c1628" strokeWidth="2" />
        <line x1="830" y1="770" x2="900" y2="770" stroke="#1c1628" strokeWidth="2" />
        <line x1="830" y1="800" x2="900" y2="800" stroke="#1c1628" strokeWidth="2" />
      </g>

      {/* =================================================================== */}
      {/* WARM FLICKERING CANDLELIGHT & LANTERN STAINED-GLASS WINDOWS         */}
      {/* =================================================================== */}
      <g id="castle-illuminated-windows">
        {/* Clocktower Twin Lancet Windows */}
        <g style={{ animation: 'realisticLanternFlicker 6.2s ease-in-out infinite' }}>
          <path d="M 832 410 C 832 390 848 380 848 380 C 848 380 864 390 864 410 L 864 470 L 832 470 Z" fill="url(#castleAmber)" />
          <line x1="848" y1="380" x2="848" y2="470" stroke="#0d0a14" strokeWidth="2.5" />
          <line x1="832" y1="430" x2="864" y2="430" stroke="#0d0a14" strokeWidth="2" />
        </g>

        <g style={{ animation: 'realisticLanternFlicker 5.4s ease-in-out infinite 1.2s' }}>
          <path d="M 874 410 C 874 390 890 380 890 380 C 890 380 906 390 906 410 L 906 470 L 874 470 Z" fill="url(#castleAmber)" />
          <line x1="890" y1="380" x2="890" y2="470" stroke="#0d0a14" strokeWidth="2.5" />
          <line x1="874" y1="430" x2="906" y2="430" stroke="#0d0a14" strokeWidth="2" />
        </g>

        {/* Occult Crimson High Portal Window directly under Clock */}
        <g style={{ animation: 'realisticLanternFlicker 7.5s ease-in-out infinite 0.7s' }}>
          <path d="M 848 500 C 848 480 869 470 869 470 C 869 470 890 480 890 500 L 890 555 L 848 555 Z" fill="url(#castleOccultRed)" />
          <line x1="869" y1="470" x2="869" y2="555" stroke="#0d0a14" strokeWidth="3" />
          <line x1="848" y1="520" x2="890" y2="520" stroke="#0d0a14" strokeWidth="2.5" />
        </g>

        {/* Left Fortress Hall Lancet Windows */}
        <g style={{ animation: 'realisticLanternFlicker 8.2s ease-in-out infinite 2.4s' }}>
          <rect x="465" y="500" width="22" height="52" rx="11" fill="url(#castleAmber)" opacity="0.9" />
          <line x1="476" y1="500" x2="476" y2="552" stroke="#0d0a14" strokeWidth="2.5" />
        </g>
        <g style={{ animation: 'realisticLanternFlicker 6.8s ease-in-out infinite 3.1s' }}>
          <rect x="525" y="500" width="22" height="52" rx="11" fill="url(#castleAmber)" opacity="0.85" />
          <line x1="536" y1="500" x2="536" y2="552" stroke="#0d0a14" strokeWidth="2.5" />
        </g>
        <g style={{ animation: 'realisticLanternFlicker 9.1s ease-in-out infinite 0.5s' }}>
          <rect x="630" y="565" width="26" height="58" rx="13" fill="url(#castleAmber)" opacity="0.9" />
          <line x1="643" y1="565" x2="643" y2="623" stroke="#0d0a14" strokeWidth="2.5" />
        </g>

        {/* Right Abbey Wing Stained-Glass Windows */}
        <g style={{ animation: 'realisticLanternFlicker 5.9s ease-in-out infinite 1.8s' }}>
          <rect x="1145" y="555" width="26" height="60" rx="13" fill="url(#castleAmber)" opacity="0.9" />
          <line x1="1158" y1="555" x2="1158" y2="615" stroke="#0d0a14" strokeWidth="2.5" />
        </g>
        <g style={{ animation: 'realisticLanternFlicker 7.1s ease-in-out infinite 2.9s' }}>
          <rect x="1235" y="550" width="30" height="66" rx="15" fill="url(#castleAmber)" opacity="0.9" />
          <line x1="1250" y1="550" x2="1250" y2="616" stroke="#0d0a14" strokeWidth="2.5" />
        </g>
        {/* Gothic Cathedral Rose Window right */}
        <g style={{ animation: 'realisticLanternFlicker 8.6s ease-in-out infinite 0.3s' }}>
          <circle cx="1364" cy="450" r="32" fill="url(#castleOccultRed)" opacity="0.95" />
          <circle cx="1364" cy="450" r="32" fill="none" stroke="#0d0a14" strokeWidth="4" />
          <line x1="1364" y1="418" x2="1364" y2="482" stroke="#0d0a14" strokeWidth="3" />
          <line x1="1332" y1="450" x2="1396" y2="450" stroke="#0d0a14" strokeWidth="3" />
          <circle cx="1364" cy="450" r="13" fill="none" stroke="#0d0a14" strokeWidth="2.5" />
        </g>
        {/* Far-Left Bastion Watchtower Window & Arrow-slits */}
        <g style={{ animation: 'realisticLanternFlicker 6.5s ease-in-out infinite 1.5s' }}>
          <rect x="156" y="470" width="18" height="42" rx="9" fill="url(#castleAmber)" opacity="0.85" />
          <line x1="165" y1="470" x2="165" y2="512" stroke="#0d0a14" strokeWidth="2" />
        </g>
        <rect x="90" y="605" width="6" height="24" rx="2" fill="#FFA000" opacity="0.75" />
        <rect x="220" y="585" width="6" height="24" rx="2" fill="#FFA000" opacity="0.75" />

        {/* Far-Right Eastern Rampart Arrow-slits & Watchpost Window */}
        <g style={{ animation: 'realisticLanternFlicker 7.8s ease-in-out infinite 2.1s' }}>
          <rect x="1672" y="575" width="16" height="38" rx="8" fill="url(#castleAmber)" opacity="0.8" />
          <line x1="1680" y1="575" x2="1680" y2="613" stroke="#0d0a14" strokeWidth="2" />
        </g>
        <rect x="1780" y="610" width="6" height="24" rx="2" fill="#FFA000" opacity="0.7" />
        <rect x="1860" y="605" width="6" height="20" rx="2" fill="#FFA000" opacity="0.65" />
      </g>

      {/* =================================================================== */}
      {/* PLANE 3: WATERTIGHT GROUND & ORGANIC LEFT HORROR TREE (NO RIGHT TREES) */}
      {/* =================================================================== */}
      <g id="watertight-ground-and-trees" fill="#06050b">
        {/* Continuous Solid Ground Base from X=0 to X=1920 down to Y=1000 */}
        <path d="M 0 810 Q 250 770 500 815 T 1000 800 T 1500 810 T 1920 790 L 1920 1000 L 0 1000 Z" />

        {/* =============================================================== */}
        {/* LEFT FOREGROUND COMPLEX: MOUND, REALISTIC GNARLED OAK & ROOTS   */}
        {/* =============================================================== */}
        {/* Left Mound Ground Mass (Solid fill to bottom 1000) */}
        <path d="M 0 760 Q 180 730 420 800 L 420 1000 L 0 1000 Z" />

        {/* Dense Natural Cemetery Grass Blades along Left Ridge */}
        <path d="
          M 15 756 L 22 705 L 28 755 Z 
          M 32 754 L 40 698 L 47 753 Z 
          M 52 752 L 64 692 L 70 751 Z 
          M 75 750 L 83 710 L 89 749 Z 
          M 94 748 L 104 690 L 111 747 Z 
          M 116 747 L 128 702 L 134 746 Z
          M 140 747 L 152 688 L 159 746 Z 
          M 165 748 L 176 698 L 183 749 Z 
          M 188 750 L 202 682 L 209 752 Z 
          M 215 754 L 228 704 L 234 756 Z 
          M 240 758 L 252 696 L 258 760 Z
          M 265 762 L 278 702 L 285 765 Z 
          M 292 768 L 305 712 L 312 771 Z 
          M 320 774 L 334 718 L 341 777 Z 
          M 348 781 L 362 725 L 369 785 Z
          M 378 788 L 392 735 L 399 792 Z
          M 405 794 L 418 742 L 424 798 Z
        " />

        {/* Left Ancient Tree: Powerful anchored organic buttress roots */}
        <path d="M 45 760 C 25 800 0 855 0 915 L 0 945 C 16 880 32 825 56 760 Z" />
        <path d="M 72 760 C 62 815 48 875 32 960 L 52 965 C 68 890 78 825 85 760 Z" />
        <path d="M 98 760 C 116 810 142 870 178 930 L 196 918 C 158 855 128 800 110 760 Z" />

        {/* 
          REALISTIC BOTANICAL GNARLED HORROR OAK (Volumetric Contoured Trunk & Primary Limbs)
          Thick ancient trunk with natural bark ridges that organically forks into
          sprawling crown limbs with natural taper and zero jagged vector seams.
        */}
        <path
          d="
            M 48 760
            C 56 680, 68 620, 68 550
            C 68 490, 52 440, 28 395
            C 14 370, 0 350, 0 330
            C 8 340, 22 360, 38 385
            C 58 415, 76 460, 82 505
            C 88 455, 108 395, 142 335
            C 172 280, 225 230, 290 195
            C 345 165, 400 175, 435 210
            C 405 188, 360 180, 312 195
            C 255 212, 205 258, 172 318
            C 142 372, 126 430, 120 480
            C 140 450, 175 422, 220 400
            C 270 376, 325 382, 365 408
            C 325 394, 278 396, 235 418
            C 188 442, 148 480, 132 525
            C 126 600, 116 685, 108 760
            Z
          "
        />

        {/* Realistic Natural Branching System (Smooth Organic Recursive Bifurcations) */}
        <g fill="none" stroke="#06050b" strokeLinecap="round" strokeLinejoin="round">
          {/* --- CROWN CANOPY MAIN BOUGHS (Thick Secondary Limbs) --- */}
          <path d="M 290 195 C 318 168, 352 145, 395 135" strokeWidth="5.5" />
          <path d="M 395 135 C 425 128, 458 134, 485 152" strokeWidth="3.8" />
          <path d="M 485 152 Q 508 168, 528 190" strokeWidth="2.4" />

          {/* Crown Branch Sub-forks */}
          <path d="M 352 145 C 368 118, 388 98, 412 85" strokeWidth="3.4" />
          <path d="M 412 85 Q 430 75, 448 78" strokeWidth="2.2" />
          <path d="M 412 85 Q 425 98, 438 115" strokeWidth="2.2" />
          <path d="M 368 118 Q 355 95, 342 80" strokeWidth="2.2" />

          <path d="M 435 210 C 465 235, 492 268, 515 305" strokeWidth="3.6" />
          <path d="M 492 268 Q 520 280, 545 292" strokeWidth="2.2" />
          <path d="M 465 235 Q 490 220, 512 212" strokeWidth="2.4" />

          {/* High Crown Reaching Tendrils */}
          <path d="M 225 230 C 242 195, 260 160, 275 125" strokeWidth="4.2" />
          <path d="M 275 125 C 288 98, 305 78, 325 65" strokeWidth="2.8" />
          <path d="M 325 65 Q 340 55, 355 60" strokeWidth="1.8" />
          <path d="M 305 78 Q 295 62, 282 52" strokeWidth="1.8" />
          <path d="M 260 160 Q 282 150, 302 148" strokeWidth="2.4" />

          {/* --- MID-RIGHT ARCHING BOUGHS (Framing the Castle Ridge) --- */}
          <path d="M 270 376 C 305 348, 345 335, 388 332" strokeWidth="4.2" />
          <path d="M 388 332 C 420 330, 448 342, 472 365" strokeWidth="2.8" />
          <path d="M 472 365 Q 492 385, 510 412" strokeWidth="2" />
          <path d="M 420 330 Q 438 310, 458 298" strokeWidth="2.2" />
          <path d="M 345 335 Q 360 312, 375 295" strokeWidth="2.4" />

          <path d="M 365 408 C 398 425, 428 448, 452 480" strokeWidth="3.2" />
          <path d="M 428 448 Q 455 455, 478 462" strokeWidth="2" />

          {/* --- LEFT WEAPING & GNARLED BOUGHS (Reaching West) --- */}
          <path d="M 52 440 C 35 410, 18 375, 4 335" strokeWidth="4" />
          <path d="M 18 375 C 2 355, -12 342, -25 338" strokeWidth="2.6" />
          <path d="M 35 410 C 22 435, 10 468, 0 505" strokeWidth="3" />
          <path d="M 10 468 Q -8 485, -20 495" strokeWidth="2" />

          {/* Delicate Fine Gnarled Claw Twigs */}
          <path d="M 395 135 Q 405 118, 415 105" strokeWidth="1.6" />
          <path d="M 458 134 Q 472 120, 482 108" strokeWidth="1.6" />
          <path d="M 388 332 Q 402 318, 412 308" strokeWidth="1.6" />
          <path d="M 28 395 Q 16 380, 8 368" strokeWidth="1.8" />
        </g>

        {/* Eerie Hollow in Trunk Bark with Watchful Glowing Amber Gaze */}
        <ellipse cx="88" cy="565" rx="7" ry="14" fill="#020104" />
        <ellipse
          cx="88"
          cy="565"
          rx="3.2"
          ry="5"
          fill="#FFA000"
          style={{ animation: 'treeHollowGaze 4.5s ease-in-out infinite' }}
        />

        {/* Weeping Spanish Moss Draped Organically from Left Tree Boughs */}
        <g stroke="#06050b" strokeWidth="1.8" fill="none" opacity="0.88" style={{ animation: 'mossSway 7s ease-in-out infinite' }}>
          <path d="M 205 215 Q 198 255 208 290 T 202 335" />
          <path d="M 285 175 Q 278 215 288 255 T 282 300" />
          <path d="M 355 180 Q 348 220 358 258 T 352 292" />
          <path d="M 175 400 Q 168 438 178 470 T 172 505" />
          <path d="M 255 380 Q 248 418 258 450 T 252 485" />
          <path d="M 335 345 Q 328 380 336 410 T 330 440" />
        </g>

        {/* Perched Raven on Left Tree Bough with Glowing Crimson Eye */}
        <g transform="translate(195, 380) scale(0.65)">
          <ellipse cx="20" cy="18" rx="14" ry="9" fill="#06050b" transform="rotate(-15 20 18)" />
          <circle cx="10" cy="12" r="7" fill="#06050b" />
          <polygon points="4,12 0,14 5,16" fill="#06050b" />
          <path d="M 28 22 L 44 32 L 32 26 Z" fill="#06050b" />
          <circle cx="9" cy="11" r="1.4" fill="#FF1744" />
        </g>

        {/* Silhouetted Bats bursting from left tree canopy into the mist */}
        <path d="M 310 180 Q 320 170 330 180 Q 340 170 350 180 Q 330 188 310 180 Z" />
        <path d="M 410 145 Q 418 137 426 145 Q 434 137 442 145 Q 426 151 410 145 Z" />

        {/* Left Headstones firmly rooted in grass */}
        <path d="M 180 765 L 178 705 C 178 690 198 690 198 705 L 200 765 Z" transform="rotate(-5 189 735)" />
        <g transform="rotate(4 275 750)">
          <rect x="270" y="695" width="10" height="75" />
          <rect x="257" y="713" width="36" height="8" />
          <circle cx="275" cy="717" r="12" fill="none" stroke="#06050b" strokeWidth="3" />
        </g>

        {/* Left Spiked Cemetery Fence */}
        <g stroke="#06050b" strokeWidth="2.5">
          <line x1="210" y1="740" x2="380" y2="765" />
          <line x1="210" y1="755" x2="380" y2="780" />
          <line x1="225" y1="720" x2="225" y2="760" />
          <line x1="255" y1="725" x2="255" y2="765" />
          <line x1="295" y1="730" x2="295" y2="775" />
          <line x1="325" y1="735" x2="325" y2="780" />
          <line x1="355" y1="740" x2="355" y2="785" />
        </g>

        {/* =============================================================== */}
        {/* RIGHT FOREGROUND: CLEAN MOUND & CEMETERY (ZERO TREES FOR MOON) */}
        {/* =============================================================== */}
        {/* Right Mound Ground Mass (Solid fill to bottom 1000) */}
        <path d="M 1480 810 Q 1700 735 1920 755 L 1920 1000 L 1480 1000 Z" />

        {/* Dense Cemetery Grass Blades along Right Ridge */}
        <path d="
          M 1495 808 L 1506 752 L 1513 806 Z
          M 1518 804 L 1530 745 L 1537 802 Z
          M 1542 800 L 1555 738 L 1562 798 Z 
          M 1568 795 L 1580 732 L 1587 793 Z 
          M 1592 790 L 1605 724 L 1612 787 Z 
          M 1618 784 L 1632 718 L 1639 780 Z 
          M 1645 778 L 1658 712 L 1665 774 Z
          M 1672 771 L 1685 706 L 1692 768 Z 
          M 1700 765 L 1714 698 L 1721 762 Z 
          M 1728 759 L 1742 692 L 1749 756 Z 
          M 1756 754 L 1770 688 L 1777 751 Z 
          M 1784 750 L 1798 684 L 1805 747 Z
          M 1812 747 L 1825 686 L 1832 746 Z 
          M 1838 745 L 1852 690 L 1859 746 Z 
          M 1866 746 L 1880 694 L 1887 747 Z 
          M 1894 748 L 1906 702 L 1913 749 Z 
          M 1915 750 L 1920 710 L 1920 750 Z
        " />

        {/* Right Celtic Cross & Headstone firmly planted in grass */}
        <g transform="rotate(-5 1600 780)">
          <rect x="1595" y="715" width="10" height="80" />
          <rect x="1582" y="734" width="36" height="8" />
          <circle cx="1600" cy="738" r="13" fill="none" stroke="#06050b" strokeWidth="3" />
        </g>
        <path d="M 1680 790 L 1678 735 C 1678 722 1702 722 1702 735 L 1704 790 Z" transform="rotate(5 1691 762)" />

        {/* Raven perched atop the Celtic Cross */}
        <g transform="translate(1592, 700) scale(0.55)">
          <ellipse cx="20" cy="18" rx="14" ry="9" fill="#06050b" transform="rotate(-10 20 18)" />
          <circle cx="10" cy="12" r="7" fill="#06050b" />
          <polygon points="4,12 0,14 5,16" fill="#06050b" />
          <path d="M 28 22 L 44 32 L 32 26 Z" fill="#06050b" />
          <circle cx="9" cy="11" r="1.4" fill="#FF5722" />
        </g>

        {/* Right Spiked Cemetery Fence */}
        <g stroke="#06050b" strokeWidth="2.5">
          <line x1="1540" y1="785" x2="1710" y2="760" />
          <line x1="1540" y1="800" x2="1710" y2="775" />
          <line x1="1560" y1="765" x2="1560" y2="805" />
          <line x1="1590" y1="760" x2="1590" y2="800" />
          <line x1="1630" y1="755" x2="1630" y2="795" />
          <line x1="1660" y1="750" x2="1660" y2="790" />
          <line x1="1690" y1="745" x2="1690" y2="785" />
        </g>
      </g>
    </svg>
  </div>
);
}

