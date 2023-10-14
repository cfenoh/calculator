import React from "react";
import { useField } from "formik";
import CurrencyInput from "react-currency-input-field";

const NumberTextField: React.FC<{
  name: string;
  initialValue?: number;
  onChange?: (arg: number) => void;
}> = ({ name, initialValue, onChange, ...rest }) => {
  const [field] = useField(name);
  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    field.onChange(evt);
    if (onChange && typeof onChange === "function") {
      onChange(Number(evt.currentTarget.value) || 0);
    }
  };
  return (
    <CurrencyInput
      id={name}
      name={field.name}
      placeholder="0"
      defaultValue={initialValue || 0}
      decimalsLimit={2}
      className={"form-control form-base-input rounded-1"}
      decimalSeparator={"."}
      groupSeparator={" "}
      inputMode="decimal"
      onChange={handleChange}
      {...rest}
    />
  );
};

export default NumberTextField;
