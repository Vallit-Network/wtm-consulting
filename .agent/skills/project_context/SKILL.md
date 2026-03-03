---
name: Project Context Analysis
description: Fast-track understanding of the project's architecture, tech stack, and state.
---

# Project Context Skill

Whenever you start a new task in this codebase, use this skill to rapidly gather context.
This prevents you from making incorrect assumptions and speeds up delivery.

## Instructions

1. **Identify the Core Stack**: Use `view_file` on `package.json`, `index.html`, or main configuration files (`index.py`, `package.json`) to understand dependencies and routing.
2. **Find the Entry Points**: Look for `api/index.py`, `main.py`, `index.js`, or the `src` folder. This tells you where the app starts.
3. **Analyze the State**: Check the Git status using `run_command` with `git status` to see what files are currently modified or if the user is in the middle of a specific feature.
4. **Locate Shared Resources**: Find where styles (e.g., `index.css`), shared components, and utility functions are stored. For this standard web app, CSS is critical.
5. **Aesthetics Context**: This project prioritizes premium designs, vibrant colors, dark modes, and dynamic animations. Read the CSS files early to use the correct design tokens.
