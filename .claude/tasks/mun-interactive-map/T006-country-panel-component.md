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
Build the slide-in CountryPanel component using shadcn/ui components that displays detailed information when a country is selected.

## Prerequisites
- T001 completed (project initialized with shadcn/ui)
- T002 completed (types defined)
- At least one country data file exists (T004/T004b/T004c)

## Acceptance Criteria
- [ ] Panel slides in from right using shadcn Sheet
- [ ] Displays country flag and name
- [ ] Shows role badge using shadcn Badge
- [ ] Displays statistics in shadcn Cards
- [ ] Shows UNODC programs
- [ ] Shows criminal organizations (if any)
- [ ] Close button works
- [ ] Smooth animation
- [ ] Responsive on tablet
- [ ] **ui-tester agent verifies visual output**

## shadcn Components Used
- `Sheet` - Slide-in panel container
- `Badge` - Role badges (Producer, Transit, etc.)
- `Card` - Statistics and program sections
- `Button` - Close button
- `ScrollArea` - Scrollable content
- `Separator` - Section dividers

## Implementation Steps

### Step 1: Create Component Structure
```
src/components/CountryPanel/
├── CountryPanel.tsx        # Main panel using Sheet
├── CountryHeader.tsx       # Flag, name, role badge
├── CountryStats.tsx        # Statistics in Cards
├── CountryPrograms.tsx     # UNODC programs
├── CountryOrganizations.tsx # Criminal orgs
└── index.ts
```

### Step 2: Implement CountryPanel with shadcn Sheet
```tsx
// src/components/CountryPanel/CountryPanel.tsx
'use client';

import { Country } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader className="text-left">
              <CountryHeader country={country} />
            </SheetHeader>

            <Separator className="my-4" />

            <CountryStats stats={country.stats} />

            <Separator className="my-4" />

            <CountryPrograms programs={country.unodcPrograms} />

            {country.criminalOrganizations && country.criminalOrganizations.length > 0 && (
              <>
                <Separator className="my-4" />
                <CountryOrganizations organizations={country.criminalOrganizations} />
              </>
            )}

            <Separator className="my-4" />

            {/* Policy Stance */}
            <section>
              <h3 className="font-semibold text-lg mb-2">Policy Stance</h3>
              <p className="text-muted-foreground">{country.policyStance}</p>
            </section>

            {/* Sources */}
            <section className="mt-6 pt-4 border-t">
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Sources</h4>
              <ul className="text-sm space-y-1">
                {country.sources.map((source, i) => (
                  <li key={i}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
```

### Step 3: Implement CountryHeader with shadcn Badge
```tsx
// src/components/CountryPanel/CountryHeader.tsx
import { Country, CountryRole } from '@/types';
import { Badge } from '@/components/ui/badge';

const ROLE_VARIANTS: Record<CountryRole, 'destructive' | 'default' | 'secondary' | 'outline'> = {
  producer: 'destructive',
  transit: 'default',
  mixed: 'secondary',
  consumer: 'outline',
};

const ROLE_LABELS: Record<CountryRole, string> = {
  producer: 'Producer',
  transit: 'Transit',
  mixed: 'Mixed Role',
  consumer: 'Consumer Market',
};

// Custom colors for badges
const ROLE_STYLES: Record<CountryRole, string> = {
  producer: 'bg-red-500 hover:bg-red-600 text-white',
  transit: 'bg-orange-500 hover:bg-orange-600 text-white',
  mixed: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  consumer: 'bg-blue-500 hover:bg-blue-600 text-white',
};

export function CountryHeader({ country }: { country: Country }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <span className="text-5xl">{country.flag}</span>
        <div>
          <h2 className="text-2xl font-bold">{country.name}</h2>
          <p className="text-muted-foreground">{country.capital}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge className={ROLE_STYLES[country.role]}>
          {ROLE_LABELS[country.role]}
        </Badge>
        <span className="text-muted-foreground text-sm">
          Pop: {country.population.toLocaleString()}
        </span>
      </div>

      <p className="text-muted-foreground">{country.roleDescription}</p>
    </div>
  );
}
```

### Step 4: Implement CountryStats with shadcn Cards
```tsx
// src/components/CountryPanel/CountryStats.tsx
import { CountryStats as Stats } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountryStatsProps {
  stats: Stats;
}

export function CountryStats({ stats }: CountryStatsProps) {
  const statItems = [
    { label: 'Coca Cultivation', value: stats.cocaCultivation, unit: 'hectares' },
    { label: 'Cocaine Production', value: stats.cocaineProduction, unit: 'metric tons' },
    { label: 'Seizures', value: stats.seizures, unit: 'kg/year' },
    { label: 'Eradication', value: stats.eradicationEfforts, unit: 'hectares' },
  ].filter(item => item.value !== undefined);

  if (statItems.length === 0) return null;

  return (
    <section>
      <h3 className="font-semibold text-lg mb-3">Key Statistics</h3>
      <div className="grid grid-cols-2 gap-3">
        {statItems.map(({ label, value, unit }) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value?.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{unit}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

### Step 5: Implement CountryPrograms
```tsx
// src/components/CountryPanel/CountryPrograms.tsx
import { UNODCProgram } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CountryProgramsProps {
  programs: UNODCProgram[];
}

export function CountryPrograms({ programs }: CountryProgramsProps) {
  if (programs.length === 0) return null;

  return (
    <section>
      <h3 className="font-semibold text-lg mb-3">UNODC Programs</h3>
      <div className="space-y-3">
        {programs.map((program, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{program.name}</CardTitle>
              {program.startYear && (
                <CardDescription>Since {program.startYear}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{program.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

### Step 6: Implement CountryOrganizations
```tsx
// src/components/CountryPanel/CountryOrganizations.tsx
import { CriminalOrganization } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountryOrganizationsProps {
  organizations: CriminalOrganization[];
}

export function CountryOrganizations({ organizations }: CountryOrganizationsProps) {
  return (
    <section>
      <h3 className="font-semibold text-lg mb-3">Criminal Organizations</h3>
      <div className="space-y-3">
        {organizations.map((org, i) => (
          <Card key={i} className="border-destructive/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-destructive">{org.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{org.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

### Step 7: Export Components
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
# Verify shadcn components render properly
```

## Post-Task Required
**MUST trigger `ui-tester` agent after completion to verify:**
- Sheet slides in smoothly
- Badge colors are correct
- Cards display properly
- ScrollArea works for long content
- Responsive behavior

## Parallel Tasks
Can run simultaneously with:
- T005 (InteractiveMap - after T002/T003)

## Blocks
- T007 (Main Page Integration)
