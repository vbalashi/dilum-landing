# Dilum Labs studio and journal

Independent studio site for `dilum.io`, with a static Astro journal. Product
landing/waitlist and the2000NL runtime remain separate. Start at [AGENTS.md](AGENTS.md).

## Routes and source

- `src/pages/index.astro`: existing studio landing migrated to Astro, journal links added.
- `src/pages/blog/`: archive, topic pages and readable article pages.
- `src/pages/authors/`, `src/pages/products/`: independent author and product views.
- `src/content/articles/*.md`: article source with YAML frontmatter.
- Private authoring/CMS: https://github.com/vbalashi/dilum-editorial . No unpublished sources in this public repo.
- `src/styles/editorial.css`: self-hosted Literata/Manrope; consistent palettes and one cycling theme button.
- [docs/editorial-workflow.md](docs/editorial-workflow.md): author/agent editing, setup and publishing.
- [docs/platform-decision.md](docs/platform-decision.md): first platform choice, boundaries and checks.
- [research](docs/research/2026-10-14-cms-search.md): primary-source CMS/search findings.

## Local and deploy

Node22.12+; `npm ci`. Production and website-preview builds both exclude drafts.
`SITE_PREVIEW=true` adds noindex, never draft access. Private authoring preview
uses the private repo's `scripts/preview.sh`; it loads external content locally,
never inCI. `npm run check:content` checks public boundaries in the build mode.
`astro dev stop` stops the Astro7 background development server.

GitHubActions builds `dist/` and deploys only that directory to existingCloudflare
Pages. Main is production; the codex/studio-navigation branch publishes a `journal-preview`
branch deployment with noindex/robots exclusion. No CMS/database server or reader
accounts required. Workflow credentials remain GitHub Secrets.

Shared strategy and internal idea bank: `/Users/khrustal/dev/2000nl-internal/docs/marketing/README.md`.
Private article sources live in dilum-editorial. Approved publication exports live here.

Navigation work: [plan and validation](docs/navigation-plan.md); [prepared article block inventory](docs/editorial-blocks.md).
