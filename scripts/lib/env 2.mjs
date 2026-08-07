/**
 * Minimal .env.local loader for the standalone generation scripts.
 * Next.js loads .env.local for the app automatically; plain `node` does not.
 * Importing this module fills process.env from TSC/.env.local for any key
 * not already set, so scripts run with no inline secrets:
 *   node scripts/generate-images.mjs
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const envPath = path.join(
  path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url)))),
  ".env.local"
);

try {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
  }
} catch {
  // No .env.local — scripts fall back to whatever the shell provides.
}
