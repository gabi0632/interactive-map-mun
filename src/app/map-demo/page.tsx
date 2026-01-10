'use client';

import { useState } from 'react';
import { InteractiveMap, MapLegend } from '@/components/Map';
import type { CountryRole } from '@/types';
import type { RouteType } from '@/data/routes';

/**
 * Map Demo Page
 *
 * Demonstrates the InteractiveMap component with mock country roles.
 * This is a temporary demo page for testing the map functionality.
 */
export default function MapDemoPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [visibleRouteTypes, setVisibleRouteTypes] = useState<RouteType[]>([
    'land',
    'maritime',
    'air',
  ]);

  const toggleRouteType = (type: RouteType) => {
    setVisibleRouteTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // Mock country roles data
  const mockCountryRoles: Record<string, CountryRole> = {
    // Producers
    COL: 'producer',
    PER: 'producer',
    BOL: 'producer',

    // Transit
    MEX: 'transit',
    GTM: 'transit',
    HND: 'transit',
    SLV: 'transit',
    CRI: 'transit',
    PAN: 'transit',
    DOM: 'transit',

    // Mixed
    ECU: 'mixed',
    VEN: 'mixed',
    BRA: 'mixed',
    ARG: 'mixed',
    CHL: 'mixed',

    // Consumer - North America
    USA: 'consumer',
    CAN: 'consumer',

    // Consumer - Europe
    GBR: 'consumer',
    DEU: 'consumer',
    FRA: 'consumer',
    ESP: 'consumer',
    ITA: 'consumer',
    AUT: 'consumer',

    // Other
    CHN: 'other',
    RUS: 'other',
  };

  const handleCountryClick = (countryId: string) => {
    console.log('Country clicked:', countryId);
    // Toggle selection - click again to deselect
    setSelectedCountry(countryId === selectedCountry ? null : countryId);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 z-20">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">MUN Interactive Map - Demo</h1>
          <p className="text-gray-300 text-sm">UNODC Drug Trafficking in Latin America</p>
        </div>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100">
        <InteractiveMap
          onCountryClick={handleCountryClick}
          selectedCountry={selectedCountry}
          countryRoles={mockCountryRoles}
        />
        <MapLegend
          visibleRouteTypes={visibleRouteTypes}
          onToggleRouteType={toggleRouteType}
        />

        {/* Selected Country Info */}
        {selectedCountry && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10">
            <h3 className="font-semibold text-gray-900 mb-2">Selected Country</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">ISO Code:</span> {selectedCountry}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Role:</span>{' '}
                <span className="capitalize">{mockCountryRoles[selectedCountry]}</span>
              </p>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur rounded-lg shadow p-3 max-w-xs text-xs text-gray-700 z-10">
          <p className="font-semibold mb-1">Instructions:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Click on a country to select it</li>
            <li>Click again to deselect</li>
            <li>Use mouse wheel to zoom</li>
            <li>Click and drag to pan</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
