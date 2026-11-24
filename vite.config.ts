import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    clearMocks: true,
    restoreMocks: true,
    setupFiles: "./tests/setup.ts",
    exclude: [...configDefaults.exclude, "build/**"],
  },
});