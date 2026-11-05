# ThriveKS staging finish — November 5, 2026

Scope: `thriveks/thriveks`, branch `cloudflare-v8-staging`, Pages project `thriveks-v8-staging`. Production domains, branches, secrets, account access, and unrelated projects are outside this change.

## Verified starting point and rollback

Remote staging HEAD, local HEAD, and Cloudflare's successful canonical deployment all identified `f757533727f7e747db8420aa1ad652ff80ed060f` (deployment `602db6ab-d4e5-493d-abe9-5e9ae7115b85`). Created and verified remote branch `rollback/v8-before-enterprise-finish-2026-11-05` at that revision before source edits.

## Actual reference review

Interactively reviewed Midwest Horizons' current homepage in Chrome, its Websites navigation landing page, and the Princeton PT case study. Desktop Websites hover displayed five options; clicking the category opened Signature Websites. Tab/keyboard inspection and mobile 390px inspection showed grouped navigation. The mobile toggle remained labelled Open menu when expanded, and Escape left it expanded in the observed review. Read its entire homepage structure, including services, proof, four project previews, regional links, and closing conversion. Inspected the case study's assignment, services, implementation and patient-journey hierarchy. The current H1 computed to 74.88px at 1440px. Inspected the halo, platform, browser, screen, phone and metric animation rules and watched the live composition. Used the lessons of hierarchy, coherent project presentation and clear destinations; copied no branding, claims or media.

## Reproduced defects and fixes

- Native macOS Safari: opened Projects and clicked All projects. The menu disappeared and the homepage URL remained unchanged. The `focusout` handler closed the disclosure when Safari blurred the summary before delivering the anchor click. Replaced details/toggle synchronization with explicit buttons, controlled hidden panels, synchronous exclusivity, focusin-based departure, and deferred link cleanup. No pointer suppression or synthetic navigation.
- Native Safari reproduced the reported tall screenshot columns. Image HTML supplied 1160×760 dimensions while CSS reset width and set aspect-ratio without resetting height. Safari retained the 760px height at narrow column widths. Removed that entire mismatched section and its obsolete tile CSS. Rebuilt it using bounded, code-native SVG illustrations with research and volunteer destinations matching the heading and copy.
- Ten interior pages loaded only site.css despite containing the same navigation markup as Home and Work. Their mobile button was white and their opened panels were unstyled. All main pages now load the shared navigation styles; the static audit enforces this.
- Five research timeline entries had inline desktop grid columns overriding the mobile breakpoint. Removed the inline styles. Its wide table has a keyboard-focusable, labelled scrolling region.
- Technology's prototype feature combined an inline mint background with inherited white text. Removed the conflicting inline background to restore the intended dark feature and contrast.
- Removed migration/placeholder implementation notes from Apps, clarified its real product/support paths, and made About's board action identifiable. Contact still prepares an email for review and never sends automatically.
- Removed huge stretched favicon backgrounds from WorkPilot, corrected the support submit-button contrast, and gave Code Companion a scroll-based background with a dark fallback. Replaced its misleading Apple-icon directory action with a neutral apps/support action.
- Replaced a long displayed support URL that overflowed Privacy at 320px with a descriptive same-origin support link.
- Added focus containment and reliable trigger focus restoration to research evidence dialogs.
- Added an accessible 404 page so unknown paths do not silently masquerade as successful homepage routes.
- Archived templates remain in source. Their 26 extensionless/HTML public entry URLs redirect to corresponding maintained same-origin documents. This avoids exposing obsolete pages and old-site navigation.

## Assets and preservation

