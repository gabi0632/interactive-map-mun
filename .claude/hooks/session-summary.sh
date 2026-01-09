#!/bin/bash
# Generate session summary when Claude stops
# This hook runs at the end of Claude's response

CONTEXT_DIR=".claude/context"
INDEX_FILE="$CONTEXT_DIR/index"

# Get current context ID
if [ -f "$INDEX_FILE" ]; then
    CONTEXT_ID=$(cat "$INDEX_FILE" | tr -d '[:space:]')
    CONTEXT_FILE="$CONTEXT_DIR/context_$CONTEXT_ID.md"

    if [ -f "$CONTEXT_FILE" ]; then
        echo "Session ended - Context $CONTEXT_ID"
        # Count completed vs pending tasks
        COMPLETED=$(grep -c "\- \[x\]" "$CONTEXT_FILE" 2>/dev/null || echo "0")
        PENDING=$(grep -c "\- \[ \]" "$CONTEXT_FILE" 2>/dev/null || echo "0")
        echo "Progress: $COMPLETED completed, $PENDING pending"
    fi
fi

exit 0
