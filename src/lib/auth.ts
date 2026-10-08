import { betterAuth } from "better-auth";
import { kyselyAdapter } from "@better-auth/kysely-adapter";
import { db } from "./db";

/**
 * Social providers are enabled only when their env vars are present,
 * so the app builds and runs without Google/GitHub OAuth configured.
 */
const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: kyselyAdapter(db),
  emailAndPassword: { enabled: true },
  socialProviders,
  session: {
    // Signed JWT session data in a cookie: session validation becomes
    // stateless and works from ANY serverless isolate (proxy, pages, API),
    // without needing the ephemeral /tmp SQLite database.
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days — matches session lifetime
    },
  },
});

/** Which social providers are actually configured (for the auth UI). */
export const configuredProviders = {
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
};
