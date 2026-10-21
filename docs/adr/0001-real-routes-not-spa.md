# Every File is a real route, not SPA state

The site looks like a code editor, so a single-page app that swaps Files in client state would be the obvious build. We chose the opposite: every File is a real Astro route, and Astro View Transitions (`<ClientRouter />`) keep the Workspace mounted between navigations. That keeps deep links, SEO, RSS, the sitemap and the existing URLs (`/about`, `/blog/[slug]`) working. Editor-like state (open Tabs, Terminal, Theme) lives on the client and is layered on top. Don't "fix" this by moving to client-side routing.
