# Task T004b: Country Data - Transit Countries

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T004b |
| **Phase** | 2 - Data Integration |
| **Priority** | P0 (Critical) |
| **Agent** | `data-compiler` |
| **Estimated Complexity** | High |
| **Can Run In Parallel** | Yes (with T004, T004c) |

## Description
Create complete data files for transit countries: Mexico, Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panama.

## Prerequisites
- T001 completed (project initialized)
- T002 completed (types defined)

## Acceptance Criteria
- [ ] Mexico data complete (most detailed - major transit hub)
- [ ] Guatemala data complete
- [ ] Honduras data complete
- [ ] El Salvador data complete
- [ ] Nicaragua data complete
- [ ] Costa Rica data complete
- [ ] Panama data complete
- [ ] All data validated against types
- [ ] Cartel/organization info included

## Countries to Complete

### Mexico (MEX) - HIGHEST PRIORITY
- Primary transit country to US
- Major cartels: Sinaloa, CJNG, Gulf Cartel
- Fentanyl production
- Land and maritime routes

### Guatemala (GTM)
- Northern Triangle
- Key land route from South America
- Local transportistas

### Honduras (HND)
- Northern Triangle
- Caribbean maritime routes
- Gang involvement (MS-13, Barrio 18)

### El Salvador (SLV)
- Northern Triangle
- Gang-dominated territories
- Recent crackdown policies

### Nicaragua (NIC)
- Maritime and air routes
- Less enforcement capacity
- Caribbean coast vulnerabilities

### Costa Rica (CRI)
- Maritime transit
- Pacific and Caribbean coasts
- Port trafficking

### Panama (PAN)
- Darien Gap crossing
- Major maritime hub
- Container shipping exploitation

## Implementation Steps

### Step 1: Create Mexico Data (Template)
```typescript
// src/data/countries/mexico.ts
import { Country } from '@/types';

export const mexico: Country = {
  id: 'MEX',
  name: 'Mexico',
  capital: 'Mexico City',
  population: 128900000,
  flag: '🇲🇽',
  role: 'transit',
  roleDescription: 'Primary transit country for cocaine entering the United States. Also significant producer of fentanyl and methamphetamine.',
  stats: {
    seizures: 25000,           // kg cocaine
    traffickingRoutes: ['USA']
  },
  unodcPrograms: [...],
  policyStance: 'Multi-faceted approach including military involvement...',
  criminalOrganizations: [
    {
      name: 'Sinaloa Cartel',
      description: 'One of the most powerful drug trafficking organizations'
    },
    {
      name: 'CJNG',
      description: 'Jalisco New Generation Cartel - fastest growing organization'
    }
  ],
  sources: [...]
};
```

### Step 2: Create Central American Countries
Create similar files for GTM, HND, SLV, NIC, CRI, PAN

### Step 3: Update Index
```typescript
// Add to src/data/countries/index.ts
export const transitCountries: Country[] = [
  mexico, guatemala, honduras, elSalvador,
  nicaragua, costaRica, panama
];
```

## Output Artifacts
- `src/data/countries/mexico.ts`
- `src/data/countries/guatemala.ts`
- `src/data/countries/honduras.ts`
- `src/data/countries/el-salvador.ts`
- `src/data/countries/nicaragua.ts`
- `src/data/countries/costa-rica.ts`
- `src/data/countries/panama.ts`

## Parallel Tasks
Can run simultaneously with:
- T004 (Producer Countries)
- T004c (Mixed/Consumer Countries)
- T003 (GeoJSON Setup)

## Blocks
- T006 (CountryPanel display)
