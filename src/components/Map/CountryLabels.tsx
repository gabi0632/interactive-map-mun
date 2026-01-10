'use client';

import { Marker } from 'react-simple-maps';
import { COUNTRY_LABELS, type CountryLabelConfig } from '@/lib/mapConfig';

interface CountryLabelsProps {
  /** Current zoom level for scaling font size */
  zoom: number;
  /** Currently selected country ID */
  selectedCountry?: string | null;
  /** Optional filter for which countries to show labels */
  visibleCountries?: string[];
}

// Base font sizes - much smaller for cleaner look
const FONT_SIZES: Record<NonNullable<CountryLabelConfig['fontSize']>, number> = {
  sm: 1.8,
  md: 2.2,
  lg: 2.8,
};

/**
 * CountryLabels Component
 *
 * Renders country name labels on the map using react-simple-maps Marker.
 * Labels scale dynamically with zoom level for optimal readability.
 */
export const CountryLabels: React.FC<CountryLabelsProps> = ({
  zoom,
  selectedCountry,
  visibleCountries,
}) => {
  // Filter labels if visibleCountries is provided
  const labels = visibleCountries
    ? COUNTRY_LABELS.filter((label) => visibleCountries.includes(label.id))
    : COUNTRY_LABELS;

  // Scale font size based on zoom - smaller base, scales up when zoomed in
  const getScaledFontSize = (baseSize: number) => {
    // At zoom 1, use base size; zoom in = slightly larger, zoom out = smaller
    const scaled = baseSize * Math.pow(zoom, 0.3);
    return Math.max(1.5, Math.min(scaled, 8)); // Clamp between 1.5 and 8
  };

  return (
    <g className="country-labels" style={{ pointerEvents: 'none' }}>
      {labels.map((label) => {
        const isSelected = selectedCountry === label.id;
        const baseFontSize = FONT_SIZES[label.fontSize || 'md'];
        const scaledSize = getScaledFontSize(baseFontSize);

        return (
          <Marker key={label.id} coordinates={label.coordinates}>
            {/* Text shadow for better readability - scales with font */}
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              dx={label.offsetX || 0}
              dy={label.offsetY || 0}
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: `${scaledSize}px`,
                fill: 'rgba(255,255,255,0.95)',
                fontWeight: isSelected ? '700' : '600',
                strokeWidth: Math.max(1.5, scaledSize * 0.6),
                stroke: 'rgba(255,255,255,0.9)',
                paintOrder: 'stroke',
                pointerEvents: 'none',
                userSelect: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {label.name}
            </text>

            {/* Main text label */}
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              dx={label.offsetX || 0}
              dy={label.offsetY || 0}
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: `${scaledSize}px`,
                fill: isSelected ? '#1a365d' : '#2d3748',
                fontWeight: isSelected ? '700' : '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                pointerEvents: 'none',
                userSelect: 'none',
                transition: 'fill 150ms ease-out',
              }}
            >
              {label.name}
            </text>
          </Marker>
        );
      })}
    </g>
  );
};
