---
name: update-context
description: Updates the current active context file with progress, decisions, or sub-agent outputs. Use after completing steps or when sub-agents finish.
allowed-tools: Read, Write, Edit, Glob
---

# Update Context Skill

Updates the active context file with new information.

## What Can Be Updated

1. **Progress**: Mark tasks as completed or add new tasks
2. **Sub-agent Updates**: Log output from sub-agents with timestamp
3. **Decisions**: Record important decisions with rationale
4. **Notes**: Add observations or important information
5. **Status**: Change from ACTIVE to COMPLETED when task is done

## Rules

- NEVER delete existing content from context files
- Only ADD new content or mark items as completed
- Use checkboxes for progress tracking: `- [x]` for done, `- [ ]` for pending
- Always include timestamps for sub-agent updates
- When marking status as COMPLETED, ensure all progress items are checked

## Update Format

### For Progress Updates
```markdown
## Progress
- [x] Previous item (completed)
- [ ] New item added
```

### For Sub-agent Updates
```markdown
## Sub-agent Updates
### {agent-name} - {YYYY-MM-DD HH:MM}
{Summary of what the agent did}
{Key outputs or findings}
```

### For Decisions
```markdown
## Decisions Made
- **{Decision Title}**: {What was decided}
  - Rationale: {Why this decision was made}
```

## Usage

1. Identify the current active context (highest ID with ACTIVE status)
2. Read the existing content
3. Append or modify the appropriate section
4. Write back the updated content
