import React, { useEffect, useState } from 'react';

/**
 * Aceternity UI & React Bits - TextGenerateEffect
 * Animates text word-by-word with staggered blur-in and opacity transitions for dramatic reveals.
 */
export default function TextGenerateEffect({
  words,
  className = '',
  filter = true,
  duration = 0.5,
  delay = 0.08,
  style = {},
}) {
  const wordsArray = typeof words === 'string' ? words.split(' ') : [];
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    setRevealedCount(0);
    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev >= wordsArray.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, delay * 1000);

    return () => clearInterval(interval);
  }, [words, delay, wordsArray.length]);

  return (
    <div
      className={`text-generate-container ${className}`}
      style={{
        display: 'inline-block',
        ...style,
      }}
    >
      {wordsArray.map((word, idx) => {
        const isRevealed = idx < revealedCount;
        return (
          <span
            key={word + idx}
            style={{
              display: 'inline-block',
              marginRight: '0.28em',
              opacity: isRevealed ? 1 : 0,
              filter: filter ? (isRevealed ? 'blur(0px)' : 'blur(8px)') : 'none',
              transform: isRevealed ? 'translateY(0px)' : 'translateY(6px)',
              transition: `opacity ${duration}s ease, filter ${duration}s ease, transform ${duration}s ease`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
