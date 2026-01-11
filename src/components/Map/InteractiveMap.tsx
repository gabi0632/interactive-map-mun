'use client';

import { useState, useCallback, useRef } from 'react';
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
  FRENCH_GUIANA_GEO_URL,
  ISO_NUMERIC_TO_ALPHA3,
  CLICKABLE_COUNTRIES,
  COUNTRIES_IN_SCOPE,
  ROLE_COLORS,
} from '@/lib/mapConfig';
import { MapBackground } from './MapBackground';
import { CountryLabels } from './CountryLabels';
import { TrafficRoutes } from './TrafficRoutes';

/**
 * SVG filter definitions for country effects
 * Includes selection glow, hover highlight, and topographic texture
 */
const CountryFilters: React.FC = () => (
  <defs>
    {/* Elevated shadow effect for selected countries */}
    <filter id="country-selected" x="-20%" y="-20%" width="140%" height="140%">
      {/* Drop shadow for elevation effect */}
      <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
      {/* Brightness boost */}
      <feColorMatrix
        type="matrix"
        values="1.15 0 0 0 0
                0 1.15 0 0 0
                0 0 1.15 0 0
                0 0 0 1 0"
      />
    </filter>

    {/* Subtle glow for hovered countries */}
    <filter id="country-hover" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1.1 0 0 0 0
                0 1.1 0 0 0
                0 0 1.1 0 0
                0 0 0 1 0"
      />
    </filter>

    {/* Golden glow border for selected state */}
    <filter id="selection-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feMorphology in="SourceGraphic" operator="dilate" radius="1" result="dilated" />
      <feGaussianBlur in="dilated" stdDeviation="2" result="blur" />
      <feFlood floodColor="#D4A84B" floodOpacity="0.7" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Subtle topographic texture for land */}
    <pattern id="topoTexture" patternUnits="userSpaceOnUse" width="100" height="100">
      <path
        d="M0 50 Q25 45, 50 50 T100 50"
        fill="none"
        stroke="rgba(0,0,0,0.03)"
        strokeWidth="0.3"
      />
      <path
        d="M0 25 Q25 20, 50 25 T100 25"
        fill="none"
        stroke="rgba(0,0,0,0.02)"
        strokeWidth="0.2"
      />
      <path
        d="M0 75 Q25 70, 50 75 T100 75"
        fill="none"
        stroke="rgba(0,0,0,0.02)"
        strokeWidth="0.2"
      />
    </pattern>
  </defs>
);

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

/**
 * ISO code for French Guiana - used for separate overlay rendering
 * (French Guiana is not a separate feature in world-110m.json)
 */
const FRENCH_GUIANA_ISO3 = 'GUF';

/**
 * Generate Geography styles based on country state
 */
interface GeographyStylesParams {
  fillColor: string;
  isSelected: boolean;
  isClickable: boolean;
}

const getGeographyStyles = ({ fillColor, isSelected, isClickable }: GeographyStylesParams) => ({
  default: {
    fill: fillColor,
    stroke: isSelected ? '#5D4E37' : '#8B7355',
    strokeWidth: isSelected ? 1.2 : 0.4,
    outline: 'none',
    filter: isSelected ? 'url(#country-selected)' : undefined,
    transition: 'all 0.25s ease-out',
  },
  hover: {
    fill: fillColor,
    stroke: isClickable ? '#5D4E37' : '#8B7355',
    strokeWidth: isClickable ? 0.8 : 0.4,
    outline: 'none',
    cursor: isClickable ? 'pointer' : 'default',
    filter: isClickable ? 'url(#country-hover)' : undefined,
    transition: 'all 0.25s ease-out',
  },
  pressed: {
    fill: fillColor,
    stroke: '#5D4E37',
    strokeWidth: 1.2,
    outline: 'none',
    filter: 'url(#country-selected)',
  },
});

interface InteractiveMapProps {
  /** Callback when a country is clicked, receives country ID (ISO alpha-3) */
  onCountryClick: (countryId: string) => void;

  /** Currently selected country ID (null if none selected) */
  selectedCountry: string | null;

  /** Mapping of country IDs to their roles in drug trafficking */
  countryRoles: Record<string, CountryRole>;

  /** Which route types to display on the map */
  visibleRouteTypes?: RouteType[];

