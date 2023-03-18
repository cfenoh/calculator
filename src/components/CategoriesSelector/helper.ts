import { Service, Tip } from "../../tips.const";
import { serviceList } from "../../serviceList";
import { SelectableServices } from "../../features/TipForm/types";

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

export const Categories: SelectableServices = serviceList.map(
  ({ id, label, category, transKey }) => ({
    id,
    label: `${category} / ${label}`,
    transKey,
  })
);
export const UNIT_TO_SYMBOL: Record<Service["unit"], string> = {
  percentage: "%",
  dollar: "$",
} as const;
export const _getTipUnitSymbol = (tipUnit?: Service["unit"]): string => {
  return tipUnit ? UNIT_TO_SYMBOL[tipUnit] : UNIT_TO_SYMBOL.percentage;
};

export const getServiceById = (serviceId: string | number): Service => {
  return (
    serviceList.find((service) => service.id === Number(serviceId)) ||
    serviceList[0]
  );
};
export const getTipsByServiceId = (serviceId: string | number): Tip[] => {
  const foundService = getServiceById(serviceId);
  return foundService.tips;
};
