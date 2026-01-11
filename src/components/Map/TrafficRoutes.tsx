'use client';

import { Line } from 'react-simple-maps';
import {
  TRAFFICKING_ROUTES,
  ROUTE_COLORS,
  type RouteType,
  type TraffickingRoute,
} from '@/data/routes';

interface TrafficRoutesProps {
  /** Which route types to display */
  visibleTypes: RouteType[];
  /** Optional: highlight a specific route */
  highlightedRoute?: string | null;
  /** Current zoom level */
  zoom?: number;
}

/**
 * Get stroke width based on route volume and zoom level
 * Routes get thinner when zoomed in to reduce clutter on mobile
 */
function getStrokeWidth(volume: TraffickingRoute['volume'], zoom: number = 1): number {
  const baseWidth = {
    high: 0.8,
    medium: 0.5,
    low: 0.3,
  }[volume];

  // Moderate inverse scale with zoom - routes get thinner when zoomed in
  const scaled = baseWidth / Math.pow(zoom, 0.5);
  return Math.max(0.1, Math.min(scaled, 1.5)); // Clamp between 0.1 and 1.5
}

/**
 * Get opacity based on zoom level - fade routes when zoomed in
 */
function getRouteOpacity(zoom: number = 1): number {
  // Routes become more transparent when zoomed in
  const baseOpacity = 0.7;
  const opacity = baseOpacity / Math.pow(zoom, 0.2);
  return Math.max(0.3, Math.min(opacity, 0.7));
}

/**
 * Determine if a route should be visible based on zoom and volume
 * At higher zoom levels, hide lower volume routes to reduce clutter
 */
function isRouteVisible(volume: TraffickingRoute['volume'], zoom: number = 1): boolean {
  if (zoom < 1.5) return true; // Show all routes at low zoom
  if (zoom < 2.5) return volume !== 'low'; // Hide low volume at medium zoom
  return volume === 'high'; // Only show high volume at high zoom
}

/**
 * Get dash array configuration for each route type
 * Scales inversely with zoom for consistent visual appearance
 */
function getDashConfig(type: RouteType, zoom: number = 1): string {
  // Base dash patterns - scale inversely with zoom for consistency
  const scale = 1 / Math.pow(zoom, 0.4);
  switch (type) {
    case 'land':
      return `${3 * scale},${1.5 * scale}`;
    case 'maritime':
      return `${4 * scale},${2 * scale}`;
    case 'air':
      return `${1.5 * scale},${3 * scale}`;
  }
}

/**
 * Get animation duration based on route type
 */
function getAnimationDuration(type: RouteType): string {
  switch (type) {
    case 'land':
      return '2s';
    case 'maritime':
      return '3s';
    case 'air':
      return '1.5s';
  }
}

/**
 * TrafficRoutes Component
 *
 * Renders animated drug trafficking routes that flow along paths,
 * creating a dynamic visualization of trafficking movement.
 */
export const TrafficRoutes: React.FC<TrafficRoutesProps> = ({
  visibleTypes,
  highlightedRoute,
  zoom = 1,
}) => {
  // Filter routes by type AND by zoom-based visibility
  const routes = TRAFFICKING_ROUTES.filter((route) =>
    visibleTypes.includes(route.type) && isRouteVisible(route.volume, zoom)
  );

  // Get zoom-adjusted opacity
  const routeOpacity = getRouteOpacity(zoom);

  return (
    <g className="traffic-routes">
      <defs>
        {/* Glow filters for each route type */}
        <filter id="glow-land" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feFlood floodColor={ROUTE_COLORS.land} floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-maritime" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feFlood floodColor={ROUTE_COLORS.maritime} floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glow-air" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feFlood floodColor={ROUTE_COLORS.air} floodOpacity="0.6" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Arrow markers with glow effect */}
        <marker
          id="arrow-land"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill={ROUTE_COLORS.land}
            style={{ filter: 'drop-shadow(0 0 2px rgba(45, 80, 22, 0.8))' }}
          />
        </marker>

        <marker
          id="arrow-maritime"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill={ROUTE_COLORS.maritime}
            style={{ filter: 'drop-shadow(0 0 2px rgba(30, 95, 138, 0.8))' }}
          />
        </marker>

        <marker
          id="arrow-air"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill={ROUTE_COLORS.air}
            style={{ filter: 'drop-shadow(0 0 2px rgba(139, 35, 35, 0.8))' }}
          />
        </marker>
      </defs>

      {/* Render routes with animation */}
      {routes.map((route) => {
        const isHighlighted = highlightedRoute === route.id;
        const isDimmed = highlightedRoute && !isHighlighted;
        const strokeWidth = getStrokeWidth(route.volume, zoom);
        const dashArray = getDashConfig(route.type, zoom);
        const animDuration = getAnimationDuration(route.type);

        return (
          <g key={route.id}>
            {/* Background glow layer - very subtle ambient glow */}
            <Line
              from={route.from.coordinates}
              to={route.to.coordinates}
              stroke={ROUTE_COLORS[route.type]}
              strokeWidth={strokeWidth * 1.5}
              strokeLinecap="round"
              style={{
                opacity: isDimmed ? 0.01 : routeOpacity * 0.1,
                filter: 'blur(1px)',
              }}
            />

            {/* Main animated route line */}
            <Line
              from={route.from.coordinates}
              to={route.to.coordinates}
              stroke={ROUTE_COLORS[route.type]}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={dashArray}
              markerEnd={`url(#arrow-${route.type})`}
              style={{
                opacity: isDimmed ? 0.1 : routeOpacity,
                filter: isHighlighted ? `url(#glow-${route.type})` : undefined,
                animation: `route-flow ${animDuration} linear infinite`,
                transition: 'opacity 300ms ease-out',
              }}
            />
          </g>
        );
      })}
    </g>
  );
};
