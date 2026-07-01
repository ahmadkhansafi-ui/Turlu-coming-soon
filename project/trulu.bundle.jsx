
/* ===================== icons.jsx ===================== */
/* icons.jsx — minimal stroke line-icons (24x24, currentColor). */
function Icon({ name, size = 20, sw = 1.8, style, ...rest }) {
  const P = ICONS[name] || ICONS.dot;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flex: "0 0 auto", ...style }} aria-hidden="true" {...rest}>
      {P}
    </svg>);

}
const g = (...c) => <g>{c.map((el, i) => React.cloneElement(el, { key: i }))}</g>;
const ICONS = {
  dot: <circle cx="12" cy="12" r="2" />,
  home: <path d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5M9.5 20v-5h5v5" />,
  wallet: g(<rect x="3" y="6" width="18" height="13" rx="2.5" />, <path d="M3 9h18M16.5 13.5h1.5" />),
  people: g(<circle cx="9" cy="8" r="3" />, <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.2a3 3 0 0 1 0 5.6M17.5 19a5.5 5.5 0 0 0-2-4.2" />),
  clock: g(<circle cx="12" cy="12" r="8.5" />, <path d="M12 7.5V12l3 2" />),
  rocket: <path d="M5 14c-1 2.5-1 4.5-1 4.5s2 0 4.5-1M9 15l-3-3c1.5-5 5-8 9.5-8.5C16 8 13 11.5 9 15Zm5.5-6.5a1.3 1.3 0 1 0 0-.01ZM6 16.5 4.5 18" />,
  chart: <path d="M4 4v16h16M8 16v-4M12 16V9M16 16v-6" />,
  doc: g(<path d="M6 3h7l5 5v13H6z" />, <path d="M13 3v5h5M9 13h6M9 16.5h6" />),
  report: g(<rect x="4" y="3" width="16" height="18" rx="2.5" />, <path d="M8 8h8M8 12h8M8 16h5" />),
  gear: g(<circle cx="12" cy="12" r="3" />, <path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.7 5.3 17 7M7 17l-1.7 1.7M18.7 18.7 17 17M7 7 5.3 5.3" />),
  search: g(<circle cx="11" cy="11" r="7" />, <path d="m20 20-3.5-3.5" />),
  bell: <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M9.5 19a2.5 2.5 0 0 0 5 0" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM18.5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />,
  check: <path d="M5 12.5 10 17l9-10" />,
  checkcircle: g(<circle cx="12" cy="12" r="8.5" />, <path d="M8.5 12.2 11 14.7l4.5-5" />),
  plus: <path d="M12 5v14M5 12h14" />,
  chevdown: <path d="m6 9 6 6 6-6" />,
  chevright: <path d="m9 6 6 6-6 6" />,
  arrowup: <path d="M12 19V5M6 11l6-6 6 6" />,
  arrowdown: <path d="M12 5v14M6 13l6 6 6-6" />,
  arrowright: <path d="M5 12h14M13 6l6 6-6 6" />,
  calendar: g(<rect x="3.5" y="5" width="17" height="16" rx="2.5" />, <path d="M3.5 9.5h17M8 3v4M16 3v4" />),
  sun: g(<circle cx="12" cy="12" r="4" />, <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.4 5.6 17 7M7 17l-1.4 1.4M18.4 18.4 17 17M7 7 5.6 5.6" />),
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z" />,
  palette: g(<path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Z" />, <circle cx="7.5" cy="11.5" r="1.1" />, <circle cx="11" cy="7.5" r="1.1" />, <circle cx="15.5" cy="8" r="1.1" />),
  dots: g(<circle cx="5" cy="12" r="1.4" />, <circle cx="12" cy="12" r="1.4" />, <circle cx="19" cy="12" r="1.4" />),
  reset: g(<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3 8.5" />, <path d="M3 4v4.5h4.5" />),
  plane: <path d="M21 4 3 11l6 2 2 6 4-7 6-8ZM9 13l5-3" />,
  shield: g(<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6Z" />, <path d="M9 12l2 2 4-4" />),
  user: g(<circle cx="12" cy="8" r="4" />, <path d="M5 20a7 7 0 0 1 14 0" />),
  flag: <path d="M5 21V4m0 0 4-1c3 0 4 2 7 1l3-1v9l-3 1c-3 1-4-1-7-1l-4 1" />,
  alert: g(<path d="M12 3 2 20h20L12 3Z" />, <path d="M12 9v5M12 17h.01" />),
  filter: <path d="M3 5h18l-7 8v6l-4-2v-4z" />,
  send: <path d="m4 12 16-7-7 16-2.5-6.5L4 12Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  download: <path d="M12 3v12M7 11l5 5 5-5M5 20h14" />,
  zap: <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />,
  building: g(<rect x="4" y="3" width="16" height="18" rx="1.5" />, <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9.5 16h5" />),
  mail: g(<rect x="3" y="5" width="18" height="14" rx="2.5" />, <path d="m4 7 8 6 8-6" />),
  phone: <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" />,
  upload: <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />,
  edit: <path d="M4 20h4L19 9l-4-4L4 16v4ZM14 6l4 4" />,
  trash: <path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13" />,
  eye: g(<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />, <circle cx="12" cy="12" r="3" />),
  dollar: g(<path d="M12 3v18" />, <path d="M16 7c0-1.7-1.8-3-4-3S8 5.3 8 7s1.8 2.5 4 3 4 1.3 4 3-1.8 3-4 3-4-1.3-4-3" />),
  briefcase: g(<rect x="3" y="7" width="18" height="13" rx="2" />, <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />),
  star: <path d="m12 3 2.6 5.6 6.1.7-4.5 4.1 1.2 6L12 16.9 6.6 19.5l1.2-6-4.5-4.1 6.1-.7L12 3Z" />,
  play: <path d="M7 4v16l13-8z" />,
  refresh: <path d="M4 12a8 8 0 0 1 13.5-5.8L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.5 5.8L4 16M4 20v-4h4" />,
  pin: g(<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z" />, <circle cx="12" cy="9" r="2.5" />),
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7L11 7M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7L13 17" />,
  lock: g(<rect x="4.5" y="10" width="15" height="10" rx="2" />, <path d="M8 10V7a4 4 0 0 1 8 0v3" />),
  sliders: <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h7M15 18h5M13 4v4M7 10v4M11 16v4" />,
  list: <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />,
  grid: g(<rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />, <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />, <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />, <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />),
  cap: <path d="m12 4 10 4-10 4L2 8l10-4ZM6 10v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />,
  target: g(<circle cx="12" cy="12" r="8.5" />, <circle cx="12" cy="12" r="4.5" />, <circle cx="12" cy="12" r="1" />),
  trend: <path d="M3 17l5-5 4 4 8-9M21 7h-5M21 7v5" />,
  logout: <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 12h10M16 8l4 4-4 4" />
};
Object.assign(window, { Icon, ICONS });
const NavCtx = React.createContext({ go: () => {}, openAI: () => {} });
Object.assign(window, { NavCtx });


/* ===================== logo.jsx ===================== */
/* logo.jsx — Trulu refined mark + wordmark.
   Mark: a single continuous violet wave (round caps) with a floating dot,
   echoing the original hand-drawn squiggle, cleaned to a smooth flow. */

function TruluMark({ size = 36, id = "tg" }) {
  const gid = `${id}-grad`;
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none" aria-hidden="true"
    style={{ display: "block", flex: "0 0 auto" }}>
      <defs>
        <linearGradient id={gid} x1="6" y1="40" x2="40" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--primary-strong)" />
          <stop offset=".55" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--primary-bright)" />
        </linearGradient>
      </defs>
      {/* the wave: low-left -> tall hump -> valley -> second hump */}
      <path
        d="M9 37 C9 22 13.5 15 18 15 C22.5 15 24 23 24 30 C24 22 26 16.5 31 16.5 C34 16.5 35.5 19 36 22"
        stroke={`url(#${gid})`} strokeWidth="7.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* start ball */}
      <circle cx="9" cy="37" r="3.9" fill="var(--primary-strong)" />
      {/* floating dot */}
      <circle cx="39.4" cy="13.2" r="4.2" fill="var(--primary-bright)" />
    </svg>);

}

function TruluLogo({ size = 34, height, showWord = true, wordColor }) {
  const h = height || Math.round(size * 1.55);
  return (
    <div className="tl-logo-img" style={{ height: h }}>
      <img src="assets/trulu-logo-v4.svg" alt="Trulu — HR · Payroll · Intelligence" className="tl-logo-light" />
      <img src="assets/trulu-logo-v4-dark.svg" alt="" aria-hidden="true" className="tl-logo-dark" />
    </div>);

}

Object.assign(window, { TruluMark, TruluLogo });


/* ===================== data.jsx ===================== */
/* data.jsx — believable demo content for the Trulu dashboard. */

const COMPANY = { name: "Kidsvillepeds", plan: "Scale", headcount: 248 };
const ME = { name: "Ali", role: "HR", initials: "A" };

const PAYROLL = {
  cycle: "Jun 1 – Jun 14",
  runDate: "Fri, Jun 12",
  daysLeft: 7,
  gross: 1284500,
  net: 968420,
  taxes: 241300,
  benefits: 74780,
  employees: 231,
  contractors: 17,
  status: "Looking good",
  steps: [
  { label: "Hours synced", done: true },
  { label: "Adjustments imported", done: true },
  { label: "AI anomaly scan", done: true },
  { label: "Manager approvals", done: false, note: "3 of 6" },
  { label: "Tax & compliance", done: false },
  { label: "Fund & file", done: false }]

};

const KPIS = [
{ key: "headcount", label: "Team Trulu", value: "248", delta: "+6", dir: "up", sub: "and growing 🌱", icon: "people" },
{ key: "approvals", label: "Needs a yes", value: "7", delta: "3 urgent", dir: "flat", sub: "waiting on you", icon: "checkcircle" },
{ key: "out", label: "Out catching rays", value: "12", delta: "5% of team", dir: "flat", sub: "PTO + sick", icon: "plane" },
{ key: "cost", label: "This month's payroll", value: "$1.28M", delta: "+2.1%", dir: "up", sub: "all on track", icon: "wallet" }];


const APPROVALS = {
  pto: [
  { id: 1, name: "Dr. John Carter", initials: "JC", team: "Pediatrics", detail: "Vacation · Jun 16–20", days: "5 days", ai: "Within policy", color: "#6d4ef5" },
  { id: 2, name: "Priya Raman, RN", initials: "PR", team: "Nursing", detail: "Sick leave · Jun 6", days: "1 day", ai: "Auto-approvable", color: "#e0739c" },
  { id: 3, name: "Lee Okafor", initials: "LO", team: "Front Desk", detail: "Personal · Jun 9–10", days: "2 days", ai: "Low coverage week", flag: true, color: "#4aa3c4" }],

  expenses: [
  { id: 4, name: "Sara Nilsson", initials: "SN", team: "Administration", detail: "CME conference travel", days: "$1,240", ai: "Receipt parsed ✓", color: "#7a9a3a" },
  { id: 5, name: "Tom Becker", initials: "TB", team: "Lab", detail: "Lab supplies & reagents", days: "$899", ai: "Above avg — review", flag: true, color: "#c4863a" }],

  timesheets: [
  { id: 6, name: "Nursing team", initials: "NU", team: "9 people", detail: "Week of Jun 1", days: "+38 OT hrs", ai: "Overtime spike", flag: true, color: "#b45a8a" }]

};

const AI_BRIEF = {
  headline: "Good news — you're 3 taps from a clean payroll run. I tidied the rest. ✨",
  items: [
  { icon: "alert", tone: "warn", text: "Heads up: nursing overtime spiked 38 hrs — looks like Tuesdays need backup.", action: "Take a look" },
  { icon: "doc", tone: "ok", text: "I read 2 locum invoices, matched them, and lined them up to pay. You're welcome. 😊", action: "Open" },
  { icon: "shield", tone: "bad", text: "Don't forget: Dr. Whitfield's license renews in 14 days.", action: "Remind me" }],

  suggestions: ["What changed in payroll this cycle?", "Who's about to max out their PTO?", "Whip up a nurse onboarding template"]
};

const WHOSOUT = [
{ name: "Ahmad", initials: "AK", reason: "Vacation", when: "until Jun 20", color: "#6d4ef5" },
{ name: "Abdullah", initials: "AJ", reason: "Sick", when: "today", color: "#e0739c" },
{ name: "Ali", initials: "AS", reason: "Vacation", when: "until Aug 1", color: "#4aa3c4" },
{ name: "Amen", initials: "AK", reason: "Vacation", when: "Jun 9–13", color: "#7a9a3a" }];


const ONBOARDING = [
{ name: "Ahmad", role: "Designer", start: "Started Jun 2", pct: 80, template: "Nursing · AI template", color: "#6d4ef5" },
{ name: "Abdullah", role: "CTO", start: "Starts Jun 9", pct: 35, template: "Clinical", color: "#4aa3c4" },
{ name: "Ali", role: "HR", start: "Starts Jun 16", pct: 10, template: "Front Office", color: "#7a9a3a" }];


const TREND = [
{ m: "Jan", v: 1180 }, { m: "Feb", v: 1205 }, { m: "Mar", v: 1190 },
{ m: "Apr", v: 1242 }, { m: "May", v: 1258 }, { m: "Jun", v: 1284 }];


const ACTIVITY = [
{ icon: "sparkle", tone: "primary", text: "Trulu AI flagged a nursing overtime anomaly on Tuesdays", time: "12m ago" },
{ icon: "checkcircle", tone: "ok", text: "You approved Sara Nilsson's CME expense report", time: "1h ago" },
{ icon: "user", tone: "primary", text: "Ahmad completed 8 of 10 nurse onboarding tasks", time: "3h ago" },
{ icon: "doc", tone: "muted", text: "May payroll filing confirmed by the IRS", time: "Yesterday" }];


Object.assign(window, { COMPANY, ME, PAYROLL, KPIS, APPROVALS, AI_BRIEF, WHOSOUT, ONBOARDING, TREND, ACTIVITY });


/* ===================== chrome.jsx ===================== */
/* chrome.jsx — Sidebar + Topbar */

const NAV = [
{ key: "home", label: "Home", icon: "home" },
{ key: "payroll", label: "Payroll", icon: "wallet", badge: "Run due" },
{ key: "people", label: "People", icon: "people" },
{ key: "time", label: "Time & Attendance", icon: "clock" },
{ key: "onboarding", label: "Onboarding", icon: "rocket" },
{ key: "performance", label: "Performance", icon: "chart" },
{ key: "documents", label: "Documents", icon: "doc" },
{ key: "reports", label: "Reports", icon: "report" }];


function Sidebar({ active, setActive, open, onClose, onOpenAI }) {
  return (
    <>
      <div className={"tl-scrim" + (open ? " show" : "")} onClick={onClose} />
      <aside className={"tl-sidebar" + (open ? " open" : "")}>
        <div style={{ padding: "14px 10px 12px" }}>
          <TruluLogo height={92} />
        </div>

        <nav style={{ flex: 1, overflowY: "auto", padding: "6px 12px" }}>
          <div className="tl-navlabel">Workspace</div>
          {NAV.map((n) =>
          <button key={n.key} className={"tl-navitem" + (active === n.key ? " active" : "")}
          onClick={() => {setActive(n.key);onClose && onClose();}}>
              <Icon name={n.icon} size={19} />
              <span style={{ flex: 1, textAlign: "left" }}>{n.label}</span>
              {n.badge && <span className="tl-navbadge">{n.badge}</span>}
            </button>
          )}

          <div className="tl-navlabel" style={{ marginTop: 14 }}>Intelligence</div>
          <button className="tl-navitem tl-ai" onClick={onOpenAI}>
            <Icon name="sparkle" size={19} />
            <span style={{ flex: 1, textAlign: "left" }}>Trulu AI</span>
            <span className="tl-navbadge ai">3</span>
          </button>
        </nav>

        <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="tl-prelaunch">
            <span className="tl-prelaunch-emoji">🚀</span>
            <div style={{ minWidth: 0 }}>
              <div className="tl-prelaunch-title">Pre-launch</div>
              <div className="tl-prelaunch-sub">You're seeing Trulu early ✨</div>
            </div>
          </div>
          <button className="tl-profile" onClick={() => setActive("settings")}>
            <div className="tl-avatar" style={{ background: "linear-gradient(135deg, var(--primary-bright), var(--primary-strong))" }}>{ME.initials}</div>
            <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
              <div style={{ fontWeight: 600, fontSize: 13.5, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ME.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-3)" }}>{ME.role}</div>
            </div>
            <Icon name="gear" size={17} style={{ color: "var(--text-3)" }} />
          </button>
        </div>
      </aside>
    </>);

}

function Topbar({ onMenu, theme, onToggleTheme, onOpenAI, accent, setAccent, dark, setDark, accents, font, setFont, fonts, onReset, isDefault }) {
  const nav = React.useContext(NavCtx);
  return (
    <header className="tl-topbar">
      <button className="tl-iconbtn only-mobile" onClick={onMenu} aria-label="Menu"><Icon name="menu" size={20} /></button>

      <button className="tl-searchbar" onClick={onOpenAI}>
        <Icon name="sparkle" size={17} style={{ color: "var(--primary)" }} />
        <span>Ask Trulu anything — or just search 🔍</span>
        <kbd>⌘K</kbd>
      </button>

      <div style={{ flex: 1 }} />

      <div className="tl-topactions">
        <ThemePicker accent={accent} setAccent={setAccent} dark={dark} setDark={setDark} accents={accents}
          font={font} setFont={setFont} fonts={fonts} onReset={onReset} isDefault={isDefault} />
        <button className="tl-iconbtn" aria-label="Notifications" style={{ position: "relative" }}>
          <Icon name="bell" size={19} />
          <span className="tl-dot" />
        </button>
        <div className="tl-company only-desktop">
          <div className="tl-clogo">K</div>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{COMPANY.name}</div>
            <div style={{ fontSize: 11, color: "var(--text-3)" }}>{COMPANY.plan} plan</div>
          </div>
          <Icon name="chevdown" size={15} style={{ color: "var(--text-3)" }} />
        </div>
        <button className="btn btn-primary only-desktop" style={{ padding: "9px 15px" }} onClick={() => nav.go("payroll")}>
          <Icon name="wallet" size={17} /> Run payroll
        </button>
      </div>
    </header>);

}

const ACCENT_NAMES = ["Trulu blue", "Cyan", "Mint", "Purple", "Coral", "Amber", "Pink", "Violet", "Indigo", "Teal", "Rose", "Magenta", "Sky blue", "Gold", "Coral red", "Slate", "Amber clay"];

function ThemePicker({ accent, setAccent, dark, setDark, accents, font, setFont, fonts, onReset, isDefault }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const curIdx = accents.findIndex((a) => Array.isArray(accent) && a[0] === accent[0]);
  return (
    <div className="tl-themepick" ref={ref}>
      <button className={"tl-iconbtn" + (open ? " active" : "")} onClick={() => setOpen((v) => !v)} aria-label="Appearance" title="Appearance">
        <Icon name="palette" size={19} />
      </button>
      {open &&
      <div className="tl-theme-pop" role="dialog" aria-label="Appearance">
          <div className="tl-theme-head">
            <span className="tl-theme-title">Appearance</span>
            <span className="tl-theme-sub">Personalize your workspace</span>
          </div>

          <div className="tl-theme-seg">
            <button className={"tl-seg-btn" + (!dark ? " on" : "")} onClick={() => setDark(false)}>
              <Icon name="sun" size={16} /> Light
            </button>
            <button className={"tl-seg-btn" + (dark ? " on" : "")} onClick={() => setDark(true)}>
              <Icon name="moon" size={16} /> Dark
            </button>
          </div>

          <div className="tl-theme-label">Accent color</div>
          <div className="tl-swatches">
            {accents.map((a, i) =>
            <button key={i} className={"tl-swatch" + (i === curIdx ? " on" : "")} onClick={() => setAccent(a)}
            title={ACCENT_NAMES[i] || "Accent"} style={{ "--sw": a[0], background: "linear-gradient(135deg," + a[2] + "," + a[1] + ")" }}>
                {i === curIdx && <Icon name="check" size={15} sw={2.6} style={{ color: "#fff" }} />}
              </button>
            )}
          </div>

          <div className="tl-theme-label">Typeface</div>
          <div className="tl-fontsel">
            {fonts.map((f) =>
            <button key={f.name} className={"tl-fontbtn" + (font === f.name ? " on" : "")} onClick={() => setFont(f.name)}>
                <span className="tl-fontbtn-prev" style={{ fontFamily: f.family }}>Ag</span>
                <span className="tl-fontbtn-name">{f.name}</span>
              </button>
            )}
          </div>

          <button className="tl-theme-reset" onClick={onReset} disabled={isDefault}>
            <Icon name="reset" size={14} /> Reset to company default
          </button>
          <div className="tl-theme-foot">Saved automatically on this device</div>
        </div>
      }
    </div>);

}

Object.assign(window, { Sidebar, Topbar, ThemePicker, NAV });


/* ===================== widgets.jsx ===================== */
/* widgets.jsx — dashboard cards */

function Avatar({ initials, color, size = 34 }) {
  return (
    <div className="tl-av" style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}>
      {initials}
    </div>);

}

function SectionHead({ title, sub, action, icon, color }) {
  return (
    <div className="tl-sechead">
      <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
        {icon && <span className="tl-secicon" style={color ? { "--sec": color } : undefined}><Icon name={icon} size={17} /></span>}
        <div style={{ minWidth: 0 }}>
          <div className="tl-sectitle">{title}</div>
          {sub && <div className="tl-secsub">{sub}</div>}
        </div>
      </div>
      {action}
    </div>);

}

const fmtMoney = (n) => "$" + n.toLocaleString("en-US");

/* count-up hook — animates a number from 0 to target on mount.
   Defaults to the real value so it's never stuck at 0 if animation can't run (hidden tab / print). */
function useCountUp(target, ms = 1100) {
  const [v, setV] = React.useState(target);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || document.hidden) { setV(target); return; }
    let raf, start;
    setV(0);
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / ms);
      setV(Math.round(target * ease(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* float count-up + smart stat that animates the numeric part of strings like "$1.28M", "248", "7". */
function useCountUpF(target, ms = 1100, decimals = 0) {
  const [v, setV] = React.useState(target);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || document.hidden) { setV(target); return; }
    let raf, start;
    setV(0);
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / ms);
      setV(target * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function AnimatedStat({ value }) {
  const m = String(value).match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/);
  if (!m) return <>{value}</>;
  const prefix = m[1], numStr = m[2].replace(/,/g, ""), suffix = m[3];
  const decimals = (numStr.split(".")[1] || "").length;
  const n = useCountUpF(parseFloat(numStr), 1100, decimals);
  const shown = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-US");
  return <>{prefix}{shown}{suffix}</>;
}

/* ---------- AI BRIEF (signature) ---------- */
function AIBrief({ onOpenAI }) {
  const [q, setQ] = React.useState("");
  const toneColor = { warn: "var(--warn)", ok: "var(--ok)", bad: "var(--bad)" };
  const toneBg = { warn: "var(--warn-bg)", ok: "var(--ok-bg)", bad: "var(--bad-bg)" };
  return (
    <section className="tl-aibrief">
      <div className="tl-aibrief-glow" />
      <div className="tl-confetti" aria-hidden="true">
        {["#FFB020", "#FF6B5C", "#18C29C", "#FF5DA2", "#7B6CF6", "#4fc3ef", "#FFB020", "#FF6B5C", "#18C29C", "#FF5DA2", "#7B6CF6", "#fff"].map((c, i) =>
        <i key={i} style={{ background: c }} />
        )}
      </div>
      <div className="tl-aibrief-inner">
        <div className="tl-aibrief-head">
          <span className="tl-ai-chip"><Icon name="sparkle" size={15} /> Trulu AI</span>
          <span className="tl-ai-day">Your daily brief · Thu, Jun 5</span>
        </div>
        <h2 className="tl-aibrief-headline">{AI_BRIEF.headline}</h2>

        <div className="tl-aibrief-items">
          {AI_BRIEF.items.map((it, i) =>
          <div key={i} className="tl-aiitem">
              <span className="tl-aiitem-ic" style={{ color: toneColor[it.tone], background: toneBg[it.tone] }}>
                <Icon name={it.icon} size={16} />
              </span>
              <span className="tl-aiitem-text">{it.text}</span>
              <button className="tl-aiitem-act" onClick={() => onOpenAI(it.text)}>{it.action}<Icon name="chevright" size={13} /></button>
            </div>
          )}
        </div>

        <div className="tl-ask">
          <Icon name="sparkle" size={17} style={{ color: "var(--primary)" }} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask Trulu anything about your team or payroll…"
          onKeyDown={(e) => {if (e.key === "Enter") onOpenAI(q);}} />
          <button className="tl-ask-send" onClick={() => onOpenAI(q)} aria-label="Send"><Icon name="send" size={16} /></button>
        </div>
        <div className="tl-ask-chips">
          {AI_BRIEF.suggestions.map((s, i) =>
          <button key={i} className="tl-chip" onClick={() => onOpenAI(s)}>{s}</button>
          )}
        </div>
      </div>
    </section>);

}

/* ---------- PAYROLL HERO ---------- */
function PayrollHero() {
  const nav = React.useContext(NavCtx);
  const p = PAYROLL;
  const doneCount = p.steps.filter((s) => s.done).length;
  const pct = Math.round(doneCount / p.steps.length * 100);
  return (
    <section className="card tl-payroll">
      <div className="tl-payroll-main">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span className="pill" style={{ background: "var(--ok-bg)", color: "var(--ok)" }}>
            <span className="tl-livedot" /> {p.status}
          </span>
          <span style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 600 }}>Next run · {p.cycle}</span>
        </div>

        <div className="tl-payroll-amount">
          <div>
            <div className="tl-eyebrow">Gross payroll</div>
            <div className="tl-bignum tnum">{fmtMoney(useCountUp(p.gross))}</div>
          </div>
          <div className="tl-runchip">
            <Icon name="calendar" size={16} style={{ color: "var(--primary)" }} />
            <div>
              <div style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 600 }}>Runs in</div>
              <div style={{ fontWeight: 650, fontSize: 14 }}>{p.daysLeft} days · {p.runDate}</div>
            </div>
          </div>
        </div>

        <div className="tl-payroll-break">
          {[["Net pay", fmtMoney(p.net)], ["Taxes", fmtMoney(p.taxes)], ["Benefits", fmtMoney(p.benefits)],
          ["Paid", `${p.employees} + ${p.contractors} contractors`]].map(([k, v]) =>
          <div key={k} className="tl-break">
              <div className="tl-break-k">{k}</div>
              <div className="tl-break-v tnum">{v}</div>
            </div>
          )}
        </div>
      </div>

      <div className="tl-payroll-steps">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <span style={{ fontWeight: 600, fontSize: 13.5, whiteSpace: "nowrap" }}>Run checklist</span>
          <span style={{ fontSize: 12.5, color: "var(--text-3)", fontWeight: 650 }}>{doneCount}/{p.steps.length}</span>
        </div>
        <div className="tl-progress"><div className="tl-progress-fill" style={{ width: pct + "%" }} /></div>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
          {p.steps.map((s, i) =>
          <div key={i} className="tl-step">
              <span className={"tl-step-ic" + (s.done ? " done" : "")}>
                {s.done ? <Icon name="check" size={12} sw={2.6} /> : <span className="tl-step-num">{i + 1}</span>}
              </span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: s.done ? 500 : 650, color: s.done ? "var(--text-3)" : "var(--text)" }}>{s.label}</span>
              {s.note && <span className="tl-step-note">{s.note}</span>}
            </div>
          )}
        </div>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 16, padding: "12px" }} onClick={() => nav.go("payroll")}>
          Let's run payroll <Icon name="arrowright" size={16} />
        </button>
      </div>
    </section>);

}

