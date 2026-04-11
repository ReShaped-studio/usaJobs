import { onMounted, ref } from "vue";

import { hydrateAgencyCounts } from "@/api/usajobs/hydrateAgencyCounts";
import { hydrateSeriesCounts } from "@/api/usajobs/hydrateSeriesCounts";
import { fetchSearchResultCountAll } from "@/api/usajobs/search";
import { mockAgencies, mockLocations, mockSeries } from "@/data/home.mock";
import type {
  AgencyCardItem,
  LocationCardItem,
  SeriesCardItem,
} from "@/types/browse";

function cloneAgencies(): AgencyCardItem[] {
  return mockAgencies.map((x) => ({ ...x }));
}

function cloneSeries(): SeriesCardItem[] {
  return mockSeries.map((x) => ({ ...x }));
}

function cloneLocations(): LocationCardItem[] {
  return mockLocations.map((x) => ({ ...x }));
}

async function hydrateLocations(items: LocationCardItem[]): Promise<LocationCardItem[]> {
  return Promise.all(
    items.map(async (item) => {
      const q = item.locationQuery;
      if (!q) return item;
      const params = new URLSearchParams({ LocationName: q });
      const count = await fetchSearchResultCountAll(params);
      return count != null ? { ...item, openPositions: count } : item;
    }),
  );
}

export function useHomeBrowseCounts() {
  const agencies = ref<AgencyCardItem[]>(cloneAgencies());
  const series = ref<SeriesCardItem[]>(cloneSeries());
  const locations = ref<LocationCardItem[]>(cloneLocations());
  const loading = ref(true);

  onMounted(async () => {
    loading.value = true;
    try {
      const [a, s, l] = await Promise.all([
        hydrateAgencyCounts(cloneAgencies()),
        hydrateSeriesCounts(cloneSeries()),
        hydrateLocations(cloneLocations()),
      ]);
      agencies.value = a;
      series.value = s;
      locations.value = l;
    } finally {
      loading.value = false;
    }
  });

  return {
    agencies,
    series,
    locations,
    loading,
  };
}
