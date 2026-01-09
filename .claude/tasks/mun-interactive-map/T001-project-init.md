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
Initialize the Next.js project with TypeScript, TailwindCSS, shadcn/ui, and all required dependencies.

## Prerequisites
- None (this is the first task)

## Acceptance Criteria
- [ ] Next.js 14+ initialized with App Router
- [ ] TypeScript configured and working
- [ ] TailwindCSS installed and configured
- [ ] shadcn/ui initialized with components
- [ ] ESLint configured
- [ ] `bun dev` runs without errors
- [ ] Project structure matches PRD specification

## Implementation Steps

### Step 1: Initialize Next.js
```bash
bun create next-app . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### Step 2: Initialize shadcn/ui
```bash
bunx --bun shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Slate
- CSS variables: Yes

### Step 3: Install shadcn Components
```bash
# Core UI components
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add card
bunx --bun shadcn@latest add badge
bunx --bun shadcn@latest add tooltip
bunx --bun shadcn@latest add sheet
bunx --bun shadcn@latest add skeleton
bunx --bun shadcn@latest add separator
bunx --bun shadcn@latest add scroll-area
```

### Step 4: Install Map Dependencies
```bash
bun add react-simple-maps
bun add -D @types/react-simple-maps
```

### Step 5: Create Directory Structure
```
src/
├── components/
│   ├── ui/               # shadcn components (auto-created)
│   ├── Map/
│   ├── CountryPanel/
│   └── UI/
├── data/
│   └── countries/
├── types/
├── lib/
│   └── utils.ts          # shadcn utils (auto-created)
└── hooks/
public/
├── flags/
└── geo/
```

### Step 6: Configure Custom Colors
Add to `tailwind.config.ts` (extend shadcn config):
```typescript
theme: {
  extend: {
    colors: {
      // Country role colors
      producer: '#EF4444',
      transit: '#F97316',
      mixed: '#EAB308',
      consumer: '#3B82F6',
      inactive: '#9CA3AF',
    },
  },
},
```

## Output Artifacts
- `package.json` with all dependencies
- `tailwind.config.ts` with shadcn + custom colors
- `components.json` (shadcn config)
- `src/components/ui/` (shadcn components)
- `src/lib/utils.ts` (cn utility)
- `tsconfig.json` properly configured
- Directory structure created

## Verification Command
```bash
bun dev
# Should start on http://localhost:3000 without errors

# Verify shadcn components exist
ls src/components/ui/
# Should show: button.tsx, card.tsx, badge.tsx, etc.
```

## Blocks
- T002, T003, T004, T005, T006, T007, T008, T009 (all tasks depend on this)

## Notes
- Use `--src-dir` flag to put code in `src/` directory
- shadcn/ui components are copied into your project (not imported from package)
- The `cn()` utility in `lib/utils.ts` is used for conditional classes
- Ensure Bun lockfile is created (`bun.lockb`)

## shadcn Components to Install

| Component | Purpose |
|-----------|---------|
| `button` | Close buttons, actions |
| `card` | Country panel sections |
| `badge` | Role badges (Producer, Transit, etc.) |
| `tooltip` | Country hover tooltips |
| `sheet` | Slide-in country panel |
| `skeleton` | Loading states |
| `separator` | Section dividers |
| `scroll-area` | Panel scrolling |
