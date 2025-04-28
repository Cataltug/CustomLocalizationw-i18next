import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json"
import trTranslation from "./locales/tr.json"
import { getLocales } from "expo-localization";




i18n
  .use(initReactI18next)
  // @ts-ignore
  .init({
    resources: {
      en: { translation: enTranslation },
      tr: { translation: trTranslation },
    },

    lng: getLocales()[0].languageCode,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;