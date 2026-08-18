# BMI Calculator

A fast, accurate Body Mass Index calculator that provides health insights based on your measurements.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Android APK

The project includes a Capacitor Android wrapper. On Windows with Android Studio
installed, run the following from PowerShell:

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
npm run android:build
```

The debug APK is generated at
`android/app/build/outputs/apk/debug/app-debug.apk`. For a signed release APK,
open the `android` folder in Android Studio and configure a release keystore.

## Hostinger Node.js hosting

This app is configured as a Node.js web application for Hostinger. Use Node.js 20
or newer in hPanel, then configure the application with these values:

- **Application startup file:** `.output/server/index.mjs`
- **Application root:** the project root containing `package.json`
- **Build command:** `npm run build`
- **Start command:** `npm start`

Hostinger provides the `PORT` environment variable automatically. The generated
Nitro server listens on that port, so no hard-coded port is needed. Deploy the
project source with `package.json` and `package-lock.json`; do not upload only
the `dist` folder. After installing dependencies, run the build command so the
`.output` directory is generated before starting the application.
