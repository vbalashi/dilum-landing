# Studio navigation — 18 October 2026

Work reference: owner request in media chat; isolated codex/studio-navigation
from clean origin/main 9ce2413. Scope: shared layout/navigation runtime, journal
presentation/filtering, Contact/Products entry pages, preview workflow and block
reference inventory. No article copy, publication state or CMS migration.

Accepted: compact persistent header; no full document reload for internal pages;
journal has one compact heading and stable filter/list shell; filtering retains
history, direct URLs and a readable no-JS route. Theme buttons remain functional
through navigation. Public preview includes the existing draft, production omits
it. Owner will review behavior on journal-preview before a production merge.

Article blocks are preparation only: Thinkmill for hierarchy/author/context,
Maggie for optional contents and notes, Distill for figure widths. No invented
screenshots or article publication. Rich editor/format selection stays open.

Validation: production and preview builds + content checks; browser navigation,
filter/back/direct URL, header scroll, theme after route change, mobile and
reduced-motion styles. Completion: pushed PR + deployed preview, retained
worktree until owner review; reference main is read-only.

## Review checkpoint

Both modes build and pass content checks (15 production / 16 preview pages).
Browser: header and archive retain accessibility-node identity across client
navigation; topic changes update active state/empty/list; back restores All;
dark theme persists through People/home/Contact; compact header remains visible
on home scroll. Mobile 390px has no page overflow; filters scroll independently.
Contact now has a dedicated route. No console errors observed in these flows.
No-JS routes render the selected topic server-side; animations are disabled for
route swaps (also compatible with reduced motion). No CMS save roundtrip claimed.

Prepared block contract: docs/editorial-blocks.md. Actual specimen/article images
are follow-up work. Preview review remains pending; do not retire this checkout
or merge solely to clean it up.
