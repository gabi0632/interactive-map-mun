#!/bin/bash
# Log file changes to the active context
# This hook runs after Edit or Write tool use

CONTEXT_DIR=".claude/context"
INDEX_FILE="$CONTEXT_DIR/index"

# Get current context ID
if [ -f "$INDEX_FILE" ]; then
    CONTEXT_ID=$(cat "$INDEX_FILE" | tr -d '[:space:]')
    CONTEXT_FILE="$CONTEXT_DIR/context_$CONTEXT_ID.md"

    # Only log if context file exists and is active
    if [ -f "$CONTEXT_FILE" ] && grep -q "Status: ACTIVE" "$CONTEXT_FILE"; then
        TIMESTAMP=$(date "+%Y-%m-%d %H:%M")
        # Log is informational only - actual updates should be done by Claude
        echo "Context $CONTEXT_ID active - file changes being tracked"
    fi
fi

exit 0
