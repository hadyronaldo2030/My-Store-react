import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './TranslateEN.json';
import arTranslation from './TranslateAR.json';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation }
    },
    lng: savedLanguage, // اللغة المخزنة في localStorage أو اللغة الافتراضية
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  });

  
export default i18n;
