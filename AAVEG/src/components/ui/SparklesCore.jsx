import React, { useRef, useEffect } from 'react';

/**
 * Aceternity UI - SparklesCore Component
 * High-performance canvas particle system rendering floating fire sparks, embers, and gothic stardust.
 * Optimized with IntersectionObserver and CPU-friendly multi-pass drawing.
 */
export default function SparklesCore({
  id = 'tsparticles',
  minSize = 0.6,
  maxSize = 2.4,
  particleDensity = 30,
  className = '',
  particleColor = '#FF5A14',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Pause when offscreen to preserve 60fps on mobile
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
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Capped particle count for buttery 60fps on any mobile GPU
    const rawCount = Math.floor((width * height) / (100000 / particleDensity));
    const particleCount = Math.min(Math.max(rawCount, 12), 32);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.7 - 0.2, // drifting upwards like sparks
        opacity: Math.random() * 0.7 + 0.3,
        pulsing: Math.random() > 0.5,
      });
    }

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.pulsing) {
          p.opacity += (Math.random() - 0.5) * 0.03;
          p.opacity = Math.max(0.15, Math.min(0.95, p.opacity));
        }

        // Wrap around seamlessly
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Outer glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity * 0.3;
        ctx.fill();

        // Inner bright spark core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = p.opacity * 0.85;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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

