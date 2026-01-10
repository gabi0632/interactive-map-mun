'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { CountryPanelProps } from '@/types';

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
 */
export function CountryPanel({ country, isOpen, onClose }: CountryPanelProps) {
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
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
