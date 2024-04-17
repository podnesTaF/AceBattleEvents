import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files
import enTranslations from "./translations/en.json";
import frTranslations from "./translations/fr.json";
import uaTranslations from "./translations/ua.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
    ua: {
      translation: uaTranslations,
    },
    // Add other languages here
  },
  lng: "en", // Default language
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
