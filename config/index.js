import en from "../locales/en.json";
import fr from "../locales/fr.json";
import it from "../locales/it.json";
import nl from "../locales/nl.json";

export const I18N = {
  lazy: true,
  langDir: "locales/",
  defaultLocale: "fr",
  locales: [
    { code: "en", iso: "en-US", file: "en.json", name: "english" },
    { code: "fr", iso: "fr-FR", file: "fr.json", name: "french" },
    { code: "it", iso: "it-IT", file: "it.json", name: "italian" },
    { code: "nl", iso: "nl-BE", file: "nl.json", name: "dutch" },
  ],
  loadLanguagesAsync: true,
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "siteLang",
    onlyOnRoot: true,
  },
  vueI18nLoader: true,
  skipSettingLocaleOnNavigate: true,
  vueI18n: {
    messages: { en, fr, it, nl },
  },
};
