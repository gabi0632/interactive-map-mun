'use client';

import { useState } from 'react';
import { CountryPanel } from '@/components/CountryPanel';
import { mockColombia } from '@/components/CountryPanel/CountryPanel.demo';
import { Button } from '@/components/ui/button';
import type { Country } from '@/types';

export default function PanelDemoPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleOpenPanel = () => {
    setSelectedCountry(mockColombia);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">CountryPanel Demo</h1>
          <p className="text-slate-300 text-lg">
            Click the button below to open the Colombia country panel
          </p>
        </div>

        <Button
          onClick={handleOpenPanel}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-lg"
        >
          View Colombia Info
        </Button>

        <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700 max-w-md mx-auto">
          <h2 className="text-white font-semibold mb-2">Test Checklist:</h2>
          <ul className="text-slate-300 text-sm text-left space-y-1">
            <li>✓ Panel slides in from right</li>
            <li>✓ Flag emoji visible (🇨🇴)</li>
            <li>✓ Country name and capital</li>
            <li>✓ Producer badge (red)</li>
            <li>✓ Statistics in 2-column grid</li>
            <li>✓ UNODC programs cards</li>
            <li>✓ Criminal organizations</li>
            <li>✓ Source links with icons</li>
            <li>✓ Close button works</li>
          </ul>
        </div>
      </div>

      <CountryPanel
        country={selectedCountry}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  );
}
