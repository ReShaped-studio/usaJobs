---
step: 04-object-map-builder
project: Reshaped — USAJobs
date: 2026-04-09
status: confirmed
---

# Object Map: USAJobs

## Object Cards

---

**JOB LISTING**

| Attribute | Type | Source | Notes |
|---|---|---|---|
| `positionTitle` | string | API | The job title, e.g. "IT Specialist (INFOSEC)" |
| `announcementNumber` | string | API | Public identifier, e.g. "HHS-FDA-2026-001" |
| `openDate` | date | API | When applications open |
| `closeDate` | date | API | Application deadline |
| `closingType` | enum | API | How it closes: on date / number of applicants / continuous |
| `status` | enum | API | Open / Closed / Cancelled |
| `totalOpenings` | string | API | Number of available positions, or "few" / "many" |
| `workSchedule` | enum | API | Full-time / Part-time / Shift / Intermittent |
| `appointmentType` | enum | API | Permanent / Temporary / Term / Detail |
| `serviceType` | enum | API | Competitive / Excepted |
| `supervisoryStatus` | boolean | API | Is this a supervisory role? |
| `travelRequirement` | enum | API | None / Occasional (25%) / Frequent (50%) / Extensive (75%+) |
| `relocationAssistance` | boolean | API | Is relocation reimbursed? |
| `teleworkEligible` | boolean | API | Remote work available? |
| `securityClearance` | enum | API | None / Public Trust / Secret / Top Secret / TS/SCI |
| `drugTestRequired` | boolean | API | |
| `whoMayApply` | string | API | Eligibility summary text |
| `hiringPaths` | array | API | Reference to Hiring Path (deferred object) |
| `duties` | text | API | Full duties description |
| `summary` | text | API | Job overview / summary paragraph |
| `howToApply` | text | API | Application instructions |
| `requiredDocuments` | text | API | What documents to submit |
| `benefits` | text | API | Benefits description |
| `applyUrl` | string | API | Link to agency application system |
| `promotionPotential` | string | API | Maximum grade for promotion in this role |

Nested: Qualification, Agency (reference), Occupational Series (reference), Location (reference), Salary Range (reference)

CTAs: Apply, Save listing, Share listing, Print/export listing, View similar listings, Check eligibility

---

**AGENCY**

| Attribute | Type | Source | Notes |
|---|---|---|---|
| `name` | string | API | Agency name, e.g. "Food and Drug Administration" |
| `code` | string | API | OPM agency code |
| `departmentName` | string | API | Parent department, e.g. "Dept of Health and Human Services" |
| `departmentCode` | string | API | OPM department code |
| `subElementName` | string | API | Bureau or office within agency, e.g. "Center for Drug Evaluation" |
| `agencyLevel` | enum | API | Department / Agency / Sub-element |
| `missionSummary` | text | Manual | One-paragraph mission description |
| `websiteUrl` | string | Manual | Official agency website |
| `logoUrl` | image | Manual | Agency seal or logo |
| `activeListingCount` | number | Computed | Count of currently open listings |

Nested: Job Listing, Occupational Series, Location

CTAs: View agency, Browse agency listings, Follow agency, Share agency page

---

**OCCUPATIONAL SERIES**

| Attribute | Type | Source | Notes |
|---|---|---|---|
| `seriesCode` | string | API/OPM | 4-digit OPM code, e.g. "2210" |
| `seriesName` | string | API/OPM | e.g. "Information Technology Management" |
| `payPlan` | enum | API | GS / WG / SES / FWS / other |
| `minimumGrade` | string | API | Lowest grade typically offered |
| `maximumGrade` | string | API | Highest grade typically offered |
| `typicalDuties` | text | OPM | General description of role responsibilities |
| `activeListingCount` | number | Computed | Count of currently open listings in this series |

Nested: Job Listing, Agency, Salary Range

CTAs: View series, Browse series listings, Follow series

---

**LOCATION**

| Attribute | Type | Source | Notes |
|---|---|---|---|
| `city` | string | API | |
| `state` | string | API | Two-letter state code + full name |
| `country` | string | API | For international postings |
| `region` | string | Computed | e.g. "Mid-Atlantic", "Pacific Northwest" |
| `remoteEligible` | boolean | Computed | Any listings at this location flagged telework-eligible? |
| `activeListingCount` | number | Computed | Count of currently open listings here |
| `coordinates` | string | Computed | Lat/long for map display |

Nested: Job Listing

CTAs: View location, Browse location listings

---

**SALARY RANGE**

| Attribute | Type | Source | Notes |
|---|---|---|---|
| `minimumSalary` | number | API | Annual or hourly floor |
| `maximumSalary` | number | API | Annual or hourly ceiling |
| `salaryType` | enum | API | Per year / Per hour |
| `payScale` | enum | API | GS / WG / SES / FWS / other |
| `payPlan` | string | API | Specific pay plan code |
| `minimumGrade` | string | API | Lowest grade in this range |
| `maximumGrade` | string | API | Highest grade in this range |
| `stepRange` | string | API | GS step range, e.g. "Step 1–10" |

Nested: none (leaf object)

CTAs: View salary range, Browse listings in range

---

**QUALIFICATION** (nested in Job Listing)

| Attribute | Type | Source | Notes |
|---|---|---|---|
| `title` | string | API | e.g. "Specialized Experience", "Education" |
| `gradeLevel` | string | API | Which grade this qualification applies to |
| `experienceDescription` | text | API | The actual experience requirement text |
| `educationAlternative` | boolean | API | Can education substitute for experience? |
| `educationDescription` | text | API | Education substitution details if applicable |

---

## Relationships at a Glance

```
Job Listing  →  Agency                (many-to-one)
Job Listing  →  Occupational Series   (many-to-one)
Job Listing  →  Location              (many-to-many, one listing can span multiple locations)
Job Listing  →  Salary Range          (many-to-one)
Job Listing  ⊃  Qualification         (nested — one listing has 1–many qualifications)
Agency       →  Job Listing           (one-to-many)
Agency       →  Location              (one-to-many)
Agency       →  Occupational Series   (many-to-many)
Occ. Series  →  Job Listing           (one-to-many)
Occ. Series  →  Agency                (many-to-many)
Occ. Series  →  Salary Range          (one-to-many)
Location     →  Job Listing           (one-to-many)
```

## Promoted to Object

None. No attributes were elevated to full object status during this step.

## Notes

- `hiringPaths` on Job Listing is an array referencing the deferred Hiring Path phantom object. Model as string array for v1.
- `missionSummary`, `websiteUrl`, and `logoUrl` on Agency are manually curated — not in the USAJobs API. Will require a supplemental data source or editorial input.
- `coordinates` on Location is computed from city/state — not in the API directly.
- `activeListingCount` on Agency, Occupational Series, and Location are computed from the search API at query time.
- Federal pay complexity (locality pay, special rates, SES bands) excluded from Salary Range for v1.
