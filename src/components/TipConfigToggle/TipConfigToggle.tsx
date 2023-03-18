import React from "react";
import { useField } from "formik";
import { FormGroup, Input, Label } from "reactstrap";
import { useTranslation } from "react-i18next";

const TipConfigToggle = () => {
  const { t } = useTranslation("form");
  const [field] = useField("shouldApplyTipBeforeTax");
  return (
    <FormGroup check className={"mt-4 mb-3"}>
      <Input
        type={"checkbox"}
        className={"input-checkbox me-3"}
        id={"shouldApplyTipBeforeTax"}
        {...field}
      />
      <Label check htmlFor={"shouldApplyTipBeforeTax"}>
        {t("shouldApplyTipBeforeTax")}
      </Label>
    </FormGroup>
  );
};

export default TipConfigToggle;
