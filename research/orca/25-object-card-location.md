---
step: 09-object-card-designer
project: Reshaped — USAJobs
object: location
date: 2026-04-10
status: confirmed
---

# Object Card Design: Location

## Card Mockup — Full (Location List Page)

```
┌─────────────────────────────────────┐
▌ ┌───────────────────────────────┐   ▌
▌ │         [ map ]               │   ▌  ← static map tile (coordinates)
▌ └───────────────────────────────┘   ▌
▌ 📍 Washington, DC              ···  ▌  ← city + state  |  overflow menu
▌    District of Columbia             ▌  ← state full name + region
▌ ─────────────────────────────────  ▌
▌ 1,204 open listings                 ▌  ← activeListingCount (bold)
▌ ✓ Remote-eligible listings here     ▌  ← remoteEligible flag (when true)
▌ ─────────────────────────────────  ▌
▌ [Browse listings]                   ▌  ← P CTA only
└─────────────────────────────────────┘
```

## Card Mockup — Compact (Nested on Agency detail)

```
┌──────────────────────────────────┐
│ 📍 Washington, DC                │
│    1,204 listings  [Browse →]    │
└──────────────────────────────────┘
```

Drops: map thumbnail, region, remote flag. Keeps: pin icon, city+state, listing count, Browse link.

---

## Visual Identity

| Element | Specification | Rationale |
|---|---|---|
| Map thumbnail | Static map tile at top of card | The single strongest differentiator — no other object has geography. Immediately signals "place". |
| Pin icon | 📍 before city/state label | Reinforces place identity beneath the map |
| Remote flag | `✓ Remote-eligible listings here` — shown only when true | High-value signal for remote workers browsing locations. Absent when not applicable. |
| No logo, no grade, no salary | — | The absence of organization/compensation data is itself a distinguishing signal |
| No Follow CTA | — | Location has no Follow action (unlike Agency and Series) |

---

## Content Hierarchy

| Zone | Attribute | Rank | Rationale |
|---|---|---|---|
| Visual | Map thumbnail | — | Geography-first; the map communicates before any text |
| Title | `city` + `state` | 1 | Primary identifier |
| Subtitle | State full name + `region` | 2 | Regional context for users unfamiliar with state abbreviations |
| Metric | `activeListingCount` | 3 | Opportunity density — how many jobs are actually here |
| Flag | `remoteEligible` | 4 | High-value filter signal; shown only when true |

---

## CTA Placement on Card

| CTA | Tier | On Card | Placement | Notes |
|---|---|---|---|---|
| Browse location listings | P | Yes | `[Browse listings]` — always present | Links to filtered Job Listing list for this location |
| View location | — | Card itself is the view | Clicking the card navigates to Location detail | |

---

## Distinctness Test

| Test | Pass? | Notes |
|---|---|---|
| Different from Job Listing card? | ✅ Yes | Map thumbnail vs document icon; no salary, no Apply |
| Different from Agency card? | ✅ Yes | Map vs seal/logo; place identity vs org identity |
| Different from Occ. Series card? | ✅ Yes | Map vs series code badge; no grade ladder |
| Different from Salary Range card? | ✅ Yes | Map vs $ icon; geographic data vs numeric data |
| Two Location instances distinguishable? | ✅ Yes | City name, map tile, listing count, region all vary |
| Recognizable without title text? | ✅ Yes | Map thumbnail is unique to Location — no other card type has one |

---

## Contexts This Card Appears In

| Context | Variant | Notes |
|---|---|---|
| Location list / browse | Full card | Map thumbnail + all attributes |
| Nested on Agency detail | Compact | Pin icon, city+state, listing count, Browse only |

---

## Key Departures from USAJobs Current Design

| | USAJobs Today | This Design |
|---|---|---|
| Location as navigable object | Filter only — no location pages | First-class detail page with full card |
| Map visualization | Not present | Map thumbnail on card; full map on detail page |
| Remote-eligible signal | Separate filter checkbox | Surfaced inline on the Location card itself |
