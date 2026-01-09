# Task T003: GeoJSON Map Data Setup

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T003 |
| **Phase** | 1 - Foundation |
| **Priority** | P0 (Critical) |
| **Agent** | `map-developer` |
| **Estimated Complexity** | Medium |
| **Can Run In Parallel** | Yes (with T002, T004) |

## Description
Download and configure the world map TopoJSON/GeoJSON data for react-simple-maps.

## Prerequisites
- T001 completed (project initialized)

## Acceptance Criteria
- [ ] World map TopoJSON downloaded
- [ ] File placed in correct location
- [ ] Map renders Latin America correctly
- [ ] All required countries have valid geometry
- [ ] File size optimized (< 500KB)

## Implementation Steps

### Step 1: Download TopoJSON
Download from Natural Earth / world-atlas:
```bash
# Option 1: Use world-atlas package
bun add world-atlas

# Option 2: Direct download (110m resolution - good balance)
curl -o public/geo/world-110m.json \
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
```

### Step 2: Verify Country Codes
Ensure these ISO codes are present:
```
Production: COL, PER, BOL
Transit: MEX, GTM, HND, SLV, NIC, CRI, PAN
Mixed: ECU, VEN, BRA
Consumer: USA, CAN
```

### Step 3: Create Map Constants
```typescript
// src/lib/mapConfig.ts
export const MAP_CENTER: [number, number] = [-60, -15]; // Latin America
export const MAP_SCALE = 400;

export const LATIN_AMERICA_COUNTRIES = [
  'COL', 'PER', 'BOL', 'MEX', 'GTM', 'HND',
  'SLV', 'NIC', 'CRI', 'PAN', 'ECU', 'VEN',
  'BRA', 'USA', 'CAN', 'ARG', 'DOM'
];
```

### Step 4: Test Map Render
Create simple test component to verify map loads:
```tsx
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = '/geo/world-110m.json';

export function TestMap() {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}
```

## Output Artifacts
- `public/geo/world-110m.json` (TopoJSON file)
- `src/lib/mapConfig.ts` (Map configuration)

## Verification
- Map renders without console errors
- Latin American countries visible
- No missing geometry for required countries

## Parallel Tasks
Can run simultaneously with:
- T002 (TypeScript Types)
- T004 (Country Data)

## Blocks
- T005 (InteractiveMap needs geo data)
