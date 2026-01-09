# Task T008: Hover Tooltips

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T008 |
| **Phase** | 3 - Polish |
| **Priority** | P1 (High) |
| **Agent** | `ui-developer` |
| **Estimated Complexity** | Low |
| **Can Run In Parallel** | Yes (with T009) |

## Description
Add hover tooltips to countries using shadcn/ui Tooltip component showing country name and role on mouse hover.

## Prerequisites
- T001 completed (shadcn/ui installed with tooltip component)
- T007 completed (main page integration)

## Acceptance Criteria
- [ ] shadcn Tooltip appears on country hover
- [ ] Shows country name and role badge
- [ ] Smooth fade in/out animation
- [ ] Only shows for relevant countries
- [ ] Consistent with shadcn design system
- [ ] **ui-tester agent verifies behavior**

## shadcn Components Used
- `Tooltip` - Hover tooltip
- `TooltipTrigger` - Trigger element
- `TooltipContent` - Tooltip content
- `TooltipProvider` - Context provider
- `Badge` - Role badge inside tooltip

## Implementation Steps

### Step 1: Ensure Tooltip is Installed
```bash
# Should already be installed from T001, but verify:
bunx --bun shadcn@latest add tooltip
```

### Step 2: Create MapTooltip Component
```tsx
// src/components/Map/MapTooltip.tsx
'use client';

import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { CountryRole } from '@/types';

const ROLE_STYLES: Record<CountryRole, string> = {
  producer: 'bg-red-500 text-white',
  transit: 'bg-orange-500 text-white',
  mixed: 'bg-yellow-500 text-black',
  consumer: 'bg-blue-500 text-white',
};

const ROLE_LABELS: Record<CountryRole, string> = {
  producer: 'Producer',
  transit: 'Transit',
  mixed: 'Mixed',
  consumer: 'Consumer',
};

interface MapTooltipProps {
  countryName: string;
  role: CountryRole;
  children: React.ReactNode;
}

export function MapTooltip({ countryName, role, children }: MapTooltipProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-2">
          <span className="font-medium">{countryName}</span>
          <Badge className={`${ROLE_STYLES[role]} text-xs`}>
            {ROLE_LABELS[role]}
          </Badge>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

### Step 3: Update InteractiveMap to Use Tooltips
Since react-simple-maps doesn't natively support React components as wrappers, we'll use a custom tooltip state approach:

```tsx
// src/components/Map/InteractiveMap.tsx
'use client';

import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
// ... other imports

interface TooltipData {
  x: number;
  y: number;
  name: string;
  role: CountryRole;
}

export function InteractiveMap({ ... }) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // In Geography component:
  <Geography
    onMouseEnter={(event) => {
      const countryId = geo.properties.ISO_A3;
      if (countryRoles[countryId]) {
        const { clientX, clientY } = event;
        setTooltip({
          x: clientX,
          y: clientY,
          name: geo.properties.NAME,
          role: countryRoles[countryId],
        });
      }
    }}
    onMouseMove={(event) => {
      if (tooltip) {
        setTooltip(prev => prev ? {
          ...prev,
          x: event.clientX,
          y: event.clientY,
        } : null);
      }
    }}
    onMouseLeave={() => setTooltip(null)}
    // ... rest of props
  />

  // Render tooltip
  {tooltip && (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: tooltip.x + 10,
        top: tooltip.y + 10,
      }}
    >
      <div className="bg-popover text-popover-foreground rounded-md border px-3 py-2 shadow-md flex items-center gap-2">
        <span className="font-medium">{tooltip.name}</span>
        <Badge className={ROLE_STYLES[tooltip.role]}>
          {ROLE_LABELS[tooltip.role]}
        </Badge>
      </div>
    </div>
  )}
}
```

### Step 4: Add Tooltip Styling
```tsx
// Use shadcn design tokens
const ROLE_STYLES: Record<CountryRole, string> = {
  producer: 'bg-red-500 hover:bg-red-600 text-white',
  transit: 'bg-orange-500 hover:bg-orange-600 text-white',
  mixed: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  consumer: 'bg-blue-500 hover:bg-blue-600 text-white',
};
```

## Output Artifacts
- `src/components/Map/InteractiveMap.tsx` (updated with tooltip logic)
- Tooltip uses shadcn design tokens

## Verification
```bash
bun dev
# Hover over countries and verify:
# - Tooltip appears with country name
# - Badge shows correct role with color
# - Tooltip follows cursor
# - Smooth appearance/disappearance
```

## Post-Task Required
**MUST trigger `ui-tester` agent to verify:**
- Tooltips display correctly
- Badge colors match role
- Smooth animation
- No flickering

## Parallel Tasks
Can run simultaneously with:
- T009 (Responsive Design)
- T010 (Loading States)
- T011 (Testing)
