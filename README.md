# civiWork

A clearer front-end for federal job discovery, informed by the [USAJobs](https://www.usajobs.gov/) public API and the civi.work product design. This app does not replace USAJobs and does not submit applications on your behalf.

## Stack

- Vue 3 + TypeScript + Vite
- Vue Router
- [USWDS](https://designsystem.digital.gov/) (Sass compile + static assets)

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/)

## Setup

```bash
pnpm install
```

`postinstall` copies USWDS `fonts` and `img` into `public/` for local development. If assets are missing, run:

```bash
pnpm run sync-assets
```

## Develop

```bash
pnpm dev
```

## Build

```bash
pnpm run build
pnpm run preview
```

## Environment

Copy [.env.example](.env.example) to `.env` and set:

- **`USAJOBS_API_KEY`** — from [developer.usajobs.gov](https://developer.usajobs.gov/)
- **`USAJOBS_USER_AGENT`** — a contact email (required by the API)

These variables are read **only by the Vite dev server** when proxying `GET /api/usajobs` to `https://data.usajobs.gov/api/search`, so the API key is not exposed in the client bundle. The home page uses live `SearchResultCountAll` values when the proxy succeeds; otherwise it falls back to static mock counts.

**Production:** `pnpm build` + `pnpm preview` do not run the dev proxy. Serve the app behind a reverse proxy or serverless route that forwards `/api/usajobs` to `https://data.usajobs.gov/api/search` with the same headers, or use a small backend-for-frontend.

## Project layout

- `src/components/civi/` — Reusable product UI (built **component-by-component**): wordmark, brand block, header nav, header search, composed `CiviHeader` (Figma Header `36:1856`)
- `src/components/home/` — Page sections (hero, browse cards) until split further
- `src/constants/navigation.ts` — Primary nav items shared by the header
- `src/styles/civi-tokens.css` — Shared CSS variables for civi surfaces
- `src/data/` — Mock data for the multi-object landing page
- `src/api/usajobs/` — USAJobs Search client (same-origin `/api/usajobs` proxy in dev)
- `src/composables/` — `useHomeBrowseCounts` for live open-position counts on the home page
- `src/router/` — App routes (stub list pages for agencies, series, locations)
- `research/` — Product and IA research (orca, etc.)

## Status

See [design/decisions.md](design/decisions.md) for recorded technical decisions.
