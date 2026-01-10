'use client';

/**
 * MapBackground Component
 *
 * Renders ocean background with gradient effect for the map.
 * Uses SVG defs for reusable gradient pattern.
 */
export const MapBackground: React.FC = () => {
  return (
    <>
      <defs>
        {/* Ocean gradient - light blue fading to slightly darker */}
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B8DCE8" />
          <stop offset="50%" stopColor="#A8D5E5" />
          <stop offset="100%" stopColor="#8EC4D6" />
        </linearGradient>

        {/* Subtle wave pattern overlay */}
        <pattern
          id="wavePattern"
          patternUnits="userSpaceOnUse"
          width="60"
          height="60"
          patternTransform="rotate(45)"
        >
          <path
            d="M0 30 Q15 25, 30 30 T60 30"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Ocean base with gradient */}
      <rect
        x="-2000"
        y="-2000"
        width="6000"
        height="6000"
        fill="url(#oceanGradient)"
      />

      {/* Subtle wave texture overlay */}
      <rect
        x="-2000"
        y="-2000"
        width="6000"
        height="6000"
        fill="url(#wavePattern)"
        opacity="0.5"
      />
    </>
  );
};
