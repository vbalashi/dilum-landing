# CMS + SEO validation — 2026-10-14

## Recommendation
Astro static pages + plain Markdown frontmatter + hosted Pages CMS. CMS is editing layer, not public design or hosting. Typography entirely controllable in templates/CSS. CMS no content database; content stays GitHub. Source: https://pagescms.org/docs/ (official).

Pages CMS official home explicitly says online version, self-hosted and license are free (MIT). https://pagescms.org/

Actual WYSIWYG `rich-text` supports Markdown/HTML and Editor/Source switch. This is body editing, not page-layout editing or pixel-identical public preview. https://pagescms.org/docs/configuration/fields/rich-text/

User setup: sign into https://app.pagescms.org with GitHub, install GitHub App on repo owner, choose repo. Limit app grant to studio site repo. Config alone does not authorize CMS. https://pagescms.org/docs/quick-start/

## Proposed config (adapt field names to actual Astro schema)
```yaml
media:
  input: public/images
  output: /images
content:
  - name: articles
    label: Articles
    type: collection
    path: src/content/articles
    format: yaml-frontmatter
    filename: '{primary}.md'
    exclude: ['README.md']
    view:
      primary: title
      sort: date
      order: desc
    fields:
      - name: title
        type: string
        required: true
      - name: description
        type: text
      - name: date
        type: date
      - name: draft
        type: boolean
        default: true
      - name: author
        type: string
      - name: category
        type: string
      - name: lang
        type: string
      - name: body
        type: rich-text
        options:
          format: markdown
          switcher: true
settings:
  content:
    merge: true
```
Official schemas: https://pagescms.org/docs/configuration/content/ ; https://pagescms.org/docs/configuration/media/ ; https://pagescms.org/docs/configuration/fields/boolean/ . Default field option should be roundtrip tested against deployed CMS before declaring verified implementation.

CRITICAL: `settings.content.merge: true` preserves agent-added metadata not configured in UI; default false drops unconfigured keys. https://pagescms.org/docs/configuration/settings/

Draft policy is our implementation: Astro must filter draft articles from routes, listings, feed AND sitemap. CMS saves commits to selected repo branch; save to production main with draft=false can publish immediately under automated builds. No promise of editorial PR workflow unless actually configured/tested. Prefer branch preview or draft=true until approved. Need actual UI save/roundtrip test author and agent edits before saying setup complete.

## Keystatic alternative
Keystatic Cloud provides GitHub auth and free <=3 users per team; Pro $10/month and +$5/user beyond3. Supports local/files/GitHub data. More integrated React editor and schema code to maintain; possible future alternative if CMS editor insufficient. https://keystatic.com/docs/cloud ; https://keystatic.com/docs/introduction . Do not claim it is paid by necessity.

## Search / AI discovery
Google official AI Features guide: no extra technical requirements or special AI text files/schema required; indexed eligible snippets, readable textual content, internal links, crawl access and visible-content-matching structured data. Inclusion not guaranteed. https://developers.google.com/search/docs/appearance/ai-features . This supports prioritizing normal technical SEO, not claiming llms.txt improves rankings. Another newer official guide surfaced with differing feature-eligibility wording: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide — if discussing Search Console eligibility toggles validate live account instead of asserting exact UI.

OpenAI bot controls independent: OAI-SearchBot search appearance, GPTBot training, ChatGPT-User user-triggered visits. Allowing search does not require training permission. https://developers.openai.com/api/docs/bots . CDN/WAF must also allow search crawler access. Training policy separate explicit choice; don't silently make it business requirement.

Practical first release: canonical URLs, unique titles/descriptions, semantic HTML, public author/profile pages, product pages truthful about available vs alpha/planned, sitemap, RSS, robots, valid Article/Person/Organization JSON-LD matching visible content, image sizes/alt, lang tags, responsive reading widths. Crossposts optional metadata links; canonical article stays own site. These are engineering proposal, not guaranteed visibility outcomes. CMS, visual quality, hosting and discoverability are four separable choices.
