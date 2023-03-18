import { Service } from "../../tips.const";
import { serviceList } from "../../serviceList";

export const getServiceById = (serviceId: string | number): Service => {
  return (
    serviceList.find((service) => service.id === Number(serviceId)) ||
    serviceList[0]
  );
};
export const getSuggestedTipByServiceId = (serviceId: string | number) => {
  const foundService = getServiceById(serviceId);
  return foundService.tips.find((tip) => tip.isSuggested)?.value.toString();
};
