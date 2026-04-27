# Kandyan Atlas

React Native final-round assessment app for the Kandy travel product experience.

## What this build includes

- Client-side frontend only, using static JSON data
- Premium Kandy-themed product page in React Native
- Editorial hero section, travel storytelling, and branded `AK` visual identity
- Search, category filters, prompt shortcuts, quick mood filters, favorites, and product detail modal
- Custom app icons and Android-ready native project

## Design direction

The UI theme is built around a Kandy boutique-travel mood:

- Deep canopy green and temple-gold palette
- Cormorant Garamond display typography with DM Sans body typography
- Warm ivory surfaces instead of default white cards
- Editorial card layout, soft motion, and tactile filter interactions

## Main paths

- App entry: `App.tsx`
- Mock data: `src/data/products.ts`
- Components: `src/components`
- Theme tokens: `src/theme/index.ts`

## Verified outputs

- TypeScript check passed with `npm run typecheck`
- Web bundle preview passed with `npm run preview:web`
- Android debug APK built successfully
- Android release APK built successfully

Release APK:

- `deliverables/Kandyan-Atlas-v1-release.apk`
- `android/app/build/outputs/apk/release/app-release.apk`

## Run locally

Install dependencies:

```powershell
npm install
```

Start Expo:

```powershell
npm start
```

Run on Android:

```powershell
npm run android
```

## Rebuild APK

If Android SDK environment variables are not already configured in your machine, use:

```powershell
$env:ANDROID_HOME='C:\Users\junai\AppData\Local\Android\Sdk'
$env:ANDROID_SDK_ROOT=$env:ANDROID_HOME
$env:NODE_ENV='production'
```

Generate the native Android project:

```powershell
npx expo prebuild --platform android --clean
```

Build debug APK:

```powershell
cd android
.\gradlew.bat assembleDebug
```

Build release APK:

```powershell
cd android
.\gradlew.bat assembleRelease
```

## Notes

- The project uses static data intentionally because the assessment clarification said no API integration is required for this phase.
- `newArchEnabled` is set to `false` in `app.json` to avoid Windows path-length issues during native Android builds on this machine.
- The generated release APK is signed with the debug signing config from the default Expo/React Native Android template, which is fine for interview evaluation installs.
