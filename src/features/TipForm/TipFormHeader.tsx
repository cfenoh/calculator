import React from "react";
import { Col, Row } from "reactstrap";
import ProvinceSelector from "../province/ProvinceSelector/ProvinceSelector";

const TipFormHeader = () => {
  return (
    <Row>
      <Col
        className={
          "d-flex flex-row justify-content-between align-items-center align-content-center"
        }
      >
        &nbsp;
        <ProvinceSelector />
      </Col>
    </Row>
  );
};

export default TipFormHeader;
