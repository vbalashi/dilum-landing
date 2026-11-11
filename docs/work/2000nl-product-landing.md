# 2000nl product landing adaptation

Work reference: this execution plan, requested 2026-11-11.

## Start / ownership

Owner: Codex chat adapting the standalone landing to the studio product page.
Branch: codex/2000nl-product-landing. Base: 2556a9c.
Claim: src/components/2000nl*, src/styles/2000nl*, src/pages/[product].astro,
src/components/Waitlist.astro, src/scripts/waitlist.ts, public/images/2000nl/, and this plan.
Inspected main and all worktrees/branches. Main has a pre-existing AGENTS.md
modification, preserved. studio-navigation is clean and its work was integrated
through #5; no open PRs. No overlapping active claim found in project docs.
Application and standalone landing are read-only sources. Reuse existing local
QA runtime on 3100 (#69, 671521d) after healthy local database check.

## Intent

Keep studio shell, editorial typography and paper palettes; retain restrained
2000nl violet, visual product previews and a clear waiting-list CTA. Capture real
local application screens with test data. No production publication authorized.
Use existing signup component/storage; preserve preview submission protection.

## Checkpoint

Four unaltered application screenshots captured from the healthy local runtime;
only crops remove browser/development chrome. Test dictionary data, no user data.
Scope expanded to the waitlist script to preserve each form’s chosen button label
after a submission. Existing backend, storage, retention and preview guard reused.
Desktop 1280px and mobile 390px visually checked. Main AGENTS.md edits preserved.

## Review checkpoint

Production build/content check and preview build/content check passed; six
waitlist tests passed. Browser checked desktop/mobile, light/dark, image rendering,
anchor navigation, and preview form submission (no write). No horizontal overflow
at 390px. Only approved public page copy and local sample UI captures included.
Draft PR prepared for review; no merge or production deployment. Ownership remains
protective on this branch until integrated or explicitly handed off.

## Finish: review-ready

Implementation SHA: 9bff007e108f8b6ae70f76a474ce5793a226334c.
All production/preview build and content checks plus six waitlist tests passed
on that exact implementation. Draft review: https://github.com/vbalashi/dilum-landing/pull/8 .
Branch pushed; scoped tree clean after this receipt. Public site unchanged.
Review locally at http://localhost:4326/2000nl/ (owned Astro preview runtime).
Protective ownership retained pending review/integration.

## Resume 2026-11-11: screenshot refinement

Existing branch clean and claim rechecked; main's AGENTS.md change preserved.
User requests a fuller entry from the studio's own Dutch dictionary with synonyms,
examples and a note; remove the redundant showcase caption. Scope unchanged.
Use the authenticated production UI read-only to select an existing entry, without
changing learning state. The UI names the own dictionary Dilum Nederlands.

Refinement outcome: user accepted the full entry without synonyms. The deployed
own dictionary package contains definitions/examples/notes but no synonym fields;
no data was invented or modified. Captured gezellig from the read-only production
Library scoped to Dilum Nederlands: adjective, two meanings, forms, two examples
and usage note. Replaced only library/card images, alt text and related public
copy; removed the showcase caption and its obsolete styles, adjusted mobile
spacing for the taller card. Production build/content check and diff check pass;
rendered images verified loaded at exact dimensions, caption absent, no horizontal
overflow in the current narrow viewport. Existing training/builder blocks retained.

## Resume 2026-11-11: AudioFilms connected landing

User requested the AudioFilms prototype in the existing Chrome YouTube tab as
screenshot source, concise value proposition and explicit concept/prototype status.
Existing branch/worktree clean; PR #8 open; scope expanded to
src/components/AudiofilmsLanding.astro, src/styles/audiofilms.css,
src/lib/product-pages.ts and public/images/audiofilms/, plus the 2000nl connected
section and existing route. No runtime/extension changes. Screenshot capture may
open existing playback/translation controls, but must not save words or alter
learning progress. Preserve unrelated main/worktree edits and current layout.

AudioFilms outcome: captured three unaltered crops from the user's existing
Chrome YouTube extension prototype (LUBACH video W2QGZdlXuBg, phrase16). Crops omit
account/profile chrome; no learning/save action performed. Public screenshot
attribution retained. AudioFilms page explains shadowing, translation, word lookup
and connected learning, with explicit working-prototype/no-public-release status.
2000nl gets a linked screenshot section, bilingual AI-translation benefit and
planned direct dictionary authoring clearly marked in development. No uniqueness
or competitor claims. Existing waitlist unchanged. Desktop1680/mobile390 image
rendering and no horizontal overflow verified; light/dark checked. Main AGENTS.md
change remains untouched; branch ownership remains protective under PR #8.

AudioFilms review-ready receipt: implementation
20d31e6f47c6a3d98588368e23ea1b53ba35c4a7 passed both production/preview builds
and content checks. PR #8 title/body now cover both connected product pages.
Scoped changes pushed, clean tree; no merge or production deploy. Preview left
open at http://localhost:4326/audiofilms/#af-preview . Ownership retained for review.
