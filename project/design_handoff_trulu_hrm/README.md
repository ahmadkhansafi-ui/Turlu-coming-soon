# Handoff: Trulu — HRM Dashboard (Payroll-centric, AI-forward)

## Overview
Trulu is a responsive web HRM (Human Resource Management) platform built around **payroll as the hero feature**, wrapped in full people management — attendance, PTO, onboarding, performance, documents, and reporting. Its two differentiators versus generic incumbents (e.g. Deel/Gusto-style tools) are:

1. **AI front-and-center** — a daily AI brief, an "Ask Trulu" command bar, a full AI assistant drawer, anomaly detection on payroll/overtime, document parsing, and AI-prioritized approval queues.
2. **Client-customizable theming** — an in-product Appearance picker (accent color, light/dark, typeface) that persists per browser, so each client company personalizes their own instance.

The demo is themed for a **pediatric clinic ("Kidsvillepeds")** — clinical roles, departments, and healthcare workflows (HIPAA training, credentialing, EHR access, license expirations). The role/department/copy labels are demo data and should be made configurable in production.

Primary users: **HR / People admins** and **Payroll managers / Finance**.

---

## About the Design Files
The files in this bundle are **design references created in HTML/React-via-Babel** — prototypes showing intended look and behavior, **not production code to copy directly.** They run entirely in the browser with no build step, mock data, and canned AI responses.

Your task is to **recreate these designs in the target codebase's environment** (React, Vue, Svelte, etc.) using its established patterns, component library, data layer, and real APIs. If no frontend environment exists yet, choose an appropriate modern stack (the design maps most naturally to **React + CSS variables / CSS modules or Tailwind with a custom theme**). The HTML is the source of truth for *visual* and *interaction* intent; wiring, data fetching, auth, and persistence are yours to implement properly.

---

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, shadows, and interactions are all specified here and in the CSS files. Recreate the UI pixel-accurately using your codebase's libraries. Exact design tokens are in `brand.css` (theme variables) and `app.css` (component styles); this README extracts the important ones.

---

## Tech shape of the prototype (for reference only)
- **React 18** (UMD) with **Babel Standalone** transpiling inline JSX in the browser. In production, use a real build pipeline.
- **No router** — `active` state in the top-level `App` component swaps the main screen (`home`, `payroll`, `people`, `time`, `onboarding`, `performance`, `documents`, `reports`, `settings`). Replace with your real router.
- **Two stylesheets**: `brand.css` (design tokens + light/dark themes + shared atoms `.card/.btn/.pill`) and `app.css` (all component styles, prefixed `.tl-`).
- **Icons**: a hand-rolled inline-SVG set (`Icon` component, 24×24, `currentColor`, configurable stroke width). Swap for your icon library (Lucide is the closest match in style — thin line icons, round caps/joins).
- **Fonts** (Google Fonts): Schibsted Grotesk (display/headings) + Hanken Grotesk (body) by default. Alternates wired in: Plus Jakarta Sans, Manrope, Geist.
- **Mock data** lives at the top of `trulu.bundle.jsx` (dashboard) and `screens.jsx` (sub-screens). **Canned AI**: replies are keyword-matched strings — replace with real model calls.

---

## Global Layout

**App shell** (`.tl-shell`): CSS grid, `grid-template-columns: 256px 1fr`, min-height 100vh.
- **Left**: fixed 256px **sidebar** (`.tl-sidebar`), sticky full-height, `--surface` background, 1px right border.
- **Right**: **main column** (`.tl-main`) — sticky **topbar** (`.tl-topbar`) above a scrolling **content area** (`.tl-content`, max-width 1320px, centered, 24–26px padding).
- Main column background is a subtle layered gradient: a radial accent glow top-right (`color-mix(--primary 10%)`) over a vertical `--bg-grad-a → --bg-grad-b` gradient.

