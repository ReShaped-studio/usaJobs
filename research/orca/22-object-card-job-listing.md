---
step: 09-object-card-designer
project: Reshaped — USAJobs
object: job-listing
date: 2026-04-10
status: confirmed
---

# Object Card Design: Job Listing

## Card Mockup — Full (Search Results / List Page)

```
┌─────────────────────────────────────┐
▌ 📄 IT Specialist (INFOSEC)      ··· ▌  ← positionTitle  |  overflow menu
▌    Dept of Defense · Series 2210    ▌  ← agency.name · series.code + name
▌ ─────────────────────────────────  ▌
▌ ● OPEN · Closes Apr 30, 2026        ▌  ← status pill + closeDate
▌ $82,764 – $107,590 / yr  GS-13      ▌  ← salary min–max + grade (bold)
▌ 📍 Arlington, VA  ✓ Telework        ▌  ← location + teleworkEligible
▌ Full-time · Permanent               ▌  ← workSchedule · appointmentType
▌ ─────────────────────────────────  ▌
▌ [  Apply  ]  [★ Save]               ▌  ← P CTA (disabled if Closed)
└─────────────────────────────────────┘
```

## Card Mockup — Compact (Nested on Agency / Series / Location detail page)

```
┌──────────────────────────────────────────────┐
│ ● IT Specialist (INFOSEC) · GS-13            │
│   Dept of Defense · Arlington, VA             │
│   $82,764–$107,590   Closes Apr 30   [Apply] │
└──────────────────────────────────────────────┘
```

Drops: icon, series subtitle, secondary CTA. Keeps: status, title, salary, location, date, Apply.

---

## Visual Identity

| Element | Specification | Rationale |
|---|---|---|
| Icon | 📄 Document (top-left) | Evokes a job announcement / posting — a specific vacancy |
| Accent | Left border stripe, steel blue | Marks it as a browseable listing; distinguishes from Agency (warm gray) and Series (no border) |
| Status pill | Green = Open · Amber = Closing Soon (≤7 days) · Gray = Closed · Red = Cancelled | Biggest gap vs live site — USAJobs only shows raw dates |
| Salary zone | Full min–max range, bold, second visual weight after title | USAJobs shows "Starting at" only — full range is the redesign's primary signal improvement |
| Overflow `···` | Share, View similar listings, Check eligibility | T-tier CTAs stay out of the way on the card |

---

## Content Hierarchy

| Zone | Attribute | Rank | Rationale |
|---|---|---|---|
| Title | `positionTitle` | 1 | Primary identifier — the job's name |
| Subtitle | `agency.name` + `series.code` | 2 | Who's hiring + what kind of role |
| Status | `status` + `closeDate` | 3 | Is it still worth pursuing? |
| Metric | `salaryRange` (min–max, grade) | 4 | #1 filter signal; shown as full range not floor |
| Context | `location` + `teleworkEligible` | 5 | Where you'd actually work |
| Footer | `workSchedule` + `appointmentType` | 6 | Quick rule-out signal |

---

## CTA Placement on Card

| CTA | Tier | On Card | Placement | Notes |
|---|---|---|---|---|
| Apply | P | Yes | Prominent button, always visible | Disabled (grayed) when status ≠ Open |
| Save listing | S | Yes | Star icon button, top-right | Persists across sessions if authenticated |
| Share listing | T | Overflow `···` | Hidden by default | |
| View similar listings | T | Overflow `···` | Hidden by default | |
| Check eligibility | T | Overflow `···` | Hidden by default | |
| Print / export | Q | Not on card | Detail page only | |

---

## Distinctness Test

| Test | Pass? | Notes |
|---|---|---|
| Different from Agency card? | ✅ Yes | Doc icon vs building/seal; salary+Apply vs listing count+Browse |
| Different from Occ. Series card? | ✅ Yes | Specific vacancy (dates, Apply) vs category (grade ladder, series badge) |
| Different from Location card? | ✅ Yes | Map thumbnail is Location's primary differentiator |
| Different from Salary Range card? | ✅ Yes | $ icon + grade pill vs doc icon + status badge |
| Two Job Listing instances distinguishable? | ✅ Yes | Title, agency, salary, location all vary per instance |
| Recognizable without title text? | ✅ Yes | Status+salary+Apply CTA combo is unique to Job Listing |

---

## Contexts This Card Appears In

| Context | Variant | Notes |
|---|---|---|
| Search results / list page | Full card | Primary decision surface; all attributes visible |
| Nested on Agency detail | Compact | No icon, no series subtitle, no Save; Apply stays |
| Nested on Occupational Series detail | Compact | Same as Agency nested; agency name stays in subtitle |
| Nested on Location detail | Compact | Same compact variant |

---

## Key Departures from USAJobs Current Design

| | USAJobs Today | This Design |
|---|---|---|
| Salary display | "Starting at $X" (floor only) | Full min–max range |
| Status on list row | None — dates only | Colored status pill |
| Series code on list row | Not shown | Shown in subtitle |
| Agency link | Modal pop-up from detail page | Subtitle links to Agency detail page |
| Hiring path indicators | Icon-only badges (unlabeled) | Deferred to Check eligibility CTA (T-tier) |
