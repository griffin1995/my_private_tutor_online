import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { MongodbLevel } from "mongodb-level";

// CONTEXT7 SOURCE: /tinacms/docs - Local database for development, MongoDB for production
const isLocal = process.env['TINA_PUBLIC_IS_LOCAL'] === "true";

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      databaseAdapter: new MongodbLevel<string, Record<string, any>>({
        collectionName: "tinacms",
        dbName: "tinacms",
        mongoUri: process.env['MONGODB_URI']!,
      }),
      namespace: process.env['GITHUB_BRANCH'] || 'main',
    });