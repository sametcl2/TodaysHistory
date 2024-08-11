import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import { Platform, NativeModules } from 'react-native'
import { SupportedLanguages } from 'constants/language'
import en from 'assets/locales/en/translation.json'

const getDeviceLang = () => {
  const appLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager?.settings.AppleLocale || NativeModules.SettingsManager?.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier

  return appLanguage?.search(/-|_/g) !== -1 ? appLanguage?.slice(0, 2) : appLanguage
}

export const getDeviceLanguage = (): string => {
  const locales = getDeviceLang()
  return locales
}

export const initI18N = () => {
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
