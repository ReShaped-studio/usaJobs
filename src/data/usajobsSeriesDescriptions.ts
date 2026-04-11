import raw from "@/data/usajobs-series-descriptions.json";

type SeriesFile = {
  series: { code: string; description: string }[];
};

const byCode = new Map<string, string>(
  (raw as SeriesFile).series.map((s) => [s.code, s.description]),
);

export function getSeriesDescription(code: string): string | null {
  return byCode.get(code) ?? null;
}
