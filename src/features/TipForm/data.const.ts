export const DEFAULT_SERVICE_ID = 1;
export const DEFAULT_PROVINCE_ID = 5;

type Language = {
  [key: string]: {
    nativeName: string;
  };
};
export const LANGUAGES: Language = {
  en: { nativeName: "English" },
  fr: { nativeName: "French" },
};
