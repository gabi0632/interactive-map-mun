'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

interface CountryPanelSkeletonProps {
  /** Whether the skeleton panel is open */
  isOpen: boolean;

  /** Callback when panel should close */
  onClose: () => void;
}

/**
 * CountryPanelSkeleton Component
 *
 * Loading state skeleton for the CountryPanel component.
 * Matches the structure and layout of the real CountryPanel to provide
 * a smooth loading experience with minimal layout shift.
 */
export function CountryPanelSkeleton({ isOpen, onClose }: CountryPanelSkeletonProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md md:max-w-lg p-0"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Loading country information...</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-full">
          <div className="flex flex-col gap-6 p-6">
            {/* Country Header Skeleton */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Flag skeleton */}
                <Skeleton className="h-8 w-12 rounded" />
                {/* Country name skeleton */}
                <Skeleton className="h-6 w-32" />
              </div>
              {/* Capital & population skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
              </div>
              {/* Role badge skeleton */}
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            <Separator />

            {/* Statistics Section Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-28" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </div>

            <Separator />

            {/* UNODC Programs Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-36" />
              <div className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Criminal Organizations Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-44" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>

            <Separator />

            {/* Policy Stance Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>

            <Separator />

            {/* Sources Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
