import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import ProvinceSelector from "../../components/ProvinceSelector/ProvinceSelector";
import { provinces } from "../../taxByProvinces";

const TipFormHeader = () => {
  const { t, i18n } = useTranslation("form");

  return (
    <Row>
      <Col
        className={
          "d-flex flex-row justify-content-between align-items-center align-content-center"
        }
      >
        <h1
          className={"m-0"}
          style={{
            color: "#191D23",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "27px",
          }}
        >
          {t("heading")}
        </h1>
        <ProvinceSelector provinces={provinces} />
      </Col>
    </Row>
  );
};

export default TipFormHeader;
