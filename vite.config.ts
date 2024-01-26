import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isStorybook = process.argv[1]?.includes("storybook");

export default defineConfig({
  plugins: [
    !isStorybook &&
      remix({
        ignoredRouteFiles: [
          "**/*.test.tsx",
          "**/*.spec.tsx",
          "**/*.story.tsx",
          "**/*.stories.tsx",
        ],
      }),
    tsconfigPaths(),
  ],
});