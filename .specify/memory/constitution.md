<!--
Sync Impact Report
Version change: 1.0.0 -> 1.0.1
Modified principles:
- none (content preserved; synchronization metadata added)
Added sections:
- Sync Impact Report
Removed sections:
- none
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ .specify/templates/constitution-template.md
Follow-up TODOs:
- none
-->

# Testing App Constitution

## Core Principles

### I. Deterministic and Reproducible Test Generation
The system MUST prioritize deterministic and reproducible test generation over flexibility or heuristic-based behavior. All generated tests MUST be fully executable in Maestro without manual modification. The system MUST favor simplicity and reliability over complex abstraction layers.

### II. Replayable User-Intent Testing
Every user interaction captured from the UI MUST map to a clear, structured, and replayable test step. Tests MUST be designed to run in CI environments without flakiness. Flaky or non-deterministic tests are considered a system failure.

### III. Stable React Native Instrumentation
UI interactions in React Native MUST be captured through a consistent instrumentation layer. The system MUST avoid relying on undocumented or unstable internal React Native behavior. Any event capture mechanism MUST be explicitly defined and reproducible across environments, including iOS, Android, emulators, and supported physical devices.

### IV. Maestro as Execution Source of Truth
Maestro is the single source of truth for test execution. All generated test artifacts MUST conform to Maestro syntax and execution semantics. No custom execution engine is allowed unless it compiles down to valid Maestro flows.

### V. Minimal, Modular, and Extensible Design
Generated tests MUST be minimal but expressive, independent of UI implementation details, and stable across UI refactors that do not change user behavior. The system MUST prefer user intent over UI structure when interpreting flows. The architecture MUST remain modular, with explicit separation between the UI capture layer, the transformation layer from UI events to test DSL, and the Maestro output generator.

## Data, Architecture, and Execution Constraints

### Test Generation Constraints
- Generated tests MUST be minimal but expressive.
- Generated tests MUST be independent of implementation details of the UI layer.
- Generated tests MUST remain stable across UI refactors that do not change user behavior.
- The system MUST prefer user intent over UI structure when interpreting flows.

### Architecture Constraints
- The system MUST separate the following concerns:
	- UI capture layer
	- Transformation layer (UI → test DSL)
	- Test output generator (Maestro format)
- No tight coupling is allowed between React Native components and test generation logic.

### Data Format Rules
- All intermediate representations of UI flows MUST be stored in a versioned, structured format such as JSON or a DSL.
- These representations MUST be human-readable.
- These representations MUST be machine-transformable.
- These representations SHOULD be backward compatible when possible.

### CI and Execution Requirements
- All tests MUST be executable in a headless CI environment.
- The system MUST NOT rely on manual steps for test execution.
- Every generated test MUST include:
	- Preconditions
	- Steps
	- Expected outcomes

### Non-Negotiable Rules
- No generated test may rely on timing-based assertions unless explicitly justified and documented.
- No generated test may rely on randomness or uncontrolled external state.
- The system MUST NOT generate tests that cannot be re-run identically.

### Extensibility
- The architecture MUST allow future support for multiple test frameworks beyond Maestro.
- The architecture MUST allow future support for alternative UI platforms beyond React Native.
- Maestro + React Native remains the baseline and MUST always be fully supported first.

## Governance

This constitution supersedes conflicting local testing conventions for this repository. All specifications, plans, generated flows, and code changes that affect UI testing MUST be reviewed for compliance with these principles. Any amendment MUST preserve deterministic execution, Maestro compatibility, and modular architecture, and MUST document migration impact on existing generated flows and intermediate representations.

**Version**: 1.0.1 | **Ratified**: 2026-04-24 | **Last Amended**: 2026-04-24
