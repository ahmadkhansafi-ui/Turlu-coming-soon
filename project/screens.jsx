/* screens.jsx — all secondary screens for Trulu, each interactive + AI-forward.
   Loads AFTER trulu.bundle.jsx. Helpers (Icon, Avatar, SectionHead, fmtMoney,
   NavCtx, App, COMPANY, ME, PAYROLL, TREND) come from window. */

const { useState, useEffect, useRef, useContext } = React;

const TONE_C = { warn: "var(--warn)", ok: "var(--ok)", bad: "var(--bad)", primary: "var(--primary)" };
const TONE_BG = { warn: "var(--warn-bg)", ok: "var(--ok-bg)", bad: "var(--bad-bg)", primary: "var(--primary-soft)" };
const PALETTE = ["#6d4ef5", "#e0739c", "#4aa3c4", "#7a9a3a", "#c4863a", "#b45a8a", "#3aa0a0", "#9a6bd8", "#d0654f"];
const initialsOf = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/* ============ shared demo data ============ */
const EMPLOYEES = [
{ name: "Ahmad Rahman", role: "Pediatric Nurse", dept: "Nursing", status: "Active", loc: "Austin, TX", comp: 88000, start: "Mar 2024", email: "ahmad@kidsvillepeds.com", phone: "+1 (512) 555-0142" },
{ name: "Dr. Abdullah Khan", role: "Pediatrician", dept: "Pediatrics", status: "Active", loc: "Austin, TX", comp: 232000, start: "Jun 2023", email: "abdullah@kidsvillepeds.com", phone: "+1 (415) 555-0199" },
{ name: "Ali Hassan", role: "Front Desk Coordinator", dept: "Front Desk", status: "Active", loc: "Austin, TX", comp: 52000, start: "Jan 2025", email: "ali@kidsvillepeds.com", phone: "+1 (212) 555-0177" },
{ name: "Sara Nilsson", role: "Practice Administrator", dept: "Administration", status: "Active", loc: "Austin, TX", comp: 124000, start: "Sep 2022", email: "sara@kidsvillepeds.com", phone: "+1 (646) 555-0123" },
{ name: "Tom Becker", role: "Lab Technician", dept: "Lab", status: "Active", loc: "Austin, TX", comp: 71000, start: "Feb 2021", email: "tom@kidsvillepeds.com", phone: "+1 (303) 555-0188" },
{ name: "Amen Tesfaye", role: "Medical Assistant", dept: "Clinical", status: "On leave", loc: "Austin, TX", comp: 54000, start: "Nov 2023", email: "amen@kidsvillepeds.com", phone: "+1 (206) 555-0155" },
{ name: "Priya Raman, RN", role: "Charge Nurse", dept: "Nursing", status: "Active", loc: "Austin, TX", comp: 102000, start: "Aug 2020", email: "priya@kidsvillepeds.com", phone: "+1 (206) 555-0111" },
{ name: "Marcus Lee", role: "Billing Specialist", dept: "Billing", status: "Active", loc: "Austin, TX", comp: 64000, start: "Apr 2022", email: "marcus@kidsvillepeds.com", phone: "+1 (312) 555-0166" },
{ name: "Lina Park", role: "HR & Credentialing", dept: "Administration", status: "On leave", loc: "Remote", comp: 88000, start: "Jul 2023", email: "lina@kidsvillepeds.com", phone: "+1 (917) 555-0144" }].
map((e, i) => ({ ...e, initials: initialsOf(e.name), color: PALETTE[i % PALETTE.length] }));

const DEPTS = ["All", "Pediatrics", "Nursing", "Clinical", "Front Desk", "Lab", "Billing", "Administration"];

const PAY_ROWS = EMPLOYEES.map((e, i) => {
  const gross = Math.round(e.comp / 24);
  const tax = Math.round(gross * 0.232);
  const deduct = Math.round(gross * 0.06);
  return { ...e, type: e.role.includes("Manager") || e.comp > 150000 ? "Salary" : "Salary", gross, net: gross - tax - deduct, tax, deduct, ot: i === 4 ? 38 : 0, flag: i === 4 };
});

const TIME_TODAY = EMPLOYEES.slice(0, 6).map((e, i) => ({
  ...e,
  in: ["9:02 AM", "8:47 AM", "9:15 AM", "—", "8:30 AM", "9:41 AM"][i],
  state: ["in", "in", "in", "off", "in", "break"][i],
  hours: [6.4, 6.7, 6.1, 0, 7.0, 5.2][i]
}));

const PTO_REQUESTS = [
{ id: "p1", name: "Ali Hassan", initials: "AH", color: PALETTE[2], type: "Vacation", range: "Jun 16 – Jun 20", days: 5, ai: "Within policy · low-impact week", flag: false },
{ id: "p2", name: "Priya Raman, RN", initials: "PR", color: PALETTE[6], type: "Sick", range: "Jun 6", days: 1, ai: "Auto-approvable", flag: false },
{ id: "p3", name: "Dr. Abdullah Khan", initials: "AK", color: PALETTE[7], type: "Personal", range: "Jun 9 – Jun 10", days: 2, ai: "2 providers already out — coverage risk", flag: true }];


const WEEK_HOURS = [
{ d: "Mon", v: 412 }, { d: "Tue", v: 438 }, { d: "Wed", v: 401 },
{ d: "Thu", v: 449 }, { d: "Fri", v: 388 }, { d: "Sat", v: 96 }, { d: "Sun", v: 41 }];


const NEW_HIRES = [
{ name: "Ahmad Rahman", role: "Pediatric Nurse", color: PALETTE[0], start: "Started Jun 2", track: "Nursing", tasks: [
{ t: "Sign offer & I-9", done: true }, { t: "Payroll & direct deposit", done: true }, { t: "License & credential check", done: true },
{ t: "EHR access provisioned", done: true }, { t: "Preceptor assigned", done: true }, { t: "HIPAA training", done: true },
{ t: "Clinic floor walkthrough", done: true }, { t: "First-week 1:1", done: true }, { t: "Benefits enrollment", done: false }, { t: "30-day check-in", done: false }] },

{ name: "Dr. Abdullah Khan", role: "Pediatrician", color: PALETTE[1], start: "Starts Jun 9", track: "Pediatrics", tasks: [
{ t: "Sign offer & I-9", done: true }, { t: "Payroll & direct deposit", done: true }, { t: "Medical license verified", done: true },
{ t: "DEA registration", done: false }, { t: "Malpractice insurance", done: false }, { t: "EHR & e-prescribe setup", done: false },
{ t: "Payer credentialing", done: false }, { t: "Benefits enrollment", done: false }] },

{ name: "Ali Hassan", role: "Front Desk Coordinator", color: PALETTE[2], start: "Starts Jun 16", track: "Front Office", tasks: [
{ t: "Sign offer & I-9", done: true }, { t: "Payroll & direct deposit", done: false }, { t: "HIPAA training", done: false },
{ t: "Scheduling system access", done: false }, { t: "Front-desk playbook", done: false }, { t: "Shadow 3 shifts", done: false }] }];


