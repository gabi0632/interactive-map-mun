'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { FileText } from 'lucide-react';
import { MapLegend, MapSkeleton } from '@/components/Map';
import { CountryPanel } from '@/components/CountryPanel';
import { DocumentViewer } from '@/components/DocumentViewer';
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
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);

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
      {/* Header - fixed floating design that stays visible during zoom */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2 pointer-events-none">
        <div className="flex justify-between items-start">
          {/* Left: Title - clickable to open document viewer */}
          <button
            onClick={() => setIsDocumentOpen(true)}
            className="pointer-events-auto bg-slate-900/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-xl border border-slate-700/50 text-left hover:bg-slate-800/95 hover:border-blue-500/50 transition-all group cursor-pointer"
            title="Click to view reference document"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <h1 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Drug Trafficking Routes
              </h1>
            </div>
            <p className="text-[9px] sm:text-[10px] text-blue-300/80 tracking-wider group-hover:text-blue-200/80 transition-colors">
              UNODC • Interactive Map for MUN
            </p>
          </button>

          {/* Right: UNODC Badge - clickable link */}
          <a
            href="https://www.unodc.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto bg-blue-600/95 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-xl flex items-center gap-2 hover:bg-blue-500/95 transition-colors cursor-pointer"
            title="Visit UNODC Website"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">UN</span>
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-[10px] font-bold text-white tracking-wider">UNODC</div>
            </div>
          </a>
        </div>
      </header>

      {/* Map Container - full screen */}
      <div className="h-full w-full relative">
        <ErrorBoundary>
          <Suspense fallback={<MapSkeleton />}>
            <InteractiveMap
              onCountryClick={handleCountryClick}
              selectedCountry={selectedCountryId}
              countryRoles={countryRoles}
              visibleRouteTypes={visibleRouteTypes}
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Legend - outside map container to avoid transform issues during zoom */}
      <MapLegend
        visibleRouteTypes={visibleRouteTypes}
        onToggleRouteType={toggleRouteType}
      />

      {/* Country Panel */}
      <CountryPanel
        country={selectedCountry ?? null}
        isOpen={!!selectedCountryId}
        onClose={handleClosePanel}
      />

      {/* Document Viewer */}
      <DocumentViewer
        isOpen={isDocumentOpen}
        onClose={() => setIsDocumentOpen(false)}
      />
    </main>
  );
}
