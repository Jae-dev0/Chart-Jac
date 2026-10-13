# Jac-Chart setup (port 5179)

This folder is a Jac-Chart fork of Jac-Chart: same codebase, rebranded UI
(`Jac-Chart`), Vite/dev access on **http://localhost:5179**, API on
**http://localhost:1337**.

## New laptop in 3 steps

1. Copy this whole folder (it already contains working `.env`,
   `.env.local`, and `apps/web/.env.local`), or clone and run the generator:
   ```bash
   node ./scripts/setup-jac-chart.mjs
   # or: pnpm setup
   ```
   The script never overwrites existing files — it only creates missing ones,
   fills empty `AUTH_SECRET` / `POSTGRES_PASSWORD`, and enforces the 5179 URL.
2. Start one of:
   ```bash
   docker compose up --build                      # simplest: bundled app + db
   docker compose -f compose.local.yml up --build # separate api/web/db containers
   pnpm install && pnpm dev                       # native dev (needs local Postgres)
   ```
3. Open **http://localhost:5179**. First non-guest account becomes the owner.

## Native `pnpm dev` database

The API reads the root `.env`. Inside containers the DB host is `postgres`;
on your host it must be `localhost`. Either run Postgres via the compose
`postgres` service, or add to your root `.env`:

```env
DATABASE_URL=postgresql://jac-chart:<same-password>@localhost:5432/jac-chart
POSTGRES_HOST=localhost
```

Keep `AUTH_SECRET` stable or sessions break on restart.

## What was renamed (and what was not)

- Renamed (user-visible): browser title/meta, PWA manifest, tab suffix,
  logo alt text, `common.appName` in every locale, all `Jac-Chart` sentences in
  `i18n/en-US.json`, Trello connect label, import-source label, import
  "from" label, auth email subjects, import-busy error.
- Intentionally unchanged (technical): `JAC_CHART_*` env names, `@jac-chart/*`
  packages, `jac-chart` import-source id, `X-Jac-Chart-*` headers/signatures,
  `jac-chart-cli` / `jac-chart-mcp` device ids, CSS classes (`.jac-chart-*`), component
  names, file names (`Dockerfile.jac-chart`, `nginx.jac-chart.conf`), DB names,
  container-internal port 5173 (host-mapped to 5179).
