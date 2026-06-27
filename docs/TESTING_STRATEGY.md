# Testing Strategy

Testing must protect the foundation from fake progress.

## Test layers

### 1. Typecheck

Use TypeScript to catch broken contracts.

Expected command:

```bash
npm run typecheck
```

### 2. Unit tests

Use unit tests for schemas, manifest parsing, source state transitions, and set registry logic.

Expected command:

```bash
npm run test
```

### 3. Build test

The app must build before a patch is considered stable.

Expected command:

```bash
npm run build
```

### 4. Browser smoke test

Use Playwright to open the app and check the main screen.

Expected command:

```bash
npm run test:smoke
```

### 5. Visual check

When UI, 3D, or media rendering changes, provide a screenshot or recording.

### 6. Manual OBS check

When output work changes, test OBS Browser Source or OBS window capture and document the result.

### 7. Stability run

For foundation approval, run the app for 30 minutes and document whether it stayed usable.

## Minimum test cases

- Valid set manifest loads.
- Invalid set manifest gives a clear error.
- Required screen mesh missing gives a clear error.
- Source state transitions are valid.
- Source replacement updates the active target.
- Set replacement does not leave broken old state.
- App opens in browser smoke check.

## Regression rule

If a patch breaks an existing checked behavior, fix it before adding new features.

## Test report

Every patch must report:

- Typecheck result.
- Unit test result.
- Build result.
- Browser check result.
- Visual check if applicable.
- Manual check if applicable.
- Known limitations.
