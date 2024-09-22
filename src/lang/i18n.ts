import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'
import en from 'assets/locales/en/translation.json'
import { SupportedLanguages } from 'constants/language'

export const getDeviceLanguage = (): string => {
  const locales = getLocales()
  return locales[0].languageCode || SupportedLanguages.ENGLISH
}

export const initI18N = () => {
  // eslint-disable-next-line import/no-named-as-default-member
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en
      }
    },
    ns: ['translation'],
    lng: getDeviceLanguage(),
    fallbackLng: SupportedLanguages.ENGLISH,
    returnEmptyString: false,
    interpolation: {
      escapeValue: false
    }
  })
}

export default i18n
