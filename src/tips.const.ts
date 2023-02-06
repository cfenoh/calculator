export type Tip = {
  rating: string;
  value: number;
  ratingText: string;
  isSuggested: boolean;
};
export interface Service {
  id: number;
  label: string;
  category: string;
  transKey: string;
  unit: string;
  note?: string;
  tips: Tip[];
}
export type SelectableCategoriesProps = {
  id: Service["id"];
  label: Service["label"];
  transKey: Service["transKey"];
}[];
