import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// Initialize SQLite database
const sqlite = new Database("reflection-machine.db");

// Create Drizzle database instance with our schema
export const db = drizzle(sqlite, { schema });

// Export type for our database
export type DB = typeof db;