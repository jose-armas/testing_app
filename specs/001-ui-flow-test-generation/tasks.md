# Tasks: Generate Automated Tests From UI Flows

**Input**: Design documents from `/specs/001-ui-flow-test-generation/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story and implementation phases so each increment is independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no direct dependency)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`)

## Phase 1: Setup (React Native Application Baseline)

**Purpose**: Establish project structure for capture, transform, and storage modules in the existing React Native app.

- [ ] T001 Create feature folders for app/capture/transform/storage/models in src/ with placeholder index files
- [ ] T002 [P] Add scripts for typecheck and test scaffolding in package.json
- [ ] T003 [P] Create base directories for generated artifacts at .maestro/flows/generated and specs/001-ui-flow-test-generation/examples
- [ ] T004 Create shared TypeScript types entrypoint in src/models/index.ts

---

## Phase 2: Foundational (Blocking: UI Event Capture + Intermediate Format + Generator Core + Storage Core)

**Purpose**: Implement core contracts and services required by all stories.

- [ ] T005 Implement flow IR TypeScript interfaces from contract schema in src/models/flow-ir.ts
- [ ] T006 [P] Implement capture event and selector models in src/models/capture-event.ts
- [ ] T007 [P] Implement generated test asset and version models in src/models/test-asset.ts
- [ ] T008 Implement IR schema validator service in src/transform/validation/flow-ir-validator.ts
- [ ] T009 Implement flow-to-IR normalization service in src/transform/flow-to-ir/normalize-capture-session.ts
- [ ] T010 Implement IR-to-Maestro YAML serializer in src/transform/ir-to-maestro/serialize-maestro-flow.ts
- [ ] T011 Implement file storage repository for tests and versions in src/storage/repository/test-artifact-repository.ts
- [ ] T012 Implement version sequencing service in src/storage/versioning/version-manager.ts
- [ ] T013 Implement deterministic launch/assertion policy helper in src/transform/ir-to-maestro/deterministic-policy.ts
- [ ] T014 Create integration wiring facade for generation pipeline in src/features/generated-tests/generation-pipeline.ts

**Checkpoint**: Foundational services can convert valid IR to Maestro YAML and persist versioned artifacts.

---

## Phase 3: User Story 1 - Capture a Mobile Flow and Generate a Test (Priority: P1) 🎯 MVP

**Goal**: Capture user interactions in-app and generate an executable Maestro flow.

**Independent Test**: Record a simple in-app flow and generate a Maestro file with preconditions, steps, and expected outcomes.

### Tests for User Story 1

- [ ] T015 [P] [US1] Add unit tests for capture-session normalization in tests/unit/transform/normalize-capture-session.test.ts
- [ ] T016 [P] [US1] Add unit tests for Maestro serializer output shape in tests/unit/transform/serialize-maestro-flow.test.ts
- [ ] T017 [US1] Add integration test for capture-to-generation pipeline in tests/integration/generation/capture-to-maestro.test.ts

### Implementation for User Story 1

- [ ] T018 [P] [US1] Implement capture session state store in src/features/capture-session/capture-session-store.ts
- [ ] T019 [P] [US1] Implement capture controls UI screen in src/app/screens/CaptureFlowScreen.tsx
- [ ] T020 [US1] Implement interaction capture wrappers for supported components in src/capture/instrumentation/trackable-components.tsx
- [ ] T021 [US1] Implement event recorder service with ordered step capture in src/capture/recorder/event-recorder.ts
- [ ] T022 [US1] Implement expected outcome capture helpers in src/capture/recorder/outcome-recorder.ts
- [ ] T023 [US1] Wire capture stop action to generation pipeline in src/features/generated-tests/run-generation-from-session.ts
- [ ] T024 [US1] Write generated Maestro flow to .maestro/flows/generated/home-captured-flow.yaml via repository and serializer

**Checkpoint**: MVP path works end-to-end for one real captured flow.

---

## Phase 4: User Story 2 - Reuse Generated Tests and Persist Storage (Priority: P2)

**Goal**: Save generated tests, browse them, and reuse existing test artifacts without recapturing.

**Independent Test**: Save a generated test, list stored tests, and rerun a selected one.

### Tests for User Story 2

