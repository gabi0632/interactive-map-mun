'use client';

import { useState, Suspense, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { FileText } from 'lucide-react';
import { MapLegend, MapSkeleton, MapControls, type PanDirection } from '@/components/Map';
import { CountryPanel } from '@/components/CountryPanel';
import { DocumentViewer } from '@/components/DocumentViewer';
import { SearchBar } from '@/components/Search';
import { ErrorBoundary } from '@/components/ui';
import { allCountries, getCountryById } from '@/data/countries';
import { getCountryCenter, DEFAULT_CENTER, ZOOM_LEVELS } from '@/data/countryCenters';
import { useResponsive } from '@/hooks';
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
  const { isMobile } = useResponsive();
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [visibleRouteTypes, setVisibleRouteTypes] = useState<RouteType[]>([
    'land',
    'maritime',
    'air',
  ]);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);

  // Map zoom and center state
  const [zoom, setZoom] = useState(isMobile ? 1.2 : 1.5);
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);

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

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev * 1.3, ZOOM_LEVELS.MAX));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev / 1.3, ZOOM_LEVELS.MIN));
  }, []);

  // Pan handler
  const PAN_STEP_BASE = 15; // Base pan distance in map units
  const handlePan = useCallback((direction: PanDirection) => {
    const panAmount = PAN_STEP_BASE / zoom; // Pan less when zoomed in
    setCenter((prev) => {
      const [lng, lat] = prev;
      switch (direction) {
        case 'up':
          return [lng, lat + panAmount];
        case 'down':
          return [lng, lat - panAmount];
        case 'left':
          return [lng - panAmount, lat];
        case 'right':
          return [lng + panAmount, lat];
        default:
          return prev;
      }
    });
  }, [zoom]);

  // Reset view handler
  const handleReset = useCallback(() => {
    setZoom(isMobile ? 1.2 : 1.5);
    setCenter(DEFAULT_CENTER);
  }, [isMobile]);

  // Search select handler - zoom to country and open panel
  const handleSearchSelect = useCallback((countryId: string) => {
    const countryCenter = getCountryCenter(countryId);
    if (countryCenter) {
      setCenter(countryCenter);
      setZoom(ZOOM_LEVELS.COUNTRY_FOCUS);
    }
    setSelectedCountryId(countryId);
  }, []);

  const selectedCountry = selectedCountryId ? getCountryById(selectedCountryId) : null;

  return (
    <main className="h-screen flex flex-col">
      {/* Header - fixed floating design that stays visible during zoom */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2 pointer-events-none">
        <div className="flex justify-between items-start gap-2">
          {/* Left: Title - clickable to open document viewer */}
          <button
            onClick={() => setIsDocumentOpen(true)}
            className="pointer-events-auto bg-slate-900/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-xl border border-slate-700/50 text-left hover:bg-slate-800/95 hover:border-blue-500/50 transition-all group cursor-pointer flex-shrink-0"
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

          {/* Center: Search Bar */}
          <div className="pointer-events-auto flex-1 max-w-xs hidden sm:block">
            <SearchBar onSelectCountry={handleSearchSelect} />
          </div>

          {/* Right: UNODC Badge - clickable link */}
          <a
            href="https://www.unodc.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto bg-blue-600/95 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-xl flex items-center gap-2 hover:bg-blue-500/95 transition-colors cursor-pointer flex-shrink-0"
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

        {/* Mobile Search Bar - below header on small screens */}
        <div className="pointer-events-auto mt-2 sm:hidden">
          <SearchBar onSelectCountry={handleSearchSelect} />
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
              zoom={zoom}
              center={center}
              onZoomChange={setZoom}
              onCenterChange={setCenter}
            />
          </Suspense>
        </ErrorBoundary>

        {/* Map Controls - zoom and pan buttons */}
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onPan={handlePan}
          onReset={handleReset}
          canZoomIn={zoom < ZOOM_LEVELS.MAX}
          canZoomOut={zoom > ZOOM_LEVELS.MIN}
          className="right-4 top-1/2 -translate-y-1/2"
        />
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
