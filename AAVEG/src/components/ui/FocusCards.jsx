import React, { useState } from 'react';

/**
 * Aceternity UI & React Bits - FocusCards Component
 * When hovering over one card, non-hovered cards smoothly dim and blur,
 * spotlighting the active item with high contrast.
 */
export default function FocusCards({
  cards = [],
  renderCard,
  className = '',
  gridClassName = '',
  style = {},
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={`focus-cards-grid ${gridClassName} ${className}`}
      style={{
        display: 'grid',
        ...style,
      }}
    >
      {cards.map((card, idx) => {
        const isHovered = hoveredIndex === idx;
        const isOtherHovered = hoveredIndex !== null && !isHovered;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: isOtherHovered ? 'blur(3px) brightness(0.65)' : 'none',
              transform: isHovered ? 'translateY(-6px) scale(1.02)' : isOtherHovered ? 'scale(0.98)' : 'scale(1)',
              zIndex: isHovered ? 20 : 1,
            }}
          >
            {renderCard(card, idx, isHovered)}
          </div>
        );
      })}
    </div>
  );
}
