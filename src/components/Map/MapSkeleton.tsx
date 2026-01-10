'use client';

import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * MapSkeleton Component
 *
 * Loading state for the InteractiveMap component.
 * Displays a centered loading spinner with text and skeleton placeholders
 * for the map legend to maintain layout consistency.
 */
export function MapSkeleton() {
  return (
    <div className="w-full h-full relative">
      {/* Centered loading spinner */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <p className="text-sm text-gray-500">Loading map...</p>
        </div>
      </div>

      {/* Legend skeleton positioned where MapLegend would be */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 space-y-3">
        {/* Legend title skeleton */}
        <Skeleton className="h-4 w-32" />

        {/* Legend items skeleton (4 role types) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