- [ ] T025 [P] [US2] Add unit tests for artifact repository read/write in tests/unit/storage/test-artifact-repository.test.ts
- [ ] T026 [US2] Add integration test for saved-test reuse flow in tests/integration/generation/reuse-generated-test.test.ts

### Implementation for User Story 2

- [ ] T027 [P] [US2] Implement generated test catalog query service in src/storage/repository/list-generated-tests.ts
- [ ] T028 [US2] Implement generated tests list screen in src/app/screens/GeneratedTestsScreen.tsx
- [ ] T029 [US2] Implement reuse action to load and execute selected artifact in src/features/generated-tests/reuse-generated-test.ts
- [ ] T030 [US2] Add persisted test metadata writer for title/tags/status in src/storage/serializers/test-metadata-serializer.ts

**Checkpoint**: Generated tests can be discovered and reused from storage.

---

## Phase 5: User Story 3 - Version Generated Tests Over Time (Priority: P3)

**Goal**: Retain multiple revisions per generated test and allow users to identify current vs historical versions.

**Independent Test**: Regenerate a saved flow and confirm revision increments while prior versions remain accessible.

### Tests for User Story 3

- [ ] T031 [P] [US3] Add unit tests for revision increment logic in tests/unit/storage/version-manager.test.ts
- [ ] T032 [US3] Add integration test for regenerate-and-version workflow in tests/integration/generation/version-generated-test.test.ts

### Implementation for User Story 3

- [ ] T033 [US3] Implement version history query service in src/storage/versioning/list-test-versions.ts
- [ ] T034 [US3] Implement regenerate-existing-test use case in src/features/test-history/regenerate-test-version.ts
- [ ] T035 [US3] Implement version history UI screen in src/app/screens/TestVersionHistoryScreen.tsx
- [ ] T036 [US3] Implement current-version marker update and rollback-safe writes in src/storage/versioning/update-current-version.ts

**Checkpoint**: Versioned generated tests are retained and selectable by revision.

---

## Phase 6: Examples of Real User Flows and Generated Tests

**Purpose**: Add concrete example assets requested for validation and onboarding.

- [ ] T037 Create example captured-flow IR document in specs/001-ui-flow-test-generation/examples/example-login-flow.ir.json
- [ ] T038 Create example generated Maestro flow from real app interaction in specs/001-ui-flow-test-generation/examples/example-login-flow.maestro.yaml
- [ ] T039 Add example flow execution notes to .maestro/README.md
- [ ] T040 Add verification snapshots or expected output docs in specs/001-ui-flow-test-generation/examples/README.md

---

## Phase 7: Polish & Cross-Cutting Validation

- [ ] T041 [P] Add CI-friendly Maestro command examples for generated artifacts in specs/001-ui-flow-test-generation/quickstart.md
- [ ] T042 Run end-to-end validation of generated flow in .maestro/flows/generated and document results in specs/001-ui-flow-test-generation/quickstart.md
- [ ] T043 [P] Refine error reporting for unsupported/ambiguous interactions in src/capture/recorder/event-recorder.ts
- [ ] T044 Update App.tsx navigation entry points to include capture/test/version screens in App.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 must complete before Phase 2.
- Phase 2 blocks all user story phases.
- Phase 3 (US1) is the MVP and should complete before US2 and US3.
- Phase 4 depends on Phase 3 output artifacts.
- Phase 5 depends on Phase 4 storage/reuse behavior.
- Phase 6 depends on Phases 3-5.
- Phase 7 runs after desired story phases are complete.

### Story Dependencies

- **US1**: No dependency on other stories after foundational phase.
- **US2**: Depends on generated artifact pipeline from US1.
- **US3**: Depends on persisted generated tests from US2.

## Parallel Execution Examples

```bash
# Foundational parallel work
T006 + T007 + T008

# US1 parallel unit tests
T015 + T016

# US2 parallel storage work
T025 + T027
```

## Implementation Strategy

### MVP first

1. Complete Phase 1 and Phase 2.
2. Complete US1 (Phase 3) and validate one generated Maestro flow.
3. Demo reduced manual QA workflow from capture to executable test.

### Incremental delivery

1. Add US2 for reusable test storage and retrieval.
2. Add US3 for version history and regeneration safety.
3. Finalize with real example flows and polish.