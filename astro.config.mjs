import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  markdown: {
    drafts: true
  },
  site: "https://naofalleoagusta.xyz",
  integrations: [tailwind(), react(), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), sitemap({
    changefreq: "weekly",
    priority: 0.7,
    lastmod: new Date("2022-11-27")
  }), partytown({
    // Adds dataLayer.push as a forwarding-event.
    config: {
      config: {
        debug: false
      },
      forward: ["dataLayer.push"]
    }
  }), mdx()]
  // output: "server",
  // adapter: vercel()
});