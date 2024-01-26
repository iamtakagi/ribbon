/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: "src",
  ignoredRouteFiles: ["**/.*", "**/__tests__/**", "**/*.test.*"],
  server: "./src/index.ts",
  serverConditions: ["worker", "browser"],
  serverMainFields: ["browser", "module", "main"],
  serverMinify: false,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
};
