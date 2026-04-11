---
step: 12-shapeshifter-matrix-builder
project: USAJobs Redesign
date: 2026-04-11
status: confirmed
---

# Shapeshifter Matrix: USAJobs Redesign

## Scope Note

This is a single-product, single-role (job seeker) system. The primary shapeshifter dimension is **page/location context** — full card vs. compact nested variant vs. embedded vs. filter facet. Multi-product, multi-role, and device dimensions are not applicable in this redesign scope.

---

## Job Listing

### Context Map

| Context | Location | User Role | Notes |
|---|---|---|---|
| Full card | Search results list page | Job seeker | Primary browse context |
| Detail page | Job Listing detail | Job seeker | Full object view |
| Compact nested card | Agency / Series / Location detail pages | Job seeker | Nested in parent object's Open Jobs section |
| Dashboard saved card | Authenticated dashboard | Job seeker | Saved jobs — same treatment as full card |

### Variance Matrix

| Dimension | Full Card | Detail Page | Compact Nested | Dashboard | Consistent? | Intentional? |
|---|---|---|---|---|---|---|
| Name | Job title | Job title | Job title | Job title | ✓ | n/a |
| Visual identity | Steel blue left border | Steel blue page accent | Steel blue left border | Steel blue left border | ✓ | n/a |
| Attributes shown | Title, Agency, Location, Grade, Salary, Status, Close date | All attributes | Title, Grade, Salary, Status | Same as full card | Partial | ✓ Intentional — compact variant strips to essentials |
| Apply (P) | Filled button | Large filled button in header | Filled button | Filled button | ✓ | n/a |
| Check Eligibility (S) | Outlined button | Outlined button in header | Outlined button | Outlined button | ✓ | n/a |
| Save (S) | ♡ icon only | Labeled outlined button | ♡ icon only | ♡ icon only | Partial | ✓ Intentional — more space on detail page allows labeled button |
| Share (T) | `···` overflow | More Actions dropdown | Not shown | `···` overflow | Partial | ✓ Intentional — compact card omits T-tier |
| Print (Q) | Not shown | More Actions dropdown | Not shown | Not shown | Partial | ✓ Intentional — Q-tier only on detail page |

### Consistency Summary

- **Fully consistent**: Name, visual identity (steel blue), Apply placement, Check Eligibility placement
- **Intentionally variant**: Save label (icon → labeled on detail page, space-based); fewer attributes on compact nested; T/Q CTAs absent from compact cards
- **Unintentional variance**: None identified
- **Unclear**: None

### Recommendations

None required. All variances are intentional and documented.

---

## Agency

### Context Map

| Context | Location | User Role | Notes |
|---|---|---|---|
| Full card | Agency list page | Job seeker | Primary browse context |
| Detail page | Agency detail | Job seeker | Full object view |
| Compact nested card | Job Listing detail page | Job seeker | In Agency section |
| Homepage browse card | Multi-object homepage | Job seeker (anonymous) | Same treatment as full card |
| Dashboard followed card | Authenticated dashboard | Job seeker | Same treatment as full card |

### Variance Matrix

| Dimension | Full Card | Detail Page | Compact Nested | Homepage / Dashboard | Consistent? | Intentional? |
|---|---|---|---|---|---|---|
| Name | Agency name | Agency name | Agency name | Agency name | ✓ | n/a |
| Visual identity | Warm gray left border + seal | Seal in header | Warm gray border + seal | Same as full card | ✓ | n/a |
| Attributes shown | Seal, name, mission snippet, job count | Full mission, website, size, type | Seal, name, mission snippet | Same as full card | Partial | ✓ Intentional — compact variant |
| Browse Jobs (P) | Filled button | Filled button in header | Filled button | Filled button | ✓ | n/a |
| Follow (S) | Outlined button | Outlined button in header | Outlined button | Outlined button | ✓ | n/a |
| Share (T) | `···` overflow | More Actions dropdown | Not shown | `···` overflow | Partial | ✓ Intentional — compact card omits T-tier |

### Consistency Summary

- **Fully consistent**: Name, visual identity (warm gray + seal), Browse Jobs, Follow
- **Intentionally variant**: Fewer attributes on compact nested; Share absent from compact card
- **Unintentional variance**: None identified
- **Unclear**: None

### Recommendations

None required.

---

## Occupational Series

### Context Map

| Context | Location | User Role | Notes |
|---|---|---|---|
| Full card | Series list page | Job seeker | Primary browse context |
| Detail page | Series detail | Job seeker | Full object view |
| Compact nested card | Job Listing detail page | Job seeker | In Series section |
| Series pill tag | Agency detail page | Job seeker | In "Series this agency hires" section |
| Homepage browse card | Multi-object homepage | Job seeker (anonymous) | Same treatment as full card |
| Dashboard followed card | Authenticated dashboard | Job seeker | Same treatment as full card |

### Variance Matrix

| Dimension | Full Card | Detail Page | Compact Nested | Series Pill (Agency) | Homepage / Dashboard | Consistent? | Intentional? |
|---|---|---|---|---|---|---|---|
| Name | Code + full name | Code + full name | Code + full name | Code + name (truncated if long) | Code + full name | Partial | ✓ Intentional — pill format has limited space |
| Visual identity | GS + series code pills | Same in header | GS + code pills (smaller) | Plain tag, no card chrome | Same as full card | No | ✓ Intentional — pill is a fundamentally different representation |
| Attributes shown | Code, name, grade ladder, job count | All attributes | Code, name, grade | Code + name only | Same as full card | No | ✓ Intentional — pill strips everything except identifier |
| Browse Jobs (P) | Filled button | Filled button in header | Filled button | None — link navigation only | Filled button | No | ✓ Intentional — pill uses click-through link, not a button |
| Follow (S) | Outlined button | Outlined button in header | Outlined button | None | Outlined button | No | ✓ Intentional — pill is too small for a Follow button; Follow available on Series detail |

