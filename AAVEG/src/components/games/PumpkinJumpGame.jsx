import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, Volume2, VolumeX, Trophy, Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * PUMPKIN JUMP Mini-Game
 * T-Rex style endless runner where the player jumps a glowing pumpkin over scary attacking entities.
 * Endless single-player game with local high score storage.
 */
export default function PumpkinJumpGame({ onClose }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // 'ready' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('aaveg_pumpkinjump_highscore') || '0', 10);
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mutable game state loop variables
  const gameRef = useRef({
    pumpkin: {
      x: 70,
      y: 0,
      vy: 0,
      radius: 18,
      isGrounded: true,
      jumpCount: 0,
      maxJumps: 2,
    },
    gravity: 0.65,
    jumpPower: -12.5,
    speed: 5.5,
    distance: 0,
    score: 0,
    highScore: 0,
    obstacles: [],
    particles: [],
    spawnTimer: 0,
    spawnInterval: 90,
    stars: [],
    animationId: null,
  });

  useEffect(() => {
    gameRef.current.highScore = highScore;
  }, [highScore]);

  // Web Audio synthesizer for runner sounds
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === 'jump') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'crash') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // Audio fallback
    }
  };

  const startGame = () => {
    const g = gameRef.current;
    g.pumpkin.y = 200;
    g.pumpkin.vy = 0;
    g.pumpkin.jumpCount = 0;
    g.pumpkin.isGrounded = true;
    g.speed = 5.5;
    g.distance = 0;
    g.score = 0;
    g.obstacles = [];
    g.particles = [];
    g.spawnTimer = 0;
    setScore(0);
    setGameState('playing');
  };

  const jump = () => {
    const g = gameRef.current;
    if (gameState !== 'playing') {
      if (gameState === 'ready' || gameState === 'gameover') {
        startGame();
      }
      return;
    }

    if (g.pumpkin.jumpCount < g.pumpkin.maxJumps) {
      g.pumpkin.vy = g.jumpPower;
      g.pumpkin.isGrounded = false;
      g.pumpkin.jumpCount++;
      playSound('jump');

      // Jump ember puff
      for (let i = 0; i < 6; i++) {
        g.particles.push({
          x: g.pumpkin.x,
          y: g.pumpkin.y + g.pumpkin.radius,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2,
          life: 0.8,
          color: '#FF7700',
          size: 2.5,
        });
      }
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Main canvas runner loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.min(window.innerWidth - 32, 740);
      const height = Math.min(window.innerHeight - 180, 420);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate static background stars
    const stars = Array.from({ length: 30 }, () => ({
      x: Math.random() * 740,
      y: Math.random() * 200,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
    }));
    gameRef.current.stars = stars;

    let animationId;

    const gameLoop = () => {
      const g = gameRef.current;
      const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      const groundY = height - 50;

      // Draw Haunted Night Sky
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, '#040508');
      skyGradient.addColorStop(0.7, '#110D18');
      skyGradient.addColorStop(1, '#1A0B05');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = '#FFFFFF';
      stars.forEach((s) => {
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Glowing Blood Moon in background
      const moonX = width - 90;
      const moonY = 65;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 60);
      moonGlow.addColorStop(0, 'rgba(255, 77, 0, 0.45)');
      moonGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFEBD6';
      ctx.shadowColor = '#FF4D00';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Distant eerie mountain silhouettes
      ctx.fillStyle = '#09080F';
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      for (let x = 0; x <= width; x += 60) {
        ctx.lineTo(x, groundY - 35 - Math.sin((x + g.distance * 0.2) * 0.02) * 20);
      }
      ctx.lineTo(width, groundY);
      ctx.closePath();
      ctx.fill();

      // Ground Floor
      ctx.fillStyle = '#0B0D12';
      ctx.fillRect(0, groundY, width, height - groundY);

      // Ground Top Line & Blood Moss
      ctx.strokeStyle = '#FF4D00';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Ground texture marks moving with distance
      ctx.fillStyle = 'rgba(255, 77, 0, 0.3)';
      const offsetX = -(g.distance * g.speed) % 40;
      for (let gx = offsetX; gx < width; gx += 40) {
        ctx.fillRect(gx, groundY + 8, 14, 2);
      }

      if (gameState === 'playing') {
        // Physics update for pumpkin
        g.pumpkin.vy += g.gravity;
        g.pumpkin.y += g.pumpkin.vy;

        // Ground collision
        if (g.pumpkin.y + g.pumpkin.radius >= groundY) {
          g.pumpkin.y = groundY - g.pumpkin.radius;
          g.pumpkin.vy = 0;
          g.pumpkin.isGrounded = true;
          g.pumpkin.jumpCount = 0;
        }

        // Distance & Score increment
        g.distance += 1;
        if (g.distance % 5 === 0) {
          g.score += 1;
          setScore(g.score);
        }

        // Progressive difficulty
        g.speed = 5.5 + Math.min(6, g.score * 0.012);

        // Spawn Scary Obstacles
        g.spawnTimer++;
        const currentInterval = Math.max(50, g.spawnInterval - Math.floor(g.score / 70));
        if (g.spawnTimer >= currentInterval) {
          g.spawnTimer = 0;

          // Types: 'gravestone' (ground) | 'bat' (air) | 'spikes' (ground wide)
          const types = g.score > 80 ? ['gravestone', 'bat', 'spikes'] : ['gravestone', 'spikes'];
          const obsType = types[Math.floor(Math.random() * types.length)];

          if (obsType === 'gravestone') {
            g.obstacles.push({
              type: 'gravestone',
              x: width + 20,
              y: groundY - 32,
              w: 22,
              h: 32,
              passed: false,
            });
          } else if (obsType === 'spikes') {
            g.obstacles.push({
              type: 'spikes',
              x: width + 20,
              y: groundY - 24,
              w: 34,
              h: 24,
              passed: false,
            });
          } else if (obsType === 'bat') {
            g.obstacles.push({
              type: 'bat',
              x: width + 20,
              y: groundY - 55 - Math.random() * 20,
              w: 26,
              h: 18,
              passed: false,
            });
          }
        }

        // Emit ember particles from pumpkin
        if (Math.random() < 0.4) {
          g.particles.push({
            x: g.pumpkin.x - 10,
            y: g.pumpkin.y + (Math.random() - 0.5) * 10,
            vx: -2 - Math.random() * 2,
            vy: (Math.random() - 0.5) * 1.5,
            life: 0.6,
            color: '#FF5500',
            size: 2,
          });
        }

        // Update Obstacles & Check Collisions
        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i];
          obs.x -= g.speed;

          // Collision Box calculation with generous inner padding
          const pLeft = g.pumpkin.x - g.pumpkin.radius * 0.75;
          const pRight = g.pumpkin.x + g.pumpkin.radius * 0.75;
          const pTop = g.pumpkin.y - g.pumpkin.radius * 0.75;
          const pBottom = g.pumpkin.y + g.pumpkin.radius * 0.75;

          const oLeft = obs.x + 3;
          const oRight = obs.x + obs.w - 3;
          const oTop = obs.y + 3;
          const oBottom = obs.y + obs.h;

          // AABB Collision
          if (pRight > oLeft && pLeft < oRight && pBottom > oTop && pTop < oBottom) {
            playSound('crash');
            setGameState('gameover');
            if (g.score > g.highScore) {
              setHighScore(g.score);
              localStorage.setItem('aaveg_pumpkinjump_highscore', String(g.score));
              confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 },
              });
            }
          }

          // Offscreen cull
          if (obs.x + obs.w < -20) {
            g.obstacles.splice(i, 1);
          }
        }
      }

      // Draw Obstacles
      g.obstacles.forEach((obs) => {
        ctx.save();
        if (obs.type === 'gravestone') {
          // Gravestone with glowing cross
          ctx.fillStyle = '#22252E';
          ctx.strokeStyle = '#4B5563';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(obs.x, obs.y, obs.w, obs.h, [8, 8, 0, 0]);
          ctx.fill();
          ctx.stroke();

          // Cross on gravestone
          ctx.strokeStyle = '#FF3B00';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(obs.x + obs.w / 2, obs.y + 6);
          ctx.lineTo(obs.x + obs.w / 2, obs.y + 20);
          ctx.moveTo(obs.x + obs.w / 2 - 5, obs.y + 11);
          ctx.lineTo(obs.x + obs.w / 2 + 5, obs.y + 11);
          ctx.stroke();
        } else if (obs.type === 'spikes') {
          // Spiky cursed bone fence
          ctx.fillStyle = '#991B1B';
          ctx.strokeStyle = '#FF4D00';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + obs.h);
          ctx.lineTo(obs.x + 8, obs.y);
          ctx.lineTo(obs.x + 16, obs.y + obs.h);
          ctx.lineTo(obs.x + 24, obs.y);
          ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (obs.type === 'bat') {
          // Flying enemy bat
          ctx.fillStyle = '#4C1D95';
          ctx.strokeStyle = '#A855F7';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(obs.x + obs.w / 2, obs.y + obs.h / 2, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Bat wings flapping
          const wing = Math.sin(Date.now() * 0.015) * 6;
          ctx.beginPath();
          ctx.moveTo(obs.x + obs.w / 2 - 6, obs.y + obs.h / 2);
          ctx.lineTo(obs.x - 4, obs.y + wing);
          ctx.lineTo(obs.x + obs.w / 2 - 4, obs.y + obs.h / 2 + 6);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(obs.x + obs.w / 2 + 6, obs.y + obs.h / 2);
          ctx.lineTo(obs.x + obs.w + 4, obs.y + wing);
          ctx.lineTo(obs.x + obs.w / 2 + 4, obs.y + obs.h / 2 + 6);
          ctx.fill();
        }
        ctx.restore();
      });

      // Draw Particles
      for (let p = g.particles.length - 1; p >= 0; p--) {
        const part = g.particles[p];
        part.x += part.vx;
        part.y += part.vy;
        part.life -= 0.04;

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

      // Draw Pumpkin Hero
      ctx.save();
      ctx.translate(g.pumpkin.x, g.pumpkin.y);

      // Rolling rotation when running, or tilt when jumping
      const tilt = g.pumpkin.isGrounded ? (g.distance * 0.12) % (Math.PI * 2) : g.pumpkin.vy * 0.05;
      ctx.rotate(tilt);

      // Pumpkin body glow
      ctx.shadowColor = '#FF5500';
      ctx.shadowBlur = 14;

      // Orange Pumpkin Ribs
      ctx.fillStyle = '#FF5500';
      ctx.beginPath();
      ctx.ellipse(0, 0, g.pumpkin.radius, g.pumpkin.radius * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();

      // Side segments
      ctx.fillStyle = '#E64A00';
      ctx.beginPath();
      ctx.ellipse(-7, 0, g.pumpkin.radius * 0.65, g.pumpkin.radius * 0.85, 0, 0, Math.PI * 2);
      ctx.ellipse(7, 0, g.pumpkin.radius * 0.65, g.pumpkin.radius * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      // Green Stem at top
      ctx.fillStyle = '#22C55E';
      ctx.fillRect(-2, -g.pumpkin.radius - 4, 4, 6);

      // Carved Sinister Face (Eyes + Mouth)
      ctx.fillStyle = '#08080C';
      // Triangle eyes
      ctx.beginPath();
      ctx.moveTo(-7, -4);
      ctx.lineTo(-3, -1);
      ctx.lineTo(-7, 2);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(7, -4);
      ctx.lineTo(3, -1);
      ctx.lineTo(7, 2);
      ctx.closePath();
      ctx.fill();

      // Jagged Smile
      ctx.beginPath();
      ctx.moveTo(-8, 5);
      ctx.lineTo(-4, 9);
      ctx.lineTo(0, 5);
      ctx.lineTo(4, 9);
      ctx.lineTo(8, 5);
      ctx.lineTo(4, 11);
      ctx.lineTo(-4, 11);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameState, soundEnabled]);

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
          maxWidth: '740px',
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
          <span style={{ fontSize: '1.4rem' }}>🎃</span>
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
            PUMPKIN JUMP
          </h2>
        </div>

        {/* Scores */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
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
          background: '#040508',
          touchAction: 'none',
          cursor: 'pointer',
        }}
        onClick={jump}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />

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
            onClick={(e) => {
              e.stopPropagation();
              startGame();
            }}
          >
            <span style={{ fontSize: '3.5rem', marginBottom: '0.75rem', filter: 'drop-shadow(0 0 20px #FF5500)' }}>
              🎃
            </span>
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
              RUN, PUMPKIN, RUN!
            </h3>
            <p style={{ maxWidth: '440px', color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.75rem 0 1.5rem 0' }}>
              Jump over sinister gravestones, cursed spike fences, and flying shadow bats! Double-jump enabled in mid-air.
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
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
              START RUN (SPACE / TAP)
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
            onClick={(e) => {
              e.stopPropagation();
              startGame();
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
              SMASHED BY DARKNESS
            </h3>
            <div style={{ margin: '1rem 0 1.5rem 0', display: 'flex', gap: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SURVIVAL SCORE</span>
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
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
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
              <RotateCcw size={16} /> JUMP AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Control Tips beneath */}
      <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        Controls: Press Spacebar / Up Arrow or Tap anywhere on the game screen to Jump (Tap twice for Double Jump).
      </div>
    </div>
  );
}
