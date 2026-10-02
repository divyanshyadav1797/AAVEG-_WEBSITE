import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeScrollExperience Component (Gothic Halloween Edition)
 * Replaces distracting neon sci-fi visuals with an authentic, scary, and atmospheric
 * dark Halloween graveyard experience.
 *
 * Atmospheric Features:
 * - Ominous Blood Moon looming in the misty horizon with creeping clouds
 * - Eerie weathered gothic tombstones, ancient burial crosses & stone obelisks
 * - Sinister flickering Jack-o'-Lanterns (pumpkins) with carved glowing smiles
 * - Silhouetted gnarled dead trees framing the cemetery path
 * - Dense creeping ground fog and slow-drifting ethereal embers
 * - Swarm of dark shadow bats flapping across the moonlit sky
 * - Slow, chilling cinematic camera drift synced to page scroll
 * - Dark, rich, muted Halloween palette (deep charcoals, blood crimson, warm candle embers)
 * - Zero distracting cyber HUD; replaced by a subtle cinematic dark vignette
 * - 100% non-intrusive: soft fog falloff ensures complete readability of foreground text & cards
 */
export default function ThreeScrollExperience({
  scrollProgress = 0, // 0 to 100
  scrollVelocity = 0,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const progressRef = useRef(scrollProgress);
  const velocityRef = useRef(scrollVelocity);
  const isVisibleRef = useRef(true);

  // Synchronize mutable progress without re-renders
  useEffect(() => {
    progressRef.current = scrollProgress / 100;
  }, [scrollProgress]);

  useEffect(() => {
    velocityRef.current = scrollVelocity;
  }, [scrollVelocity]);

  // Subtle Mouse Parallax Listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: window.devicePixelRatio <= 1.5,
      alpha: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;

    // 2. Scene & Deep Halloween Fog
    const scene = new THREE.Scene();
    // Deep, ominous charcoal fog that conceals distant objects and enhances spookiness
    scene.fog = new THREE.FogExp2(0x040508, 0.019);

    // 3. Camera
    const camera = new THREE.PerspectiveCamera(
      56,
      window.innerWidth / window.innerHeight,
      0.1,
      240
    );
    camera.position.set(0, 2.8, 32);

    // 4. Atmospheric Halloween Lighting
    // Subtle cool midnight moonlight ambient
    const ambientLight = new THREE.AmbientLight(0x0c1018, 1.1);
    scene.add(ambientLight);

    // Pale, eerie silver moonlight from behind
    const moonLight = new THREE.DirectionalLight(0x556688, 1.4);
    moonLight.position.set(-6, 18, -30);
    scene.add(moonLight);

    // Ominous warm ember rim light
    const bloodLight = new THREE.DirectionalLight(0x8a1505, 1.6);
    bloodLight.position.set(8, 12, 10);
    scene.add(bloodLight);

    // Traveling candle flame following camera
    const candleLight = new THREE.PointLight(0xff5500, 2.2, 35, 1.8);
    candleLight.position.set(0, 2, 28);
    scene.add(candleLight);

    // -------------------------------------------------------------
    // 5. Ominous Blood Moon in Horizon
    // -------------------------------------------------------------
    const createBloodMoonTexture = () => {
      const size = 512;
      const moonCanvas = document.createElement('canvas');
      moonCanvas.width = size;
      moonCanvas.height = size;
      const ctx = moonCanvas.getContext('2d');

      // Deep Blood Corona
      const grad = ctx.createRadialGradient(size / 2, size / 2, 80, size / 2, size / 2, size / 2);
      grad.addColorStop(0, '#FFE3D0');
      grad.addColorStop(0.2, '#FF5000');
      grad.addColorStop(0.55, '#800A02');
      grad.addColorStop(0.8, 'rgba(90, 5, 0, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Sinister Dark Craters
      ctx.fillStyle = 'rgba(15, 3, 2, 0.55)';
      const craters = [
        { x: 215, y: 210, r: 48 },
        { x: 290, y: 195, r: 38 },
        { x: 310, y: 280, r: 54 },
        { x: 185, y: 315, r: 42 },
        { x: 245, y: 295, r: 32 },
        { x: 260, y: 240, r: 24 },
      ];
      craters.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      return new THREE.CanvasTexture(moonCanvas);
    };

    const moonTexture = createBloodMoonTexture();
    const moonGeom = new THREE.PlaneGeometry(38, 38);
    const moonMat = new THREE.MeshBasicMaterial({
      map: moonTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const moonMesh = new THREE.Mesh(moonGeom, moonMat);
    moonMesh.position.set(0, 24, -170);
    scene.add(moonMesh);

    // -------------------------------------------------------------
    // 6. Damp Cemetery Ground Plane with Dark Mist
    // -------------------------------------------------------------
    const groundGeom = new THREE.PlaneGeometry(80, 260, 32, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x07080b,
      roughness: 0.95,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.6, -60);
    scene.add(ground);

    // -------------------------------------------------------------
    // 7. Weathered Gothic Gravestones & Ancient Burial Crosses
    // -------------------------------------------------------------
    const cemeteryGroup = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.95,
      metalness: 0.15,
    });

    const mossyStoneMat = new THREE.MeshStandardMaterial({
      color: 0x181a17,
      roughness: 0.9,
      metalness: 0.1,
    });

    const slabGeom = new THREE.BoxGeometry(1.2, 2.2, 0.4);
    const crossVertGeom = new THREE.BoxGeometry(0.35, 2.6, 0.35);
    const crossHorizGeom = new THREE.BoxGeometry(1.4, 0.35, 0.35);
    const obeliskGeom = new THREE.ConeGeometry(0.7, 4.5, 4);

    const numGraves = 36;
    for (let g = 0; g < numGraves; g++) {
      const zPos = 26 - g * 5.2;
      const isLeft = g % 2 === 0;
      const xPos = (isLeft ? -1 : 1) * (4.2 + Math.random() * 3.5);
      const graveType = g % 3;

      const grave = new THREE.Group();
      grave.position.set(xPos, 0.5, zPos);

      // Crooked angle for ancient weathered cemetery look
      grave.rotation.y = (Math.random() - 0.5) * 0.4;
      grave.rotation.z = (Math.random() - 0.5) * 0.15;
      grave.rotation.x = (Math.random() - 0.5) * 0.1;

      if (graveType === 0) {
        // Arch-topped burial stone
        const slab = new THREE.Mesh(slabGeom, stoneMat);
        grave.add(slab);
      } else if (graveType === 1) {
        // Ancient Cemetery Cross
        const vert = new THREE.Mesh(crossVertGeom, mossyStoneMat);
        const horiz = new THREE.Mesh(crossHorizGeom, mossyStoneMat);
        horiz.position.set(0, 0.4, 0);
        grave.add(vert);
        grave.add(horiz);
      } else {
        // Gothic Spire / Obelisk
        const obelisk = new THREE.Mesh(obeliskGeom, stoneMat);
        obelisk.position.set(0, 1.2, 0);
        grave.add(obelisk);
      }

      cemeteryGroup.add(grave);
    }
    scene.add(cemeteryGroup);

    // -------------------------------------------------------------
    // 8. Sinister Flickering Jack-o'-Lanterns (Halloween Pumpkins)
    // -------------------------------------------------------------
    const pumpkinGroup = new THREE.Group();
    const pumpkinLights = [];

    const createCarvedPumpkinFace = () => {
      const size = 256;
      const pCanvas = document.createElement('canvas');
      pCanvas.width = size;
      pCanvas.height = size;
      const pCtx = pCanvas.getContext('2d');

      // Base weathered ribbed pumpkin skin
      pCtx.fillStyle = '#9e3a00';
      pCtx.fillRect(0, 0, size, size);

      // Vertical pumpkin ribs
      pCtx.fillStyle = '#5c1e00';
      for (let r = 0; r < size; r += 28) {
        pCtx.fillRect(r, 0, 5, size);
      }

      // Glowing carved face in fiery amber
      pCtx.fillStyle = '#FFE270';
      pCtx.shadowColor = '#FF3B00';
      pCtx.shadowBlur = 12;

      // Left Eye (Angular sinister triangle)
      pCtx.beginPath();
      pCtx.moveTo(70, 95);
      pCtx.lineTo(105, 75);
      pCtx.lineTo(100, 115);
      pCtx.closePath();
      pCtx.fill();

      // Right Eye
      pCtx.beginPath();
      pCtx.moveTo(186, 95);
      pCtx.lineTo(151, 75);
      pCtx.lineTo(156, 115);
      pCtx.closePath();
      pCtx.fill();

      // Nose
      pCtx.beginPath();
      pCtx.moveTo(128, 125);
      pCtx.lineTo(118, 145);
      pCtx.lineTo(138, 145);
      pCtx.closePath();
      pCtx.fill();

      // Sinister jagged toothy smile
      pCtx.beginPath();
      pCtx.moveTo(60, 165);
      pCtx.lineTo(80, 185);
      pCtx.lineTo(95, 170);
      pCtx.lineTo(110, 192);
      pCtx.lineTo(128, 172);
      pCtx.lineTo(146, 192);
      pCtx.lineTo(161, 170);
      pCtx.lineTo(176, 185);
      pCtx.lineTo(196, 165);
      pCtx.lineTo(180, 205);
      pCtx.lineTo(146, 215);
      pCtx.lineTo(128, 202);
      pCtx.lineTo(110, 215);
      pCtx.lineTo(76, 205);
      pCtx.closePath();
      pCtx.fill();

      return new THREE.CanvasTexture(pCanvas);
    };

    const pumpkinTex = createCarvedPumpkinFace();
    const pumpkinGeom = new THREE.SphereGeometry(0.65, 16, 16);
    // Squash slightly for pumpkin shape
    pumpkinGeom.scale(1.15, 0.9, 1.05);

    const pumpkinMat = new THREE.MeshStandardMaterial({
      map: pumpkinTex,
      roughness: 0.85,
      metalness: 0.1,
      emissive: 0xff3b00,
      emissiveIntensity: 0.7,
    });

    const stemGeom = new THREE.CylinderGeometry(0.06, 0.08, 0.35, 6);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x1f2e14, roughness: 0.9 });

    // Place 10 pumpkins along the edges of the pathway
    for (let p = 0; p < 10; p++) {
      const zPos = 20 - p * 18;
      const isLeft = p % 2 === 0;
      const xPos = (isLeft ? -1 : 1) * (3.6 + (p % 3) * 0.6);

      const pumpkin = new THREE.Group();
      pumpkin.position.set(xPos, 0.0, zPos);
      pumpkin.rotation.y = (isLeft ? 0.35 : -0.35) + (Math.random() - 0.5) * 0.3;

      const pMesh = new THREE.Mesh(pumpkinGeom, pumpkinMat);
      pMesh.position.y = 0.45;
      pumpkin.add(pMesh);

      const stem = new THREE.Mesh(stemGeom, stemMat);
      stem.position.set(0, 0.95, 0);
      stem.rotation.z = 0.2;
      pumpkin.add(stem);

      pumpkinGroup.add(pumpkin);

      // Flickering candlelight inside each pumpkin
      const pLight = new THREE.PointLight(0xff5500, 1.4, 9, 2);
      pLight.position.set(xPos, 0.6, zPos);
      scene.add(pLight);
      pumpkinLights.push({ light: pLight, baseIntensity: 1.4, flickerSeed: Math.random() * 50 });
    }
    scene.add(pumpkinGroup);

    // -------------------------------------------------------------
    // 9. Silhouetted Gnarled Dead Trees
    // -------------------------------------------------------------
    const treeGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      roughness: 0.95,
      metalness: 0.05,
    });

    const createSpookyTree = () => {
      const tree = new THREE.Group();

      // Main gnarled trunk
      const trunkGeom = new THREE.CylinderGeometry(0.35, 0.75, 7.5, 7);
      const trunk = new THREE.Mesh(trunkGeom, woodMat);
      trunk.position.y = 3.5;
      trunk.rotation.z = (Math.random() - 0.5) * 0.15;
      tree.add(trunk);

      // Menacing branches reaching out
      const branchGeom = new THREE.CylinderGeometry(0.12, 0.25, 3.2, 5);

      const branch1 = new THREE.Mesh(branchGeom, woodMat);
      branch1.position.set(0.8, 5.2, 0);
      branch1.rotation.z = -0.7;
      branch1.rotation.y = 0.4;
      tree.add(branch1);

      const branch2 = new THREE.Mesh(branchGeom, woodMat);
      branch2.position.set(-0.9, 4.6, 0);
      branch2.rotation.z = 0.8;
      branch2.rotation.y = -0.3;
      tree.add(branch2);

      const branch3 = new THREE.Mesh(branchGeom, woodMat);
      branch3.position.set(0, 6.2, 0.6);
      branch3.rotation.x = 0.6;
      branch3.rotation.z = 0.3;
      tree.add(branch3);

      return tree;
    };

    // Plant 12 sinister dead trees along the outer perimeter
    for (let t = 0; t < 12; t++) {
      const zPos = 24 - t * 15;
      const isLeft = t % 2 === 0;
      const xPos = (isLeft ? -1 : 1) * (8.5 + Math.random() * 4);

      const tree = createSpookyTree();
      tree.position.set(xPos, 0, zPos);
      tree.rotation.y = Math.random() * Math.PI * 2;
      treeGroup.add(tree);
    }
    scene.add(treeGroup);

    // -------------------------------------------------------------
    // 10. Swarm of Shadow Bats Flapping in the Night Sky
    // -------------------------------------------------------------
    const batGroup = new THREE.Group();
    const bats = [];

    const createBat = () => {
      const batObj = new THREE.Group();
      const wingShape = new THREE.Shape();
      wingShape.moveTo(0, 0);
      wingShape.quadraticCurveTo(0.6, 0.4, 1.2, 0.1);
      wingShape.quadraticCurveTo(0.5, -0.2, 0, 0);

      const wingGeom = new THREE.ShapeGeometry(wingShape);
      const wingMat = new THREE.MeshBasicMaterial({ color: 0x06070a, side: THREE.DoubleSide });

      const leftWing = new THREE.Mesh(wingGeom, wingMat);
      leftWing.scale.set(-1, 1, 1);
      leftWing.position.set(-0.05, 0, 0);

      const rightWing = new THREE.Mesh(wingGeom, wingMat);
      rightWing.position.set(0.05, 0, 0);

      batObj.add(leftWing);
      batObj.add(rightWing);
      batObj.scale.set(0.6, 0.6, 0.6);

      return { batObj, leftWing, rightWing };
    };

    for (let b = 0; b < 16; b++) {
      const { batObj, leftWing, rightWing } = createBat();
      batObj.position.set(
        (Math.random() - 0.5) * 28,
        5.5 + Math.random() * 6.5,
        18 - Math.random() * 150
      );
      batGroup.add(batObj);
      bats.push({
        obj: batObj,
        leftWing,
        rightWing,
        flapSpeed: 0.014 + Math.random() * 0.008,
        flutterOffset: Math.random() * 20,
        driftX: (Math.random() - 0.5) * 0.018,
        driftY: (Math.random() - 0.5) * 0.012,
      });
    }
    scene.add(batGroup);

    // -------------------------------------------------------------
    // 11. Low-Lying Graveyard Fog & Ethereal Drifting Embers
    // -------------------------------------------------------------
    const emberCount = 550;
    const emberGeom = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities = new Float32Array(emberCount * 3);

    for (let e = 0; e < emberCount; e++) {
      emberPositions[e * 3] = (Math.random() - 0.5) * 36;
      emberPositions[e * 3 + 1] = Math.random() * 8 - 0.5; // Stays close to ground and mid-air
      emberPositions[e * 3 + 2] = (Math.random() - 0.5) * 190 - 30;

      emberVelocities[e * 3] = (Math.random() - 0.5) * 0.012;
      emberVelocities[e * 3 + 1] = 0.008 + Math.random() * 0.016; // Gentle rising drift
      emberVelocities[e * 3 + 2] = (Math.random() - 0.5) * 0.012;
    }

    emberGeom.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xff6600,
      size: 0.16,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const embers = new THREE.Points(emberGeom, emberMat);
    scene.add(embers);

    // -------------------------------------------------------------
    // 12. Resize & Intersection Observer
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
    // 13. Haunting Cinematic Camera Tracking Loop
    // -------------------------------------------------------------
    let animationId;
    let targetCameraZ = 32;
    let currentCameraZ = 32;
    let currentCameraY = 2.8;

    const renderLoop = (time) => {
      animationId = requestAnimationFrame(renderLoop);

      if (!isVisibleRef.current) return;

      const p = progressRef.current; // 0 to 1

      // Chilling, grounded camera progression through the haunted graveyard
      // At p = 0 (Hero): camera is perched at z = 32
      // At p = 1 (Arcade): camera glides to z = -140
      targetCameraZ = 32 - p * 172;
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.06;

      // Slight natural head-bob walking sensation
      const targetY = 2.4 + Math.sin(p * Math.PI * 6) * 0.3;
      currentCameraY += (targetY - currentCameraY) * 0.05;

      // Subtle, non-distracting mouse parallax
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.04;
      m.y += (m.targetY - m.y) * 0.04;

      camera.position.z = currentCameraZ;
      camera.position.x = m.x * 1.2;
      camera.position.y = currentCameraY - m.y * 0.45;
      camera.rotation.y = -m.x * 0.035;
      camera.rotation.x = m.y * 0.025;

      // Candle follows near camera
      candleLight.position.set(camera.position.x, camera.position.y - 0.4, currentCameraZ - 6);

      // Candlelight subtle realistic flicker
      candleLight.intensity = 2.0 + Math.sin(time * 0.012) * 0.35 + (Math.random() - 0.5) * 0.15;

      // Pumpkin Lanterns flickering candle flame
      pumpkinLights.forEach((pl) => {
        const flicker = Math.sin(time * 0.015 + pl.flickerSeed) * 0.4 + (Math.random() - 0.5) * 0.2;
        pl.light.intensity = Math.max(0.6, pl.baseIntensity + flicker);
      });

      // Bats gentle flapping & gliding
      bats.forEach((b) => {
        const flap = Math.sin(time * b.flapSpeed + b.flutterOffset) * 0.45;
        b.leftWing.rotation.z = -flap;
        b.rightWing.rotation.z = flap;
        b.obj.position.x += b.driftX;
        b.obj.position.y += b.driftY;
      });

      // Ethereal rising embers drift calmly
      const pos = emberGeom.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        pos[i * 3 + 1] += emberVelocities[i * 3 + 1];
        if (pos[i * 3 + 1] > 8.5) {
          pos[i * 3 + 1] = -0.5;
        }
      }
      emberGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animationId = requestAnimationFrame(renderLoop);

    // -------------------------------------------------------------
    // Cleanup Resources
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      renderer.dispose();
      moonGeom.dispose();
      moonMat.dispose();
      groundGeom.dispose();
      groundMat.dispose();
      slabGeom.dispose();
      crossVertGeom.dispose();
      crossHorizGeom.dispose();
      obeliskGeom.dispose();
      stoneMat.dispose();
      mossyStoneMat.dispose();
      pumpkinGeom.dispose();
      pumpkinMat.dispose();
      stemGeom.dispose();
      stemMat.dispose();
      emberGeom.dispose();
      emberMat.dispose();
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
        zIndex: 1, // Deep behind all foreground text & cards
        overflow: 'hidden',
        // Smoothly blends in from the hero downwards
        opacity: Math.min(0.9, 0.4 + (scrollProgress / 20) * 0.5),
        transition: 'opacity 0.3s ease-out',
      }}
      aria-hidden="true"
    >
      {/* Three.js Canvas */}
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

      {/* Atmospheric Cinematic Horror Vignette (Zero Distraction, Pure Mood) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(3, 4, 7, 0.65) 75%, #030407 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ultra-subtle Gothic Atmospheric Watermark in bottom corner (unobtrusive) */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          right: '1.5rem',
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'rgba(255, 77, 0, 0.45)',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        AAVEG 2026 • HAUNTED HOUSES SAGA
      </div>
    </div>
  );
}
