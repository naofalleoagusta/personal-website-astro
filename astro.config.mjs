import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import image from "@astrojs/image";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  markdown: {
    drafts: true,
  },
  site: "https://naofalleoagusta.xyz",
  integrations: [
    tailwind(),
    react(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    sitemap({
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date("2022-11-27"),
    }),
  ],
});