/* ---------- KPI STRIP ---------- */
function KpiStrip() {
  const nav = React.useContext(NavCtx);
  const KPI_NAV = { headcount: "people", approvals: "payroll", out: "time", cost: "payroll" };
  const KPI_COLOR = { headcount: "#7b6cf6", approvals: "#ff6b5c", out: "#18c29c", cost: "#ffb020" };
  return (
    <div className="tl-kpis">
      {KPIS.map((k) =>
      <div key={k.key} className="card tl-kpi" style={{ cursor: "pointer", "--kpi": KPI_COLOR[k.key] }} onClick={() => nav.go(KPI_NAV[k.key] || "home")}>
          <div className="tl-kpi-top">
            <span className="tl-kpi-ic"><Icon name={k.icon} size={17} /></span>
            <span className={"tl-kpi-delta " + k.dir}>
              {k.dir === "up" && <Icon name="arrowup" size={12} sw={2.4} />}
              {k.delta}
            </span>
          </div>
          <div className="tl-kpi-val tnum"><AnimatedStat value={k.value} /></div>
          <div className="tl-kpi-lab">{k.label}</div>
          <div className="tl-kpi-sub">{k.sub}</div>
        </div>
      )}
    </div>);

}

/* ---------- TREND CHART ---------- */
function TrendChart() {
  const max = Math.max(...TREND.map((d) => d.v)) * 1.08;
  const min = Math.min(...TREND.map((d) => d.v)) * 0.9;
  return (
    <section className="card" style={{ padding: 22 }}>
      <SectionHead title="Payroll cost trend" sub="Total monthly cost · last 6 months" icon="chart" color="#29abe2"
      action={<span className="pill" style={{ background: "var(--surface-2)", color: "var(--text-2)" }}>6M</span>} />
      <div className="tl-bars">
        {TREND.map((d, i) => {
          const h = (d.v - min) / (max - min) * 100;
          const cur = i === TREND.length - 1;
          return (
            <div key={d.m} className="tl-bar-col">
              <div className="tl-bar-val tnum">${(d.v / 1000).toFixed(2)}M</div>
              <div className="tl-bar-track">
                <div className={"tl-bar" + (cur ? " cur" : "")} style={{ height: Math.max(8, h) + "%" }} />
              </div>
              <div className="tl-bar-m">{d.m}</div>
            </div>);

        })}
      </div>
    </section>);

}

