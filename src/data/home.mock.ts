import type {
  AgencyCardItem,
  LocationCardItem,
  SeriesCardItem,
} from "@/types/browse";

export const mockAgencies: AgencyCardItem[] = [
  {
    id: "doe",
    title: "Department of Energy",
    kind: "Federal agency",
    openPositions: 847,
    organizationCode: "DN",
    usagovSlug: "u-s-department-of-energy",
  },
  {
    id: "usda",
    title: "USDA",
    kind: "Federal agency",
    openPositions: 847,
    organizationCode: "AG",
    usagovSlug: "u-s-department-of-agriculture",
  },
  {
    id: "nara",
    title: "National Archives",
    kind: "Federal agency",
    openPositions: 847,
    organizationCode: "NQ00",
    usagovSlug: "national-archives-and-records-administration",
  },
  {
    id: "census",
    title: "Census Bureau",
    kind: "Federal agency",
    openPositions: 847,
    organizationCode: "CM63",
    usagovSlug: "u-s-census-bureau",
  },
  {
    id: "cdc",
    title: "Centers for Disease Control and Prevention",
    kind: "Federal agency",
    openPositions: 847,
    organizationCode: "HE39",
    usagovSlug: "centers-for-disease-control-and-prevention",
  },
];

export const mockSeries: SeriesCardItem[] = [
  {
    id: "0000",
    code: "0000",
    title: "Miscellaneous Occupations",
    gradeRange: "GS-7 - GS-15",
    openPositions: 847,
  },
  {
    id: "0100",
    code: "0100",
    title: "Social Science, Psychology, and Welfare",
    gradeRange: "GS-7 - GS-15",
    openPositions: 847,
  },
  {
    id: "0200",
    code: "0200",
    title: "Human Resources Management",
    gradeRange: "GS-7 - GS-15",
    openPositions: 847,
  },
  {
    id: "0300",
    code: "0300",
    title: "General Administrative, Clerical, and Office Services",
    gradeRange: "GS-7 - GS-15",
    openPositions: 847,
  },
  {
    id: "0400",
    code: "0400",
    title: "Natural Resources Management and Biological Sciences",
    gradeRange: "GS-7 - GS-15",
    openPositions: 847,
  },
];

export const mockLocations: LocationCardItem[] = [
  {
    id: "dc",
    label: "Washington, D.C.",
    remoteAvailable: true,
    openPositions: 847,
    locationQuery: "Washington, DC, District of Columbia",
  },
  {
    id: "atl",
    label: "Atlanta, GA",
    remoteAvailable: true,
    openPositions: 847,
    locationQuery: "Atlanta, Georgia",
  },
  {
    id: "chi",
    label: "Chicago, IL",
    remoteAvailable: true,
    openPositions: 847,
    locationQuery: "Chicago, Illinois",
  },
  {
    id: "nyc",
    label: "New York, NY",
    remoteAvailable: true,
    openPositions: 847,
    locationQuery: "New York, New York",
  },
  {
    id: "orl",
    label: "Orlando, FL",
    remoteAvailable: true,
    openPositions: 847,
    locationQuery: "Orlando, Florida",
  },
];
