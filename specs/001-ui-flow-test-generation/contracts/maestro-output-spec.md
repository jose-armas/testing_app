# Contract: Generated Maestro Output

## Purpose

Define the minimum structure every generated Maestro test must satisfy.

## Required Output Shape

Every generated Maestro file must contain:

1. `appId` at the top level
2. Optional metadata fields such as `name` and `tags`
3. A YAML document separator `---`
4. A deterministic launch command
5. At least one precondition assertion
6. At least one interaction step
7. At least one expected outcome assertion

## Selector Rules

- Prefer `id` selectors derived from stable React Native `testID` values.
- Use visible text selectors only as a fallback when the interaction is intentionally text-driven.
- Do not generate selectors from unstable layout structure.

## Launch Rules

- Generated flows must initialize the app in a reproducible way.
- Use state-clearing launch behavior by default for independent flow execution unless a scenario explicitly requires preserved state.

## Assertion Rules

- Preconditions must verify the app is in the expected initial state before interactions proceed.
- Expected outcomes must verify user-visible results after meaningful checkpoints.
- Avoid timing-based assertions unless generation explicitly records and justifies them.

## Example Skeleton

```yaml
appId: com.example.app
name: Generated flow
tags:
  - generated
---
- launchApp:
    clearState: true
- assertVisible:
    id: home.start.button
- tapOn:
    id: home.start.button
- assertVisible:
    id: home.result.label
```