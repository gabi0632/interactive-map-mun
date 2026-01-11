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

// Helper to render text content (single line or multiline)
const renderTextContent = (
  name: string | string[],
  scaledSize: number,
  offsetX: number,
  offsetY: number
) => {
  if (typeof name === 'string') {
    return name;
  }

  // Multiline: render each line as a tspan
  const lineHeight = scaledSize * 1.2;
  const totalHeight = (name.length - 1) * lineHeight;
  const startY = -totalHeight / 2;

  return name.map((line, index) => (
    <tspan
      key={index}
      x={offsetX}
      dy={index === 0 ? startY : lineHeight}
    >
      {line}
    </tspan>
  ));
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

  // Scale font size inversely with zoom - labels get smaller when zoomed in
  // This prevents labels from overlapping in dense regions like Europe
  const getScaledFontSize = (baseSize: number) => {
    // At zoom 1, use base size; zoom in = smaller labels, zoom out = larger labels
    // Using inverse relationship: divide by sqrt(zoom) for smoother scaling
    const scaled = baseSize / Math.pow(zoom, 0.4);
    return Math.max(1.2, Math.min(scaled, 4)); // Clamp between 1.2 and 4
  };

  return (
    <g className="country-labels" style={{ pointerEvents: 'none' }}>
      {labels.map((label) => {
        const isSelected = selectedCountry === label.id;
        const baseFontSize = FONT_SIZES[label.fontSize || 'md'];
        const scaledSize = getScaledFontSize(baseFontSize);

        const offsetX = label.offsetX || 0;
        const offsetY = label.offsetY || 0;

        return (
          <Marker key={label.id} coordinates={label.coordinates}>
            {/* Text shadow for better readability - scales with font */}
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              dx={offsetX}
              dy={offsetY}
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
              {renderTextContent(label.name, scaledSize, offsetX, offsetY)}
            </text>

            {/* Main text label */}
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              dx={offsetX}
              dy={offsetY}
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
              {renderTextContent(label.name, scaledSize, offsetX, offsetY)}
            </text>
          </Marker>
        );
      })}
    </g>
  );
};
