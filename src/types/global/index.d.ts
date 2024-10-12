import { Environment } from 'types/environment'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_APP_ENV: Environment

      EXPO_PUBLIC_BACKEND_URL: string

      EXPO_PUBLIC_MIXPANEL_TOKEN: string
    }
  }

  declare module '*.svg' {
    import React from 'react'
    const content: React.FC<React.SVGProps<SVGSVGElement>>
    // eslint-disable-next-line import/no-default-export
    export default content
  }
}
