# Nikolai portfolio prototype

WorkRef: docs/work/nikolai-portfolio.md

Start 2026-11-11: user requested a local first mock of Nikolai's page with projects and expandable experience, in the existing site's style. Base main 9130c56. Main has a pre-existing AGENTS.md edit, preserved. Existing three worktrees clean; no open PRs. No overlapping active ownership identified. Isolated branch codex/nikolai-portfolio.

Claim: src/pages/authors/[author].astro (Nikolai conditional only), src/components/NikolaiPortfolio.astro, src/styles/portfolio.css, docs/work/nikolai-portfolio.md. Semantic scope: local personal portfolio prototype. No deployment or public push of profile material. Master resume is read-only. Shared layout and other worktree ownership preserved.

PDF: first mock uses the browser's print-to-PDF with print styling; production automatic LaTeX export remains a follow-up after content review.

Checkpoint / local design handoff 2026-11-11: implemented existing author route for Nikolai only. Three linked product summaries, five native details/summary career groups, biography and print-to-PDF controls. Copy is provisional for user review and based on master-profile.yaml, base LaTeX experience, and existing public product descriptions. No customer specifics or private contact details copied.

Validation: production build and content checks passed. Preview build and content checks passed before final whitespace-only adjustment; final production build/check passed afterward. Browser inspection: desktop 1280, mobile 390, open OpenText role verified, light/dark themes verified, images loaded, no horizontal overflow at mobile width, console error log empty. Mobile text spacing corrected. Screenshot stored outside repository at /Users/khrustal/.codex/visualizations/nikolai-portfolio/desktop.png. Local Astro dev server reported port 4327.

Ownership remains protective for iteration; not integrated or published. Deliberately no push of provisional personal content. Local node_modules symlink is a dependency reuse aid, not a deliverable. Automatic LaTeX PDF generation and portrait selection remain follow-up work; current button explicitly uses browser print-to-PDF.
