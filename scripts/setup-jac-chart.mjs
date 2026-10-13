// Jac-Chart one-command setup for a new laptop.
// Usage:
//   node ./scripts/setup-jacChart.mjs        (docker defaults, keeps existing secrets)
//   node ./scripts/setup-jacChart.mjs --dev  (also prints host-native pnpm-dev DB help)
// Only Node stdlib is used so it runs before `pnpm install`.
import { randomBytes } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const WEB_PORT = "5179";
const API_URL = "http://localhost:1337";
const CLIENT_URL = `http://localhost:${WEB_PORT}`;

function randomHex(bytes) {
  return randomBytes(bytes).toString("hex");
}

function ensureFile(target, content) {
  if (existsSync(target)) {
    console.log(`keep: ${target} (already exists)`);
    return false;
  }
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
  console.log(`created: ${target}`);
  return true;
}

function fillSecrets(text, { authSecret, pgPassword }) {
  // Fill empty AUTH_SECRET / POSTGRES_PASSWORD without touching set values.
  // Supports `KEY=` and `KEY=   ` (empty) forms.
  text = text.replace(/^AUTH_SECRET=\s*$/m, `AUTH_SECRET=${authSecret}`);
  text = text.replace(/^POSTGRES_PASSWORD=\s*$/m, `POSTGRES_PASSWORD=${pgPassword}`);
  return text;
}

function forceClientUrl(text) {
  if (/^JAC_CHART_CLIENT_URL=/m.test(text)) {
    return text.replace(/^JAC_CHART_CLIENT_URL=.*$/m, `JAC_CHART_CLIENT_URL=${CLIENT_URL}`);
  }
  return `JAC_CHART_CLIENT_URL=${CLIENT_URL}\n${text}`;
}

// 1. Root .env (docker compose up / bundled image).
const envPath = join(root, ".env");
const samplePath = join(root, ".env.sample");
let authSecret = randomHex(32);
let pgPassword = randomHex(24);
if (!existsSync(envPath)) {
  const sample = existsSync(samplePath) ? readFileSync(samplePath, "utf8") : "";
  const base = sample || `JAC_CHART_CLIENT_URL=${CLIENT_URL}\nPOSTGRES_DB=jacChart\nPOSTGRES_USER=jacChart\nPOSTGRES_PASSWORD=\nAUTH_SECRET=\n`;
  writeFileSync(envPath, forceClientUrl(fillSecrets(base, { authSecret, pgPassword })));
  console.log(`created: ${envPath}`);
} else {
  // Top up missing secrets and enforce the 5179 client URL.
  let text = readFileSync(envPath, "utf8");
  const before = text;
  if (/^AUTH_SECRET=\s*$/m.test(text)) text = text.replace(/^AUTH_SECRET=\s*$/m, `AUTH_SECRET=${authSecret}`);
  if (/^POSTGRES_PASSWORD=\s*$/m.test(text)) text = text.replace(/^POSTGRES_PASSWORD=\s*$/m, `POSTGRES_PASSWORD=${pgPassword}`);
  text = forceClientUrl(text);
  if (text !== before) {
    writeFileSync(envPath, text);
    console.log(`updated: ${envPath}`);
  } else {
    console.log(`keep: ${envPath} (already configured)`);
  }
}

// Reuse the same secrets for .env.local so both compose stacks share credentials.
const envText = readFileSync(envPath, "utf8");
const pick = (key) => envText.match(new RegExp(`^${key}=(.*)$`, "m"))?.[1]?.trim() ?? "";
const sharedAuth = pick("AUTH_SECRET") || authSecret;
const sharedPg = pick("POSTGRES_PASSWORD") || pgPassword;

// 2. Root .env.local (compose.local.yml: api + web + postgres containers).
ensureFile(
  join(root, ".env.local"),
  `# Jac-Chart local setup (port ${WEB_PORT}) — used by \`docker compose -f compose.local.yml up\`.\n` +
    `JAC_CHART_CLIENT_URL=${CLIENT_URL}\nJAC_CHART_API_URL=${API_URL}\n` +
    `POSTGRES_DB=jacChart\nPOSTGRES_USER=jacChart\nPOSTGRES_PASSWORD=${sharedPg}\nAUTH_SECRET=${sharedAuth}\n`,
);

// 3. Web .env.local (Vite dev server on 5179).
ensureFile(
  join(root, "apps", "web", ".env.local"),
  `# Jac-Chart local dev (port ${WEB_PORT}). Read by Vite, overrides .env.development.\n` +
    `VITE_API_URL=${API_URL}\nVITE_CLIENT_URL=${CLIENT_URL}\n`,
);

console.log(`
Jac-Chart env is ready.
  Web:  ${CLIENT_URL}
  API:  ${API_URL}/api/health

Next on this machine:
  Docker (simplest):  docker compose up --build
  Local containers:   docker compose -f compose.local.yml up --build
  Native dev:         pnpm install && pnpm dev
    (native API needs a local Postgres; set
     DATABASE_URL=postgresql://"jac-chart":<password>@localhost:5432/jacChart
     plus POSTGRES_HOST=localhost, keeping the same AUTH_SECRET.)

Run with --dev to also see the native-dev DATABASE_URL hint.
`);

if (process.argv.includes("--dev")) {
  console.log(`Native-dev .env additions (do NOT use inside containers):
  DATABASE_URL=postgresql://"jac-chart":${sharedPg}@localhost:5432/jacChart
  POSTGRES_HOST=localhost
`);
}
