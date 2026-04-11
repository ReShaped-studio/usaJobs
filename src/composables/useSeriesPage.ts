import { onMounted, ref } from "vue";

import { fetchSearchJobsBySeriesCode, type UsajobsJobSummary } from "@/api/usajobs/search";
import { hydrateSeriesCounts } from "@/api/usajobs/hydrateSeriesCounts";
import { getSeriesDescription } from "@/data/usajobsSeriesDescriptions";
import { mockSeries } from "@/data/home.mock";
import type { SeriesCardItem } from "@/types/browse";

export type SeriesPageRow = SeriesCardItem & {
  description: string | null;
  latestJobs: UsajobsJobSummary[];
};

function cloneSeries(): SeriesCardItem[] {
  return mockSeries.map((x) => ({ ...x }));
}

export function useSeriesPage() {
  const rows = ref<SeriesPageRow[]>([]);
  const loading = ref(true);

  onMounted(async () => {
    loading.value = true;
    try {
      const withCounts = await hydrateSeriesCounts(cloneSeries());

      const jobsLists = await Promise.all(
        withCounts.map(async (s) => {
          const jobs = await fetchSearchJobsBySeriesCode(s.code, 2);
          return jobs ?? [];
        }),
      );

      rows.value = withCounts.map((s, i) => ({
        ...s,
        description: getSeriesDescription(s.code),
        latestJobs: jobsLists[i] ?? [],
      }));
    } finally {
      loading.value = false;
    }
  });

  return {
    rows,
    loading,
  };
}
