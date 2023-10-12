import React from "react";
import { Input } from "reactstrap";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getProvinces,
  getSelectedProvince,
  selectProvince,
} from "../provinceSlice";

const ProvinceSelector: React.FC = () => {
  const [field] = useField("provinceId");
  const { t } = useTranslation("form");
  const provinces = useAppSelector(getProvinces);
  const selectedProvince = useAppSelector(getSelectedProvince);
  const dispatch = useAppDispatch();

  return (
    <div>
      <label htmlFor={"provinceId"} aria-hidden={true} hidden={true}>
        {t("Province.label")}
      </label>
      <Input
        type={"select"}
        id={"provinceId"}
        role={"combobox"}
        aria-label={"provinceId"}
        className={"border-0 text-success text-uppercase"}
        {...field}
        onChange={(evt) =>
          dispatch(selectProvince(Number(evt.target.value) || 5))
        }
        defaultValue={selectedProvince.id}
      >
        {provinces.map(({ name, id }) => (
          <option key={id} value={id} className={"text-uppercase"}>
            {name}
          </option>
        ))}
      </Input>
    </div>
  );
};

export default ProvinceSelector;