**Responsive breakpoints:**
- `≤1080px`: dashboard grid collapses to one column; KPI strip → 2 columns.
- `≤920px`: sidebar becomes an off-canvas drawer (hamburger in topbar toggles `.open`; backdrop scrim `.tl-scrim`); payroll hero stacks.
- `≤720px`: tighter padding; search bar flexes; ⌘K hint hidden; big numbers shrink.
- `≤520px`: KPI strip and payroll breakdown → single column.

**Sidebar contents:**
- Logo at top (`<img>`, swaps light/dark variant by theme — see Assets).
- Nav label "Workspace", then nav items (see Screens). Active item: `--primary-soft` background, `--on-soft` text, accent icon, with an icon "pop" animation on activation. Item with a badge (Payroll → "Run due") shows a small warn-colored pill; Trulu AI shows an accent-colored count badge.
- "Intelligence" group with a **Trulu AI** item (opens the AI drawer).
- Bottom: **profile button** (`.tl-profile`) — avatar (gradient), name, role ("HR"), gear icon → Settings.

**Topbar contents (left→right):** hamburger (mobile only) · **search/Ask bar** (`.tl-searchbar`, pill, opens AI drawer, shows ⌘K) · spacer · **Appearance picker** (palette icon) · **theme toggle** (sun/moon) · **notifications** bell (with red dot) · **company switcher** (`.tl-company`, logo tile + name + plan, desktop only) · **Run payroll** primary button (desktop only).

---

## Screens / Views

The sidebar nav (`NAV` array) defines 8 workspace screens + Settings. **Home is fully built**; the others (`screens.jsx`) are functional demos of the intended layout/interactions.

### 1. Home (`home`) — the dashboard
**Purpose:** Morning command center — what needs the admin before the next payroll run.
**Layout:** Greeting header (`.tl-greet`: "Good morning, Ali 👋" + subtitle), then a 2-column grid (`.tl-grid`, `1fr 372px`, 18px gap, `align-items: start`). Left column is the main feed; right column is the rail. Below 1080px → single column.

**Left column (in order):**
- **AI Brief** (`.tl-aibrief`) — *signature element.* Full accent-gradient card (`linear-gradient(135deg, --primary-deep, --primary 58%, --primary-bright)`), radius `--r-xl` (24px), white text, soft white radial glow overlay that breathes (subtle infinite animation, disabled for reduced-motion). Contents: a "Trulu AI" chip + "Daily brief · <date>", a headline, then 3 insight rows (`.tl-aiitem`, translucent white cards each with a tinted status icon, text, and a white pill action button), then an **Ask bar** (white pill input + accent send button) and suggestion chips.
- **Payroll Hero** (`.tl-payroll`) — `.card`, 2-column (`1.25fr 1fr`). Left: status pill ("On track" with pulsing live dot), cycle label, **gross payroll** big number (40px, 700, tabular-nums, count-up animation), a "Runs in N days" chip, and a 4-cell breakdown grid (Net pay / Taxes / Benefits / Paid). Right (`.tl-payroll-steps`, `--surface-2` panel): "Run checklist" with X/6 count, a progress bar (grows on mount), 6 steps (done = filled accent circle w/ check; pending = numbered; one shows a "3 of 6" warn note), and a full-width **"Review & run payroll"** primary button.
- **KPI Strip** (`.tl-kpis`) — 4 stat cards (`.tl-kpi`). Each: top row with a tinted square icon + delta (up deltas in `--ok` green with up-arrow); big value (28px, 700, **count-up animation**); label; sub-label. **Hover:** lifts `translateY(-3px)` + shadow + icon fills with accent. Cards are clickable → navigate (headcount→People, approvals→Payroll, out→Time, cost→Payroll). Data: Headcount 248 (+6), Pending approvals 7 (3 urgent), Out this week 12 (5%), Monthly payroll $1.28M (+2.1%).
- **Trend Chart** (`.tl-bars`) — `.card`. 6-month payroll cost bar chart, CSS-only. 6 columns, each: value label ($X.XXM), a track with a bar that **grows up on mount**; current month bar uses an accent gradient + glow, others are `--surface-3`. "6M" pill in header.
- **Onboarding pipeline** (`.tl-onb` rows) — `.card`. 3 new hires; each row: avatar, name + role, a thin progress bar + %, start date, and an "AI template" tag (accent pill w/ sparkle) when applicable.

