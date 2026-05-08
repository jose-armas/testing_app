# Testing App - UI Flow Test Generator

React Native application that enables capturing user interaction flows on mobile devices and automatically generating reproducible E2E tests using Maestro.

## Purpose

Reduce manual QA effort by capturing user flows and automatically generating test cases that can be versioned and reused.

## Features

- 📱 **UI Flow Capture**: Record user interactions within the mobile application
- 🧪 **Automatic Test Generation**: Convert captured flows into structured tests
- 🔄 **Test Reusability**: Save and reuse generated tests without recapturing flows
- 📊 **Test Versioning**: Maintain historical records of generated tests over time

## Technology Stack

- **Framework**: React Native 0.81.5
- **Platform**: Expo ~54.0.33
- **Language**: TypeScript ~5.9.2
- **E2E Testing**: Maestro (planned)

## Project Structure

```
testing-app/
├── App.tsx              # Main component
├── app.json             # Expo configuration
├── package.json         # Project dependencies
├── android/             # Native Android code
├── ios/                 # Native iOS code
├── assets/              # Resources (images, fonts)
├── .maestro/            # Maestro E2E UI tests
│   └── flows/           # Test flow definitions
├── specs/               # Feature specifications
│   └── 001-ui-flow-test-generation/  # Main feature
```

## Quick Setup

### Requirements
- Node.js 16+
- Expo CLI (`npm install -g expo-cli`)
- iOS 13+ / Android 5.1+ (to run on devices)

### Installation

```bash
npm install
```

### Available Commands

```bash
npm start       # Start development server
npm run ios     # Run in iOS simulator
npm run android # Run in Android emulator
npm run web     # Run in web browser
```

## Current Status

- ✅ Functional base application with demo counter
- 🔄 Feature specification in draft
- 📝 Base architecture for flow capture and test generation (in development)

## User Stories

1. **P1**: Capture mobile flows and automatically generate tests
2. **P2**: Reuse generated tests across multiple QA runs
3. **P3**: Version generated tests over time

## Detailed Documentation

Check the `specs/001-ui-flow-test-generation/` folder for:
- `spec.md` - Complete feature specification
- `plan.md` - Implementation plan
- `data-model.md` - Data model

## Next Steps

1. Implement flow capture component
2. Develop Maestro format test generator
3. Create test storage and versioning system
4. Integrate E2E tests with Maestro
