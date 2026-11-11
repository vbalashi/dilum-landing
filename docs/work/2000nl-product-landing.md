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
