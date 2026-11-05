# ThriveKS staging design audit and implementation

Reviewed November 5, 2026. Target: `thriveks/thriveks`, `cloudflare-v8-staging`, Cloudflare Pages project `thriveks-v8-staging`. No production-site branch, domain, or project configuration changes.

## Interactive reference audit

Reference: https://midwesthorizons.com/ . Also visited its Signature Websites page and opened the Princeton PT case study from a homepage project card.

- **Desktop navigation:** At 1440px the main categories are links, with dropdowns revealed on pointer hover and keyboard focus. Hovering Websites exposed five choices. Clicking Websites navigated directly to Signature Websites rather than toggling a disclosure. Pressing Tab from Websites focused Industries and exposed its industry-specific links. This distinction is important: the current site is not using explicit desktop click-to-open buttons.
- **Mobile navigation:** A hamburger opens a tall dark grouped panel containing Websites, Industries, Proof, Locations, Strategy, About, and Contact, plus secondary calls to action. Tested at 390px and the initial narrow viewport. The grouped content is extensive and requires scrolling. Escape did not close the expanded mobile panel in the observed test; its accessible label also remained “Open menu” while expanded. ThriveKS deliberately improves those behaviors.
- **Typography:** Current homepage display type is Inter, weight 700. At 1440px the H1 computed to 74.88px with 70.39px line height and approximately -4.12px letter spacing; major H2s were 52px with 53.04px line height and -2.6px letter spacing. Its impact comes from weight, compact leading, controlled line length, and selective color emphasis.
- **Design system:** Deep green, warm ivory, gold/lime accents, compact uppercase labels, rounded preview cards, fine borders, layered shadows, and alternating light/dark sections establish rhythm. The homepage prioritizes positioning, connected services, proof, recent launches, locations, and a closing inquiry. Repeated conversion actions are prominent.
- **Homepage motion:** Inspected active CSS animations on the rotating halo, floating platform/browser/phone, drifting screen image, metric badges, and core badge. Service/project elements reveal with opacity and translated movement. The current recent-launch area is a four-card CSS grid; the inspected project card uses a 0.7-second opacity/transform transition, not a continuous CSS autoplay animation. This may differ from the earlier referenced version. ThriveKS retains its already working six-project automatic reel rather than replacing it with the current reference grid.
- **Project hierarchy:** Clicking Princeton PT opened a case study with a single primary headline, an assignment panel, project framing, service categories, outcome summary, implementation details, rationale, and a closing project action. The useful pattern is readable grouping and clear progression, not its wording or industry claims.
- **Responsive behavior:** Wide layouts pair display headlines and visual/summary panels; narrow layouts stack the content and replace the category row with a hamburger. The long mobile navigation is a useful lesson in keeping ThriveKS choices focused.

## Implemented differentiation

- Preserved ThriveKS branding, Space Grotesk/DM Sans type families, community content, and green/cream identity. No Midwest Horizons wording, logos, imagery, gold buttons, or illustrated growth-system composition copied.
- Added static native disclosure navigation to all 12 primary pages: Projects, Services, Community, Research, About. Each has a brief introduction and useful links to existing pages or verified anchors, with a persistent contact action.
- Desktop uses a spacious two-column grouped panel. Mobile uses scrollable stacked disclosures. One group opens at a time. Enter/Space, Tab/Shift+Tab, Up/Down entry to links, Escape, outside click, focus departure, and breakpoint changes are handled. Expanded state and control relationships are exposed to assistive technology.
- Increased headline weight to 700, tightened display leading, adjusted fluid sizes and line lengths, and strengthened green emphasis. Unified work-page hero, project headings, row treatment, service-card borders, footer headline, and reel headings.
- Kept the original banner file and its full 2:1 dimensions; no crop, replacement, zoom, or image processing.
- Kept all six project previews and the existing autoplay, manual next/previous, dots, pause, hover/focus pause, offscreen behavior, and reduced-motion logic. Enlarged dot targets and gave moving cards vertical breathing room.
- Hid the floating assistant launcher only while mobile navigation is expanded so it cannot cover menu choices. The assistant itself is unchanged.
- Removed the outbound action on the existing MTA Trading directory entry after its public profile returned HTTP 404. Preserved the name, logo, and separate-venture classification, with a clear unavailable label.
- Corrected an existing duplicated App Store path on the Apps page using the already-correct WorkPilot page destination.
- Build includes the new isolated `polish.css` refinement layer. Original styles and motion logic remain available at the rollback commit.

## Completed predeployment QA

- `npm run build`, syntax checks for `edition.js` and `motion.js`, and `git diff --check`: passed.
- Parsed all 12 primary pages: 61 unique local links/assets, all target files and fragments resolved; no main-page links to the old ThriveKS/Neocities site.
- Desktop: actual Projects/Services clicks, category exclusivity, Enter, Space, Tab into links, ArrowDown into first link, Escape focus restoration, outside-click dismissal, navigation to Work and About.
- Mobile 390px: clicked all five categories; only one remained open each time; no horizontal overflow. First Escape closed a group; second closed the mobile navigation and focused its toggle. Clicked Research → Local economy and verified `/research#economy` and closed navigation.
- Responsive 320, 390, 768, 1100, 1101, 1440px: no horizontal page overflow. Menu switches at 1100/1101px. Measured banner ratio remained exactly 2:1 at tested homepage sizes.
- Reel: six cards present. Observed automatic scroll from 0 to 381px, then Next advanced to 763px. Pause set the pressed state. Reduced-motion emulation disabled automatic playback and stopped the decorative ticker. Reset the emulation afterward.
- Ask Thrive opened and closed successfully. Inquiry handler, apps, donations, research content, and externally linked project implementations were preserved; no form submission, donation, or app purchase was performed.

## Rollback

Remote branch: `rollback/v8-before-navigation-polish-2026-11-05`

Commit: `bdda78c413b2c70bff0e485afa9c81d0af9c1dc4`

Previous successful staging deployment: `26df9e3f-39ce-4235-af61-0aadc9e08a46`, https://26df9e3f.thriveks-v8-staging.pages.dev .

Cloudflare calls this project's canonical branch deployment “production”; that label applies only to this separate staging project and does not mean the live ThriveKS production website was modified.

## Public deployment checks

Initial staging deployment succeeded at commit `ad4b269d62455f14ff74db6e56cf1c4b45be37ed`. Public homepage loaded the new styles, all five menus, original banner, and six projects. Checked 65 public destinations: all staging page/asset destinations passed, with no Neocities redirects. MTA Trading returned 404 and was unlinked in the follow-up. Census QuickFacts and KDOT returned 403 to the automated client; retained these official-source links and do not claim their content was verified. Screenshots and the complete HTTP results are stored in the workspace `qa` folder.
