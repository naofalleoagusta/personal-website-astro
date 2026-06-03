import { useEffect, useState } from 'react';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const h2Headings = headings.filter((h) => h.depth === 2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    h2Headings.forEach((heading) => {
      const el = document.getElementById(heading.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [h2Headings]);

  if (h2Headings.length === 0) return null;

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 border-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]"
        >
          <span className="text-xs font-mono uppercase tracking-widest">On this page</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="border-2 border-t-0 border-[var(--color-border)] bg-[var(--color-bg-primary)] p-3">
            <ul className="space-y-2">
              {h2Headings.map((heading) => (
                <li key={heading.slug}>
                  <a
                    href={`#${heading.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-xs font-mono transition-colors ${
                      activeId === heading.slug
                        ? 'text-[var(--color-accent)] border-l-2 border-[var(--color-accent)] pl-2'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] pl-2 border-l-2 border-transparent'
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block sticky top-24 self-start max-w-[220px] max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="border-2 border-[var(--color-border)] p-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">
            On this page
          </h3>
          <ul className="space-y-2">
            {h2Headings.map((heading) => (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  className={`block text-xs font-mono transition-all ${
                    activeId === heading.slug
                      ? 'text-[var(--color-accent)] border-l-2 border-[var(--color-accent)] pl-2'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] pl-2 border-l-2 border-transparent'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
