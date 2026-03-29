#!/bin/bash
# Launcher for webapp agent using claude-work
export CLAUDE_CONFIG_DIR="$HOME/.claude-work"
cd ~/Documents/Repositories/creatorcore-clone/webapp || exit 1
exec claude --dangerously-skip-permissions -p "$(cat ~/Documents/Repositories/creatorcore-clone/AGENT_WEBAPP_PROMPT.md)"
