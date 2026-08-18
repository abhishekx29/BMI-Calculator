import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const client = path.join(dist, "client");
const clientAssets = path.join(client, "assets");
const outputAssets = path.join(dist, "assets");
const publicDir = path.join(root, "public");
const assets = await readdir(clientAssets);
const javascriptEntry = assets.find((file) => /^index-.*\.js$/.test(file));
const stylesheet = assets.find((file) => /^styles-.*\.css$/.test(file));

if (!javascriptEntry || !stylesheet) {
  throw new Error("Unable to find the generated client entry assets.");
}

await mkdir(outputAssets, { recursive: true });
await cp(clientAssets, outputAssets, { recursive: true });

try {
  const publicFiles = await readdir(publicDir, { withFileTypes: true });
  for (const entry of publicFiles) {
    const source = path.join(publicDir, entry.name);
    const target = path.join(dist, entry.name);
    await cp(source, target, { recursive: true, force: true });
  }
} catch {
  // public directory is optional; ignore when absent.
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Calculate your Body Mass Index and understand your health" />
    <title>BMI Calculator</title>
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="./assets/${stylesheet}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./assets/${javascriptEntry}"></script>
  </body>
</html>
`;

await writeFile(path.join(dist, "index.html"), html);
await writeFile(path.join(dist, "404.html"), html);
await rm(client, { recursive: true, force: true });
await rm(path.join(dist, "server"), { recursive: true, force: true });

console.log(`Static Hostinger files prepared in ${path.relative(root, dist)}`);
