import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { BASE_URL } from '../data/constants';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Naofal Leo Agusta',
    description:
      'Personal website and blog of Naofal Leo Agusta, a software engineer based in Palembang, Indonesia.',
    site: context.site ?? BASE_URL,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.data.permalink}/`,
        categories: post.data.tags ?? [],
      })),
    customData: `<language>en-us</language>`,
  });
}
