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
 * Calculate a control point for curved bezier paths
 * Creates a gentle arc between two points
 */
function getCurveOffset(
  from: [number, number],
  to: [number, number]
): [number, number] {
  const midX = (from[0] + to[0]) / 2;
  const midY = (from[1] + to[1]) / 2;

  // Calculate perpendicular offset for curve
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Curve intensity based on distance (longer routes = more curve)
  const curveIntensity = Math.min(0.15, distance * 0.002);

  // Perpendicular offset
  return [midX - dy * curveIntensity, midY + dx * curveIntensity];
}

/**
 * Get stroke width based on route volume
 */
function getStrokeWidth(volume: TraffickingRoute['volume'], zoom: number = 1): number {
  const baseWidth = {
    high: 2.5,
    medium: 1.8,
    low: 1.2,
  }[volume];

  // Scale down slightly when zoomed in
  return baseWidth / Math.sqrt(zoom);
}

/**
 * TrafficRoutes Component
 *
 * Renders drug trafficking routes on the map as curved lines with arrows.
 * Routes are color-coded by type (land, maritime, air).
 */
export const TrafficRoutes: React.FC<TrafficRoutesProps> = ({
  visibleTypes,
  highlightedRoute,
  zoom = 1,
}) => {
  // Filter routes by visible types
  const routes = TRAFFICKING_ROUTES.filter((route) =>
    visibleTypes.includes(route.type)
  );

  return (
    <g className="traffic-routes">
      {/* SVG Definitions for arrow markers */}
      <defs>
        {/* Arrow marker for land routes */}
        <marker
          id="arrow-land"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={ROUTE_COLORS.land} />
        </marker>

        {/* Arrow marker for maritime routes */}
        <marker
          id="arrow-maritime"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={ROUTE_COLORS.maritime} />
        </marker>

        {/* Arrow marker for air routes */}
        <marker
          id="arrow-air"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={ROUTE_COLORS.air} />
        </marker>

        {/* Glow filter for highlighted routes */}
        <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render each route */}
      {routes.map((route) => {
        const isHighlighted = highlightedRoute === route.id;
        const isDimmed = highlightedRoute && !isHighlighted;
        const strokeWidth = getStrokeWidth(route.volume, zoom);

        return (
          <Line
            key={route.id}
            from={route.from.coordinates}
            to={route.to.coordinates}
            stroke={ROUTE_COLORS[route.type]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={route.type === 'air' ? '5,3' : undefined}
            markerEnd={`url(#arrow-${route.type})`}
            style={{
              opacity: isDimmed ? 0.3 : 0.85,
              transition: 'opacity 200ms ease-out',
              filter: isHighlighted ? 'url(#route-glow)' : undefined,
            }}
          />
        );
      })}
    </g>
  );
};
