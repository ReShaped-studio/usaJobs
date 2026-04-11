import raw from "@/data/usagov-agency-descriptions.json";

type AgenciesFile = {
  agencies: { slug: string; description: string }[];
};

const bySlug = new Map<string, string>(
  (raw as AgenciesFile).agencies.map((a) => [a.slug, a.description]),
);

export function getUsagovAgencyDescription(slug: string | undefined): string | null {
  if (!slug) return null;
  return bySlug.get(slug) ?? null;
}
