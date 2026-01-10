'use client';

import { useState, useEffect } from 'react';

/**
 * Breakpoint constants matching Tailwind's default breakpoints
 */
const BREAKPOINTS = {
  mobile: 768,    // < 768px
  tablet: 1024,   // 768px - 1023px
  // desktop: >= 1024px
} as const;

/**
 * Responsive state return type
 */
export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * useResponsive Hook
 *
 * Tracks viewport size and returns boolean flags for device type.
 * SSR-safe with default to desktop on server to prevent hydration mismatch.
 *
 * @returns {ResponsiveState} Object with isMobile, isTablet, isDesktop flags
 *
 * @example
 * const { isMobile, isTablet, isDesktop } = useResponsive();
 *
 * if (isMobile) return <MobileWarning />;
 * if (isTablet) return <BottomSheet />;
 * return <SidePanel />;
 */
export function useResponsive(): ResponsiveState {
  // Default to desktop on server to prevent hydration mismatch
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const updateResponsiveState = () => {
      const width = window.innerWidth;

      setState({
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
        isDesktop: width >= BREAKPOINTS.tablet,
      });
    };

    // Set initial state
    updateResponsiveState();

    // Listen for resize events
    window.addEventListener('resize', updateResponsiveState);

    // Cleanup
    return () => window.removeEventListener('resize', updateResponsiveState);
  }, []);

  return state;
}
