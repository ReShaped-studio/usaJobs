---
step: 03-cta-matrix-builder
project: Reshaped — USAJobs
date: 2026-04-09
status: confirmed
---

# CTA Matrix: USAJobs

## Objects Covered

1. Job Listing
2. Agency
3. Occupational Series
4. Location
5. Salary Range

## System Constraint

This redesign is read-only. No POST back to USAJobs or agency systems. Apply is an external handoff (link to agency application), not a submission. Create, Update, and Delete are out of scope for all objects from the user side.

## CTA Matrix

| Object | CTA | Actor | Permission | Cross-object? | Notes |
|---|---|---|---|---|---|
| Job Listing | View listing | Job seeker | Read | | |
| Job Listing | Apply | Job seeker | Read | ✓ → Agency system | External handoff. Links to agency application. Not a POST. |
| Job Listing | Save listing | Job seeker | Read | | Implies state persistence — local or light backend |
| Job Listing | Share listing | Job seeker | Read | | Shareable URL |
| Job Listing | Print / export listing | Job seeker | Read | | |
| Job Listing | View similar listings | Job seeker | Read | ✓ → Job Listing | Filtered navigation |
| Job Listing | Check eligibility | Job seeker | Read | ✓ → Hiring Path | Surfaces whether hiring path matches — relates to deferred Hiring Path phantom object |
| Agency | View agency | Job seeker | Read | | |
| Agency | Browse agency listings | Job seeker | Read | ✓ → Job Listing | From NOM: Job Listings nest in Agency |
| Agency | Follow agency | Job seeker | Read | | Notification trigger — implies state persistence or saved search |
| Agency | Share agency page | Job seeker | Read | | |
| Occupational Series | View series | Job seeker | Read | | |
| Occupational Series | Browse series listings | Job seeker | Read | ✓ → Job Listing | From NOM |
| Occupational Series | Follow series | Job seeker | Read | | Notification trigger |
| Location | View location | Job seeker | Read | | |
| Location | Browse location listings | Job seeker | Read | ✓ → Job Listing | From NOM |
| Salary Range | View salary range | Job seeker | Read | | |
| Salary Range | Browse listings in range | Job seeker | Read | ✓ → Job Listing | |

## Cross-Object CTA Summary

| CTA | Source Object | Target Object |
|---|---|---|
| Apply | Job Listing | Agency system (external) |
| View similar listings | Job Listing | Job Listing |
| Check eligibility | Job Listing | Hiring Path (deferred) |
| Browse agency listings | Agency | Job Listing |
| Browse series listings | Occupational Series | Job Listing |
| Browse location listings | Location | Job Listing |
| Browse listings in range | Salary Range | Job Listing |

## Broken Objects Review

No broken objects. Every object has at least View + one navigation CTA. Salary Range has the fewest CTAs (View + Browse listings in range) but this is intentional — it is a leaf object.

## Notes

- Follow Agency and Follow Series imply a notification/subscription system. Treat as saved searches (browser-side or light backend) rather than a full account system for v1.
- Check eligibility touches the deferred Hiring Path object. Include as a CTA on Job Listing; defer the full Hiring Path object definition to v2.
- Apply is the primary action on Job Listing. It is a handoff, not a form submission. The redesign cannot accept applications.
