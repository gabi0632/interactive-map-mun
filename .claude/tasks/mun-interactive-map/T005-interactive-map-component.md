# Task T005: Interactive Map Component

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T005 |
| **Phase** | 1 - Foundation |
| **Priority** | P0 (Critical) |
| **Agent** | `map-developer` |
| **Estimated Complexity** | High |
| **Can Run In Parallel** | No |

## Description
Build the core InteractiveMap component using react-simple-maps with country click detection and color coding.

## Prerequisites
- T001 completed (project initialized)
- T002 completed (types defined)
- T003 completed (GeoJSON available)

## Acceptance Criteria
- [ ] Map renders centered on Latin America
- [ ] Countries colored by role (producer/transit/mixed/consumer)
- [ ] Country click triggers callback with country ID
- [ ] Selected country has visual highlight
- [ ] Non-relevant countries shown in gray
- [ ] Zoom/pan functionality works
- [ ] No console errors or warnings
- [ ] **ui-tester agent verifies visual output**

## Implementation Steps

### Step 1: Create Map Component Structure
```
src/components/Map/
├── InteractiveMap.tsx      # Main component
├── CountryGeography.tsx    # Individual country
├── MapLegend.tsx           # Color legend
└── index.ts                # Exports
```

### Step 2: Implement InteractiveMap
```tsx
// src/components/Map/InteractiveMap.tsx
'use client';

import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { CountryRole } from '@/types';

const geoUrl = '/geo/world-110m.json';

const ROLE_COLORS: Record<CountryRole | 'inactive', string> = {
  producer: '#EF4444',
  transit: '#F97316',
  mixed: '#EAB308',
  consumer: '#3B82F6',
  inactive: '#9CA3AF'
};

interface InteractiveMapProps {
  onCountryClick: (countryId: string) => void;
  selectedCountry: string | null;
  countryRoles: Record<string, CountryRole>;
}

export function InteractiveMap({
  onCountryClick,
  selectedCountry,
  countryRoles
}: InteractiveMapProps) {
  const [position, setPosition] = useState({
    coordinates: [-60, -15] as [number, number],
    zoom: 1
  });

  const getCountryColor = (countryId: string) => {
    if (selectedCountry && selectedCountry !== countryId) {
      return '#E5E7EB'; // Faded
    }
    return ROLE_COLORS[countryRoles[countryId] || 'inactive'];
  };

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 150 }}
    >
      <ZoomableGroup
        center={position.coordinates}
        zoom={position.zoom}
        onMoveEnd={({ coordinates, zoom }) =>
          setPosition({ coordinates, zoom })
        }
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryId = geo.properties.ISO_A3;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryColor(countryId)}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  onClick={() => {
                    if (countryRoles[countryId]) {
                      onCountryClick(countryId);
                    }
                  }}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      fill: countryRoles[countryId] ? '#FCA5A5' : undefined,
                      outline: 'none',
                      cursor: countryRoles[countryId] ? 'pointer' : 'default'
                    },
                    pressed: { outline: 'none' }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}
```

### Step 3: Create MapLegend
```tsx
// src/components/Map/MapLegend.tsx
export function MapLegend() {
  const items = [
    { color: '#EF4444', label: 'Producer' },
    { color: '#F97316', label: 'Transit' },
    { color: '#EAB308', label: 'Mixed' },
    { color: '#3B82F6', label: 'Consumer' },
  ];

  return (
    <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
      <h4 className="font-semibold mb-2 text-sm">Legend</h4>
      {items.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-2 text-sm">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: color }}
          />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
```

### Step 4: Export Components
```typescript
// src/components/Map/index.ts
export { InteractiveMap } from './InteractiveMap';
export { MapLegend } from './MapLegend';
```

## Output Artifacts
- `src/components/Map/InteractiveMap.tsx`
- `src/components/Map/MapLegend.tsx`
- `src/components/Map/index.ts`

## Verification
```bash
bun dev
# Navigate to localhost:3000
# Verify map renders and click works
```

## Post-Task Required
**MUST trigger `ui-tester` agent after completion to verify:**
- Map renders correctly
- Colors display properly
- Click interactions work
- Legend is visible

## Blocks
- T007 (Main Page Integration)