const REVIEWS = [
{ name: "Ahmad Rahman", role: "Pediatric Nurse", color: PALETTE[0], status: "Submitted", score: 4.6 },
{ name: "Dr. Abdullah Khan", role: "Pediatrician", color: PALETTE[1], status: "In progress", score: null },
{ name: "Sara Nilsson", role: "Practice Administrator", color: PALETTE[3], status: "In progress", score: null },
{ name: "Tom Becker", role: "Lab Technician", color: PALETTE[4], status: "Not started", score: null },
{ name: "Marcus Lee", role: "Billing Specialist", color: PALETTE[7], status: "Submitted", score: 4.1 }];


const DOCUMENTS = [
{ name: "Offer Letter — A. Rahman.pdf", type: "Offer", owner: "Ahmad Rahman", status: "Signed", date: "Mar 12", ai: true },
{ name: "W-4 2025 — A. Khan.pdf", type: "Tax", owner: "Dr. Abdullah Khan", status: "Parsed", date: "Jun 1", ai: true },
{ name: "Locum Invoice #4471.pdf", type: "Invoice", owner: "Bright Pediatrics Locums", status: "Needs review", date: "Jun 3", ai: true },
{ name: "RN License — P. Raman.pdf", type: "Credential", owner: "Priya Raman, RN", status: "Expiring", date: "Jun 14", ai: false },
{ name: "HIPAA Policy 2025.pdf", type: "Policy", owner: "Clinic-wide", status: "Published", date: "Jan 8", ai: false }];


/* ============ shared UI ============ */
function AskBtn({ seed, label = "Ask Trulu" }) {
  const nav = useContext(window.NavCtx);
  return <button className="tl-ask-btn" onClick={() => nav.openAI(seed)}><Icon name="sparkle" size={16} /> {label}</button>;
}

function PageHead({ title, sub, children }) {
  return (
    <div className="tl-page-head">
      <div><h1>{title}</h1>{sub && <p>{sub}</p>}</div>
      <div className="tl-page-actions">{children}</div>
    </div>);

}

function Badge({ tone = "neutral", children }) {
  return <span className={"tl-badge " + tone}>{children}</span>;
}

function SidePanel({ open, onClose, children }) {
  return (
    <>
      <div className={"tl-scrim" + (open ? " show" : "")} style={{ zIndex: 60 }} onClick={onClose} />
      <aside className={"tl-side" + (open ? " open" : "")}>{open && children}</aside>
    </>);

}

function Modal({ open, onClose, children }) {
  return (
    <div className={"tl-modal-scrim" + (open ? " show" : "")} onClick={onClose}>
      <div className="tl-modal" onClick={(e) => e.stopPropagation()}>{open && children}</div>
    </div>);

}

/* simulated AI generation */
function useGen() {
  const [state, setState] = useState("idle"); // idle | working | done
  const [out, setOut] = useState("");
  const run = (text, ms = 1200) => {setState("working");setOut("");setTimeout(() => {setOut(text);setState("done");}, ms);};
  return { state, out, run, reset: () => {setState("idle");setOut("");} };
}

function AIBox({ title = "Trulu AI", working, children }) {
  return (
    <div className="tl-aibox">
      <div className="tl-aibox-head"><Icon name="sparkle" size={14} /> {title}</div>
      {working ?
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-2)", fontSize: 13 }}>
          <span className="tl-spin" /> Analyzing your workspace…
        </div> :

      <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--text)" }}>{children}</div>}
    </div>);

}

/* AI insight strip — reused at top of most screens */
function AIStrip({ label, items }) {
  const nav = useContext(window.NavCtx);
  return (
    <section className="tl-aibrief" style={{ marginBottom: 18 }}>
      <div className="tl-aibrief-glow" />
      <div className="tl-aibrief-inner" style={{ padding: "18px 22px" }}>
        <div className="tl-aibrief-head">
          <span className="tl-ai-chip"><Icon name="sparkle" size={14} /> Trulu AI</span>
          <span className="tl-ai-day">{label}</span>
        </div>
        <div className="tl-aibrief-items" style={{ marginTop: 13 }}>
          {items.map((it, i) =>
          <div key={i} className="tl-aiitem">
              <span className="tl-aiitem-ic" style={{ color: TONE_C[it.tone], background: TONE_BG[it.tone] }}><Icon name={it.icon} size={16} /></span>
              <span className="tl-aiitem-text">{it.text}</span>
              {it.action && <button className="tl-aiitem-act" onClick={() => nav.openAI(it.text)}>{it.action}<Icon name="chevright" size={13} /></button>}
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Search({ value, onChange, placeholder }) {
  return (
    <div className="tl-input">
      <Icon name="search" size={16} style={{ color: "var(--text-3)" }} />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>);

}

/* ============ PAYROLL ============ */
function RunModal({ open, onClose }) {
  const steps = ["Validating hours & adjustments", "Running AI anomaly scan", "Calculating taxes & deductions", "Funding & filing with agencies"];
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!open) {setI(0);setDone(false);return;}
    setI(0);setDone(false);
    let k = 0;
    const t = setInterval(() => {
      k++;
      setI(k);
      if (k >= steps.length) {clearInterval(t);setTimeout(() => setDone(true), 500);}
    }, 850);
    return () => clearInterval(t);
  }, [open]);

  return (
    <Modal open={open} onClose={done ? onClose : undefined}>
      {!done ?
      <>
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 6 }}>
            <span className="tl-ai-orb"><Icon name="wallet" size={18} /></span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>Running payroll</div>
              <div style={{ fontSize: 13, color: "var(--text-3)" }}>{PAYROLL.cycle} · {PAYROLL.employees + PAYROLL.contractors} people</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 18 }}>
            {steps.map((s, idx) =>
          <div key={idx} className="tl-step">
                <span className={"tl-step-ic" + (idx < i ? " done" : "")}>
                  {idx < i ? <Icon name="check" size={12} sw={2.6} /> : idx === i ? <span className="tl-spin" style={{ width: 13, height: 13, borderWidth: 2 }} /> : <span className="tl-step-num">{idx + 1}</span>}
                </span>
                <span style={{ flex: 1, fontSize: 13.5, fontWeight: idx === i ? 700 : 550, color: idx <= i ? "var(--text)" : "var(--text-3)" }}>{s}</span>
              </div>
          )}
          </div>
        </> :

      <div style={{ textAlign: "center", padding: "8px 0" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--ok-bg)", color: "var(--ok)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}>
            <Icon name="check" size={30} sw={2.6} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 20 }}>Payroll submitted</div>
          <p style={{ color: "var(--text-2)", fontSize: 14, margin: "8px 0 20px" }}>
            {fmtMoney(PAYROLL.gross)} to {PAYROLL.employees} employees + {PAYROLL.contractors} contractors. Direct deposits land {PAYROLL.runDate}. Tax filings submitted automatically.
          </p>
          <button className="btn btn-primary" style={{ width: "100%", padding: 12 }} onClick={onClose}>Done</button>
        </div>}
    </Modal>);

}

