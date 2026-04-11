import type { UsajobsJobSummary } from "@/api/usajobs/search";
import { usajobsSearchResultsUrl } from "@/api/usajobs/search";

/** Example rows matching Figma when the Search API returns no jobs (offline / preview). */
export function agencyLatestJobsFallback(organizationCode: string | undefined): UsajobsJobSummary[] {
  const uri = organizationCode
    ? usajobsSearchResultsUrl(organizationCode)
    : "https://www.usajobs.gov/";
  const row = (): UsajobsJobSummary => ({
    positionTitle: "Senior Policy Analyst",
    locationDisplay: "Washington, D.C.",
    gradeLabel: "GS-13",
    salaryLabel: "$94,000 - $122,000",
    statusLabel: "Open",
    closesLabel: "Closes Jan 15",
    positionUri: uri,
  });
  return [row(), row()];
}
