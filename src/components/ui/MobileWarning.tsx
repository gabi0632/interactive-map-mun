'use client';

import { useResponsive } from '@/hooks/useResponsive';

/**
 * MobileWarning Component
 *
 * Displays a full-screen overlay on mobile devices (<768px) to inform users
 * that the application is best viewed on tablet or desktop devices.
 *
 * Features:
 * - Only renders on mobile viewports
 * - Full-screen blocking overlay (z-index 100)
 * - Dark background with centered message
 * - Friendly, emoji-enhanced message
 * - Prevents flash by waiting for client-side hydration
 */
export function MobileWarning() {
  const { isMobile, isLoading } = useResponsive();

  // Don't render anything while loading to prevent flash
  if (isLoading) return null;

  // Only show on mobile devices
  if (!isMobile) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900 p-6"
      role="alert"
      aria-live="polite"
    >
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📱➡️💻</div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Mobile View Not Available
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          This interactive map is designed for tablet and desktop devices.
          Please view on a larger screen for the best experience.
        </p>
        <p className="text-gray-400 text-sm mt-6">
          Minimum recommended width: 768px
        </p>
      </div>
    </div>
  );
}
