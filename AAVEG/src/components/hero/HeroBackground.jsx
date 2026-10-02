import React from 'react';
import Moon from './Moon';
import Clouds from './Clouds';
import Bats from './Bats';
import Fog from './Fog';
import FloatingParticles from './FloatingParticles';
import HauntedEnvironment from './HauntedEnvironment';
import Pumpkin from './Pumpkin';

export default function HeroBackground({
  moonRef,
  cloudsRef,
  buildingRef,
  fogRef,
  batsRef,
}) {
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
      {/* Layer 1: Dark Atmospheric Base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #020304 0%, #06070a 45%, #0a0604 75%, #020203 100%)',
        }}
      />

      {/* Layer 2: Night Sky Blood-Red Atmospheric Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '70%',
          background: 'radial-gradient(circle at 75% 20%, rgba(180, 40, 10, 0.25) 0%, transparent 65%)',
        }}
      />

      {/* Layer 3: Ominous Blood Moon */}
      <Moon moonRef={moonRef} />

      {/* Layer 4: Drifting Foggy Clouds */}
      <Clouds cloudsRef={cloudsRef} />

      {/* Layer 5-7: Sinister Haunted Building & Dead Trees Silhouette */}
      <HauntedEnvironment buildingRef={buildingRef} />

      {/* Layer 8: Layered Ground Fog */}
      <Fog fogRef={fogRef} />

      {/* Layer 11: Swarming Bats in Night Sky */}
      <Bats batsRef={batsRef} />

      {/* Layer 12: Rising Fire Embers Particles */}
      <FloatingParticles count={38} />

      {/* Layer 13: Realistic 3D Jack-o'-Lantern in Mist */}
      <Pumpkin />

      {/* Layer 14: Dark Vignette Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2, 3, 4, 0.75) 85%, #020304 100%)',
          zIndex: 13,
        }}
      />
    </div>
  );
}
