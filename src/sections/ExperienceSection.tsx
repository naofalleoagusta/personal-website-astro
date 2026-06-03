import { useState } from 'react';
import { useAccordionAnimation } from '../lib/animations';
import type { ExperienceType } from '../types';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceType[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { toggle } = useAccordionAnimation();

  const handleToggle = (index: number, contentId: string) => {
    const contentEl = document.getElementById(contentId);
    if (!contentEl) return;

    if (openIndex === index) {
      toggle(contentEl, false);
      setOpenIndex(null);
    } else {
      // Close previous
      if (openIndex !== null) {
        const prevEl = document.getElementById(`exp-content-${openIndex}`);
        if (prevEl) toggle(prevEl, false);
      }
      toggle(contentEl, true);
      setOpenIndex(index);
    }
  };

  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 border-t-2 border-[var(--color-border)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] mb-2 block">
            Work History
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)]">
            Professional Experience
          </h2>
        </div>

        <div className="border-2 border-[var(--color-border)]">
          {experiences.map((exp, index) => {
            const contentId = `exp-content-${index}`;
            const isOpen = openIndex === index;

            return (
              <div
                key={exp.name}
                className={`exp-item border-b-2 border-[var(--color-border)] last:border-b-0 ${isOpen ? 'bg-[var(--color-bg-secondary)]' : ''}`}
              >
                <button
                  onClick={() => handleToggle(index, contentId)}
                  className="w-full flex items-start sm:items-center justify-between gap-4 p-4 sm:p-6 text-left hover:bg-[var(--color-bg-secondary)] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                      <h3 className="font-display font-bold text-base sm:text-lg text-[var(--color-text-primary)] truncate">
                        {exp.name}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-[var(--color-border)] text-[var(--color-text-secondary)] shrink-0">
                        {exp.employmentType}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-mono text-[var(--color-text-secondary)]">
                      {exp.startDate} — {exp.endDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {exp.website && (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex w-8 h-8 items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Visit ${exp.name} website`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <div
                      className={`w-8 h-8 flex items-center justify-center border border-[var(--color-border)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <ChevronDown className="w-4 h-4 text-[var(--color-text-primary)]" />
                    </div>
                  </div>
                </button>

                <div
                  id={contentId}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <div className="px-4 sm:px-6 pb-6 pt-2">
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {exp.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-primary)] mb-2">
                          Key Contributions
                        </h4>
                        <ul className="space-y-1.5">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                              <span className="w-1.5 h-1.5 mt-1.5 shrink-0 bg-[var(--color-accent)]" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-primary)] mb-2">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 text-xs font-mono border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
