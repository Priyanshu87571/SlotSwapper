// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,               // frontend runs here
    proxy: {
      '/api': {
        target: 'http://localhost:4001',  // your backend port
        changeOrigin: true,
        secure: false
      }
    }
  }
});
