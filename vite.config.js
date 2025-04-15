import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": {
      ...process.env, // Inject environment variables
      API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3000", // Add fallback for API base URL
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
