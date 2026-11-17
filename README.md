# React Native sample for Review Queue

This is a small [Expo](https://expo.dev) app that uses the [Sentry React Native SDK](https://docs.sentry.io/platforms/react-native/). It is a test repository for the Review Queue auto-reviewer. Its pull requests show how the reviewer sorts changes with low and high risk.

## Run

You need Node.js 22.13 or later.

```bash
npm install
EXPO_PUBLIC_SENTRY_DSN=<your DSN> npx expo start
```

The Sentry SDK has native code, so the app needs a development build. Run `npx expo run:ios` or `npx expo run:android`. Expo Go does not work.

## Check

```bash
npm run typecheck
npm test
```

## Review rules

`.github/review-queue.yml` tells the Review Queue server which pull requests it can approve and merge without a careful human review. The server reads the file from the base branch of each pull request, so a pull request cannot change the rules for itself. `AGENTS.md` has the instructions that the AI review and the classification use.
