# Research: Generate Automated Tests From UI Flows

## Decision 1: Intercept UI events through explicit instrumentation wrappers and stable test IDs

### Decision

Record supported interactions through an application-defined capture layer that wraps interactive React Native components and emits canonical capture events. Use stable `testID` values as the primary selector anchor for generated tests.

### Rationale

- The project constitution requires explicit, reproducible capture behavior and prohibits dependence on undocumented React Native internals.
- React Native documents `testID` as the mechanism used to locate views in end-to-end tests.
- App-level instrumentation gives full control over which events become replayable test steps and prevents noisy, layout-driven capture.
- Stable identifiers make generated Maestro selectors resilient to copy changes and minor UI refactors.

### Alternatives considered

- Hook directly into React Native responder internals: rejected because it couples the capture system to unstable framework behavior and records low-level events rather than user intent.
- Infer flows from rendered view trees or accessibility text only: rejected because selectors become fragile and can drift when copy or structure changes.
- Rely on Maestro Studio recording alone as the capture source: rejected because the product requirement is generation from application UI flows, not only manual Maestro authoring.

## Decision 2: Structure Maestro output as one deterministic flow per generated test asset

### Decision

Generate Maestro YAML files with a consistent envelope:

1. Metadata header containing `appId`, `name`, and `tags`
2. Deterministic launch step using `launchApp` with state clearing where appropriate
3. Explicit precondition assertions
4. Ordered interaction commands using selector-first references, preferring `id`
5. Explicit expected outcome assertions at meaningful checkpoints

### Rationale

- Maestro examples and docs show a minimal flow as `appId` followed by ordered YAML commands.
- The constitution requires every generated test to include preconditions, steps, and expected outcomes.
- A single deterministic flow file per generated asset simplifies versioning and CI execution.
- Selector-first commands reduce ambiguity and align with stable React Native instrumentation.

### Alternatives considered

- Generate long monolithic suites combining many user journeys into one file: rejected because failures become harder to isolate and reuse/versioning is weaker.
- Generate flows based primarily on visible text selectors: rejected because UI copy is more likely to change than stable IDs.
- Allow timing-based waits as a default pattern: rejected because the constitution treats this as non-deterministic unless specifically justified.

## Decision 3: Use versioned JSON as the intermediate representation between captured flows and Maestro

### Decision

Adopt a versioned JSON intermediate representation with top-level metadata, capture session context, ordered normalized steps, and output-ready assertions.

### Rationale

- JSON is human-readable, machine-transformable, and easy to validate with schemas.
- A version field supports backward-compatible evolution as interaction coverage expands.
- A normalized IR creates a strict boundary between capture and output generation, which the constitution requires.
- JSON is easier to diff, store, and test than ad hoc string templates.

### Alternatives considered

- Custom DSL first: rejected for the initial release because it adds parser and tooling overhead before there is evidence JSON is insufficient.
- Raw Maestro YAML as the only stored representation: rejected because it collapses capture, normalization, and output concerns into one layer and makes migration harder.

## Decision 4: Store generated assets and revisions as repository-visible files with metadata

### Decision

Persist generated test assets, their IR source, and version metadata as structured files in the workspace so they can be reviewed, diffed, and reused directly.

### Rationale

- The product explicitly requires reuse and versioning.
- Repository-visible files work well with source control and CI.
- This matches the constitution requirement for structured, readable, reusable artifacts.

### Alternatives considered

- Store only in transient in-app state: rejected because reuse and version history would be lost.
- Store only in a database: rejected for the initial release because the current app already centers on file-based Maestro artifacts and local repo workflows.