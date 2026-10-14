# Writing and publishing

## One source, two ways to edit

Canonical website content: `src/content/articles/*.md`. PagesCMS uses the same
Markdown as an agent. Body is WYSIWYG rich text, withMarkdown source switch; it is
not a drag/drop page builder or pixel-identical site preview. Schema preserves
unconfigured metadata with `settings.content.merge:true`.

Use fixed slug for URL; changing title must not changeURL. Select author, topic,
language and related products. Main topic is a single choice, author/product are
independent. Crossposts are optional platform+URL pairs; never point to invented
publications. No separate tracker or automatic syndication.

## One-time account setup (owner action)

1. Visit https://app.pagescms.org/ and sign in withGitHub.
2. Install/authorizePagesCMSGitHubApp for `vbalashi/dilum-landing` only.
3. Select this repo and thejournal-platform branch to try theconfigured editor.
4. Open thedraft article, make one small edit, save; verify theMarkdowncommit,
   preview and metadata remainintact. Then an agent can safely make a secondedit
   and ownerchecks itback ineditor. Do not claim thisroundtrip until performed.

Config alone does not authorize the app. No password/token goes in this repo.
AdditionalGitHubApp access must be granted by the owner. ForOlesia, use normal
repo/collaborator authorization, not a shared GitHub password.

## Draft → preview → publication

`draft:true` default. Production omitsdrafts fromarticle routes, journal, author/
product/topic lists,RSS andsitemap. Explicit preview builds includedrafts butset
noindex and robots Disallow; preview URL is not private. No sensitive unfinished
material insharedpreview.

After authorapproves, setdraft:false with final metadata. Saving this on main can
publish immediately; it is not an approval queue. Use a feature branch/PR when
review is needed. Current first article remainsdraft:true. Its Russian text is a
review copy; English version has not beenapproved/generated inthisimplementation.

Originalreviewcopy in2000NL is previouseditorialmaterial, not a secondindependent
website source. OnceCMSediting starts, edit here; synchronize any requestedreview
export from thissource ratherthan editingtwocopies simultaneously.

## Search basics

Server-generated visibleHTML, stablecanonicalURL, titles/descriptions, language,
authorlinks, visible-matchingBlogPosting/Person/OrganizationJSON-LD, RSS andsitemap.
Onlypublishedarticles areindexed/syndicated. Emptytopicpages carrynoindex. Google/
BingSearchConsole ownership/submission andactualcrawl/index status are notset up
bythiscode. Analytics/conversiontracking is aseparateunselectedstep.

No claim ofAIranking gains or specialllms.txt requirement. Ordinarysearchcrawl
access andAItrainingpermissions aredifferent decisions; no provider-specific
trainingpolicy silently added. CheckCDN/WAF ifactualcrawlaccess isblocked.
