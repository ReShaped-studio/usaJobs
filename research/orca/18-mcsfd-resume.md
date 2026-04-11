# MCSFD: Resume Relationships

---

## Resume → Application

**Mechanics:** Manual. The job seeker selects a resume from their account when submitting an Application. The resume is attached at submission time and the association is fixed after that point.
**Cardinality:** One-to-many. One Resume may be attached to many Applications. A job seeker may reuse the same resume across multiple submissions.
**Sorts:** Default: submittedDate descending.
**Filters:** Application status.
**Dependencies:** A Resume attached to an open Application cannot be deleted. Once all associated Applications are closed, the Resume may be removed without cascade.
