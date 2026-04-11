# MCSFD: Occupational Series Relationships

---

## Occupational Series → Job Listing

**Mechanics:** Automatic. Job Listings carry a series code that maps to this Occupational Series object. No manual curation required.
**Cardinality:** One-to-many. One Occupational Series has many Job Listings. Popular series such as 2210 may have thousands of active listings across agencies.
**Sorts:** Default: openDate descending. Options: salary descending, grade descending, closeDate ascending.
**Filters:** Agency, location, grade, appointment type, telework eligibility.
**Dependencies:** Optional for Occupational Series. A series can exist with zero active listings. Removing a listing does not affect the series object.

---

## Occupational Series → Agency

**Mechanics:** Derived. The agencies posting listings in this series determine the association. The relationship dissolves if an agency posts no listings in this series.
**Cardinality:** Many-to-many. One series spans many agencies. One agency hires across many series.
**Sorts:** Default: activeListingCount descending.
**Filters:** Location, grade.
**Dependencies:** Optional. Not structural. Dissolves automatically when no active listings exist for this series at that agency.

---

## Occupational Series → Salary Range

**Mechanics:** Derived. The grade range of active listings in this series determines the associated Salary Ranges. Linked through active listings, not directly to the series definition.
**Cardinality:** One-to-many. One series spans multiple grade levels, each with a corresponding Salary Range.
**Sorts:** Default: grade ascending.
**Filters:** Pay scale.
**Dependencies:** Optional. Dissolves if no active listings exist in this series at a given grade.
