# USAJobs Interface Audit

A structured review of the existing USAJobs.gov interface. The goal is to document what exists, where information is present or absent, what actions are available, and where friction occurs. Notes flag anything that would directly fail the Inclusive tenet.

## Scope

- Homepage
- Job search and results
- Job listing detail
- Agency
- Account and saved jobs

## Method

Direct observation via browser. Accessibility tree capture of each page region. Observations are grouped by surface, not by severity. Severity flags are noted inline where relevant.

---

## Homepage

**URL:** https://www.usajobs.gov/

### What is present

**Search form**
- Keyword input ("Job title, department, or agency")
- Location input ("City, state, zip, or remote")
- "Search jobs" submit button
- Form is the primary element above the fold

**Informational sections below the fold**
- "How the hiring process works" — 4 sequential steps: Create an account, Search for jobs, Apply for jobs, Agency reviews applications
- "Explore career fields" — browseable tiles by occupation category
- "Hiring paths" — tiles linking to eligibility explanations (Veterans, Students, Federal employees, etc.)
- "Federal events" — upcoming recruitment events

**Navigation**
- Primary nav: Search, Career Paths (dropdown), Help Center, Sign in / Create account
- No visible breadcrumb or back navigation on the homepage

### Observations

- The search form does not expose filtering options (department, grade, work schedule) at the point of entry. Users must run a keyword search first before filters appear.
- The "How the hiring process works" section describes the application process at a high level but does not explain federal-specific concepts (GS grades, hiring paths, series codes) that affect whether a user qualifies.
- "Hiring paths" are presented as a discovery entry point but are not linked to filtered search results from the homepage. A user who knows they are a veteran cannot go directly from the homepage to veteran-eligible listings.
- The location field accepts a broad range of inputs but the interface does not indicate that "remote" is a valid input alongside a city or zip code.

---

## Search

**URL pattern:** https://www.usajobs.gov/Search/Results?k={keyword}&l={location}&p={page}

### What is present

**Search bar (top of page)**
- Keyword and location fields are persistent at the top of results
- "Search jobs" resubmit button

**Results bar**
- Total result count ("1-25 of 327 jobs")
- "Remove all filters" button (visible when filters are active)
- "Filters" button (mobile: opens filter panel as overlay)
- Sort control: Recently posted, Closing soon, Highest salary
- "Turn on job alert" CTA: creates an email subscription for the current search

**Result cards** (one per listing)

Each card displays:
| Element | Notes |
|---|---|
| Job title | Linked to detail page. Shown as heading. No series code visible on card. |
| Save job button | Heart icon. Requires sign-in; prompts sign-in if not authenticated. |
| Sub-element name | The specific office or unit within the agency (e.g., "Veterans Health Administration"). Present on most but not all cards. |
| Department name | Parent department (e.g., "Department of Veterans Affairs"). Always present. |
| Location | City and state. Single location shown even if listing covers multiple locations. |
| Salary | "Starting at $X Per year (GS N)" or grade range (e.g., "GS 7-9"). Uses "Starting at" for single grades. |
| Work type | Appointment type + schedule (e.g., "Permanent • Full-time"). Separator is a bullet. Some listings show specific hours instead of "Full-time". |
| Hiring path icons | Icon row with alt text per path. No labels visible — icons only. Between 1 and 7 icons per card. |
| Open/close dates | "Open {date} to {date}". No visual indicator for listings closing within 24-48 hours. |

**Filter sidebar** (right column on desktop; overlay on mobile)

Filters available:
| Filter | Input type | Notes |
|---|---|---|
| Remote | Radio toggle | "Show all" vs. "Remote only" |
| Appointment type | Checkboxes | Permanent, Temporary, Term, Internship/Recent Graduates |
| Department and agency | Tabbed checkboxes with text search | Two tabs: Department and Agency. "Show options with 0 jobs" toggle. Hundreds of options. |
| Hiring path | Checkboxes | Open to the public, Federal employees, Veterans, Students, etc. |
| Location | Distance slider + radius text input | 0–200 mi radius. Requires a location to be set on the search. |
| Pay | Text input for minimum salary OR grade selects | Min/max grade dropdowns: < GS 1 through > GS 15. Grade and dollar salary are separate inputs. |
| Security clearance | Checkboxes | None through Top Secret/SCI |
| Series | Text search + checkboxes | Full list of OPM series codes with listing counts. |
| Travel percentage | Checkboxes | Not required, 25%, 50%, 75%, 100% |
| Work schedule | Checkboxes | Full-time, Part-time, Shift work, Intermittent, Job share, Multiple schedules |

**Sidebar secondary content**
- "What you can do next": links to Upload resume, Build resume, Make resume searchable, Answer military service questions
- This content appears for unauthenticated users; likely replaced by saved-search content when signed in

**Pagination**
- Page number buttons (1–5, ..., last page)
- "Next page" arrow button
- No "Jump to page" input

### Observations

