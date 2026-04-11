---
step: 09-object-card-designer
project: Reshaped — USAJobs
object: agency
date: 2026-04-10
status: confirmed
---

# Object Card Design: Agency

## Card Mockup — Full (Agency List / Search Results)

```
┌─────────────────────────────────────┐
▌ [seal] Dept of Veterans Affairs ··· ▌  ← logoUrl + name  |  overflow menu
▌        Federal Agency               ▌  ← agencyLevel (or departmentName)
▌ ─────────────────────────────────  ▌
▌ 342 open listings                   ▌  ← activeListingCount (bold)
▌ "To fulfill Lincoln's promise…"     ▌  ← missionSummary snippet (italic)
▌ ─────────────────────────────────  ▌
▌ [Browse jobs]  [★ Follow]           ▌  ← P CTA + S CTA
└─────────────────────────────────────┘
```

## Card Mockup — Compact (Nested on Occ. Series / Location detail page)

```
┌──────────────────────────────────┐
│ [seal]  Dept of Veterans Affairs │
│         342 listings  [Browse →] │
└──────────────────────────────────┘
```

Drops: agencyLevel, mission snippet, Follow CTA. Keeps: logo/seal, name, listing count, Browse link.

---

## Visual Identity

| Element | Specification | Rationale |
|---|---|---|
| Icon/avatar | Agency seal or logo (square, rounded corners). Fallback: initials block (e.g. "VA") | Organizations have seals, not documents. Logo is the strongest single differentiator. |
| Accent | Warm gray left border | Distinguishes from Job Listing (steel blue). Neutral tone fits an organizational identity. |
| No status pill | — | Agencies don't open/close. Listing count does lifecycle work. |
| Mission snippet | Italic, 1–2 lines, truncated with ellipsis | Only Agency has a mission field. Immediately signals "organization" vs "vacancy" or "category". |

---

## Content Hierarchy

| Zone | Attribute | Rank | Rationale |
|---|---|---|---|
| Title | `name` | 1 | Primary identifier — the agency's name |
| Subtitle | `agencyLevel` or `departmentName` | 2 | Hierarchy context — is this a department, agency, or sub-element? |
| Metric | `activeListingCount` | 3 | Opportunity signal — how many jobs are actually open right now |
| Body | `missionSummary` (snippet) | 4 | Identity signal — what this organization does |
| (Logo) | `logoUrl` | — | Visual identity; fallback to initials block |

---

## CTA Placement on Card

| CTA | Tier | On Card | Placement | Notes |
|---|---|---|---|---|
| Browse agency listings | P | Yes | `[Browse jobs]` — always present | Links to filtered Job Listing list |
| Follow agency | S | Yes | `[★ Follow]` star button | Implies notification subscription |
| Share agency page | T | Overflow `···` | Hidden by default | |

---

## Distinctness Test

| Test | Pass? | Notes |
|---|---|---|
| Different from Job Listing card? | ✅ Yes | Seal/logo vs document icon; listing count vs salary; Browse vs Apply |
| Different from Occ. Series card? | ✅ Yes | Logo/seal vs series code badge; mission text vs grade ladder |
| Different from Location card? | ✅ Yes | Logo/seal vs map thumbnail |
| Different from Salary Range card? | ✅ Yes | Org identity vs numerical range |
| Two Agency instances distinguishable? | ✅ Yes | Name, seal, listing count, mission all vary |
| Recognizable without title text? | ✅ Yes | Seal + mission snippet combination is unique to Agency |

---

## Contexts This Card Appears In

| Context | Variant | Notes |
|---|---|---|
| Agency list / search-by-agency | Full card | All attributes visible |
| Nested on Occupational Series detail | Compact | Logo, name, listing count, Browse only |
| Nested on Location detail | Compact | Same compact variant |

---

## Key Departures from USAJobs Current Design

| | USAJobs Today | This Design |
|---|---|---|
| Agency as navigable object | Does not exist — modal only | First-class detail page with full card |
| Agency browsing | Not supported | Agency list page with full cards |
| Mission text | Hidden in modal, no snippet on list | Shown as italic snippet on card |
| Follow / notification | Not supported | S-tier CTA on card |
