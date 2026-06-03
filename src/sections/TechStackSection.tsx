import { useScrollAnimation } from '../lib/animations';
import { TECH_STACK } from '../data/constants';

const techIcons: Record<string, string> = {
  React: 'react',
  TypeScript: 'typescript',
  'Node.js': 'node',
  Tailwind: 'tailwind',
  GraphQL: 'graphql',
  'Next.js': 'next',
  'Vite.js': 'vite',
  OpenCode: 'opencode',
};

export default function TechStackSection() {
  const ref = useScrollAnimation('stagger', {
    childSelector: '.tech-item',
    stagger: 0.08,
    start: 'top 85%',
  });

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 border-t-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] mb-2 block">
              Tools & Technologies
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)]">
              Favorite Tech Stack
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">
            The technologies I reach for most often when building modern web applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {TECH_STACK.map((tech) => (
            <div
              key={tech}
              className="tech-item brutalist-card p-4 sm:p-6 flex flex-col items-center justify-center gap-3 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <TechIcon name={techIcons[tech] || 'code'} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] text-center">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechIcon({ name }: { name: string }) {
  // Simple SVG icons for tech stack
  const icons: Record<string, JSX.Element> = {
    react: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[var(--color-accent)]">
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[var(--color-accent)]">
        <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 18V12M12 12L9 14M12 12L15 14M8 8h8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[var(--color-accent)]">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zM12 22V12M12 12L4 7M12 12l8-5" />
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[var(--color-accent)]">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.51 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.49 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 12.85 9.51 11.5 7 11.5z" />
      </svg>
    ),
    graphql: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[var(--color-accent)]">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 2v10M3.34 7l8.66 5M20.66 7L12 12" />
      </svg>
    ),
    next: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[var(--color-accent)]">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 14.5V7l7 9.5h-2.5l-2-2.75V14h-2.5z" />
      </svg>
    ),
    vite: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[var(--color-accent)]">
        <path d="M12 2L4 19l8-3 8 3-8-17z" />
      </svg>
    ),
    opencode: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[var(--color-accent)]">
        <rect x="3" y="3" width="18" height="18" rx="0" />
        <path d="M7 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 15h-3" strokeLinecap="round" />
        <path d="M19 5l.5 1.5L21 7l-1.5.5L19 9l-.5-1.5L17 7l1.5-.5L19 5z" fill="currentColor" stroke="none" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[var(--color-accent)]">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  };

  return icons[name] || icons.code;
}
