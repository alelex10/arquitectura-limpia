/// <reference types="vitest/config" />
import { defineConfig } from "vite";

// https://vite.dev/config/

import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
});
