import path from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__test__/setupTests.js"],
    include: ["src/__test__/**/*.test.{js,jsx,ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/store/**/*.{js,jsx,ts,tsx}", "src/components/DominoHUD/**/*.{js,jsx,ts,tsx}"],
    },
  },
});
