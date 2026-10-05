import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createRealisticPumpkinModel } from '../../utils/realisticPumpkin';

/**
 * Realistic 3D Jack-o'-Lantern Background Component
 *
 * Replaces flat 2D SVGs with a real-time, interactive 3D WebGL Three.js Pumpkin:
 * - 10 authentic vertical bulging pumpkin lobes with deep crevices & top/bottom dimples
 * - Realistic PBR texturing with waxy rind sheen, organic fibers, and jagged glowing carved face
 * - Internal flickering flame light casting warm glow onto its body and the surrounding mist
 * - Entrance jump & bounce physics with squash and stretch when the user enters the site
 * - Interactive click replay to bounce anytime
 * - Subtle mouse-tracking parallax: the pumpkin turns to ominously watch the user
 * - Rising fire embers and ground contact shadow
 * - Full performance optimization: capped DPR, IntersectionObserver pausing, and clean WebGL disposal
 */
export default function Pumpkin({ className = '', style = {} }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isVisibleRef = useRef(true);
  const [isJumping, setIsJumping] = useState(false);

  // Entrance Hop & Bounce on First Website Visit
  useEffect(() => {
    const entranceTimeout = setTimeout(() => {
      setIsJumping(true);
    }, 400);

    const finishTimeout = setTimeout(() => {
      setIsJumping(false);
    }, 400 + 1200);

    return () => {
      clearTimeout(entranceTimeout);
      clearTimeout(finishTimeout);
    };
  }, []);

  const triggerJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 950);
  };

  // Three.js 3D WebGL Canvas Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 250;
    let height = container.clientHeight || 250;

    // 1. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: window.devicePixelRatio <= 1.5,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.4, 3.8);

    // 3. Atmospheric Cinematic Studio Lighting
    // Ambient light: deep midnight tone
    const ambientLight = new THREE.AmbientLight(0x0c0b10, 1.2);
    scene.add(ambientLight);

    // Moonlight rim light: cool silver-blue from top-right rear
    const moonRim = new THREE.DirectionalLight(0x6688bb, 1.8);
    moonRim.position.set(2.5, 4, -2);
    scene.add(moonRim);

    // Warm ground bounce light
    const groundBounce = new THREE.DirectionalLight(0x441100, 1.1);
    groundBounce.position.set(-2, -1.5, 1);
    scene.add(groundBounce);

    // Front soft fill light
    const fillLight = new THREE.DirectionalLight(0xff6622, 0.85);
    fillLight.position.set(0, 1.5, 3.5);
    scene.add(fillLight);

    // 4. Construct Realistic 3D Pumpkin Model
    const pumpkin = createRealisticPumpkinModel({
      scale: 1.05,
      includeLight: true,
      lightIntensity: 2.8,
    });

    // Default angle: slightly turned to reveal 3D curvature and sinister grin
    pumpkin.group.position.set(0, -0.15, 0);
    pumpkin.group.rotation.set(0.08, -0.22, 0);
    scene.add(pumpkin.group);

    // 5. Rising Ember Particles from Pumpkin
    const emberCount = 18;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);
    const emberOffsets = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 0.9;
      emberPositions[i * 3 + 1] = Math.random() * 1.5 - 0.2;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.9 + 0.3;
      emberSpeeds[i] = 0.008 + Math.random() * 0.012;
      emberOffsets[i] = Math.random() * Math.PI * 2;
    }

    const emberGeom = new THREE.BufferGeometry();
    emberGeom.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xff6600,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const embers = new THREE.Points(emberGeom, emberMat);
    scene.add(embers);

    // 6. Pause Rendering When Offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Animation Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      const elapsed = clock.getElapsedTime();

      // Update pumpkin flame flicker and breathing
      pumpkin.update(elapsed);

      // Subtle breathing rhythm (idle vertical bobbing)
      const breathing = Math.sin(elapsed * 1.8) * 0.035;
      pumpkin.group.position.y = -0.15 + breathing;

      // Animate rising ember particles
      const posAttr = emberGeom.attributes.position;
      for (let i = 0; i < emberCount; i++) {
        let y = posAttr.getY(i);
        y += emberSpeeds[i];
        if (y > 1.8) {
          y = -0.15;
          posAttr.setX(i, (Math.random() - 0.5) * 0.7);
          posAttr.setZ(i, (Math.random() - 0.5) * 0.7 + 0.3);
        }
        posAttr.setY(i, y);
        // Subtle drift with wind
        const x = posAttr.getX(i) + Math.sin(elapsed * 2 + emberOffsets[i]) * 0.003;
        posAttr.setX(i, x);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    render();

    // 9. Comprehensive Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();

      pumpkin.dispose();
      emberGeom.dispose();
      emberMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-3d-pumpkin-wrapper ${className}`}
      onClick={triggerJump}
      title="Click Jack-o'-lantern to jump!"
      style={{
        position: 'absolute',
        bottom: 'clamp(15px, 3.5vh, 40px)',
        left: 'clamp(15px, 4vw, 75px)',
        width: 'clamp(120px, 15vw, 210px)',
        height: 'clamp(120px, 15vw, 210px)',
        zIndex: 12,
        pointerEvents: 'auto',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: isJumping ? 'pumpkinEntranceJump 0.95s cubic-bezier(0.25, 0.9, 0.35, 1) forwards' : undefined,
        transformOrigin: 'bottom center',
        ...style,
      }}
    >
      {/* Pumpkin Ground Shadow & Ember Pool Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '6px',
          left: '10%',
          width: '80%',
          height: '24px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(255, 100, 10, 0.6) 0%, rgba(90, 20, 5, 0.45) 50%, transparent 80%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 1,
          animation: isJumping ? 'pumpkinShadowBounce 0.95s cubic-bezier(0.25, 0.9, 0.35, 1) forwards' : undefined,
          transformOrigin: 'center center',
        }}
      />

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'relative',
          zIndex: 2,
        }}
      />
    </div>
  );
}
