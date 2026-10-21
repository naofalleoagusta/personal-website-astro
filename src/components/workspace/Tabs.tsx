import { useEffect, useRef, useState } from 'react';
import { navigate } from 'astro:transitions/client';
import { FILE_GLYPH, type FileKind } from '../../lib/workspace';
import { ICONS } from '../../lib/icons';

export interface Tab {
  href: string;
  name: string;
  kind: FileKind;
}

const STORAGE_KEY = 'ws:tabs';

function loadTabs(): Tab[] {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTabs(tabs: Tab[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
  } catch {
    // storage blocked: Tabs just won't survive a reload
  }
}

/** Open Tabs for this visit. Persisted across navigations, so `current` changes in place. */
export default function Tabs({ current }: { current: Tab }) {
  const [tabs, setTabs] = useState<Tab[]>([current]);
  const activeRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const stored = loadTabs();
    const next = stored.some((t) => t.href === current.href)
      ? stored.map((t) => (t.href === current.href ? current : t))
      : [...stored, current];
    saveTabs(next);
    setTabs(next);
  }, [current.href, current.name, current.kind]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [current.href, tabs.length]);

  const close = (href: string) => {
    const index = tabs.findIndex((t) => t.href === href);
    const next = tabs.filter((t) => t.href !== href);
    saveTabs(next);
    setTabs(next);
    if (href === current.href) {
      const neighbour = next[index] ?? next[index - 1];
      navigate(neighbour?.href ?? '/');
    }
  };

  return (
    <nav className="flex-none border-b border-line bg-panel max-md:hidden" aria-label="Open tabs" data-js-only>
      <ul className="flex h-9 overflow-x-auto overflow-y-hidden">
        {tabs.map((tab) => {
          const active = tab.href === current.href;
          return (
            <li
              key={tab.href}
              ref={active ? activeRef : undefined}
              className={`group flex flex-none items-center border-r border-line text-[0.8125rem] ${
                active
                  ? 'bg-bg text-fg shadow-[inset_0_1px_0_var(--color-accent)]'
                  : 'text-muted hover:bg-raised hover:text-fg'
              }`}
              onAuxClick={(e) => {
                if (e.button === 1) {
                  e.preventDefault();
                  close(tab.href);
                }
              }}
            >
              <a
                href={tab.href}
                className="flex h-full items-center pl-2 pr-1"
                aria-current={active ? 'page' : undefined}
              >
                <span className="ws-badge" data-kind={tab.kind} aria-hidden="true">
                  {FILE_GLYPH[tab.kind]}
                </span>
                {tab.name}
              </a>
              <button
                type="button"
                className={`mr-1 flex size-5 items-center justify-center rounded hover:bg-hover ${
                  active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100'
                }`}
                onClick={() => close(tab.href)}
                aria-label={`Close ${tab.name}`}
              >
                <svg
                  className="ws-icon size-3.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: ICONS.close }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
