import React from "react";
import FieldWrapper from "../Shared/Layout/FieldWrapper";
import { Label } from "reactstrap";
import NumberTextField from "../Shared/TextField/NumberTextField";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addAmount, getAmount } from "./amountSlice";

const Amount = () => {
  const { t } = useTranslation("form");
  const amount = useAppSelector(getAmount);
  const dispatch = useAppDispatch();
  const handleAmountChange = (value: number) => {
    dispatch(addAmount(value));
  };
  return (
    <FieldWrapper>
      <Label for={"price"}>
        {t("price.label")}
        <span className={"fs-0 text-muted ms-0 fst-italic"}>
          ({t("taxes.excluded")})
        </span>
      </Label>
      <div>
        <NumberTextField
          name={"price"}
          initialValue={amount}
          onChange={handleAmountChange}
        />
      </div>
    </FieldWrapper>
  );
};

export default Amount;
