import React, { ChangeEvent, useState } from "react";
import { Service } from "./tips.const";
import { extractInitialTipCategorySubset } from "./components/CategoriesSelector/helper";
import { serviceList } from "./serviceList";
import tip from "./components/Tips/Tip";

export type TipFormFields = {
  price: number | string;
  province: number;
  tip: number;
  categoryId: Service["id"];
  shouldApplyTipOnBasePrice: boolean;
};

export type FormState = {
  price: number | string;
  selectedProvinceId: number;
  selectedCategoryId: Service["id"];
  categories: Service[];
  tip: {
    suggested: number;
    selected: number;
    unit: string;
    note: string;
    rating: string;
  };
  shouldApplyTipOnBasePrice: boolean;
};
export const useTipForm = (
  initialValues: TipFormFields
): [TipFormFields, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const { fields, handleChange } = useForm<TipFormFields>(initialValues);

  return [fields, handleChange];
};

function useForm<T>(initialFields: T) {
  const [fields, setFields] = useState(initialFields);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { type, name, checked, value } = event.target;
      setFields((prevFields) => ({
        ...prevFields,
        [name]:
          type === "checkbox" ? checked : value === "0" ? "" : Number(value),
      }));
    },
    []
  );

  const reset = React.useCallback(() => {
    setFields(initialFields);
  }, [initialFields]);

  return { fields, handleChange, reset };
}

const ActionType = <const>{
  PriceUpdated: "PriceUpdated",
  TipUpdated: "TipUpdated",
  TipCategoryUpdated: "TipCategoryUpdated",
  AppliedTipOnBasePriceUpdated: "AppliedTipOnBasePriceUpdated",
};
type Action = {
  type: keyof typeof ActionType;
  payload: string | number;
};

export const FormTipReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    default:
      return state;
  }
};
