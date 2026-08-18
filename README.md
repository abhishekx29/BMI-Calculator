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

## Hostinger hosting

This app is configured for static Apache hosting. Build the production files with:

```sh
npm run build
```

Upload the contents of the generated `dist` folder to your Hostinger document root,
usually `public_html`. Do not upload the project source folder or the `.output`
folder. The included `.htaccess` file keeps the app working when the hosting
provider receives a direct browser request, including client-side routes.
