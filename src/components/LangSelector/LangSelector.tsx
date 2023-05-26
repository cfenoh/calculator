import React from "react";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../features/TipForm/data.const";

export const LangSelector: React.FC = () => {
  const { t, i18n } = useTranslation("default");
  return (
    <div className={"mb-0 me-3"}>
      <label htmlFor={"langId"} aria-hidden={true} hidden={true}>
        {t("footer.lang")}
      </label>
      <Input
        type={"select"}
        id={"langId"}
        role={"combobox"}
        aria-label={"langId"}
        className={"text-uppercase"}
        onChange={(event) => i18n.changeLanguage(event.target.value)}
        defaultValue={i18n.resolvedLanguage}
      >
        {Object.keys(LANGUAGES).map((lang) => (
          <option className={"text-uppercase"} key={lang} value={lang}>
            {LANGUAGES[lang].nativeName}
          </option>
        ))}
      </Input>
    </div>
  );
};