/* ---------- ONBOARDING ---------- */
function Onboarding() {
  const nav = React.useContext(NavCtx);
  return (
    <section className="card" style={{ padding: 22 }}>
      <SectionHead title="Onboarding pipeline" sub="3 new hires in progress" icon="rocket" color="#18c29c"
      action={<button className="btn btn-quiet" style={{ padding: "6px 10px", fontSize: 13 }} onClick={() => nav.go("onboarding")}>View all <Icon name="chevright" size={14} /></button>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {ONBOARDING.map((o) =>
        <div key={o.name} className="tl-onb">
            <Avatar initials={o.name.split(" ").map((w) => w[0]).join("")} color={o.color} size={38} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{o.name}</span>
                <span style={{ fontSize: 12, color: "var(--text-3)" }}>· {o.role}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
                <div className="tl-progress sm"><div className="tl-progress-fill" style={{ width: o.pct + "%" }} /></div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-2)", width: 34, textAlign: "right" }}>{o.pct}%</span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 600 }}>{o.start}</div>
              {o.template.includes("AI") && <span className="tl-tag-ai"><Icon name="sparkle" size={11} /> AI template</span>}
            </div>
          </div>
        )}
      </div>
    </section>);

}

/* ---------- APPROVALS (tabbed) ---------- */
function Approvals() {
  const tabs = [
  { key: "pto", label: "Time off", n: APPROVALS.pto.length },
  { key: "expenses", label: "Expenses", n: APPROVALS.expenses.length },
  { key: "timesheets", label: "Timesheets", n: APPROVALS.timesheets.length }];

  const [tab, setTab] = React.useState("pto");
  const [done, setDone] = React.useState({});
  const list = APPROVALS[tab];
  return (
    <section className="card" style={{ padding: 22 }}>
      <SectionHead title="Approvals queue" sub="AI-prioritized for this run" icon="checkcircle" color="#ff6b5c" />
      <div className="tl-tabs">
        {tabs.map((t) =>
        <button key={t.key} className={"tl-tab" + (tab === t.key ? " active" : "")} onClick={() => setTab(t.key)}>
            {t.label}<span className="tl-tab-n">{t.n}</span>
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 6 }}>
        {list.map((a) =>
        <div key={a.id} className={"tl-approval" + (done[a.id] ? " resolved" : "")}>
            <Avatar initials={a.initials} color={a.color} size={36} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.name} <span style={{ color: "var(--text-3)", fontWeight: 500 }}>· {a.team}</span></div>
              <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>{a.detail} · <b style={{ color: "var(--text)" }}>{a.days}</b></div>
              <span className={"tl-aiflag" + (a.flag ? " flag" : "")}><Icon name="sparkle" size={11} /> {a.ai}</span>
            </div>
            {done[a.id] ?
          <span className="pill" style={{ background: "var(--ok-bg)", color: "var(--ok)" }}><Icon name="check" size={13} sw={2.5} /> Approved</span> :

          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button className="tl-mini ghost" onClick={() => setDone({ ...done, [a.id]: "deny" })} aria-label="Deny"><Icon name="close" size={15} /></button>
                <button className="tl-mini ok" onClick={() => setDone({ ...done, [a.id]: "ok" })} aria-label="Approve"><Icon name="check" size={15} sw={2.4} /></button>
              </div>
          }
          </div>
        )}
      </div>
    </section>);

}

