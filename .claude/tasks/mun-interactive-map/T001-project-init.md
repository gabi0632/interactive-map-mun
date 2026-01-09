# Task T001: Project Initialization

## Overview
| Field | Value |
|-------|-------|
| **Task ID** | T001 |
| **Phase** | 1 - Foundation |
| **Priority** | P0 (Critical) |
| **Agent** | `project-setup` |
| **Estimated Complexity** | Medium |
| **Can Run In Parallel** | No (must be first) |

## Description
Initialize the Next.js project with TypeScript, TailwindCSS, and all required dependencies.

## Prerequisites
- None (this is the first task)

## Acceptance Criteria
- [ ] Next.js 14+ initialized with App Router
- [ ] TypeScript configured and working
- [ ] TailwindCSS installed and configured
- [ ] ESLint configured
- [ ] `bun dev` runs without errors
- [ ] Project structure matches PRD specification

## Implementation Steps

### Step 1: Initialize Next.js
```bash
bun create next-app . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### Step 2: Install Dependencies
```bash
bun add react-simple-maps react-tooltip
bun add -D @types/react-simple-maps
```

### Step 3: Create Directory Structure
```
src/
├── components/
│   ├── Map/
│   ├── CountryPanel/
│   └── UI/
├── data/
│   └── countries/
├── types/
├── lib/
└── hooks/
public/
├── flags/
└── geo/
```

### Step 4: Configure Tailwind Colors
Add to `tailwind.config.ts`:
```typescript
colors: {
  producer: '#EF4444',
  transit: '#F97316',
  mixed: '#EAB308',
  consumer: '#3B82F6',
  inactive: '#9CA3AF',
}
```

## Output Artifacts
- `package.json` with all dependencies
- `tailwind.config.ts` with custom colors
- `tsconfig.json` properly configured
- Directory structure created

## Verification Command
```bash
bun dev
# Should start on http://localhost:3000 without errors
```

## Blocks
- T002, T003, T004, T005, T006, T007, T008, T009 (all tasks depend on this)

## Notes
- Use `--src-dir` flag to put code in `src/` directory
- Ensure Bun lockfile is created (`bun.lockb`)
