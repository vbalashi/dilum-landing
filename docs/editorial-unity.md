# Unified editorial design — 2026-10-14

Owner request: implement the journal-based direction across the studio, use
consistent light/dark themes, replace the dropdown with discreet buttons, and
adapt relevant ideas from the supplied publication references. Scope claimed:
shared layout/theme/styles, home composition and preview deployment branch;
Markdown content/CMS/data contracts are unchanged. Isolated codex/editorial-unity
from clean88669b9; no other studio worktrees or competing changes on start.

References inspected directly: Works in Progress (https://worksinprogress.co/),
Asterisk (https://asteriskmag.com/), Ink & Switch local-first essay
(https://www.inkandswitch.com/essay/local-first/). Adapted principles: a ruled
editorial grid, typographic hierarchy, small metadata and readable long text.
No copied magazine assets, logos, article text or proprietary fonts. The Pudding,
Bartosz and stacked-note interfaces remain possible future article-specific
references, not mandatory site-wide interactions.

One Editorial layout now owns every route, both palettes, masthead, nav, footer
and original business details. Home uses products→journal→people→contact instead
of a separate fullscreen landing. Theme uses three icon buttons with explicit
accessible labels/pressed state, persisted choice, system-change handling and
cross-tab synchronization. Source font packages self-host Literata/Manrope;
Lucide source icons replace a dropdown. No theme/menu select remains.

Preview and production builds retain draft boundaries. Owner-reported Pages CMS
authorization is completed; an authenticated edit/agent roundtrip remains separate
from this visual change. Article text and publication status are untouched.
Validation and deployment evidence recorded in the owning PR. Main stays clean;
only deploy outputs are public. Preview branch is public/noindex, not private.

Local build note: Astro7/Vite native tsconfig discovery traversed the nested
checkout's reference parent, whose dependencies had not been installed. An
independent npm ci --ignore-scripts in the clean reference checkout resolved
that lookup; no source/lock changes or node_modules sharing. The worktree has
its own installation. No tsconfig workaround retained.

Verification: production13pages and preview14pages pass generated-link,
JSON-LD/draft and asset-boundary checks. Every generated page has exactly three
theme buttons and common contact footer, no select, no Google Fonts request.
Browser checked1280px and390px, home→journal persistence, cross-tab dark/light,
system resolution matching device and local font loading. No horizontal overflow
on mobile home/article. Token contrast ratios for normal/muted/accent text:
light13.52/5.40/5.82, dark13.42/8.00/8.24. These checks do not claim a complete
WCAGaudit. Article/CMSsource diff is empty.
