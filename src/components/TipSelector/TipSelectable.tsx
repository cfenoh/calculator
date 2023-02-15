import React, { SyntheticEvent, useEffect, useState } from "react";
import { Col, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import tip from "../Tips/Tip";
import { _getTipUnitSymbol } from "../CategoriesSelector/helper";
import { Service, Tip } from "../../tips.const";
import { Controller, useFormContext } from "react-hook-form";
import { serviceList } from "../../serviceList";

const TipSelectable: React.FC<{
  tips: Tip[];
  unit: string;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
}> = ({ tips, unit, onChange }) => {
  return (
    <>
      {tips.map(({ rating, value, isSuggested }) => {
        const id = `radio-${value}`;
        return (
          <Col key={value}>
            <Input
              type={"radio"}
              name={"tip"}
              value={value}
              color={"secondary"}
              checked={tip ? Number(tip) === value : isSuggested}
              className={"btn-check"}
              id={id}
              onChange={onChange}
            />
            <Label
              check
              className={
                "btn btn-outline-success tip-radio-label d-flex justify-content-evenly align-items-center"
              }
              for={id}
            >
              <span className={"fs-2 text-capitalize"}>{rating}</span> - {value}
              {_getTipUnitSymbol(unit)}
            </Label>
          </Col>
        );
      })}
    </>
  );
};

export default TipSelectable;

export const NestedTipSelector: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { setValue, control, watch } = useFormContext();
  const tips = getTipsByServiceId(serviceId);
  const suggestedTip = React.useMemo(
    () => tips.find((tip) => tip.isSuggested),
    [tips]
  );

  const handleCustomTipChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setValue("tip", "" + Number(inputValue));
  };
  React.useEffect(() => {
    if (!suggestedTip) return;
    setValue("tip", suggestedTip.value);
    setValue("tipUnit", suggestedTip.unit);
  }, [suggestedTip]);

  const tipValue = watch("tip");
  return (
    <fieldset>
      {tips.map(({ value, isSuggested, unit }) => (
        <Controller
          control={control}
          name={"tip"}
          key={`col-id-${value}`}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <Col>
                <label htmlFor={`tip-${value}`}>
                  {value} <span>{_getTipUnitSymbol(unit)}</span>
                </label>
                <input
                  type={"radio"}
                  id={`tip-${value}`}
                  checked={value === Number(tipValue)}
                  {...field}
                  value={value}
                />
              </Col>
            );
          }}
        />
      ))}
      <Col>
        <Controller
          control={control}
          name={"tip"}
          rules={{ required: true }}
          render={({ field }) => (
            <InputGroup>
              <Input
                type={"number"}
                name={"tip"}
                value={field.value}
                aria-label={"custom-tip"}
                id={"custom-tip"}
                className={
                  "tip-radio-label rounded-start-1 placeholder-fst-italic"
                }
                onKeyDown={(e) =>
                  ["e", "E", "+", "-", "."].includes(e.key) &&
                  e.preventDefault()
                }
                placeholder={"Ex:20"}
                onChange={handleCustomTipChange}
              />
              <InputGroupText>
                {_getTipUnitSymbol(suggestedTip?.unit)}
              </InputGroupText>
            </InputGroup>
          )}
        />
      </Col>
    </fieldset>
  );
};

const getServiceById = (serviceId: string | number): Service => {
  return (
    serviceList.find((service) => service.id === Number(serviceId)) ||
    serviceList[0]
  );
};
const getTipsByServiceId = (serviceId: string | number): Tip[] => {
  const foundService = getServiceById(serviceId);
  return foundService.tips;
};
