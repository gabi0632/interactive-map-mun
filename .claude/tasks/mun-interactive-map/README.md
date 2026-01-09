# MUN Interactive Map - Task Execution Guide

## Project Overview
Interactive web-based map for Model United Nations competition focused on UNODC Drug Trafficking in Latin America.

## Task Summary

| Task ID | Name | Agent | Phase | Priority |
|---------|------|-------|-------|----------|
| T001 | Project Initialization | `project-setup` | 1 | P0 |
| T002 | TypeScript Types | `type-architect` | 1 | P0 |
| T003 | GeoJSON Setup | `map-developer` | 1 | P0 |
| T004 | Country Data - Producers | `data-compiler` | 2 | P0 |
| T004b | Country Data - Transit | `data-compiler` | 2 | P0 |
| T004c | Country Data - Mixed/Consumer | `data-compiler` | 2 | P1 |
| T005 | Interactive Map Component | `map-developer` | 1 | P0 |
| T006 | Country Panel Component | `ui-developer` | 1 | P0 |
| T007 | Main Page Integration | `ui-developer` | 1 | P0 |
| T008 | Hover Tooltips | `ui-developer` | 3 | P1 |
| T009 | Responsive Design | `ui-developer` | 3 | P1 |
| T010 | Loading States | `ui-developer` | 3 | P1 |
| T011 | Testing | `test-runner` | 3 | P1 |
| T012 | Deployment | `git-manager` | 4 | P0 |

## Agents Required

| Agent | Purpose | Model |
|-------|---------|-------|
| `project-setup` | Initialize project infrastructure | sonnet |
| `type-architect` | Create TypeScript types/interfaces | sonnet |
| `data-compiler` | Compile country data JSON | sonnet |
| `map-developer` | Build map components | sonnet |
| `ui-developer` | Build UI components | sonnet |
| `ui-tester` | Visual verification (MUST run after UI tasks) | sonnet |
| `test-runner` | Run unit/integration tests | sonnet |
| `code-reviewer` | Review code quality | sonnet |
| `git-manager` | Handle git operations | haiku |

## Dependency Graph

```
T001 (Project Init)
  │
  ├─────────────┬─────────────┐
  ▼             ▼             ▼
T002          T003          T004/T004b/T004c
(Types)     (GeoJSON)      (Country Data)
  │             │             │
  └──────┬──────┘             │
         ▼                    │
       T005 ◄─────────────────┤
  (InteractiveMap)            │
         │                    │
         ▼                    │
       T006 ◄─────────────────┘
  (CountryPanel)
         │
         ▼
       T007
  (Main Page)
         │
  ┌──────┼──────┬──────┐
  ▼      ▼      ▼      ▼
T008   T009   T010   T011
(Tips) (Resp) (Load) (Test)
  │      │      │      │
  └──────┴──────┴──────┘
         │
         ▼
       T012
   (Deployment)
```

## Parallel Execution Groups

### Group 1 (After T001)
**Can run simultaneously:**
- T002 (TypeScript Types) - `type-architect`
- T003 (GeoJSON Setup) - `map-developer`
- T004 (Producer Countries) - `data-compiler`
- T004b (Transit Countries) - `data-compiler`
- T004c (Mixed/Consumer Countries) - `data-compiler`

```bash
# Example: Run all in parallel
# Main agent triggers 5 sub-agents simultaneously
```

### Group 2 (After T002 + T003)
**Can run simultaneously:**
- T005 (InteractiveMap) - `map-developer`
- T006 (CountryPanel) - `ui-developer` (needs at least one country data)

```bash
# Both UI components can be built in parallel
```

### Group 3 (After T007)
**Can run simultaneously:**
- T008 (Hover Tooltips) - `ui-developer`
- T009 (Responsive Design) - `ui-developer`
- T010 (Loading States) - `ui-developer`
- T011 (Testing) - `test-runner`

```bash
# All polish tasks can run in parallel
```

## Execution Order

### Phase 1: Foundation
```
1. T001 → project-setup agent
   └── WAIT for completion

2. PARALLEL:
   ├── T002 → type-architect agent
   ├── T003 → map-developer agent
   └── T004/T004b/T004c → data-compiler agents (can split)
   └── WAIT for all

3. PARALLEL:
   ├── T005 → map-developer agent
   └── T006 → ui-developer agent
   └── WAIT for both
   └── ui-tester agent (verify both)

4. T007 → ui-developer agent
   └── ui-tester agent (verify integration)
```

### Phase 2: Data (runs with Phase 1 Group)
```
Country data tasks can run in parallel with types/geojson
```

### Phase 3: Polish
```
5. PARALLEL (all after T007):
   ├── T008 → ui-developer agent
   ├── T009 → ui-developer agent
   ├── T010 → ui-developer agent
   └── T011 → test-runner agent
   └── WAIT for all
   └── ui-tester agent (verify all)

6. code-reviewer agent (review all code)
```

### Phase 4: Deployment
```
7. T012 → git-manager agent
   └── Deploy to Vercel
```

## Critical Rules

### 1. Always Trigger ui-tester After UI Work
After ANY task that modifies UI (T005, T006, T007, T008, T009, T010):
```
[ui-developer completes] → [ui-tester verifies] → [mark complete]
```

### 2. Never Skip Dependencies
- T005 requires T002 + T003
- T006 requires T002 + at least one country data file
- T007 requires T005 + T006
- T012 requires all previous tasks

### 3. Sub-Agent Execution Only
The main agent should NOT implement tasks directly. Always delegate to the appropriate sub-agent.

## Task File Locations

All task files are in:
```
.claude/tasks/mun-interactive-map/
├── README.md (this file)
├── T001-project-init.md
├── T002-typescript-types.md
├── T003-geojson-setup.md
├── T004-country-data-producers.md
├── T004b-country-data-transit.md
├── T004c-country-data-mixed-consumer.md
├── T005-interactive-map-component.md
├── T006-country-panel-component.md
├── T007-main-page-integration.md
├── T008-hover-tooltips.md
├── T009-responsive-design.md
├── T010-loading-states.md
├── T011-testing.md
└── T012-deployment.md
```

## How to Execute a Task

1. **Read the task file** to understand requirements
2. **Trigger the assigned agent** with the task details
3. **Wait for agent completion**
4. **If UI task**: Trigger `ui-tester` agent
5. **Update context file** with progress
6. **Mark task complete** in tracking

## Estimated Timeline

| Phase | Tasks | Parallel Capable |
|-------|-------|------------------|
| Phase 1 | T001-T007 | High |
| Phase 2 | T004-T004c | High (with Phase 1) |
| Phase 3 | T008-T011 | High |
| Phase 4 | T012 | Sequential |

**With maximum parallelization**, all tasks could complete in 5-6 agent execution rounds.
