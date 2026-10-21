// Workspace behaviour that isn't owned by an island: shortcuts, Explorer toggling,
// Theme switching, and per-File enhancements. This module runs once; per-File work
// re-runs on every `astro:page-load` because the ClientRouter swaps the DOM.
import { WS_EVENT } from '../lib/workspace';
import { applyTheme, cycleTheme, readTheme } from '../lib/theme';

const root = document.documentElement;
const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
const mobile = window.matchMedia('(max-width: 767px)');

function readExplorer() {
  try {
    return localStorage.getItem('ws:explorer') === 'closed' ? 'closed' : 'open';
  } catch {
    return 'open';
  }
}

function setDrawer(open: boolean) {
  root.classList.toggle('ws-drawer-open', open);
  document.querySelector('[data-drawer-toggle]')?.setAttribute('aria-expanded', String(open));
}

function toggleExplorer() {
  if (mobile.matches) {
    setDrawer(!root.classList.contains('ws-drawer-open'));
    return;
  }
  const next = readExplorer() === 'open' ? 'closed' : 'open';
  try {
    localStorage.setItem('ws:explorer', next);
  } catch {
    // storage blocked: toggle still applies to this page
  }
  root.dataset.explorer = next;
}

const ACTIONS: Record<string, () => void> = {
  palette: () => window.dispatchEvent(new Event(WS_EVENT.palette)),
  terminal: () => window.dispatchEvent(new Event(WS_EVENT.terminal)),
  explorer: toggleExplorer,
  theme: cycleTheme,
};

window.addEventListener(WS_EVENT.explorer, toggleExplorer);

document.addEventListener('click', (event) => {
  const target = event.target as Element;
  const action = target.closest<HTMLElement>('[data-action]')?.dataset.action;
  if (action && ACTIONS[action]) {
    ACTIONS[action]();
    return;
  }
  if (target.closest('[data-drawer-toggle]')) {
    event.preventDefault();
    setDrawer(!root.classList.contains('ws-drawer-open'));
  } else if (target.closest('[data-drawer-close]')) {
    event.preventDefault();
    setDrawer(false);
  }
});

document.addEventListener('keydown', (event) => {
  const mod = isMac ? event.metaKey : event.ctrlKey;
  const key = event.key.toLowerCase();
  if (mod && key === 'k') {
    event.preventDefault();
    ACTIONS.palette();
  } else if (event.ctrlKey && (event.key === '`' || event.code === 'Backquote')) {
    event.preventDefault();
    ACTIONS.terminal();
  } else if (mod && key === 'b') {
    event.preventDefault();
    toggleExplorer();
  } else if (event.key === 'Escape' && root.classList.contains('ws-drawer-open')) {
    setDrawer(false);
  }
});

// The incoming document's <html> carries no client state; restore it before paint.
document.addEventListener('astro:after-swap', () => {
  applyTheme(readTheme());
  root.dataset.explorer = readExplorer();
});

/* ── Per-File enhancements ─────────────────────────────────────────── */

let outlineObserver: IntersectionObserver | undefined;

function trackScroll(editor: HTMLElement) {
  const label = document.querySelector<HTMLElement>('[data-scroll-pct]');
  if (!label) return;
  const update = () => {
    const max = editor.scrollHeight - editor.clientHeight;
    label.hidden = max < 40;
    label.textContent = `${max > 0 ? Math.round((editor.scrollTop / max) * 100) : 0}%`;
  };
  editor.addEventListener('scroll', update, { passive: true });
  update();
}

function trackOutline(editor: HTMLElement) {
  outlineObserver?.disconnect();
  const links = new Map(
    [...document.querySelectorAll<HTMLElement>('[data-outline-link]')].map((a) => [a.dataset.outlineLink!, a])
  );
  if (links.size === 0) return;

  outlineObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((e) => e.isIntersecting);
      if (!visible) return;
      links.forEach((link, id) => link.toggleAttribute('data-active', id === visible.target.id));
    },
    { root: editor, rootMargin: '0px 0px -70% 0px' }
  );
  links.forEach((_, id) => {
    const heading = document.getElementById(id);
    if (heading) outlineObserver!.observe(heading);
  });
}

function addCopyButtons(editor: HTMLElement) {
  editor.querySelectorAll('.preview pre').forEach((pre) => {
    if (pre.parentElement?.classList.contains('code-block-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.before(wrapper);
    wrapper.append(pre);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code-btn';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code');
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(pre.querySelector('code')?.textContent ?? '');
      button.textContent = 'Copied!';
      button.classList.add('copied');
      setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
      }, 2000);
    });
    wrapper.append(button);
  });
}

document.addEventListener('astro:page-load', () => {
  applyTheme(readTheme());
  setDrawer(false);
  if (!isMac) {
    document.querySelectorAll('[data-mod-key]').forEach((el) => (el.textContent = 'Ctrl+K'));
  }

  const editor = document.getElementById('editor');
  if (!editor) return;
  trackScroll(editor);
  trackOutline(editor);
  addCopyButtons(editor);
});
