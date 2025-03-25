import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  driver: "pglite",
  verbose: true,
  strict: true,
});