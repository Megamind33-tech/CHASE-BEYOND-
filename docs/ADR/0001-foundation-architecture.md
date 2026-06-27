# ADR 0001 - Foundation Architecture

## Status

Accepted.

## Date

2026-06-27.

## Context

Beyond needs a stable foundation for a 3D virtual broadcast studio. Previous attempts mixed too many engines and media frameworks before proving the core workflow. That made the app unstable and hard for AI agents to complete.

## Decision

The first foundation will use:

- Vite.
- React.
- TypeScript.
- Babylon.js.
- OBS Browser Source or OBS window capture for output.
- Vitest and Playwright for checks.

Babylon.js is the only approved 3D engine for the foundation.

OBS capture is the approved output path for phase 1.

## Deferred choices

The following are deferred until the foundation works:

- GStreamer.
- Direct libobs plugin work.
- DeckLink.
- NDI.
- Custom FFmpeg output.
- Electron.
- Godot.
- Three.js.
- A-Frame.
- Unreal Engine.

## Consequences

Good consequences:

- Smaller foundation.
- Less dependency confusion.
- Easier testing.
- Faster route to a working prototype.
- Clearer instructions for AI agents.

Tradeoffs:

- The first version will not have advanced hardware I/O.
- The first version will depend on OBS for output.
- Desktop packaging comes later.

## Reversal rule

This decision may only be changed after the current foundation proves app open, 3D render, media on 3D mesh, source replacement, set replacement, and OBS capture.
