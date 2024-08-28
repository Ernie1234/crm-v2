/**
 * An array of routes that are accessible to the public
 * these routes do not require authentication.
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are that are use for authentication
 * these routes will redirect logged in user to dashboard page
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forget-password",
  "/auth/new-password",
];

/**
 * The prefix for API auth route
 * Routes that start with this prefix are used to API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logged in user
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
