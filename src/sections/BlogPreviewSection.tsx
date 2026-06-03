import { useScrollAnimation } from '../lib/animations';
import { ArrowRight } from 'lucide-react';
import type { CollectionEntry } from 'astro:content';

interface BlogPreviewProps {
  posts: CollectionEntry<'blog'>[];
}

export default function BlogPreviewSection({ posts }: BlogPreviewProps) {
  const ref = useScrollAnimation('stagger', {
    childSelector: '.post-row',
    stagger: 0.1,
    start: 'top 85%',
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 border-t-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] mb-2 block">
              Writing
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)]">
              Latest Blog Posts
            </h2>
          </div>
          <a
            href="/blog"
            className="brutalist-button gap-2 text-sm"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div>
          {posts.map((post, index) => (
            <a
              key={post.id}
              href={`/blog/${post.data.permalink}`}
              className={`post-row block group py-6 sm:py-8 transition-all ${
                index !== posts.length - 1 ? 'border-b-2 border-[var(--color-border)]' : ''
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-start">
                {/* Date */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <span className="text-sm sm:text-base font-mono text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {formatDate(post.data.date)}
                  </span>
                </div>

                {/* Title + Excerpt */}
                <div className="sm:col-span-7 lg:col-span-8">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-2 leading-tight">
                    {post.data.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                    {post.data.description}
                  </p>
                </div>

                {/* Meta */}
                <div className="sm:col-span-3 lg:col-span-3 flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 text-xs text-[var(--color-text-secondary)]">
                  <span className="font-mono">{post.data.readingTime}</span>
                  {(post.data.tags || []).length > 0 && (
                    <div className="flex flex-wrap justify-end gap-1">
                      {(post.data.tags || []).slice(0, 2).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 text-[10px] font-mono border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                          {tag}
                        </span>
                      ))}
                      {(post.data.tags || []).length > 2 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-text-secondary)]">
                          +{(post.data.tags || []).length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
