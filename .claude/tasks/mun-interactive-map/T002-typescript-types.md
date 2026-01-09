# Task T002: TypeScript Types Definition

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T002 |
| **Phase** | 1 - Foundation |
| **Priority** | P0 (Critical) |
| **Agent** | `type-architect` |
| **Estimated Complexity** | Low |
| **Can Run In Parallel** | Yes (with T003, T004) |

## Description
Create all TypeScript interfaces and types for the application based on the PRD data schema.

## Prerequisites
- T001 completed (project initialized)

## Acceptance Criteria
- [ ] `Country` interface created matching PRD schema
- [ ] `CountryRole` type defined
- [ ] `CountryStats` interface created
- [ ] `UNODCProgram` interface created
- [ ] `CriminalOrganization` interface created
- [ ] Component prop types defined
- [ ] All types exported from `src/types/index.ts`
- [ ] No TypeScript errors

## Implementation Steps

### Step 1: Create Type Files
Create the following files:
- `src/types/country.ts`
- `src/types/map.ts`
- `src/types/ui.ts`
- `src/types/index.ts`

### Step 2: Define Country Types
```typescript
// src/types/country.ts
export type CountryRole = "producer" | "transit" | "consumer" | "mixed";

export interface CountryStats {
  cocaCultivation?: number;
  cocaineProduction?: number;
  seizures?: number;
  eradicationEfforts?: number;
  traffickingRoutes?: string[];
}

export interface UNODCProgram {
  name: string;
  description: string;
  startYear?: number;
}

export interface CriminalOrganization {
  name: string;
  description: string;
}

export interface Country {
  id: string;
  name: string;
  capital: string;
  population: number;
  flag: string;
  role: CountryRole;
  roleDescription: string;
  stats: CountryStats;
  unodcPrograms: UNODCProgram[];
  policyStance: string;
  criminalOrganizations?: CriminalOrganization[];
  sources: string[];
}
```

### Step 3: Define Component Types
```typescript
// src/types/map.ts
export interface MapProps {
  onCountryClick: (countryId: string) => void;
  selectedCountry: string | null;
}

// src/types/ui.ts
export interface CountryPanelProps {
  country: Country | null;
  onClose: () => void;
  isOpen: boolean;
}
```

### Step 4: Create Index Export
```typescript
// src/types/index.ts
export * from './country';
export * from './map';
export * from './ui';
```

## Output Artifacts
- `src/types/country.ts`
- `src/types/map.ts`
- `src/types/ui.ts`
- `src/types/index.ts`

## Verification Command
```bash
bun run build
# Should compile without type errors
```

## Parallel Tasks
Can run simultaneously with:
- T003 (GeoJSON Setup)
- T004 (Country Data - Producer Countries)

## Blocks
- T005 (InteractiveMap component needs types)
- T006 (CountryPanel component needs types)
