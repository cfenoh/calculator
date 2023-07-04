import React from "react";
import FieldWrapper from "../shared/Layout/FieldWrapper";
import { Label, Row } from "reactstrap";
import NumberTextField from "../../features/TipForm/NumberTextField";
import { useTranslation } from "react-i18next";

const BasePrice = () => {
  const { t } = useTranslation("form");
  return (
    <FieldWrapper>
      <Label for={"price"}>
        {t("price.label")}
        <span className={"fs-0 text-muted ms-0 fst-italic"}>
          ({t("taxes.excluded")})
        </span>
      </Label>
      <div>
        <NumberTextField name={"price"} />
      </div>
    </FieldWrapper>
  );
};

export default BasePrice;