**Right column (rail):**
- **Approvals queue** (`.tl-approval`) — `.card`, tabbed (`.tl-tabs`: Time off / Expenses / Timesheets, each with a count). Each row: avatar, name + team, detail + bold value, and an **AI flag** line (sparkle + note; flagged ones in warn color). Actions: ghost ✕ (deny) and accent ✓ (approve) mini-buttons; on action the row shows an "Approved" pill and fades to 58% opacity. "AI-prioritized for this run" subtitle.
- **Out this week** (`.tl-out`) — `.card`. Rows: avatar, name, reason pill, date range. "Calendar" action.
- **Activity** (`.tl-feed`) — `.card`. Timeline rows: tinted icon, text, relative time. Tones: primary (AI events), ok (approvals), muted (filings).

### 2. Payroll (`payroll`)
Run-payroll flow. Pre-run **AI anomaly scan** strip (overtime spike, parsed locum invoices), payroll summary/breakdown, run checklist, employee/contractor pay lines, search. This is the **core feature** — give it the most production attention.

### 3. People (`people`)
Employee directory. Searchable + department filter (`DEPTS`: All, Pediatrics, Nursing, Clinical, Front Desk, Lab, Billing, Administration). Table of staff: name, role, dept, status (Active / On leave), location, comp, start date, contact. ~9 demo rows.

### 4. Time & Attendance (`time`)
PTO request queue with approve/deny, AI coverage-risk flags ("2 providers already out — coverage risk"), and an anomaly strip (nursing overtime +210%).

### 5. Onboarding (`onboarding`)
**AI template builder.** Enter a role → generate a role-specific onboarding checklist (license/credential checks, HIPAA training, EHR access, payroll/benefits enrollment, shadow shifts). New-hire cards with per-task completion. Demonstrates the "customizable templates" differentiator.

### 6. Performance (`performance`)
Review cycle tracker. Reviews list with status (Submitted / In progress / Not started) and scores; detail panel.

### 7. Documents (`documents`)
Document library with **AI parsing**. Searchable list (offer letters, W-4s, locum invoices, licenses, HIPAA policy). AI-parsed docs show extracted fields; a simulated upload parses a new invoice and shows matched fields. Status chips: Signed / Parsed / Needs review / Expiring / Published.

### 8. Reports (`reports`)
**Natural-language reporting.** Ask a question → AI returns a headline stat + explanation (overtime, turnover, payroll cost, PTO balances, headcount). Keyword-matched in the demo; back with real analytics + LLM in production.

### 9. Settings (`settings`)
Tabbed (profile, etc.). Profile form, plus **Integrations** list: Slack, QuickBooks, Athenahealth (EHR), Check (payroll/tax), SterlingMD (background/credential), CAQH (provider credentialing) — connected/disconnected states.

### AI Assistant Drawer (global, all screens)
Right-side slide-over (`.tl-ai-drawer`, fixed, `min(420px,100vw)`, slides in via `transform: translateX`). Opened by the search bar, ⌘K, the sidebar Trulu AI item, or any "Ask Trulu" affordance. Header: gradient orb + "Trulu AI / Knows your people & payroll" + close. Body: empty-state greeting, then chat bubbles (AI left w/ orb + `--surface-2` bubble; user right w/ accent bubble), animated typing dots (~850ms) before each reply. Footer: suggestion chips + message input. Esc closes. Replies are **canned keyword matches** — replace with streaming model calls.

---

