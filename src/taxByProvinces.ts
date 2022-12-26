export type Province = {
  id: number;
  name: string;
  value: number;
  shortName: string;
};
export const TAX_BY_PROVINCES: Province[] = [
  {
    id: 1,
    name: "Quebec",
    value: 0.14975,
    shortName: "QC",
  },
  {
    id: 2,
    name: "Ontario",
    value: 0.13,
    shortName: "ON",
  },
];
