import i18n from "i18next";
import Backend from "i18next-http-backend";
import languagedetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(Backend)
    .use(languagedetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: "/assets/locales/{{lng}}/translation.json",
        },
        detection: {
            order: ['cookie', 'localStorage',],
            caches: ['localStorage', "cookie"],
        },
        // lng: "en",
        fallbackLng: "en",
        //disabled in production
        debug: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ",",
        },
        react: {
            wait: true,
        },
    });
