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

---

## CRITICAL: Branch Protection Rules (READ FIRST)

### NEVER START WORK ON MAIN BRANCH

**This rule has NO exceptions. Violating it will cause merge conflicts and data loss.**

Before starting ANY task, you MUST:

1. **Check current branch**: `git branch --show-current`
2. **If on main**: STOP immediately and create a feature branch
3. **If on feature branch**: Verify it's the correct branch for your task

#### Mandatory Pre-Task Checklist

```bash
# ALWAYS run this before starting any work
current_branch=$(git branch --show-current)

if [ "$current_branch" = "main" ]; then
  echo "⛔ ERROR: You are on main branch!"
  echo "⛔ Create a feature branch before doing ANY work!"
  echo "⛔ Run: git checkout -b feature/MUN-XXX-description"
  exit 1
fi

echo "✅ Safe to proceed on branch: $current_branch"
```

#### What Happens If You Work on Main

- Commits cannot be pushed (protected branch)
- Work must be manually moved to a new branch
- Risk of losing uncommitted changes
- Blocks other developers from merging

#### Correct Workflow

```bash
# 1. ALWAYS start from main
git checkout main
git pull origin main

# 2. IMMEDIATELY create feature branch (before any code changes)
git checkout -b feature/MUN-XXX-description

# 3. NOW you can start working
# ... write code, make commits ...
```

#### Prohibited Commands on Main

These commands are FORBIDDEN when on main branch:

- `git add` (any files)
- `git commit`
- `git push origin main`
- Any file creation or modification

#### Recovery If You Accidentally Started on Main

```bash
# If you have uncommitted changes on main:
git stash
git checkout -b feature/MUN-XXX-description
git stash pop

# If you already committed on main:
git branch feature/MUN-XXX-description  # Create branch at current commit
git checkout feature/MUN-XXX-description
git checkout main
git reset --hard origin/main  # Reset main to remote state
```

---

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

After ANY UI-related work, you MUST test the changes in Chrome using the browser automation tools.

### When to Test UI

Test UI after:

- Creating new components (via `/component` or manually)
- Modifying existing components in `src/components/`
- Any styling changes (Tailwind, CSS)
- Layout modifications
- After `ui-developer` agent completes

### UI Testing Process - USE CHROME TOOLS DIRECTLY

**You have access to Chrome browser automation tools. USE THEM.**

#### Step 1: Ensure Dev Server Running
```bash
lsof -i :3000 || bun dev &
```

#### Step 2: Get Browser Tab
```
mcp__claude-in-chrome__tabs_context_mcp({ createIfEmpty: true })
→ Returns tabId
```

#### Step 3: Navigate to Test Page
```
mcp__claude-in-chrome__navigate({ tabId: <id>, url: "http://localhost:3000" })
```

#### Step 4: Wait and Screenshot
```
mcp__claude-in-chrome__computer({ tabId: <id>, action: "wait", duration: 2 })
mcp__claude-in-chrome__computer({ tabId: <id>, action: "screenshot" })
```

#### Step 5: Check Console Errors
```
mcp__claude-in-chrome__read_console_messages({ tabId: <id>, onlyErrors: true })
```

#### Step 6: Test Interactions
```
mcp__claude-in-chrome__computer({ tabId: <id>, action: "left_click", coordinate: [x, y] })
mcp__claude-in-chrome__computer({ tabId: <id>, action: "screenshot" })
```

### Chrome Tools Available

| Tool | Purpose |
|------|---------|
| `mcp__claude-in-chrome__tabs_context_mcp` | Get/create browser tabs |
| `mcp__claude-in-chrome__navigate` | Navigate to URL |
| `mcp__claude-in-chrome__computer` | Screenshot, click, scroll, wait |
| `mcp__claude-in-chrome__read_console_messages` | Check for JS errors |
| `mcp__claude-in-chrome__find` | Find elements by description |
| `mcp__claude-in-chrome__resize_window` | Test responsive design |

