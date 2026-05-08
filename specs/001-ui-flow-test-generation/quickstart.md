# Quickstart: Generate Automated Tests From UI Flows

## Goal

Validate the end-to-end slice from captured React Native interaction to generated Maestro flow artifact.

## Prerequisites

- The React Native application builds and launches locally.
- Maestro is installed and a simulator or emulator is available.
- The application exposes stable `testID` values for supported capture targets.

## Validation Flow

1. Launch the React Native app in a simulator or emulator.
2. Start a new capture session from the app interface.
3. Perform a supported user journey with at least one interaction and one user-visible outcome.
4. End capture and review the normalized flow summary.
5. Save the generated test asset.
6. Confirm that the system writes:
   - a versioned intermediate JSON document
   - a generated Maestro YAML flow
   - version metadata linking both artifacts
7. Run the generated Maestro flow locally against the target app.
8. Confirm the flow executes with deterministic launch, ordered steps, and expected-outcome assertions.

## Expected Result

- The generated Maestro flow runs without manual YAML editing.
- The generated test can be selected again for reuse.
- A subsequent regeneration creates a new version rather than overwriting the original artifact.