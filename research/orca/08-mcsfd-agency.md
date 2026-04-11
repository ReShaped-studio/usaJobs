# MCSFD: Agency Relationships

---

## Agency → Job Listing

**Mechanics:** Automatic. Job Listings carry the agency code, which maps back to this Agency object. No manual curation required.
**Cardinality:** One-to-many. One Agency has many Job Listings. Large agencies may have thousands of active listings at any time.
**Sorts:** Default: openDate descending. Options: closeDate ascending, grade descending.
**Filters:** Series, location, grade, appointment type, work schedule, telework eligibility.
**Dependencies:** Optional for Agency. An Agency can exist with zero active listings. Removing a listing does not affect the Agency object.

---

## Agency → Occupational Series

**Mechanics:** Derived. The series codes on an Agency's active Job Listings determine which Occupational Series are associated. The relationship dissolves if the Agency posts no listings in a given series.
**Cardinality:** Many-to-many. One Agency hires across many series. One series spans many agencies.
**Sorts:** Default: activeListingCount descending.
**Filters:** Grade, appointment type.
**Dependencies:** Optional. Not structural. Dissolves automatically when no active listings exist for that series at this agency.

---

## Agency → Location

**Mechanics:** Derived. The locations on an Agency's active Job Listings determine which Location objects are associated. A physical agency presence is not sufficient — the relationship requires an active listing at that location.
**Cardinality:** One-to-many. One Agency operates in many Locations.
**Sorts:** Default: activeListingCount descending.
**Filters:** Series, grade.
**Dependencies:** Optional. Dissolves if the Agency posts no listings at a given location.
