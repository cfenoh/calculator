import React from "react";
import { Input } from "reactstrap";
import { useField } from "formik";

const NumberTextField: React.FC<{
  name: string;
}> = ({ name }) => {
  const [field] = useField(name);
  return (
    <Input
      placeholder={"0"}
      id={name}
      onKeyDown={(e) =>
        ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
      }
      type={"number"}
      lang={"en"}
      className={"form-base-input rounded-1"}
      {...field}
      value={field.value}
    />
  );
};

export default NumberTextField;
