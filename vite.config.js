import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
   build: {
    chunkSizeWarningLimit: 1000, // raises threshold to 1MB
  },
});
