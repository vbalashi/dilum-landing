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

## Homepage direction — owner accepted a trial, 18 October

The owner found the homepage too small and dense, repeating all section indexes.
Trial: three-part story (studio introduction → one 2000 NL problem/approach →
short founders' signature), larger type and generous spacing. Archives and full
biographies stay on their dedicated routes. No invented application screenshot:
owner will prepare real visuals later. Navigation increases to 15px desktop /
14px mobile. This is preview-only in the same pending PR for owner review.

## Readability and theme refinement — 18 October

Owner reports undersized filters/metadata/body on both MacBook and external
monitor. Measured CSS: filters11px, metadata10px, summaries13–14px. New working
scale: filters/CTA16px, metadata14px, summaries18px, article20px (mobile18px).
Heading weight in story lists increases modestly to500; homepage display stays
large. A single44px theme button cycles System → Light → Dark, announces current
and next mode, keeps stored preferences and follows system changes in auto mode.

W3C reference: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html and
https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html . No universal
minimum font size or full accessibility compliance claimed. Size choices are our
editorial defaults; check spacing, reflow and contrast as well as font size.

Product routing recommendation: studio product page is a concise project profile
and related writing; separate branded product landing explains offer and waitlist.
External link explicitly says Visit the 2000 NL website. No full landing duplicate
inside studio, no new public app-access promise or waitlist form submission.
