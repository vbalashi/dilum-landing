# Studio waitlist

The 2000 NL product page has a same-origin form at /2000nl/#waitlist. The Pages
Function /api/waitlist stores the same fields in the existing EU Cloudflare D1
waitlist_signups table: email, language, interests, early_tester, created_at,
updated_at. Rejoining updates the row identified by normalized email. It does
not create an application account, send an email, subscribe to a newsletter or
charge a payment.

The original product landing remains live and can still accept requests into
the same table. This change does not migrate/copy signup rows or alter that
working checkout. The handler derives from its committed08ceb02 implementation.
Existing daily retention remains unchanged:12 months since updated_at, removal
requests to nik@dilum.io. The cleanup Worker remains the existing owner.

## Deployment

Production dilum-landing Pages must bind WAITLIST_DB to the existing
2000nl-waitlist database. This binding is configured in the Pages project, not
in browser code. Preview has no database binding. In addition, the Function
refuses every hostname except dilum.io, even if someone accidentally binds a
preview database. Local and SITE_PREVIEW builds display a no-send form result.
_routes.json invokes Functions only for /api/waitlist; other pages remain static.
GitHub Actions builds/tests the form and deploys the functions folder alongside
dist via the existing Pages workflow. No new database or retention Worker.

## Verification and recovery

Run npm run test:waitlist and both build/content checks. Check local/mobile and
theme rendering. Remote GET /api/waitlist must return405 on dilum.io; preview
must return403. A filled honeypot returns200 without storing a record. Unit
checks cover SQL parameters/upsert, origin, size, invalid data, absent binding,
storage failure and preview isolation. Never submit a person's email as QA.
A real signup can be verified with an owner-approved test address and removed
through the existing access-controlled D1 operations. Do not print signup data
into logs or CI. Existing private setup/lookup/removal guide lives in the product
landing docs/waitlist-operations.md workspace.

To roll back the studio UI, restore the preceding Pages deployment. Keep the
existing landing and storage intact. Do not delete the database or cleanup job.

References: https://developers.cloudflare.com/pages/functions/api-reference/
and https://developers.cloudflare.com/pages/functions/bindings/ .
