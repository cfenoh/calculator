import { Service, Tip } from "../tip.types";
import { serviceList } from "./serviceList";

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
