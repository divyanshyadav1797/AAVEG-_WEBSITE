import React, { useEffect, useRef } from 'react';

/**
 * Realistic Fire Embers, Occult Ash Flecks, and Graveyard Spectral Wisps
 * Simulated with organic upward thermal convection, air turbulence, and cooling decay.
 */
export default function FloatingParticles({ count = 42 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Particle pool: 85% embers/ash, 15% slow ghostly spectral wisps
    const particles = [];
    const emberTints = [
      { r: 255, g: 75, b: 0 },
      { r: 255, g: 125, b: 20 },
      { r: 255, g: 175, b: 60 },
      { r: 220, g: 40, b: 10 },
      { r: 180, g: 30, b: 5 },
    ];

    for (let i = 0; i < count; i++) {
      const isSpectral = i % 8 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        isSpectral,
        size: isSpectral ? Math.random() * 3.5 + 2 : Math.random() * 2.2 + 0.8,
        speedY: isSpectral ? Math.random() * 0.25 + 0.15 : Math.random() * 0.85 + 0.35,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmp: isSpectral ? Math.random() * 1.5 + 0.8 : Math.random() * 0.8 + 0.4,
        swayPhase: Math.random() * Math.PI * 2,
        color: isSpectral ? { r: 140, g: 180, b: 255 } : emberTints[Math.floor(Math.random() * emberTints.length)],
        opacity: Math.random() * 0.6 + 0.3,
        flickerSpeed: Math.random() * 0.06 + 0.02,
        flickerPhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.swayPhase += p.swaySpeed;
        p.flickerPhase += p.flickerSpeed;
        p.x += Math.sin(p.swayPhase) * p.swayAmp;

        // Reset particle when it floats past screen top
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const flicker = 0.5 + 0.5 * Math.sin(p.flickerPhase);
        const currentAlpha = p.opacity * flicker;

        ctx.save();
        if (p.isSpectral) {
          // Ghostly Will-o'-the-wisp orb with soft radial aura
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.7})`);
          grad.addColorStop(0.5, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.2})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Realistic elongated burning ember fleck
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 0.6, p.size * 1.4, Math.sin(time + i) * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.85})`;
          ctx.shadowColor = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`;
          ctx.shadowBlur = 6;
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-layer-particles pointer-events-none"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 12,
        pointerEvents: 'none',
      }}
    />
  );
}
