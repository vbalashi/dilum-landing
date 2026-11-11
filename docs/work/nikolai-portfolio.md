# Nikolai portfolio prototype

WorkRef: docs/work/nikolai-portfolio.md

Start 2026-11-11: user requested a local first mock of Nikolai's page with projects and expandable experience, in the existing site's style. Base main 9130c56. Main has a pre-existing AGENTS.md edit, preserved. Existing three worktrees clean; no open PRs. No overlapping active ownership identified. Isolated branch codex/nikolai-portfolio.

Claim: src/pages/authors/[author].astro (Nikolai conditional only), src/components/NikolaiPortfolio.astro, src/styles/portfolio.css, docs/work/nikolai-portfolio.md. Semantic scope: local personal portfolio prototype. No deployment or public push of profile material. Master resume is read-only. Shared layout and other worktree ownership preserved.

PDF: first mock uses the browser's print-to-PDF with print styling; production automatic LaTeX export remains a follow-up after content review.

Checkpoint / local design handoff 2026-11-11: implemented existing author route for Nikolai only. Three linked product summaries, five native details/summary career groups, biography and print-to-PDF controls. Copy is provisional for user review and based on master-profile.yaml, base LaTeX experience, and existing public product descriptions. No customer specifics or private contact details copied.

Validation: production build and content checks passed. Preview build and content checks passed before final whitespace-only adjustment; final production build/check passed afterward. Browser inspection: desktop 1280, mobile 390, open OpenText role verified, light/dark themes verified, images loaded, no horizontal overflow at mobile width, console error log empty. Mobile text spacing corrected. Screenshot stored outside repository at /Users/khrustal/.codex/visualizations/nikolai-portfolio/desktop.png. Local Astro dev server reported port 4327.

Ownership remains protective for iteration; not integrated or published. Deliberately no push of provisional personal content. Local node_modules symlink is a dependency reuse aid, not a deliverable. Automatic LaTeX PDF generation and portrait selection remain follow-up work; current button explicitly uses browser print-to-PDF.

Resume / scope correction 2026-11-11: user clarified that personal CV pages must cover professional consulting experience, independently of studio products. Existing claim rechecked; local committed implementation clean except dependency symlink. Replace product showcase with professional case summaries sourced from reviewed master-profile units exp_opentext_energy_poc_adoption, exp_liberty_dashboards, exp_epam_architecture_assessment. Preserve contribution boundaries and anonymization. Keep details inline to avoid empty case-study routes. Update professional positioning, biography and author metadata within existing claimed route. No publish.

Checkpoint 2026-11-11: professional case replacement validated with production build/content check, browser expansion of first case, mobile width390 without overflow. User noted smaller type. Same-tab local/live comparison showed identical viewport558, DPR2, base16px and navigation14px; published People body18px versus custom case overview14–15px. Aligned overview to18px and expanded case/experience text to17px; mobile lead18px. Print sizes retained. No browser zoom change. Current claim still active for local review.
