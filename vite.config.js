import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // or 'prompt' for user interaction
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Todo App",
        short_name: "Todo",
        description: "A simple todo app built by Omar Yousry",
        theme_color: "#1a1a1a",
        icons: [
          {
            src: "/todo-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/todo-icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/todo-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
