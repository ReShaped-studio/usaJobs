---
step: 11-cta-placement-designer
project: USAJobs Redesign
date: 2026-04-11
status: confirmed
---

# CTA Placement: USAJobs Redesign

## Job Listing

### Card CTA Placement

| CTA | Tier | Placement | Trigger | Notes |
|---|---|---|---|---|
| Apply | P | Filled button, bottom-left | Always visible | Primary action — always above card fold |
| Check Eligibility | S | Outlined text button, next to Apply | Always visible | Promoted from T — helps users qualify before applying |
| Save | S | ♡ icon only, bottom-right | Always visible | Icon-only to reduce visual weight alongside Check Eligibility |
| Share | T | `···` overflow menu, top-right | Click `···` | |
| View Similar | T | `···` overflow menu, top-right | Click `···` | Uses current listing's Series + Agency + Location as filter |
| Print | Q | Not on card | — | Available on detail page only |

### Detail Page CTA Placement

| CTA | Tier | Location | Notes |
|---|---|---|---|
| Apply | P | Page header — large filled button | Always above fold |
| Check Eligibility | S | Header action bar, alongside Apply | Outlined button — labeled |
| Save | S | Header action bar | Labeled outlined button (more room than card) |
| Share | T | `···` More Actions dropdown | |
| View Similar | T | `···` More Actions dropdown | |
| Print | Q | `···` More Actions dropdown | Bumped from "not on card" — accessible here |

### Nested Card CTAs

| Parent Object | CTAs on nested Job Listing card | Notes |
|---|---|---|
| Agency detail | Apply, Check Eligibility, Save | Compact card carries full P+S set |
| Series detail | Apply, Check Eligibility, Save | Compact card carries full P+S set |
| Location detail | Apply, Check Eligibility, Save | Compact card carries full P+S set |

### Broken Object Test

| Test | Pass? | Notes |
|---|---|---|
| Primary CTA on card? | ✓ | Apply always visible |
| P+S CTAs above fold on detail page? | ✓ | Apply + Check Eligibility + Save all in header |
| Nested cards actionable? | ✓ | Compact cards on Agency/Series/Location detail carry full P+S set |
| Consistent across contexts? | ✓ | Apply is P in every context |

---

## Agency

### Card CTA Placement

| CTA | Tier | Placement | Trigger | Notes |
|---|---|---|---|---|
| Browse Jobs | P | Filled button, bottom-left | Always visible | |
| Follow | S | Outlined button, bottom-right | Always visible | |
| Share | T | `···` overflow menu, top-right | Click `···` | |

### Detail Page CTA Placement

| CTA | Tier | Location | Notes |
|---|---|---|---|
| Browse Jobs | P | Page header — filled button | |
| Follow | S | Header action bar, alongside Browse | |
| Share | T | `···` More Actions dropdown | |

### Nested Card CTAs

| Parent Object | CTAs on nested Agency card | Notes |
|---|---|---|
| Job Listing detail | Browse Jobs, Follow | Compact card — direct manipulation from JL page |

### Broken Object Test

| Test | Pass? | Notes |
|---|---|---|
| Primary CTA on card? | ✓ | Browse Jobs always visible |
| P+S CTAs above fold on detail page? | ✓ | Browse + Follow in header |
| Nested cards actionable? | ✓ | Compact card on JL detail carries Browse + Follow |
| Consistent across contexts? | ✓ | Browse is P everywhere |

---

## Occupational Series

### Card CTA Placement

| CTA | Tier | Placement | Trigger | Notes |
|---|---|---|---|---|
| Browse Jobs | P | Filled button, bottom-left | Always visible | |
| Follow | S | Outlined button, bottom-right | Always visible | |

### Detail Page CTA Placement

| CTA | Tier | Location | Notes |
|---|---|---|---|
| Browse Jobs | P | Page header — filled button | |
| Follow | S | Header action bar, alongside Browse | |

### Nested Card CTAs

| Parent Object | CTAs on nested Series card | Notes |
|---|---|---|
| Job Listing detail | Browse Jobs, Follow | Compact card — direct manipulation from JL page |

### Broken Object Test

