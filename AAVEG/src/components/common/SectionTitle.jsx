import React from 'react';
import ShinyText from '../ui/ShinyText';
import FloatingElements from '../ui/FloatingElements';

/**
 * Clean, cinematic section title header with React Bits & Annnimate enhancements
 */
export default function SectionTitle({
  subtitle,
  tagline,
  title,
  highlightWord,
  description,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center';
  const displaySubtitle = subtitle || tagline;

  // Split title if highlightWord is present
  const renderTitle = () => {
    if (!title) return null;
    if (!highlightWord || !title.includes(highlightWord)) {
      return title;
    }

    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <ShinyText text={highlightWord} shimmerColor="#FFA04D" />
        {parts.slice(1).join(highlightWord)}
      </>
    );
  };

  return (
    <div
      className={`section-title-wrapper ${className}`}
      style={{
        textAlign: align,
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCenter ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      {displaySubtitle && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: '700',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--accent-bright)',
            marginBottom: '0.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FloatingElements duration={3} distance={3}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
                boxShadow: '0 0 10px #FF4D00',
                display: 'inline-block',
              }}
            />
          </FloatingElements>
          <ShinyText text={displaySubtitle} shimmerColor="#FFA04D" />
        </span>
      )}

      {title && (
        <h2
          style={{
            fontFamily: 'var(--font-cinematic)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '800',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            lineHeight: '1.15',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 77, 0, 0.4)',
            maxWidth: '850px',
          }}
        >
          {renderTitle()}
        </h2>
      )}

      {description && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: 'var(--text-secondary)',
            marginTop: '0.75rem',
            maxWidth: '650px',
            lineHeight: '1.6',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

