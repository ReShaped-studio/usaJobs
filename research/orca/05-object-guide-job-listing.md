---
object: Job Listing
slug: job-listing
project: Reshaped — USAJobs
step: 05-object-guide-builder
date: 2026-04-09
status: confirmed
---

# Object Guide: Job Listing

**TL;DR:** A Job Listing is the primary object in this system. It surfaces an open Agency position, its Location, Salary Range, and Qualifications, and links to the application.

---

## Definition

A Job Listing is a time-bound federal vacancy announcement for a specific position at a specific agency.

## SIP Validation

| Criterion | Evidence |
|---|---|
| Structure | positionTitle, announcementNumber, openDate, closeDate, salary, location, duties, qualifications, status, applyUrl — rich enough for a full detail page |
| Instances | "IT Specialist GS-13 at Dept of Defense", "Park Ranger GS-7 at National Park Service", "Border Patrol Agent GS-11 at CBP" |
| Purpose | Job seekers browse and evaluate listings to decide whether to apply |

## Attributes

| Category | Attribute | Type | Required | Notes |
|---|---|---|---|---|
| Identifiers | positionTitle | string | yes | |
| Identifiers | announcementNumber | string | yes | Public-facing ID |
| Status | status | enum | yes | Open / Closed / Cancelled |
| Status | closingType | enum | yes | On date / Number of applicants / Continuous |
| Status | totalOpenings | string | yes | Count or "Few" / "Many" |
| Dates | openDate | date | yes | |
| Dates | closeDate | date | no | Absent when closingType is Continuous |
| Work conditions | workSchedule | enum | yes | Full-time / Part-time / Shift / Intermittent |
| Work conditions | appointmentType | enum | yes | Permanent / Temporary / Term / Detail |
| Work conditions | serviceType | enum | yes | Competitive / Excepted |
| Work conditions | supervisoryStatus | boolean | yes | |
| Work conditions | travelRequirement | enum | yes | None / Occasional / Frequent / Extensive |
| Work conditions | relocationAssistance | boolean | yes | |
| Work conditions | teleworkEligible | boolean | yes | |
| Requirements | securityClearance | enum | yes | None / Public Trust / Secret / Top Secret / TS/SCI |
| Requirements | drugTestRequired | boolean | yes | |
| Eligibility | whoMayApply | string | yes | Plain-text eligibility summary |
| Eligibility | hiringPaths | array | yes | String array for v1 |
| Eligibility | promotionPotential | string | no | Max grade this role can reach |
| Content | duties | text | yes | |
| Content | summary | text | no | Overview paragraph |
| Content | howToApply | text | yes | |
| Content | requiredDocuments | text | no | |
| Content | benefits | text | no | |
| Content | applyUrl | string | yes | Links to agency application system |

## Nested Objects

| Object | Cardinality | How it appears |
|---|---|---|
| Qualification | one-to-many | Sections by grade level |
| Agency | many-to-one | Header reference: name, logo, department |
| Occupational Series | many-to-one | Label: series code and name |
| Location | many-to-many | List of duty stations; remote flag if applicable |
| Salary Range | many-to-one | Pay block: min/max, scale, grade |

## This Object Nests Inside

- Agency — as a list of open listings
- Occupational Series — as a list of active listings in that series
- Location — as a list of jobs at that location

## Relationships

| Related object | Cardinality | Mechanics | Dependency |
|---|---|---|---|
| Agency | many-to-one | Agency code on listing maps to Agency object | Required |
| Occupational Series | many-to-one | Series code on listing maps to Occupational Series | Required |
| Location | many-to-many | Listing carries one or more location records | Required (or teleworkEligible = true) |
| Salary Range | many-to-one | Grade and pay scale map to Salary Range object | Required |

## CTAs

| CTA | Priority | Actor | State requirement | Notes |
|---|---|---|---|---|
| Apply | P | Job seeker | status = Open, applyUrl present | External handoff. Not a POST. |
| Save listing | S | Authenticated job seeker | Any | |
| Share listing | T | Job seeker | Any | Shareable URL |
| View similar listings | T | Job seeker | Any | Filtered by series and location |
| Check eligibility | T | Job seeker | Any | Surfaces hiring path match |
| Print / export listing | Q | Job seeker | Any | |

## Business Rules

1. Apply is only available when status = Open and applyUrl is present.
2. closeDate is required unless closingType is Continuous.
3. At least one Location is required, or teleworkEligible must be true.
4. At least one Qualification is required.
5. One primary CTA per role: Apply for job seekers. Falls back to Save listing if Apply is unavailable.
6. The redesign does not accept applications. Apply always links out to the agency system.

## Lifecycle

| State | Description | Triggers | Variant |
|---|---|---|---|
| Open | Accepting applications | openDate reached | active |
| Closed | No longer accepting applications | closeDate reached, applicant limit hit, or agency closes | default |
| Cancelled | Listing withdrawn | Agency cancels before close | warn |

Transitions: Open to Closed, Open to Cancelled. Closed and Cancelled are terminal.

## Permissions

| Role | View | Apply | Save |
|---|---|---|---|
| Anonymous job seeker | Yes | Yes (handoff) | No |
| Authenticated job seeker | Yes | Yes (handoff) | Yes |
| Agency admin | Out of scope | Out of scope | Out of scope |

## Open Questions

1. How is state persistence handled for Save listing — browser-local or a light backend? Determines whether saved listings survive across sessions.
2. Should Check eligibility be surfaced on the list view card or only on the detail page?
3. What triggers View similar listings — same series only, or series plus location?

## See Also

- Object Guide: Agency
- Object Guide: Occupational Series
- Object Guide: Salary Range
- NOM (02-nom.md)
- CTA Matrix (03-cta-matrix.md)
