import React from "react";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";

export const LangSelector: React.FC = () => {
  const { t } = useTranslation("default");
  return (
    <div className={"mb-0"}>
      <label htmlFor={"langId"} aria-hidden={true} hidden={true}>
        {t("footer.lang")}
      </label>
      <Input
        type={"select"}
        id={"langId"}
        role={"combobox"}
        aria-label={"langId"}
        className={"border-0 text-uppercase"}
      >
        <option className={"text-uppercase"}>fr</option>
        <option className={"text-uppercase"}>en</option>
      </Input>
    </div>
  );
};
