'use client';

import { useState } from 'react';
import { InteractiveMap, MapLegend } from '@/components/Map';
import { CountryPanel } from '@/components/CountryPanel';
import { MobileWarning } from '@/components/ui';
import { allCountries, getCountryById } from '@/data/countries';
import type { CountryRole } from '@/types';

// Pre-compute role lookup for map coloring
const countryRoles: Record<string, CountryRole> = {};
allCountries.forEach(country => {
  countryRoles[country.id] = country.role;
});

export default function Home() {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);

  const handleCountryClick = (countryId: string) => {
    setSelectedCountryId(countryId);
  };

  const handleClosePanel = () => {
    setSelectedCountryId(null);
  };

  const selectedCountry = selectedCountryId ? getCountryById(selectedCountryId) : null;

  return (
    <main className="h-screen flex flex-col">
      {/* Mobile Warning Overlay */}
      <MobileWarning />

      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">
          UNODC Drug Trafficking in Latin America
        </h1>
        <p className="text-sm text-gray-500">
          Interactive Map for Model United Nations
        </p>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100">
        <InteractiveMap
          onCountryClick={handleCountryClick}
          selectedCountry={selectedCountryId}
          countryRoles={countryRoles}
        />
        <MapLegend />
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
