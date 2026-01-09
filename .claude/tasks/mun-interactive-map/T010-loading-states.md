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
Add loading states using shadcn/ui Skeleton component and error boundaries for graceful error handling.

## Prerequisites
- T001 completed (shadcn/ui installed with skeleton component)
- T007 completed (main page integration)

## Acceptance Criteria
- [ ] shadcn Skeleton shown while map loads
- [ ] Smooth transition from loading to map
- [ ] Error boundary catches component errors
- [ ] shadcn Card/Button used for error UI
- [ ] **ui-tester agent verifies loading state**

## shadcn Components Used
- `Skeleton` - Loading placeholder
- `Card` - Error message container
- `Button` - Refresh button

## Implementation Steps

### Step 1: Ensure Skeleton is Installed
```bash
# Should already be installed from T001, but verify:
bunx --bun shadcn@latest add skeleton
```

### Step 2: Create MapSkeleton Component
```tsx
// src/components/Map/MapSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export function MapSkeleton() {
  return (
    <div className="flex items-center justify-center h-full bg-muted/50">
      <div className="text-center space-y-4">
        {/* Map placeholder */}
        <div className="relative">
          <Skeleton className="w-[400px] h-[300px] rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">Loading map...</span>
            </div>
          </div>
        </div>

        {/* Legend skeleton */}
        <div className="flex justify-center gap-4">
          <Skeleton className="w-20 h-6 rounded" />
          <Skeleton className="w-20 h-6 rounded" />
          <Skeleton className="w-20 h-6 rounded" />
          <Skeleton className="w-20 h-6 rounded" />
        </div>
      </div>
    </div>
  );
}
```

### Step 3: Create ErrorFallback Component with shadcn
```tsx
// src/components/UI/ErrorFallback.tsx
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center h-full bg-muted/50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            The map failed to load. This might be a temporary issue.
          </p>
          {error && (
            <p className="mt-2 text-sm text-destructive/80 font-mono">
              {error.message}
            </p>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            onClick={() => resetError?.() || window.location.reload()}
            variant="default"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

### Step 4: Create Error Boundary
```tsx
// src/components/UI/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorFallback
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}
```

### Step 5: Update Main Page with Loading States
```tsx
// src/app/page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { MapSkeleton } from '@/components/Map/MapSkeleton';
import { ErrorBoundary } from '@/components/UI/ErrorBoundary';

// Lazy load the map component
const InteractiveMap = dynamic(
  () => import('@/components/Map').then(mod => ({ default: mod.InteractiveMap })),
  {
    loading: () => <MapSkeleton />,
    ssr: false, // Disable SSR for map (uses window)
  }
);

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <header>...</header>

      {/* Map Container */}
      <ErrorBoundary>
        <div className="flex-1 relative bg-muted/30">
          <Suspense fallback={<MapSkeleton />}>
            <InteractiveMap {...props} />
          </Suspense>
        </div>
      </ErrorBoundary>

      {/* Country Panel */}
      ...
    </main>
  );
}
```

### Step 6: Add Loading State for Panel
```tsx
// src/components/CountryPanel/CountryPanelSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function CountryPanelSkeleton() {
  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Badge */}
      <Skeleton className="h-6 w-20 rounded-full" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-16" />
          </Card>
        ))}
      </div>

      {/* Programs */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Card className="p-4">
          <Skeleton className="h-4 w-40 mb-2" />
          <Skeleton className="h-3 w-full" />
        </Card>
      </div>
    </div>
  );
}
```

## Output Artifacts
- `src/components/Map/MapSkeleton.tsx`
- `src/components/UI/ErrorFallback.tsx`
- `src/components/UI/ErrorBoundary.tsx`
- `src/components/CountryPanel/CountryPanelSkeleton.tsx`
- `src/app/page.tsx` (updated)

## Dependencies Required
```bash
bun add lucide-react  # For icons (AlertTriangle, RefreshCw)
```

## Verification
```bash
bun dev
# Refresh page and observe:
# - Skeleton loading state
# - Smooth transition to map
# - Error state if map fails
```

## Post-Task Required
**MUST trigger `ui-tester` agent to verify:**
- Skeleton displays correctly
- Loading animation smooth
- Error card renders properly
- Button styling matches shadcn

## Parallel Tasks
Can run simultaneously with:
- T008 (Hover Tooltips)
- T009 (Responsive Design)
- T011 (Testing)
