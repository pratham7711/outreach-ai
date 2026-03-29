#!/bin/bash
# Launcher for landing page agent using claude-personal
export CLAUDE_CONFIG_DIR="$HOME/.claude-personal"
cd ~/Documents/Repositories/creatorcore-clone/landing || exit 1
exec claude --dangerously-skip-permissions -p "$(cat ~/Documents/Repositories/creatorcore-clone/AGENT_LANDING_PROMPT.md)"
