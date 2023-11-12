import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import partytown from "@astrojs/partytown"
import mdx from "@astrojs/mdx"

import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
  markdown: {
    drafts: true,
  },
  site: "https://naofalleoagusta.xyz",
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date("2023-07-06"),
    }),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        config: {
          debug: false,
        },
        forward: ["dataLayer.push"],
      },
    }),
    mdx(),
  ],
  output: "hybrid",
  adapter: vercel({
    functionPerRoute: true,
    maxDuration: 10,
    speedInsights: {
      enabled: true,
    },
  }),
})