function PayrollScreen() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [exp, setExp] = useState(null);
  const rows = PAY_ROWS.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
  const doneCount = PAYROLL.steps.filter((s) => s.done).length;
  return (
    <>
      <PageHead title="Payroll" sub={`Current cycle · ${PAYROLL.cycle} · runs ${PAYROLL.runDate}`}>
        <AskBtn seed="Summarize this cycle's payroll changes" label="Ask about this run" />
        <button className="btn btn-primary" onClick={() => setOpen(true)}><Icon name="wallet" size={17} /> Run payroll</button>
      </PageHead>

      <AIStrip label="Pre-run scan · complete" items={[
      { icon: "alert", tone: "warn", text: "Priya Raman, RN logged 38 overtime hours — 210% above her 4-week average.", action: "Review" },
      { icon: "doc", tone: "ok", text: "2 locum physician invoices parsed & matched — included in this run.", action: "Open" }]} />


      <div className="tl-grid">
        <div className="tl-col">
          <section className="card" style={{ padding: 22 }}>
            <SectionHead title="Employee pay" sub={`${PAYROLL.employees} employees · ${PAYROLL.contractors} contractors`} icon="people" />
            <div style={{ marginBottom: 12 }}><Search value={q} onChange={setQ} placeholder="Search employees…" /></div>
            <table className="tl-table">
              <thead><tr><th>Employee</th><th>Type</th><th style={{ textAlign: "right" }}>Gross</th><th style={{ textAlign: "right" }}>Net</th><th></th></tr></thead>
              <tbody>
                {rows.map((r) =>
                <React.Fragment key={r.name}>
                    <tr onClick={() => setExp(exp === r.name ? null : r.name)}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Avatar initials={r.initials} color={r.color} size={32} />
                          <div>
                            <div style={{ fontWeight: 650 }}>{r.name}</div>
                            <div style={{ fontSize: 12, color: "var(--text-3)" }}>{r.role}</div>
                          </div>
                        </div>
                      </td>
                      <td>{r.flag ? <Badge tone="warn"><Icon name="alert" size={12} /> +{r.ot}h OT</Badge> : <span style={{ color: "var(--text-2)" }}>{r.type}</span>}</td>
                      <td className="tnum" style={{ textAlign: "right", fontWeight: 650 }}>{fmtMoney(r.gross)}</td>
                      <td className="tnum" style={{ textAlign: "right" }}>{fmtMoney(r.net)}</td>
                      <td style={{ textAlign: "right", color: "var(--text-3)" }}><Icon name={exp === r.name ? "chevdown" : "chevright"} size={16} /></td>
                    </tr>
                    {exp === r.name &&
                  <tr>
                        <td colSpan={5} style={{ background: "var(--surface-2)" }}>
                          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", padding: "4px 4px 4px 42px" }}>
                            {[["Gross", r.gross], ["Federal + state tax", -r.tax], ["Benefits & deductions", -r.deduct], ["Net pay", r.net]].map(([k, v]) =>
                        <div key={k}>
                                <div style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}>{k}</div>
                                <div className="tnum" style={{ fontWeight: 600, fontSize: 14, color: v < 0 ? "var(--bad)" : "var(--text)" }}>{v < 0 ? "−" : ""}{fmtMoney(Math.abs(v))}</div>
                              </div>
                        )}
                          </div>
                        </td>
                      </tr>}
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </section>
        </div>

        <div className="tl-col">
          <section className="card" style={{ padding: 22 }}>
            <SectionHead title="Run summary" icon="wallet" />
            <div className="tl-payroll-break" style={{ marginTop: 0 }}>
              {[["Gross", fmtMoney(PAYROLL.gross)], ["Net pay", fmtMoney(PAYROLL.net)], ["Taxes", fmtMoney(PAYROLL.taxes)], ["Benefits", fmtMoney(PAYROLL.benefits)]].map(([k, v]) =>
              <div key={k} className="tl-break"><div className="tl-break-k">{k}</div><div className="tl-break-v tnum">{v}</div></div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0 8px", fontSize: 13 }}>
              <span style={{ fontWeight: 600 }}>Run checklist</span><span style={{ color: "var(--text-3)", fontWeight: 650 }}>{doneCount}/{PAYROLL.steps.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {PAYROLL.steps.map((s, i) =>
              <div key={i} className="tl-step">
                  <span className={"tl-step-ic" + (s.done ? " done" : "")}>{s.done ? <Icon name="check" size={12} sw={2.6} /> : <span className="tl-step-num">{i + 1}</span>}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: s.done ? 500 : 650, color: s.done ? "var(--text-3)" : "var(--text)" }}>{s.label}</span>
                  {s.note && <span className="tl-step-note">{s.note}</span>}
                </div>
              )}
            </div>
            <button className="btn btn-primary" style={{ width: "100%", marginTop: 16, padding: 12 }} onClick={() => setOpen(true)}>Review &amp; run payroll <Icon name="arrowright" size={16} /></button>
          </section>
        </div>
      </div>

      <RunModal open={open} onClose={() => setOpen(false)} />
    </>);

}

/* ============ PEOPLE ============ */
function ProfilePanel({ emp, onClose }) {
  const gen = useGen();
  useEffect(() => {gen.reset();}, [emp && emp.name]);
  if (!emp) return null;
  return (
    <>
      <div className="tl-side-head">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar initials={emp.initials} color={emp.color} size={46} />
          <div>
            <div style={{ fontWeight: 650, fontSize: 16 }}>{emp.name}</div>
            <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>{emp.role} · {emp.dept}</div>
          </div>
        </div>
        <button className="tl-iconbtn" onClick={onClose} aria-label="Close"><Icon name="close" size={19} /></button>
      </div>
      <div className="tl-side-body">
        <button className="btn btn-primary" style={{ width: "100%", padding: 11 }} onClick={() => gen.run(
          `${emp.name} has been with ${COMPANY.name} since ${emp.start} as ${emp.role} in ${emp.dept}. Performance is trending up — last review 4.4/5 with strong peer feedback. Compensation ($${emp.comp.toLocaleString()}) sits mid-band for the role and market. PTO balance is healthy at 9 days. No open compliance items.`)}>
          <Icon name="sparkle" size={16} /> Generate AI summary
        </button>
        {gen.state !== "idle" && <AIBox working={gen.state === "working"}>{gen.out}</AIBox>}

        <div className="tl-cards-2">
          {[["Department", emp.dept, "building"], ["Location", emp.loc, "pin"], ["Start date", emp.start, "calendar"], ["Status", emp.status, "shield"]].map(([k, v, ic]) =>
          <div key={k} className="card" style={{ padding: 13 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-3)", fontSize: 11.5, fontWeight: 600, marginBottom: 4 }}><Icon name={ic} size={13} /> {k}</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{v}</div>
            </div>
          )}
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 10 }}>Compensation</div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <span className="tnum" style={{ fontWeight: 700, fontSize: 24 }}>{fmtMoney(emp.comp)}</span>
            <span style={{ fontSize: 12.5, color: "var(--text-3)" }}>/ year</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a className="tl-contact" href={"mailto:" + emp.email}><Icon name="mail" size={15} /> {emp.email}</a>
            <span className="tl-contact"><Icon name="phone" size={15} /> {emp.phone}</span>
          </div>
        </div>
      </div>
    </>);

}