| Test | Pass? | Notes |
|---|---|---|
| Primary CTA on card? | ✓ | Browse Jobs always visible |
| P+S CTAs above fold on detail page? | ✓ | Browse + Follow in header |
| Nested cards actionable? | ✓ | Compact card on JL detail carries Browse + Follow |
| Consistent across contexts? | ✓ | Browse is P everywhere |

---

## Location

### Card CTA Placement

| CTA | Tier | Placement | Trigger | Notes |
|---|---|---|---|---|
| Browse Jobs | P | Filled button, bottom-left | Always visible | |

### Detail Page CTA Placement

| CTA | Tier | Location | Notes |
|---|---|---|---|
| Browse Jobs | P | Page header — filled button | |

### Nested Card CTAs

| Parent Object | CTAs on nested Location card | Notes |
|---|---|---|
| Job Listing detail | Browse Jobs | No Follow — Location is not a followable object |
| Agency detail | Browse Jobs | |

### Broken Object Test

| Test | Pass? | Notes |
|---|---|---|
| Primary CTA on card? | ✓ | Browse Jobs always visible |
| P+S CTAs above fold on detail page? | ✓ | Browse Jobs in header |
| Nested cards actionable? | ✓ | Compact card carries Browse Jobs |
| Consistent across contexts? | ✓ | Browse is P everywhere |

---

## Salary Range

### Card CTA Placement

| CTA | Tier | Placement | Trigger | Notes |
|---|---|---|---|---|
| Browse (this range) | P | Text link, bottom of embedded card | Always visible | Text link, not button — leaf object, no detail page |

### Detail Page CTA Placement

n/a — Salary Range has no detail page. It is a leaf object accessible only as a filter facet on list pages and as an embedded card on Job Listing and Series detail pages.

### Nested Card CTAs

| Parent Object | CTAs on nested Salary Range card | Notes |
|---|---|---|
| Job Listing detail | "Browse jobs in this range →" text link | Embedded, not click-through to a detail page |
| Series detail | "Browse jobs in this range →" text link | Same treatment |

### Broken Object Test

| Test | Pass? | Notes |
|---|---|---|
| Primary CTA on card? | ✓ | Text link always visible |
| P+S CTAs above fold on detail page? | n/a | No detail page — intentional leaf |
| Nested cards actionable? | ✓ | Text link on embedded cards |
| Consistent across contexts? | ✓ | Same text link treatment everywhere |

---

## Cross-Object CTA Placement

| CTA | Primary location | Also appears on | Notes |
|---|---|---|---|
| Browse Jobs (Agency) | Agency card + detail header | — | Filters Jobs list by this agency |
| Browse Jobs (Series) | Series card + detail header | — | Filters Jobs list by this series |
| Browse Jobs (Location) | Location card + detail header | — | Filters Jobs list by this location |
| Browse (Salary Range) | Embedded card on JL + Series detail | Filter facet on list pages | Text link only — no detail page destination |
| Follow (Agency) | Agency card + Agency detail header | Nested Agency card on JL detail | Direct manipulation: follow from any context |
| Follow (Series) | Series card + Series detail header | Nested Series card on JL detail | Direct manipulation: follow from any context |
| View Similar | JL detail — More Actions dropdown | JL card — `···` overflow | Uses current listing's Series + Agency + Location as filters |

## Notes

**Check Eligibility promoted to Secondary:** Originally ranked Tertiary. Promoted to S because it helps users self-qualify before applying — reducing wasted applications. Placed as an outlined text button next to Apply on both card and detail page.

**Save demoted to icon-only on cards:** With two S-tier CTAs (Check Eligibility + Save), Save becomes a ♡ icon to reduce visual weight. Restored to labeled button on the detail page where space allows.

**Direct manipulation on JL detail:** Nested Agency and Series compact cards on the Job Listing detail page carry their own Browse + Follow CTAs. Users can follow an agency or series directly from a job listing without navigating away. This fulfills the OOUX principle: act on the object you're looking at.

**Salary Range treatment:** No detail page, no button — only a text link ("Browse jobs in this range →"). This is intentional. Salary Range is a leaf object; promoting it to a full button would overstate its navigational importance.

**Print as Q on detail page only:** Print is not on any card. On the Job Listing detail page it lives inside the More Actions (`···`) dropdown — accessible but not prominent.

**Anti-pattern resolved:** Broken Objects — every object is directly actionable in every context where it appears, including nested compact card contexts.
