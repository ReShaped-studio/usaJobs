# MCSFD: Location Relationships

---

## Location → Job Listing

**Mechanics:** Automatic. Job Listings carry one or more location records that map to this Location object. A listing with multiple duty stations creates associations with multiple Location objects.
**Cardinality:** One-to-many. One Location has many Job Listings. High-density locations such as Washington DC may have thousands of active listings at any time.
**Sorts:** Default: openDate descending. Options: salary descending, grade descending, series alphabetical.
**Filters:** Series, agency, grade, appointment type, telework eligibility.
**Dependencies:** Optional for Location. A Location can exist with zero active listings. Removing a listing does not affect the Location object.
