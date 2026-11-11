# Local preview: match production typography

Use the existing shared `src/layouts/Editorial.astro` and
`src/styles/editorial.css` for new pages. Keep the shared header, font imports,
palettes and theme handling intact. Personal portfolios share
`src/components/ProfessionalPortfolio.astro`; content belongs in
`src/lib/professional-profiles.ts`.

## Install dependencies inside each worktree

Run `npm ci` in the isolated worktree. Do **not** symlink `node_modules` from
another checkout. Vite can resolve the linked font imports outside its allowed
filesystem root and return HTTP 403 for font files. A successful build and
computed CSS `font-family` do not prove that a font actually rendered.

## If local pages look different from dilum.io

1. Compare the same route, scroll position, theme, viewport and browser zoom.
2. Check actual font requests in the browser for errors, especially `/@fs/` URLs.
3. Verify rendered fonts, not just the CSS font-family declaration. Navigation
   should use custom Manrope (`Manrope-Regular`); headings use Literata
   (`Literata-Regular`). CDP `CSS.getPlatformFontsForNode` is one reliable check.
4. If dependencies were linked from another checkout, replace that link with a
   local `npm ci` installation. Restart that worktree's dev server and reload.
5. Confirm font responses are HTTP 200 and compare the shared CSS with the
   deployed stylesheet before changing font sizes to compensate.
6. Restore temporary viewport overrides after mobile checks. Keep new page
   styles scoped so they cannot change the shared shell.

## Incident: 2026-11-11

The first portfolio preview used a sibling checkout's dependency directory via
symlink. Local font requests returned 403 and the browser used fallback fonts,
including in the unchanged homepage/header. Adjusting page text sizes did not
address that underlying problem. An independent dependency installation and
server restart restored the intended fonts. The shared built CSS was
byte-identical to production. Same-tab verification confirmed identical rendered
Manrope/Literata fonts and headline sizing on local and production homepages.
