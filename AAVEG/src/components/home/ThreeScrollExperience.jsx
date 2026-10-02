import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeScrollExperience Component
 * Implements a full-page scroll-driven 3D cinematic flythrough experience inspired by
 * https://re-the-drive.webflow.io/
 *
 * Features:
 * - Full-page continuous flythrough from uppermost Hero down to the Games Arcade
 * - Procedural 3D Gothic Monoliths with pulsating runic energy channels
 * - 3D Dual-Ring Concentric Vortex Arches (Gateway Portals) at chapter waypoints
 * - 3D Floating Crystalline Artifacts (Octahedrons, Icosahedrons) with gentle bobbing
 * - 3D Roadway with cyber runway guide lights
 * - 2D/3D Hybrid Glowing Blood Moon in deep horizon with atmospheric corona
 * - Animated Flapping Bat Swarm with sinusoidal wing-flutter and flocking
 * - Volumetric Fire Ember & Cosmic Dust Cloud with scroll-velocity warp-stretch
 * - Sector-dependent dynamic lighting transitions (Amber -> Orange -> Purple -> Gold -> Cyan)
 * - Cyber-horror telemetry HUD overlay with real-time speed, depth, coords, and waypoints
 * - Smooth transition from the uppermost Hero into the deep corridor
 * - High performance: Clamped DPR, frustum culling, alpha channel, requestAnimationFrame lerp
 */
