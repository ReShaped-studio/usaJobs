/** USAJobs Search `Organization` (agency subelement code); see codelist/agencysubelements */
export type AgencyCardItem = {
  id: string;
  title: string;
  kind: string;
  openPositions: number;
  /** Optional seal image URL */
  imageUrl?: string;
  /** When set, home page can load live counts via Search API */
  organizationCode?: string;
  /** Key in `usagov-agency-descriptions.json` for mission copy on the Agencies page */
  usagovSlug?: string;
};

export type SeriesCardItem = {
  id: string;
  code: string;
  title: string;
  gradeRange: string;
  openPositions: number;
};

/** `LocationName` query value for USAJobs Search (format-sensitive) */
export type LocationCardItem = {
  id: string;
  label: string;
  remoteAvailable: boolean;
  openPositions: number;
  /** Optional city seal / flag image */
  imageUrl?: string;
  /** When set, home page can load live counts via Search API */
  locationQuery?: string;
};
