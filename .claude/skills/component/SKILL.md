---
name: component
description: Scaffold new React components with proper structure including TypeScript types, styles, and optional tests. Use when creating new components.
allowed-tools: Write, Read, Edit, Bash, Glob
---

# Component Scaffold Skill

Quickly create new React components with consistent structure.

## Usage

When invoked, ask for:
1. Component name (PascalCase)
2. Component location (Map, CountryPanel, UI, or custom)
3. Whether to include tests

## Component Structure

### Basic Component
```
src/components/{Location}/{ComponentName}/
├── {ComponentName}.tsx       # Main component
├── {ComponentName}.types.ts  # TypeScript interfaces (if complex)
└── index.ts                  # Barrel export
```

### With Tests
```
src/components/{Location}/{ComponentName}/
├── {ComponentName}.tsx
├── {ComponentName}.types.ts
├── {ComponentName}.test.tsx
└── index.ts
```

## Templates

### Main Component ({ComponentName}.tsx)
```tsx
'use client';

import { type FC } from 'react';

interface {ComponentName}Props {
  // Define props here
}

export const {ComponentName}: FC<{ComponentName}Props> = ({
  // Destructure props
}) => {
  return (
    <div className="">
      {/* Component content */}
    </div>
  );
};
```

### Types File ({ComponentName}.types.ts)
```tsx
export interface {ComponentName}Props {
  // Props interface
}

export interface {ComponentName}State {
  // Internal state types if needed
}
```

### Index File (index.ts)
```tsx
export { {ComponentName} } from './{ComponentName}';
export type { {ComponentName}Props } from './{ComponentName}.types';
```

### Test File ({ComponentName}.test.tsx)
```tsx
import { render, screen } from '@testing-library/react';
import { {ComponentName} } from './{ComponentName}';

describe('{ComponentName}', () => {
  it('renders without crashing', () => {
    render(<{ComponentName} />);
    // Add assertions
  });
});
```

## Component Locations

| Location | Path | Purpose |
|----------|------|---------|
| Map | `src/components/Map/` | Map-related components |
| CountryPanel | `src/components/CountryPanel/` | Country info display |
| UI | `src/components/UI/` | Shared UI elements |
| Layout | `src/components/Layout/` | Page layouts |

## Conventions

1. **Use 'use client'** for interactive components
2. **FC type** for function components
3. **Explicit return type** or FC generic
4. **Props interface** always defined
5. **Named exports** (not default)

## After Creating

1. Add to parent index.ts if exists
2. Import where needed
3. Update context file with new component
