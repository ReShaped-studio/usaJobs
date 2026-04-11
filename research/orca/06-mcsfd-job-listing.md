---
step: 06-mcsfd-spec-writer
object: job-listing
project: Reshaped — USAJobs
date: 2026-04-09
status: confirmed
---

# MCSFD Relationship Specs: Job Listing

## Relationships Covered

1. Job Listing ↔ Agency
2. Job Listing ↔ Occupational Series
3. Job Listing ↔ Location
4. Job Listing ↔ Salary Range

## Specs

---

**Job Listing ↔ Agency**

| Lens | Specification |
|---|---|
| **Mechanics** | Automatic. Agency code on the listing maps to the Agency object via the API. Set when the listing is published. Read-only from the redesign side. |
| **Cardinality** | Many-to-one. One Agency has many Job Listings. One listing belongs to one agency. Large agencies (DoD, VA) have thousands of active listings. |
| **Sorts** | Default: openDate descending. User options: closeDate ascending (urgency), grade/salary descending. |
| **Filters** | Series, location, grade, appointment type, work schedule, telework eligibility. |
| **Dependency** | Required. A listing cannot exist without an agency. If agency data is unavailable, listing renders in degraded state (name only, no logo or description). No cascade — orphaned listings are not deleted. |

---

**Job Listing ↔ Occupational Series**

| Lens | Specification |
|---|---|
| **Mechanics** | Automatic. Series code on the listing maps to the Occupational Series object via the API. |
| **Cardinality** | Many-to-one. One Occupational Series has many Job Listings. One listing belongs to one series. Popular series (2210 IT Specialist) may have thousands of active listings. |
| **Sorts** | Default: openDate descending. User options: salary descending, grade descending, closeDate ascending. |
| **Filters** | Agency, location, grade, appointment type, telework eligibility. |
| **Dependency** | Required. A listing must have a valid series code. |

---

**Job Listing ↔ Location**

| Lens | Specification |
|---|---|
| **Mechanics** | Automatic. One or more location records on the listing map to Location objects via the API. |
| **Cardinality** | Many-to-many. One Location has many Job Listings. One listing can be at multiple Locations. Most listings have 1–3 locations; nationwide listings may carry dozens. |
| **Sorts** | Default on Location page: openDate descending. User options: salary descending, grade descending, series alphabetical. |
| **Filters** | Series, agency, grade, appointment type, telework eligibility. |
| **Dependency** | Required, unless teleworkEligible is true. A fully remote listing may have no physical location. No cascade — if location data changes, listings retain their recorded location values. |

---

**Job Listing ↔ Salary Range**

| Lens | Specification |
|---|---|
| **Mechanics** | Automatic. Grade and pay scale on the listing map to the Salary Range object via the API. |
| **Cardinality** | Many-to-one. One Salary Range covers many Job Listings. One listing has one Salary Range. |
| **Sorts** | On Salary Range page: openDate descending. User options: grade descending, series alphabetical. |
| **Filters** | Series, agency, location. |
| **Dependency** | Required. A listing must have salary information. |

## Notes

- All relationships are read-only from the redesign side. No relationship is created or modified by user action.
- Location dependency has a special case: teleworkEligible = true exempts a listing from requiring a physical location.
- Agency degraded state (name only) should be designed explicitly — it will occur when the API returns a code with no matching Agency record.
