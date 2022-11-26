import type { LinkType } from "../types";

export const BASE_URL = "https://naofalleoagusta.xyz/";

export const LINKS: LinkType[] = [
  {
    href: "https://github.com/naofalleoagusta",
    text: "github",
    icon: "github",
    classes: "mr-2 mt-2",
    newTab: true,
  },
  {
    href: "https://www.linkedin.com/in/naofal-leo-agusta/",
    text: "linkedin",
    icon: "linkedin",
    classes: "mr-2 mt-2",
    newTab: true,
  },
  {
    href: "https://www.linkedin.com/in/naofal-leo-agusta/",
    text: "resume",
    icon: "resume",
    classes: "mt-2",
    newTab: true,
  },
];

export const SOCIAL_LINKS: LinkType[] = [
  {
    href: "https://github.com/naofalleoagusta",
    text: "Github",
    newTab: true,
  },
  {
    href: "https://www.linkedin.com/in/naofal-leo-agusta/",
    text: "LinkedIn",
    newTab: true,
  },
  {
    href: "https://instagram.com/naofalleoagusta/",
    text: "Instagram",
    newTab: true,
  },
];

export const NAVIGATION_LINKS: LinkType[] = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/about",
    text: "About",
  },
];

export const BLOG_LINKS: LinkType[] = [
  {
    href: "/blog",
    text: "All posts",
  },
];

export const FOOTER_LINKS: { title: string; links: LinkType[] }[] = [
  {
    title: "Socials",
    links: SOCIAL_LINKS,
  },
  {
    title: "Navigations",
    links: NAVIGATION_LINKS,
  },
  {
    title: "Blog",
    links: BLOG_LINKS,
  },
];

export const TOOLS_ICON: Record<string, string> = {
  React: "react.svg",
  GraphQL: "graphql.svg",
  Javascript: "js.svg",
  Bootstrap: "bootstrap.svg",
  "Node.js": "node.svg",
  "Apollo GraphQL": "apollo.svg",
  CSS: "css.svg",
  PostgreSQL: "postgre.svg",
  MySql: "mysql.svg",
  jQuery: "jquery.svg",
  PHP: "php.svg",
  Laravel: "laravel.svg",
  CodeIgniter: "codeigniter.svg",
  SASS: "sass.svg",
  "Next.js": "next.svg",
  LESS: "less.svg",
  Redux: "redux.svg",
  Typescript: "ts.svg",
  SEO: "seo.svg",
  "Material-UI": "mui.svg",
  Tailwind: "tailwind.svg",
  Astro: "astro.svg",
};
