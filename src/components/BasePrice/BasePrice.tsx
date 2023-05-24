import React from "react";
import FieldWrapper from "../shared/Layout/FieldWrapper";
import { Label } from "reactstrap";
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
      <NumberTextField name={"price"} />
    </FieldWrapper>
  );
};

export default BasePrice;
