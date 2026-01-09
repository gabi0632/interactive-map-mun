---
paths: src/**/*.{ts,tsx}
---

# TypeScript Rules

## Type Safety
- No `any` types - use `unknown` if type is truly unknown
- Define interfaces for all data structures
- Export types that are used across files

## React Components
- Use functional components only
- Define Props interface for each component
- Use React.FC<Props> or explicit return types

## File Naming
- Components: PascalCase (e.g., `CountryPanel.tsx`)
- Utilities: camelCase (e.g., `formatNumber.ts`)
- Types: PascalCase with `.types.ts` suffix or inline

## Imports
- Use absolute imports from `src/`
- Group: React, external libs, internal, types, styles