- The hiring path icons on result cards have accessible alt text but no visible labels. A user unfamiliar with the icons cannot determine eligibility from the card alone. Seven icons on a single card is a common pattern.
- Salary is displayed as "Starting at" (minimum) rather than the full range. A listing at GS 11 Steps 1-10 would show only the step 1 value. This understates potential compensation.
- The salary filter accepts a dollar minimum OR a grade range, but not both. A user who thinks in dollar terms and a user who thinks in GS grades use different controls to express the same intent.
- The Department and Agency filter contains hundreds of options in a scrollable checkbox list. Text search is available but not prominently indicated. For unauthenticated users there is no profile-based pre-filtering.
- A listing with multiple locations shows only one location on the card. The number of locations is not indicated. A user filtering by location may dismiss a listing that covers their preferred location because a different location is shown on the card.
- Sort defaults to "Recently posted". No sort by location distance, even though a distance filter exists.
- The "job alert" CTA requires sign-in. The interface does not communicate this before a user clicks the control.
- No card-level indicator of how competitive a listing is (e.g., open to public vs. status candidates only), beyond the small icon row.

---

## Listing detail

**URL pattern:** https://www.usajobs.gov/job/{controlNumber}

**Example audited:** /job/864130100 — PROGRAM ANALYST, Dept of the Air Force, GS-11, Fort Worth TX

### What is present

**Page header**
- "Back to results" link (returns to search results page, preserving filters and position)
- Job title (heading)
- Department name and sub-element name
- Apply CTA (primary button, links to agency application system via usastaffing.gov or similar)
- Print announcement button
- Share button (email, Facebook, LinkedIn, X)
- Save job button
- Previous result / Next result navigation (browse without returning to list)

**In-page navigation**
- Anchor link list: Summary, This job is open to, Duties, Requirements, How you will be evaluated, Required documents, How to apply

**Overview panel (right rail on desktop)**

Displayed as a structured data block with label-value pairs:

| Field | Notes |
|---|---|
| Status | "Accepting applications" or closed. No visual indicator of days remaining. |
| Open/close dates | Date range with calendar icon. |
| Salary range | Full min-max range (e.g., "$81,186 – $105,547 per year"). More informative than the card. |
| Grade | Pay scale and grade (e.g., "GS 11"). |
| Location | City and state with map icon. |
| Remote job | Yes/No with agency-defined qualifier. |
| Travel | Text description (e.g., "Occasional travel"). |
| Relocation | Yes/No with agency-defined qualifier. |
| Appointment type | Permanent, Temporary, Term, etc. |
| Work schedule | Full-time, Part-time, etc. |
| Service | Competitive, Excepted, or SES. |
| Promotion potential | Present. Blank on some listings. |
| Series | OPM series code and name. Linked to a filtered search for that series. |
| Supervisory status | Present. Blank on some listings. |
| Security clearance | Clearance level, linked to help article. |
| Drug test | Yes/No |
| Position sensitivity/risk | Linked to help article. |
| Background investigation | Type. Linked to help article. |
| Financial disclosure | Present. No value shown (link to help only). |
| Bargaining unit status | Present. No value shown (link to help only). |
| Announcement number | Agency-assigned string. |
| Control number | Numeric ID used in the URL. |

**Main content sections**

| Section | Format | Notes |
|---|---|---|
| Summary | Freeform agency-authored text | No consistent structure. Length and quality vary by agency. |
| This job is open to | Cards with icon, name, and one-sentence description per hiring path | More legible than the card icons. |
| Duties | Bulleted list | Agency-authored. Preceded by a "primary purpose" sentence on some listings. |
| Requirements | Mixed: bulleted conditions of employment + long-form qualification text | Qualification text is dense. Includes multiple alternative pathways (experience, education, combination). Time-in-grade requirements embedded in body text. |
| Education | Paragraph | Present when position has a degree requirement. |
| Additional information | Expandable section | Agency-specific operational details. Often includes incentive information. |
| Benefits | Standard boilerplate | Same across all listings. Link to federal benefits help. |
| How you will be evaluated | Paragraph | Describes rating and ranking process. |
| Required documents | Mixed format | List of required and optional documents. Military service members section appears on all listings even when not relevant. |
| How to Apply | Expandable steps | Links to external application system. Deadline stated in Eastern Time. |
| Agency contact information | Name, phone, email, address | Some agencies use placeholder emails (e.g., DO.NOT.EMAIL@CALL.ONLY). |
| Next steps | Expandable paragraph | Timeline language is vague ("several weeks"). |
| Fair and transparent | Link list | 8 policy links. Same across all listings. |

**Agency modal** (triggered by "Learn more about this agency" button)
- Agency name and mission summary (manually curated, may be absent)
- Full list of eligibility codes accepted by this agency
- Agency contact information (same as main page)
- Modal dismisses with "Close this window"

### Observations

