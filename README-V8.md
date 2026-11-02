# ThriveKS Version 8 — Cloudflare staging

This branch is a standalone rebuild of the approved Thrive Local Foundation preview, for **Leavenworth, Kansas**.

## Deployment

- Cloudflare Pages project: `thriveks-v8-staging`
- Build command: `npm run build`
- Build output directory: `dist`
- Source branch: `cloudflare-v8-staging`
- `main` and the existing `thriveks.com` deployment are unchanged.

## Site content

Seven pages: homepage, projects, technology, organizations, research, about, and contact. The business directory separates projects and partner relationships. The research desk cites public records and distinguishes prospects from outcomes. Images are based on the previous ThriveKS portfolio and have been optimized where available.

## Known staging limitations

- The contact form prepares a mailto message. It has **no** server-side intake or storage.
- Thrive Guide is a transparent rule-based navigation assistant, **not** a hosted LLM or a fact-checked conversational backend.
- EasyEdit administrative editing is **not** included. Secure auth, roles, approvals and revision history must be implemented before production.
- Some historic partner logos are loaded from their existing public source websites; these should be localized and verified with partners before production.
- Staging has noindex headers and robots.txt to prevent duplicate indexing. Production SEO/canonical URLs require a separate domain-cutover plan.
- Public case studies and partner permissions need verification before domain launch.

Do not bind `thriveks.com` or change its DNS until the launch checklist and approval are complete.
