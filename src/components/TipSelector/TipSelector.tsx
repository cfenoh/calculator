import React from "react";
import {
  Button,
  Col,
  Collapse,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import tip from "../Tips/Tip";
import {
  _getTipUnitSymbol,
  getTipsByServiceId,
  UNIT_TO_SYMBOL,
} from "../CategoriesSelector/helper";
import { FieldInputProps, useField, useFormikContext } from "formik";
import { Inputs } from "../../features/TipForm/types";
import { useTranslation } from "react-i18next";
import { useTotalPrice } from "../../useTotalPrice";
import NumberTextField from "../../features/TipForm/NumberTextField";

function Tip(props: {
  value: number;
  tipField: FieldInputProps<any>;
  onClick: () => void;
  tipUnit: string;
}) {
  const { values } = useFormikContext<Inputs>();
  const { tip: computedTip } = useTotalPrice({
    basePrice: Number(values.price),
    provinceId: Number(values.provinceId) || 1,
    tipRate: Number(props.value) || 0,
    tipUnit: values.tipUnit || "percentage",
    shouldApplyTipOnBasePrice: values.shouldApplyTipBeforeTax,
  });
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
  const tips = getTipsByServiceId(values.serviceId);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    if (!tips) return;
    const suggestedTip = tips.find((tip) => tip.isSuggested);
    setFieldValue("tip", suggestedTip!.value);
    setFieldValue("tipUnit", suggestedTip!.unit);
  }, [tips, setFieldValue]);

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
              onClick={() => setFieldValue("tip", value)}
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
              pattern="[0-9]*"
            />
          </Collapse>
        </Row>
      </FormGroup>
    </fieldset>
  );
};
