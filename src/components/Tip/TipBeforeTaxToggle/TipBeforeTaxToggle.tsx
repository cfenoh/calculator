import React from "react";
import { useField } from "formik";
import { FormGroup, Input, Label } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../store/hooks";
import { toggleBeforeTaxes } from "../tipSlice";

const TipBeforeTaxToggle = () => {
  const { t } = useTranslation("form");
  const [field] = useField("shouldApplyTipBeforeTax");
  const dispatch = useAppDispatch();

  return (
    <FormGroup check className={"mt-4 mb-3"}>
      <Input
        type={"checkbox"}
        className={"input-checkbox me-3"}
        id={"shouldApplyTipBeforeTax"}
        {...field}
        onChange={() => dispatch(toggleBeforeTaxes())}
      />
      <Label check htmlFor={"shouldApplyTipBeforeTax"}>
        {t("shouldApplyTipBeforeTax")}
      </Label>
    </FormGroup>
  );
};

export default TipBeforeTaxToggle;
