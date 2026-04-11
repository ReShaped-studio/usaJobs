/**
 * USAJobs Search API — client calls same-origin `/api/usajobs` (Vite dev proxy → data.usajobs.gov/api/search).
 * @see https://developer.usajobs.gov/api-reference/get-api-search
 */

type UsajobsSearchJson = {
  SearchResult?: {
    SearchResultCountAll?: unknown;
    SearchResultItems?: unknown;
  };
};

type JobGradeEntry = { Code?: string };
type RemunerationEntry = {
  MinimumRange?: string;
  MaximumRange?: string;
  RateIntervalCode?: string;
};

type MatchedObjectDescriptor = {
  PositionTitle?: string;
  PositionURI?: string;
  ApplyURI?: string[];
  OrganizationName?: string;
  PositionLocationDisplay?: string;
  JobGrade?: JobGradeEntry[];
  PositionRemuneration?: RemunerationEntry[];
  ApplicationCloseDate?: string;
  UserArea?: {
    Details?: {
      LowGrade?: string;
      HighGrade?: string;
    };
  };
};

type SearchResultItem = {
  MatchedObjectDescriptor?: MatchedObjectDescriptor;
};

export async function fetchSearchResultCountAll(params: URLSearchParams): Promise<number | null> {
  params.set("ResultsPerPage", "1");
  const url = `/api/usajobs?${params.toString()}`;

  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    return null;
  }

  if (!res.ok) {
    return null;
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return null;
  }

  const n = (data as UsajobsSearchJson).SearchResult?.SearchResultCountAll;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

/** Parsed job row for agency cards (Latest jobs). */
export type UsajobsJobSummary = {
  positionTitle: string;
  organizationName?: string;
  locationDisplay: string;
  gradeLabel: string;
  salaryLabel: string;
  statusLabel: string;
  closesLabel: string;
  positionUri: string;
};

function formatUsdRange(min: string, max: string): string {
  const a = Number(min);
  const b = Number(max);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return "";
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return `${fmt(a)} - ${fmt(b)}`;
}

function formatGrade(d: MatchedObjectDescriptor): string {
  const plan = d.JobGrade?.[0]?.Code?.trim();
  const low = d.UserArea?.Details?.LowGrade?.trim();
  const high = d.UserArea?.Details?.HighGrade?.trim();
  if (plan && low && high) {
    if (low === high) return `${plan}-${low}`;
    return `${plan}-${low}/${high}`;
  }
  if (plan && low) return `${plan}-${low}`;
  const codes = d.JobGrade?.map((g) => g.Code).filter(Boolean);
  if (codes?.length) return codes.join(", ");
  return "";
}

function formatCloses(iso: string | undefined): string {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const d = new Date(t);
  return `Closes ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

function mapDescriptorToSummary(d: MatchedObjectDescriptor): UsajobsJobSummary | null {
  const positionTitle = d.PositionTitle?.trim();
  const positionUri =
    d.PositionURI?.trim() ?? d.ApplyURI?.find((u) => typeof u === "string" && u.trim())?.trim() ?? "";
  if (!positionTitle || !positionUri) return null;

  const rem = d.PositionRemuneration?.[0];
  let salaryLabel = "";
  if (rem?.MinimumRange != null && rem?.MaximumRange != null) {
    salaryLabel = formatUsdRange(String(rem.MinimumRange), String(rem.MaximumRange));
  }

  const org = d.OrganizationName?.trim();
  return {
    positionTitle,
    ...(org ? { organizationName: org } : {}),
    locationDisplay: d.PositionLocationDisplay?.trim() ?? "",
    gradeLabel: formatGrade(d),
    salaryLabel,
    statusLabel: "Open",
    closesLabel: formatCloses(d.ApplicationCloseDate),
    positionUri,
  };
}

async function fetchSearchJobsWithParams(
  searchParams: Record<string, string>,
  limit: number,
): Promise<UsajobsJobSummary[] | null> {
  const params = new URLSearchParams({
    ...searchParams,
    ResultsPerPage: String(Math.min(Math.max(limit, 1), 25)),
    SortField: "opendate",
    SortDirection: "desc",
    Fields: "Full",
  });
  const url = `/api/usajobs?${params.toString()}`;

  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    return null;
  }

  if (!res.ok) {
    return null;
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    return null;
  }

  const items = (data as UsajobsSearchJson).SearchResult?.SearchResultItems;
  if (!Array.isArray(items)) {
    return null;
  }

  const out: UsajobsJobSummary[] = [];
  for (const raw of items) {
    const d = (raw as SearchResultItem).MatchedObjectDescriptor;
    if (!d) continue;
    const row = mapDescriptorToSummary(d);
    if (row) out.push(row);
    if (out.length >= limit) break;
  }

  return out;
}

/**
 * Fetch up to `limit` jobs for an agency (subelement code). Sorted by open date descending.
 */
export async function fetchSearchJobs(
  organizationCode: string,
  limit: number,
): Promise<UsajobsJobSummary[] | null> {
  return fetchSearchJobsWithParams({ Organization: organizationCode }, limit);
}

/**
 * Fetch up to `limit` jobs for an occupational series (JobCategoryCode). Sorted by open date descending.
 */
export async function fetchSearchJobsBySeriesCode(
  seriesCode: string,
  limit: number,
): Promise<UsajobsJobSummary[] | null> {
  return fetchSearchJobsWithParams({ JobCategoryCode: seriesCode.padStart(4, "0") }, limit);
}

/** USAJobs web search results filtered by agency subelement code. */
export function usajobsSearchResultsUrl(organizationCode: string): string {
  const p = new URLSearchParams({ search: "0", org: organizationCode });
  return `https://www.usajobs.gov/Search/Results?${p.toString()}`;
}

/** USAJobs web search filtered by occupational series (4-digit JobCategoryCode). */
export function usajobsSearchResultsUrlForSeries(seriesCode: string): string {
  const jc = seriesCode.padStart(4, "0");
  const p = new URLSearchParams({ search: "0", JobCategoryCode: jc });
  return `https://www.usajobs.gov/Search/Results?${p.toString()}`;
}
