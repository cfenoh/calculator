import React, { ChangeEvent, useState } from "react";
import { TipCategory } from "./tips.const";

export type TipFormFields = {
  price: number | string;
  provinceId: number;
  tip: number;
  categoryId: TipCategory["id"];
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
        [name]: type === "checkbox" ? checked : Number(value),
      }));
    },
    []
  );

  const reset = React.useCallback(() => {
    setFields(initialFields);
  }, [initialFields]);

  return { fields, handleChange, reset };
}
