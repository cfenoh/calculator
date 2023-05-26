import React from "react";
import { Col, Row } from "reactstrap";
import ProvinceSelector from "../../components/ProvinceSelector/ProvinceSelector";
import { provinces } from "../../taxByProvinces";

const TipFormHeader = () => {
  return (
    <Row>
      <Col
        className={
          "d-flex flex-row justify-content-between align-items-center align-content-center"
        }
      >
        &nbsp;
        <ProvinceSelector provinces={provinces} />
      </Col>
    </Row>
  );
};

export default TipFormHeader;