function PeopleScreen() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [sel, setSel] = useState(null);
  const list = EMPLOYEES.filter((e) =>
  (dept === "All" || e.dept === dept) && (
  e.name.toLowerCase().includes(q.toLowerCase()) || e.role.toLowerCase().includes(q.toLowerCase())));

  return (
    <>
      <PageHead title="People" sub={`${EMPLOYEES.length} of ${COMPANY.headcount} employees`}>
        <AskBtn seed="Who is over their PTO balance?" />
        <button className="btn btn-primary"><Icon name="plus" size={16} /> Add person</button>
      </PageHead>

      <div className="tl-toolbar">
        <Search value={q} onChange={setQ} placeholder="Search by name or role…" />
        <div className="tl-filters">
          {DEPTS.map((d) => <button key={d} className={"tl-fchip" + (dept === d ? " active" : "")} onClick={() => setDept(d)}>{d}</button>)}
        </div>
      </div>

      <section className="card" style={{ padding: 10 }}>
        <table className="tl-table">
          <thead><tr><th>Name</th><th>Department</th><th>Location</th><th>Status</th><th style={{ textAlign: "right" }}>Comp</th></tr></thead>
          <tbody>
            {list.map((e) =>
            <tr key={e.name} onClick={() => setSel(e)}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={e.initials} color={e.color} size={34} />
                    <div><div style={{ fontWeight: 650 }}>{e.name}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>{e.role}</div></div>
                  </div>
                </td>
                <td style={{ color: "var(--text-2)" }}>{e.dept}</td>
                <td style={{ color: "var(--text-2)" }}>{e.loc}</td>
                <td>{e.status === "Active" ? <Badge tone="ok">Active</Badge> : <Badge tone="warn">On leave</Badge>}</td>
                <td className="tnum" style={{ textAlign: "right", fontWeight: 650 }}>{fmtMoney(e.comp)}</td>
              </tr>
            )}
          </tbody>
        </table>
        {list.length === 0 && <div style={{ textAlign: "center", color: "var(--text-3)", padding: 40, fontSize: 14 }}>No people match “{q}”.</div>}
      </section>

      <SidePanel open={!!sel} onClose={() => setSel(null)}><ProfilePanel emp={sel} onClose={() => setSel(null)} /></SidePanel>
    </>);

}

