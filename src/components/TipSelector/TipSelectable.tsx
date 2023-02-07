import React, { SyntheticEvent, useEffect, useState } from "react";
import { Col, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import tip from "../Tips/Tip";
import { _getTipUnitSymbol } from "../CategoriesSelector/helper";
import { Tip } from "../../tips.const";
import { register } from "numeral";
import { useFormContext } from "react-hook-form";

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
