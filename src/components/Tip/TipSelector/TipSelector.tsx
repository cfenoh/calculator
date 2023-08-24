import React from "react";
import { Button, Col, Collapse, FormGroup, Label, Row } from "reactstrap";
import {
  _getTipUnitSymbol,
  getTipsByServiceId,
  UNIT_TO_SYMBOL,
} from "../CategoriesSelector/helper";
import { useField, useFormikContext } from "formik";
import type { FieldInputProps } from "formik";
import type { Inputs } from "../../../features/Tip/types";
import { useTranslation } from "react-i18next";
import NumberTextField from "../../Shared/TextField/NumberTextField";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getComputedTip, selectATip, SelectedTip } from "../tipSlice";

function Tip(props: {
  value: number;
  tipField: FieldInputProps<any>;
  onClick: () => void;
  tipUnit: string;
}) {
  const computedTip = useAppSelector(getComputedTip);
  return (
    <Col>
      <Button
        color={
          props.value === Number(props.tipField.value) ? "success" : "secondary"
        }
        outline
        active={props.value === Number(props.tipField.value)}
        id={`tip-${props.value}`}
        {...props.tipField}
        value={props.value}
        onClick={props.onClick}
        className={"w-100 py-3"}
      >
        <div className={"fw-light fs-4"}>
          {props.value} <span>{_getTipUnitSymbol(props.tipUnit)}</span>
        </div>

        {_getTipUnitSymbol(props.tipUnit) === UNIT_TO_SYMBOL.percentage && (
          <div className={"fs-7"}>(${computedTip})</div>
        )}
      </Button>
    </Col>
  );
}

export const TipSelector: React.FC = () => {
  const { t } = useTranslation("form");
  const { values, setFieldValue } = useFormikContext<Inputs>();
  const [tipField] = useField("tip");
  const dispatch = useAppDispatch();
  const tips = getTipsByServiceId(values.serviceId);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const dispatchSelectedValue = React.useCallback(
    (tip: SelectedTip) => {
      dispatch(
        selectATip({
          value: tip.value,
          unit: tip.unit,
        })
      );
    },
    [dispatch]
  );
  const handleCustomTipChange = (value: number) =>
    dispatchSelectedValue({ unit: tips[0].unit, value });

  React.useEffect(() => {
    if (!tips) return;
    const suggestedTip = tips.find((tip) => tip.isSuggested);
    setFieldValue("tip", suggestedTip!.value);
    setFieldValue("tipUnit", suggestedTip!.unit);
    dispatchSelectedValue(suggestedTip!);
  }, [tips, setFieldValue, dispatch, dispatchSelectedValue]);

  return (
    <fieldset>
      <FormGroup>
        <Label htmlFor="tips">{t("tip.label")}</Label>
        <Row className={"gy-2 pt-1"} xs={3}>
          {tips.map(({ value, unit }) => (
            <Tip
              key={`col-id-${value}`}
              value={value}
              tipField={tipField}
              onClick={() => {
                setFieldValue("tip", value);
                dispatchSelectedValue({
                  unit,
                  value,
                });
              }}
              tipUnit={unit}
            />
          ))}
        </Row>
        <Row className={"p-1"}>
          <Button
            onClick={toggle}
            color={"link"}
            outline
            className={"text-start border-0 text-success fs-7"}
          >
            {t("tip.customize")} {isOpen ? <>&uarr;</> : <>&darr;</>}
          </Button>

          <Collapse isOpen={isOpen}>
            <NumberTextField
              {...tipField}
              data-testid={"custom-tip"}
              onChange={handleCustomTipChange}
            />
          </Collapse>
        </Row>
      </FormGroup>
    </fieldset>
  );
};
