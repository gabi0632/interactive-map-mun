# Task T010: Loading States & Error Handling

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T010 |
| **Phase** | 3 - Polish |
| **Priority** | P1 (High) |
| **Agent** | `ui-developer` |
| **Estimated Complexity** | Low |
| **Can Run In Parallel** | Yes (with T008, T009) |

## Description
Add loading spinner while map initializes and error boundaries for graceful error handling.

## Prerequisites
- T007 completed (main page integration)

## Acceptance Criteria
- [ ] Loading spinner shown while map loads
- [ ] Smooth transition from loading to map
- [ ] Error boundary catches component errors
- [ ] User-friendly error message displayed
- [ ] **ui-tester agent verifies loading state**

## Implementation Steps

### Step 1: Create LoadingSpinner
```tsx
// src/components/UI/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500 mb-4" />
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  );
}
```

### Step 2: Create Error Boundary
```tsx
// src/components/UI/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="text-center p-6">
            <span className="text-5xl mb-4 block">⚠️</span>
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              The map failed to load. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Step 3: Add Suspense to Map
```tsx
// src/app/page.tsx
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { ErrorBoundary } from '@/components/UI/ErrorBoundary';

// Lazy load the map component
const InteractiveMap = dynamic(
  () => import('@/components/Map').then(mod => mod.InteractiveMap),
  { loading: () => <LoadingSpinner /> }
);

export default function Home() {
  return (
    <main>
      <ErrorBoundary>
        <div className="flex-1 relative bg-gray-100">
          <Suspense fallback={<LoadingSpinner />}>
            <InteractiveMap {...props} />
          </Suspense>
        </div>
      </ErrorBoundary>
    </main>
  );
}
```

## Output Artifacts
- `src/components/UI/LoadingSpinner.tsx`
- `src/components/UI/ErrorBoundary.tsx`
- `src/app/page.tsx` (updated)

## Verification
```bash
bun dev
# Refresh page and observe loading state
# Check network tab to see map data loading
```

## Post-Task Required
**MUST trigger `ui-tester` agent to verify loading spinner displays**

## Parallel Tasks
Can run simultaneously with:
- T008 (Hover Tooltips)
- T009 (Responsive Design)
