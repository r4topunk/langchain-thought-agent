import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema/schema";

const sqlite = new Database("reflection-machine.db");
export const db = drizzle(sqlite, { schema });