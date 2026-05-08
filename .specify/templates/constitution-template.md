# [PROJECT_NAME] Constitution

## Core Principles

### I. Deterministic and Reproducible Test Generation
[Define how the system prioritizes deterministic, reproducible test generation over heuristic behavior. State that generated tests must be fully executable in Maestro without manual modification and that simplicity and reliability take precedence over abstraction-heavy designs.]

### II. Replayable User-Intent Testing
[Define how every captured user interaction maps to a clear, structured, replayable step and how the system prevents flaky or non-deterministic behavior in CI.]

### III. Stable Platform Instrumentation
[Define the required instrumentation boundary for the baseline UI platform, including explicit event capture rules and the prohibition on undocumented framework internals.]

### IV. Execution Source of Truth
[Define the canonical test execution engine and require all generated artifacts to conform to its syntax and execution model.]

### V. Minimal, Modular, and Extensible Design
[Define requirements for minimal but expressive generated tests, modular separation of capture, transform, and output concerns, and future extensibility to other frameworks or platforms.]

## Data, Architecture, and Execution Constraints

### Test Generation Constraints
- [State how generated tests remain minimal, expressive, user-intent focused, and stable across refactors that do not change behavior.]

### Architecture Constraints
- [State the required separation between UI capture, transformation, and output generation layers.]
- [State any no-tight-coupling rules between application components and test-generation logic.]

### Data Format Rules
- [State how intermediate flow representations are versioned and structured.]
- [State readability, transformability, and backward-compatibility expectations.]

### CI and Execution Requirements
- [State headless CI execution requirements.]
- [State that manual steps are not allowed.]
- [State that every generated test must include preconditions, steps, and expected outcomes.]

### Non-Negotiable Rules
- [State prohibitions on timing-based assertions, randomness, or uncontrolled external state unless explicitly justified and controlled.]

### Extensibility
- [State how the architecture can grow to support additional frameworks or platforms while preserving the baseline stack first.]

## Governance

[Define amendment procedure, compliance expectations for specs/plans/tasks/implementation, semantic-versioning policy for the constitution, and any migration obligations for existing generated artifacts.]

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
