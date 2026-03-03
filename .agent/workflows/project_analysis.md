---
description: Systematically analyze the project structure, dependencies, and architecture.
---

# Project Analysis Workflow

Run this workflow when first encountering the repository or when you need a deep understanding of its structure.

1. **Check the Package Manager (`npm` or `pip`)**: Find the `package.json` or `requirements.txt` / `Pipfile`.
2. **Review the File Tree**: List the root project directory (`list_dir` tool). Identify `src`, `public`, `api`, or `app` folders.
3. **Identify Key Entry Points**: Read `api/index.py`, `app.js`, `main.py`, or `index.html`. 
4. **Examine Shared Styles**: Check CSS files like `style.css` or `index.css` to grasp the design tokens and layout utility classes.
5. **Look at Recent Changes**: Run `git log -n 5` or `git status` to see what was most recently modified, and read those files.
6. **Report**: Summarize your findings internally and outline the exact file structure map before making edits.
