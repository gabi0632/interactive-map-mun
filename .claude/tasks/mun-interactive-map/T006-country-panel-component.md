# Task T006: Country Panel Component

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T006 |
| **Phase** | 1 - Foundation |
| **Priority** | P0 (Critical) |
| **Agent** | `ui-developer` |
| **Estimated Complexity** | High |
| **Can Run In Parallel** | Yes (with T005 after T002) |

## Description
Build the slide-in CountryPanel component that displays detailed information when a country is selected.

## Prerequisites
- T001 completed (project initialized)
- T002 completed (types defined)
- At least one country data file exists (T004/T004b/T004c)

## Acceptance Criteria
- [ ] Panel slides in from right on country selection
- [ ] Displays country flag and name
- [ ] Shows role badge with correct color
- [ ] Displays statistics section
- [ ] Shows UNODC programs
- [ ] Shows criminal organizations (if any)
- [ ] Close button works
- [ ] Smooth animation
- [ ] Responsive on tablet
- [ ] **ui-tester agent verifies visual output**

## Implementation Steps

### Step 1: Create Component Structure
```
src/components/CountryPanel/
├── CountryPanel.tsx        # Main panel container
├── CountryHeader.tsx       # Flag, name, role badge
├── CountryStats.tsx        # Statistics display
├── CountryPrograms.tsx     # UNODC programs
├── CountryOrganizations.tsx # Criminal orgs
└── index.ts
```

### Step 2: Implement CountryPanel
```tsx
// src/components/CountryPanel/CountryPanel.tsx
'use client';

import { Country } from '@/types';
import { CountryHeader } from './CountryHeader';
import { CountryStats } from './CountryStats';
import { CountryPrograms } from './CountryPrograms';
import { CountryOrganizations } from './CountryOrganizations';

interface CountryPanelProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CountryPanel({ country, isOpen, onClose }: CountryPanelProps) {
  if (!country) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 transition-opacity z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl
          transform transition-transform duration-300 ease-out z-50 overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          aria-label="Close panel"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <CountryHeader country={country} />
          <CountryStats stats={country.stats} />
          <CountryPrograms programs={country.unodcPrograms} />
          {country.criminalOrganizations && (
            <CountryOrganizations organizations={country.criminalOrganizations} />
          )}

          {/* Policy Stance */}
          <section className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Policy Stance</h3>
            <p className="text-gray-600">{country.policyStance}</p>
          </section>

          {/* Sources */}
          <section className="mt-6 pt-4 border-t">
            <h4 className="font-medium text-sm text-gray-500 mb-2">Sources</h4>
            <ul className="text-sm text-blue-600">
              {country.sources.map((source, i) => (
                <li key={i}>
                  <a href={source} target="_blank" rel="noopener noreferrer">
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
```

### Step 3: Implement CountryHeader
```tsx
// src/components/CountryPanel/CountryHeader.tsx
import { Country, CountryRole } from '@/types';

const ROLE_COLORS: Record<CountryRole, string> = {
  producer: 'bg-red-500',
  transit: 'bg-orange-500',
  mixed: 'bg-yellow-500',
  consumer: 'bg-blue-500',
};

const ROLE_LABELS: Record<CountryRole, string> = {
  producer: 'Producer',
  transit: 'Transit',
  mixed: 'Mixed Role',
  consumer: 'Consumer Market',
};

export function CountryHeader({ country }: { country: Country }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-3">
        <span className="text-5xl">{country.flag}</span>
        <div>
          <h2 className="text-2xl font-bold">{country.name}</h2>
          <p className="text-gray-500">{country.capital}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-white text-sm ${ROLE_COLORS[country.role]}`}>
          {ROLE_LABELS[country.role]}
        </span>
        <span className="text-gray-500 text-sm">
          Pop: {country.population.toLocaleString()}
        </span>
      </div>

      <p className="mt-3 text-gray-600">{country.roleDescription}</p>
    </div>
  );
}
```

### Step 4: Implement Sub-components
Create CountryStats.tsx, CountryPrograms.tsx, CountryOrganizations.tsx

### Step 5: Export Components
```typescript
// src/components/CountryPanel/index.ts
export { CountryPanel } from './CountryPanel';
```

## Output Artifacts
- `src/components/CountryPanel/CountryPanel.tsx`
- `src/components/CountryPanel/CountryHeader.tsx`
- `src/components/CountryPanel/CountryStats.tsx`
- `src/components/CountryPanel/CountryPrograms.tsx`
- `src/components/CountryPanel/CountryOrganizations.tsx`
- `src/components/CountryPanel/index.ts`

## Verification
```bash
bun dev
# Test panel opens/closes with animation
# Verify all sections display correctly
```

## Post-Task Required
**MUST trigger `ui-tester` agent after completion to verify:**
- Panel slides in smoothly
- All sections render correctly
- Close button works
- Responsive behavior

## Parallel Tasks
Can run simultaneously with:
- T005 (InteractiveMap - after T002/T003)

## Blocks
- T007 (Main Page Integration)
