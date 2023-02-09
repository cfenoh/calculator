import React, { SyntheticEvent, useEffect, useState } from "react";
import { Col, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import tip from "../Tips/Tip";
import { _getTipUnitSymbol } from "../CategoriesSelector/helper";
import { Service, Tip } from "../../tips.const";
import { register, reset } from "numeral";
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
  const { setValue, control } = useFormContext();
  const tips = getTipsByServiceId(serviceId);
  const suggestedTip = React.useMemo(
    () => tips.find((tip) => tip.isSuggested),
    [tips]
  );

  React.useEffect(() => {
    if (!suggestedTip) return;
    setValue("tip", suggestedTip.value);
  }, [suggestedTip]);

  return (
    <fieldset>
      {tips.map(({ value, isSuggested }) => (
        <Controller
          control={control}
          name={"tip"}
          key={`col-id-${value}`}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <Col>
                <label htmlFor={`tip-${value}`}>{value}</label>
                <input
                  type={"radio"}
                  id={`tip-${value}`}
                  defaultChecked={isSuggested}
                  {...field}
                  value={value}
                />
              </Col>
            );
          }}
        />
      ))}
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
