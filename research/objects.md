# Objects in Scope

The objects used in this redesign, drawn from the [Objects library](https://github.com/reshaped-studio/objects/objects/employment/).

## Objects

| Object | Library entry | Status |
|---|---|---|
| Job Listing | [employment/job-listing](https://github.com/reshaped-studio/objects/objects/employment/job-listing/) | Defined |
| Agency | [employment/agency](https://github.com/reshaped-studio/objects/objects/employment/agency/) | Defined |
| Occupational Series | [employment/occupational-series](https://github.com/reshaped-studio/objects/objects/employment/occupational-series/) | Defined |
| Location | [employment/location](https://github.com/reshaped-studio/objects/objects/employment/location/) | Defined |
| Salary Range | [employment/salary-range](https://github.com/reshaped-studio/objects/objects/employment/salary-range/) | Defined |
| Hiring Path | [employment/hiring-path](https://github.com/reshaped-studio/objects/objects/employment/hiring-path/) | Defined |

## Nested objects

| Object | Nested on | Notes |
|---|---|---|
| Qualification | Job Listing | Existentially dependent on Job Listing. Modeled as nested in v1. Promote to standalone if cross-listing qualification comparison becomes a requirement. |

## Notes

Object definitions are the source of truth for what attributes and actions exist in the redesign. Do not design views for attributes that are not defined in an object.
