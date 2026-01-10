'use client';

import { useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { CountryPanelProps } from '@/types';
import { useResponsive } from '@/hooks';

import { CountryHeader } from './CountryHeader';
import { CountryStats } from './CountryStats';
import { CountryPrograms } from './CountryPrograms';
import { CountryOrganizations } from './CountryOrganizations';
import { PolicyStance } from './PolicyStance';
import { Sources } from './Sources';

/**
 * CountryPanel Component
 * Main slide-in panel that displays comprehensive country information
 * related to drug trafficking in Latin America
 *
 * Responsive Behavior:
 * - Desktop (≥1024px): Right-side sheet panel
 * - Tablet (768-1023px): Bottom sheet panel
 */
export function CountryPanel({ country, isOpen, onClose }: CountryPanelProps) {
  const { isTablet } = useResponsive();

  // Keyboard accessibility and body scroll lock for tablet bottom sheet
  useEffect(() => {
    // Only apply for tablet bottom sheet when open
    if (!isOpen || !isTablet) return;

    // Handle Escape key to close
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleEscape);

    // Lock body scroll when sheet is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Cleanup: restore scroll and remove listener
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isTablet, onClose]);

  // Shared panel content
  const panelContent = country ? (
    <div className="flex flex-col gap-6 p-6">
      {/* Country Header */}
      <CountryHeader country={country} />

      <Separator />

      {/* Statistics Section */}
      <CountryStats stats={country.stats} />

      <Separator />

      {/* UNODC Programs */}
      <CountryPrograms programs={country.unodcPrograms} />

      {/* Only show separator if programs exist */}
      {country.unodcPrograms && country.unodcPrograms.length > 0 && (
        <Separator />
      )}

      {/* Criminal Organizations */}
      <CountryOrganizations
        organizations={country.criminalOrganizations}
      />

      {/* Only show separator if organizations exist */}
      {country.criminalOrganizations &&
        country.criminalOrganizations.length > 0 && <Separator />}

      {/* Policy Stance */}
      <PolicyStance policyStance={country.policyStance} />

      <Separator />

      {/* Sources */}
      <Sources sources={country.sources} />
    </div>
  ) : null;

  // Tablet: Custom bottom sheet
  if (isTablet) {
    return (
      <>
        {/* Backdrop overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        {/* Bottom sheet */}
        <div
          className={`
            fixed bottom-0 left-0 right-0 z-50
            bg-white rounded-t-2xl shadow-2xl
            max-h-[70vh] overflow-hidden
            transform transition-transform duration-300 ease-out
            ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          `}
          role="dialog"
          aria-modal="true"
          aria-labelledby="bottom-sheet-title"
        >
          {/* Drag handle indicator */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={onClose}
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Accessible title for screen readers */}
          {country && (
            <h2 id="bottom-sheet-title" className="sr-only">
              {country.name} Information
            </h2>
          )}

          {/* Scrollable content */}
          <ScrollArea className="h-full">
            {panelContent}
          </ScrollArea>
        </div>
      </>
    );
  }

  // Desktop: Side sheet (existing behavior)
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md md:max-w-lg p-0"
      >
        {country && (
          <>
            {/* Accessible title for screen readers */}
            <SheetHeader className="sr-only">
              <SheetTitle>{country.name} Information</SheetTitle>
            </SheetHeader>

            {/* Scrollable content area */}
            <ScrollArea className="h-full">
              {panelContent}
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
