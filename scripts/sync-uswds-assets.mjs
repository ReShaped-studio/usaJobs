import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const uswdsDist = path.join(root, "node_modules/@uswds/uswds/dist");

function copyDir(name) {
  const from = path.join(uswdsDist, name);
  const to = path.join(root, "public", name);
  if (!fs.existsSync(from)) {
    console.warn(`sync-uswds-assets: skip ${name} (run pnpm install first)`);
    return;
  }
  fs.rmSync(to, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
  console.log(`sync-uswds-assets: copied ${name}`);
}

copyDir("fonts");
copyDir("img");
