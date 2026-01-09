---
name: new-context
description: Creates a new context file for tracking a task session. Use when starting a new task or feature.
allowed-tools: Read, Write, Bash, Glob
---

# New Context Skill

Creates a new context file for the current task session.

## Steps

1. Read the current index from `.claude/context/index`
2. Increment the index by 1
3. Create a new context file at `.claude/context/context_{new_id}.md`
4. Update the index file with the new value
5. Return the context file path for reference

## Context File Template

```markdown
# Context #{id}
**Created**: {current date/time}
**Task**: {user's task description}

## Progress
- [ ] Initial setup

## Sub-agent Updates
(Updates from sub-agents will be logged here)

## Decisions Made
(Important decisions and their rationale)

## Notes
(Additional notes and observations)

## Status: ACTIVE
```

## Usage

When invoked, ask the user for the task description if not provided, then:
1. Read `.claude/context/index`
2. Increment and write new index
3. Create context file with the template
4. Report the new context ID to the user

Always confirm the context file was created successfully.
