@AGENTS.md

# Claude Code Instructions for Beyond

Claude Code must treat `AGENTS.md` as the shared source of truth. These extra instructions are Claude-specific.

## Session startup

At the start of every Claude Code session:

1. Read `AGENTS.md`.
2. Read the relevant docs in `docs/` before editing.
3. State the smallest patch plan before changing files.
4. Do not continue if the requested work violates a frozen dependency without documenting a decision.

## Use plan mode for risky work

Use plan mode before touching:

- 3D runtime architecture.
- Video source lifecycle.
- Asset loading.
- Test setup.
- Build configuration.
- Dependencies.
- Output/OBS integration.

## Memory discipline

Do not rely on memory alone. When uncertain, inspect the repository. If memory conflicts with repository files, repository files win.

## Skills

Use these local skills when relevant:

- `.claude/skills/beyond-3d-engine/SKILL.md`
- `.claude/skills/beyond-evidence-audit/SKILL.md`

## Claude-specific caution

Do not over-explain instead of implementing. Do not produce large rewrites when the task asks for a small fix. Every implementation must be backed by test output, screenshot, recording, or a clearly stated limitation.
