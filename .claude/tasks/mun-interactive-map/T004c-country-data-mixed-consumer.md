# Task T004c: Country Data - Mixed & Consumer Countries

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T004c |
| **Phase** | 2 - Data Integration |
| **Priority** | P1 (High) |
| **Agent** | `data-compiler` |
| **Estimated Complexity** | Medium |
| **Can Run In Parallel** | Yes (with T004, T004b) |

## Description
Create data files for mixed-role countries (Ecuador, Venezuela, Brazil) and consumer markets (USA, Canada).

## Prerequisites
- T001 completed (project initialized)
- T002 completed (types defined)

## Acceptance Criteria
- [ ] Ecuador data complete
- [ ] Venezuela data complete
- [ ] Brazil data complete
- [ ] USA data complete
- [ ] Canada data complete
- [ ] Role classifications correct
- [ ] All data validated

## Countries to Complete

### Mixed Role (Yellow)

#### Ecuador (ECU)
- Transit and growing production
- Port city violence (Guayaquil)
- Mexican cartel presence

#### Venezuela (VEN)
- Transit country
- Weak state control
- Cartel de los Soles

#### Brazil (BRA)
- Transit and consumption
- PCC (Primeiro Comando da Capital)
- Amazon routes

### Consumer Markets (Blue)

#### United States (USA)
- Largest cocaine consumer
- Demand-side policies
- DEA operations

#### Canada (CAN)
- Growing market
- West coast trafficking
- Port vulnerabilities

## Implementation Steps

### Step 1: Create Mixed Country Files
```typescript
// src/data/countries/ecuador.ts
export const ecuador: Country = {
  id: 'ECU',
  name: 'Ecuador',
  role: 'mixed',
  roleDescription: 'Increasingly important transit country with growing domestic production and unprecedented violence.',
  // ... full data
};
```

### Step 2: Create Consumer Market Files
```typescript
// src/data/countries/usa.ts
export const usa: Country = {
  id: 'USA',
  name: 'United States',
  role: 'consumer',
  roleDescription: 'World\'s largest cocaine consumer market, driving demand that fuels Latin American production.',
  // ... full data
};
```

### Step 3: Update Index
```typescript
export const mixedCountries: Country[] = [ecuador, venezuela, brazil];
export const consumerCountries: Country[] = [usa, canada];

export const allCountries: Country[] = [
  ...producerCountries,
  ...transitCountries,
  ...mixedCountries,
  ...consumerCountries
];
```

## Output Artifacts
- `src/data/countries/ecuador.ts`
- `src/data/countries/venezuela.ts`
- `src/data/countries/brazil.ts`
- `src/data/countries/usa.ts`
- `src/data/countries/canada.ts`

## Parallel Tasks
Can run simultaneously with:
- T004 (Producer Countries)
- T004b (Transit Countries)

## Blocks
- T006 (CountryPanel display)
