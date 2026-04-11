---
step: 09-object-card-designer
project: Reshaped — USAJobs
object: salary-range
date: 2026-04-10
status: confirmed
---

# Object Card Design: Salary Range

## Card Mockup — Full (Salary Range List / Nested on Series detail)

```
┌─────────────────────────────────────┐
▌ $ [GS-13] [Annual]             ···  ▌  ← $ icon + grade pill + type pill
▌   $82,764 – $107,590                ▌  ← min–max (large, bold — the headline)
▌   Per year                          ▌  ← salaryType
▌ ─────────────────────────────────  ▌
▌ Pay scale: GS   ·   Steps 1–10      ▌  ← payScale + stepRange
▌ 47 open listings in this range      ▌  ← activeListingCount
▌ ─────────────────────────────────  ▌
▌ [Browse listings]                   ▌  ← P CTA only
└─────────────────────────────────────┘
```

## Card Mockup — Compact (Nested on Occupational Series detail)

```
┌──────────────────────────────────┐
│ $ GS-13   $82,764–$107,590/yr    │
│ 47 listings  [Browse →]          │
└──────────────────────────────────┘
```

Drops: salary type label, pay scale, step range. Keeps: $ icon, grade pill, range, listing count, Browse link.

---

## Visual Identity

| Element | Specification | Rationale |
|---|---|---|
| $ icon | Dollar sign, prominent | Only object where money is the object itself, not a property of it |
| Grade pill | `GS-13` as a badge in the header | Grade is the primary lookup key — how users will browse salary ranges |
| Type pill | `Annual` or `Hourly` badge | Distinguishes fundamentally different pay structures |
| Large number treatment | Min–max dominates the card body | Inverts the hierarchy of every other card — the number *is* the title |
| No map, no logo, no status pill | — | Absence of these signals is itself differentiating |
| No Follow CTA | — | Salary Range is a leaf object; nothing to subscribe to |

---

## Content Hierarchy

| Zone | Attribute | Rank | Rationale |
|---|---|---|---|
| Header | `minimumGrade` (pill) + `salaryType` (pill) | 1 | Classification identity — how the range is keyed |
| Title | `minimumSalary` – `maximumSalary` | 2 | The number is the object — displayed large and bold |
| Subtitle | `salaryType` label | 3 | "Per year" / "Per hour" — completes the number |
| Detail | `payScale` + `stepRange` | 4 | Technical detail for users who know the GS system |
| Metric | `activeListingCount` | 5 | Opportunity signal at this pay level |

---

## CTA Placement on Card

| CTA | Tier | On Card | Placement | Notes |
|---|---|---|---|---|
| Browse listings in range | P | Yes | `[Browse listings]` — always present | Links to filtered Job Listing list for this salary range |

---

## Distinctness Test

| Test | Pass? | Notes |
|---|---|---|
| Different from Job Listing card? | ✅ Yes | $ icon + large number vs document icon + title text; no Apply |
| Different from Agency card? | ✅ Yes | Numeric identity vs organizational identity |
| Different from Location card? | ✅ Yes | Number-dominant layout vs map-dominant layout |
| Different from Occ. Series card? | ⚠️ Requires care | Both show GS grades and dollar ranges — $ icon, grade pill placement, and the inverted number-first hierarchy must carry the distinction |
| Two Salary Range instances distinguishable? | ✅ Yes | Grade, min, max, step range, listing count all vary |
| Recognizable without title text? | ✅ Yes | $ icon + number-as-headline layout is unique to Salary Range |

---

## Contexts This Card Appears In

| Context | Variant | Notes |
|---|---|---|
| Salary Range list / browse | Full card | Grade badge, full range, pay scale, step range, listing count |
| Nested on Occupational Series detail | Compact | $ icon, grade badge, range, listing count, Browse only |

---

## Design Note: Salary Range vs Occupational Series Ambiguity

Both cards show GS grades and dollar ranges. The safeguards are:
1. **$ icon** is unique to Salary Range; Occupational Series uses ≡ classification icon
2. **Number-first layout** — Salary Range leads with the dollar figure; Series leads with the series code badge
3. **Grade ladder** (`GS-7 → GS-15`) appears only on Series; Salary Range shows a single grade (`GS-13`)
4. **No series code** on Salary Range card; no salary range headline on Series card

If these still read as similar in testing, consider a background tint on Salary Range cards (very light green — money association) to add one more layer of distinction.
