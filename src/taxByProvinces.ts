export type Province = {
  id: number;
  name: string;
  value: number;
  shortName: string;
};
export const TAX_BY_PROVINCES: Province[] = [
  {
    id: 1,
    name: "British Columbia",
    value: 12,
    shortName: "BC",
  },
  {
    id: 2,
    name: "Alberta",
    value: 5,
    shortName: "AB",
  },
  {
    id: 3,
    name: "Saskatchewan",
    value: 6,
    shortName: "SK",
  },
  {
    id: 4,
    name: "Manitoba",
    value: 8,
    shortName: "MB",
  },
  {
    id: 5,
    name: "Ontario",
    value: 13,
    shortName: "ON",
  },
  {
    id: 6,
    name: "Quebec",
    value: 14.975,
    shortName: "QC",
  },
  {
    id: 7,
    name: "New Brunswick",
    value: 15,
    shortName: "NB",
  },
  {
    id: 8,
    name: "Nova Scotia",
    value: 15,
    shortName: "NS",
  },
  {
    id: 9,
    name: "Prince Edward Island",
    value: 15,
    shortName: "PE",
  },
  {
    id: 10,
    name: "Newfoundland and Labrador",
    value: 10,
    shortName: "NL",
  },
  {
    id: 11,
    name: "Yukon",
    value: 5,
    shortName: "YT",
  },
  {
    id: 12,
    name: "Nunavut",
    value: 5,
    shortName: "NU",
  },
  {
    id: 13,
    name: "Northwest Territories",
    value: 5,
    shortName: "NT",
  },
];
