# Harness entrypoints — 2026-10-11

Work reference: companion to 2000NL PR#671, user request to close the studio
website documentation gap. Scope: README/AGENTS, this record, ignore rules and
explicit deployment asset selection. No markup, design, product behavior or
public copy changes.

Start: reference main clean at ea932e6, no open PRs/other worktrees. Isolated
checkout `.worktrees/harness-entrypoints`, branch `codex/harness-entrypoints`.
README/AGENTS give short routes to this site's source, shared media documents,
product landing and app. Workflow now uploads a staging directory containing
only unchanged index.html; this prevents new internal docs being published by
the previous whole-directory upload.

Validation: local Markdown targets exist; git diff --check; staging directory
contains exactly index.html and its hash equals source. Merge/deployment evidence
belongs to the companion PR. No website redesign, CMS selection or content
publication implied. Reference checkout sync and worktree retirement after merge.
