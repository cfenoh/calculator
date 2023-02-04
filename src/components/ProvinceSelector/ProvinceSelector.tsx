import React from "react";
import { Input } from "reactstrap";
import { Province } from "../../taxByProvinces";

type ProvinceSelectorProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  provinces: Province[];

  defaultIndex: number;
};
const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({
  provinces,
  onChange,
  defaultIndex = 6,
}) => {
  return (
    <div className={"mb-0 me-1"}>
      <label htmlFor={"provinceId"} aria-hidden={true} hidden={true}>
        select a province
      </label>
      <Input
        type={"select"}
        id={"provinceId"}
        name={"provinceId"}
        role={"combobox"}
        onChange={onChange}
        className={"border-0 text-success text-uppercase"}
        defaultValue={defaultIndex}
      >
        {provinces.map(({ shortName, id }) => (
          <option key={id} value={id} className={"text-uppercase"}>
            {shortName}
          </option>
        ))}
      </Input>
    </div>
  );
};

export default ProvinceSelector;