/* ---------- WHO'S OUT ---------- */
function WhosOut() {
  const nav = React.useContext(NavCtx);
  return (
    <section className="card" style={{ padding: 22 }}>
      <SectionHead title="Out this week" sub="12 people · 5% of team" icon="plane" color="#7b6cf6"
      action={<button className="btn btn-quiet" style={{ padding: "6px 10px", fontSize: 13 }} onClick={() => nav.go("time")}>Calendar</button>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {WHOSOUT.map((w) =>
        <div key={w.name} className="tl-out">
            <Avatar initials={w.initials} color={w.color} size={32} />
            <span style={{ flex: 1, fontWeight: 650, fontSize: 13.5 }}>{w.name}</span>
            <span className="tl-out-reason">{w.reason}</span>
            <span style={{ fontSize: 12, color: "var(--text-3)", width: 78, textAlign: "right" }}>{w.when}</span>
          </div>
        )}
      </div>
    </section>);

}

/* ---------- ACTIVITY ---------- */
function Activity() {
  const tone = { primary: "var(--primary)", ok: "var(--ok)", muted: "var(--text-3)" };
  const toneBg = { primary: "var(--primary-soft)", ok: "var(--ok-bg)", muted: "var(--surface-2)" };
  return (
    <section className="card" style={{ padding: 22 }}>
      <SectionHead title="Activity" icon="zap" color="#ffb020" />
      <div className="tl-feed">
        {ACTIVITY.map((a, i) =>
        <div key={i} className="tl-feeditem">
            <span className="tl-feed-ic" style={{ color: tone[a.tone], background: toneBg[a.tone] }}><Icon name={a.icon} size={15} /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, lineHeight: 1.4 }}>{a.text}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-3)", marginTop: 2 }}>{a.time}</div>
            </div>
          </div>
        )}
      </div>
    </section>);

}

