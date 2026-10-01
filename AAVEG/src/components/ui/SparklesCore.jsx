import React, { useRef, useEffect } from 'react';

/**
 * Aceternity UI - SparklesCore Component
 * High-performance canvas particle system rendering floating fire sparks, embers, and gothic stardust.
 */
export default function SparklesCore({
  id = 'tsparticles',
  background = 'transparent',
  minSize = 0.6,
  maxSize = 2.4,
  particleDensity = 60,
  className = '',
  particleColor = '#FF5A14',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.floor((width * height) / (100000 / particleDensity));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.8 - 0.2, // drifting upwards like sparks
        opacity: Math.random() * 0.8 + 0.2,
        pulsing: Math.random() > 0.5,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.pulsing) {
          p.opacity += (Math.random() - 0.5) * 0.04;
          p.opacity = Math.max(0.1, Math.min(1, p.opacity));
        }

        // Wrap around
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = particleColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleColor, minSize, maxSize, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