/* ============ TIME & ATTENDANCE ============ */
function TimeScreen() {
  const [reqs, setReqs] = useState(PTO_REQUESTS);
  const [done, setDone] = useState({});
  const max = Math.max(...WEEK_HOURS.map((d) => d.v));
  const stateLabel = { in: ["Clocked in", "ok"], break: ["On break", "warn"], off: ["Off today", "neutral"] };
  return (
    <>
      <PageHead title="Time &amp; Attendance" sub="Week of Jun 1 · live">
        <AskBtn seed="Where is overtime concentrated this week?" label="Ask about hours" />
        <button className="btn btn-ghost"><Icon name="download" size={16} /> Export</button>
      </PageHead>

      <AIStrip label="Anomaly detection" items={[
      { icon: "alert", tone: "warn", text: "Nursing overtime is up 210% week-over-week (38 hrs). Consider an extra shift before next run.", action: "View team" }]} />


      <div className="tl-grid">
        <div className="tl-col">
          <section className="card" style={{ padding: 22 }}>
            <SectionHead title="Clocked in now" sub={`${TIME_TODAY.filter((t) => t.state !== "off").length} active`} icon="clock" />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {TIME_TODAY.map((t) =>
              <div key={t.name} className="tl-out">
                  <Avatar initials={t.initials} color={t.color} size={34} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 650, fontSize: 13.5 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>In: {t.in}</div>
                  </div>
                  <span className="tnum" style={{ fontSize: 13, fontWeight: 650, color: "var(--text-2)", width: 54, textAlign: "right" }}>{t.hours}h</span>
                  <Badge tone={stateLabel[t.state][1]}>{stateLabel[t.state][0]}</Badge>
                </div>
              )}
            </div>
          </section>

          <section className="card" style={{ padding: 22 }}>
            <SectionHead title="Hours logged" sub="This week · all teams" icon="chart" />
            <div className="tl-bars">
              {WEEK_HOURS.map((d) =>
              <div key={d.d} className="tl-bar-col">
                  <div className="tl-bar-val tnum">{d.v}</div>
                  <div className="tl-bar-track"><div className={"tl-bar" + (d.v === max ? " cur" : "")} style={{ height: Math.max(8, d.v / max * 100) + "%" }} /></div>
                  <div className="tl-bar-m">{d.d}</div>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="tl-col">
          <section className="card" style={{ padding: 22 }}>
            <SectionHead title="Time-off requests" sub="AI-prioritized" icon="plane" />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {reqs.map((a) =>
              <div key={a.id} className={"tl-approval" + (done[a.id] ? " resolved" : "")}>
                  <Avatar initials={a.initials} color={a.color} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.name}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>{a.type} · {a.range} · <b style={{ color: "var(--text)" }}>{a.days}d</b></div>
                    <span className={"tl-aiflag" + (a.flag ? " flag" : "")}><Icon name="sparkle" size={11} /> {a.ai}</span>
                  </div>
                  {done[a.id] ?
                <Badge tone={done[a.id] === "ok" ? "ok" : "bad"}><Icon name={done[a.id] === "ok" ? "check" : "close"} size={12} sw={2.4} /> {done[a.id] === "ok" ? "Approved" : "Denied"}</Badge> :

                <div style={{ display: "flex", gap: 6 }}>
                      <button className="tl-mini ghost" onClick={() => setDone({ ...done, [a.id]: "deny" })} aria-label="Deny"><Icon name="close" size={15} /></button>
                      <button className="tl-mini ok" onClick={() => setDone({ ...done, [a.id]: "ok" })} aria-label="Approve"><Icon name="check" size={15} sw={2.4} /></button>
                    </div>}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>);

}

/* ============ ONBOARDING ============ */
function HireCard({ hire }) {
  const [tasks, setTasks] = useState(hire.tasks);
  const done = tasks.filter((t) => t.done).length;
  const pct = Math.round(done / tasks.length * 100);
  return (
    <section className="card" style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
        <Avatar initials={initialsOf(hire.name)} color={hire.color} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 650, fontSize: 14.5 }}>{hire.name}</div>
          <div style={{ fontSize: 12, color: "var(--text-3)" }}>{hire.role} · {hire.start}</div>
        </div>
        <Badge tone="brand">{hire.track}</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <div className="tl-progress"><div className="tl-progress-fill" style={{ width: pct + "%" }} /></div>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-2)", width: 38, textAlign: "right" }}>{pct}%</span>
      </div>
      <div>
        {tasks.map((t, i) =>
        <div key={i} className={"tl-checkrow" + (t.done ? " done" : "")} onClick={() => setTasks(tasks.map((x, j) => j === i ? { ...x, done: !x.done } : x))}>
            <span className="tl-checkbox"><Icon name="check" size={13} sw={2.6} /></span>
            <span className="tl-checktext" style={{ fontSize: 13.5 }}>{t.t}</span>
          </div>
        )}
      </div>
    </section>);

}

function OnboardingScreen() {
  const gen = useGen();
  const [role, setRole] = useState("Pediatric Nurse");
  const TEMPLATE = [
  "Send offer + collect signed I-9 and W-4", "Set up payroll & direct deposit (Trulu Payroll)",
  "Verify license & run credential check", "Provision EHR, email, and role-based app access",
  "Assign preceptor / onboarding buddy", "Complete HIPAA & compliance training",
  "Role training: clinical workflows & tooling", "Benefits enrollment walkthrough",
  "Shadow 3 clinic shifts", "30 / 60 / 90-day goals set in Performance"];

  return (
    <>
      <PageHead title="Onboarding" sub="3 hires in progress · 2 templates">
        <AskBtn seed="Draft a Q3 onboarding template" />
      </PageHead>

      <div className="tl-cards-2" style={{ marginBottom: 18, alignItems: "start" }}>
        <section className="card" style={{ padding: 20, gridColumn: "1 / -1" }}>
          <SectionHead title="AI template builder" sub="Generate a tailored checklist from your past hires" icon="sparkle" />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div className="tl-field" style={{ flex: 1, minWidth: 220 }}>
              <label>Role to onboard</label>
              <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Pediatric Nurse" />
            </div>
            <button className="btn btn-primary" style={{ padding: "11px 16px" }} onClick={() => gen.run("ok", 1300)}>
              <Icon name="sparkle" size={16} /> Generate template
            </button>
          </div>
          {gen.state === "working" && <div style={{ marginTop: 14 }}><AIBox working /></div>}
          {gen.state === "done" &&
          <div className="tl-aibox" style={{ marginTop: 14 }}>
              <div className="tl-aibox-head"><Icon name="sparkle" size={14} /> Suggested checklist for {role} · 10 steps</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 18px", marginTop: 6 }}>
                {TEMPLATE.map((t, i) =>
              <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--primary)", fontWeight: 600 }}>{i + 1}.</span><span>{t}</span>
                  </div>
              )}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 13 }}>Publish template</button>
                <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }} onClick={() => gen.reset()}>Discard</button>
              </div>
            </div>}
        </section>
      </div>

      <div className="tl-cards-3" style={{ alignItems: "start" }}>
        {NEW_HIRES.map((h) => <HireCard key={h.name} hire={h} />)}
      </div>
    </>);

}

/* ============ PERFORMANCE ============ */
function Stars({ value, onChange }) {
  return (
    <div className="tl-stars">
      {[1, 2, 3, 4, 5].map((n) =>
      <span key={n} className={"tl-star" + (n <= value ? " on" : "")} onClick={() => onChange && onChange(n)}><Icon name="star" size={20} style={{ fill: n <= value ? "#f0b429" : "transparent" }} /></span>
      )}
    </div>);

}

