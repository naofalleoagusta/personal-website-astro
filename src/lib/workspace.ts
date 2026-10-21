// The File registry: every addressable piece of the site, as the Workspace presents it.
// Shared by server-rendered components and client islands, so it must stay free of
// Astro-only imports.
import { RESUME_URL } from '../data/constants';

export type FileKind = 'markdown' | 'json' | 'folder' | 'pdf' | 'text';

export interface WorkspaceFile {
  /** Display name, e.g. `about.md` */
  name: string;
  /** Path inside the Workspace, e.g. `blog/ara-hunter.md`; folders end with `/` */
  path: string;
  href: string;
  kind: FileKind;
  external?: boolean;
  /** Extra text the Command Palette can match on (post titles) */
  detail?: string;
}

export const ROOT_NAME = 'naofal-leo-agusta';

export const LANGUAGE: Record<FileKind, string> = {
  markdown: 'Markdown',
  json: 'JSON',
  folder: 'Folder',
  pdf: 'PDF',
  text: 'Plain Text',
};

/** File-type glyph shown before a File's name in the Explorer, Tabs and Command Palette. */
export const FILE_GLYPH: Record<FileKind, string> = {
  markdown: 'M↓',
  json: '{}',
  folder: '▤',
  pdf: 'PDF',
  text: '≡',
};

export const README: WorkspaceFile = { name: 'README.md', path: 'README.md', href: '/', kind: 'markdown' };
export const ABOUT: WorkspaceFile = { name: 'about.md', path: 'about.md', href: '/about', kind: 'markdown' };
export const EXPERIENCE: WorkspaceFile = {
  name: 'experience.json',
  path: 'experience.json',
  href: '/experience',
  kind: 'json',
};
export const RESUME: WorkspaceFile = {
  name: 'resume.pdf',
  path: 'resume.pdf',
  href: RESUME_URL,
  kind: 'pdf',
  external: true,
};
export const BLOG: WorkspaceFile = { name: 'blog', path: 'blog/', href: '/blog', kind: 'folder' };

/** Root-level Files in Explorer order (the blog Folder is rendered separately, first). */
export const ROOT_FILES = [README, ABOUT, EXPERIENCE, RESUME];

export function postFile(post: { permalink: string; title: string }): WorkspaceFile {
  return {
    name: `${post.permalink}.md`,
    path: `blog/${post.permalink}.md`,
    href: `/blog/${post.permalink}`,
    kind: 'markdown',
    detail: post.title,
  };
}

/** Workspace directory the visitor is "in", derived from a URL path. */
export function cwdOf(pathname: string): '' | 'blog' {
  return pathname === '/blog' || pathname.startsWith('/blog/') ? 'blog' : '';
}

/**
 * Resolve a Terminal path argument (`about.md`, `../README.md`, `~/blog`, `ara-hunter`)
 * against the current directory. Returns the matching File, or undefined.
 */
export function resolvePath(
  input: string,
  cwd: string,
  files: WorkspaceFile[]
): WorkspaceFile | undefined {
  let raw = input.trim();
  let base = cwd;
  if (raw === '~' || raw === '/' || raw === '~/') return README;
  if (raw.startsWith('~/') || raw.startsWith('/')) {
    raw = raw.replace(/^~?\//, '');
    base = '';
  }

  const parts = [...(base ? base.split('/') : [])];
  for (const seg of raw.split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') parts.pop();
    else parts.push(seg);
  }
  const target = parts.join('/').toLowerCase();
  if (target === '') return README;

  return files.find((f) => {
    const path = f.path.replace(/\/$/, '').toLowerCase();
    return path === target || path.replace(/\.[a-z]+$/, '') === target;
  });
}

/** Window events the Workspace's islands and scripts use to talk to each other. */
export const WS_EVENT = {
  palette: 'ws:palette',
  terminal: 'ws:terminal',
  explorer: 'ws:explorer',
} as const;
