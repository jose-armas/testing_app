# Maestro E2E Testing Guide

## Prerequisites & Installation

### 1. Install Maestro CLI

```bash
# Install Maestro globally
brew install maestro

# Verify installation
maestro --version
```

### 2. System Requirements

- **macOS**: Xcode Command Line Tools installed
- **Android**: Android SDK installed and emulator configured
- **iOS**: Xcode installed with iOS development tools
- **Node.js**: v16 or higher

### 3. Verify Device/Emulator

Before running tests, ensure you have:

**For iOS:**
```bash
# Start iOS simulator
open -a Simulator

# Or specify a device
xcrun simctl list devices available
```

**For Android:**
```bash
# Start Android emulator
emulator -list-avds
emulator -avd <your-emulator-name>
```

---

## Building the App for Testing

Before running Maestro tests, create release builds of your application:

### Build for iOS

```bash
# Generate iOS app archive
npx expo export
npx expo run:ios --configuration release
```

### Build for Android

```bash
# Generate Android app bundle/APK
npx expo export
npx expo run:android --variant release
```

---

## Running Maestro Tests

### Basic Test Execution

```bash
# Run all tests
maestro test .maestro/flows

# Run tests on specific platform
maestro --platform=ios test .maestro/flows
maestro --platform=android test .maestro/flows
```

### Advanced Test Execution

```bash
# Run tests with specific tags (e.g., e2e tests)
maestro --platform=ios test .maestro/flows --include-tags e2e

# Run specific test file
maestro --platform=ios test .maestro/flows/<test-name>.yaml

# Run with verbose output
maestro --platform=ios test .maestro/flows --verbose

# Run with report generation
maestro --platform=ios test .maestro/flows --output report.html
```

---

## Test Structure

```
.maestro/
├── flows/           # Test flow definitions
│   ├── login.yaml
│   ├── counter.yaml
│   └── ...
└── README.md        # This file
```

---

## Quick Start Workflow

1. **Install Maestro**
   ```bash
   brew install maestro
   ```

2. **Start your emulator/simulator**
   ```bash
   # iOS
   open -a Simulator
   
   # Android
   emulator -avd <name>
   ```

3. **Build the app for testing**
   ```bash
   npx expo run:ios --configuration release
   # or
   npx expo run:android --variant release
   ```

4. **Run the tests**
   ```bash
   maestro --platform=ios test .maestro/flows
   ```

---

## Troubleshooting

### Tests not running on simulator
- Ensure the simulator/emulator is running
- Check that the app is installed and running
- Verify the app accessibility labels match your test selectors

### Maestro command not found
- Ensure Maestro is installed: `brew install maestro`
- Add to PATH if needed: `export PATH="/opt/maestro/bin:$PATH"`

### Build failures
- Clear cache: `rm -rf .expo`
- Rebuild: `npx expo prebuild --clean`
- Check Node.js version: `node --version` (should be 16+)