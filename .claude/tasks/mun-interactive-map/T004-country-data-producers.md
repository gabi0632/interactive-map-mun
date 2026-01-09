# Task T004: Country Data - Producer Countries

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T004 |
| **Phase** | 2 - Data Integration |
| **Priority** | P0 (Critical) |
| **Agent** | `data-compiler` |
| **Estimated Complexity** | High |
| **Can Run In Parallel** | Yes (with T002, T003) |

## Description
Create complete data files for the three producer countries: Colombia, Peru, Bolivia.

## Prerequisites
- T001 completed (project initialized)
- Reference: UNODC Drug Trafficking.pdf

## Acceptance Criteria
- [ ] Colombia data file complete
- [ ] Peru data file complete
- [ ] Bolivia data file complete
- [ ] All data matches TypeScript types
- [ ] Sources cited for all statistics
- [ ] UNODC programs documented

## Countries to Complete

### Colombia (COL)
- Largest cocaine producer
- Key data: Coca cultivation, cocaine production
- Organizations: FARC remnants, ELN, Clan del Golfo
- UNODC Programs: PCCP, SIMCI

### Peru (PER)
- Second largest producer
- Key data: Coca cultivation, eradication efforts
- Organizations: Sendero Luminoso remnants
- UNODC Programs: Alternative development

### Bolivia (BOL)
- Third largest producer
- Key data: Legal coca policy, cultivation
- Unique: Legal coca for traditional use
- UNODC Programs: Monitoring programs

## Implementation Steps

### Step 1: Create Data Directory
```bash
mkdir -p src/data/countries
```

### Step 2: Create Colombia Data
```typescript
// src/data/countries/colombia.ts
import { Country } from '@/types';

export const colombia: Country = {
  id: 'COL',
  name: 'Colombia',
  capital: 'Bogotá',
  population: 51874024,
  flag: '🇨🇴',
  role: 'producer',
  roleDescription: 'World\'s largest cocaine producer, responsible for approximately 70% of global cocaine supply.',
  stats: {
    cocaCultivation: 204000,    // hectares (2022)
    cocaineProduction: 1400,    // metric tons
    seizures: 500000,           // kg
    eradicationEfforts: 50000,  // hectares
    traffickingRoutes: ['MEX', 'ECU', 'VEN', 'BRA', 'PAN']
  },
  unodcPrograms: [
    {
      name: 'PCCP',
      description: 'Paris Pact Capacity Building Programme',
      startYear: 2015
    },
    {
      name: 'SIMCI',
      description: 'Integrated System for Monitoring Illicit Crops',
      startYear: 1999
    }
  ],
  policyStance: 'Focus on rural development, alternative crops, and targeting major trafficking organizations.',
  criminalOrganizations: [
    {
      name: 'Clan del Golfo',
      description: 'Largest drug trafficking organization in Colombia'
    },
    {
      name: 'ELN',
      description: 'Guerrilla group involved in drug trafficking'
    }
  ],
  sources: [
    'https://www.unodc.org/colombia/',
    'https://dataunodc.un.org/'
  ]
};
```

### Step 3: Create Peru Data
Similar structure for Peru with:
- 95,000 ha coca cultivation
- Unique trafficking routes
- Local criminal organizations

### Step 4: Create Bolivia Data
Similar structure for Bolivia with:
- Legal coca policy details
- 30,000 ha coca cultivation
- Unique regulatory approach

### Step 5: Create Index Export
```typescript
// src/data/countries/index.ts
export { colombia } from './colombia';
export { peru } from './peru';
export { bolivia } from './bolivia';

import { colombia } from './colombia';
import { peru } from './peru';
import { bolivia } from './bolivia';
import { Country } from '@/types';

export const producerCountries: Country[] = [colombia, peru, bolivia];
```

## Output Artifacts
- `src/data/countries/colombia.ts`
- `src/data/countries/peru.ts`
- `src/data/countries/bolivia.ts`
- `src/data/countries/index.ts` (partial)

## Verification
```bash
# Import and verify no type errors
bun run build
```

## Parallel Tasks
Can run simultaneously with:
- T002 (TypeScript Types)
- T003 (GeoJSON Setup)
- T004b (Transit Countries data)
- T004c (Mixed/Consumer Countries data)

## Blocks
- T006 (CountryPanel needs data to display)