### Visual Verification Checklist

- [ ] Component renders without errors
- [ ] Layout matches design intent
- [ ] Colors and styling correct
- [ ] Interactive states work (hover, click)
- [ ] No console errors
- [ ] Responsive behavior OK (test with resize_window)

### Agent Chain for UI Work

```
ui-developer → (test in Chrome) → (fix if needed) → code-reviewer
```

**NEVER mark a UI task as complete without visual verification using Chrome tools.**

## Tech Stack

- **Runtime**: Bun (package manager + runtime)
- **Framework**: Next.js 14+ with TypeScript
- **Map Library**: react-simple-maps (SVG-based, lightweight)
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Styling**: TailwindCSS
- **Data**: Static JSON files (imported at build time)
- **Deployment**: Vercel (recommended)

### shadcn/ui Components Used

- `Sheet` - Country panel slide-in
- `Card` - Statistics and info cards
- `Badge` - Role badges
- `Tooltip` - Hover tooltips
- `Skeleton` - Loading states
- `Button`, `ScrollArea`, `Separator`

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

---

## Multi-Agent Parallel Development Workflow (MANDATORY)

### Overview

This project supports **multiple Claude Code sessions working in parallel** on different branches. Each task runs on its own branch to avoid conflicts, with automatic PR creation and code review loops.

### Core Principles

1. **One task = One branch** - Every task MUST have its own feature branch
2. **Git worktrees for parallelism** - Use worktrees for multiple simultaneous sessions
3. **PR-based merging** - All code merges through reviewed PRs
4. **Automated review loop** - Code reviewer blocks merge until approval
5. **Sub-agents work on feature branches** - Sub-agents MUST execute on the task's branch, NEVER on main

---

### Sub-Agent Branch Requirements (CRITICAL)

**All sub-agents MUST run under their assigned worktree/branch, NOT on main.**

#### Rules for Main Agent (Orchestrator)

When spawning sub-agents, the main agent MUST:

1. **Pass the working directory** - Always include the worktree path in the prompt
2. **Pass the branch name** - Explicitly state which branch the sub-agent is working on
3. **Verify branch before spawning** - Confirm the current branch is correct before delegating

#### Required Information to Pass to Sub-Agents

```markdown
When spawning a sub-agent, ALWAYS include:

1. **Working Directory**: The full path to the worktree
   Example: `/Users/dev/Projects/mun-feature-map/`

2. **Branch Name**: The feature branch being worked on
   Example: `feature/MUN-001-map-component`

3. **Context File**: The active context file for the task
   Example: `.claude/context/context_5.md`
```

#### Example Sub-Agent Prompt

```markdown
You are working on branch `feature/MUN-042-country-panel`.
Working directory: `/Users/dev/Projects/mun-feature-panel/`
Context file: `.claude/context/context_42.md`

Task: [specific task description]

IMPORTANT:
- Do NOT switch branches
- All commits go to `feature/MUN-042-country-panel`
- Update the context file with your progress
```

#### Sub-Agent Responsibilities

When a sub-agent receives a task, it MUST:

1. **Verify the branch** - Run `git branch --show-current` to confirm correct branch
2. **Stay on branch** - NEVER checkout main or any other branch
3. **Commit to feature branch** - All work committed to the assigned branch only
4. **Report branch in updates** - Include branch name in context file updates

#### Prohibited Actions for Sub-Agents

Sub-agents MUST NOT:

- `git checkout main`
- `git checkout` to any branch other than assigned
- Push directly to main
- Create PRs (only main agent does this via git-manager)
- Merge branches

#### Verification Script for Sub-Agents

Sub-agents should verify their environment at startup:

```bash
# Verify correct branch
current_branch=$(git branch --show-current)
expected_branch="feature/MUN-XXX-description"

if [ "$current_branch" != "$expected_branch" ]; then
  echo "ERROR: On wrong branch. Expected: $expected_branch, Got: $current_branch"
  exit 1
fi

# Verify working directory
pwd  # Should match the worktree path provided
```

