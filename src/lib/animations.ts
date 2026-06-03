import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(
  animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'stagger',
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    childSelector?: string;
  }
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      delay = 0,
      duration = 0.6,
      stagger = 0.1,
      start = 'top 85%',
      childSelector,
    } = options || {};

    let targets: gsap.TweenTarget = el;
    if (childSelector) {
      targets = el.querySelectorAll(childSelector);
    }

    const animations: Record<string, gsap.TweenVars> = {
      fadeIn: { opacity: 0, y: 0 },
      slideUp: { opacity: 0, y: 40 },
      slideLeft: { opacity: 0, x: -40 },
      stagger: { opacity: 0, y: 30 },
    };

    const fromVars = animations[animationType] || animations.fadeIn;

    gsap.set(targets, fromVars);

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: childSelector ? stagger : 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animationType, options]);

  return ref;
}

export function useHeroAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const nameChars = el.querySelectorAll('.hero-char');
    const subtitle = el.querySelector('.hero-subtitle');
    const cta = el.querySelector('.hero-cta');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      nameChars,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.03 }
    )
      .fromTo(
        subtitle,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return ref;
}

export function useAccordionAnimation() {
  const toggle = (contentEl: HTMLElement, isOpen: boolean) => {
    if (isOpen) {
      gsap.to(contentEl, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  };

  return { toggle };
}
