# Dilum Labs studio website

Independent static studio landing associated with `dilum.io`. It presents
products, professional experience and contact; it is separate from the
2000NL application and product waitlist. Start agent work at [AGENTS.md](AGENTS.md).

## Map

- [index.html](index.html): complete page, inline CSS/JS; external Google Fonts.
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml): Cloudflare Pages deploy on pushes to main, project `dilum-landing`.
- [docs/harness-entrypoints.md](docs/harness-entrypoints.md): ownership/checkpoint for this documentation setup.

There is no package manager, application build, CMS or blog engine configured.
The workflow configuration proves intended deployment, not current domain
binding or successful production status; verify the GitHub run when releasing.

## Preview and release

Serve this directory with a static HTTP server for local preview. Changes go
through an isolated worktree and a reviewed PR. The deploy workflow stages only
`index.html` into `.pages-assets`; if public assets are added, update the explicit
staging step. Internal Markdown and checkout metadata are not site assets.

## Related work

- [Media strategy and article pipeline](/Users/khrustal/dev/2000nl/docs/marketing/README.md): current requirements, not a publishing engine.
- [Product landing / waitlist](/Users/khrustal/dev/2000nl-landing/README.md).
- [2000NL application](/Users/khrustal/dev/2000nl/AGENTS.md).

Read each workspace's own instructions before changing its files. Do not copy
sensitive career records, tax documents, licensed dictionary data or experiment
outputs into the public site. Public author profiles use approved excerpts.
