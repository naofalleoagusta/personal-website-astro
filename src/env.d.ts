declare module 'astro:content' {
  interface CollectionEntry<C extends keyof typeof import('./content/config').collections> {
    id: string;
    slug: string;
    body: string;
    collection: C;
    data: (typeof import('./content/config').collections)[C]['schema']['_type'];
    render(): Promise<{
      Content: import('astro').MarkdownInstance<Record<string, unknown>>['Content'];
      headings: import('astro').MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, unknown>;
    }>;
  }
}
