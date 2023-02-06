import { SelectableCategoriesProps, Service } from "../../tips.const";
import { serviceList } from "../../serviceList";

export function extractInitialTipCategorySubset(
  tipCategories: Service[],
  index: number = 0
): {
  initialCategoryId: number;
  initialRecommendedTip: number;
} {
  const foundCategory = tipCategories[index];
  const itemWithRecommendedAmount = foundCategory.tips.find(
    (item) => item.isSuggested
  );
  return {
    initialCategoryId: foundCategory.id,
    initialRecommendedTip: itemWithRecommendedAmount
      ? itemWithRecommendedAmount.value
      : 0,
  };
}

export const Categories: SelectableCategoriesProps = serviceList.map(
  ({ id, label, category, transKey }) => ({
    id,
    label: `${category} / ${label}`,
    transKey,
  })
);

export const _getTipUnitSymbol = (tipUnit: Service["unit"]): string => {
  return (
    {
      percentage: "%",
      dollar: "$",
    }[tipUnit] || tipUnit
  );
};
