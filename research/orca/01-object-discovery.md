---
step: 01-object-discovery
project: Reshaped — USAJobs
date: 2026-04-09
status: confirmed
---

# Object Discovery: USAJobs

## Sources Used

- BRIEF.md — project brief with pre-identified object scope
- USAJobs API schema (via developer.usajobs.gov and abigailhaddad.github.io/usajobs_historical) — 40+ fields
- USAJobs Help Center — job announcement structure (overview, duties, qualifications, how to apply, required documents, benefits)

## Validated Objects — Standalone

| # | Object | Slug | S | I | P | Notes |
|---|---|---|---|---|---|---|
| 1 | Job Listing | `job-listing` | ✅ positionTitle, announcementNumber, salary, location, openDate, closeDate, duties, qualifications, securityClearance, travelRequirement | ✅ "IT Specialist GS-13 at DoD", "Park Ranger GS-7 at NPS", "Border Patrol Agent at CBP" | ✅ Users browse listings to find and evaluate jobs to apply for | Primary object for v1 |
| 2 | Agency | `agency` | ✅ name, code, department, sub-element, mission description | ✅ Department of Defense, National Park Service, Dept of Veterans Affairs | ✅ Users browse agencies to find jobs at organizations they want to work for | Spans department and sub-element levels |
| 3 | Occupational Series | `occupational-series` | ✅ series code, series name, pay plan, grade range, typical duties | ✅ IT Specialist (2210), Miscellaneous Administration (0301), Border Patrol Agent (1896) | ✅ Users filter and browse by series to find relevant role types across agencies | Renamed from Position; scoped to OPM 4-digit series classification |
| 4 | Location | `location` | ✅ city, state, country, region, remote-eligible flag | ✅ Washington DC, Fort Bragg NC, Anchorage AK | ✅ Users filter and decide by location — affects relocation, commute, life decisions | |
| 5 | Salary Range | `salary-range` | ✅ min salary, max salary, pay scale, pay plan, salary type, grade range | ✅ "$82,764–$107,590/year GS-13", "$19.47–$25.32/hour WG-7", "SES — negotiable" | ✅ Users filter by salary floor and evaluate financial viability before investing in application | Scoped to min/max/scale/type for v1; excludes locality pay and special rates |

## Nested Objects (exist within Job Listing, not independently navigable)

| Object | Nested Inside | Rationale |
|---|---|---|
| Qualification | Job Listing | Has internal structure (experience requirements, education options, grade-specific variants) but no existence outside a specific listing. Promoted to standalone in a future iteration if cross-listing queries become relevant. |

## Rejected Nouns

| Rejected Noun | Reason | Reclassified As |
|---|---|---|
| Appointment Type | Weak structure (name + description only). Users filter by it, not navigate to it. | Enum attribute on Job Listing |
| Work Schedule | Same as Appointment Type. No detail page imaginable. | Enum attribute on Job Listing |
| Security Clearance | Simple enumeration. | Enum attribute on Job Listing |
| Benefits | Attribute bundle of Agency or Job Listing. No independent navigation. | Attribute of Agency |
| Required Documents | Listed per announcement. | Nested or attribute on Job Listing |

## Phantom Objects (deferred)

| Object | Why It Passes SIP | Why Deferred |
|---|---|---|
| Hiring Path | Has structure (name, code, description, eligibility criteria). Named instances: Open to Public, Federal Employees, Veterans, Recent Graduates, Schedule A, Military Spouses. Purpose: users filter to find jobs they're actually eligible for — critical for inclusive design. | Out of brief's v1 scope. Define in a future iteration, especially given accessibility/inclusivity importance. |

## Anti-Patterns Flagged

**Masked Object — Position/Occupational Series:** "Position" used in two senses in the domain — a federal HR slot with a Position Description (out of scope) and an occupational series classification (in scope). Resolved by renaming the in-scope concept to Occupational Series.

**Phantom Object — Hiring Path:** Present in the API, significant for inclusive design (veterans, people with disabilities, recent graduates), but out of v1 scope. Flag for v2.

## Notes

- Object count reduced from brief's 6 to 5 standalone objects: Qualification demoted to nested object; Position renamed to Occupational Series.
- Federal pay complexity (locality pay, special rates, SES bands) deferred from Salary Range definition for v1.
- The Occupational Series object enables cross-agency browsing by role type — a design pattern absent from current USAJobs.
