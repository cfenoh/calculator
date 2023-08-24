import ServiceSelector from "./CategoriesSelector/ServiceSelector";
import TipBeforeTaxToggle from "./TipBeforeTaxToggle/TipBeforeTaxToggle";
import { TipSelector } from "./TipSelector/TipSelector";
import React from "react";
import { serviceList } from "./CategoriesSelector/serviceList";
import { useAppSelector } from "../../store/hooks";
import { getSelectedTip } from "./tipSlice";

export const Tip: React.FC = () => {
  const { unit: selectedTipUnit } = useAppSelector(getSelectedTip);
  const isSelectedTipUnitPercentage = selectedTipUnit === "percentage";
  return (
    <>
      <ServiceSelector services={serviceList} />
      {isSelectedTipUnitPercentage && <TipBeforeTaxToggle />}
      <TipSelector />
    </>
  );
};
