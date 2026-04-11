# MCSFD: Application Relationships

---

## Application → Job Listing

**Mechanics:** Automatic. The Application is created against a specific Job Listing. The reference is set at submission and does not change.
**Cardinality:** Many-to-one. Many Applications may exist for one Job Listing across all job seekers. One Application belongs to exactly one Job Listing.
**Sorts:** Default: submittedDate descending.
**Filters:** Status.
**Dependencies:** Required. An Application cannot exist without a Job Listing reference. If the Job Listing is removed from the API, the Application retains the reference but the listing renders in a degraded state (announcement number and title shown; live data unavailable).

---

## Application → Resume

**Mechanics:** Manual. The job seeker selects a resume at submission time. The reference is fixed after submission.
**Cardinality:** Many-to-one. Many Applications may reference one Resume. One Application references at most one Resume.
**Sorts:** Not applicable.
**Filters:** Not applicable.
**Dependencies:** Optional. An Application can exist without a Resume reference if the job seeker uploaded documents directly through the external application system.
