import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  driver: "mysql2",
  verbose: true,
  strict: true,
  out: "./migrations",
});