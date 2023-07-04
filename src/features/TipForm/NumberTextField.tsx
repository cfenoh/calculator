import React from "react";
import { useField } from "formik";
import CurrencyInput from "react-currency-input-field";

const NumberTextField: React.FC<{
  name: string;
}> = ({ name, ...rest }) => {
  const [field] = useField(name);
  return (
    <CurrencyInput
      id={name}
      name={field.name}
      placeholder="0"
      defaultValue={0}
      decimalsLimit={2}
      className={"form-control form-base-input rounded-1"}
      decimalSeparator={","}
      groupSeparator={" "}
      inputMode="decimal"
      onChange={field.onChange}
      {...rest}
    />
  );
};

export default NumberTextField;
