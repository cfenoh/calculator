import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "/robots.txt",
        "/apple-touch-icon.png",
        "logo.svg",
      ],
      manifest: {
        name: "TipSmart",
        short_name: "TipSmart",
        description: "Find and calculate the right tips in Canada",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
