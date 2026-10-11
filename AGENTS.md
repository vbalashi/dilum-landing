# Dilum studio website

Start at [README.md](README.md). This independent repository owns the static
Dilum Labs studio landing, not the 2000NL application or its product waitlist.

## Route first

- Site markup, CSS and browser behavior: `index.html` (no application build).
- Deployment: `.github/workflows/deploy.yml`.
- Shared media strategy, audience, economics and article briefs:
  `/Users/khrustal/dev/2000nl/docs/marketing/README.md`.
- 2000NL product landing / waitlist: `/Users/khrustal/dev/2000nl-landing/README.md`.
- Training/dictionary runtime: `/Users/khrustal/dev/2000nl/AGENTS.md`.
- AudioFilms / Pontix: respective workspace entrypoints under `/Users/khrustal/dev`.

## Work rules

Read `/Users/khrustal/dev/AGENTS.md` and its lifecycle contract before changes.
Use an isolated issue/plan-owned worktree; keep reference main clean. Do not
copy app logic, waitlist storage or research datasets into this repository.
Studio focus: products, author portfolios and contact; project-based cooperation
is secondary. English is primary. Blog engine/editor remains undecided; internal
article ideas are not approved public copy. Preserve author attribution and
mark unreleased capabilities honestly.

Deploy only the explicit site asset directory prepared by the workflow; keep
README/AGENTS, Git state and internal notes out of public assets. Add any future
site assets deliberately to that preparation step.

## Validation

For docs: check local links and `git diff --check`.
For HTML/CSS/JS: preview the static page and check the changed behavior.
For deployment changes: verify staged asset contents and the production workflow.
Do not claim deployment from a successful local preview or an HTML canonical URL.
