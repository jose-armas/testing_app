# Data Model: Generate Automated Tests From UI Flows

## Entities

### CaptureSession

- `id`: unique session identifier
- `startedAt`: timestamp for capture start
- `endedAt`: timestamp for capture completion or cancellation
- `appId`: mobile application identifier used for generation
- `platform`: target runtime such as iOS or Android
- `status`: `recording`, `completed`, `cancelled`, or `failed`
- `stepIds`: ordered references to captured interaction steps
- `outcomeIds`: references to captured expected outcomes

### CapturedStep

- `id`: unique step identifier
- `sessionId`: parent capture session
- `sequence`: stable order index
- `kind`: normalized interaction type such as tap, input, scroll, or assertion
- `target`: structured selector data, primarily stable test ID metadata
- `payload`: step-specific values such as entered text
- `timestamp`: capture time for audit only, not replay timing
- `captureStatus`: `supported`, `unsupported`, or `ambiguous`

### FlowIRDocument

- `version`: schema version for backward-compatible evolution
- `flowId`: logical identifier for the generated flow
- `sourceSessionId`: originating capture session
- `metadata`: name, tags, platform, and generation context
- `preconditions`: structured pre-run conditions
- `steps`: ordered normalized step list
- `expectedOutcomes`: ordered assertions or result checkpoints
- `generationWarnings`: unsupported or lossy transformation notes

### GeneratedTestAsset

- `id`: logical test identifier
- `flowId`: reference to current IR document lineage
- `title`: human-readable test name
- `currentVersionId`: latest saved version
- `status`: `draft`, `ready`, or `deprecated`
- `tags`: classification labels for reuse and execution

### TestVersion

- `id`: unique version identifier
- `testAssetId`: parent generated test asset
- `revision`: monotonically increasing version number
- `irPath`: file path to stored IR JSON
- `maestroFlowPath`: file path to generated Maestro YAML
- `createdAt`: version creation timestamp
- `changeSummary`: optional human-authored or generated summary

## Relationships

- A `CaptureSession` has many `CapturedStep` records.
- A `CaptureSession` produces zero or one `FlowIRDocument`.
- A `FlowIRDocument` is transformed into one `GeneratedTestAsset` lineage.
- A `GeneratedTestAsset` has many `TestVersion` entries.
- A `TestVersion` references exactly one persisted IR document and one generated Maestro flow file.

## State Transitions

### CaptureSession

- `recording` -> `completed` when capture ends with a valid result
- `recording` -> `cancelled` when the user aborts capture
- `recording` -> `failed` when the session cannot be normalized into a valid flow

### GeneratedTestAsset

- `draft` -> `ready` when preconditions, steps, and expected outcomes are valid and output generation succeeds
- `ready` -> `deprecated` when superseded or intentionally retired

## Validation Rules

- Each `CapturedStep.sequence` must be unique within a session.
- Each `FlowIRDocument` must include at least one precondition, one step, and one expected outcome before YAML generation.
- Unsupported or ambiguous steps must be preserved as warnings and must block automatic ready-state promotion if they prevent deterministic replay.
- `TestVersion.revision` must increase monotonically within a `GeneratedTestAsset`.