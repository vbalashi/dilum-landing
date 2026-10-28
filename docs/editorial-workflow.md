# Writing and publishing

## Private authoring and public delivery

Private authoring: https://github.com/vbalashi/dilum-editorial . Its Articles
collection is configured for Pages CMS with rich text, image uploads, authors,
category, language, draft state, related products and optional crosspost URLs.
The owner must authorize the installed Pages CMS app for this repo before it
appears in the editor. That new authorization and a browser save roundtrip are
not claimed complete. Never grant CMS access to internal dictionary/prompt repos.

Write there through https://app.pagescms.org/ or edit the same Markdown in VS Code.
Saving changes private files only. There is no public deployment in that repo.
The earlier first-article copy is preserved; the owner may be writing a newer
version elsewhere. Never overwrite that newer version from the preserved copy.

## Local preview

From the private editorial checkout, run scripts/preview.sh with an isolated
studio checkout. The server binds127.0.0.1; the private source/media are loaded
only for local development. INCLUDE_DRAFTS=true requires EDITORIAL_CONTENT_DIR.
CI rejects private editorial paths and draft-inclusion flags. Both production
and public website-preview builds omit drafts. noindex is not access control.

The local preview is for author review, not an artifact to upload. Never point
public CI at the private repository or deploy a local private-content build.

## Intentional publication

After explicit owner approval, set draft:false in the private source and use its
scripts/export-article.py --approved to prepare one article and its referenced
images in an isolated studio branch. The tool refuses drafts/unapproved exports,
does not commit/push/merge, and protects dirty target files. Validate, review and
merge that public change, then verify the article, RSS, sitemap and links.

The public src/content/articles directory contains approved publication sources
only. Do not put unpublished drafts in any branch of this public repo: GitHub
source is readable independently of site build flags. The prior first-article
source was already public; removing its current file does not erase Git history
or immutable earlier deployments. History was not rewritten or deleted.

Article URLs live under /blog/. Keep stable slugs when changing titles. Category
is a single editorial topic, not arbitrary multiple tags; authors/products are
independent fields. Crossposts are optional platform+URL pairs, no automatic
syndication. Old /journal and /products/<product> URLs redirect on Pages.

## Public boundaries

Product pages: /2000nl/, /audiofilms/, /pontix/. 2000NL app sign-in is separate
from invitation-based admission. The waitlist form is on /2000nl/#waitlist and writes through the same-origin
/api/waitlist Function to the existing signup database. The original product
landing remains available; both entry points retain the same signup contract.
Do not duplicate the signup storage or change retention as part of this site.

Search metadata, canonical URLs, JSON-LD, RSS, sitemap and robots use approved
public content. Search Console, analytics and actual crawl/index status are
separate checks, not implied by a successful build.
