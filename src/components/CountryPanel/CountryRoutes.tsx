'use client';

import { Plane, Ship, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import type { OutgoingRoute, IncomingRoute } from '@/types/country';
import { cn } from '@/lib/utils';

interface CountryRoutesProps {
  outgoingRoutes?: OutgoingRoute[];
  incomingRoutes?: IncomingRoute[];
}

/**
 * Get icon for route type
 */
function RouteTypeIcon({ type }: { type: 'land' | 'maritime' | 'air' }) {
  const iconClass = 'w-4 h-4';
  switch (type) {
    case 'air':
      return <Plane className={iconClass} />;
    case 'maritime':
      return <Ship className={iconClass} />;
    case 'land':
      return <Truck className={iconClass} />;
  }
}

/**
 * Get color for route type
 */
function getRouteTypeColor(type: 'land' | 'maritime' | 'air'): string {
  switch (type) {
    case 'land':
      return '#2D5016'; // Dark green
    case 'maritime':
      return '#1E5F8A'; // Navy blue
    case 'air':
      return '#8B2323'; // Dark red
  }
}

/**
 * Get background color for volume badge
 */
function getVolumeBadgeClass(volume: 'high' | 'medium' | 'low'): string {
  switch (volume) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'medium':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  }
}

/**
 * Single route item display
 */
function RouteItem({
  countryName,
  type,
  volume,
  description,
  direction,
}: {
  countryName: string;
  type: 'land' | 'maritime' | 'air';
  volume: 'high' | 'medium' | 'low';
  description?: string;
  direction: 'outgoing' | 'incoming';
}) {
  const color = getRouteTypeColor(type);

  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      {/* Route type icon */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}20`, color }}
      >
        <RouteTypeIcon type={type} />
      </div>

      {/* Route info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {direction === 'incoming' && (
            <ArrowLeft className="w-3 h-3 text-gray-400 flex-shrink-0" />
          )}
          <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {countryName}
          </span>
          {direction === 'outgoing' && (
            <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
            {description}
          </p>
        )}
      </div>

      {/* Volume badge */}
      <span
        className={cn(
          'flex-shrink-0 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full',
          getVolumeBadgeClass(volume)
        )}
      >
        {volume}
      </span>
    </div>
  );
}

/**
 * CountryRoutes Component
 *
 * Displays trafficking routes to/from a country with visual indicators
 * for route type (land/maritime/air) and volume (high/medium/low).
 */
export function CountryRoutes({
  outgoingRoutes,
  incomingRoutes,
}: CountryRoutesProps) {
  const hasOutgoing = outgoingRoutes && outgoingRoutes.length > 0;
  const hasIncoming = incomingRoutes && incomingRoutes.length > 0;

  if (!hasOutgoing && !hasIncoming) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Trafficking Routes
      </h3>

      {/* Outgoing routes */}
      {hasOutgoing && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <ArrowRight className="w-4 h-4" />
            <span>Outgoing Routes ({outgoingRoutes.length})</span>
          </div>
          <div className="flex flex-col gap-2">
            {outgoingRoutes.map((route, index) => (
              <RouteItem
                key={`out-${route.toCountryId}-${route.type}-${index}`}
                countryName={route.toCountryName}
                type={route.type}
                volume={route.volume}
                description={route.description}
                direction="outgoing"
              />
            ))}
          </div>
        </div>
      )}

      {/* Incoming routes */}
      {hasIncoming && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <ArrowLeft className="w-4 h-4" />
            <span>Incoming Routes ({incomingRoutes.length})</span>
          </div>
          <div className="flex flex-col gap-2">
            {incomingRoutes.map((route, index) => (
              <RouteItem
                key={`in-${route.fromCountryId}-${route.type}-${index}`}
                countryName={route.fromCountryName}
                type={route.type}
                volume={route.volume}
                description={route.description}
                direction="incoming"
              />
            ))}
          </div>
        </div>
      )}

      {/* Route type legend */}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Truck className="w-3 h-3" style={{ color: getRouteTypeColor('land') }} />
          <span>Land</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Ship className="w-3 h-3" style={{ color: getRouteTypeColor('maritime') }} />
          <span>Maritime</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Plane className="w-3 h-3" style={{ color: getRouteTypeColor('air') }} />
          <span>Air</span>
        </div>
      </div>
    </div>
  );
}
