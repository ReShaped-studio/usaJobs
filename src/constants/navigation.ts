import type { RouteLocationRaw } from "vue-router";

export type CiviNavItem = {
  name: string;
  label: string;
  to: RouteLocationRaw;
};

export const CIVI_PRIMARY_NAV: CiviNavItem[] = [
  { name: "home", label: "Home", to: { name: "home" } },
  { name: "agencies", label: "Agencies", to: { name: "agencies" } },
  { name: "series", label: "Series", to: { name: "series" } },
  { name: "locations", label: "Locations", to: { name: "locations" } },
];