Object.assign(window, { AIBrief, PayrollHero, KpiStrip, TrendChart, Onboarding, Approvals, WhosOut, Activity, Avatar, SectionHead, fmtMoney });


/* ===================== aiassistant.jsx ===================== */
/* aiassistant.jsx — right-side Trulu AI drawer with canned, believable replies. */

const AI_REPLIES = {
  default: "Here's what I found. Want me to draft the next step or open the related record?",
  summarize: "This cycle (Jun 1–14) vs. last: gross payroll is up 2.1% to $1,284,500. The change is driven by 6 new clinical hires (+$41k) and 38 nursing overtime hours (+$2.3k). Taxes and benefits are within 0.4% of forecast. No compliance flags besides Dr. Whitfield's upcoming license renewal.",
  pto: "4 staff are over their accrued PTO balance heading into Q3: Ali Hassan (−1.5 days), Amen Tesfaye (−1 day), Lina Park (on leave), and Marcus Lee (−0.5 days). I can email their managers a heads-up or adjust accrual policy.",
  onboarding: "I've drafted a nurse onboarding template based on your last 12 hires: a 10-step checklist with role-specific tracks for Nursing, Pediatrics, and Front Office, license & credential checks, HIPAA training, and day-1 payroll + benefits enrollment. Want to review and publish it?"
};

