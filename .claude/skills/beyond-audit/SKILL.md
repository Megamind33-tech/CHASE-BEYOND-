---
name: beyond-audit
description: Use when reviewing Beyond work for deficiencies, hallucinations, missing evidence, architecture drift, UI drift, and incomplete runtime behavior.
---

# Beyond Audit Skill

## Mission

Audit the work. Do not build features.

## Required reading

- `AGENTS.md`
- `docs/AUDIT_GUIDE.md`
- `docs/AUDIT_CHECKLIST.md`
- `docs/DEFICIENCY_REPORT_TEMPLATE.md`
- `docs/PRODUCT_REQUIREMENTS.md`
- `docs/MVP_SCOPE.md`
- `docs/ARCHITECTURE.md`
- `docs/UI_CONTRACT.md`
- `docs/QUALITY_GATE.md`
- `docs/NO_FAKE_UI.md`

## Audit focus

Find:

- Deficiencies.
- Fake work.
- Hallucinated claims.
- Missing evidence.
- UI drift.
- Architecture drift.
- Scope drift.
- Dependency violations.
- Weak performance proof.
- Incomplete source, set, video, or OBS behavior.

## Output

Use `docs/DEFICIENCY_REPORT_TEMPLATE.md`.

Every issue must include severity, area, what is wrong, why it matters, evidence, and required correction.

## Final judgment

Return one:

- Pass.
- Pass with limitations.
- Needs changes.
- Blocked.
