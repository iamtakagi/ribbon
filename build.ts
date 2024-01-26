import esbuild from "esbuild";

esbuild
  .build({
    outfile: "build/index.js",
    entryPoints: ["src/index.ts"],
    external: ["build/*"],
    platform: "node",
    format: "esm",
    packages: "external",
    bundle: true,
    logLevel: "info",
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
