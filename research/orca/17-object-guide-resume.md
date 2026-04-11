# Object Guide: Resume

**Definition**
A document a job seeker creates or uploads to submit with federal job applications.

**TL;DR**
Resume is a content object owned by the job seeker. It is created once and reused across multiple applications. Job seekers manage it independently of any specific listing.

---

## SIP Validation

| Test | Pass | Evidence |
| --- | --- | --- |
| Structure | yes | title, format, fileUrl, content, isSearchable, fileSize, dateCreated, dateModified |
| Instances | yes | "My Federal Resume 2024"; uploaded PDF; builder-created resume |
| Purpose | yes | Job seekers create and store resumes to attach to job applications |

**Verdict:** Valid object. Standalone lifecycle, distinct from Application, reused across multiple submissions.

---

## Attributes

| Name | Type | Required | Source | Description | Example |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | user | User-defined name for the resume | My Federal Resume 2024 |
| `format` | enum | yes | system | How the resume was created | uploaded |
| `fileUrl` | string | no | system | URL to the uploaded file. Present when format is uploaded. | |
| `content` | text | no | system | Structured content when created via the builder. Present when format is built. | |
| `isSearchable` | boolean | yes | user | Whether agency recruiters can find this resume in profile search | false |
| `fileSize` | number | no | system | File size in bytes. Present when format is uploaded. | |
| `dateCreated` | date | yes | system | Date the resume was added | |
| `dateModified` | date | yes | system | Date the resume was last edited or replaced | |

### Enumerations

**`format`**
- `uploaded` — resume was added as a file upload
- `built` — resume was created using the USAJobs resume builder

---

## Actions

| Name | Priority | Roles | Permission | Description |
| --- | --- | --- | --- | --- |
| Add resume | P | authenticated-job-seeker | write | Uploads a file or opens the resume builder to create a new resume |
| Edit resume | S | authenticated-job-seeker | write | Modifies a built resume or replaces an uploaded file |
| Make searchable | S | authenticated-job-seeker | write | Makes the resume visible to agency recruiters searching profiles |
| Download resume | T | authenticated-job-seeker | read | Downloads a copy of the resume file |
| Delete resume | T | authenticated-job-seeker | write | Permanently removes the resume from the account |

---

## Relationships

### Application

**Mechanics:** Manual. The job seeker selects a resume from their account when submitting an Application. The resume is attached at submission time and the association is fixed after that point.
**Cardinality:** One-to-many. One Resume may be attached to many Applications. A job seeker may reuse the same resume across multiple submissions.
**Sorts:** Default: submittedDate descending.
**Filters:** Application status.
**Dependencies:** A Resume attached to an open Application cannot be deleted. Once all associated Applications are closed, the Resume may be removed without cascade.

---

## Views

### List view

**Context:** A job seeker viewing their saved resumes.
**User intent:** Manage their resumes and select one to attach to an application.

| Element | Value |
| --- | --- |
| Visible attributes | title, format, isSearchable, dateModified |
| Available actions | Add resume, Edit resume, Make searchable, Delete resume |

### Detail view

**Context:** A job seeker reviewing a specific resume.
**User intent:** Review content, update searchability, or download a copy.

**Visible attributes:** title, format, isSearchable, fileSize, dateCreated, dateModified
**Available actions:** Edit resume, Make searchable, Download resume, Delete resume

---

## User Stories

| Title | Role | Action | Benefit | When | Then |
| --- | --- | --- | --- | --- | --- |
| Job seeker uploads a resume to use across applications | authenticated-job-seeker | adds | avoids re-uploading the same document for every application | has a resume file ready | can select it when applying to any listing |

---

## Business Rules

- **Multiple resumes allowed:** A job seeker may have up to five resumes on their account.
- **Deletion blocked on open applications:** A resume attached to an open Application cannot be deleted until the Application closes.
- **isSearchable defaults to false:** The job seeker must explicitly opt in to recruiter search.
- **fileUrl and content are mutually exclusive:** An uploaded resume has a fileUrl. A built resume has content.
- **fileSize is upload-only:** The builder does not produce a stored file until the job seeker downloads it.

---

## Lifecycle

### States

| State | Description | Trigger |
| --- | --- | --- |
| Draft | Resume is incomplete or not yet marked searchable | Created but isSearchable is false |
| Searchable | Resume is visible to agency recruiters | Job seeker sets isSearchable to true |
| Archived | Resume is no longer active but retained for application history | Job seeker deletes or replaces it |

### Transitions

| From | To |
| --- | --- |
| Draft | Searchable |
| Searchable | Draft |
| Draft | Archived |
| Searchable | Archived |
