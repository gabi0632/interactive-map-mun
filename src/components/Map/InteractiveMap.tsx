'use client';

import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { Badge } from '@/components/ui/badge';
import { countryById } from '@/data/countries';
import type { CountryRole } from '@/types';
import {
  GEO_URL,
  ISO_NUMERIC_TO_ALPHA3,
  LATIN_AMERICA_COUNTRIES,
  MAP_CENTER,
  MAP_SCALE,
  ROLE_COLORS,
} from '@/lib/mapConfig';

/**
 * Tooltip data for displaying country info on hover
 */
interface TooltipData {
  x: number;
  y: number;
  countryName: string;
  role: CountryRole;
}

/**
 * Badge styles for each country role
 */
const ROLE_BADGE_STYLES: Record<CountryRole, string> = {
  producer: 'bg-red-500 text-white hover:bg-red-500',
  transit: 'bg-orange-500 text-white hover:bg-orange-500',
  mixed: 'bg-yellow-500 text-black hover:bg-yellow-500',
  consumer: 'bg-blue-500 text-white hover:bg-blue-500',
  other: 'bg-gray-500 text-white hover:bg-gray-500',
};

/**
 * Human-readable labels for each country role
 */
const ROLE_LABELS: Record<CountryRole, string> = {
  producer: 'Producer',
  transit: 'Transit',
  mixed: 'Mixed',
  consumer: 'Consumer',
  other: 'Other',
};

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
 * Supports click interactions, hover tooltips, and visual feedback for selected countries.
 */
export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onCountryClick,
  selectedCountry,
  countryRoles,
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

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
    return (LATIN_AMERICA_COUNTRIES as readonly string[]).includes(iso3);
  };

  /**
   * Handle country click - only trigger for clickable countries
   */
  const handleCountryClick = (geoId: string) => {
    const iso3 = ISO_NUMERIC_TO_ALPHA3[geoId] || '';
    if (isClickable(iso3)) {
      onCountryClick(iso3);
    }
  };

  /**
   * Handle mouse enter - set hover state and tooltip for clickable countries
   */
  const handleMouseEnter = (
    geoId: string,
    event: React.MouseEvent<SVGPathElement>
  ) => {
    const iso3 = ISO_NUMERIC_TO_ALPHA3[geoId] || '';
    if (isClickable(iso3)) {
      setHoveredCountry(iso3);

      // Get country data for tooltip
      const country = countryById[iso3];
      const role = countryRoles[iso3];
      if (country && role) {
        setTooltip({
          x: event.clientX,
          y: event.clientY,
          countryName: country.name,
          role: role,
        });
      }
    }
  };

  /**
   * Handle mouse move - update tooltip position
   */
  const handleMouseMove = (event: React.MouseEvent<SVGPathElement>) => {
    if (tooltip) {
      setTooltip((prev) =>
        prev
          ? {
              ...prev,
              x: event.clientX,
              y: event.clientY,
            }
          : null
      );
    }
  };

  /**
   * Handle mouse leave - clear hover state and tooltip
   */
  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setTooltip(null);
  };

  return (
    <div className="w-full h-full relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: MAP_CENTER,
          scale: MAP_SCALE,
        }}
        className="w-full h-full"
      >
        <ZoomableGroup center={MAP_CENTER} zoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Convert numeric ISO code to alpha-3
                const iso3 = ISO_NUMERIC_TO_ALPHA3[geo.id] || '';
                const clickable = isClickable(iso3);
                const isHovered = hoveredCountry === iso3;
                const isSelected = selectedCountry === iso3;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo.id)}
                    onMouseEnter={(event) => handleMouseEnter(geo.id, event)}
                    onMouseMove={handleMouseMove}
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

      {/* Tooltip - renders outside the SVG for proper positioning */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y + 12,
          }}
        >
          <div className="bg-popover text-popover-foreground rounded-md border px-3 py-2 shadow-md flex items-center gap-2 animate-in fade-in-0 zoom-in-95 duration-150">
            <span className="font-medium text-sm">{tooltip.countryName}</span>
            <Badge className={`${ROLE_BADGE_STYLES[tooltip.role]} text-xs`}>
              {ROLE_LABELS[tooltip.role]}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};
