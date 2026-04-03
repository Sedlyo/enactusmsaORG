import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig({
  // Make sure assets work correctly on Netlify
  base: '/',
  build: {
    outDir: 'dist',   // Vite default, matches Netlify's publish folder
    sourcemap: true,  // optional, useful for debugging
    emptyOutDir: true // clear dist folder on every build
  },
  plugins: [
    inspectAttr(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});