function pickReply(q) {
  const s = (q || "").toLowerCase();
  if (s.includes("summ") || s.includes("change") || s.includes("cycle")) return AI_REPLIES.summarize;
  if (s.includes("pto") || s.includes("balance") || s.includes("over")) return AI_REPLIES.pto;
  if (s.includes("onboard") || s.includes("template") || s.includes("draft")) return AI_REPLIES.onboarding;
  return AI_REPLIES.default;
}

function AIAssistant({ open, onClose, seed }) {
  const [msgs, setMsgs] = React.useState([]);
  const [val, setVal] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const bodyRef = React.useRef(null);
  const lastSeed = React.useRef(null);

  const send = React.useCallback((text) => {
    const q = (text || "").trim();
    if (!q) return;
    setMsgs((m) => [...m, { who: "me", text: q }]);
    setVal("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { who: "ai", text: pickReply(q) }]);
    }, 850);
  }, []);

  React.useEffect(() => {
    if (open && seed && seed.trim() && seed !== lastSeed.current) {
      lastSeed.current = seed;
      send(seed);
    }
    if (open && !seed) lastSeed.current = null;
  }, [open, seed, send]);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing]);

  return (
    <>
      <div className={"tl-scrim" + (open ? " show" : "")} onClick={onClose} style={{ zIndex: 60 }} />
      <aside className={"tl-ai-drawer" + (open ? " open" : "")}>
        <div className="tl-ai-dhead">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="tl-ai-orb"><Icon name="sparkle" size={18} /></span>
            <div>
              <div style={{ fontWeight: 650, fontSize: 15 }}>Trulu AI</div>
              <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>Your payroll sidekick</div>
            </div>
          </div>
          <button className="tl-iconbtn" onClick={onClose} aria-label="Close"><Icon name="close" size={19} /></button>
        </div>

        <div className="tl-ai-body" ref={bodyRef}>
          {msgs.length === 0 &&
          <div className="tl-ai-empty">
              <span className="tl-ai-orb big"><Icon name="sparkle" size={26} /></span>
              <div style={{ fontWeight: 600, fontSize: 16, marginTop: 12 }}>Hi {ME.name.split(" ")[0]}! What's on your mind? 👋</div>
              <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4, maxWidth: 260 }}>
                Payroll, PTO, headcount, onboarding — ask away and I'll dig through your whole workspace.
              </div>
            </div>
          }
          {msgs.map((m, i) =>
          <div key={i} className={"tl-msg " + m.who}>
              {m.who === "ai" && <span className="tl-ai-orb sm"><Icon name="sparkle" size={13} /></span>}
              <div className="tl-bubble">{m.text}</div>
            </div>
          )}
          {typing &&
          <div className="tl-msg ai">
              <span className="tl-ai-orb sm"><Icon name="sparkle" size={13} /></span>
              <div className="tl-bubble"><span className="tl-typing"><i></i><i></i><i></i></span></div>
            </div>
          }
        </div>

        <div className="tl-ai-foot">
          <div className="tl-ai-chips">
            {AI_BRIEF.suggestions.map((s, i) => <button key={i} className="tl-chip" onClick={() => send(s)}>{s}</button>)}
          </div>
          <div className="tl-ask" style={{ marginTop: 10 }}>
            <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Message Trulu AI…"
            onKeyDown={(e) => {if (e.key === "Enter") send(val);}} autoFocus={open} />
            <button className="tl-ask-send" onClick={() => send(val)} aria-label="Send"><Icon name="send" size={16} /></button>
          </div>
        </div>
      </aside>
    </>);

}

