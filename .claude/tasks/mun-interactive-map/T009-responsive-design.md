# Task T009: Responsive Design

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T009 |
| **Phase** | 3 - Polish |
| **Priority** | P1 (High) |
| **Agent** | `ui-developer` |
| **Estimated Complexity** | Medium |
| **Can Run In Parallel** | Yes (with T008) |

## Description
Implement responsive design for tablet devices. Convert side panel to bottom sheet on smaller screens.

## Prerequisites
- T007 completed (main page integration)

## Acceptance Criteria
- [ ] Desktop (≥1024px): Side panel layout
- [ ] Tablet (768-1023px): Bottom sheet panel
- [ ] Mobile (<768px): Warning message displayed
- [ ] Smooth transitions between layouts
- [ ] Touch-friendly interactions on tablet
- [ ] **ui-tester agent verifies all breakpoints**

## Implementation Steps

### Step 1: Update CountryPanel for Responsive
```tsx
// src/components/CountryPanel/CountryPanel.tsx
'use client';

import { useEffect, useState } from 'react';
// ... other imports

export function CountryPanel({ country, isOpen, onClose }: CountryPanelProps) {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 768);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  if (!country) return null;

  // Bottom sheet for tablet
  if (isTablet) {
    return (
      <>
        <div
          className={`fixed inset-0 bg-black/20 transition-opacity z-40
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={onClose}
        />
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-2xl
            transform transition-transform duration-300 ease-out z-50 max-h-[70vh] overflow-y-auto
            ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          {/* Drag handle */}
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <XIcon />
          </button>

          <div className="p-6 pt-2">
            {/* Same content as desktop */}
          </div>
        </div>
      </>
    );
  }

  // Desktop side panel (existing code)
  return (
    // ... existing desktop layout
  );
}
```

### Step 2: Add Mobile Warning Component
```tsx
// src/components/UI/MobileWarning.tsx
'use client';

import { useEffect, useState } from 'react';

export function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 text-white z-[100] flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <span className="text-6xl mb-4 block">📱</span>
        <h2 className="text-xl font-bold mb-2">Tablet or Desktop Required</h2>
        <p className="text-gray-300">
          This interactive map is optimized for tablets and desktop devices.
          Please use a larger screen for the best experience.
        </p>
      </div>
    </div>
  );
}
```

### Step 3: Add to Layout
```tsx
// src/app/page.tsx
import { MobileWarning } from '@/components/UI/MobileWarning';

export default function Home() {
  return (
    <main>
      <MobileWarning />
      {/* ... rest of content */}
    </main>
  );
}
```

### Step 4: Update Tailwind Config
```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    screens: {
      'tablet': '768px',
      'desktop': '1024px',
    },
  },
}
```

## Output Artifacts
- `src/components/CountryPanel/CountryPanel.tsx` (updated)
- `src/components/UI/MobileWarning.tsx` (new)
- `tailwind.config.ts` (updated)

## Verification
```bash
bun dev
# Test at different viewport sizes:
# - Desktop: 1200px wide
# - Tablet: 900px wide
# - Mobile: 500px wide (should show warning)
```

## Post-Task Required
**MUST trigger `ui-tester` agent to verify at all breakpoints**

## Parallel Tasks
Can run simultaneously with:
- T008 (Hover Tooltips)
