'use client';

import { useState, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { Badge } from '@/components/ui/badge';
import { countryById } from '@/data/countries';
import { useResponsive } from '@/hooks';
import type { CountryRole } from '@/types';
import type { RouteType } from '@/data/routes';
import {
  GEO_URL,
  ISO_NUMERIC_TO_ALPHA3,
  LATIN_AMERICA_COUNTRIES,
  COUNTRIES_IN_SCOPE,
  ROLE_COLORS,
} from '@/lib/mapConfig';
import { MapBackground } from './MapBackground';
import { CountryLabels } from './CountryLabels';
import { TrafficRoutes } from './TrafficRoutes';
import { CompassRose } from './CompassRose';

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
 * Badge styles for each country role (vintage palette)
 */
const ROLE_BADGE_STYLES: Record<CountryRole, string> = {
  producer: 'bg-[#4A7C59] text-white hover:bg-[#4A7C59]',
  transit: 'bg-[#D4A84B] text-white hover:bg-[#D4A84B]',
  mixed: 'bg-[#C4A35A] text-white hover:bg-[#C4A35A]',
  consumer: 'bg-[#CD5C5C] text-white hover:bg-[#CD5C5C]',
  other: 'bg-[#8B7355] text-white hover:bg-[#8B7355]',
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

  /** Which route types to display on the map */
  visibleRouteTypes?: RouteType[];
}

/**
 * InteractiveMap Component
 *
 * Main map component using react-simple-maps with Mercator projection.
 * Renders countries with color-coding based on their role in drug trafficking.
 * Includes ocean background, country labels, and trafficking routes.
 */
export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  onCountryClick,
  selectedCountry,
  countryRoles,
  visibleRouteTypes = ['land', 'maritime', 'air'],
}) => {
  const { isMobile, isTouchDevice } = useResponsive();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [zoom, setZoom] = useState(1);

  // Projection config - wider view to show more of the world
  const projectionConfig = {
    center: [-40, 5] as [number, number],
    scale: isMobile ? 120 : 180,
  };

  /**
   * Get the fill color for a country based on its role and selection state
   */
  const getCountryColor = useCallback(
    (iso3: string): string => {
      // Check if country is in scope at all
      const inScope = (COUNTRIES_IN_SCOPE as readonly string[]).includes(iso3);

      // If a country is selected and this isn't it, fade it (but keep some color)
      if (selectedCountry && selectedCountry !== iso3) {
        if (inScope) {
          return '#D4C9B8'; // Muted parchment for faded in-scope countries
        }
        return '#E8DCC8'; // Lighter parchment for out-of-scope
      }

      // Get the country's role and return corresponding color
      const role = countryRoles[iso3];
      if (role && ROLE_COLORS[role]) {
        return ROLE_COLORS[role];
      }

      // Default color for countries not in our dataset
      return '#E8DCC8'; // Parchment beige
    },
    [selectedCountry, countryRoles]
  );

  /**
   * Check if a country is clickable (in Latin America countries list)
   */
  const isClickable = useCallback((iso3: string): boolean => {
    return (LATIN_AMERICA_COUNTRIES as readonly string[]).includes(iso3);
  }, []);

  /**
   * Handle country click - only trigger for clickable countries
   */
  const handleCountryClick = useCallback(
    (geoId: string) => {
      const iso3 = ISO_NUMERIC_TO_ALPHA3[geoId] || '';
      if (isClickable(iso3)) {
        onCountryClick(iso3);
      }
    },
    [isClickable, onCountryClick]
  );

  /**
   * Handle mouse enter - set hover state and tooltip for clickable countries
   * (Disabled on touch devices)
   */
  const handleMouseEnter = useCallback(
    (geoId: string, event: React.MouseEvent<SVGPathElement>) => {
      if (isTouchDevice) return;

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
    },
    [isTouchDevice, isClickable, countryRoles]
  );

  /**
   * Handle mouse move - update tooltip position
   */
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGPathElement>) => {
      if (isTouchDevice) return;

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
    },
    [isTouchDevice, tooltip]
  );

  /**
   * Handle mouse leave - clear hover state and tooltip
   */
  const handleMouseLeave = useCallback(() => {
    setHoveredCountry(null);
    setTooltip(null);
  }, []);

  /**
   * Handle zoom/pan changes
   */
  const handleMoveEnd = useCallback(
    (position: { coordinates: [number, number]; zoom: number }) => {
      setZoom(position.zoom);
    },
    []
  );

  return (
    <div className="w-full h-full relative overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={projectionConfig}
        className="w-full h-full"
      >
        {/* Ocean background with gradient */}
        <MapBackground />

        <ZoomableGroup
          center={projectionConfig.center}
          zoom={zoom}
          onMoveEnd={handleMoveEnd}
          minZoom={0.5}
          maxZoom={4}
        >
          {/* Country geometries */}
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
                        stroke: '#8B7355',
                        strokeWidth: 0.3,
                        outline: 'none',
                      },
                      hover: {
                        fill: getCountryColor(iso3),
                        stroke: clickable ? '#5D4E37' : '#8B7355',
                        strokeWidth: clickable ? 1 : 0.3,
                        outline: 'none',
                        cursor: clickable ? 'pointer' : 'default',
                      },
                      pressed: {
                        fill: getCountryColor(iso3),
                        stroke: '#5D4E37',
                        strokeWidth: 1.5,
                        outline: 'none',
                      },
                    }}
                    className={`
                      transition-all duration-200
                      ${isSelected ? 'drop-shadow-lg' : ''}
                      ${isHovered && clickable ? 'brightness-105' : ''}
                    `}
                  />
                );
              })
            }
          </Geographies>

          {/* Trafficking routes layer */}
          <TrafficRoutes visibleTypes={visibleRouteTypes} zoom={zoom} />

          {/* Country labels layer */}
          <CountryLabels
            zoom={zoom}
            selectedCountry={selectedCountry}
            visibleCountries={COUNTRIES_IN_SCOPE as unknown as string[]}
          />
        </ZoomableGroup>
      </ComposableMap>

      {/* Decorative compass rose (positioned outside SVG) */}
      <CompassRose
        size={isMobile ? 60 : 80}
        className="absolute bottom-24 right-4 lg:bottom-8 lg:right-8 opacity-50"
      />

      {/* Tooltip - renders outside the SVG for proper positioning */}
      {/* Only show on non-touch devices */}
      {tooltip && !isTouchDevice && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y + 12,
          }}
        >
          <div className="bg-white/95 backdrop-blur text-gray-900 rounded-md border border-gray-200 px-3 py-2 shadow-lg flex items-center gap-2 animate-in fade-in-0 zoom-in-95 duration-150">
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
