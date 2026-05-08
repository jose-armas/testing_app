## To start with Maestro

First create real build

npx expo export
npx expo run:android --variant release
npx expo run:ios --configuration release

Execution with parameters

maestro --platform=ios test .maestro/flows --include-tags e2e