  /** Initial zoom level */
  zoom?: number;

  /** Initial center position */
  center?: [number, number];
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
  zoom: initialZoom,
  center: initialCenter,
}) => {
  const { isMobile, isTouchDevice } = useResponsive();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // Track current zoom level for route scaling
  const defaultZoom = isMobile ? 1.2 : 1.5;
  const [currentZoom, setCurrentZoom] = useState(initialZoom ?? defaultZoom);

  // Use provided values or defaults - these are initial values, map manages its own state after
  const defaultCenter: [number, number] = [-20, 5];
  const zoom = initialZoom ?? defaultZoom;
  const center = initialCenter ?? defaultCenter;

  /**
   * Handle zoom/pan end - update current zoom state for route scaling
   */
  const handleMoveEnd = useCallback((position: { coordinates: [number, number]; zoom: number }) => {
    setCurrentZoom(position.zoom);
  }, []);

  // Projection config - world view with Americas and Asia visible
  // Note: center is handled by ZoomableGroup, not projection
  const projectionConfig = {
    center: [0, 20] as [number, number],  // Fixed projection center
    scale: isMobile ? 100 : 140,
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
   * Check if a country is clickable (in scope for the simulation)
   */
  const isClickable = useCallback((iso3: string): boolean => {
    return (CLICKABLE_COUNTRIES as readonly string[]).includes(iso3);
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


  return (
    <div className="w-full h-full relative overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={projectionConfig}
        className="w-full h-full"
      >
        {/* SVG filters for country effects */}
        <CountryFilters />

        {/* Ocean background with gradient */}
        <MapBackground />

        <ZoomableGroup
          center={center}
          zoom={zoom}
          minZoom={0.8}
          maxZoom={8}
          translateExtent={[[-1000, -500], [1000, 500]]}
          onMoveEnd={handleMoveEnd}
        >
          {/* Country geometries */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Convert numeric ISO code to alpha-3
                const iso3 = ISO_NUMERIC_TO_ALPHA3[geo.id] || '';
                const clickable = isClickable(iso3);
                const isSelected = selectedCountry === iso3;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo.id)}
                    onMouseEnter={(event) => handleMouseEnter(geo.id, event)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={getGeographyStyles({
                      fillColor: getCountryColor(iso3),
                      isSelected,
                      isClickable: clickable,
                    })}
                    className="transition-all duration-200"
                  />
                );
              })
            }
          </Geographies>

          {/* French Guiana overlay - separate from France */}
          <Geographies geography={FRENCH_GUIANA_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isSelected = selectedCountry === FRENCH_GUIANA_ISO3;

                return (
                  <Geography
                    key={`${FRENCH_GUIANA_ISO3}-${geo.rsmKey}`}
                    geography={geo}
                    onClick={() => onCountryClick(FRENCH_GUIANA_ISO3)}
                    onMouseEnter={(event) => {
                      if (isTouchDevice) return;
                      setHoveredCountry(FRENCH_GUIANA_ISO3);
                      const country = countryById[FRENCH_GUIANA_ISO3];
                      const role = countryRoles[FRENCH_GUIANA_ISO3];
                      if (country && role) {
                        setTooltip({
                          x: event.clientX,
                          y: event.clientY,
                          countryName: country.name,
                          role: role,
                        });
                      }
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={getGeographyStyles({
                      fillColor: getCountryColor(FRENCH_GUIANA_ISO3),
                      isSelected,
                      isClickable: true, // French Guiana is always clickable
                    })}
                    className="transition-all duration-200"
                  />
                );
              })
            }
          </Geographies>

          {/* Trafficking routes layer */}
          <TrafficRoutes visibleTypes={visibleRouteTypes} zoom={currentZoom} />

          {/* Country labels layer */}
          <CountryLabels
            zoom={zoom}
            selectedCountry={selectedCountry}
            visibleCountries={COUNTRIES_IN_SCOPE as unknown as string[]}
          />
        </ZoomableGroup>
      </ComposableMap>

      {/* Decorative compass rose - hidden for cleaner look */}
      {/* <CompassRose
        size={isMobile ? 40 : 50}
        className="absolute bottom-4 left-4 lg:bottom-32 lg:left-4 opacity-40"
      /> */}

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
