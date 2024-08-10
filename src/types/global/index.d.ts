import { Environment } from 'types/environment';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_APP_ENV: Environment;

      EXPO_PUBLIC_BACKEND_URL: string;
    }
  }
}
