# Journal article translations

WorkRef: blog-article-translations-2026-11-16.

## Scope and coordination

The site implementation is isolated in `codex/blog-article-translations-2026-11-16`, based on origin/main at ca7b62d. The change claims the journal translation grouping, article rendering, existing language selector integration and content schema. The separately active product localization PR #14 also changes the shared layout and selector; reconcile that PR before integration. Do not replace either change.

A matching private editorial CMS field and draft metadata are maintained separately in the private repository. No private article text or media is copied into this public source tree. Creating a language link does not approve either article for publication.

## Behavior

Translation groups use a stable shared ID and at most one article per language. The journal shows one entry per group (English preferred when available); each version keeps its own URL. The article header offers links to available versions and the page advertises reciprocal language alternatives. Production considers only published articles; a draft translation is never linked from a public page. Local private preview can show drafts without an assigned author, but published articles require one. Language choice is explicit; direct article URLs do not redirect.

## Verification

Run `npm run test:article-translations` for synthetic paired and single-published variants, draft visibility and duplicate language validation. Run production and preview builds with `npm run check:content` in each mode. No test fixture contains private editorial content.
