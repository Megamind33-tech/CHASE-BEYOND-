# UI Contract

Beyond must feel like one professional broadcast tool, not a generic dashboard.

## Required screens

### 1. Home / Project Launcher

Must show:

- App identity.
- Open recent project when project saving exists.
- Start studio session.
- Clear development status.

Must not show fake project history.

### 2. Studio Runtime

Must show:

- 3D canvas.
- Active set.
- Active source.
- Basic render status.
- Operator-friendly error messages.

### 3. Source Manager

Must show:

- Available sources.
- Source state.
- Source selection.
- No-source option.

Must not show fake cameras or fake live devices.

### 4. Set Selector

Must show:

- Available sets from real manifests.
- Real thumbnails.
- Active set.
- Set loading or error state.

### 5. Preview / Program

For MVP, this can be simple. It must show what is actually being rendered or captured. Do not create professional switching controls before they are wired.

### 6. Diagnostics

Must show:

- Active set.
- Active source.
- Source state.
- FPS or runtime status.
- Last runtime issue.
- Set load status.

### 7. Settings

For MVP, settings should be minimal. Do not add settings that do not affect the app.

## Interaction rule

If a button exists, it must perform a real action. If the action is not ready, the UI must say what is missing.

## Empty states

Every empty state must be helpful:

- No sets found: explain where set folders should be placed.
- No source selected: show source selection guidance.
- Runtime unavailable: show recovery action.

## Visual direction

- Clean.
- Professional.
- Dark broadcast-control feel is acceptable.
- Avoid generic admin-dashboard cards.
- Avoid decorative controls.
- Avoid mock panels.

## Acceptance

A UI patch is acceptable only when the visible controls match real behavior.
