import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { navigate } from 'astro:transitions/client';
import { BLOG, README, ROOT_FILES, WS_EVENT, cwdOf, resolvePath, type WorkspaceFile } from '../../lib/workspace';
import { THEMES, isTheme, readTheme, setTheme } from '../../lib/theme';
import { SOCIAL_LINKS } from '../../data/constants';
import { ICONS } from '../../lib/icons';

interface Props {
  files: WorkspaceFile[];
  pathname: string;
}

interface Line {
  id: number;
  content: ReactNode;
}

const OPEN_KEY = 'ws:terminal';

const COMMANDS: Record<string, string> = {
  help: 'list available commands',
  ls: 'list files: ls [folder]',
  open: 'open a file: open <file> (aliases: cd, cat)',
  pwd: 'print the current folder',
  whoami: 'who is behind this workspace',
  socials: 'where to find me',
  theme: 'list themes, or switch: theme <name>',
  clear: 'clear the terminal',
};
const ALIASES: Record<string, string> = { cd: 'open', cat: 'open' };

const link = 'text-accent underline underline-offset-2';

function isMobile() {
  return window.matchMedia('(max-width: 767px)').matches;
}

/** The Workspace Terminal. Persisted across navigations, so history survives page changes. */
export default function Terminal({ files, pathname }: Props) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const cwd = cwdOf(pathname);
  const prompt = (
    <span className="flex-none">
      <span className="text-syn-str">naofal@palembang</span>
      <span className="text-muted">:</span>
      <span className="text-syn-md">~{cwd && `/${cwd}`}</span>
      <span className="text-muted">$ </span>
    </span>
  );

  const toggle = (next?: boolean) =>
    setOpen((prev) => {
      const value = next ?? !prev;
      try {
        sessionStorage.setItem(OPEN_KEY, value ? '1' : '0');
      } catch {
        // storage blocked: state only lasts for this page
      }
      return value;
    });

  useEffect(() => {
    try {
      if (sessionStorage.getItem(OPEN_KEY) === '1' && !isMobile()) setOpen(true);
    } catch {
      // storage blocked
    }
    const onToggle = () => toggle();
    window.addEventListener(WS_EVENT.terminal, onToggle);
    return () => window.removeEventListener(WS_EVENT.terminal, onToggle);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = (...content: ReactNode[]) =>
    setLines((prev) => [...prev, ...content.map((c) => ({ id: nextId.current++, content: c }))]);

  const openFile = (file: WorkspaceFile) => {
    if (file.external) {
      window.open(file.href, '_blank', 'noopener,noreferrer');
      return;
    }
    navigate(file.href);
    if (isMobile()) toggle(false);
  };

  const listing = (folder: '' | 'blog') => {
    const entries =
      folder === 'blog'
        ? files.filter((f) => f.path.startsWith('blog/') && f.kind !== 'folder')
        : [BLOG, ...ROOT_FILES];
    return (
      <span className="flex flex-wrap gap-x-6">
        {entries.map((f) => (
          <span key={f.path} className={f.kind === 'folder' ? 'text-syn-md' : undefined}>
            {f.kind === 'folder' ? `${f.name}/` : f.name}
          </span>
        ))}
      </span>
    );
  };

  const run = (raw: string) => {
    const [name = '', ...args] = raw.trim().split(/\s+/);
    const command = ALIASES[name] ?? name;
    const arg = args.join(' ');

    switch (command) {
      case '':
        return;
      case 'help':
        return print(
          ...Object.entries(COMMANDS).map(([cmd, desc]) => (
            <span>
              <span className="inline-block w-20 text-syn-key">{cmd}</span>
              <span className="text-muted">{desc}</span>
            </span>
          ))
        );
      case 'ls': {
        if (!arg) return print(listing(cwd));
        const target = resolvePath(arg, cwd, files);
        if (!target) return print(<span className="text-syn-pdf">ls: cannot access '{arg}': No such file or directory</span>);
        if (target === BLOG) return print(listing('blog'));
        return print(target.name);
      }
      case 'open': {
        if (!arg) return openFile(README);
        const target = resolvePath(arg, cwd, files);
        if (!target) return print(<span className="text-syn-pdf">{name}: {arg}: No such file or directory</span>);
        return openFile(target);
      }
      case 'pwd':
        return print(`~/${cwd}`);
      case 'whoami':
        return print(
          'Naofal Leo Agusta — software engineer in Palembang, Indonesia.',
          'Front-end focused, full-stack experienced. Currently at GovTech Procurement (Telkom Indonesia).'
        );
      case 'socials':
        return print(
          ...SOCIAL_LINKS.map((s) => (
            <span>
              <span className="inline-block w-24 text-syn-key">{s.text.toLowerCase()}</span>
              <a className={link} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.href.replace(/^(https:\/\/|mailto:)/, '')}
              </a>
            </span>
          ))
        );
      case 'theme': {
        if (!arg) {
          const active = readTheme();
          return print(
            ...THEMES.map((t) => (
              <span className={t === active ? 'text-accent' : 'text-muted'}>
                {t === active ? '* ' : '  '}
                {t}
              </span>
            ))
          );
        }
        if (!isTheme(arg)) return print(<span className="text-syn-pdf">theme: unknown theme '{arg}'. Try: {THEMES.join(', ')}</span>);
        setTheme(arg);
        return print(<span className="text-muted">theme set to {arg}</span>);
      }
      case 'clear':
        return setLines([]);
      default:
        return print(
          <span className="text-syn-pdf">
            command not found: {name}. Type <span className="text-syn-key">help</span> for a list.
          </span>
        );
    }
  };

  const complete = () => {
    const parts = input.split(/\s+/);
    if (parts.length === 1) {
      const match = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)].find((c) => c.startsWith(parts[0]));
      if (match) setInput(`${match} `);
      return;
    }
    const partial = parts.at(-1) ?? '';
    const pool = cwd === 'blog' ? files.filter((f) => f.path.startsWith('blog/')) : [BLOG, ...ROOT_FILES];
    const match = pool.find((f) => f.name.startsWith(partial));
    if (match) setInput([...parts.slice(0, -1), match.kind === 'folder' ? `${match.name}/` : match.name].join(' '));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = input;
      print(
        <span className="flex">
          {prompt}
          <span>{value}</span>
        </span>
      );
      if (value.trim()) setHistory((h) => [value, ...h]);
      setHistoryIndex(-1);
      setInput('');
      run(value);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const index = Math.max(-1, Math.min(history.length - 1, historyIndex + (e.key === 'ArrowUp' ? 1 : -1)));
      setHistoryIndex(index);
      setInput(index === -1 ? '' : history[index]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      complete();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  // An empty fragment, not null: Astro's React renderer check rejects islands that render null
  if (!open) return <></>;

  return (
    <section
      className="flex h-64 flex-none flex-col border-t border-line bg-panel text-[0.8125rem] max-md:fixed max-md:inset-0 max-md:z-50 max-md:h-auto"
      aria-label="Terminal"
    >
      <header className="flex h-8 flex-none items-center gap-4 border-b border-line px-3 text-[0.6875rem] uppercase tracking-wider text-muted">
        <span className="border-b border-accent pb-1 pt-1.5 text-fg">Terminal</span>
        <span className="normal-case tracking-normal text-faint">bash</span>
        <button
          type="button"
          className="ml-auto flex size-6 items-center justify-center rounded hover:bg-hover hover:text-fg"
          onClick={() => toggle(false)}
          aria-label="Close terminal"
        >
          <svg className="ws-icon size-3.5" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS.close }} />
        </button>
      </header>
      {/* Clicking the output focuses the prompt, like a real terminal; the input itself takes keys */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-3 py-2 leading-relaxed"
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus();
        }}
      >
        <p className="text-muted">
          Welcome to <span className="text-accent">naofal-os</span>. Type <span className="text-syn-key">help</span> to
          see what you can do.
        </p>
        {lines.map((line) => (
          <div key={line.id} className="whitespace-pre-wrap break-words">
            {line.content}
          </div>
        ))}
        <label className="flex">
          {prompt}
          <span className="sr-only">Terminal input</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none focus-visible:outline-none"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
          />
        </label>
      </div>
    </section>
  );
}
