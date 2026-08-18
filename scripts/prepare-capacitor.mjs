import { writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const publicDir = path.join(process.cwd(), ".output", "public");
const port = 4179;
const server = spawn(process.execPath, [path.join(process.cwd(), ".output", "server", "index.mjs")], {
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

let html;
try {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://localhost:${port}/`);
      if (response.ok) {
        html = await response.text();
        break;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
} finally {
  server.kill();
}

if (!html) {
  throw new Error("Unable to render the production HTML shell for Capacitor.");
}

html = html.replaceAll('"/./assets/', '"./assets/');

await writeFile(path.join(publicDir, "index.html"), html);