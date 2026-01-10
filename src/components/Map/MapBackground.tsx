'use client';

/**
 * MapBackground Component
 *
 * Renders an immersive ocean background with depth perception,
 * bathymetric patterns, and atmospheric vignette for a tactile atlas feel.
 */
export const MapBackground: React.FC = () => {
  return (
    <>
      <defs>
        {/* Primary ocean gradient - deeper blue gradient */}
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9ED4E8" />
          <stop offset="30%" stopColor="#7BC4DC" />
          <stop offset="60%" stopColor="#5BB3D0" />
          <stop offset="100%" stopColor="#4A9EC4" />
        </linearGradient>

        {/* Radial gradient for globe-like depth perception */}
        <radialGradient id="oceanDepth" cx="40%" cy="40%" r="70%">
          <stop offset="0%" stopColor="rgba(180, 220, 240, 0.3)" />
          <stop offset="40%" stopColor="rgba(100, 170, 210, 0.1)" />
          <stop offset="100%" stopColor="rgba(50, 100, 140, 0.4)" />
        </radialGradient>

        {/* Vignette effect - darker edges for atmosphere */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="70%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(20, 50, 70, 0.35)" />
        </radialGradient>

        {/* Bathymetric depth lines pattern - suggests ocean depth */}
        <pattern
          id="bathymetricLines"
          patternUnits="userSpaceOnUse"
          width="200"
          height="200"
          patternTransform="rotate(-15)"
        >
          {/* Primary depth contour */}
          <path
            d="M0 40 Q50 30, 100 40 T200 40"
            fill="none"
            stroke="rgba(100, 160, 200, 0.12)"
            strokeWidth="0.8"
          />
          {/* Secondary depth contour */}
          <path
            d="M0 100 Q50 85, 100 100 T200 100"
            fill="none"
            stroke="rgba(80, 140, 180, 0.1)"
            strokeWidth="0.6"
          />
          {/* Tertiary depth contour */}
          <path
            d="M0 160 Q50 150, 100 160 T200 160"
            fill="none"
            stroke="rgba(60, 120, 160, 0.08)"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Subtle wave texture overlay */}
        <pattern
          id="waveTexture"
          patternUnits="userSpaceOnUse"
          width="80"
          height="80"
          patternTransform="rotate(30)"
        >
          <path
            d="M0 40 Q20 35, 40 40 T80 40"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Coastal glow filter for land-water boundary */}
        <filter id="coastalGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.4
                    0 0 0 0 0.6
                    0 0 0 0 0.8
                    0 0 0 0.3 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Noise texture for organic feel */}
        <filter id="oceanNoise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="saturate"
            values="0"
            result="monoNoise"
          />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="soft-light" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* Base ocean layer with gradient */}
      <rect
        x="-2000"
        y="-2000"
        width="6000"
        height="6000"
        fill="url(#oceanGradient)"
      />

      {/* Depth perception overlay */}
      <rect
        x="-2000"
        y="-2000"
        width="6000"
        height="6000"
        fill="url(#oceanDepth)"
      />

      {/* Bathymetric depth lines */}
      <rect
        x="-2000"
        y="-2000"
        width="6000"
        height="6000"
        fill="url(#bathymetricLines)"
        opacity="0.6"
      />

      {/* Subtle wave texture */}
      <rect
        x="-2000"
        y="-2000"
        width="6000"
        height="6000"
        fill="url(#waveTexture)"
        opacity="0.4"
      />

      {/* Atmospheric vignette - creates depth at edges */}
      <rect
        x="-2000"
        y="-2000"
        width="6000"
        height="6000"
        fill="url(#vignette)"
      />
    </>
  );
};
