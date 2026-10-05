import React, { useEffect, useState } from 'react';
import Moon from './Moon';
import Clouds from './Clouds';
import Bats from './Bats';
import Fog from './Fog';
import FloatingParticles from './FloatingParticles';
import HauntedEnvironment from './HauntedEnvironment';
import Pumpkin from './Pumpkin';

/**
 * Fixed Realistic Horror Background Engine
 *
 * All background elements, gothic castle, and landscape are firmly FIXED in place:
 * - Hover / mousemove animation removed as requested
 * - Castle is solid, realistic, and firmly anchored to the ground
 * - Left and right wild cemetery grass and rooted trees are unbroken and seamless
 * - Atmospheric sheet lightning controller periodically illuminates the cloudscape
 * - Radiant Blood Moon, volumetric fog, floating embers, and 3D Jack-o'-lantern
 */
export default function HeroBackground({
  moonRef,
  cloudsRef,
  buildingRef,
  fogRef,
  batsRef,
}) {
  const [lightningActive, setLightningActive] = useState(false);
  const [lightningIntensity, setLightningIntensity] = useState(0);

  // Realistic Distant Storm Sheet Lightning Controller
  useEffect(() => {
    let timeoutId;
    let cancelled = false;

    const triggerLightningStrike = () => {
      if (cancelled) return;

      setLightningActive(true);
      setLightningIntensity(0.75);

      setTimeout(() => {
        if (cancelled) return;
        setLightningIntensity(0.2); // micro dip
      }, 70);

      setTimeout(() => {
        if (cancelled) return;
        setLightningIntensity(0.95); // main flash
      }, 130);

      setTimeout(() => {
        if (cancelled) return;
        setLightningIntensity(0.35); // secondary flash
      }, 240);

      setTimeout(() => {
        if (cancelled) return;
        setLightningIntensity(0.6);
      }, 310);

      setTimeout(() => {
        if (cancelled) return;
        setLightningIntensity(0);
        setLightningActive(false);

        // Schedule next random thunder strike (9 to 17 seconds)
        const nextDelay = 9000 + Math.random() * 8000;
        timeoutId = setTimeout(triggerLightningStrike, nextDelay);
      }, 480);
    };

    timeoutId = setTimeout(triggerLightningStrike, 4500);

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="hero-background-root"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* =================================================================== */}
      {/* LAYER 1: VIBRANT THEATRICAL NIGHT SKY (Fixed Midnight Navy & Deep Cosmos) */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 110% 80% at 75% 18%, #141b32 0%, #0d1024 35%, #070814 68%, #020306 100%)',
        }}
      />

      {/* =================================================================== */}
      {/* LAYER 2: REALISTIC ATMOSPHERIC SHEET LIGHTNING SKY FLASH            */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 65% at 50% 20%, rgba(160, 130, 220, 0.45) 0%, rgba(90, 50, 150, 0.28) 45%, transparent 75%)',
          opacity: lightningIntensity,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'opacity 0.06s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(240, 225, 255, 0.3) 0%, transparent 60%)',
          opacity: lightningIntensity * 0.7,
          mixBlendMode: 'color-dodge',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* =================================================================== */}
      {/* LAYER 3: LUMINOUS MOONLIGHT ATMOSPHERIC DISPERSION BLOOM            */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '2%',
          width: '85%',
          height: '80%',
          background: 'radial-gradient(circle at 78% 22%, rgba(240, 248, 255, 0.38) 0%, rgba(185, 215, 255, 0.22) 32%, rgba(110, 140, 195, 0.1) 58%, transparent 75%)',
          zIndex: 2,
          mixBlendMode: 'screen',
        }}
      />

      {/* =================================================================== */}
      {/* LAYER 4: RADIANT BLOOD MOON & CREPUSCULAR GOD RAYS (Fixed)          */}
      {/* =================================================================== */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
        <Moon moonRef={moonRef} />
      </div>

      {/* =================================================================== */}
      {/* LAYER 5: MOONLIT TURBULENT STORM CLOUDS (Fixed Drift)               */}
      {/* =================================================================== */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 4 }}>
        <Clouds cloudsRef={cloudsRef} isLightning={lightningActive} />
      </div>

      {/* =================================================================== */}
      {/* LAYER 6: FIXED REALISTIC GOTHIC CASTLE & UNBROKEN CEMETERY GRASS    */}
      {/* =================================================================== */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
        <HauntedEnvironment buildingRef={buildingRef} />
      </div>

      {/* =================================================================== */}
      {/* LAYER 7: VOLUMETRIC LUMINOUS GRAVEYARD FOG & ROLLING MIST           */}
      {/* =================================================================== */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 8 }}>
        <Fog fogRef={fogRef} />
      </div>

      {/* =================================================================== */}
      {/* LAYER 8: FLOCKING BATS & FOREGROUND VAMPIRE BATS                    */}
      {/* =================================================================== */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 11 }}>
        <Bats batsRef={batsRef} />
      </div>

      {/* =================================================================== */}
      {/* LAYER 9: RISING FIRE EMBERS & SPECTRAL GRAVEYARD WISPS              */}
      {/* =================================================================== */}
      <FloatingParticles count={44} />

      {/* =================================================================== */}
      {/* LAYER 10: REAL-TIME 3D WEBGL JACK-O'-LANTERN (Fixed Anchor)         */}
      {/* =================================================================== */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 12 }}>
        <Pumpkin />
      </div>

      {/* =================================================================== */}
      {/* LAYER 11: SOFT CINEMATIC EDGE VIGNETTE                              */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(4, 3, 7, 0.45) 82%, rgba(2, 2, 4, 0.82) 100%)',
          zIndex: 13,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle Analog Horror Film Grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 140, 50, 0.035) 1px, transparent 1px), radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '4px 4px, 6px 6px',
          opacity: 0.18,
          zIndex: 14,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
