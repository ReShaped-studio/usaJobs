---
step: 10-nav-flow-designer
project: USAJobs Redesign
date: 2026-04-11
status: confirmed
---

# Navigation Flow: USAJobs Redesign

## Flow Diagram

```
[Homepage — multi-object landing]          [Dashboard — personalized landing]
  search bar + browse cards                  saved jobs + followed agencies/series
       |                                              |
  ┌────┴──────────────────────────────┐             |
  ↓          ↓           ↓           ↓             |
[Jobs    [Agencies   [Series     [Locations         |
 List]    List]       List]       List]             |
  |         |           |           |               |
  ↓         ↓           ↓           ↓               |
[Job     [Agency    [Series     [Location    ←──────┘
 Listing  Detail]   Detail]     Detail]
 Detail]    |           |           |
   |        ├─ Open Jobs ──────→ [Job Listing Detail]
   |        ├─ Locations ───────→ [Location Detail]
   |        └─ Series pills ──→ [Series Detail]
   |
   ├── Agency card ──────────→ [Agency Detail]
   ├── Series card ──────────→ [Series Detail]
   ├── Location card ─────────→ [Location Detail]
   ├── Apply ──────────────────→ [External — leaves system]
   └── Save ───────────────────→ Dashboard saved list


[Series Detail]
   ├── Open Jobs ──────────────→ [Job Listing Detail]
   └── Agencies Hiring ────────→ [Agency Detail]

[Location Detail]
   └── Open Jobs ──────────────→ [Job Listing Detail]
```

## Entry Points by Role

| Role | Entry Page | Type | First Objects Visible |
|---|---|---|---|
| Anonymous job seeker | Homepage | Landing (multi-object) | JL search results, Agency cards, Series cards, Location cards |
| Authenticated job seeker | Dashboard | Landing (personalized) | Saved Job Listing cards, followed Agency cards, followed Series cards |
| Either (direct link) | Job Listing detail | Detail | Single JL with Agency, Series, Location, Salary Range sections |

## Page Type Assignments

| Object | Landing | List | Detail | Notes |
|---|---|---|---|---|
| Job Listing | ✓ Homepage + Dashboard | ✓ Search results | ✓ | Richest hub; 4 nested sections (Agency, Series, Location, Salary Range) |
| Agency | ✓ Homepage | ✓ | ✓ | Design bet: promoted to first-class navigable object |
| Occupational Series | ✓ Homepage | ✓ | ✓ | Series pill tags on Agency detail are clickable links |
| Location | ✓ Homepage | ✓ | ✓ | Thin hub; one nested section (Open Jobs) |
| Salary Range | — | — | — | Filter facet on list pages; embedded card on JL + Series detail only |

## Navigation Tier Summary

| Tier | Objects | How Accessed |
|---|---|---|
| Primary nav | Jobs, Agencies, Series, Locations | Always visible in global nav |
| Secondary | Salary Range | Filter facet + embedded card on JL and Series detail pages |
| Deep | — | No object requires 3+ clicks from primary nav |

## Detail Page Designs

### Job Listing Detail
1. Header: title, agency name, location(s), grade/salary, open/close dates + Apply (P) + Save (S)
2. Body: full description, duties, qualifications, how to apply
3. **Agency section** — 1 compact Agency card (click-through to Agency detail)
4. **Occupational Series section** — 1 compact Series card (click-through to Series detail)
5. **Location section** — compact Location card(s) (click-through to Location detail; includes remote flag)
6. **Salary Range section** — 1 compact Salary Range card (embedded, not click-through — leaf object)

### Agency Detail
1. Header: seal/logo, name, mission snippet + Browse (P) + Follow (S)
2. About: full mission, website link, size/type
3. **Open Jobs section** — JL compact card list (filterable/sortable; click-through to JL detail)
4. **Series section** — clickable pill tags linking to OccSeries detail pages (not full card list)
5. **Locations section** — Location compact card list (click-through to Location detail)

### Occupational Series Detail
1. Header: series code + name, GS grade ladder + Browse (P) + Follow (S)
2. About: series description, typical duties, qualification requirements
3. **Open Jobs section** — JL compact card list (click-through to JL detail)
4. **Agencies Hiring section** — Agency compact card list (click-through to Agency detail)
5. **Salary Range section** — 1 compact Salary Range card (embedded, not click-through)

### Location Detail
1. Header: location name, remote flag, job count + Browse (P)
2. **Open Jobs section** — JL compact card list (click-through to JL detail)

### Salary Range
No detail page. Accessible as: filter facet on list pages; embedded compact card on JL detail and Series detail.

## Isolated Objects Check

| Object | Reachable? | Dead End? | Status |
|---|---|---|---|
| Job Listing | ✓ Every path leads here | None — 4 forward exits + Apply | ✓ Clean |
| Agency | ✓ Primary nav + JL detail + Series detail | None — 2 forward exits | ✓ Clean |
| Occupational Series | ✓ Primary nav + JL detail + Agency detail (via pills) | None — 2 forward exits | ✓ Clean |
| Location | ✓ Primary nav + JL detail + Agency detail | None — 1 forward exit (JL) | ✓ Clean |
| Salary Range | ✓ Embedded on JL + Series; filter facets | Intentional leaf | ✓ Clean |

## Notes

**Design bets made:**
- Agency is promoted from a modal (current USAJobs behavior) to a first-class navigable object with its own list and detail pages.
- Series pill tags on Agency detail are clickable links to OccSeries detail — this closes the Agency→OccSeries NOM connection without adding visual weight of full card lists.
- Salary Range has no dedicated page; it lives as a filter facet and embedded card. This was a conscious choice — Salary Range is a leaf object (0 nested in NOM) and doesn't benefit from its own navigable page.
- The Dashboard shows saved Job Listings, followed Agencies, and followed Series — not Location or Salary Range follows, which would be low-utility for most users.

**Relationships confirmed read-only:**
All MCSFD relationships in this system are automatic/derived. No user-created relationships exist. This means card list sections on detail pages are always system-generated, never user-curated.

**Anti-pattern resolved:**
Isolated Objects — every NOM connection produces a visible navigation path. Agency→OccSeries connection is preserved via clickable series pill tags.
