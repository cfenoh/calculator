import React from "react";
import { FormGroup } from "reactstrap";

const FieldWrapper = ({ children }: React.PropsWithChildren) => {
  return <FormGroup className={"mb-4 mt-3"}>{children}</FormGroup>;
};

export default FieldWrapper;
