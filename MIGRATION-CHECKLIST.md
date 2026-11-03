# ThriveKS preservation-first Cloudflare migration
_Updated November 3, 2026. Staging only. Do not switch the custom domain until the open checks are cleared._

## Environment and rollback
- Live public website: `https://thriveks.com/` — **not changed** by this migration.
- Cloudflare Pages preview: `https://thriveks-v8-staging.pages.dev/` — project `thriveks-v8-staging`, repo `thriveks/thriveks`, branch `cloudflare-v8-staging`.
- Immutable pre-migration reference branch: `backup-v8-before-legacy-migration-2026-11-03`.
- Historic public HTML is copied under `legacy-archive/2026-11-03/`. The original old-site homepage and data center record were checked for complete closing HTML and source length after multi-segment recovery.
- Staging build `scripts/build.mjs` now copies **all** legacy pages, deep app routes, research source library, archive and `_redirects` into `dist/`. Previously it copied only the seven original V8 pages.

## New site routes
- Original V8 content: `/`, `/work`, `/technology`, `/showcase`, `/research`, `/about`, `/connect`.
- Added or restored: `/apps`, `/business`, `/sponsor`, `/volunteer`, `/board`.
- Preserved product routes: `/WorkPilot/home`, `/WorkPilot/support`, `/CodeCompanion/home`, `/CodeCompanion/support`, `/CodeCompanion/privacy`.
- Data-center routes: `/leavenworth-county-data-center-information/` and `/leavenworth-county-data-center-information/LeavenworthCountyDataCenterSourceLibrary.html`.
- Historical board page prominently notes that the list needs reconfirmation before publication as current.

## Known fixes included
- New showcase cards and selected projects are clickable; old logos from Chamber, Leavenworth Local, Rough & Bumble have public destinations. Kesler Family Investments is preserved in the historical homepage but no unverified site is fabricated.
- New Apps cards have clickable titles and names. WorkPilot directs to verified `https://apps.apple.com/us/app/workpilot-os/id6759067469`.
- Code Companion's unverified App Store download is not represented as a real listing; real support and privacy pages are preserved and linked.
- Good Shepherd from Apps now points to its separate active website `https://goodshepherdhomesystem.com/`; unverified pricing and fake contact placeholders are *not* copied into the new app descriptions.
- Prototype destinations (7th Street Feast, First City Museums, Bling Equals Dreams) remain explicitly labeled as prototype/review/in development rather than official completed sites.
- Footer donations now lead straight to the verified Square checkout `https://square.link/u/CHBECj7R` instead of an anchor that would disappear after domain cutover.
- Business, sponsorship, volunteering, historical board, and app URLs are preserved rather than silently redirected to unrelated new pages.
- Avoids publicly promoting the internal `/portal/dashboard` operational console as a business showcase.

## Research custody
- Archived the complete original Aug. 25, 2026 public data-center record and full Source Library (25 distinct destinations in the old source inventory).
- Extended the new record without overwriting original May–Aug detail: Sep. 28 generation-application withdrawal (developer account); Sep. 30 BOCC 4–1 return of PITD regulations; Oct. 14 BESS recommendation/data-center deferral; Oct. 21 BESS resolution (not a Bluestem approval); Oct. 28 3–2 motion directing staff to prepare an advisory-vote proposal (no vote scheduled by that action).
- Source hierarchy distinguishes developer statements, meeting reports, and official actions; no approval inferred.
- All 13 original County PDF destinations retained. The County file host returned automated retrieval failures; alternatives link to County meeting archives and recordings, not falsely claimed mirror PDFs.
- Original video references (7 meeting videos plus County channel) and County archive links remain present.

## Media and cutover risks (must remain visible)
- The old homepage references more than 20 external/legacy images plus `/websiteimagesandvideos/15070906_4094_2160_30fps.mp4`. The original image paths are retained in the archive, but they are **not all self-hosted** in the new Pages project yet.
- The new `_redirects` includes fallback redirects for legacy `/websiteimagesandvideos/`, `/boardmembers/`, `/Thrive/partners/`, app logo folders, festival/museum/feast logos, and the Bluestem concept illustration. This depends on the existing `thriveks.neocities.org` host remaining online; it is a continuity measure, not a completed asset import.
- Keep Neocities and associated hosted paths active until every original file is copied/verified. Do not delete or change the Neocities site during transfer.
- Confirm all custom-domain-dependent app routes and images; the operator console at `/portal/dashboard` has **not** been exposed as a public redirect. Preserve its intended authenticated access separately.
- New `/connect` intentionally prepares an email for review instead of submitting to the historical Google Apps Script endpoint; the original form code is archived, but equivalent backend delivery has not been tested.
- External Square account connection `https://thriveks.neocities.org/Thrive/OAuth2` remains a legacy operation and should be independently verified before retiring the original domain.
- Historical board contacts and any current leadership roster should be confirmed by Thrive before replacing the history with current statements.
- Verify the original Good Shepherd product site and current contact/pricing details independently; do not perpetuate old placeholder contact numbers.
- The new V8 site has `noindex,nofollow` preview metadata and `robots.txt` disallowing the entire staging site. Production indexing requires an intentional SEO/robots change only after approval.

## Mandatory pre-cutover checks
- [ ] Verify every public route, link, CTA and image at desktop and mobile widths on staging.
- [ ] Check the two new data-center routes, all source links and fallback official archives; label unavailable original County PDFs clearly.
- [ ] Verify every legacy-media fallback and migrate binary media into Cloudflare/GitHub-managed assets when feasible.
- [ ] Verify `/WorkPilot/*`, `/CodeCompanion/*`, `/goodshepherd/*`, `/midnightauto/*`, `/kansascityspiritfestival/*`, `/leavenworthclaw`, and sensitive `/portal/dashboard` before any domain change.
- [ ] Test donation checkout without a live charge and contact-form delivery without creating unwanted submissions.
- [ ] Validate all 13 organizational cards, app logo/wordmark links, historical membership status, and prototype labels.
- [ ] Record current Cloudflare DNS, SSL, page rules, and Google Workspace **MX, SPF, DKIM and DMARC** before cutover; do not touch email DNS.
- [ ] Agree a precise rollback procedure and verify the prior public site remains accessible throughout the switch.
- [ ] Remove staging-only noindex directives **only from the approved production deployment**; check canonical URLs, sitemap, SEO metadata and Search Console.
- [ ] Obtain explicit approval for live `thriveks.com` cutover. **No production domain or mail configuration changes have been made.**

## Staging build and static QA (November 3)
- Cloudflare Pages deployment succeeded after updating `scripts/build.mjs` to include all preserved files.
- Removed redundant `.html` 200 rewrites that caused redirect loops on clean URLs; Cloudflare Pages serves extensionless pages natively.
- Live browser-rendering check confirmed `/leavenworth-county-data-center-information/` loads the new update and preserved May–August chronology.
- Live browser-rendering check confirmed `/apps` loads three product cards and the correct WorkPilot App Store link.
- Static route/link scan covered 19 published HTML pages and 446 anchor elements; no empty targets, missing known HTML pages or same-page fragment errors were found. This is a source-level check, **not** a full external destination/HTTP test.
- Browser-rendering checks on the source-library page encountered rate limits; the deployed HTML and its 13 original PDF links were validated from the committed source.
