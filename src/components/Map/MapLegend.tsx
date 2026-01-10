'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';
import { useResponsive } from '@/hooks';
import { ROLE_COLORS } from '@/lib/mapConfig';
import { ROUTE_COLORS, ROUTE_LABELS, type RouteType } from '@/data/routes';
import { cn } from '@/lib/utils';

interface MapLegendProps {
  /** Currently visible route types */
  visibleRouteTypes: RouteType[];
  /** Callback to toggle a route type */
  onToggleRouteType: (type: RouteType) => void;
}

/**
 * MapLegend Component
 *
 * Displays a color-coded legend explaining country roles and trafficking routes.
 * Responsive: collapsible bottom bar on mobile, fixed card on desktop.
 */
export const MapLegend: React.FC<MapLegendProps> = ({
  visibleRouteTypes,
  onToggleRouteType,
}) => {
  const { isMobile } = useResponsive();
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  // Country role items
  const roleItems = [
    {
      label: 'Drug-Producing',
      color: ROLE_COLORS.producer,
      description: 'Coca cultivation & cocaine production',
    },
    {
      label: 'Transit',
      color: ROLE_COLORS.transit,
      description: 'Drug trafficking routes',
    },
    {
      label: 'Mixed',
      color: ROLE_COLORS.mixed,
      description: 'Production & transit activities',
    },
    {
      label: 'Consumer',
      color: ROLE_COLORS.consumer,
      description: 'Major destination markets',
    },
    {
      label: 'Other',
      color: ROLE_COLORS.other,
      description: 'Non-regional key actors',
    },
  ];

  // Route type items
  const routeItems: { type: RouteType; label: string; color: string; symbol: string }[] = [
    { type: 'land', label: ROUTE_LABELS.land, color: ROUTE_COLORS.land, symbol: '━━━▶' },
    { type: 'maritime', label: ROUTE_LABELS.maritime, color: ROUTE_COLORS.maritime, symbol: '━━━▶' },
    { type: 'air', label: ROUTE_LABELS.air, color: ROUTE_COLORS.air, symbol: '- - -▶' },
  ];

  // Legend content (shared between mobile and desktop)
  const legendContent = (
    <div className="space-y-4">
      {/* Country Roles Section */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          Country Roles
        </h4>
        <div className="space-y-1.5">
          {roleItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm flex-shrink-0 border border-gray-300/50"
                style={{ backgroundColor: item.color }}
                aria-label={`${item.label} color indicator`}
              />
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Route Types Section */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          Trafficking Routes
        </h4>
        <div className="space-y-1">
          {routeItems.map((item) => {
            const isActive = visibleRouteTypes.includes(item.type);
            return (
              <button
                key={item.type}
                onClick={() => onToggleRouteType(item.type)}
                className={cn(
                  'flex items-center gap-2 w-full text-left py-1.5 px-2 -mx-2 rounded transition-colors',
                  'hover:bg-gray-100 min-h-[44px]',
                  isActive ? 'opacity-100' : 'opacity-50'
                )}
                aria-pressed={isActive}
                aria-label={`Toggle ${item.label}`}
              >
                {/* Checkbox indicator */}
                <div
                  className={cn(
                    'w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors',
                    isActive
                      ? 'bg-slate-700 border-slate-700'
                      : 'border-gray-300 bg-white'
                  )}
                >
                  {isActive && <Check className="w-3 h-3 text-white" />}
                </div>

                {/* Route symbol */}
                <span
                  className="text-sm font-mono flex-shrink-0"
                  style={{ color: item.color }}
                >
                  {item.symbol}
                </span>

                {/* Label */}
                <span className="text-sm text-gray-700">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Mobile: Collapsible bottom bar
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-30">
        {/* Collapsible panel */}
        <div
          className={cn(
            'bg-white/95 backdrop-blur border-t shadow-lg transition-all duration-300',
            isExpanded ? 'max-h-[60vh]' : 'max-h-0'
          )}
        >
          <div className="px-4 pb-4 pt-2 overflow-y-auto max-h-[calc(60vh-48px)]">
            {legendContent}
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-white/95 backdrop-blur border-t px-4 py-3 flex items-center justify-center gap-2 min-h-[48px]"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse legend' : 'Expand legend'}
        >
          <span className="text-sm font-medium text-gray-700">Legend</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
    );
  }

  // Desktop: Fixed position card
  return (
    <div className="fixed bottom-6 left-6 bg-white/95 backdrop-blur rounded-lg shadow-lg p-4 z-30 max-w-xs border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Map Legend</h3>
      {legendContent}
    </div>
  );
};
