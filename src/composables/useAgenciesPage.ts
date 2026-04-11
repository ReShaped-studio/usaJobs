import { onMounted, ref } from "vue";

import { hydrateAgencyCounts } from "@/api/usajobs/hydrateAgencyCounts";
import { fetchSearchJobs, type UsajobsJobSummary } from "@/api/usajobs/search";
import { getUsagovAgencyDescription } from "@/data/usagovAgencyDescriptions";
import { mockAgencies } from "@/data/home.mock";
import type { AgencyCardItem } from "@/types/browse";

export type AgencyPageRow = AgencyCardItem & {
  mission: string | null;
  latestJobs: UsajobsJobSummary[];
};

function cloneAgencies(): AgencyCardItem[] {
  return mockAgencies.map((x) => ({ ...x }));
}

export function useAgenciesPage() {
  const rows = ref<AgencyPageRow[]>([]);
  const loading = ref(true);

  onMounted(async () => {
    loading.value = true;
    try {
      const withCounts = await hydrateAgencyCounts(cloneAgencies());

      const jobsLists = await Promise.all(
        withCounts.map(async (a) => {
          const code = a.organizationCode;
          if (!code) return [] as UsajobsJobSummary[];
          const jobs = await fetchSearchJobs(code, 2);
          return jobs ?? [];
        }),
      );

      rows.value = withCounts.map((a, i) => ({
        ...a,
        mission: getUsagovAgencyDescription(a.usagovSlug),
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
