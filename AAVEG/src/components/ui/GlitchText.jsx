import React, { useState, useEffect } from 'react';

/**
 * React Bits - Decrypted / GlitchText Component
 * Animates text characters with random gothic rune / cipher shuffling before settling on the real text.
 */
export default function GlitchText({
  text,
  speed = 40,
  maxIterations = 8,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=~',
  className = '',
  style = {},
  triggerOnHover = true,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }

      iteration += 1 / (maxIterations / 2);
    }, speed);
  };

  useEffect(() => {
    startAnimation();
  }, [text]);

  return (
    <span
      className={`glitch-text-element inline-block ${className}`}
      onMouseEnter={triggerOnHover ? startAnimation : undefined}
      style={{
        display: 'inline-block',
        cursor: triggerOnHover ? 'pointer' : 'default',
        ...style,
      }}
    >
      {displayText}
    </span>
  );
}
