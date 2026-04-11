---
step: 02-nom-builder
project: Reshaped — USAJobs
date: 2026-04-09
status: confirmed
---

# Nested-Object Matrix: USAJobs

## Objects Included

1. Job Listing
2. Agency
3. Occupational Series
4. Location
5. Salary Range

(Qualification is a confirmed nested object of Job Listing from Step 1 — not included as a column/row here.)

## Small System Model

```
AGENCY ──────────────posts──────────────► JOB LISTING
JOB LISTING ──────appears at──────────► LOCATION
JOB LISTING ──────offers──────────────► SALARY RANGE
```

## NOM

The question for each cell: "If a user is on the ROW detail page, would they see a list or section showing COLUMN?"

| Parent ↓ / Nested → | Job Listing | Agency | Occupational Series | Location | Salary Range |
|---|---|---|---|---|---|
| **Job Listing** | — | ✓ | ✓ | ✓ | ✓ |
| **Agency** | ✓ | — | ✓ | ✓ | — |
| **Occupational Series** | ✓ | ✓ | — | — | ✓ |
| **Location** | ✓ | — | — | — | — |
| **Salary Range** | — | — | — | — | — |

## Pattern Analysis

| Pattern | Objects |
|---|---|
| Hub objects (richest detail pages) | Job Listing (4 nested), Agency (3 nested), Occupational Series (3 nested) |
| Popular nested object (appears in most parents) | Job Listing — surfaces on Agency, Occupational Series, and Location pages |
| Leaf objects (simple, few outbound) | Location (1 nested), Salary Range (0 nested — attributes only) |
| Isolated objects ⚠️ | None ✅ |

## Notes

- Job Listing is both a hub (rich detail page) and the most-sought nested object. Every other object surfaces it. Primary object for v1.
- Salary Range has no nested objects — it is a pure leaf. Its value is in the attributes it carries, not as a navigation node.
- Agency and Occupational Series are secondary hubs — meaningful destination pages, not just filters.
- Location is a thin hub — one outbound connection (jobs at this location). Worth keeping but minimal.
- Qualification (nested object from Step 1) lives inside Job Listing and does not appear in the NOM as a standalone row/column.
