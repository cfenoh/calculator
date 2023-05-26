import React from "react";
import { Input } from "reactstrap";
import { Province } from "../../taxByProvinces";
import { useField } from "formik";
import { useTranslation } from "react-i18next";

type ProvinceSelectorProps = {
  provinces: Province[];
};
const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({ provinces }) => {
  const [field] = useField("provinceId");
  const { t } = useTranslation("form");

  return (
    <div className={"mb-0 me-1"}>
      <label htmlFor={"provinceId"} aria-hidden={true} hidden={true}>
        {t("province.label")}
      </label>
      <Input
        type={"select"}
        id={"provinceId"}
        role={"combobox"}
        aria-label={"provinceId"}
        className={"border-0 text-success text-uppercase"}
        {...field}
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