Object.assign(window, { AIAssistant });


/* ===================== app.jsx ===================== */
/* app.jsx — composes the Trulu dashboard, owns theme + tweaks. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brandColor": ["#1b9cd8", "#1583b8", "#4fc3ef"],
  "headFont": "Schibsted Grotesk",
  "textFont": "Hanken Grotesk",
  "dark": false
} /*EDITMODE-END*/;

const FONTS = {
  "Plus Jakarta Sans": '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  "Hanken Grotesk": '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif',
  "Schibsted Grotesk": '"Schibsted Grotesk", ui-sans-serif, system-ui, sans-serif',
  "Onest": '"Onest", ui-sans-serif, system-ui, sans-serif',
  "Geist": '"Geist", ui-sans-serif, system-ui, sans-serif',
  "Space Grotesk": '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  "Manrope": '"Manrope", ui-sans-serif, system-ui, sans-serif'
};

// Client-facing typeface presets (each sets heading + body together).
const FONT_PRESETS = [
{ name: "Grotesk", head: "Schibsted Grotesk", body: "Hanken Grotesk" },
{ name: "Geometric", head: "Plus Jakarta Sans", body: "Plus Jakarta Sans" },
{ name: "Neutral", head: "Manrope", body: "Manrope" },
{ name: "Compact", head: "Geist", body: "Geist" }];

