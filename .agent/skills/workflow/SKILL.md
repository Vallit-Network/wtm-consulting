---
name: Workflow Efficiency
description: Optimize the agent's workflow for speed, precision, and minimal disruption.
---

# Workflow Efficiency Skill

To deliver fast and high-quality results, adhere to these workflow rules for every task.

## Instructions

1. **Batch Your Edits**: When making changes to a file, use `multi_replace_file_content` to batch multiple non-contiguous edits into a single tool call rather than making multiple sequential round-trips.
2. **Read Minimally**: Only use `view_file` on the precise files and lines you need. Do not read entire files if a `grep_search` provides the exact location of the code you need to change.
3. **Verify Locally**: Before concluding a task, verify your changes. Run `npm run test`, `pytest`, or the relevant project test command if available. Check for syntax errors. 
4. **Use Workflows**: If a standard procedure exists in `.agent/workflows/`, use `view_file` to read it and follow its exact steps (e.g., deploying, building, or analyzing).
5. **No Redundant Steps**: If a command or tool call gives you the answer, do not call another tool to check the exact same thing.
6. **Task Boundaries**: Always keep the user informed via clear, granular task boundaries that match the task checklist.
