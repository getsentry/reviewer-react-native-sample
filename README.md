# React Native sample for Sheepdog

This is a small [Expo](https://expo.dev) app that uses the [Sentry React Native SDK](https://docs.sentry.io/platforms/react-native/). It is a test repository for the Sheepdog auto-reviewer. Its pull requests show how the reviewer sorts changes with low and high risk.

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

`.github/sheepdog.yml` tells the Sheepdog server how to sort the pull requests of this repository into lanes. The server reads the file from the base branch of each pull request, so a pull request cannot change the rules for itself. A pull request that changes `.github/`, `src/sentry.ts`, `app.json`, or `metro.config.js` is always in the `manual` lane.

The lanes `safe` and `docs` allow "Approve and merge" in the Sheepdog web app. A pull request gets there only when all of these are true:

- It matches the authors, paths, and size of the lane.
- All checks of its head commit are green.
- It has a classification of its current head commit with a score of 2 or less. Click "Classify" in the Sheepdog web app to make one.

For `safe`, the author must be Dependabot and the update must not be a major version update. The Sheepdog web app shows notes on each pull request that say which condition is missing. "Approve and merge" asks for a confirmation, approves the pull request with your GitHub account, and merges it.

`AGENTS.md` has the instructions that the AI review and the classification use.
