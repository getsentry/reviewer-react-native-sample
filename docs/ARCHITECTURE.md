# Architecture

The app has one screen. `index.ts` registers `src/App.tsx` as the root component. `App.tsx` calls `initSentry()` from `src/sentry.ts` once, when the module loads, and wraps the component with `Sentry.wrap` so that the SDK can trace the app start and catch render errors.

The cart state is a list of products with a quantity. The screen keeps it in React state. The price logic is in `src/utils/cart.ts`. It uses integer cents, so that sums have no rounding errors.

Each tap on an "Add" button adds a Sentry breadcrumb with the category `cart`. The "Send test error" button sends a handled error to Sentry.
