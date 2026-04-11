# MCSFD: Hiring Path Relationships

---

## Hiring Path → Job Listing

**Mechanics:** Automatic. Job Listings carry one or more hiring path codes that map to this Hiring Path object. No manual curation required.
**Cardinality:** Many-to-many. One Hiring Path applies to many Job Listings. One Job Listing carries multiple Hiring Paths.
**Sorts:** Default: openDate descending. Options: closeDate ascending, grade descending, salary descending.
**Filters:** Agency, series, location, grade, appointment type, work schedule.
**Dependencies:** Optional for Hiring Path. A Hiring Path can exist with zero active listings. Removing a listing does not affect the Hiring Path object.
