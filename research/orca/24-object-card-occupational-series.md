---
step: 09-object-card-designer
project: Reshaped — USAJobs
object: occupational-series
date: 2026-04-10
status: confirmed
---

# Object Card Design: Occupational Series

## Card Mockup — Full (Series List Page)

```
┌─────────────────────────────────────┐
▌ ≡ [GS] [2210]                   ··· ▌  ← pay plan pill + series code badge
▌   Information Technology Mgmt       ▌  ← seriesName (title)
▌   IT Specialist                     ▌  ← common job title within series
▌ ─────────────────────────────────  ▌
▌ GS-7 → GS-15   ·   GS pay plan     ▌  ← grade ladder + payPlan
▌ $55,924 – $183,500 / yr             ▌  ← salary floor–ceiling across grades
▌ 218 open listings                   ▌  ← activeListingCount
▌ ─────────────────────────────────  ▌
▌ [Browse listings]  [★ Follow]       ▌
└─────────────────────────────────────┘
```

## Card Mockup — Compact (Nested on Agency or Job Listing detail)

```
┌─────────────────────────────────┐
│ [2210]  IT Management  GS-7–15  │
│         218 listings  [Browse →]│
└─────────────────────────────────┘
```

Drops: icon, common title, salary range, Follow CTA. Keeps: series code badge, name, grade range, listing count, Browse link.

---

## Visual Identity

| Element | Specification | Rationale |
|---|---|---|
| Icon | ≡ Classification/list glyph | Evokes a structured category — not a specific vacancy or organization |
| Series code badge | Code (e.g. `2210`) as a prominent pill | How federal workers actually refer to series; makes rows instantly scannable |
| Grade ladder | `GS-7 → GS-15` with arrow | Unique to Series — no other card type shows a grade progression |
| No status pill | — | Occupational Series are permanent OPM classifications, not time-bound |
| No left border accent | — | Deliberately minimal; Series are reference/browse objects, not urgent action destinations |

---

## Content Hierarchy

| Zone | Attribute | Rank | Rationale |
|---|---|---|---|
| Header | `payPlan` + `seriesCode` | 1 | The classification identity — how the system knows this series |
| Title | `seriesName` | 2 | Human-readable name |
| Subtitle | Common job title | 3 | Bridges OPM jargon to plain-language role name |
| Grade ladder | `minimumGrade` → `maximumGrade` + `payPlan` | 4 | Career path signal — what level can you reach? |
| Salary range | Floor–ceiling across all grades in series | 5 | Compensation context for the full ladder |
| Metric | `activeListingCount` | 6 | Opportunity signal right now |

---

## CTA Placement on Card

| CTA | Tier | On Card | Placement | Notes |
|---|---|---|---|---|
| Browse series listings | P | Yes | `[Browse listings]` — always present | Links to filtered Job Listing list |
| Follow series | S | Yes | `[★ Follow]` star button | Notification subscription for new listings |

---

## Distinctness Test

| Test | Pass? | Notes |
|---|---|---|
| Different from Job Listing card? | ✅ Yes | Category (grade ladder, series code) vs specific vacancy (status pill, Apply) |
| Different from Agency card? | ✅ Yes | Series code + grade ladder vs seal/logo + mission text |
| Different from Location card? | ✅ Yes | Grade ladder vs map thumbnail |
| Different from Salary Range card? | ⚠️ Weak without badges | Both show dollar ranges and GS grades — series code badge and grade ladder arrow must do real work |
| Two Series instances distinguishable? | ✅ Yes | Code, name, grade range, salary range, listing count all vary |
| Recognizable without title text? | ✅ Yes | Series code badge + grade ladder is unique to this card type |

---

## Contexts This Card Appears In

| Context | Variant | Notes |
|---|---|---|
| Occupational Series list / browse | Full card | All attributes visible |
| Nested on Agency detail | Compact | Code badge, name, grade range, listing count, Browse only |
| Nested on Job Listing detail | Compact | Same compact variant |
