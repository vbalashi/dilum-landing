# Dilum Labs studio and journal

Independent studio site for `dilum.io`, with a static Astro journal. Product
landing/waitlist and the2000NL runtime remain separate. Start at [AGENTS.md](AGENTS.md).

## Routes and source

- `src/pages/index.astro`: existing studio landing migrated to Astro, journal links added.
- `src/pages/journal/`: archive, topic pages and readable article pages.
- `src/pages/authors/`, `src/pages/products/`: independent author and product views.
- `src/content/articles/*.md`: article source with YAML frontmatter.
- `.pages.yml`: hosted Pages CMS visual editor schema.
- `src/styles/editorial.css`: Literata/Manrope reading layout; light/dark/system.
- [docs/editorial-workflow.md](docs/editorial-workflow.md): author/agent editing, setup and publishing.
- [docs/platform-decision.md](docs/platform-decision.md): first platform choice, boundaries and checks.
- [research](docs/research/2026-10-14-cms-search.md): primary-source CMS/search findings.

## Local and deploy

Node 22.12+; `npm ci`. `SITE_PREVIEW=true npm run dev` includes drafts locally.
`npm run build` is production: drafts are omitted. `SITE_PREVIEW=true npm run build`
is an explicitly shareable draft preview, not private storage. `npm run check:content`
uses the same SITE_PREVIEW value as the preceding build. `astro dev stop` stops the
Astro7 background development server.

GitHubActions builds `dist/` and deploys only that directory to existingCloudflare
Pages. Main is production; the journal-platform branch publishes a `journal-preview`
branch deployment with noindex/robots exclusion. No CMS/database server or reader
accounts required. Workflow credentials remain GitHub Secrets.

Shared strategy and internal idea bank: `/Users/khrustal/dev/2000nl/docs/marketing/README.md`.
The first article's earlier Russian review copy remains there as source evidence;
the website'sMarkdown is authoritative for CMS roundtrip once editing begins.
