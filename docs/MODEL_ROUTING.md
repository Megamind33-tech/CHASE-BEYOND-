# Model Routing

No model or prompt can make every agent 100 percent correct. The real improvement comes from smaller tasks, clear architecture, tests, screenshots, and strict review.

Use models by role:

- Repo-wide implementation: Codex-style coding agent.
- Architecture review: strong reasoning model.
- Patch review: a second coding agent.
- Small local edits: Cursor or IDE assistant.
- Visual review: vision-capable model.
- Repetitive checks: scripts and tests.

Benchmarks to consult:

- SWE-bench Verified.
- SWE-bench Live.
- LiveCodeBench.
- Terminal-Bench.
- OSWorld.
- Hugging Face official benchmark leaderboard API where available.

Benchmarks are signals, not final truth. A high score does not mean a model will build Beyond correctly. This app needs browser rendering, 3D assets, video textures, source lifecycle, OBS output, and real UX. Those must be proven inside this repository.

Every model must read instructions, work on one bounded task, avoid unapproved dependencies, run verification, produce a patch report, and state limitations honestly.

Repository proof beats leaderboard claims.
