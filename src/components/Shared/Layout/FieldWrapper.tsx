import React from "react";
import { Col, FormGroup, Row } from "reactstrap";

const FieldWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <FormGroup className={"mb-4 mt-3"}>
      <Row>
        <Col>{children}</Col>
      </Row>
    </FormGroup>
  );
};

export default FieldWrapper;
