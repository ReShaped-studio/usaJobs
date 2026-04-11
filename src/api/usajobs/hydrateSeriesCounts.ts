import { fetchSearchResultCountAll } from "@/api/usajobs/search";
import type { SeriesCardItem } from "@/types/browse";

export async function hydrateSeriesCounts(items: SeriesCardItem[]): Promise<SeriesCardItem[]> {
  return Promise.all(
    items.map(async (item) => {
      const params = new URLSearchParams({
        JobCategoryCode: item.code.padStart(4, "0"),
      });
      const count = await fetchSearchResultCountAll(params);
      return count != null ? { ...item, openPositions: count } : item;
    }),
  );
}