- Original homepage banner verified byte-for-byte unchanged; measured 2:1 at all six requested widths.
- Initially verified the carousel initializer against the starting commit. Final public console inspection subsequently reproduced a non-finite slide index during layout changes (`offsetLeft` on an undefined slide). Actual regression testing then resized through 1920, 320, 1440, 390, 1024, 768, 320, 1920, 390 and 1440px while exercising both manual directions; each size retained six slides, valid dots and exactly one current dot. Autoplay advanced afterward, with no new local-script errors. Hardened visible-card calculations against zero geometry and added load/size refresh. Preserved six destinations, automatic movement, all manual controls, hover/focus pause and reduced motion. Removed the separate opacity-reveal observer so reading content does not depend on animation completion.
- Created two decorative SVG illustrations directly in the community cards. These communicate research and participation; they contain no claimed measurements or documentary imagery.
- Rebuilt WorkPilot and Code Companion previews from their actual updated pages, 1160×760, JPEG optimized. Visited all four external showcase projects and verified their current pages against retained previews. Project stages remain explicit.
- Moved the existing, explicitly labelled data-center concept illustration into staging's own assets and optimized it from approximately 2.6MB PNG to 620KB JPEG. Its conceptual/not-approved caption remains.

## Route and credit inventory

33 HTML source documents: 20 maintained documents (13 top-level including 404, five app pages, two research pages), plus 13 archive sources whose entry points redirect. Every document contains exactly one visible `Website Designed & Powered by ThriveKS` credit, with `ThriveKS` inside strong and a same-origin `/` link. Existing copyright and legal content retained. All 20 maintained credit links were actually clicked locally and arrived at the local homepage. `scripts/verify-public.py` validates every document, shared styles, local files, anchors, image alt attributes and old-site navigation; 63 unique local targets passed.

## Completed local acceptance checks

- [x] Build; syntax checks for edition.js, motion.js and assistant.js; whitespace checks; static public audit.
- [x] Native Safari: all five categories, all 18 submenu destination arrivals, actual interior-page navigation, and anchors. Sources & methods was rechecked after an initial observation occurred before navigation settled.
- [x] Native Safari keyboard: Option+Tab into first submenu link; Escape closes and restores category focus; Space opens; Enter closes. Enlarged-browser reflow switched to mobile navigation; expanded Research and followed Local economy. Restored normal zoom.
- [x] Chrome: all 18 submenu arrivals at desktop 1440 and mobile 390; Enter, Space, Tab, Shift+Tab, ArrowDown, Escape, focus restoration, outside click, exclusivity, breakpoint cleanup and mobile anchor arrival after layout settled.
- [x] All 20 maintained pages measured at 320, 390, 768, 1024, 1440, 1920 CSS px. The sole final privacy overflow was fixed and remeasured as 320/320. Credit, banner proportions and image loading checked. Full desktop/mobile page captures made; the exceptionally long mobile research page exceeds the full-page screenshot limit and requires viewport captures instead.
- [x] Actual carousel automatic movement observed from 381.5 to 762.5px. Next advanced to 1135px. Pause state verified. Focus and hover each held the track stationary across more than one automatic interval. Reduced-motion emulation disabled autoplay and the ticker; manual Next still worked. Emulation reset.
- [x] Assistant open and overlay priority tested, including hiding an already open assistant during navigation. Empty contact form correctly focuses the required name without navigation or transmission. WorkPilot FAQ expansion tested. Evidence dialog open, focus loop, Escape and trigger restoration passed. No messages or payments sent.
- [x] Full-page visual review of Home, Work and every other maintained public page; corrected discovered contrast/content issues. Console error log empty in the final local interaction pass.

## External verification limitations

54 initial external references included two font preconnect origins (root 404 is expected and not a visitor link); audit now limits external destinations to actual anchors. The four external showcase sites opened in the browser, and remaining external results are saved under `../qa/enterprise/external-links.json`. County file hosts failed TLS negotiation for the automated client; Census and KDOT returned 403; some city-directory requests closed or timed out. Retained original research provenance and its already-visible alternative-source guidance. These are unverified external availability checks, not claimed passes. Mobile Safari/iPhone was not available through the connected browser controls; macOS Safari and mobile-width Chrome are separate evidence.

## Public completion evidence

Public deployment ID, exact commit, repeated public checks, and before/after screenshots are recorded in `../qa/enterprise/deployment-result.md` after deployment. Screenshots and structured test records live alongside that file. Local verification alone is not public-deployment verification.
