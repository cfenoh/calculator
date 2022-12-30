import React, { useState } from "react";

export type TipFormFields = {
  price: number | string;
  provinceId: number;
  tips: number | string;
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
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prevFields) => ({
        ...prevFields,
        [target.name]:
          target.type === "checkbox" ? target.checked : Number(target.value),
      }));
    },
    []
  );

  const reset = React.useCallback(() => {
    setFields(initialFields);
  }, [initialFields]);

  return { fields, handleChange, reset };
}

const _convertToBoolean = (value: string): boolean => value === "on";
