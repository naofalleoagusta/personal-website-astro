import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date().or(z.string()).transform((val) => new Date(val)),
      readingTime: z.string(),
      ogImage: image().optional(),
      permalink: z.string(),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = {
  blog: blogCollection,
};
