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
  isLoading: boolean;
}

/**
 * useResponsive Hook
 *
 * Tracks viewport size and returns boolean flags for device type.
 * SSR-safe with isLoading flag to prevent hydration mismatch and flash.
 * Debounced resize handler prevents excessive re-renders.
 *
 * @returns {ResponsiveState} Object with isMobile, isTablet, isDesktop, isLoading flags
 *
 * @example
 * const { isMobile, isTablet, isDesktop, isLoading } = useResponsive();
 *
 * if (isLoading) return null; // Prevent flash
 * if (isMobile) return <MobileWarning />;
 * if (isTablet) return <BottomSheet />;
 * return <SidePanel />;
 */
export function useResponsive(): ResponsiveState {
  // Track if component has mounted on client
  const [mounted, setMounted] = useState(false);

  // Default to desktop on server to prevent hydration mismatch
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLoading: true,
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
        isLoading: false,
      });
    };

    // Debounce function to prevent excessive re-renders
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateResponsiveState, 200);
    };

    // Set initial state immediately
    updateResponsiveState();
    setMounted(true);

    // Listen for resize events with debounce
    window.addEventListener('resize', debouncedUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}