### Consistency Summary

- **Fully consistent**: All full-card contexts (list, homepage, dashboard) are identical
- **Intentionally variant**: Series pill on Agency detail is the most significant variant — no card chrome, no button CTAs, link-only navigation. Documented reason: derived relationship (many-to-many, automatically computed), space constraint, keeps Agency detail page lightweight
- **Unintentional variance**: None identified
- **Unclear**: None

### Recommendations

One design guidance note: the Series pill on Agency detail should always include both the series code AND the series name (even if truncated), never the code alone. Code-only pills ("0343") are opaque to most job seekers. Minimum label: "0343 – Management & Program Analysis" with truncation at ~40 characters if needed.

---

## Location

### Context Map

| Context | Location | User Role | Notes |
|---|---|---|---|
| Full card | Location list page | Job seeker | Primary browse context |
| Detail page | Location detail | Job seeker | Full object view |
| Compact nested card | Job Listing detail page | Job seeker | In Location section |
| Compact nested card | Agency detail page | Job seeker | In Locations section |
| Homepage browse card | Multi-object homepage | Job seeker (anonymous) | Same treatment as full card |

### Variance Matrix

| Dimension | Full Card | Detail Page | Compact Nested | Homepage | Consistent? | Intentional? |
|---|---|---|---|---|---|---|
| Name | City / "Remote" | City / "Remote" | City / "Remote" | City / "Remote" | ✓ | n/a |
| Visual identity | Map thumbnail + pin icon | Map in header | Pin icon only (no map thumbnail) | Same as full card | Partial | ✓ Intentional — map thumbnail too large for compact format |
| Attributes shown | Name, remote flag, job count | Full + Open Jobs | Name, remote flag | Same as full card | Partial | ✓ Intentional — compact variant |
| Browse Jobs (P) | Filled button | Filled button in header | Filled button | Filled button | ✓ | n/a |

### Consistency Summary

- **Fully consistent**: Name, Browse Jobs CTA placement
- **Intentionally variant**: Map thumbnail absent from compact nested (space constraint); pin icon retained as identity marker
- **Unintentional variance**: None identified
- **Unclear**: None

### Recommendations

None required. Consider whether the pin icon alone is sufficient to identify Location cards in compact form, or whether a subtle background tint could reinforce identity — but this is a visual design decision, not a shapeshifter fix.

---

## Salary Range

### Context Map

| Context | Location | User Role | Notes |
|---|---|---|---|
| Embedded card | Job Listing detail page | Job seeker | In Salary Range section |
| Embedded card | Series detail page | Job seeker | In Salary Range section |
| Filter facet | All list pages | Job seeker | Checkbox / range slider |

### Variance Matrix

| Dimension | Embedded (JL detail) | Embedded (Series detail) | Filter Facet | Consistent? | Intentional? |
|---|---|---|---|---|---|
| Name | "$94k–$122k · GS-13" | Same | Range label | ✓ | n/a |
| Visual identity | $ icon + grade pill + card chrome | Same | No card chrome | Partial | ✓ Intentional — filter facet is a different UI component |
| Attributes shown | Grade pill, range, pay type | Same | Range only | Partial | ✓ Intentional — filter facet shows minimum needed to filter |
| CTA | "Browse jobs in this range →" text link | Same | None — selecting it IS the action | Partial | ✓ Intentional — filter facet action is selection, not navigation |

### Consistency Summary

- **Fully consistent**: Both embedded card contexts are identical
- **Intentionally variant**: Filter facet is a fundamentally different UI component (intentional — selecting a filter IS the navigation action)
- **Unintentional variance**: None identified
- **Unclear**: None

### Recommendations

None required.

---

## Masked Objects Check

| Name used | Context | Canonical name | Action needed |
|---|---|---|---|
| "Series" | Nav label, button labels, pill tags | Occupational Series | ✓ Accepted shortform — use "Series" in nav/UI, "Occupational Series" in detail page headings only |
| "Job Series" | Live USAJobs site | Occupational Series | Do not carry this over into the redesign |
| "Job Opportunity Announcement" / "JOA" | Live USAJobs site | Job Listing | Do not carry this over — "Job Listing" is the canonical name in this redesign |
| "Employer" | Live USAJobs agency modal | Agency | Do not carry this over — "Agency" is the canonical name |

---

## Overall Consistency Summary

| Object | Unintentional variance? | Shapeshifter risk |
|---|---|---|
| Job Listing | None | Low |
| Agency | None | Low |
| Occupational Series | None — pill variant is intentional | Low (pill variant well-documented) |
| Location | None | Low |
| Salary Range | None — filter facet is intentional | Low |

**No unintentional shapeshifting identified across the system.** All variance is intentional, documented, and driven by either space constraints (compact variants) or fundamentally different UI components (pill tags, filter facets).

## Notes

**Canonical naming decisions:**
- Job Listing (not "Job Opportunity Announcement", "JOA", or "Position")
- Agency (not "Employer" or "Organization")
- Occupational Series / Series (not "Job Series" or "Career Track")
- Location (consistent)
- Salary Range (consistent)

**The Series pill variant** is the most visually distinct departure in the system. It is the only context where an object loses its card chrome entirely. This is intentional and load-bearing — it keeps the Agency detail page lightweight while preserving the Agency→Series NOM connection as a navigable path.

**Anti-pattern resolved:** Shapeshifters — all object variants are documented with explicit reasons. No object changes name, icon, or primary CTA inconsistently across contexts.
