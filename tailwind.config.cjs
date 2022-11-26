/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      transitionProperty: {
        maxHeight: "max-height",
      },
      display: ["group-hover"],
      cursor: {
        newTab: "url('/new-tab.png') 10 10,pointer",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
