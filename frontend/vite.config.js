import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api/v1": {
        target: "http://localhost:3030",
        changeOrigin: true,
        rewrite: (path) => path.replace("^/api/v1", ""),
      },
    },
  },
});