const ACCENTS = [
["#1b9cd8", "#1583b8", "#4fc3ef"], // Trulu blue (brand)
["#29abe2", "#1f93c4", "#6fd0f3"], // Cyan
["#18c29c", "#119e7f", "#4ed9b8"], // Mint green
["#7b6cf6", "#5f4fe0", "#a79bff"], // Purple
["#ff6b5c", "#e8503f", "#ff9488"], // Coral
["#ffb020", "#e0950c", "#ffc859"], // Amber
["#ff5da2", "#e8417f", "#ff8dbf"], // Pink
["#6d4ef5", "#5734df", "#7c5dff"], // Violet
["#6366f1", "#4f46e5", "#818cf8"], // Indigo
["#0e9488", "#0c7e74", "#2dd4bf"], // Teal
["#e0739c", "#cf5586", "#f0a0c0"], // Rose
["#e0568a", "#c43d72", "#f08bb4"], // Magenta
["#2f8fdb", "#1f6fc0", "#63b3ef"], // Sky blue
["#e2952a", "#c47a14", "#f4b552"], // Gold
["#dc4f4f", "#c23838", "#f08080"], // Coral red
["#5b6470", "#444b55", "#828b97"], // Slate
["#d97746", "#c2632f", "#ef9a6a"] // Amber clay
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = React.useState("home");
  const [navOpen, setNavOpen] = React.useState(false);
  const [aiOpen, setAiOpen] = React.useState(false);
  const [aiSeed, setAiSeed] = React.useState("");

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {e.preventDefault();openAI();}
      if (e.key === "Escape") setAiOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openAI = (seed) => {setAiSeed(typeof seed === "string" ? seed : "");setAiOpen(true);};

  // Client-facing theme choice — persisted to THIS browser (works in the
  // deployed app, independent of the design host). Falls back to tweak values.
  const [clientTheme, setClientTheme] = React.useState(() => {
    try {return JSON.parse(localStorage.getItem("trulu.theme.v2") || "null") || {};} catch (e) {return {};}
  });
  const persistTheme = React.useCallback((patch) => {
    setClientTheme((prev) => {
      const next = { ...prev, ...patch };
      try {localStorage.setItem("trulu.theme.v2", JSON.stringify(next));} catch (e) {}
      return next;
    });
  }, []);
  const accent = Array.isArray(clientTheme.accent) ? clientTheme.accent :
  Array.isArray(t.brandColor) ? t.brandColor : ACCENTS[0];
  const dark = typeof clientTheme.dark === "boolean" ? clientTheme.dark : !!t.dark;
  const fontName = clientTheme.font || "Grotesk";
  const preset = FONT_PRESETS.find((p) => p.name === fontName) || FONT_PRESETS[0];
  const setAccent = (v) => {persistTheme({ accent: v });setTweak("brandColor", v);};
  const setDark = (v) => {persistTheme({ dark: v });setTweak("dark", v);};
  const setFont = (name) => {
    const p = FONT_PRESETS.find((x) => x.name === name) || FONT_PRESETS[0];
    persistTheme({ font: name });setTweak({ headFont: p.head, textFont: p.body });
  };
  const resetTheme = () => {
    const d = ACCENTS[0];
    persistTheme({ accent: d, dark: false, font: "Grotesk" });
    setTweak({ brandColor: d, dark: false, headFont: "Schibsted Grotesk", textFont: "Hanken Grotesk" });
  };
  const isDefaultTheme = accent[0] === ACCENTS[0][0] && !dark && fontName === "Grotesk";
  const fontOptions = FONT_PRESETS.map((p) => ({ name: p.name, family: FONTS[p.head] || FONTS["Hanken Grotesk"] }));
  const theme = dark ? "dark" : "light";
  const onBgMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    e.currentTarget.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const shellStyle = {
    "--primary": accent[0],
    "--primary-strong": accent[1],
    "--primary-bright": accent[2],
    "--primary-deep": accent[1],
    "--font-sans": FONTS[preset.body] || FONTS["Hanken Grotesk"],
    "--font-display": FONTS[preset.head] || FONTS["Schibsted Grotesk"]
  };

  return (
    <NavCtx.Provider value={{ go: setActive, openAI }}>
    <div className="tl-shell" data-theme={theme} style={shellStyle}>
      <Sidebar active={active} setActive={setActive} open={navOpen} onClose={() => setNavOpen(false)} onOpenAI={() => openAI()} />

      <div className="tl-main" onMouseMove={onBgMove}>
        <div className="tl-bg" aria-hidden="true">
          <span className="tl-orb tl-orb1" />
          <span className="tl-orb tl-orb2" />
          <span className="tl-orb tl-orb3" />
          <span className="tl-orb tl-orb4" />
          <span className="tl-orb tl-orb5" />
          <span className="tl-bg-grid" />
        </div>
        <Topbar onMenu={() => setNavOpen(true)} theme={theme} onToggleTheme={() => setDark(!dark)} onOpenAI={() => openAI()}
          accent={accent} setAccent={setAccent} dark={dark} setDark={setDark} accents={ACCENTS}
          font={fontName} setFont={setFont} fonts={fontOptions} onReset={resetTheme} isDefault={isDefaultTheme} />

        <main className="tl-content">
          {active === "home" ?
            <>
              <div className="tl-greet">
                <div>
                  <h1>Hey {ME.name.split(" ")[0]}, let's make payday painless 🎉</h1>
                  <p>Three quick approvals and Friday's run basically does itself.</p>
                </div>
                <button className="btn btn-ghost only-mobile" style={{ display: "inline-flex" }} onClick={() => openAI()}>
                  <Icon name="sparkle" size={16} style={{ color: "var(--primary)" }} /> Ask Trulu
                </button>
              </div>

              <div className="tl-grid">
                <div className="tl-col">
                  <AIBrief onOpenAI={openAI} />
                  <PayrollHero />
                  <KpiStrip />
                  <TrendChart />
                  <Onboarding />
                </div>
                <div className="tl-col">
                  <Approvals />
                  <WhosOut />
                  <Activity />
                </div>
              </div>
            </> :

            (() => {
              const S = (window.TruluScreens || {})[active];
              return S ? <S openAI={openAI} /> : <Placeholder name={active} />;
            })()
            }
        </main>
      </div>

      <AIAssistant open={aiOpen} onClose={() => setAiOpen(false)} seed={aiSeed} />

      <TweaksPanel>
        <TweakSection label="Brand accent" />
        <TweakColor label="Accent" value={t.brandColor} options={ACCENTS} onChange={(v) => setTweak("brandColor", v)} />
        <TweakSection label="Typography" />
        <TweakSelect label="Heading font" value={t.headFont} options={Object.keys(FONTS)} onChange={(v) => setTweak("headFont", v)} />
        <TweakSelect label="Body font" value={t.textFont} options={Object.keys(FONTS)} onChange={(v) => setTweak("textFont", v)} />
        <TweakSection label="Appearance" />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak("dark", v)} />
      </TweaksPanel>
    </div>
    </NavCtx.Provider>);

}
Object.assign(window, { App });

function Placeholder({ name }) {
  const item = NAV.find((n) => n.key === name) || { label: "Settings", icon: "gear" };
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "60vh", textAlign: "center" }}>
      <div>
        <div style={{ width: 64, height: 64, borderRadius: 18, display: "grid", placeItems: "center", margin: "0 auto 16px",
          background: "var(--primary-soft)", color: "var(--primary)" }}>
          <Icon name={item.icon} size={30} />
        </div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{item.label}</h2>
        <p style={{ color: "var(--text-2)", maxWidth: 340, margin: "8px auto 0", fontSize: 14 }}>
          This is a focused demo of the <b>Home</b> dashboard. {item.label} would live here — tell me which screen to build next.
        </p>
        <button className="btn btn-ghost" style={{ marginTop: 18 }} onClick={() => location.reload()}>← Back to Home</button>
      </div>
    </div>);

}

/* render moved to screens.jsx (loads after this bundle so window.TruluScreens is ready) */