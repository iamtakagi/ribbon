import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/db/schema",
  driver: "better-sqlite",
  dbCredentials: {
    url: "db.sqlite",
  },
  verbose: true,
  strict: true,
  out: "./migrations",
});