---

### Branch Naming Convention

```
<type>/MUN-<id>-<short-description>
```

| Type        | Description        | Example                         |
| ----------- | ------------------ | ------------------------------- |
| `feature/`  | New functionality  | `feature/MUN-001-map-component` |
| `fix/`      | Bug fixes          | `fix/MUN-042-click-handler`     |
| `refactor/` | Code restructuring | `refactor/MUN-015-data-layer`   |
| `ui/`       | UI/styling changes | `ui/MUN-023-country-panel`      |
| `data/`     | Data file updates  | `data/MUN-007-colombia-stats`   |

**Rules:**

- Always lowercase
- Use hyphens (not underscores)
- Include task ID for traceability
- Keep descriptions short (2-4 words)

---

### Git Worktree Setup (For Parallel Sessions)

When running multiple Claude Code sessions simultaneously, use git worktrees to avoid conflicts:

```bash
# From the main repository, create worktrees for parallel tasks
git worktree add ../mun-feature-1 -b feature/MUN-001-map-component
git worktree add ../mun-feature-2 -b feature/MUN-002-country-panel
git worktree add ../mun-fix-1 -b fix/MUN-003-hover-bug

# Each worktree needs its own dependencies
cd ../mun-feature-1 && bun install
cd ../mun-feature-2 && bun install

# List all active worktrees
git worktree list

# Remove worktree after PR is merged
git worktree remove ../mun-feature-1
```

**Directory Structure with Worktrees:**

```
~/Projects/
├── interactive-map-mun/          # Main worktree (main branch)
├── mun-feature-map/              # Worktree for map feature
├── mun-feature-panel/            # Worktree for panel feature
└── mun-fix-hotfix/               # Worktree for urgent fix
```

---

### Task Lifecycle (MANDATORY FOR ALL TASKS)

Every task MUST follow this lifecycle:

#### Phase 1: Setup

```bash
# 1. Ensure on latest main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/MUN-XXX-description

# 3. Create context file (per existing rules)
current=$(cat .claude/context/index 2>/dev/null || echo "0")
new=$((current + 1))
echo $new > .claude/context/index
```

#### Phase 2: Development

- Write code following project standards
- Commit frequently with meaningful messages
- Update context file with progress

#### Phase 3: PR Creation & Review Loop

-Before create a pr rebase dev on current changes

```
┌─────────────────────────────────────────────────────────────┐
│                    PR + CODE REVIEW LOOP                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────┐    ┌───────────────┐    ┌─────────────────┐  │
│   │ Complete │───►│ Create PR via │───►│ Run code-reviewer│  │
│   │   Task   │    │  git-manager  │    │     agent       │  │
│   └──────────┘    └───────────────┘    └────────┬────────┘  │
│                                                  │           │
│                                                  ▼           │
│                                        ┌─────────────────┐  │
│                                        │ Issues Found?   │  │
│                                        └────────┬────────┘  │
│                                                 │            │
│                         ┌───────────────────────┼───────────┐│
│                         │                       │           ││
│                         ▼ YES                   ▼ NO        ││
│                   ┌──────────┐           ┌──────────────┐   ││
│                   │  Fix     │           │   Merge PR   │   ││
│                   │  Issues  │           │   to main    │   ││
│                   └────┬─────┘           └──────────────┘   ││
│                        │                                    ││
│                        ▼                                    ││
│                   ┌──────────┐                              ││
│                   │  Commit  │                              ││
│                   │  Fixes   │──────────────────────────────┘│
│                   └──────────┘                               │
│                        │                                     │
│                        └─────► Back to code-reviewer         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Phase 4: Merge & Cleanup

```bash
# After PR approval
gh pr merge <pr-number> --squash --delete-branch

# If using worktree
git worktree remove ../mun-feature-xxx
```

---

### Agent Workflow for PR Review Loop

When a task is complete, execute this exact sequence:

```markdown
## Step 1: Create PR