- The Overview panel on the right rail contains the most structured, scannable information on the page. However it does not render as a summary card at the top on mobile; the full Summary section appears first, requiring the user to scroll past agency-authored text to reach structured data.
- The salary range in the Overview panel shows the full min-max range, which is more useful than the "Starting at" display on the result card. The discrepancy is an inconsistency between views of the same object.
- The "This job is open to" section provides legible hiring path descriptions, but a user who does not qualify for any listed path has no clear "you are not eligible" signal. The page does not filter or warn.
- Qualification text is agency-authored and unstructured. The GS-09 prerequisite and the GS-11 target grade are both mentioned in body text without typographic hierarchy. A user cannot scan to determine the grade ladder at a glance.
- The Requirements section intermingles conditions of employment (e.g., drug test, clearance) with qualification thresholds (specialized experience, education). These serve different user questions.
- "How to apply" links out to a separate application system (usastaffing.gov or similar). The application is not hosted on USAJobs. The transition is not explained inline.
- The "Previous result / Next result" navigation allows sequential browsing without returning to the list. The current position in the result set is not shown (e.g., "3 of 25").
- The "Fair and transparent" section and the duplicated Benefits article appear on every listing. They consume significant page length for content that is identical across all listings.
- The agency modal's eligibility list contains codes such as "PPP DoD Retained Grade Preference Eligible" and "Non-AF DCIPS Interchange" without plain-language explanations. These are more granular than the hiring path cards on the main page.
- The announcement number and control number are both displayed. The control number maps to the URL. The announcement number is an agency-specific string that does not correspond to anything a job seeker would use. No explanation is given for why two IDs exist.
- Some agency contact entries use non-functional email addresses (e.g., DO.NOT.EMAIL@CALL.ONLY) as a placeholder instruction. This is confusing when rendered as a mailto link.

---

## Agency

There is no standalone agency detail page accessible from the current job seeker flow. Agency information appears in two places:

1. **Agency modal** — accessible from any job detail page via "Learn more about this agency." Contains mission summary, eligibilities, and contact info.
2. **Agency filter** — accessible from the search results sidebar. Allows filtering by department or agency.

There is no navigable agency profile page with a persistent URL. A user who wants to browse all listings from a specific agency must use the filter or search by department name.

### Observations

- The absence of a navigable agency page means agencies cannot be bookmarked, shared, or linked to directly. A user who wants to follow the National Park Service cannot do so without saving a search query.
- The modal does not show the number of open listings for the agency, nor does it link to a filtered search for that agency's listings.
- The eligibility list in the modal maps to the hiring path filter options but uses different terminology. "AF Internal Employee" in the modal corresponds to "Federal employees" in the filter. The naming is inconsistent.
- The mission summary in the modal is manually curated and absent for many sub-elements. The modal degrades to contact information only in those cases.

---

## Account

Not audited directly (requires authentication). Observations from unauthenticated state and contextual clues in the interface:

**Unauthenticated state**
- "Save job" prompts sign-in if triggered without an account
- "Turn on job alert" prompts sign-in if triggered without an account
- The filter sidebar shows a "Sign in to use your profile" prompt, indicating that profile-based pre-filtering (location preferences, hiring eligibility) is available to signed-in users
- "What you can do next" sidebar panel includes: Upload a resume, Build a resume, Make your resume searchable, Answer military service questions

**Authenticated state (inferred)**
- Saved jobs (bookmarked listings)
- Saved searches with email alerts
- Resume storage (upload or builder)
- Profile: work preferences, location preferences, hiring eligibility (military service answers feed into hiring path filtering)
- Application history

### Observations

- Multiple high-value actions (saving jobs, setting alerts, profile-based filtering) require an account but this is not communicated upfront. Users discover the requirement when they try to take the action.
- The "Make your resume searchable" feature is surfaced in the filter sidebar — a placement that seems disconnected from the task of searching for jobs.
- The resume builder is hosted within USAJobs, but the application itself transitions to an external system. Users build a resume on one platform and apply through another.

---

## Cross-cutting observations

- **Object inconsistency across surfaces:** The same Job Listing object is represented differently on the result card vs. the detail page. Salary is "Starting at $X (GS N)" on the card and "$X – $Y per year" on the detail. Location shows one city on the card with no indication of additional locations. These discrepancies create unreliable expectations between surfaces.
- **Federal jargon is untranslated in the critical path:** Terms like GS grade, series code, hiring path, and appointment type appear throughout the search and filter interface without in-context explanation. Help links are present but require navigation away from the task.
- **Hiring path legibility:** Eligibility is the primary gate between a user and a job. The current interface encodes eligibility as icon badges on cards and as a section on the detail page. Neither surface gives a user a clear yes/no answer about whether they qualify.
- **No salary range on the result card:** Users who filter by minimum salary can see the threshold they set, but the card shows only the minimum of the listing's range. A listing that spans GS 7–9 shows "Starting at $50,460" but could pay up to the GS 9 maximum. This systematically understates compensation in the browse view.
- **Multiple IDs for the same listing:** Each listing has a control number (URL), an announcement number (agency-defined), and sometimes an internal questionnaire ID. No surface explains the relationship between these identifiers.
- **Application handoff is abrupt:** The "Apply" CTA leads to an external application system with no on-page transition explanation. The application system may require a separate account or the user's USAJOBS credentials.
