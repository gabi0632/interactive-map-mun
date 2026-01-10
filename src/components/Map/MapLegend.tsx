'use client';

import { ROLE_COLORS } from '@/lib/mapConfig';

/**
 * MapLegend Component
 *
 * Displays a color-coded legend explaining country roles in drug trafficking.
 * Positioned at the bottom-left of the map.
 */
export const MapLegend: React.FC = () => {
  const legendItems = [
    { label: 'Producer', color: ROLE_COLORS.producer, description: 'Coca cultivation & cocaine production' },
    { label: 'Transit', color: ROLE_COLORS.transit, description: 'Drug trafficking routes' },
    { label: 'Mixed', color: ROLE_COLORS.mixed, description: 'Production & transit activities' },
    { label: 'Consumer', color: ROLE_COLORS.consumer, description: 'Major destination markets' },
    { label: 'Other', color: ROLE_COLORS.other, description: 'Non-regional key actors (precursor chemicals)' },
  ];

  return (
    <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 z-10 max-w-xs">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Country Roles</h3>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div
              className="w-6 h-6 rounded flex-shrink-0 mt-0.5 border border-gray-200"
              style={{ backgroundColor: item.color }}
              aria-label={`${item.label} color indicator`}
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{item.label}</div>
              <div className="text-xs text-gray-600">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
