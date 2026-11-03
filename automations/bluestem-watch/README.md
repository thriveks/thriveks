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
3. Independent Leavenworth County public-meeting coverage: https://citizenportal.ai/feed/53898 — secondary lead only, returned HTTP 200.
4. Developer newsroom: https://bluestemdatacenter.com/newsroom/ — developer statements, returned HTTP 200.
5. Developer materials: https://bluestemdatacenter.com/materials/ — developer materials, returned HTTP 200.

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