## Interactions & Behavior
- **Navigation:** `active` state swaps the main screen (replace with router routes). Sidebar items, KPI cards, and several "view all"/action affordances call `nav.go(key)`.
- **AI drawer:** opens from multiple entry points; ⌘K (and Ctrl+K) global shortcut; Esc closes; seeds an initial query when opened with text; simulated typing delay then reply; auto-scrolls to newest message.
- **Approvals:** approve/deny per row → optimistic "Approved" pill + fade. Tabs switch list.
- **Theme picker (Appearance popover):** palette icon → popover with **Light/Dark** segmented toggle, **13 accent swatches** (selected shows ring + check), **4 typeface presets** (Grotesk / Geometric / Neutral / Compact, each with an "Ag" live preview), and **"Reset to company default"** (auto-disabled when already default). Closes on outside-click.
- **Onboarding/Reports/Documents:** simulated "generate"/"parse"/"upload" actions with brief loading then result.
- **Animations:** staggered card entrance on load (`tl-rise`); count-up on KPI + payroll numbers; growing progress bars (`tl-grow-x`) and chart bars (`tl-bar-grow`); pulsing live dot; breathing AI-brief glow; nav-icon pop; typing dots. **All gated behind `@media (prefers-reduced-motion: no-preference)`** and the visible end-state is the base style, so print/PDF/reduced-motion show content (not pre-animation opacity:0). Standard easing var: `--ease: cubic-bezier(.32,.72,0,1)`.
- **Responsive:** see breakpoints above. Off-canvas sidebar with scrim on mobile.

---

## State Management
Prototype keeps everything in React local state. For production, map to your stores/queries:
- **Route/active screen** → router.
- **Theme** (`accent: [base, strong, bright]`, `dark: bool`, `font: presetName`) → persisted to `localStorage` key **`trulu.theme.v2`** in the prototype; in production store per-user (and optionally a company-level default). The Appearance picker writes through immediately.
- **AI drawer** (`open`, `seed`, `messages[]`, `typing`) → real chat/session state + streaming.
- **Approvals** (resolved map), **PTO requests** (list + done map), **Documents** (list, parse results), **Onboarding** (generated template, per-task done), **Reports** (query + answer), **Settings** (profile, integrations) → real data + mutations.
- Data fetching: everything is mock. Wire People, Payroll runs, PTO, Documents, Performance, Reports to real endpoints; AI features to your model + tools.

---

## Design Tokens

**Brand accent (default = "Trulu blue", from the brand kit):**
- `--primary: #1b9cd8` · `--primary-strong: #1583b8` · `--primary-bright: #4fc3ef` · `--primary-deep: #1583b8`
- `--on-primary: #ffffff`
- Soft accent surfaces derive via `color-mix` (light: `--primary` 11%/20% over white; dark: 22%/32% over surface). `--on-soft` is a dark-tinted accent for text on soft.
- The accent is set as inline CSS vars on `.tl-shell` from the active theme; **all components reference `--primary*`**, so re-theming is just swapping those 3–4 values.

**Full accent palette (17 options) — each is `[base, strong, bright]`. Playful set leads:**
Trulu blue `#1b9cd8/#1583b8/#4fc3ef` · Cyan `#29abe2/#1f93c4/#6fd0f3` · Mint `#18c29c/#119e7f/#4ed9b8` · Purple `#7b6cf6/#5f4fe0/#a79bff` · Coral `#ff6b5c/#e8503f/#ff9488` · Amber `#ffb020/#e0950c/#ffc859` · Pink `#ff5da2/#e8417f/#ff8dbf` · then Violet, Indigo, Teal, Rose, Magenta, Sky blue, Gold, Coral red, Slate, Amber clay (see `ACCENTS` in `trulu.bundle.jsx`). The bright accents `#FF6B5C / #FFB020 / #18C29C / #7B6CF6 / #FF5DA2` also drive the KPI cards, section icons, confetti, and background orbs.

**Light theme:**
`--bg #f7f6fa` · `--surface #ffffff` · `--surface-2 #f4f3f8` · `--surface-3 #ecebf3` · `--border #e7e5ef` · `--border-2 #dedbe9` · `--text #1a1722` · `--text-2 #66627a` · `--text-3 #9b97ac`.

**Dark theme** (`[data-theme="dark"]`):
`--bg #141416` · `--surface #1f1e23` · `--surface-2 #26252c` · `--surface-3 #2f2e36` · `--border #322f3a` · `--border-2 #3c3947` · `--text #f4f2f9` · `--text-2 #a8a4b6` · `--text-3 #726e80`.

