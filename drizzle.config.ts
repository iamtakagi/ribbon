import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/db/schema.ts",
  driver: "mysql2",
  verbose: true,
  strict: true,
  out: "./migrations",
});