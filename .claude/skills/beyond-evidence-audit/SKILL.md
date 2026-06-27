---
name: beyond-evidence-audit
description: Use when reviewing whether a Beyond patch is complete and verified.
---

# Beyond Evidence Audit Skill

## Mission

Review work against the project quality gate.

## Required checks

- Read `AGENTS.md`.
- Read `docs/QUALITY_GATE.md`.
- Confirm changed files match the stated goal.
- Confirm dependencies were not added casually.
- Confirm UI changes are real, not decorative only.
- Confirm limitations are stated.

## Review result

Return one of:

- Pass.
- Pass with limitations.
- Needs changes.

If the patch changes 3D, UI, or runtime behavior, ask for visible proof.
