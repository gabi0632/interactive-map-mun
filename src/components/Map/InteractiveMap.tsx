'use client';

import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import type { CountryRole, GeoFeatureProperties } from '@/types';
import { GEO_URL, LATIN_AMERICA_COUNTRIES, ROLE_COLORS } from '@/lib/mapConfig';

interface InteractiveMapProps {
  /** Callback when a country is clicked, receives country ID (ISO alpha-3) */
  onCountryClick: (countryId: string) => void;

  /** Currently selected country ID (null if none selected) */
  selectedCountry: string | null;

  /** Mapping of country IDs to their roles in drug trafficking */
  countryRoles: Record<string, CountryRole>;
}

/**
 * InteractiveMap Component
 *
 * Main map component using react-simple-maps with Mercator projection.
 * Renders countries with color-coding based on their role in drug trafficking.
 * Supports click interactions and visual feedback for selected countries.
 */
export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onCountryClick,
  selectedCountry,
  countryRoles,
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  /**
   * Get the fill color for a country based on its role and selection state
   */
  const getCountryColor = (iso3: string): string => {
    // If a country is selected and this isn't it, fade it
    if (selectedCountry && selectedCountry !== iso3) {
      return '#E5E7EB'; // gray-200 for faded countries
    }

    // Get the country's role and return corresponding color
    const role = countryRoles[iso3];
    if (role && ROLE_COLORS[role]) {
      return ROLE_COLORS[role];
    }

    // Default color for countries not in our dataset
    return '#D1D5DB'; // gray-300
  };

  /**
   * Check if a country is clickable (in Latin America countries list)
   */
  const isClickable = (iso3: string): boolean => {
    return LATIN_AMERICA_COUNTRIES.includes(iso3 as any);
  };

  /**
   * Handle country click - only trigger for clickable countries
   */
  const handleCountryClick = (geo: { properties: GeoFeatureProperties }) => {
    const iso3 = geo.properties.ISO_A3;
    if (isClickable(iso3)) {
      onCountryClick(iso3);
    }
  };

  /**
   * Handle mouse enter - set hover state for clickable countries
   */
  const handleMouseEnter = (geo: { properties: GeoFeatureProperties }) => {
    const iso3 = geo.properties.ISO_A3;
    if (isClickable(iso3)) {
      setHoveredCountry(iso3);
    }
  };

  /**
   * Handle mouse leave - clear hover state
   */
  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  return (
    <div className="w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [-60, -15], // Latin America center
          scale: 400,
        }}
        className="w-full h-full"
      >
        <ZoomableGroup center={[-60, -15]} zoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso3 = geo.properties.ISO_A3;
                const clickable = isClickable(iso3);
                const isHovered = hoveredCountry === iso3;
                const isSelected = selectedCountry === iso3;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)}
                    onMouseEnter={() => handleMouseEnter(geo)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      default: {
                        fill: getCountryColor(iso3),
                        stroke: '#FFFFFF',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                      hover: {
                        fill: getCountryColor(iso3),
                        stroke: '#FFFFFF',
                        strokeWidth: clickable ? 1.5 : 0.5,
                        outline: 'none',
                        cursor: clickable ? 'pointer' : 'default',
                      },
                      pressed: {
                        fill: getCountryColor(iso3),
                        stroke: '#FFFFFF',
                        strokeWidth: 1.5,
                        outline: 'none',
                      },
                    }}
                    className={`
                      transition-all duration-200
                      ${isSelected ? 'drop-shadow-lg' : ''}
                      ${isHovered && clickable ? 'brightness-110' : ''}
                    `}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
