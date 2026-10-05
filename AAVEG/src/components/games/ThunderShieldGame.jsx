import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Shield, Zap, RotateCcw, Volume2, VolumeX, Trophy, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * THUNDER SHIELD Mini-Game
 * Defend the central vampire bat from incoming attacking shadow entities using an electric rotating shield.
 * Endless single-player arcade game with local high scores.
 */
export default function ThunderShieldGame({ onClose }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('aaveg_thundershield_highscore') || '0', 10);
  });
  const [lives, setLives] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // References for mutable game loop state to avoid re-renders during 60fps loop
  const gameRef = useRef({
    angle: 0, // Shield angle in radians
    shieldRadius: 65,
    shieldArc: Math.PI / 2.2, // ~80 degrees coverage
    batRadius: 24,
    entities: [],
    particles: [],
    spawnTimer: 0,
    spawnInterval: 65,
    speedMultiplier: 1.0,
    score: 0,
    lives: 3,
    highScore: 0,
    keys: { left: false, right: false },
    mousePos: { x: 0, y: 0 },
    animationId: null,
    lastTime: 0,
  });

  // Keep high score ref synced
  useEffect(() => {
    gameRef.current.highScore = highScore;
  }, [highScore]);

  // Audio synthesize with Web Audio API for zero-dependency retro sounds
  const playSound = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === 'hit') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'deflect') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(980, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'gameover') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // AudioContext fallback
    }
  }, [soundEnabled]);

  // Start / Restart Game
  const startGame = () => {
    const g = gameRef.current;
    g.entities = [];
    g.particles = [];
    g.spawnTimer = 0;
    g.speedMultiplier = 1.0;
    g.score = 0;
    g.lives = 3;
    setScore(0);
    setLives(3);
    setGameState('playing');
  };

  // Keyboard navigation for rotation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameRef.current.keys.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameRef.current.keys.right = true;
      }
      if (e.key === 'Escape') {
        onClose?.();
      }
      if (e.code === 'Space' && gameState !== 'playing') {
        startGame();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameRef.current.keys.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameRef.current.keys.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, onClose]);

  // Pointer / Mouse / Touch rotation tracking
  const updatePointerAngle = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    gameRef.current.angle = Math.atan2(dy, dx);
  };

  const handleMouseMove = (e) => {
    updatePointerAngle(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updatePointerAngle(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Handle high DPI retina screens
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.min(window.innerWidth - 32, 680);
      const height = Math.min(window.innerHeight - 180, 580);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId;

    const gameLoop = (timestamp) => {
      const g = gameRef.current;
      const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear frame with atmospheric night gradient
      ctx.fillStyle = '#06080D';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle radar concentric circles
      ctx.strokeStyle = 'rgba(255, 77, 0, 0.08)';
      ctx.lineWidth = 1;
      for (let r = 80; r < Math.max(width, height) / 1.4; r += 70) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Handle Keyboard Shield Movement
      if (g.keys.left) g.angle -= 0.065;
      if (g.keys.right) g.angle += 0.065;

      // Draw Central Bat Avatar
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ambient bat aura
      const pulse = 1 + Math.sin(timestamp * 0.005) * 0.08;
      const auraGradient = ctx.createRadialGradient(0, 0, 5, 0, 0, 40 * pulse);
      auraGradient.addColorStop(0, 'rgba(255, 77, 0, 0.4)');
      auraGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 40 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Wing flapping animation
      const wingFlap = Math.sin(timestamp * 0.012) * 8;

      // Bat wings
      ctx.fillStyle = '#1A1822';
      ctx.strokeStyle = '#FF4D00';
      ctx.lineWidth = 1.5;

      // Left wing
      ctx.beginPath();
      ctx.moveTo(-4, 0);
      ctx.quadraticCurveTo(-26, -18 + wingFlap, -34, 4 + wingFlap);
      ctx.quadraticCurveTo(-20, 16, -6, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right wing
      ctx.beginPath();
      ctx.moveTo(4, 0);
      ctx.quadraticCurveTo(26, -18 + wingFlap, 34, 4 + wingFlap);
      ctx.quadraticCurveTo(20, 16, 6, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Bat head & ears
      ctx.fillStyle = '#0F1015';
      ctx.beginPath();
      ctx.arc(0, 2, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ears
      ctx.beginPath();
      ctx.moveTo(-7, -4);
      ctx.lineTo(-11, -15);
      ctx.lineTo(-3, -8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(7, -4);
      ctx.lineTo(11, -15);
      ctx.lineTo(3, -8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Eyes
      ctx.fillStyle = '#FF2D00';
      ctx.shadowColor = '#FF4D00';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(-3, 0, 2, 0, Math.PI * 2);
      ctx.arc(3, 0, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      // Draw Rotating Electric Thunder Shield Arc
      const shieldStart = g.angle - g.shieldArc / 2;
      const shieldEnd = g.angle + g.shieldArc / 2;

      ctx.save();
      // Outer glow
      ctx.strokeStyle = '#FF4D00';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#FF8533';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(centerX, centerY, g.shieldRadius, shieldStart, shieldEnd);
      ctx.stroke();

      // Core electric lightning filament
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, g.shieldRadius, shieldStart, shieldEnd);
      ctx.stroke();

      // Electric spark arcs at tips
      const tip1X = centerX + Math.cos(shieldStart) * g.shieldRadius;
      const tip1Y = centerY + Math.sin(shieldStart) * g.shieldRadius;
      const tip2X = centerX + Math.cos(shieldEnd) * g.shieldRadius;
      const tip2Y = centerY + Math.sin(shieldEnd) * g.shieldRadius;

      ctx.fillStyle = '#FFF';
      ctx.beginPath();
      ctx.arc(tip1X, tip1Y, 3.5, 0, Math.PI * 2);
      ctx.arc(tip2X, tip2Y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (gameState === 'playing') {
        // Spawn Enemies
        g.spawnTimer++;
        if (g.spawnTimer >= Math.max(25, g.spawnInterval - Math.floor(g.score / 60))) {
          g.spawnTimer = 0;
          // Spawn from outer perimeter
          const spawnAngle = Math.random() * Math.PI * 2;
          const spawnDist = Math.max(width, height) / 1.3;
          const speed = (1.6 + Math.random() * 1.0) * (1 + g.score * 0.003);

          // Random enemy type: 'specter' | 'fireball' | 'shadow'
          const types = ['specter', 'fireball', 'shadow'];
          const type = types[Math.floor(Math.random() * types.length)];

          g.entities.push({
            x: centerX + Math.cos(spawnAngle) * spawnDist,
            y: centerY + Math.sin(spawnAngle) * spawnDist,
            vx: -Math.cos(spawnAngle) * speed,
            vy: -Math.sin(spawnAngle) * speed,
            type,
            radius: type === 'specter' ? 12 : 10,
            color: type === 'specter' ? '#A855F7' : type === 'fireball' ? '#FF3B00' : '#38BDF8',
          });
        }

        // Update & Draw Entities
        for (let i = g.entities.length - 1; i >= 0; i--) {
          const e = g.entities[i];
          e.x += e.vx;
          e.y += e.vy;

          const dx = e.x - centerX;
          const dy = e.y - centerY;
          const distToCenter = Math.hypot(dx, dy);
          const entityAngle = Math.atan2(dy, dx);

          // Normalize angle differences between -PI and PI
          let angleDiff = entityAngle - g.angle;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

          // Check Shield Collision
          if (
            distToCenter <= g.shieldRadius + e.radius &&
            distToCenter >= g.shieldRadius - e.radius - 8 &&
            Math.abs(angleDiff) <= g.shieldArc / 2 + 0.15
          ) {
            // Deflected by Thunder Shield!
            playSound('deflect');
            g.score += 10;
            setScore(g.score);

            // Create Spark Burst
            for (let p = 0; p < 12; p++) {
              const pAngle = Math.random() * Math.PI * 2;
              const pSpeed = 2 + Math.random() * 4;
              g.particles.push({
                x: e.x,
                y: e.y,
                vx: Math.cos(pAngle) * pSpeed,
                vy: Math.sin(pAngle) * pSpeed,
                life: 1.0,
                color: '#FF8533',
                size: 2.5 + Math.random() * 2,
              });
            }

            g.entities.splice(i, 1);
            continue;
          }

          // Check Bat Collision (Center Hit)
          if (distToCenter <= g.batRadius + e.radius) {
            playSound('hit');
            g.lives--;
            setLives(g.lives);

            // Damage burst
            for (let p = 0; p < 16; p++) {
              const pAngle = Math.random() * Math.PI * 2;
              const pSpeed = 3 + Math.random() * 5;
              g.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(pAngle) * pSpeed,
                vy: Math.sin(pAngle) * pSpeed,
                life: 1.0,
                color: '#EF4444',
                size: 3 + Math.random() * 3,
              });
            }

            g.entities.splice(i, 1);

            if (g.lives <= 0) {
              playSound('gameover');
              setGameState('gameover');
              if (g.score > g.highScore) {
                setHighScore(g.score);
                localStorage.setItem('aaveg_thundershield_highscore', String(g.score));
                confetti({
                  particleCount: 50,
                  spread: 70,
                  origin: { y: 0.6 },
                });
              }
            }
            continue;
          }

          // Render Entity
          ctx.save();
          ctx.fillStyle = e.color;
          ctx.shadowColor = e.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();

          // Spooky core
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Update & Render Particles
        for (let p = g.particles.length - 1; p >= 0; p--) {
          const part = g.particles[p];
          part.x += part.vx;
          part.y += part.vy;
          part.life -= 0.035;

          if (part.life <= 0) {
            g.particles.splice(p, 1);
            continue;
          }

          ctx.fillStyle = part.color;
          ctx.globalAlpha = part.life;
          ctx.beginPath();
          ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameState, soundEnabled, playSound]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 4, 7, 0.94)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        userSelect: 'none',
      }}
    >
      {/* Top Bar with Title, Stats, and Close Button */}
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
          padding: '8px 16px',
          background: 'rgba(18, 20, 26, 0.7)',
          border: '1px solid rgba(255, 77, 0, 0.3)',
          borderRadius: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={20} style={{ color: '#FF4D00' }} />
          <h2
            className="font-cinematic"
            style={{
              fontSize: '1.25rem',
              fontWeight: '900',
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              margin: 0,
            }}
          >
            THUNDER SHIELD
          </h2>
        </div>

        {/* Lives Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[1, 2, 3].map((l) => (
            <Heart
              key={l}
              size={18}
              style={{
                fill: l <= lives ? '#EF4444' : 'transparent',
                color: l <= lives ? '#EF4444' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>

        {/* Scores */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>SCORE</span>
            <span className="font-cinematic" style={{ fontSize: '1.1rem', fontWeight: '900', color: '#FFD166' }}>
              {score}
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>HIGH SCORE</span>
            <span className="font-cinematic" style={{ fontSize: '1.1rem', fontWeight: '900', color: '#FF8533' }}>
              {highScore}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              background: 'transparent',
              border: 'none',
              color: soundEnabled ? '#FF4D00' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              padding: '4px',
            }}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close Game"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Canvas Container */}
      <div
        style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1.5px solid rgba(255, 77, 0, 0.4)',
          boxShadow: '0 0 35px rgba(255, 77, 0, 0.25)',
          background: '#06080D',
          touchAction: 'none',
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <canvas ref={canvasRef} style={{ display: 'block', cursor: 'crosshair' }} />

        {/* Start / Intro Overlay */}
        {gameState === 'ready' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(6, 8, 13, 0.88)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <Shield size={54} style={{ color: '#FF4D00', marginBottom: '1rem', filter: 'drop-shadow(0 0 16px #FF4D00)' }} />
            <h3
              className="font-cinematic"
              style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                margin: 0,
              }}
            >
              DEFEND THE BAT
            </h3>
            <p style={{ maxWidth: '420px', color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.75rem 0 1.5rem 0' }}>
              Drag your cursor or touch to rotate the Thunder Shield around the central bat. Deflect incoming shadow entities to gain points!
            </p>
            <button
              type="button"
              onClick={startGame}
              style={{
                padding: '12px 36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF4D00 0%, #D83B01 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 120, 40, 0.8)',
                fontSize: '1rem',
                fontWeight: '800',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(255, 77, 0, 0.6)',
              }}
            >
              START GAME (SPACE)
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(6, 8, 13, 0.92)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <Trophy size={48} style={{ color: '#FFD166', marginBottom: '0.75rem' }} />
            <h3
              className="font-cinematic"
              style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: '#EF4444',
                letterSpacing: '0.08em',
                margin: 0,
              }}
            >
              BATTLE OVER
            </h3>
            <div style={{ margin: '1rem 0 1.5rem 0', display: 'flex', gap: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FINAL SCORE</span>
                <div className="font-cinematic" style={{ fontSize: '2rem', fontWeight: '900', color: '#FFFFFF' }}>
                  {score}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ALL-TIME BEST</span>
                <div className="font-cinematic" style={{ fontSize: '2rem', fontWeight: '900', color: '#FFD166' }}>
                  {highScore}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={startGame}
              style={{
                padding: '12px 34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF4D00 0%, #D83B01 100%)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 120, 40, 0.8)',
                fontSize: '0.95rem',
                fontWeight: '800',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 25px rgba(255, 77, 0, 0.5)',
              }}
            >
              <RotateCcw size={16} /> PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Control Tips beneath */}
      <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        Controls: Move Mouse / Drag Touch / Left & Right Arrows (or A/D) to rotate shield.
      </div>
    </div>
  );
}
