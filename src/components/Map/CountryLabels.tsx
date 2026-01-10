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

// Font size mapping based on label size config
const FONT_SIZES: Record<NonNullable<CountryLabelConfig['fontSize']>, number> = {
  sm: 8,
  md: 10,
  lg: 12,
};

/**
 * CountryLabels Component
 *
 * Renders country name labels on the map using react-simple-maps Marker.
 * Labels scale with zoom and highlight when selected.
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

  // Scale font size inversely with zoom (larger when zoomed out)
  const getScaledFontSize = (baseSize: number) => {
    return Math.max(6, baseSize / Math.sqrt(zoom));
  };

  return (
    <g className="country-labels" style={{ pointerEvents: 'none' }}>
      {labels.map((label) => {
        const isSelected = selectedCountry === label.id;
        const baseFontSize = FONT_SIZES[label.fontSize || 'md'];
        const scaledSize = getScaledFontSize(baseFontSize);

        return (
          <Marker key={label.id} coordinates={label.coordinates}>
            {/* Text shadow for better readability */}
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              dx={label.offsetX || 0}
              dy={label.offsetY || 0}
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: `${scaledSize}px`,
                fill: 'rgba(255,255,255,0.9)',
                fontWeight: isSelected ? 'bold' : '600',
                strokeWidth: 3,
                stroke: 'rgba(255,255,255,0.8)',
                paintOrder: 'stroke',
                pointerEvents: 'none',
                userSelect: 'none',
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
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: `${scaledSize}px`,
                fill: isSelected ? '#1a1a1a' : '#333333',
                fontWeight: isSelected ? 'bold' : '600',
                letterSpacing: '0.5px',
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
