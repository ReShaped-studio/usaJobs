import { fetchSearchResultCountAll } from "@/api/usajobs/search";
import type { AgencyCardItem } from "@/types/browse";

export async function hydrateAgencyCounts(items: AgencyCardItem[]): Promise<AgencyCardItem[]> {
  return Promise.all(
    items.map(async (item) => {
      const code = item.organizationCode;
      if (!code) return item;
      const params = new URLSearchParams({ Organization: code });
      const count = await fetchSearchResultCountAll(params);
      return count != null ? { ...item, openPositions: count } : item;
    }),
  );
}