function ReviewPanel({ rev, onClose }) {
  const gen = useGen();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(rev ? Math.round(rev.score || 4) : 4);
  useEffect(() => {gen.reset();setText("");setRating(rev ? Math.round(rev.score || 4) : 4);}, [rev && rev.name]);
  if (!rev) return null;
  const draft = `${rev.name} has had a strong cycle as ${rev.role}. Consistently delivered high-quality work ahead of deadlines and raised the bar for the team through thoughtful collaboration.

Strengths: ownership, clear communication, and mentoring of newer team members. Notably led 2 cross-functional initiatives this quarter.

Growth areas: delegate more on execution-heavy work to create space for strategic planning. Set a goal to define and own one team-level OKR next cycle.

Overall: exceeds expectations.`;
  return (
    <>
      <div className="tl-side-head">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar initials={initialsOf(rev.name)} color={rev.color} size={44} />
          <div><div style={{ fontWeight: 650, fontSize: 16 }}>{rev.name}</div><div style={{ fontSize: 12.5, color: "var(--text-3)" }}>{rev.role} · H1 2025 review</div></div>
        </div>
        <button className="tl-iconbtn" onClick={onClose} aria-label="Close"><Icon name="close" size={19} /></button>
      </div>
      <div className="tl-side-body">
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 650, color: "var(--text-2)", marginBottom: 6 }}>Overall rating</div>
          <Stars value={rating} onChange={setRating} />
        </div>
        <button className="btn btn-primary" style={{ width: "100%", padding: 11 }} onClick={() => {gen.run("ok", 1400);setTimeout(() => setText(draft), 1450);}}>
          <Icon name="sparkle" size={16} /> Draft review with AI
        </button>
        {gen.state === "working" && <AIBox working />}
        <div className="tl-field">
          <label>Review (editable)</label>
          <textarea rows={14} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write the review, or let Trulu draft it from this cycle's data, peer feedback, and goals…" style={{ resize: "vertical", lineHeight: 1.5 }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary" style={{ flex: 1, padding: 11 }}>Submit review</button>
          <button className="btn btn-ghost" style={{ padding: 11 }} onClick={onClose}>Save draft</button>
        </div>
      </div>
    </>);

}

function PerformanceScreen() {
  const [sel, setSel] = useState(null);
  const submitted = REVIEWS.filter((r) => r.status === "Submitted").length;
  const pct = Math.round(submitted / REVIEWS.length * 100);
  const tone = { "Submitted": "ok", "In progress": "warn", "Not started": "neutral" };
  return (
    <>
      <PageHead title="Performance" sub="H1 2025 review cycle · closes Jun 30">
        <AskBtn seed="Summarize this cycle's review themes" />
        <button className="btn btn-primary"><Icon name="plus" size={16} /> New cycle</button>
      </PageHead>

      <AIStrip label="Cycle insight" items={[
      { icon: "trend", tone: "primary", text: `“Cross-team collaboration” is the top strength theme across ${submitted} submitted reviews; “delegation” is the most common growth area.`, action: "See analysis" }]} />


      <section className="card" style={{ padding: 22, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <span style={{ fontWeight: 650, fontSize: 15 }}>Cycle progress</span>
          <span style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 650 }}>{submitted}/{REVIEWS.length} submitted</span>
        </div>
        <div className="tl-progress"><div className="tl-progress-fill" style={{ width: pct + "%" }} /></div>
      </section>

      <section className="card" style={{ padding: 10 }}>
        <table className="tl-table">
          <thead><tr><th>Employee</th><th>Status</th><th>Score</th><th style={{ textAlign: "right" }}></th></tr></thead>
          <tbody>
            {REVIEWS.map((r) =>
            <tr key={r.name} onClick={() => setSel(r)}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={initialsOf(r.name)} color={r.color} size={34} />
                    <div><div style={{ fontWeight: 650 }}>{r.name}</div><div style={{ fontSize: 12, color: "var(--text-3)" }}>{r.role}</div></div>
                  </div>
                </td>
                <td><Badge tone={tone[r.status]}>{r.status}</Badge></td>
                <td className="tnum" style={{ fontWeight: 600 }}>{r.score ? r.score.toFixed(1) + " / 5" : "—"}</td>
                <td style={{ textAlign: "right" }}><button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 13 }} onClick={(e) => {e.stopPropagation();setSel(r);}}>{r.status === "Submitted" ? "View" : "Write"}</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <SidePanel open={!!sel} onClose={() => setSel(null)}><ReviewPanel rev={sel} onClose={() => setSel(null)} /></SidePanel>
    </>);

}

