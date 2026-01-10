'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MapLegend, MapSkeleton } from '@/components/Map';
import { CountryPanel } from '@/components/CountryPanel';
import { ErrorBoundary } from '@/components/ui';
import { allCountries, getCountryById } from '@/data/countries';
import type { CountryRole } from '@/types';
import type { RouteType } from '@/data/routes';

// Dynamically import InteractiveMap with no SSR (map requires browser APIs)
const InteractiveMap = dynamic(
  () => import('@/components/Map').then((mod) => ({ default: mod.InteractiveMap })),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  }
);

// Pre-compute role lookup for map coloring
const countryRoles: Record<string, CountryRole> = {};
allCountries.forEach(country => {
  countryRoles[country.id] = country.role;
});

export default function Home() {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [visibleRouteTypes, setVisibleRouteTypes] = useState<RouteType[]>([
    'land',
    'maritime',
    'air',
  ]);

  const handleCountryClick = (countryId: string) => {
    setSelectedCountryId(countryId);
  };

  const handleClosePanel = () => {
    setSelectedCountryId(null);
  };

  const toggleRouteType = (type: RouteType) => {
    setVisibleRouteTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const selectedCountry = selectedCountryId ? getCountryById(selectedCountryId) : null;

  return (
    <main className="h-screen flex flex-col">
      {/* Header with UNODC branding */}
      <header className="bg-slate-800 text-white px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div>
          <h1 className="text-base sm:text-lg font-bold leading-tight">
            Simulation Countries and Drug Trafficking Routes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            in Latin America - Interactive Map for MUN
          </p>
        </div>
        <div className="flex items-center gap-2 text-right">
          <div className="hidden sm:block text-right">
            <div className="font-semibold text-sm">UNODC</div>
            <div className="text-[10px] leading-tight text-slate-300">
              UNITED NATIONS OFFICE
              <br />
              ON DRUGS AND CRIME
            </div>
          </div>
          <div className="sm:hidden font-semibold text-sm">UNODC</div>
        </div>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative">
        <ErrorBoundary>
          <Suspense fallback={<MapSkeleton />}>
            <InteractiveMap
              onCountryClick={handleCountryClick}
              selectedCountry={selectedCountryId}
              countryRoles={countryRoles}
              visibleRouteTypes={visibleRouteTypes}
            />
          </Suspense>
          <MapLegend
            visibleRouteTypes={visibleRouteTypes}
            onToggleRouteType={toggleRouteType}
          />
        </ErrorBoundary>
      </div>

      {/* Country Panel */}
      <CountryPanel
        country={selectedCountry ?? null}
        isOpen={!!selectedCountryId}
        onClose={handleClosePanel}
      />
    </main>
  );
}
