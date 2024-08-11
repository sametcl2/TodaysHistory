import { ReactNode } from 'react'
import { TurkeyIcon, UKIcon } from 'assets/svg'

export enum SupportedLanguages {
  ENGLISH = 'en',
  TURKISH = 'tr'
}

export const supportedLanguages: {
  [key in SupportedLanguages]: {
    value: SupportedLanguages
    label: string
    flag: string
    icon: ReactNode
  }
} = {
  [SupportedLanguages.TURKISH]: {
    value: SupportedLanguages.TURKISH,
    label: 'Türkçe',
    flag: '🇹🇷',
    icon: <TurkeyIcon width={24} height={24} />
  },
  [SupportedLanguages.ENGLISH]: {
    value: SupportedLanguages.ENGLISH,
    label: 'English',
    flag: '🇬🇧',
    icon: <UKIcon width={24} height={24} />
  }
}