Trigger `git-manager` agent:

- Push branch to remote
- Create PR with proper title and description
- Return PR number

## Step 2: Code Review

Trigger `code-reviewer` agent:

- Review all files changed in the PR
- Check against review checklist
- Output findings with severity levels

## Step 3: Evaluate Review

IF code-reviewer finds Critical or High issues:
→ Fix the issues
→ Commit fixes
→ Push to same branch (PR updates automatically)
→ GOTO Step 2 (re-run code-reviewer)

IF code-reviewer finds only Medium/Low issues OR no issues:
→ Proceed to merge

## Step 4: Merge

Trigger `git-manager` agent:

- Merge PR to main (squash merge)
- Delete remote branch
- Update context file to COMPLETED
```

---

### Review Loop Implementation

When running the review loop, use this pattern:

```javascript
// Pseudo-code for agent orchestration
let reviewPassed = false;
let reviewCount = 0;
const MAX_REVIEWS = 5; // Prevent infinite loops

while (!reviewPassed && reviewCount < MAX_REVIEWS) {
  reviewCount++;

  // Run code-reviewer agent
  const review = await runAgent("code-reviewer", { pr: prNumber });

  if (review.criticalIssues > 0 || review.highIssues > 0) {
    // Fix issues
    await fixIssues(review.issues);
    await commitAndPush("fix: address code review feedback");
    // Loop continues - code-reviewer runs again
  } else {
    reviewPassed = true;
  }
}

if (reviewPassed) {
  await runAgent("git-manager", { action: "merge", pr: prNumber });
} else {
  // Alert: Max reviews reached, needs manual intervention
  await updateContext("BLOCKED: Max review iterations reached");
}
```

---

### Parallel Session Coordination

When multiple sessions work simultaneously:

1. **Never work on the same files** - Split tasks by file/component ownership
2. **Use different task IDs** - Each session gets unique MUN-XXX IDs
3. **Sync before merge** - Rebase on main before creating PR
4. **Sequential merges** - Merge PRs one at a time to avoid conflicts

**Recommended Task Splits for Parallelism:**
| Session | Focus Area | Files |
|---------|------------|-------|
| Session A | Map components | `src/components/Map/*` |
| Session B | Country panel | `src/components/CountryPanel/*` |
| Session C | Data files | `src/data/countries/*` |
| Session D | Types & utilities | `src/types/*`, `src/lib/*` |

---

### Context File Updates for Parallel Work

When working in parallel, context files track branch info:

```markdown
# Context #{id}

**Created**: {timestamp}
**Task**: {task description}
**Branch**: feature/MUN-{id}-{description}
**Worktree**: ../mun-feature-{id} (if applicable)

## Git Progress

- [ ] Branch created
- [ ] Development complete
- [ ] PR created: #{pr-number}
- [ ] Code review #1: {status}
- [ ] Code review #2: {status} (if needed)
- [ ] Merged to main

## Review History

### Review #1 - {timestamp}

- Critical: 0, High: 2, Medium: 3
- Fixed: High issues resolved

### Review #2 - {timestamp}

- Critical: 0, High: 0, Medium: 1
- Status: APPROVED

## Status: {ACTIVE|IN_REVIEW|COMPLETED}
```

---

### Quick Reference Commands

```bash
# Start new task
git checkout main && git pull && git checkout -b feature/MUN-XXX-name

# Push and create PR
git push -u origin HEAD && gh pr create --fill

# Run code review (via agent)
# → Trigger code-reviewer agent with PR number

# Merge after approval
gh pr merge --squash --delete-branch

# Sync with main (before merge if needed)
git fetch origin && git rebase origin/main

# Check PR status
gh pr status
gh pr checks <pr-number>
```

---

### IMPORTANT: Never Skip the Review Loop

**All code MUST go through the PR review loop before merging to main.**

- No direct pushes to main
- No merging without code-reviewer approval
- No skipping review for "small changes"

This ensures consistent code quality across all parallel sessions.
