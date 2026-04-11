# Object Guide: Application

**Definition**
A job seeker's submission for a specific federal job listing.

**TL;DR**
Application is an activity object. It is created when a job seeker submits for a listing and tracks status through the agency's review process. It is the record of a job seeker's attempt to get a specific position.

---

## SIP Validation

| Test | Pass | Evidence |
| --- | --- | --- |
| Structure | yes | jobListing, announcementNumber, status, submittedDate, lastUpdatedDate, resume, documents |
| Instances | yes | Application to Program Analyst at DoD; Application to IT Specialist at VA |
| Purpose | yes | Job seekers track the status and history of their submitted applications |

**Verdict:** Valid object. Distinct activity object with multiple states and a clear tracking purpose.

---

## Attributes

| Name | Type | Required | Source | Description | Example |
| --- | --- | --- | --- | --- | --- |
| `jobListing` | reference | yes | system | The Job Listing this application was submitted for | |
| `announcementNumber` | string | yes | API | Agency-assigned announcement number | 4R-ARTE-12930631-239252-JHM |
| `status` | enum | yes | API | Current status of the application | Received |
| `submittedDate` | datetime | yes | system | Date and time the application was submitted | |
| `lastUpdatedDate` | datetime | yes | system | Date and time the status was last updated | |
| `resume` | reference | no | user | The resume submitted with this application | |
| `documents` | string | no | user | Supporting documents submitted. Delimited list in v1. | |

### Enumerations

**`status`**
- `Received` — application submitted and acknowledged
- `Reviewed` — agency has reviewed the application
- `Referred` — application referred to the hiring manager
- `Selected` — job seeker was selected for the position
- `Not selected` — job seeker was not selected
- `Withdrawn` — job seeker withdrew the application

---

## Actions

| Name | Priority | Roles | Permission | Description |
| --- | --- | --- | --- | --- |
| View application status | P | authenticated-job-seeker | read | Returns to the application to check its current status |
| Withdraw application | S | authenticated-job-seeker | write | Removes the application from agency consideration |
| View listing | T | authenticated-job-seeker | read | Navigates to the Job Listing this application was submitted for |

### Cross-object actions

| Action | Leads to | Description |
| --- | --- | --- |
| View listing | Job Listing (`job-listing`) | Navigates to the listing detail page for this application |

---

## Relationships

### Job Listing

**Mechanics:** Automatic. The Application is created against a specific Job Listing. The reference is set at submission and does not change.
**Cardinality:** Many-to-one. Many Applications may exist for one Job Listing across all job seekers. One Application belongs to exactly one Job Listing.
**Sorts:** Default: submittedDate descending.
**Filters:** Status.
**Dependencies:** Required. An Application cannot exist without a Job Listing reference. If the Job Listing is removed from the API, the Application retains the reference but the listing renders in a degraded state.

### Resume

**Mechanics:** Manual. The job seeker selects a resume at submission time. The reference is fixed after submission.
**Cardinality:** Many-to-one. Many Applications may reference one Resume. One Application references at most one Resume.
**Sorts:** Not applicable.
**Filters:** Not applicable.
**Dependencies:** Optional. An Application can exist without a Resume reference if the job seeker uploaded documents directly through the external application system.

---

## Views

### List view

**Context:** A job seeker viewing their application history.
**User intent:** Track the status of all submitted applications at a glance.

| Element | Value |
| --- | --- |
| Visible attributes | jobListing (title, agency), status, submittedDate, lastUpdatedDate |
| Available actions | View application status, Withdraw application |

### Detail view

**Context:** A job seeker reviewing a specific application.
**User intent:** Check current status and review what was submitted.

**Visible attributes:** jobListing, announcementNumber, status, submittedDate, lastUpdatedDate, resume, documents
**Available actions:** View application status, Withdraw application, View listing

---

## User Stories

| Title | Role | Action | Benefit | When | Then |
| --- | --- | --- | --- | --- | --- |
| Job seeker checks the status of a submitted application | authenticated-job-seeker | views | knows where they stand in the hiring process without contacting the agency | has submitted an application and is waiting to hear back | sees the current status and when it was last updated |

---

## Business Rules

- **Status is agency-reported:** Status values come from the agency via API. Not all agencies update status consistently. An Application may remain at Received indefinitely.
- **Withdrawal is permanent:** A Withdrawn application cannot be reinstated. The job seeker must start a new application if the listing is still open.
- **Application form is external:** The application is submitted through an external system (e.g., USA Staffing). USAJobs displays status only and does not host the application form.
- **Listing reference persists after closing:** An Application retains its Job Listing reference after the listing closes or is removed from the API.

---

## Lifecycle

### States

| State | Description | Trigger |
| --- | --- | --- |
| Received | Application submitted and acknowledged | Job seeker completes submission |
| Reviewed | Agency has reviewed the application | Agency updates status |
| Referred | Application referred to hiring manager | Agency updates status |
| Selected | Job seeker was selected | Agency updates status |
| Not selected | Job seeker was not selected | Agency updates status |
| Withdrawn | Job seeker withdrew the application | Job seeker triggers withdrawal |

### Transitions

| From | To |
| --- | --- |
| Received | Reviewed, Withdrawn |
| Reviewed | Referred, Not selected, Withdrawn |
| Referred | Selected, Not selected, Withdrawn |
| Selected | — |
| Not selected | — |
| Withdrawn | — |
