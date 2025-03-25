import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import * as schema from "./schema/schema";

const sqlite = new Database("reflection-machine.db");
const db = drizzle(sqlite, { schema });

console.log("Running migrations...");
migrate(db, { migrationsFolder: "./src/db/migrations" });
console.log("Migrations completed successfully!");