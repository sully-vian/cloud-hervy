#!/bin/bash

# This script initializes a tmux session for the project

PROJECT_DIR="$HOME/Desktop/cloud-hervy"
SESSION_NAME="cloud-hervy"

if [ -n "$TMUX" ]; then
    echo "You're already inside a tmux session!"
    tmux detach
fi

# check if the session already exists

if tmux has-session -t $SESSION_NAME 2>/dev/null; then
    # Create new tmux session
    tmux new-session -d -s "$SESSION_NAME" -c "$PROJECT_DIR"

    # Pane 1: Default shell (for general use)
    tmux rename-window -t $SESSION_NAME:0 "Main"
    tmux send-keys -t $SESSION_NAME:0 "clear" C-m

    # Pane 2: Run development server
    tmux split-window -h -t $SESSION_NAME:0
    tmux send-keys -t $SESSION_NAME:0.1 "npm run dev" C-m

    # Pane 3: Watch for file changes
    tmux split-window -v -t $SESSION_NAME:0
    tmux send-keys -t $SESSION_NAME:0.2 "npm run build -- --watch" C-m

    # Pane 4: Run tests (optional)
    tmux split-window -v -t $SESSION_NAME:0.2
    tmux send-keys -t $SESSION_NAME:0.3 "npm test" C-m

    # Select the main pane
    tmux select-pane -t $SESSION_NAME:0.0
fi

tmux attach -t $SESSION_NAME
