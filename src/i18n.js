import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import formTranslationFR from "../public/locales/fr/form.json";
import defaultTranslationFR from "../public/locales/fr/default.json";
import servicesTranslationFR from "../public/locales/fr/services.json";
import formTranslationEN from "../public/locales/en/form.json";
import defaultTranslationEN from "../public/locales/en/default.json";
import servicesTranslationEN from "../public/locales/en/services.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    lng: "fr", // language to use, more information here:
    // https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources: {
      fr: {
        form: formTranslationFR,
        default: defaultTranslationFR,
        services: servicesTranslationFR,
      },
      en: {
        form: formTranslationEN,
        default: defaultTranslationEN,
        services: servicesTranslationEN,
      },
    },
  });

export default i18n;
