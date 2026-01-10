#!/bin/bash
# Open Claude Plan Viewer when a plan file is written
# This hook runs after Write tool use on plan files

# Read the tool input from stdin
INPUT=$(cat)

# Check if this is a plan file being written
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')

# Only proceed if this is a plan file (in .claude/plans directory)
if [[ ! "$FILE_PATH" == *".claude/plans"* ]]; then
    exit 0
fi

echo "Plan file detected: $FILE_PATH"

PORT=3333

# Check if plan-viewer is already running on the port
if lsof -i :$PORT > /dev/null 2>&1; then
    echo "Plan viewer already running on port $PORT"
    # Just open the browser
    open "http://localhost:$PORT" 2>/dev/null || xdg-open "http://localhost:$PORT" 2>/dev/null
    exit 0
fi

# Start the plan viewer in background
echo "Starting Claude Plan Viewer on port $PORT..."

# Try npx first, then bunx
if command -v npx &> /dev/null; then
    npx claude-plan-viewer --port $PORT &
elif command -v bunx &> /dev/null; then
    bunx claude-plan-viewer --port $PORT &
else
    echo "Error: Neither npx nor bunx found. Please install Node.js or Bun."
    exit 1
fi

# Wait a moment for server to start
sleep 2

# Open browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "http://localhost:$PORT"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "http://localhost:$PORT" 2>/dev/null
fi

echo "Plan viewer opened at http://localhost:$PORT"
exit 0
