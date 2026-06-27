# OBS Output Guide

OBS is the phase 1 output path for Beyond. Do not build a custom output system before this path works.

## Approved phase 1 paths

1. OBS Browser Source pointed to the local Beyond app URL.
2. OBS window capture of the Beyond runtime window.

## Local app target

When the app exists, document the development URL here. Common example:

```text
http://localhost:5173
```

## Browser Source setup

Recommended starting settings:

- Width: 1920.
- Height: 1080.
- FPS: match OBS canvas settings.
- Refresh browser when scene becomes active: enabled for testing.
- Shutdown source when not visible: disabled during stability testing.

## Window capture setup

Use this when Browser Source is not reliable yet. Capture the browser or app window displaying Beyond.

## Audio assumption

MVP 0.1 focuses on visual proof first. Audio routing must be documented separately before claiming production audio support.

## OBS check list

A valid OBS check should include:

- Screenshot of Beyond running.
- Screenshot of OBS capturing Beyond.
- Short recording or note confirming motion is visible.
- OBS canvas size.
- Capture method used.
- Known limitations.

## Manual capture check

Use this checklist when preparing phase 1 OBS proof:

1. Run `npm run dev`.
2. Open the local Beyond URL, usually `http://localhost:5173`.
3. Open OBS.
4. Add either a Browser Source pointed at the Beyond URL or a Window Capture of the browser.
5. Confirm the Beyond Studio preview is visible in OBS.
6. Record 10 seconds.
7. Save the screenshot, recording note, and observed settings under `evidence/YYYY-MM-DD/`.

Do not mark OBS as checked in the app until the evidence is saved and reviewed.

## Do not claim yet

Do not claim these until separately implemented and tested:

- Native OBS plugin.
- NDI output.
- DeckLink output.
- Custom streaming output.
- Production audio routing.

## Phase 2 candidates

Only after MVP stability:

- OBS plugin or deeper libobs integration.
- NDI support.
- DeckLink support.
- Dedicated desktop shell.
