# No Fake UI Rules

Beyond must not become a beautiful but dead dashboard.

## Core rule

Every visible control must either work or be clearly labelled as unavailable. Do not create buttons, panels, source lists, set thumbnails, uploads, timelines, preview/program controls, or diagnostics that pretend to work.

## Forbidden patterns

- Fake source lists.
- Fake camera devices.
- Fake set thumbnails.
- Fake upload buttons.
- Fake diagnostics.
- Fake preview/program buttons.
- Generic dashboard cards with no real data.
- `Coming soon` on core foundation screens.
- Controls that only change local text but not the actual runtime.

## Required UI surfaces for foundation

1. Source Manager.
2. Set Selector.
3. Studio Runtime View.
4. Preview or Program output view.
5. Diagnostics panel.

## Diagnostics must show

- Active set.
- Active source.
- Source state.
- FPS.
- Last runtime error.
- Whether OBS capture has been tested manually.

## Design direction

The product should feel like one professional broadcast tool. It should not look like OBS mixed with random AI dashboards.

## Acceptance rule

If a user clicks something, something real must happen. If something real cannot happen yet, the UI must explain the missing requirement.
