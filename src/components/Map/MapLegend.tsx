'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Ship, Plane, Truck } from 'lucide-react';
import { useResponsive } from '@/hooks';
import { ROLE_COLORS } from '@/lib/mapConfig';
import { ROUTE_COLORS, ROUTE_LABELS, type RouteType } from '@/data/routes';
import { cn } from '@/lib/utils';

interface MapLegendProps {
  visibleRouteTypes: RouteType[];
  onToggleRouteType: (type: RouteType) => void;
}

const RouteIcon: Record<RouteType, React.ReactNode> = {
  land: <Truck className="w-3 h-3" />,
  maritime: <Ship className="w-3 h-3" />,
  air: <Plane className="w-3 h-3" />,
};

export const MapLegend: React.FC<MapLegendProps> = ({
  visibleRouteTypes,
  onToggleRouteType,
}) => {
  const { isMobile } = useResponsive();
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const roleItems = [
    { label: 'Producer', color: ROLE_COLORS.producer },
    { label: 'Transit', color: ROLE_COLORS.transit },
    { label: 'Mixed', color: ROLE_COLORS.mixed },
    { label: 'Consumer', color: ROLE_COLORS.consumer },
    { label: 'Other', color: ROLE_COLORS.other },
  ];

  const routeItems: { type: RouteType; label: string; color: string }[] = [
    { type: 'land', label: ROUTE_LABELS.land, color: ROUTE_COLORS.land },
    { type: 'maritime', label: ROUTE_LABELS.maritime, color: ROUTE_COLORS.maritime },
    { type: 'air', label: ROUTE_LABELS.air, color: ROUTE_COLORS.air },
  ];

  // Mobile: Bottom bar - fixed position always visible
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div
          className={cn(
            'bg-slate-900/95 backdrop-blur-sm overflow-hidden transition-all duration-300',
            isExpanded ? 'max-h-[300px]' : 'max-h-0'
          )}
        >
          <div className="p-4 space-y-3">
            {/* Country Roles */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 font-medium mb-2">
                Country Roles
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {roleItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[11px] text-white/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10" />

            {/* Route Types */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 font-medium mb-2">
                Routes
              </div>
              <div className="flex gap-2">
                {routeItems.map((item) => {
                  const isActive = visibleRouteTypes.includes(item.type);
                  return (
                    <button
                      key={item.type}
                      onClick={() => onToggleRouteType(item.type)}
                      className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-all',
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'bg-white/5 text-white/40'
                      )}
                    >
                      <span style={{ color: isActive ? item.color : undefined }}>
                        {RouteIcon[item.type]}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-slate-900/95 backdrop-blur-sm px-4 py-2.5 flex items-center justify-center gap-2 border-t border-white/10"
        >
          <span className="text-xs font-medium text-white/70">Legend</span>
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-white/50" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-white/50" />
          )}
        </button>
      </div>
    );
  }

  // Desktop: Floating card - fixed position always visible
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-3 min-w-[200px]">
      {/* Country Roles */}
      <div className="mb-3">
        <div className="text-[9px] uppercase tracking-wider text-white/40 font-semibold mb-1.5">
          Country Roles
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {roleItems.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] text-white/70">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 my-2" />

      {/* Route Types */}
      <div>
        <div className="text-[9px] uppercase tracking-wider text-white/40 font-semibold mb-1.5">
          Routes
        </div>
        <div className="flex flex-wrap gap-1.5">
          {routeItems.map((item) => {
            const isActive = visibleRouteTypes.includes(item.type);
            return (
              <button
                key={item.type}
                onClick={() => onToggleRouteType(item.type)}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-medium transition-all',
                  isActive
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'
                )}
              >
                <span style={{ color: isActive ? item.color : undefined }}>
                  {RouteIcon[item.type]}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
