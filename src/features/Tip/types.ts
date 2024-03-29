import { Service } from "@/components/Tip/tip.types";
export type Inputs = {
  price: string;
  provinceId: string;
  serviceId: string;
  shouldApplyTipBeforeTax: boolean;
  tip: string;
  tipUnit: string;
};
export type SelectableServices = {
  id: Service["id"];
  label: Service["label"];
  transKey: Service["transKey"];
}[];
