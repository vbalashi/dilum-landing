# Dilum studio and journal

Start at [README.md](README.md), then read only the relevant route.

- Studio layout: `src/pages/index.astro`.
- Journal/content/CMS: [docs/editorial-workflow.md](docs/editorial-workflow.md).
- Visual reading style: `src/layouts/Editorial.astro`, `src/styles/editorial.css`.
- Authors/products: `src/lib/content.ts` plus their `src/pages/` routes.
- Deploy: `.github/workflows/deploy.yml`; static output only.
- Research/architecture: [docs/platform-decision.md](docs/platform-decision.md).
- Shared strategy/idea bank: `/Users/khrustal/dev/2000nl-internal/docs/marketing/README.md`.
- Product landing: `/Users/khrustal/dev/2000nl-landing/README.md`.
- Runtime: `/Users/khrustal/dev/2000nl/AGENTS.md`.

Read `/Users/khrustal/dev/AGENTS.md` lifecycle before writing. Use isolated
issue/plan-owned worktrees; reference main stays clean. Claim content ownership
before concurrent agent/human edits; commit history is not realtime coediting.

Article source is plainMarkdown frontmatter, not generatedHTML. Keep stable slugs,
authorship, language, draft state and optional crosspost links. New content defaults
to draft in the PRIVATE editorial repository. Never commit drafts to this public repo. Publication must be intentional: draft=false on main triggers production
via GitHub Actions. Website preview is public to anyone withURL; it excludes drafts. Private drafts are local-only from dilum-editorial. noindex is not privacy.
Never commit secrets, private source transcripts or licensed data under public.

Studio focus: products, author portfolios/contact, secondary project cooperation.
English primary, Russian supported. Keep current/alpha/planned features explicit.
Do not invent testimonials, user numbers, author credentials or product maturity.

Validate production AND preview builds after changing draft filtering. Run
`npm run check:content` in the same mode as each build. Visually check reading,
mobile width and theme interaction for design changes. Test actual CMS save
roundtrip after account authorization before claiming editor setup complete.
