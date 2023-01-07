import { SelectableCategoriesProps, TipCategory } from "../../tips.const";
import { tipCategories } from "../../tipCategories";

export function extractInitialTipCategorySubset(
  tipCategories: TipCategory[],
  index: number = 0
): {
  initialCategoryId: number;
  initialRecommendedTip: number;
} {
  const foundCategory = tipCategories[index];
  const itemWithRecommendedAmount = foundCategory.items.find(
    (item) => item.isRecommendedAmount
  );
  return {
    initialCategoryId: foundCategory.id,
    initialRecommendedTip: itemWithRecommendedAmount
      ? itemWithRecommendedAmount.value
      : 0,
  };
}

export const Categories: SelectableCategoriesProps = tipCategories.map(
  ({ id, label, category, transKey }) => ({
    id,
    label: `${category} / ${label}`,
    transKey,
  })
);

export const _getTipUnitSymbol = (tipUnit: TipCategory["unit"]): string => {
  return (
    {
      percentage: "%",
      dollar: "$",
    }[tipUnit] || tipUnit
  );
};
