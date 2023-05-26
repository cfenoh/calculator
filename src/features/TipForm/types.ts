import { Province } from "../../taxByProvinces";
import { Service } from "../../tips.const";

export type TipFormProps = {
  provinces: Province[];
  services: Service[];
};
export type Inputs = {
  price: number;
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