/* ============ DOCUMENTS ============ */
function DocumentsScreen() {
  const [q, setQ] = useState("");
  const [docs, setDocs] = useState(DOCUMENTS);
  const [parsing, setParsing] = useState(null); // {name} while parsing
  const tone = { Signed: "ok", Parsed: "brand", Published: "neutral", "Needs review": "warn", Expiring: "bad" };

  const simulateUpload = () => {
    const name = "Contractor Invoice #4488.pdf";
    setParsing(name);
    setTimeout(() => {
      setDocs([{ name, type: "Invoice", owner: "Bright Pediatrics Locums", status: "Parsed", date: "Jun 5", ai: true, fresh: true, fields: { Vendor: "Bright Pediatrics Locums", Amount: "$2,150.00", "PO match": "PO-2291 ✓", "Due date": "Jun 30" } }, ...docs]);
      setParsing(null);
    }, 1800);
  };

  const list = docs.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()) || d.owner.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHead title="Documents" sub={`${docs.length} files · AI parsing on`}>
        <AskBtn seed="Which documents need my review or signature?" />
        <button className="btn btn-primary" onClick={simulateUpload}><Icon name="upload" size={16} /> Upload</button>
      </PageHead>

      <AIStrip label="Document intelligence" items={[
      { icon: "doc", tone: "ok", text: "Trulu auto-extracts fields from offers, W-4s, and invoices on upload — no manual entry.", action: "How it works" },
      { icon: "shield", tone: "bad", text: "Priya Raman's RN license expires Jun 14 — renewal needed.", action: "Start" }]} />


      <div className="tl-toolbar"><Search value={q} onChange={setQ} placeholder="Search documents or owners…" /></div>

      <section className="card" style={{ padding: 10 }}>
        <table className="tl-table">
          <thead><tr><th>Document</th><th>Type</th><th>Owner</th><th>Status</th><th style={{ textAlign: "right" }}>Date</th></tr></thead>
          <tbody>
            {parsing &&
            <tr><td colSpan={5}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "4px 4px 4px 6px" }}>
                <span className="tl-spin" />
                <div style={{ flex: 1 }}><div style={{ fontWeight: 650 }}>{parsing}</div><div style={{ fontSize: 12, color: "var(--primary)" }}>Trulu AI is extracting fields…</div></div>
              </div>
            </td></tr>}
            {list.map((d) =>
            <React.Fragment key={d.name}>
                <tr style={d.fresh ? { background: "var(--primary-soft)" } : null}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 32, height: 32, borderRadius: 8, background: "var(--surface-2)", color: "var(--text-2)", display: "grid", placeItems: "center", flex: "0 0 auto" }}><Icon name="doc" size={16} /></span>
                      <span style={{ fontWeight: 600 }}>{d.name}</span>
                      {d.ai && <span className="tl-tag-ai"><Icon name="sparkle" size={11} /> AI</span>}
                    </div>
                  </td>
                  <td style={{ color: "var(--text-2)" }}>{d.type}</td>
                  <td style={{ color: "var(--text-2)" }}>{d.owner}</td>
                  <td><Badge tone={tone[d.status] || "neutral"}>{d.status}</Badge></td>
                  <td style={{ textAlign: "right", color: "var(--text-3)" }}>{d.date}</td>
                </tr>
                {d.fields &&
              <tr style={{ background: "var(--primary-soft)" }}><td colSpan={5}>
                  <div style={{ display: "flex", gap: 22, flexWrap: "wrap", padding: "2px 4px 6px 48px" }}>
                    {Object.entries(d.fields).map(([k, v]) =>
                  <div key={k}><div style={{ fontSize: 11, color: "var(--on-soft)", fontWeight: 600 }}>{k}</div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{v}</div></div>
                  )}
                  </div>
                </td></tr>}
              </React.Fragment>
            )}
          </tbody>
        </table>
      </section>
    </>);

}

/* ============ REPORTS ============ */
function answerFor(q) {
  const s = q.toLowerCase();
  if (s.includes("overtime")) return { stat: "$2,310", text: "Overtime is concentrated in Nursing — 38 hrs this cycle, +210% vs the 4-week average, driven by Tuesday coverage gaps. No other department exceeds 5 hrs. Estimated cost impact: $2,310." };
  if (s.includes("turnover") || s.includes("attrition") || s.includes("retention")) return { stat: "9.4%", text: "Trailing-12-month staff turnover is 9.4%, down from 11.2% last year. Pediatrics is lowest (4%); Front Desk is highest (15%)." };
  if (s.includes("cost") || s.includes("payroll") || s.includes("spend")) return { stat: "+8.8%", text: "Total payroll cost is up 8.8% YTD, driven mostly by 23 net new clinical hires. Per-head cost is essentially flat (+0.4%)." };
  if (s.includes("pto") || s.includes("leave") || s.includes("vacation")) return { stat: "11.2 days", text: "Average PTO balance is 11.2 days. 4 staff are over balance heading into Q3 — I can flag their managers." };
  if (s.includes("headcount") || s.includes("hire") || s.includes("grow")) return { stat: "248", text: "Headcount is 248, up 6 this month and 23 YTD. Nursing and Front Desk account for 70% of the growth." };
  return { stat: null, text: "I can break down overtime, attrition, payroll cost, PTO, or headcount. Try “What's driving payroll cost?” or “Where is overtime highest?”" };
}

function ReportsScreen() {
  const [q, setQ] = useState("");
  const gen = useGen();
  const [ans, setAns] = useState(null);
  const ask = (text) => {const query = text || q;if (!query.trim()) return;setAns(answerFor(query));gen.run("ok", 1100);setQ(query);};
  const max = Math.max(...TREND.map((d) => d.v)) * 1.08;
  const min = Math.min(...TREND.map((d) => d.v)) * 0.9;
  const suggestions = ["What's driving payroll cost?", "Where is overtime highest?", "How's our attrition trending?"];
  return (
    <>
      <PageHead title="Reports" sub="Live workspace analytics">
        <button className="btn btn-ghost"><Icon name="download" size={16} /> Export PDF</button>
      </PageHead>

      <section className="card" style={{ padding: 22, marginBottom: 18 }}>
        <SectionHead title="Ask your data" sub="Natural-language analytics, powered by Trulu AI" icon="sparkle" />
        <div className="tl-ask" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <Icon name="sparkle" size={17} style={{ color: "var(--primary)" }} />
          <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter") ask();}} placeholder="Ask anything about your people & payroll data…" style={{ color: "var(--text)" }} />
          <button className="tl-ask-send" onClick={() => ask()} aria-label="Ask"><Icon name="send" size={16} /></button>
        </div>
        <div className="tl-ask-chips" style={{ marginTop: 11 }}>
          {suggestions.map((s) => <button key={s} className="tl-chip" style={{ background: "var(--surface-2)", color: "var(--text-2)", border: "1px solid var(--border)" }} onClick={() => ask(s)}>{s}</button>)}
        </div>
        {gen.state === "working" && <div style={{ marginTop: 14 }}><AIBox working /></div>}
        {gen.state === "done" && ans &&
        <div className="tl-aibox" style={{ marginTop: 14, display: "flex", gap: 16, alignItems: "center" }}>
            {ans.stat && <div style={{ flex: "0 0 auto" }}><div className="tnum" style={{ fontWeight: 700, fontSize: 30, color: "var(--primary)" }}>{ans.stat}</div></div>}
            <div style={{ fontSize: 13.5, lineHeight: 1.55 }}>{ans.text}</div>
          </div>}
      </section>

      <div className="tl-kpis" style={{ marginBottom: 18 }}>
        {[["Headcount", "248", "+23 YTD", "people"], ["Avg. tenure", "2.7 yr", "+0.2", "clock"], ["Attrition (TTM)", "9.4%", "−1.8pt", "trend"], ["Cost / head", "$5.2K", "+0.4%", "dollar"]].map(([l, v, d, ic]) =>
        <div key={l} className="card tl-kpi">
            <div className="tl-kpi-top"><span className="tl-kpi-ic"><Icon name={ic} size={17} /></span><span className="tl-kpi-delta up">{d}</span></div>
            <div className="tl-kpi-val tnum">{v}</div><div className="tl-kpi-lab">{l}</div>
          </div>
        )}
      </div>

      <section className="card" style={{ padding: 22 }}>
        <SectionHead title="Payroll cost trend" sub="Total monthly cost · last 6 months" icon="chart" />
        <div className="tl-bars">
          {TREND.map((d, i) =>
          <div key={d.m} className="tl-bar-col">
              <div className="tl-bar-val tnum">${(d.v / 1000).toFixed(2)}M</div>
              <div className="tl-bar-track"><div className={"tl-bar" + (i === TREND.length - 1 ? " cur" : "")} style={{ height: Math.max(8, (d.v - min) / (max - min) * 100) + "%" }} /></div>
              <div className="tl-bar-m">{d.m}</div>
            </div>
          )}
        </div>
      </section>
    </>);

}

