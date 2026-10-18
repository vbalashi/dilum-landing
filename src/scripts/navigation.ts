import { navigate } from 'astro:transitions/client';

const media = matchMedia('(prefers-color-scheme: dark)');
function applyTheme(choice?: string | null) {
  if (!['light', 'dark', 'system'].includes(choice || '')) choice = 'system';
  const root = document.documentElement;
  root.dataset.theme = choice!;
  root.dataset.scheme = choice === 'system' ? (media.matches ? 'dark' : 'light') : choice!;
  const modes = ['system', 'light', 'dark'];
  const labels = {system:'System', light:'Light', dark:'Dark'};
  const next = modes[(modes.indexOf(choice!) + 1) % modes.length];
  document.querySelectorAll<HTMLButtonElement>('[data-theme-cycle]').forEach(button => {
    const label = `Theme: ${labels[choice as keyof typeof labels]}. Switch to ${next} theme`;
    button.setAttribute('aria-label', label);
    button.title = label;
  });
}
function restoreTheme() {
  let choice = 'system';
  try { choice = localStorage.getItem('dilum-theme') || 'system'; } catch {}
  applyTheme(choice);
}
function updateHeader() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;
  header.classList.toggle('is-compact', window.scrollY > 64);
  document.documentElement.style.setProperty('--header-bottom', `${header.getBoundingClientRect().bottom}px`);
}
function updatePage() {
  restoreTheme();
  document.querySelectorAll<HTMLAnchorElement>('.masthead nav a').forEach(link => {
    const active = location.pathname.startsWith(new URL(link.href).pathname);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const archive = document.querySelector('[data-journal]');
  if (archive) {
    const topic = location.pathname.match(/^\/journal\/topics\/([^/]+)\//)?.[1] || '';
    let count = 0;
    archive.querySelectorAll<HTMLElement>('[data-article-topic]').forEach(card => {
      card.hidden = !!topic && card.dataset.articleTopic !== topic;
      if (!card.hidden) count++;
    });
    archive.querySelectorAll<HTMLElement>('[data-journal-topic]').forEach(link => {
      if (link.dataset.journalTopic === topic) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const empty = archive.querySelector<HTMLElement>('[data-journal-empty]');
    if (empty) empty.hidden = count > 0;
    const status = archive.querySelector('[data-journal-status]');
    if (status) status.textContent = `${count} ${count === 1 ? 'article' : 'articles'}`;
  }
  updateHeader();
}
// Delegation keeps theme controls working while Astro preserves the header.
document.addEventListener('click', event => {
  const target = event.target instanceof Element ? event.target : null;
  const button = target?.closest<HTMLButtonElement>('[data-theme-cycle]');
  if (!button) return;
  const modes = ['system', 'light', 'dark'];
  const choice = modes[(modes.indexOf(document.documentElement.dataset.theme || 'system') + 1) % modes.length];
  applyTheme(choice);
  try { localStorage.setItem('dilum-theme', choice); } catch {}
});
// The archive DOM survives topic routes; only cards and active state change.
// Astro owns history and back/forward rather than a second custom router.
document.addEventListener('click', async event => {
  const target = event.target instanceof Element ? event.target : null;
  const link = target?.closest<HTMLAnchorElement>('a[data-journal-topic]');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (!link.closest('[data-journal]')) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (new URL(link.href).pathname === location.pathname) return;
  const scroll = {left:window.scrollX, top:window.scrollY};
  const destination = new URL(link.href).pathname;
  await navigate(link.href);
  if (location.pathname === destination) window.scrollTo({...scroll, behavior:'instant'});
}, {capture:true});
media.addEventListener('change', () => {
  if (document.documentElement.dataset.theme === 'system') applyTheme('system');
});
window.addEventListener('storage', event => {
  if (event.key === 'dilum-theme') applyTheme(event.newValue);
});
window.addEventListener('scroll', updateHeader, {passive:true});
window.addEventListener('resize', updateHeader);
document.addEventListener('astro:after-swap', updatePage);
document.addEventListener('astro:page-load', updatePage);
updatePage();
