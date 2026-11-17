# AGENTS.md

A small Expo app that uses the Sentry React Native SDK. The repository is a test bed for the Sheepdog auto-reviewer, so its pull requests are small and on purpose cover different levels of risk.

## Layout

- `src/App.tsx` is the only screen: a cart with three products and a button that sends a test error.
- `src/sentry.ts` initializes the Sentry SDK.
- `src/utils/` holds pure functions without React or Sentry imports. Tests for them are in `src/__tests__/`.
- `app.json` configures Expo and the Sentry config plugin. `ios/` and `android/` are generated and are not in the repository.

## Commands

Run both before you open a pull request:

```bash
npm run typecheck
npm test
```

Add dependencies with `npx expo install <package>`, so that Expo picks a version that matches the SDK.

## Review rules

- Changes to `src/sentry.ts` and to the Sentry plugin in `app.json` need a careful review. `sendDefaultPii` must stay `false`. A higher `tracesSampleRate` in production costs quota.
- The DSN comes from the `EXPO_PUBLIC_SENTRY_DSN` environment variable. A DSN or an auth token in the code is a blocking finding.
- Money values are integer cents. A change that uses floating-point amounts for money is a blocking finding.
- A change in `src/utils/` must come with a test change in `src/__tests__/`.
- Major version updates of `expo`, `react-native`, or `@sentry/react-native` need a manual check on a device.
- Changes to `.github/` need a review by a code owner.
