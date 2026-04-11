# Design Decisions

A log of significant design decisions, the options considered, and the reason for the choice made. Decisions are recorded here so they do not get relitigated.

---

## Format

Each entry:

**Decision:** What was decided.
**Context:** What problem or question prompted it.
**Options considered:** What else was on the table.
**Rationale:** Why this option was chosen.
**Date:** When the decision was made.

---

**Decision:** Use Vue 3 + Vite + TypeScript at the civiWork repo root, with Vue Router and USWDS 3 (Sass), and mock data for the first homepage.

**Context:** Need a maintainable federal-style UI and a clear place to swap in USAJobs API data later.

**Options considered:** React + Vite; Nuxt (SSR); USWDS pre-built CSS only without Sass.

**Rationale:** Matches the existing workspace direction (Vue + Vite), keeps the first slice as an SPA with typed mocks, and compiles USWDS Sass with Vite’s modern Sass API + `loadPaths` for package resolution. Static copy/sync ensures fonts and images resolve in dev and production builds.

**Date:** 2026-04-11

