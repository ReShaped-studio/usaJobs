import type { UsajobsJobSummary } from "@/api/usajobs/search";
import { usajobsSearchResultsUrlForSeries } from "@/api/usajobs/search";

/** Placeholder rows when the Search API returns no jobs (offline / preview). */
export function seriesLatestJobsFallback(seriesCode: string): UsajobsJobSummary[] {
  const uri = usajobsSearchResultsUrlForSeries(seriesCode);
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
