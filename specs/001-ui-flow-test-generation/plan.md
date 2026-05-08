# Implementation Plan: Generate Automated Tests From UI Flows

**Branch**: `001-ui-flow-test-generation` | **Date**: 2026-04-24 | **Spec**: `/Users/jarmas/Desktop/react_native_project_with_maestro/testing-app/specs/001-ui-flow-test-generation/spec.md`
**Input**: Feature specification from `/specs/001-ui-flow-test-generation/spec.md`

## Summary

Build a React Native application that captures mobile UI interactions, converts those flows into a versioned intermediate representation, and generates deterministic Maestro flow files for repeatable automated testing. The design centers on four modules: the React Native interface, an explicit UI interaction capture layer, a transformation engine from captured flow to Maestro YAML, and a storage/versioning system for generated test assets.

## Technical Context

**Language/Version**: TypeScript 5.9 + React 19.1 + React Native 0.81.5 via Expo 54  
**Primary Dependencies**: Expo, React Native, React, Maestro CLI/Studio for generated flow validation  
**Storage**: Versioned structured files in the repository workspace for generated flow definitions, test metadata, and Maestro output  
**Testing**: Maestro for end-to-end flow execution; lightweight unit coverage for transformation logic to be added during implementation  
**Target Platform**: iOS Simulator and Android Emulator for React Native mobile application flows  
**Project Type**: Mobile application with local generation pipeline  
**Performance Goals**: Flow capture and test generation should complete quickly enough to preserve an interactive authoring experience for short and medium-length user journeys  
**Constraints**: Generated tests must be deterministic, executable in headless CI, free of timing-based assertions by default, and aligned with Maestro syntax  
**Scale/Scope**: Initial release targets a single React Native application, a bounded set of supported interaction types, and versioned generation of reusable Maestro flows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Deterministic execution: generated tests and fixtures must be reproducible in CI and must not depend on heuristic or timing-based behavior.
- Maestro compliance: any generated execution artifact must compile to valid Maestro flows without manual edits.
- Stable React Native instrumentation: the plan must define a consistent, explicit interaction capture layer and avoid undocumented React Native internals.
- Modular architecture: separate UI capture, transformation, and output generation responsibilities with no tight coupling to React Native components.
- Structured intermediates: any UI-flow intermediate representation must be versioned, human-readable, machine-transformable, and backward compatible when practical.
- Test completeness: every generated test flow must include preconditions, steps, and expected outcomes and must be runnable in headless CI.

**Gate Result**: PASS

- The proposed design uses explicit application-level instrumentation rather than undocumented React Native internals.
- The generation pipeline is modular: capture, transform, and output are separated.
- The output target is valid Maestro YAML with deterministic launch, selectors, and assertions.
- The intermediate flow format is versioned JSON and supports backward-compatible evolution.
- CI expectations are satisfied by generated launch preconditions and assertion-focused flows.

## Project Structure

### Documentation (this feature)

```text
specs/001-ui-flow-test-generation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── flow-schema.json
│   └── maestro-output-spec.md
└── tasks.md
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
App.tsx
index.ts
.maestro/
├── flows/
└── README.md
src/
├── app/
│   ├── screens/
│   ├── navigation/
│   └── providers/
├── capture/
│   ├── recorder/
│   ├── instrumentation/
│   └── event-types/
├── transform/
│   ├── flow-to-ir/
│   ├── ir-to-maestro/
│   └── validation/
├── storage/
│   ├── repository/
│   ├── versioning/
│   └── serializers/
├── models/
└── features/
  ├── capture-session/
  ├── generated-tests/
  └── test-history/

tests/
├── unit/
│   ├── transform/
│   └── storage/
└── integration/
  └── generation/
```

**Structure Decision**: Use the existing Expo React Native app as the single runtime surface, and add a `src/` feature structure organized around the constitution-mandated capture, transform, and output boundaries. Keep generated Maestro artifacts under `.maestro/flows/` and feature design artifacts under `specs/001-ui-flow-test-generation/`.

## Phase 0: Research Summary

1. Use explicit app-level instrumentation around supported interactive components, anchored by stable `testID` values, instead of attempting to infer intent from undocumented React Native internals.
2. Generate Maestro flows as YAML files with deterministic app launch, selector-first interactions, and explicit assertions for preconditions and outcomes.
3. Use a versioned JSON intermediate representation between captured UI flows and Maestro output so the transformation logic remains portable, testable, and backward compatible.

See `/Users/jarmas/Desktop/react_native_project_with_maestro/testing-app/specs/001-ui-flow-test-generation/research.md` for rationale and rejected alternatives.

## Phase 1: Design Artifacts

- `research.md`: technical decisions for capture, Maestro structure, and intermediate format
- `data-model.md`: entities and relationships for captured flows, generated tests, and versions
- `contracts/flow-schema.json`: schema contract for the intermediate representation
- `contracts/maestro-output-spec.md`: output contract for generated Maestro flows
- `quickstart.md`: local end-to-end validation sequence for capture-to-generation

## Post-Design Constitution Check

**Status**: PASS

- The design captures user intent through explicit instrumentation rather than view-tree heuristics.
- The IR is structured, versioned, readable, and portable across future frameworks.
- Maestro remains the sole execution target for generated tests.
- Test generation remains deterministic through selector strategy, `clearState` launches, and explicit outcome assertions.
- No coupling from React Native UI components directly to Maestro YAML generation is required beyond the instrumentation boundary.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
