import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
// import dotenv from "dotenv";
// require("dotenv").config()
// dotenv.config();
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        remoteA: `http://localhost:8081/assets/remoteEntry.js`,
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
