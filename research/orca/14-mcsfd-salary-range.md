# MCSFD: Salary Range Relationships

---

## Salary Range → Job Listing

**Mechanics:** Automatic. Grade and pay scale on a Job Listing map to this Salary Range object.
**Cardinality:** One-to-many. One Salary Range covers many Job Listings at the same grade and pay scale.
**Sorts:** Default: openDate descending. Options: grade descending, series alphabetical.
**Filters:** Series, agency, location.
**Dependencies:** Optional for Salary Range. A range can exist with zero active listings.

---

## Salary Range → Occupational Series

**Mechanics:** Derived. The grade range of an Occupational Series implies associated Salary Ranges. Linked through active listings, not directly between the two objects.
**Cardinality:** Many-to-many. One series spans multiple grades and thus multiple ranges. One range may apply to many series.
**Sorts:** Default: seriesCode ascending.
**Filters:** Pay scale.
**Dependencies:** Optional. Informational, not structural.
