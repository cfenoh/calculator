import React from "react";
import { Col, Row } from "reactstrap";
import ProvinceSelector from "../../components/Province/ProvinceSelector/ProvinceSelector";

const Header = () => {
  return (
    <Row>
      <Col
        className={
          "d-flex flex-row justify-content-between align-items-center align-content-center"
        }
      >
        &nbsp;
      </Col>
      <Col>
        <ProvinceSelector />
      </Col>
    </Row>
  );
};

export default Header;
