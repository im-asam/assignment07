import { MongoClient, type Db } from "mongodb";

/**
 * MongoDB connection for Better Auth.
 *
 * Set MONGODB_URI to your MongoDB Atlas (or any MongoDB) connection string,
 * e.g. mongodb+srv://<user>:<password>@<cluster>.mongodb.net/bazar-dor
 *
 * The client connects lazily on first use, so importing this module is safe
 * during `next build` even without the env var set. In production the env
 * var must be present or auth operations will fail to connect.
 */

const uri =
  process.env.MONGODB_URI ??
  // Build-time placeholder: never actually connected to (no I/O happens
  // until the first DB operation, by which point the real URI must be set).
  "mongodb://localhost:27017/bazar-dor-build-placeholder";

declare global {
  // Reuse the client across HMR reloads in dev; on serverless each isolate
  // keeps its own (the driver pools connections per isolate).
  var _mongoClient: MongoClient | undefined;
}

const mongoClient =
  global._mongoClient ?? (global._mongoClient = new MongoClient(uri));

/** MongoDB database handle (database name comes from the URI). */
export const db: Db = mongoClient.db();

export { mongoClient };
