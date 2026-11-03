# Project Bluestem source monitoring
Configured November 3, 2026. **Staging research site only; not a replacement for editorial source review.**

## Live service
- Worker: `thriveks-bluestem-watch`
- Endpoint: https://thriveks-bluestem-watch.thriveks.workers.dev/status
- Health: https://thriveks-bluestem-watch.thriveks.workers.dev/health
- Cloudflare Cron: `0 */6 * * *` (every six hours, UTC)
- KV namespace: `thriveks-bluestem-source-watch`, binding `SOURCE_STATE`, key `status:v1`
- Source code: [worker.js](worker.js). This file is the maintained backup/source for the deployed Worker; the Cloudflare Worker currently carries the same version.
- Frontend: `leavenworth-county-data-center-information/source-watch.js` and `source-watch.css`; included in both the main Project Bluestem record and the Source Library.

## Sources monitored
1. Leavenworth County Commission agendas/minutes: https://files.leavenworthcounty.gov/government/county_commission/agenda.php — official, but returned HTTP 525 to Cloudflare Workers during setup.
2. County Planning and Zoning schedule: https://files.leavenworthcounty.gov/departments/planning___zoning/schedule/index.php — official, but returned HTTP 525.
3. Official Leavenworth County YouTube meeting-recording feed: https://www.youtube.com/feeds/videos.xml?channel_id=UCIoaDlW1ch-QLR_HsaQMJQQ — official videos, returned HTTP 200.
4. Independent Leavenworth County public-meeting coverage: https://citizenportal.ai/feed/53898 — secondary lead only, returned HTTP 200.
5. Developer newsroom: https://bluestemdatacenter.com/newsroom/ — developer statements, returned HTTP 200.
6. Developer materials: https://bluestemdatacenter.com/materials/ — developer materials, returned HTTP 200.

The November 3 initial scan reached four of six collections; both County document-server endpoints remained unavailable (HTTP 525), while the official YouTube feed and three other collections were accessible.

The source monitor calculates a digest of relevant links/listing content on successful checks and stores the timestamp when observed content changes. It **does not** infer that a public meeting approved, rejected, amended, or voted on a proposal. The browser displays publication links from the developer newsroom and displays source reachability and pending review. Full research summaries are retained as editorially dated historical records.

## Follow-up editorial watch
A separate daily ChatGPT recurring watch reviews new findings against source documents where accessible, proposes or attempts source-backed minimal edits on `cloudflare-v8-staging` only, and notifies on material changes or sustained monitoring failures. It is **not a substitute** for confirming deployment success or reviewing any contested claims. Production domain DNS and mail are not changed by this job.

## Safety and maintenance
- Preserve original May–August 2026 record, Source Library citations, and September–October chronology.
- Never convert developer promotional text into verified government action.
- Source errors, failed SSL handshakes, or blocked documents must be shown as unavailable; absence of updates **does not** mean no action has occurred.
- Only promote staging to `thriveks.com` after separate cutover approval.
- To pause monitoring, remove the Cron Trigger from this isolated Worker. Site history remains intact.
- If dynamic endpoint fails, the website displays a fallback message, and the existing static researched record remains readable.
- Check external website terms and technical availability before adding new monitored sources. Do not bypass access controls.

## County meeting video → transcript review workflow
- The official County YouTube Atom feed is indexed every six hours. The Worker saves `latestVideos` (video ID, title, publish time, video URL) and deduplicates against `knownVideoIds` in KV. Newly uploaded videos are added to `pendingVideoReview` with status `needs-transcript-screening`; a first scan establishes a baseline and does not announce older uploads as new.
- The public Project Bluestem pages show latest videos in an expandable section, clearly described as recordings rather than transcripts. The monitor does **not** publish every meeting as a Bluestem event.
- The separate daily ChatGPT watch screens new recordings for Bluestem relevance, then analyzes a *permitted* raw VTT or other sourced transcript when one is available. Preserve raw captions and cleaned text separately with meeting date, video ID, timestamps, source URL, hash/completeness where accessible. Verify names, figures and especially motion wording and roll-call votes against official video and posted minutes.
- The YouTube Data API `captions.download` requires permission to edit the source video. A publicly accessible video is not an authorized third-party automatic-caption download. Do not presume access or silently build a scraper around that restriction.
- Preferred next step for full hands-off transcription: obtain a County-provided caption/VTT or audio export, a documented authorized feed, or rights-cleared audio for independent speech recognition. Independent AI meeting services are useful *leads* and should be cross-checked, not silently recategorized as primary official transcripts.
- When no permissible transcript exists, the watch can identify the meeting and request a transcript for manual import. This is a deliberate human fallback rather than pretending fully automated transcription has occurred.
- `pendingVideoReview` retains up to 80 items until they are explicitly reconciled. The monitor does not currently implement a reviewed/cleared endpoint: do not represent the queue size as a count of verified Bluestem cases.

Verified Nov. 3, 2026: the live County feed supplied video titles and IDs; the on-page expanded list rendered in Cloudflare staging; County document hosts continued returning HTTP 525.