/* ============ SETTINGS ============ */
function SettingsScreen() {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState({ name: ME.name, email: "ali@kidsvillepeds.com", role: ME.role, phone: "+1 (415) 555-0100" });
  const [ai, setAi] = useState({ brief: true, anomaly: true, drafts: true, parsing: true, chatbot: false });
  const tabs = [["profile", "Profile", "user"], ["company", "Company", "building"], ["ai", "AI preferences", "sparkle"], ["integrations", "Integrations", "link"]];
  const integrations = [
  ["Slack", "Notifications & approvals", true], ["QuickBooks", "Accounting sync", true],
  ["Athenahealth", "EHR & patient records", true], ["Check", "Payroll processing & tax filing", true],
  ["SterlingMD", "Background & credential checks", false], ["CAQH", "Provider credentialing", false]];

  return (
    <>
      <PageHead title="Settings" sub="Manage your account, company, and AI" />
      <div className="tl-grid" style={{ gridTemplateColumns: "200px 1fr" }}>
        <div className="tl-col">
          <section className="card" style={{ padding: 8 }}>
            {tabs.map(([k, l, ic]) =>
            <button key={k} className={"tl-navitem" + (tab === k ? " active" : "")} style={{ width: "100%" }} onClick={() => setTab(k)}>
                <Icon name={ic} size={18} /><span style={{ flex: 1, textAlign: "left" }}>{l}</span>
              </button>
            )}
          </section>
        </div>
        <div className="tl-col">
          {tab === "profile" &&
          <section className="card" style={{ padding: 24 }}>
              <SectionHead title="Profile" sub="Your personal details" icon="user" />
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <Avatar initials={ME.initials} color="var(--primary)" size={56} />
                <button className="btn btn-ghost"><Icon name="edit" size={15} /> Change photo</button>
              </div>
              <div className="tl-cards-2">
                {[["Full name", "name"], ["Email", "email"], ["Role", "role"], ["Phone", "phone"]].map(([l, k]) =>
              <div key={k} className="tl-field"><label>{l}</label><input value={profile[k]} onChange={(e) => setProfile({ ...profile, [k]: e.target.value })} /></div>
              )}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 20 }}>Save changes</button>
            </section>}

          {tab === "company" &&
          <section className="card" style={{ padding: 24 }}>
              <SectionHead title="Company" sub="Organization details" icon="building" />
              <div className="tl-cards-2">
                <div className="tl-field"><label>Company name</label><input defaultValue={COMPANY.name} /></div>
                <div className="tl-field"><label>Plan</label><input defaultValue={COMPANY.plan + " plan"} disabled /></div>
                <div className="tl-field"><label>Headcount</label><input defaultValue={COMPANY.headcount} /></div>
                <div className="tl-field"><label>Pay frequency</label>
                  <select defaultValue="Bi-weekly"><option>Weekly</option><option>Bi-weekly</option><option>Semi-monthly</option><option>Monthly</option></select>
                </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 20 }}>Save changes</button>
            </section>}

          {tab === "ai" &&
          <section className="card" style={{ padding: 24 }}>
              <SectionHead title="AI preferences" sub="Control where Trulu AI assists you" icon="sparkle" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[["brief", "Daily AI brief", "A morning summary of what needs you"],
              ["anomaly", "Payroll anomaly detection", "Flag overtime spikes & unusual changes before each run"],
              ["drafts", "AI-drafted performance reviews", "Generate first drafts from cycle data & peer feedback"],
              ["parsing", "Document parsing", "Auto-extract fields from offers, tax forms & invoices"],
              ["chatbot", "AI support chatbot (beta)", "Let employees ask Trulu HR questions directly"]].map(([k, t, d]) =>
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 650, fontSize: 14 }}>{t}</div><div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>{d}</div></div>
                    <button className={"tl-switch" + (ai[k] ? " on" : "")} onClick={() => setAi({ ...ai, [k]: !ai[k] })} aria-label={t} />
                  </div>
              )}
              </div>
            </section>}

          {tab === "integrations" &&
          <section className="card" style={{ padding: 24 }}>
              <SectionHead title="Integrations" sub="Connect Trulu to your stack" icon="link" />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {integrations.map(([n, d, on]) =>
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, border: "1px solid var(--border)", borderRadius: "var(--r-md)" }}>
                    <span style={{ width: 38, height: 38, borderRadius: 10, background: "var(--surface-2)", display: "grid", placeItems: "center", fontWeight: 700, color: "var(--text-2)" }}>{n[0]}</span>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{n}</div><div style={{ fontSize: 12.5, color: "var(--text-3)" }}>{d}</div></div>
                    {on ? <Badge tone="ok"><Icon name="check" size={12} sw={2.4} /> Connected</Badge> : <button className="btn btn-ghost" style={{ padding: "7px 14px", fontSize: 13 }}>Connect</button>}
                  </div>
              )}
              </div>
            </section>}
        </div>
      </div>
    </>);

}

/* ============ register + render ============ */
window.TruluScreens = {
  payroll: PayrollScreen,
  people: PeopleScreen,
  time: TimeScreen,
  onboarding: OnboardingScreen,
  performance: PerformanceScreen,
  documents: DocumentsScreen,
  reports: ReportsScreen,
  settings: SettingsScreen
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
