import { useHeroAnimation } from '../lib/animations';
import { HERO_LINKS } from '../data/constants';
import { Github, Linkedin, FileText, ArrowDown } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  LinkedIn: Linkedin,
  Resume: FileText,
};

export default function HeroSection() {
  const ref = useHeroAnimation();

  const name = 'Naofal Leo Agusta';
  const nameChars = name.split('');

  return (
    <section
      ref={ref}
      className="min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-12"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Label */}
        <div className="hero-subtitle mb-6 opacity-0">
          <span className="inline-block px-3 py-1 text-xs font-mono font-medium uppercase tracking-widest border-2 border-[var(--color-accent)] text-[var(--color-accent)]">
            Software Engineer
          </span>
        </div>

        {/* Name */}
        <h1 className="mb-6 pb-2">
          <span className="sr-only">{name}</span>
          <div className="overflow-hidden pb-6">
            <span aria-hidden="true" className="block font-display font-bold text-[var(--color-text-primary)] leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
            >
              {nameChars.map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block opacity-0"
                  style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </div>
        </h1>

        {/* Description */}
        <p className="hero-subtitle opacity-0 max-w-xl text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
          Based in Palembang, Indonesia. A front-end developer with full-stack experience.
          My daily toolkit includes TypeScript, React, GraphQL, and Node.js.
          Currently building digital products at GovTech Procurement.
        </p>

        {/* CTA Links */}
        <div className="hero-cta opacity-0 flex flex-wrap gap-3">
          {HERO_LINKS.map((link) => {
            const Icon = iconMap[link.text] || Github;
            return (
              <a
                key={link.text}
                href={link.href}
                target={link.newTab ? '_blank' : undefined}
                rel={link.newTab ? 'noopener noreferrer' : undefined}
                className="brutalist-button gap-2"
              >
                <Icon className="w-4 h-4" />
                {link.text}
              </a>
            );
          })}
        </div>

        {/* Scroll indicator */}
        <div className="hero-subtitle opacity-0 mt-16 sm:mt-24 flex items-center gap-3 text-[var(--color-text-secondary)]">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