**Semantic (calm, low-chroma):**
ok `#18966a` / ok-bg `#e4f5ee` · warn `#b9791a` / warn-bg `#fbf0db` · bad `#d6455a` / bad-bg `#fce6e9` (dark-mode bg variants are darkened — see `brand.css`).

**Radii:** xs 7 · sm 10 · md 14 · lg 18 · xl 24 · pill 999 (px).

**Shadows (light):** sm `0 1px 2px rgba(26,23,34,.05), 0 1px 3px rgba(26,23,34,.04)` · md `0 2px 4px …/.04, 0 8px 24px …/.06` · lg `0 4px 8px …/.05, 0 24px 48px rgba(60,40,140,.10)`. Dark variants in `brand.css`.

**Typography:**
- Display/headings: **Schibsted Grotesk**. Body/numbers: **Hanken Grotesk**. (`--font-display`, `--font-sans`.) Numbers use `font-variant-numeric: tabular-nums` (`.tnum`).
- Presets (heading/body): Grotesk = Schibsted/Hanken · Geometric = Plus Jakarta Sans (both) · Neutral = Manrope (both) · Compact = Geist (both).
- Weights: the design was intentionally de-emphasized from heavy — headings/big numbers **700**, secondary bold **650**, body 500–600, labels 600. Avoid going back up to 800.
- Representative sizes: page H1 ~27px/700; section title 15.5px/700; payroll big number 40px/700; KPI value 28px/700; body 13.5–14px; small/labels 11–12.5px; uppercase eyebrow 11.5px/700 with `.04em` tracking.

**Easing:** `--ease: cubic-bezier(.32, .72, 0, 1)` for general transitions; `--bounce: cubic-bezier(.34, 1.56, .64, 1)` for playful spring interactions (KPI icon pop, confetti).

---

## Brand personality & playful layer
Trulu is **pre-launch, playful, AI-first** — witty/warm voice, never corporate. The dashboard reflects this and these touches should carry into any production build:

- **Brighter brand blue** — accent default is `#1B9CD8 / #29ABE2` (the kit blue). The theme picker leads with a playful palette: Trulu blue, Cyan, Mint `#18C29C`, Purple `#7B6CF6`, Coral `#FF6B5C`, Amber `#FFB020`, Pink `#FF5DA2` (then the older neutral options).
- **Animated background** (`.tl-bg` inside `.tl-main`) — five large blurred gradient **orbs** (cyan/purple/mint/amber/pink) that slowly drift + scale on independent 20–32s loops, plus a soft accent **dot grid** masked to fade from the top. The whole layer does **cursor parallax**: an `onMouseMove` on `.tl-main` sets `--mx`/`--my` (range −0.5…0.5) and `.tl-bg` translates ~38px while `.tl-bg-grid` translates ~20px (extra) for depth, eased over .5s. Orbs use `mix-blend-mode: multiply` (light) / `screen` (dark); intensity dialed back in dark mode. A faint static multi-color bloom wash sits on `.tl-main` itself (`--bloom` vars) under the orbs.
- **Confetti** on the AI brief (`.tl-confetti` — 12 colored chips that pop in on a spring then gently float).
- **Colorful per-item accents** — KPI cards each carry their own color via a `--kpi` var (purple/coral/mint/amber) on icon + hover; section headers each get a `--sec` color (cyan/mint/coral/purple/amber). Icon tiles tint at ~15% of the color.
- **Playful motion** — KPI cards lift + tilt with a spring and the icon pops/rotates on hover; nav icon pops on activation; gradient primary buttons lift and brighten on hover; live status dot pulses; AI-brief glow breathes.
- **Pre-launch badge** — a gradient “🚀 Pre-launch · You're seeing Trulu early ✨” card (`.tl-prelaunch`) above the sidebar profile.
- **Witty copy** — e.g. greeting “Hey {name}, let's make payday painless 🎉”, AI brief “Good news — you're 3 taps from a clean payroll run. I tidied the rest. ✨”, KPI labels “Team Trulu / and growing 🌱”, “Needs a yes”, button “Let's run payroll”, AI assistant “Your payroll sidekick”. Treat copy as part of the brand, not filler.

