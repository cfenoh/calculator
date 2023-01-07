import { tipCategories } from "./tipCategories";
export interface TipCategory {
  id: number;
  label: string;

  category: string;
  transKey: string;
  unit: string;
  note?: string;
  items: {
    rating: string;
    value: number;
    ratingText: string;
    isRecommendedAmount: boolean;
  }[];
}
export type SelectableCategoriesProps = {
  id: TipCategory["id"];
  label: TipCategory["label"];
  transKey: TipCategory["transKey"];
}[];
