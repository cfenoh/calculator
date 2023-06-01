import React from "react";
import { Input } from "reactstrap";
import { FieldInputProps, useField } from "formik";

// should not start by dot => !field.value.toString().length
// only one dot accepted as separator => (field.value.toString().match(/\./g) || []).length > 0
// "e", "E", "+", "-", "," should be avoid, originally allowed in input number => ["e", "E", "+", "-", ","].includes(e.key)
const isKeyInNotAllowedChar = (
  e: React.KeyboardEvent<HTMLInputElement>,
  field: FieldInputProps<string>
) =>
  ["e", "E", "+", "-", ","].includes(e.key) ||
  ((e.key.match(/\./g) || []).length &&
    ((field.value.toString().match(/\./g) || []).length > 0 ||
      !field.value.toString().length));

const NumberTextField: React.FC<{
  name: string;
}> = ({ name, ...rest }) => {
  const [field] = useField(name);
  return (
    <Input
      placeholder={"0"}
      id={name}
      onKeyDown={(e) => isKeyInNotAllowedChar(e, field) && e.preventDefault()}
      type={"number"}
      lang={"en"}
      className={"form-base-input rounded-1"}
      {...field}
      value={field.value}
      pattern="[0-9]*"
      inputmode="decimal"
      {...rest}
    />
  );
};

export default NumberTextField;
