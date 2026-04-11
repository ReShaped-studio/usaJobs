# Object Guide: Saved Job

**Definition**
A Job Listing bookmarked by a job seeker for later review or application.

**TL;DR**
Saved Job is a thin activity object. It exists to let a job seeker mark a listing without committing to applying. Its primary state change is from Saved to Applied or Expired.

---

## SIP Validation

| Test | Pass | Evidence |
| --- | --- | --- |
| Structure | yes | jobListing, savedDate, status |
| Instances | yes | Saved listing for Program Analyst at DoD; saved listing for IT Specialist at VA |
| Purpose | yes | Job seekers save listings they want to return to before the close date |

**Verdict:** Valid object. Thin but warranted. Has its own state and actions distinct from Job Listing.

---

## Attributes

| Name | Type | Required | Source | Description | Example |
| --- | --- | --- | --- | --- | --- |
| `jobListing` | reference | yes | system | The Job Listing that was saved | |
| `savedDate` | datetime | yes | system | Date and time the job was saved | |
| `status` | enum | yes | system | Current state of the saved job | Saved |

### Enumerations

**`status`**
- `Saved` — listing is bookmarked and still open
- `Applied` — job seeker has submitted an application for this listing
- `Expired` — the listing has closed

---

## Actions

| Name | Priority | Roles | Permission | Description |
| --- | --- | --- | --- | --- |
| Apply | P | authenticated-job-seeker | read | Navigates to the Job Listing to begin the application |
| Remove saved job | S | authenticated-job-seeker | write | Removes the listing from the saved jobs list |
| View listing | T | authenticated-job-seeker | read | Navigates to the Job Listing detail page |

### Cross-object actions

| Action | Leads to | Description |
| --- | --- | --- |
| Apply | Job Listing (`job-listing`) | Navigates to the listing to initiate the application flow |
| View listing | Job Listing (`job-listing`) | Navigates to the listing detail page |

---

## Relationships

### Job Listing

**Mechanics:** Automatic. The Saved Job is created when a job seeker bookmarks a Job Listing. The reference is set at save time and does not change.
**Cardinality:** Many-to-one. Many Saved Jobs may reference one Job Listing across all job seekers. One Saved Job belongs to exactly one Job Listing.
**Sorts:** Default: savedDate descending. Options: closeDate ascending.
**Filters:** Status.
**Dependencies:** Required. A Saved Job cannot exist without a Job Listing reference. If the Job Listing closes or is removed, the Saved Job is retained but transitions to Expired and the Apply action is disabled.

---

## Views

### List view

**Context:** A job seeker viewing their saved jobs.
**User intent:** Review bookmarked listings and decide which to apply for before they close.

| Element | Value |
| --- | --- |
| Visible attributes | jobListing (title, agency, location, salary, closeDate), savedDate, status |
| Available actions | Apply, Remove saved job, View listing |

---

## User Stories

| Title | Role | Action | Benefit | When | Then |
| --- | --- | --- | --- | --- | --- |
| Job seeker returns to a saved listing to apply | authenticated-job-seeker | applies | completes an application for a listing they flagged earlier | has saved a listing and is ready to apply | navigates directly to the listing and begins the application |

---

## Business Rules

- **One save per listing:** A job seeker may only save a given listing once. Saving an already-saved listing has no effect.
- **Expired on close:** Status transitions to Expired automatically when the Job Listing closes. The Apply action is disabled.
- **Applied on submission:** Status transitions to Applied when the job seeker submits an Application for the referenced listing.
- **Removal has no cascade:** Removing a Saved Job does not affect the Job Listing or any associated Application.

---

## Lifecycle

### States

| State | Description | Trigger |
| --- | --- | --- |
| Saved | Listing is bookmarked and still open | Job seeker saves the listing |
| Applied | Job seeker has submitted an application for this listing | Application submitted |
| Expired | The listing has closed | Job Listing close date passes |

### Transitions

| From | To |
| --- | --- |
| Saved | Applied |
| Saved | Expired |
| Applied | Expired |
