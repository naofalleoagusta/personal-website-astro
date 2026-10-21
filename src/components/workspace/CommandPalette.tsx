import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { navigate } from 'astro:transitions/client';
import { FILE_GLYPH, WS_EVENT, type FileKind, type WorkspaceFile } from '../../lib/workspace';
import { THEMES, setTheme } from '../../lib/theme';
import { SOCIAL_LINKS } from '../../data/constants';

interface Item {
  id: string;
  label: string;
  hint?: string;
  kind?: FileKind;
  group: 'Files' | 'Actions';
  run: () => void;
}

function openExternal(href: string) {
  if (href.startsWith('mailto:')) window.location.href = href;
  else window.open(href, '_blank', 'noopener,noreferrer');
}

/** Rank by subsequence match: contiguous matches and earlier starts score higher. */
function score(query: string, text: string): number {
  if (!query) return 1;
  const haystack = text.toLowerCase();
  const substring = haystack.indexOf(query);
  if (substring !== -1) return 1000 - substring;
  let from = 0;
  for (const char of query) {
    const found = haystack.indexOf(char, from);
    if (found === -1) return 0;
    from = found + 1;
  }
  return 100 - from;
}

/** ⌘K / Ctrl+K: jump to any File or run a Workspace action. */
export default function CommandPalette({ files }: { files: WorkspaceFile[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const items = useMemo<Item[]>(
    () => [
      ...files.map((file) => ({
        id: file.path,
        label: file.path,
        hint: file.detail,
        kind: file.kind,
        group: 'Files' as const,
        run: () => (file.external ? openExternal(file.href) : navigate(file.href)),
      })),
      ...THEMES.map((theme) => ({
        id: `theme:${theme}`,
        label: `Theme: ${theme}`,
        group: 'Actions' as const,
        run: () => setTheme(theme),
      })),
      {
        id: 'view:terminal',
        label: 'View: Toggle Terminal',
        hint: 'Ctrl+`',
        group: 'Actions',
        run: () => window.dispatchEvent(new Event(WS_EVENT.terminal)),
      },
      {
        id: 'view:explorer',
        label: 'View: Toggle Explorer',
        hint: 'Ctrl+B',
        group: 'Actions',
        run: () => window.dispatchEvent(new Event(WS_EVENT.explorer)),
      },
      ...SOCIAL_LINKS.map((link) => ({
        id: `social:${link.text}`,
        label: `Open: ${link.text}`,
        hint: link.href.replace(/^(https:\/\/(www\.)?|mailto:)/, ''),
        group: 'Actions' as const,
        run: () => openExternal(link.href),
      })),
    ],
    [files]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .map((item) => ({ item, score: score(q, `${item.label} ${item.hint ?? ''}`) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }, [items, query]);

  const close = () => {
    setOpen(false);
    returnFocus.current?.focus();
  };

  useEffect(() => {
    const onToggle = () =>
      setOpen((prev) => {
        if (!prev) {
          returnFocus.current = document.activeElement as HTMLElement | null;
          setQuery('');
          setActive(0);
        }
        return !prev;
      });
    window.addEventListener(WS_EVENT.palette, onToggle);
    return () => window.removeEventListener(WS_EVENT.palette, onToggle);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    item.run();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => (i + step + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  // An empty fragment, not null: Astro's React renderer check rejects islands that render null
  if (!open) return <></>;

  return (
    // Backdrop click closes; Escape is handled on the input, so no key handler is needed here
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-[12vh]"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-md border border-line bg-panel shadow-2xl"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search files and actions…"
          className="w-full border-b border-line bg-bg px-4 py-3 text-sm text-fg outline-none placeholder:text-faint focus-visible:outline-none"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-results"
          aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
          autoComplete="off"
          spellCheck={false}
        />
        <ul ref={listRef} id="palette-results" role="listbox" className="max-h-[50vh] overflow-y-auto py-1 text-[0.8125rem]">
          {results.length === 0 && <li className="px-4 py-3 text-muted">No matching files or actions</li>}
          {results.map((item, i) => (
            // Options are driven from the combobox input (aria-activedescendant), not focused
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              key={item.id}
              id={`palette-${item.id}`}
              role="option"
              aria-selected={i === active}
              className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 ${
                i === active ? 'bg-select text-fg' : 'text-muted'
              }`}
              onMouseMove={() => setActive(i)}
              onClick={() => choose(item)}
            >
              {item.kind ? (
                <span className="ws-badge" data-kind={item.kind} aria-hidden="true">
                  {FILE_GLYPH[item.kind]}
                </span>
              ) : (
                <span className="ws-badge text-accent" aria-hidden="true">
                  ›
                </span>
              )}
              <span className="flex-none text-fg">{item.label}</span>
              {item.hint && <span className="truncate text-faint">{item.hint}</span>}
              {i === active && <span className="ml-auto flex-none text-[0.6875rem] text-faint">{item.group}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
