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
