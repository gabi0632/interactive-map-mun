# Interactive Map MUN Project

## Project Overview
An interactive web-based map for Model United Nations (MUN) competition focused on **UNODC Drug Trafficking in Latin America**.

### Topic Summary
- **Committee**: United Nations Office on Drugs and Crime (UNODC)
- **Topic**: Drug Trafficking in Latin America
- **Focus Areas**:
  - Cocaine production (Colombia, Peru, Bolivia)
  - Transit routes (Mexico, Central America, Caribbean)
  - Transnational Organized Crime (TOC)
  - Synthetic opioids (fentanyl)
  - UNODC programs (PCCP, CRIMJUST)

## Context Management System

### Rules for Context Files
Each session MUST maintain its own context file:
1. Context files are stored in `.claude/context/context_{id}.md`
2. The index is stored in `.claude/context/index` (simple number)
3. Every new task creates a new context file by incrementing the index
4. Sub-agents MUST update the active context file with their progress
5. NEVER delete context content - only ADD or mark tasks as COMPLETED
6. Context files track: task description, progress, sub-agent outputs, decisions

### Creating a New Context
```bash
# Read current index, increment, write new context
current=$(cat .claude/context/index 2>/dev/null || echo "0")
new=$((current + 1))
echo $new > .claude/context/index
touch .claude/context/context_$new.md
```

### Context File Format
```markdown
# Context #{id}
**Created**: {timestamp}
**Task**: {task description}

## Progress
- [ ] Step 1
- [x] Step 2 (completed)

## Sub-agent Updates
### {agent-name} - {timestamp}
{update content}

## Decisions Made
- Decision 1: {rationale}

## Status: {ACTIVE|COMPLETED}
```

## Common Commands
- **Dev server**: `bun dev`
- **Build**: `bun run build`
- **Lint**: `bun run lint`
- **Install deps**: `bun install`

## UI Testing Workflow (MANDATORY)

### Rule: Always Test UI Changes Visually

After ANY UI-related work, the `ui-tester` agent MUST be triggered to verify changes using the Claude IDE extension.

### When to Trigger ui-tester

Trigger `ui-tester` agent after:
- Creating new components (via `/component` or manually)
- Modifying existing components in `src/components/`
- Any styling changes (Tailwind, CSS)
- Layout modifications
- After `ui-developer` agent completes

### UI Testing Process

1. **Ensure dev server is running**: `bun dev`
2. **Trigger ui-tester agent** to verify changes
3. **Use Claude IDE extension** to:
   - Capture screenshot of the component/page
   - Visually verify the output
   - Check responsive behavior
4. **Report issues** found in the context file
5. **Fix issues** before marking UI task complete

### Agent Chain for UI Work

```
ui-developer → ui-tester → (fix if needed) → code-reviewer
```

### IDE Extension Usage

After UI changes, use the Claude IDE extension to:
1. Open browser at `http://localhost:3000`
2. Navigate to the changed component/page
3. Capture screenshot or share view
4. Verify visual output matches expectations

**NEVER mark a UI task as complete without visual verification.**

## Tech Stack
- **Runtime**: Bun (package manager + runtime)
- **Framework**: Next.js 14+ with TypeScript
- **Map Library**: Leaflet (react-leaflet)
- **Styling**: TailwindCSS
- **Data**: Static JSON files (imported at build time)
- **Deployment**: Vercel (recommended)

## Countries in Simulation
### Production Countries
- Colombia, Peru, Bolivia

### Transit Countries
- Mexico, Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panama
- Ecuador, Venezuela, Brazil

### Key Partners/Stakeholders
- United States (major consumer market)
- European countries (growing market)

## Data to Display per Country
When a user clicks on a country, show:
1. **Basic Info**: Population, capital, flag
2. **Drug Trafficking Role**: Producer/Transit/Consumer
3. **Key Statistics**: Seizures, cultivation area, etc.
4. **UNODC Programs**: Active programs in the country
5. **Policy Stance**: Country's approach to drug trafficking
6. **Major Criminal Organizations**: If applicable

## File Structure
```
interactive-map-mun/
├── .claude/                    # Claude Code configuration
│   ├── context/                # Task context files
│   ├── skills/                 # Custom skills
│   ├── agents/                 # Sub-agents
│   ├── hooks/                  # Automation hooks
│   └── rules/                  # Code rules
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Map/                # Map components
│   │   ├── CountryPanel/       # Country info panel
│   │   └── UI/                 # Shared UI components
│   ├── data/
│   │   └── countries/          # Country JSON files
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   └── lib/                    # Utilities
├── public/
│   └── geo/                    # GeoJSON files
├── CLAUDE.md
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Important Links
- @UNODC Drug Trafficking.pdf - Main reference document
