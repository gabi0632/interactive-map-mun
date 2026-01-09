# Task T007: Main Page Integration

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T007 |
| **Phase** | 1 - Foundation |
| **Priority** | P0 (Critical) |
| **Agent** | `ui-developer` |
| **Estimated Complexity** | Medium |
| **Can Run In Parallel** | No |

## Description
Integrate the InteractiveMap and CountryPanel components into the main page, wire up state management, and create the full application layout.

## Prerequisites
- T005 completed (InteractiveMap component)
- T006 completed (CountryPanel component)
- At least one country data file (T004)

## Acceptance Criteria
- [ ] Main page renders map and header
- [ ] Country click opens panel with correct data
- [ ] Panel close returns to default state
- [ ] Other countries fade when one is selected
- [ ] Layout matches PRD wireframe
- [ ] No console errors
- [ ] **ui-tester agent verifies full flow**

## Implementation Steps

### Step 1: Update Page Layout
```tsx
// src/app/page.tsx
'use client';

import { useState } from 'react';
import { InteractiveMap, MapLegend } from '@/components/Map';
import { CountryPanel } from '@/components/CountryPanel';
import { allCountries } from '@/data/countries';
import { Country, CountryRole } from '@/types';

// Build role lookup map
const countryRoles: Record<string, CountryRole> = {};
const countryData: Record<string, Country> = {};

allCountries.forEach(country => {
  countryRoles[country.id] = country.role;
  countryData[country.id] = country;
});

export default function Home() {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);

  const handleCountryClick = (countryId: string) => {
    setSelectedCountryId(countryId);
  };

  const handleClosePanel = () => {
    setSelectedCountryId(null);
  };

  const selectedCountry = selectedCountryId ? countryData[selectedCountryId] : null;

  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            🌐 UNODC Drug Trafficking in Latin America
          </h1>
          <p className="text-sm text-gray-500">
            Interactive Map for Model United Nations
          </p>
        </div>
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
        country={selectedCountry}
        isOpen={!!selectedCountryId}
        onClose={handleClosePanel}
      />
    </main>
  );
}
```

### Step 2: Update Global Styles
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  height: 100%;
  overflow: hidden;
}

/* Custom scrollbar for panel */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
```

### Step 3: Update Layout
```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UNODC Drug Trafficking - MUN Interactive Map',
  description: 'Interactive map for Model United Nations: Drug Trafficking in Latin America',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

## Output Artifacts
- `src/app/page.tsx` (updated)
- `src/app/layout.tsx` (updated)
- `src/app/globals.css` (updated)

## Verification
```bash
bun dev
# Full flow test:
# 1. Page loads with map
# 2. Click a country -> panel opens
# 3. Other countries fade
# 4. Close panel -> returns to normal
```

## Post-Task Required
**MUST trigger `ui-tester` agent to verify:**
- Full page layout
- Country click → panel flow
- Visual styling
- Responsive behavior

## Blocks
- T008 (Hover Tooltips)
- T009 (Responsive Design)
