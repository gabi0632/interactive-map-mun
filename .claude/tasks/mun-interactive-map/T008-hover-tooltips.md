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
Add hover tooltips to countries showing country name and role on mouse hover.

## Prerequisites
- T007 completed (main page integration)

## Acceptance Criteria
- [ ] Tooltip appears on country hover
- [ ] Shows country name and role
- [ ] Follows cursor position
- [ ] Only shows for relevant countries
- [ ] Smooth fade in/out
- [ ] **ui-tester agent verifies behavior**

## Implementation Steps

### Step 1: Install react-tooltip (if not done)
```bash
bun add react-tooltip
```

### Step 2: Update InteractiveMap
```tsx
// src/components/Map/InteractiveMap.tsx
import { Tooltip } from 'react-tooltip';

// Add state for tooltip content
const [tooltipContent, setTooltipContent] = useState('');

// In Geography component:
<Geography
  data-tooltip-id="country-tooltip"
  data-tooltip-content={countryRoles[countryId] ? `${geo.properties.NAME} (${countryRoles[countryId]})` : ''}
  onMouseEnter={() => {
    if (countryRoles[countryId]) {
      setTooltipContent(`${geo.properties.NAME}`);
    }
  }}
  onMouseLeave={() => setTooltipContent('')}
  // ... rest of props
/>

// After map:
<Tooltip
  id="country-tooltip"
  className="!bg-gray-900 !text-white !px-3 !py-2 !rounded-lg !text-sm"
/>
```

### Step 3: Style Tooltip
```css
/* Add to globals.css if needed */
.react-tooltip {
  z-index: 100;
  max-width: 200px;
}
```

## Output Artifacts
- `src/components/Map/InteractiveMap.tsx` (updated)
- `src/app/globals.css` (updated if needed)

## Verification
```bash
bun dev
# Hover over countries and verify tooltip appears
```

## Post-Task Required
**MUST trigger `ui-tester` agent to verify tooltips display correctly**

## Parallel Tasks
Can run simultaneously with:
- T009 (Responsive Design)
