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
npx expo run:ios --configuration release

Execution with parameters

maestro --platform=ios test .maestro/flows --include-tags e2e
maestro --platform=android test .maestro/flows --include-tags e2e