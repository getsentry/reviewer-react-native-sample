import * as Sentry from '@sentry/react-native';

export function initSentry(): void {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    environment: __DEV__ ? 'development' : 'production',
    sendDefaultPii: false,
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
  });
}