export default function ThreeScrollExperience({
  scrollProgress = 0, // 0 to 100
  scrollVelocity = 0, // dynamic scroll speed
  activeSector = 0,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const progressRef = useRef(scrollProgress);
  const velocityRef = useRef(scrollVelocity);
  const sectorRef = useRef(activeSector);
  const isVisibleRef = useRef(true);

  // Synchronize mutable refs without triggering re-render
  useEffect(() => {
    progressRef.current = scrollProgress / 100;
  }, [scrollProgress]);

  useEffect(() => {
    velocityRef.current = scrollVelocity;
  }, [scrollVelocity]);

  useEffect(() => {
    sectorRef.current = activeSector;
  }, [activeSector]);

  // Sector HUD Manifest inspired by re-the-drive
  const sectorManifest = [
    { code: 'SEC-00', time: '22:00', label: 'GATES OF MADNESS • PCE CAMPUS', coords: '26.784° N, 75.826° E', status: 'SANCTUARY APPROACH' },
    { code: 'SEC-01', time: '23:58', label: 'PROLOGUE • THE AWAKENING', coords: '26.787° N, 75.829° E', status: 'INITIATING DISSOLUTION' },
    { code: 'SEC-02', time: '02:14', label: 'THE MONOLITH • SAGA OF 4 NIGHTS', coords: '26.791° N, 75.834° E', status: 'CHAOS UNFOLDING' },
    { code: 'SEC-03', time: '04:17', label: 'WAR ARENA • 8-HOUSE CLASH', coords: '26.796° N, 75.838° E', status: 'FACTION RIVALRY HIGH' },
    { code: 'SEC-04', time: '05:12', label: 'CORONATION • CROWN OF CHAMPIONS', coords: '26.801° N, 75.843° E', status: 'ROYAL DECREE ISSUED' },
    { code: 'SEC-05', time: '06:00', label: 'THE CLIMAX • HORROR ARCADE', coords: '26.806° N, 75.848° E', status: 'SURVIVAL PROTOCOL ON' },
  ];

  const currentSector = sectorManifest[activeSector] || sectorManifest[0];

  // Mouse Parallax Listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Three.js Scene Setup & Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // -------------------------------------------------------------
    // 1. WebGL Renderer
    // -------------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: window.devicePixelRatio <= 1.5,
      alpha: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // -------------------------------------------------------------
    // 2. Scene & Fog
    // -------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030407, 0.013);

    // -------------------------------------------------------------
    // 3. Perspective Camera
    // -------------------------------------------------------------
    const camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      0.1,
      280
    );
    // Starts at high vantage point overlooking the entrance
    camera.position.set(0, 3.8, 38);

    // -------------------------------------------------------------
    // 4. Lights
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x160c08, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xff4d00, 2.4);
    dirLight1.position.set(6, 14, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7928ca, 1.5);
    dirLight2.position.set(-8, 8, -40);
    scene.add(dirLight2);

    const travelingLight = new THREE.PointLight(0xff3b00, 4.0, 55, 1.4);
    travelingLight.position.set(0, 3, 30);
    scene.add(travelingLight);

    // -------------------------------------------------------------
    // 5. 2D/3D Hybrid Blood Moon in Horizon
    // -------------------------------------------------------------
    const createMoonTexture = () => {
      const size = 512;
      const moonCanvas = document.createElement('canvas');
      moonCanvas.width = size;
      moonCanvas.height = size;
      const ctx = moonCanvas.getContext('2d');

      // Outer Corona Glow
      const grad = ctx.createRadialGradient(size / 2, size / 2, 70, size / 2, size / 2, size / 2);
      grad.addColorStop(0, '#FFE8D6');
      grad.addColorStop(0.25, '#FF5500');
      grad.addColorStop(0.65, '#990000');
      grad.addColorStop(0.85, 'rgba(150, 0, 0, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Moon Surface Craters
      ctx.fillStyle = 'rgba(20, 5, 2, 0.4)';
      const craters = [
        { x: 210, y: 220, r: 45 },
        { x: 280, y: 190, r: 35 },
        { x: 310, y: 270, r: 50 },
        { x: 190, y: 310, r: 38 },
        { x: 240, y: 290, r: 28 },
      ];
      craters.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      return new THREE.CanvasTexture(moonCanvas);
    };

    const moonTexture = createMoonTexture();
    const moonGeom = new THREE.PlaneGeometry(36, 36);
    const moonMat = new THREE.MeshBasicMaterial({
      map: moonTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const moonMesh = new THREE.Mesh(moonGeom, moonMat);
    moonMesh.position.set(0, 26, -180);
    scene.add(moonMesh);

    // -------------------------------------------------------------
    // 6. 3D Procedural Gothic Monoliths with Pulsing Rune Strips
    // -------------------------------------------------------------
    const monolithGroup = new THREE.Group();
    const pillarGeom = new THREE.BoxGeometry(1.8, 10.5, 1.8);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e14,
      roughness: 0.8,
      metalness: 0.35,
    });

    const runeGeom = new THREE.BoxGeometry(0.2, 8.8, 0.2);
    const runeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xff4d00 }),
      new THREE.MeshBasicMaterial({ color: 0xff3b00 }),
      new THREE.MeshBasicMaterial({ color: 0xff8533 }),
    ];

    const crownGeom = new THREE.OctahedronGeometry(0.9, 0);
    const crownMat = new THREE.MeshStandardMaterial({
      color: 0x1f1412,
      emissive: 0xff4d00,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.6,
    });

    const crowns = [];
    const runes = [];
    const numPillars = 28;

    for (let i = 0; i < numPillars; i++) {
      const zPos = 32 - i * 6.5;
      const xOffset = 6.2 + (i % 2) * 1.5;

      // Left Pillar
      const leftPillar = new THREE.Mesh(pillarGeom, pillarMat);
      leftPillar.position.set(-xOffset, 4.2, zPos);
      monolithGroup.add(leftPillar);

      const leftRune = new THREE.Mesh(runeGeom, runeMaterials[i % 3]);
      leftRune.position.set(-xOffset + 0.92, 4.2, zPos);
      monolithGroup.add(leftRune);
      runes.push(leftRune);

      // Right Pillar
      const rightPillar = new THREE.Mesh(pillarGeom, pillarMat);
      rightPillar.position.set(xOffset, 4.2, zPos);
      monolithGroup.add(rightPillar);

      const rightRune = new THREE.Mesh(runeGeom, runeMaterials[i % 3]);
      rightRune.position.set(xOffset - 0.92, 4.2, zPos);
      monolithGroup.add(rightRune);
      runes.push(rightRune);

      // Floating Crown Caps on alternating pillars
      if (i % 2 === 0) {
        const leftCrown = new THREE.Mesh(crownGeom, crownMat);
        leftCrown.position.set(-xOffset, 10.8, zPos);
        monolithGroup.add(leftCrown);
        crowns.push(leftCrown);

        const rightCrown = new THREE.Mesh(crownGeom, crownMat);
        rightCrown.position.set(xOffset, 10.8, zPos);
        monolithGroup.add(rightCrown);
        crowns.push(rightCrown);
      }
    }
    scene.add(monolithGroup);

    // -------------------------------------------------------------
    // 7. 3D Concentric Dual-Ring Vortex Portals (Gateway Arches)
    // -------------------------------------------------------------
    const portalsGroup = new THREE.Group();
    const portalWaypoints = [18, -14, -50, -88, -126];
    const portalRings = [];

    const outerRingGeom = new THREE.TorusGeometry(5.8, 0.22, 16, 48);
    const innerRingGeom = new THREE.TorusGeometry(4.4, 0.14, 12, 36);

    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x1f1418,
      roughness: 0.4,
      metalness: 0.8,
      emissive: 0xff3b00,
      emissiveIntensity: 0.45,
    });

    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xff8533,
      wireframe: true,
    });

    portalWaypoints.forEach((z) => {
      const portal = new THREE.Group();
      portal.position.set(0, 3.2, z);

      const outer = new THREE.Mesh(outerRingGeom, outerRingMat);
      const inner = new THREE.Mesh(innerRingGeom, innerRingMat);

      portal.add(outer);
      portal.add(inner);
      portalsGroup.add(portal);

      portalRings.push({ outer, inner, baseZ: z });
    });
    scene.add(portalsGroup);

    // -------------------------------------------------------------
    // 8. 3D Floating Crystalline Artifacts (Octahedrons & Polyhedrons)
    // -------------------------------------------------------------
    const crystalsGroup = new THREE.Group();
    const icosaGeom = new THREE.IcosahedronGeometry(1.1, 0);
    const icosaMat = new THREE.MeshStandardMaterial({
      color: 0x141824,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0xff4d00,
      emissiveIntensity: 0.5,
      wireframe: true,
    });

    const crystals = [];
    for (let c = 0; c < 12; c++) {
      const mesh = new THREE.Mesh(icosaGeom, icosaMat);
      const side = c % 2 === 0 ? 1 : -1;
      mesh.position.set(
        side * (3.8 + Math.random() * 2.5),
        2.5 + Math.random() * 3.5,
        24 - c * 13
      );
      crystalsGroup.add(mesh);
      crystals.push({
        mesh,
        rotSpeedX: 0.008 + Math.random() * 0.01,
        rotSpeedY: 0.012 + Math.random() * 0.01,
        baseY: mesh.position.y,
        floatFreq: 0.002 + Math.random() * 0.002,
      });
    }
    scene.add(crystalsGroup);

    // -------------------------------------------------------------
    // 9. 3D Roadway with Cyber Grid & Neon Runway Strips
    // -------------------------------------------------------------
    const runwayGroup = new THREE.Group();

    // Central Grid
    const grid = new THREE.GridHelper(240, 90, 0xff4d00, 0x1c1015);
    grid.position.set(0, -1.0, -50);
    runwayGroup.add(grid);

    // Lateral Neon Guide Strips
    const stripGeom = new THREE.BoxGeometry(0.12, 0.08, 220);
    const stripMat = new THREE.MeshBasicMaterial({ color: 0xff3b00 });

    const leftStrip = new THREE.Mesh(stripGeom, stripMat);
    leftStrip.position.set(-4.5, -0.96, -50);
    runwayGroup.add(leftStrip);

    const rightStrip = new THREE.Mesh(stripGeom, stripMat);
    rightStrip.position.set(4.5, -0.96, -50);
    runwayGroup.add(rightStrip);

    scene.add(runwayGroup);

    // -------------------------------------------------------------
    // 10. 3D/2D Animated Flapping Bat Swarm
    // -------------------------------------------------------------
    const batSwarmGroup = new THREE.Group();
    const bats = [];

    const createBatMesh = () => {
      const batObj = new THREE.Group();

      // Wing Shape
      const wingShape = new THREE.Shape();
      wingShape.moveTo(0, 0);
      wingShape.quadraticCurveTo(0.6, 0.4, 1.2, 0.1);
      wingShape.quadraticCurveTo(0.5, -0.2, 0, 0);

      const wingGeom = new THREE.ShapeGeometry(wingShape);
      const wingMat = new THREE.MeshBasicMaterial({ color: 0x090a0e, side: THREE.DoubleSide });

      const leftWing = new THREE.Mesh(wingGeom, wingMat);
      leftWing.scale.set(-1, 1, 1);
      leftWing.position.set(-0.05, 0, 0);

      const rightWing = new THREE.Mesh(wingGeom, wingMat);
      rightWing.position.set(0.05, 0, 0);

      batObj.add(leftWing);
      batObj.add(rightWing);
      batObj.scale.set(0.65, 0.65, 0.65);

      return { batObj, leftWing, rightWing };
    };

    for (let b = 0; b < 14; b++) {
      const { batObj, leftWing, rightWing } = createBatMesh();
      batObj.position.set(
        (Math.random() - 0.5) * 26,
        6 + Math.random() * 7,
        15 - Math.random() * 140
      );
      batSwarmGroup.add(batObj);
      bats.push({
        obj: batObj,
        leftWing,
        rightWing,
        flapSpeed: 0.016 + Math.random() * 0.008,
        flutterOffset: Math.random() * 10,
        driftSpeedX: (Math.random() - 0.5) * 0.02,
        driftSpeedY: (Math.random() - 0.5) * 0.015,
      });
    }
    scene.add(batSwarmGroup);

    // -------------------------------------------------------------
    // 11. Volumetric Ember & Warp Streak Particles
    // -------------------------------------------------------------
    const particleCount = 850;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 42;
      particlePositions[p * 3 + 1] = Math.random() * 16 - 1;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 200 - 30;

      particleVelocities[p * 3] = (Math.random() - 0.5) * 0.03;
      particleVelocities[p * 3 + 1] = 0.015 + Math.random() * 0.03;
      particleVelocities[p * 3 + 2] = (Math.random() - 0.5) * 0.03;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xff7700,
      size: 0.18,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------
    // 12. Resize & Observer
    // -------------------------------------------------------------
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    // -------------------------------------------------------------
    // 13. Render Loop with Smooth Camera Flythrough & Warp
    // -------------------------------------------------------------
    let animationId;
    let targetCameraZ = 38;
    let currentCameraZ = 38;
    let currentCameraY = 3.8;

    const renderLoop = (time) => {
      animationId = requestAnimationFrame(renderLoop);

      if (!isVisibleRef.current) return;

      const p = progressRef.current; // 0 to 1
      const vel = velocityRef.current; // current scroll velocity

      // Camera Flythrough:
      // At p = 0 (Hero): camera is at z = 38, y = 3.8 (high panoramic view)
      // At p = 1 (Games): camera reaches z = -145 (deep subterranean arena)
      targetCameraZ = 38 - p * 180;
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.085;

      // Vertical trajectory: slightly elevates when entering key portals
      const targetY = 2.8 + Math.sin(p * Math.PI * 4) * 0.5;
      currentCameraY += (targetY - currentCameraY) * 0.06;

      // Mouse Parallax Lerp
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      camera.position.z = currentCameraZ;
      camera.position.x = m.x * 1.6;
      camera.position.y = currentCameraY - m.y * 0.7;
      camera.rotation.y = -m.x * 0.06;
      camera.rotation.x = m.y * 0.045;

      // Traveling Point Light follows camera closely
      travelingLight.position.set(camera.position.x, camera.position.y, currentCameraZ - 7);

      // Light color shifts according to active sector
      const sector = sectorRef.current;
      if (sector >= 5) {
        travelingLight.color.setHex(0x00e5ff); // Cyan in arcade
      } else if (sector === 4) {
        travelingLight.color.setHex(0xffd166); // Golden at coronation
      } else if (sector === 3) {
        travelingLight.color.setHex(0x9d4edd); // Purple at war arena
      } else {
        travelingLight.color.setHex(0xff3b00); // Flaming amber-crimson
      }

      // Rotate Concentric Gateway Rings
      portalRings.forEach((pr, idx) => {
        const speed = 0.007 * (idx % 2 === 0 ? 1 : -1);
        pr.outer.rotation.z += speed;
        pr.inner.rotation.z -= speed * 1.4;
      });

      // Rotate Crown Pyramids & Crystals
      crowns.forEach((c, idx) => {
        c.rotation.y += 0.015 * (idx % 2 === 0 ? 1 : -1);
      });

      crystals.forEach((cr) => {
        cr.mesh.rotation.x += cr.rotSpeedX;
        cr.mesh.rotation.y += cr.rotSpeedY;
        cr.mesh.position.y = cr.baseY + Math.sin(time * cr.floatFreq) * 0.35;
      });

      // Pulse Rune Bars
      const pulseFactor = 0.4 + 0.6 * Math.sin(time * 0.0035);
      runes.forEach((r, idx) => {
        r.scale.y = 1 + Math.sin(time * 0.004 + idx) * 0.08;
      });

      // Flap Bats
      bats.forEach((b) => {
        const flap = Math.sin(time * b.flapSpeed + b.flutterOffset) * 0.45;
        b.leftWing.rotation.z = -flap;
        b.rightWing.rotation.z = flap;
        b.obj.position.x += b.driftSpeedX;
        b.obj.position.y += b.driftSpeedY;
      });

      // Drift Particles with Velocity-Based Stretch (Hyperspeed Warp)
      const positions = particleGeom.attributes.position.array;
      const warpStretch = Math.min(vel * 0.08, 1.8);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i * 3 + 1];
        if (positions[i * 3 + 1] > 16) {
          positions[i * 3 + 1] = -1;
        }

        // Slight drift towards camera during rapid scroll
        if (warpStretch > 0.1) {
          positions[i * 3 + 2] += warpStretch * 0.3;
          if (positions[i * 3 + 2] > camera.position.z + 10) {
            positions[i * 3 + 2] = camera.position.z - 120;
          }
        }
      }
      particleGeom.attributes.position.needsUpdate = true;
      particleMat.size = 0.18 + Math.min(vel * 0.01, 0.4);

      renderer.render(scene, camera);
    };

    animationId = requestAnimationFrame(renderLoop);

    // -------------------------------------------------------------
    // Cleanup
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      renderer.dispose();
      moonGeom.dispose();
      moonMat.dispose();
      pillarGeom.dispose();
      pillarMat.dispose();
      runeGeom.dispose();
      runeMaterials.forEach((m) => m.dispose());
      crownGeom.dispose();
      crownMat.dispose();
      outerRingGeom.dispose();
      outerRingMat.dispose();
      innerRingGeom.dispose();
      innerRingMat.dispose();
      icosaGeom.dispose();
      icosaMat.dispose();
      stripGeom.dispose();
      stripMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1, // Behind page text and interactive elements
        overflow: 'hidden',
        // Opacity smoothly increases as user scrolls down past the hero
        opacity: Math.min(1, 0.35 + (scrollProgress / 15) * 0.65),
        transition: 'opacity 0.25s ease-out',
      }}
      aria-hidden="true"
    >
      {/* Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Cyber-Horror Telemetry HUD (Re-The-Drive Style) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(0.75rem, 2.5vw, 2rem)',
          fontFamily: 'monospace',
          color: '#FF4D00',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          opacity: scrollProgress > 3 ? 0.88 : 0.45,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Top HUD Line */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#FF3B00',
                boxShadow: '0 0 8px #FF3B00',
                display: 'inline-block',
                animation: 'pumpkinFlicker 1.5s infinite',
              }}
            />
            <span style={{ color: '#FFFFFF', fontWeight: '800' }}>
              THREE.JS 3D FLYTHROUGH // LIVE
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>|</span>
            <span>{currentSector.coords}</span>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <span>{currentSector.code}</span>
            <span style={{ color: '#FFD166', fontWeight: '800' }}>{currentSector.time}</span>
          </div>
        </div>

        {/* Center Lateral Targeting Brackets */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 'clamp(0.75rem, 3vw, 2.5rem)',
            transform: 'translateY(-50%)',
            borderLeft: '2px solid rgba(255, 77, 0, 0.45)',
            paddingLeft: '12px',
            fontSize: '0.66rem',
            color: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span>DEPTH: -{Math.round(scrollProgress * 2.8)}M</span>
          <span>SPEED: {Math.min(99, Math.round(scrollVelocity * 2.2))} KM/H</span>
          <span style={{ color: '#FF8533' }}>PCE FESTIVAL RUNWAY</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: 'clamp(0.75rem, 3vw, 2.5rem)',
            transform: 'translateY(-50%)',
            borderRight: '2px solid rgba(255, 77, 0, 0.45)',
            paddingRight: '12px',
            textAlign: 'right',
            fontSize: '0.66rem',
            color: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span>ENGINE: 60 FPS</span>
          <span style={{ color: '#FFD166' }}>{currentSector.status}</span>
          <span>WAYPOINT SYNC: OK</span>
        </div>

        {/* Bottom HUD Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ color: '#FFFFFF', fontSize: '0.82rem', fontWeight: '800', letterSpacing: '0.12em' }}>
              {currentSector.label}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.65rem', marginTop: '2px' }}>
              AAVEG 2026 // SCROLL-DRIVEN 3D SPATIAL VOYAGE
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>JOURNEY PROGRESS:</span>
            <span style={{ color: '#FF8533', fontWeight: '900', fontSize: '0.9rem' }}>
              {Math.min(100, Math.round(scrollProgress))}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
