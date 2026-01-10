# Task T010b: Map Visual Enhancements

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T010b |
| **Phase** | 3 - Polish |
| **Priority** | P0 (Critical - Pre-deployment) |
| **Agent** | `map-developer` + `ui-developer` |
| **Estimated Complexity** | High |
| **Can Run In Parallel** | Yes (after T007) |

## Description
Enhance the map to match the reference design (image.png). This includes visual styling, country labels, trafficking routes, and UNODC branding.

## Reference Image
See `/image.png` in project root for the target design.

## Prerequisites
- T007 completed (main page integration)
- T005 completed (interactive map component)

## Acceptance Criteria
- [ ] Ocean/sea background is blue (not gray)
- [ ] Country names are displayed as labels on the map
- [ ] Full world map view is shown (not just Latin America zoom)
- [ ] Color scheme updated: green for producers, yellow/beige for transit
- [ ] Drug trafficking route arrows displayed (land, maritime, air)
- [ ] UNODC logo/branding in header
- [ ] Legend updated to include route types
- [ ] Simulation countries list with flags at bottom
- [ ] **Visual verification in Chrome confirms match with reference**

## Implementation Steps

### Step 1: Update Ocean Background Color
Update the map container and background to use blue for water:
```tsx
// Update InteractiveMap.tsx or parent container
const oceanColor = '#A8D5E5'; // Light blue for ocean
// Or use a gradient/pattern for more visual appeal
```

### Step 2: Add Country Name Labels
Add text labels for countries using react-simple-maps Marker or Annotation:
```tsx
import { Marker, Annotation } from 'react-simple-maps';

// Add labels for each simulation country
const countryLabels = [
  { name: 'MEXICO', coordinates: [-102, 24] },
  { name: 'COLOMBIA', coordinates: [-74, 4] },
  { name: 'BRAZIL', coordinates: [-55, -10] },
  // ... more countries
];
```

### Step 3: Expand to World Map View
Update projection configuration to show full world:
```tsx
<ComposableMap
  projection="geoMercator"
  projectionConfig={{
    scale: 120,
    center: [-40, 0] // Centered to show Americas and Europe/Africa
  }}
>
```

### Step 4: Update Color Scheme
Change role colors to match reference:
```tsx
const ROLE_COLORS: Record<CountryRole | 'inactive', string> = {
  producer: '#4A7C59',    // Green for drug-producing countries
  transit: '#D4A84B',     // Yellow/beige for transit countries
  mixed: '#C4A35A',       // Darker yellow for mixed
  consumer: '#8B4513',    // Brown for consumer (if shown)
  other: '#CD5C5C',       // Red for other key actors
  inactive: '#D3D3D3'     // Light gray for non-simulation countries
};
```

### Step 5: Add Trafficking Route Arrows
Create route visualization components:
```tsx
// src/components/Map/TraffickingRoutes.tsx
interface Route {
  from: [number, number];
  to: [number, number];
  type: 'land' | 'maritime' | 'air';
}

const routes: Route[] = [
  // Land routes
  { from: [-74, 4], to: [-99, 19], type: 'land' }, // Colombia to Mexico
  // Maritime routes
  { from: [-80, 9], to: [-77, 18], type: 'maritime' }, // Panama to Caribbean
  // Air routes
  { from: [-74, 4], to: [-3, 40], type: 'air' }, // Colombia to Europe
];

// Use SVG path or Line components to draw routes with arrows
```

### Step 6: Add UNODC Branding
Add UNODC logo and title to header:
```tsx
// src/components/Map/MapHeader.tsx
export function MapHeader() {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-800 text-white">
      <div>
        <h1 className="text-xl font-bold">Simulation Countries and</h1>
        <h2 className="text-lg">Drug Trafficking Routes in Latin America</h2>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">UNODC</span>
        <span className="text-xs">UNITED NATIONS OFFICE<br/>ON DRUGS AND CRIME</span>
      </div>
    </div>
  );
}
```

### Step 7: Update Legend with Route Types
Expand legend to include route indicators:
```tsx
// Update MapLegend.tsx
const routeItems = [
  { icon: '→', label: 'Land Routes', color: '#000' },
  { icon: '⟿', label: 'Maritime Routes', color: '#0066CC' },
  { icon: '✈', label: 'Air Routes', color: '#CC0000' },
];
```

### Step 8: Add Simulation Countries List
Create footer component with country flags:
```tsx
// src/components/Map/SimulationCountriesList.tsx
export function SimulationCountriesList() {
  const countries = [
    { flag: '🇺🇸', name: 'United States' },
    { flag: '🇲🇽', name: 'Mexico' },
    { flag: '🇨🇴', name: 'Colombia' },
    { flag: '🇧🇷', name: 'Brazil' },
    // ... all simulation countries
  ];

  return (
    <div className="bg-slate-100 p-4">
      <h3 className="font-bold mb-2">Simulation Countries:</h3>
      <div className="grid grid-cols-4 gap-2">
        {countries.map(c => (
          <div key={c.name} className="flex items-center gap-1">
            <span>{c.flag}</span>
            <span className="text-sm">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Output Artifacts
- `src/components/Map/InteractiveMap.tsx` (updated)
- `src/components/Map/MapLegend.tsx` (updated)
- `src/components/Map/TraffickingRoutes.tsx` (new)
- `src/components/Map/MapHeader.tsx` (new)
- `src/components/Map/CountryLabels.tsx` (new)
- `src/components/Map/SimulationCountriesList.tsx` (new)
- `src/lib/mapConfig.ts` (updated colors)

## Verification
```bash
bun dev
# Navigate to localhost:3000
# Compare visually with /image.png reference
```

## Post-Task Required
**MUST verify in Chrome using browser automation tools:**
- Ocean is blue
- Country labels visible
- Routes displayed correctly
- Colors match reference
- Legend includes all items
- UNODC branding present

## Blocks
- T011 (Testing - must include visual tests for new features)
- T012 (Deployment - visual enhancements required before deploy)

## Parallel Tasks
Can run after T007, parallel with:
- T008, T009, T010