**All** background/confetti/entrance motion lives under `@media (prefers-reduced-motion: no-preference)`, and a `@media print` reset forces end-states (opacity 1, no transform) so print/PDF/reduced-motion render fully.

---

## Assets
In `assets/`:
- `trulu-logo-v4.svg` — light-mode logo (dark “trulu.” wordmark, blue swoosh + dot, transparent background). Used in light theme (`.tl-logo-light`).
- `trulu-logo-v4-dark.svg` — dark-mode logo (white wordmark, blue swoosh + dot preserved, transparent background). Used in dark theme (`.tl-logo-dark`). Both are vector — scale crisply at any size; sized by height in `.tl-logo-img img { height:100%; width:auto }` (intrinsic ~534×208).

The app swaps the two by theme. Icons are inline SVG (see `Icon`/`ICONS` in `trulu.bundle.jsx`) — closest off-the-shelf match is **Lucide**.

Fonts via Google Fonts: Schibsted Grotesk (display), Hanken Grotesk (body), plus Plus Jakarta Sans, Manrope, Geist for the typeface presets (weights 400–800; trim to those used).

---

## Files (in this bundle)
- `Trulu Dashboard.html` — entry point; loads fonts, `brand.css`, `app.css`, then React/Babel and the JSX bundles. Shows load order.
- `brand.css` — **design tokens**: accent vars, light/dark theme variable sets, radii/shadows/easing, and shared atoms (`.card`, `.btn`/`.btn-primary`/`.btn-ghost`/`.btn-quiet`, `.pill`, focus ring, scrollbars).
- `app.css` — **all component styles** (`.tl-*`): shell, sidebar, topbar, theme picker, AI brief, payroll hero, KPI strip, chart, onboarding, approvals, who's-out, activity, AI drawer, tabs, avatars, responsive, and animation keyframes.
- `trulu.bundle.jsx` — the **Home dashboard + chrome**: icons (`Icon`/`ICONS`), logo (`TruluLogo`), mock data (`COMPANY/ME/PAYROLL/KPIS/APPROVALS/AI_BRIEF/WHOSOUT/ONBOARDING/TREND/ACTIVITY`), `Sidebar`/`Topbar`/`ThemePicker`, dashboard widgets (`AIBrief/PayrollHero/KpiStrip/TrendChart/Onboarding/Approvals/WhosOut/Activity`), `AIAssistant` drawer, theme presets (`FONTS`, `FONT_PRESETS`, `ACCENTS`), and the top-level `App` (owns theme + nav + localStorage persistence).
- `screens.jsx` — the **sub-screens**: `PayrollScreen`, `PeopleScreen`, `TimeScreen`, `OnboardingScreen`, `PerformanceScreen`, `DocumentsScreen`, `ReportsScreen`, `SettingsScreen`, plus their mock data (`STAFF`, `DEPTS`, `PTO_REQUESTS`, `NEW_HIRES`, `REVIEWS`, `DOCUMENTS`, integrations) and helpers (`useGen` simulated-AI hook, `AIStrip`).
- `tweaks-panel.jsx` — design-time tweak panel shell (not part of the product UI; safe to ignore for implementation).

> Note: the prototype concatenates the JSX into one in-browser bundle. In `export/src/` you'll also find the pre-concatenation source split (icons/logo/data/chrome/widgets/aiassistant/app) if you prefer reading smaller files — same code.

---

## Implementation suggestions
- Lead with **Payroll** (the hero) and the **AI brief / assistant** (the differentiator) — they carry the product's identity.
- Make accent/theme a real theming layer (CSS variables driven by user + company settings); keep the "reset to company default" affordance.
- Replace all canned AI with real model calls + tool use; stream responses in the drawer; ground anomaly/parse/report features in real data.
- Treat clinical roles/departments/copy as configurable per tenant, not hardcoded.
- Keep the reduced-motion discipline (visible end-state as base; animate from hidden only under `prefers-reduced-motion: no-preference`).
