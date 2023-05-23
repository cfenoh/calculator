import React from "react";
import { Input } from "reactstrap";
import { useField } from "formik";
// should not start by dot => !field.value.toString().length
// only one dot accepted as separator => (field.value.toString().match(/\./g) || []).length > 0
// "e", "E", "+", "-", "," should be avoid, originally allowed in input number => ["e", "E", "+", "-", ","].includes(e.key)
const NumberTextField: React.FC<{
  name: string;
}> = ({ name }) => {
  const [field] = useField(name);
  return (
    <Input
      placeholder={"0"}
      id={name}
      onKeyDown={(e) => {
        return (
          (["e", "E", "+", "-", ","].includes(e.key) ||
            ((e.key.match(/\./g) || []).length &&
              ((field.value.toString().match(/\./g) || []).length > 0 ||
                !field.value.toString().length))) &&
          e.preventDefault()
        );
      }}
      type={"number"}
      lang={"en"}
      className={"form-base-input rounded-1"}
      {...field}
      value={field.value}
    />
  );
};

export default NumberTextField;
