import Database from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

/**
 * SQLite via better-sqlite3. On serverless (e.g. Vercel) only /tmp is
 * writable, so set BETTER_AUTH_DATABASE_URL=/tmp/bazar-dor.db there.
 * Data on serverless is ephemeral — fine for this assignment demo.
 */
const dbFile = process.env.BETTER_AUTH_DATABASE_URL ?? "./bazar-dor.db";

const sqlite = new Database(dbFile);

// Create Better Auth tables if they don't exist (matches the default
// better-auth schema for the kysely sqlite adapter).
sqlite.exec(`
CREATE TABLE IF NOT EXISTS "user" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "emailVerified" INTEGER NOT NULL DEFAULT 0,
  "image" TEXT,
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "session" (
  "id" TEXT PRIMARY KEY,
  "expiresAt" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "account" (
  "id" TEXT PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "accessTokenExpiresAt" TEXT,
  "refreshTokenExpiresAt" TEXT,
  "scope" TEXT,
  "password" TEXT,
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "verification" (
  "id" TEXT PRIMARY KEY,
  "identifier" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "expiresAt" TEXT NOT NULL,
  "createdAt" TEXT,
  "updatedAt" TEXT
);
`);

export const db = new Kysely({
  dialect: new SqliteDialect({ database: sqlite }),
});
