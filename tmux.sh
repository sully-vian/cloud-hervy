#!/bin/bash

# This script initializes a tmux session for the project

PROJECT_DIR="$HOME/Desktop/cloud-hervy"
SESSION_NAME="cloud-hervy"

# check if the session already exists

if ! tmux has-session -t $SESSION_NAME 2>/dev/null; then
    # Create new tmux session
    tmux new-session -d -s "$SESSION_NAME" -c "$PROJECT_DIR"

    # Pane 1: Default shell (for general use)
    tmux rename-window -t $SESSION_NAME:0 "Main"
    tmux send-keys -t $SESSION_NAME:0 "code ." C-m

    # Pane 2: Run development server
    tmux split-window -h -t $SESSION_NAME:0
    tmux send-keys -t $SESSION_NAME:0.1 "npm run dev" C-m

    # Select the main pane
    tmux select-pane -t $SESSION_NAME:0.0
fi

# switch or attach
if [ -n "$TMUX" ]; then
    tmux switch-client -t $SESSION_NAME
else
    tmux attach-session -t $SESSION_NAME
fi
