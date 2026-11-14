import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Img, useReducedMotion } from "./components.jsx";
import Laptop3D from "./home/Laptop3D.jsx";
import { Arrow, DESKTOP, setHeaderState, useMedia } from "./home/ui.jsx";
import { caseStudies, profile } from "./pages.js";
import "./case-study.css";

// Shared case-study template (from the owner's CaseStudy-AIBOS.dc.html).
// Every page in src/pages/ passes a plain data object; chapters with no data are skipped,
// and optional fields only render when present (no placeholders ever reach the site).
//
// study = {
//   discipline, summary,
//   meta: [{ label, value }],                       // Role / Scope / Stack (Status is added automatically)
//   cover: { src, alt },                            // shown on the hero laptop
//   glance: [{ label, title, text }],               // the "Key decision" card is drawn in the project color
//   did: [string],
//   challenge: { lead, body: [string] },
//   keyDecision: string,
//   approachTitle?, approach: [{ lead, text }],
//   extra?: [{ title, intro?, items: [{ lead?, text }] }],
//   structure: { intro, steps: [{ title, text }], figure?: { src, alt, caption } },
//   decisionsTitle?, decisionsShot?: { src, alt, pins: [{ x, y }] },
//   decisions: [{ title, instead?, text, image?: { src, alt } }],
//   gallery?: [{ src, alt, caption }],
//   aiBehavior?: { title?, flow: [{ title, sub, ai? }], states: [{ label, color }], note },
//   aiArchitecture?: { title?, flow: [{ title, sub?, ai? }], specs: [{ label, value }], evals?: [{ label, value, note? }], evalNote? },
//   buildChips?: [string], built: [string],
//   visual: { lead, body: [string], image?: { src, alt }, swatches?: [{ name, hex, ink }] },
//   outcomeTitle?, outcome: { lead, items: [string] },
//   learned?: [string],
// }

const pad = n => String(n).padStart(2, "0");
const noDot = text => String(text).trim().replace(/[.]$/, "");

// Break before the last word ("AI BOS / CRM", as in the prototype). The title then wraps the same way
// with the fallback font and with Archivo, so nothing below it shifts when the web font loads.
function TitleLines({ name }) {
  const cut = name.lastIndexOf(" ");
  if (cut < 0) return name;
  return <>{name.slice(0, cut)}<br />{name.slice(cut + 1)}</>;
}

function Dot() {
  return <span className="cs2-dot">.</span>;
}

function Statement({ text }) {
  return text ? <p className="cs2-statement reveal">{noDot(text)}<Dot /></p> : null;
}

function Chapter({ id, num, label, children }) {
  return <section id={id} className="cs2-chapter" aria-labelledby={`${id}-h`}>
    <h2 id={`${id}-h`} className="cs2-label reveal" tabIndex={-1}>{num} / {label}</h2>
    {children}
  </section>;
}

function Figure({ shot, className = "" }) {
  return <figure className={`cs2-figure reveal ${className}`}>
    <div className="cs2-frame"><Img src={shot.src} alt={shot.alt} /></div>
    {shot.caption && <figcaption>{shot.caption}</figcaption>}
  </figure>;
}

// ---------------------------------------------------------------------------
// Chapters
// ---------------------------------------------------------------------------
function Glance({ study }) {
  const keyIndex = Math.max(0, study.glance.findIndex(g => /decision/i.test(g.label)));
  return <>
    <div className="cs2-cards3">
      {study.glance.map((g, i) => <div key={g.label} className={`cs2-card reveal ${i === keyIndex ? "is-proj" : ""}`}>
        <p className="cs2-small">{g.label}</p>
        <p className="cs2-card-title">{g.title}</p>
        <p className="cs2-card-text">{g.text}</p>
      </div>)}
    </div>
    {study.did?.length > 0 && <div className="cs2-did reveal">
      <h3>What I did</h3>
      <ul className="cs2-list2">{study.did.map(item => <li key={item}>{item}</li>)}</ul>
    </div>}
  </>;
}

function Challenge({ study }) {
  return <>
    <p className="cs2-lead reveal">{study.challenge.lead}</p>
    {study.challenge.body?.map(text => <p key={text} className="cs2-text reveal">{text}</p>)}
    {study.keyDecision && <blockquote className="cs2-quote reveal">
      <p className="cs2-small cs2-acc">The decision that shaped everything</p>
      <p className="cs2-quote-text">{noDot(study.keyDecision)}<Dot /></p>
    </blockquote>}
  </>;
}

function Approach({ study }) {
  return <>
    <Statement text={study.approachTitle} />
    <div className="cs2-grid2">
      {study.approach.map(item => <div key={item.text} className="cs2-principle reveal">
        {item.lead && <h3>{noDot(item.lead)}</h3>}
        <p>{item.text}</p>
      </div>)}
    </div>
  </>;
}

function Extra({ section }) {
  return <>
    {section.intro && <p className="cs2-lead reveal">{section.intro}</p>}
    <ul className="cs2-rows reveal">
      {section.items.map(item => <li key={item.text}>{item.lead && <strong>{item.lead} </strong>}{item.text}</li>)}
    </ul>
  </>;
}

function Structure({ study }) {
  const steps = study.structure.steps;
  return <>
    <Statement text={study.structure.intro} />
    <ol className="cs2-steps reveal" style={{ "--n": steps.length }}>
      {steps.map((step, i) => <li key={step.title} className={i === steps.length - 1 ? "is-proj" : ""}>
        <span className="cs2-step-num">{pad(i + 1)}</span>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </li>)}
    </ol>
    {study.structure.figure && <Figure shot={study.structure.figure} />}
  </>;
}

function Decisions({ study }) {
  const shot = study.decisionsShot;
  return <>
    <Statement text={study.decisionsTitle} />
    {shot && <figure className="cs2-figure cs2-annotated reveal">
      <div className="cs2-frame">
        <Img src={shot.src} alt={shot.alt} />
        {shot.pins?.map((pin, i) => <span key={i} className="cs2-pin" aria-hidden="true" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>{i + 1}</span>)}
      </div>
      {shot.caption && <figcaption>{shot.caption}</figcaption>}
    </figure>}
    <ol className="cs2-decisions">
      {study.decisions.map((d, i) => <li key={d.title} className="reveal">
        <span className="cs2-num-badge" aria-hidden="true">{i + 1}</span>
        <div className="cs2-decision-head">
          <h3>{d.title}</h3>
          {d.instead && <p className="cs2-instead">Instead of: {d.instead}</p>}
        </div>
        <p className="cs2-decision-text">{d.text}</p>
        {d.image && <div className="cs2-decision-shot cs2-frame"><Img src={d.image.src} alt={d.image.alt} /></div>}
      </li>)}
    </ol>
    {study.gallery?.map(shot => <Figure key={shot.src} shot={shot} />)}
  </>;
}

function AiBehavior({ study }) {
  const ai = study.aiBehavior;
  return <>
    <Statement text={ai.title} />
    <div className="cs2-flowbox reveal">
      <ol className="cs2-flow" style={{ "--n": ai.flow.length }}>
        {ai.flow.map(node => <li key={node.title} className={node.ai ? "is-ai" : ""}>
          <span className="cs2-flow-title">{node.title}</span>
          <span className="cs2-flow-sub">{node.sub}</span>
        </li>)}
      </ol>
      <ul className="cs2-states">
        {ai.states.map(state => <li key={state.label}><span aria-hidden="true" style={{ color: state.color }}>●</span> {state.label}</li>)}
      </ul>
      {ai.note && <p className="cs2-flow-note">{ai.note}</p>}
    </div>
  </>;
}

// Technical view of an AI feature, for AI Engineer readers. Every value comes from the owner.
// aiArchitecture = { title?, flow: [{ title, sub, ai? }], specs: [{ label, value }], evals?: [{ label, value, note? }], evalNote? }
function AiArchitecture({ study }) {
  const a = study.aiArchitecture;
  return <>
    <Statement text={a.title} />
    {a.flow?.length > 0 && <div className="cs2-flowbox reveal">
      <ol className="cs2-flow" style={{ "--n": a.flow.length }}>
        {a.flow.map(node => <li key={node.title} className={node.ai ? "is-ai" : ""}>
          <span className="cs2-flow-title">{node.title}</span>
          {node.sub && <span className="cs2-flow-sub">{node.sub}</span>}
        </li>)}
      </ol>
    </div>}
    {a.specs?.length > 0 && <dl className="cs2-specs reveal">
      {a.specs.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
    </dl>}
    {a.evals?.length > 0 && <div className="cs2-evals reveal">
      <h3>Evaluation</h3>
      <ul>{a.evals.map(e => <li key={e.label}><span className="cs2-eval-value">{e.value}</span><span className="cs2-eval-label">{e.label}</span>{e.note && <span className="cs2-eval-note">{e.note}</span>}</li>)}</ul>
      {a.evalNote && <p className="cs2-flow-note">{a.evalNote}</p>}
    </div>}
  </>;
}

function Built({ study }) {
  const stack = study.meta.find(m => /stack/i.test(m.label))?.value.split(/,\s*/) || [];
  return <>
    {(stack.length > 0 || study.buildChips) && <ul className="cs2-chips reveal">
      {stack.map(item => <li key={item}>{item}</li>)}
      {study.buildChips?.map(item => <li key={item} className="is-acc">{item}</li>)}
    </ul>}
    <ul className="cs2-rows reveal">{study.built.map(item => <li key={item}>{item}</li>)}</ul>
  </>;
}

function Visual({ study }) {
  const v = study.visual;
  return <>
    <p className="cs2-lead reveal">{v.lead}</p>
    {v.body?.map(text => <p key={text} className="cs2-text reveal">{text}</p>)}
    {(v.image || v.swatches) && <div className={`cs2-visual reveal ${v.image && v.swatches ? "has-both" : ""}`}>
      {v.image && <div className="cs2-frame"><Img src={v.image.src} alt={v.image.alt} /></div>}
      {v.swatches && <ul className="cs2-swatches">
        {v.swatches.map(s => <li key={s.name} style={{ background: s.hex, color: s.ink }}>
          <b>{s.name}</b><span>{s.hex}{s.approx ? " · approx." : ""}</span>
        </li>)}
      </ul>}
    </div>}
  </>;
}

function Outcome({ study, page }) {
  return <>
    <Statement text={study.outcomeTitle} />
    {study.outcome.lead && !study.outcomeTitle && <p className="cs2-lead reveal">{study.outcome.lead}</p>}
    <ul className="cs2-cols3">{study.outcome.items.map(item => <li key={item} className="reveal">{item}</li>)}</ul>
    {(page.liveUrl || page.repoUrl) && <p className="cs2-live reveal">
      {page.liveUrl && <a href={page.liveUrl} target="_blank" rel="noreferrer">Visit the live product<span className="sr-only"> (opens in a new tab)</span> <Arrow /></a>}
      {page.repoUrl && <a href={page.repoUrl} target="_blank" rel="noreferrer">Code on GitHub<span className="sr-only"> (opens in a new tab)</span> <Arrow /></a>}
    </p>}
  </>;
}

function Learned({ study }) {
  return <ol className="cs2-learned reveal">
    {study.learned.map((item, i) => <li key={item}><span>{pad(i + 1)}</span>{item}</li>)}
  </ol>;
}

function buildChapters(study, page) {
  const list = [
    ["glance", "At a glance", study.glance && <Glance study={study} />],
    ["challenge", "The challenge", study.challenge && <Challenge study={study} />],
    ["approach", "Approach", study.approach && <Approach study={study} />],
    ...(study.extra || []).map((section, i) => [`extra-${i}`, section.title, <Extra section={section} />]),
    ["structure", "Product structure", study.structure && <Structure study={study} />],
    ["decisions", "Design decisions", study.decisions && <Decisions study={study} />],
    ["ai-behavior", "How the AI behaves", study.aiBehavior && <AiBehavior study={study} />],
    ["ai-architecture", "AI architecture", study.aiArchitecture && <AiArchitecture study={study} />],
    ["built", "How it’s built", study.built && <Built study={study} />],
    ["visual", "Visual system", study.visual && <Visual study={study} />],
    ["outcome", "Outcome", study.outcome && <Outcome study={study} page={page} />],
    ["learned", "What I learned", study.learned?.length && <Learned study={study} />],
  ];
  return list.filter(([, , content]) => content).map(([id, label, content], i) => ({ id, label, content, num: pad(i + 1) }));
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function useViewportSize() {
  const [size, setSize] = useState(() => [window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const on = () => setSize(prev => (prev[0] === window.innerWidth && Math.abs(prev[1] - window.innerHeight) < 120 ? prev : [window.innerWidth, window.innerHeight]));
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return size;
}

function HeroLaptop({ study, heroRef, reduced, desktop }) {
  const [vw, vh] = useViewportSize();
  const scale = desktop ? 0.84 * Math.min(vw / 1440, vh / 900) : Math.min((vw * 0.62) / 680, 0.6);
  // The laptop eases toward the reader as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  // Gentler angle on small screens so the base stays inside the viewport.
  const ry = useTransform(scrollYProgress, p => (reduced ? (desktop ? -18 : -10) : desktop ? -26 + 16 * p : -14 + 8 * p));
  const ty = useTransform(scrollYProgress, p => (reduced ? 0 : 40 * p));
  return <div className="cs2-hero-laptop" role="img" aria-label={study.cover.alt}
    style={desktop ? undefined : { height: 560 * scale }}>
    <div className="cs2-scene">
      <Laptop3D screens={[{ src: study.cover.src, opacity: 1 }]} logoOpacity={0}
        style={desktop
          ? { left: "70%", top: "58%", y: ty, scale, rotateX: -12, rotateY: ry }
          : { left: "50%", top: 430 * scale, y: ty, scale, rotateX: -12, rotateY: ry }} />
    </div>
  </div>;
}

export default function CaseStudy({ study }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const desktop = useMedia(DESKTOP);
  const index = caseStudies.findIndex(item => item.path === pathname);
  const page = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const chapters = buildChapters(study, page);

  const heroRef = useRef(null);
  const mainRef = useRef(null);

  // Header: transparent with light text over the colored hero, glass once the hero has passed.
  const { scrollY, scrollYProgress } = useScroll();
  const syncHeader = () => {
    const hero = heroRef.current;
    const bar = document.querySelector(".topbar");
    if (!hero || !bar) return;
    const over = hero.getBoundingClientRect().bottom > bar.offsetHeight;
    // Once the page moves, the header gets a translucent project-color background so it never sits on bare hero text.
    setHeaderState({ over, glass: !over, tint: over && window.scrollY > 8 ? page.bg : null });
  };
  useMotionValueEvent(scrollY, "change", syncHeader);
  useEffect(() => { syncHeader(); return () => setHeaderState({ over: false, glass: false }); }, [pathname]);

  // Chapter rail: progress line + active chapter (state changes only when the chapter changes).
  const { scrollYProgress: railP } = useScroll({ target: mainRef, offset: ["start 40%", "end 40%"] });
  const [active, setActive] = useState(0);
  useEffect(() => {
    const sections = chapters.map(c => document.getElementById(c.id)).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(sections.indexOf(e.target)); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);
  const goTo = id => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    section.querySelector("h2")?.focus({ preventScroll: true });
  };

  const style = { "--proj": page.bg, "--proj-a": page.accent, "--next": next.bg, "--next-a": next.accent };
  const meta = study.meta || [];

  return <LazyMotion features={domAnimation}>
    <main id="main" className="cs2" style={style}>
      <ReadProgress progress={scrollYProgress} />

      {/* Hero in the project color; the laptop carries the product */}
      <section ref={heroRef} className="cs2-hero" aria-labelledby="cs-title">
        <div className="cs2-hero-glow" aria-hidden="true" />
        <div className="cs2-hero-copy">
          <Link className="cs2-back" to="/#work"><Arrow kind="left" /> All work</Link>
          <p className="cs2-eyebrow"><span className="cs2-hero-acc">{pad(index + 1)}</span> · Case study · {study.discipline}</p>
          <h1 id="cs-title" className="cs2-title"><TitleLines name={page.name} /><span className="cs2-hero-acc">.</span></h1>
          <p className="cs2-summary">{study.summary}</p>
        </div>
        <HeroLaptop study={study} heroRef={heroRef} reduced={reduced} desktop={desktop} />
        <dl className="cs2-meta">
          {meta.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
          {page.liveUrl && <div><dt>Status</dt><dd className="cs2-status"><span className="cs2-live-dot" aria-hidden="true" />
            <a href={page.liveUrl} target="_blank" rel="noreferrer">Live product<span className="sr-only"> (opens in a new tab)</span> ↗</a></dd></div>}
          {!page.liveUrl && page.repoUrl && <div><dt>Code</dt><dd>
            <a href={page.repoUrl} target="_blank" rel="noreferrer">GitHub repo<span className="sr-only"> (opens in a new tab)</span> ↗</a></dd></div>}
        </dl>
      </section>

      {/* Body: sticky chapter rail + reading column */}
      <div className="cs2-body">
        {desktop && <nav className="cs2-rail" aria-label="Chapters">
          <div className="cs2-rail-line" aria-hidden="true"><RailFill progress={railP} /></div>
          <ol>
            {chapters.map((c, i) => <li key={c.id}>
              <button type="button" onClick={() => goTo(c.id)} aria-current={active === i ? "true" : undefined} className={active === i ? "is-active" : ""}>
                <span className="cs2-rail-num">{c.num}</span>{c.label}
              </button>
            </li>)}
          </ol>
        </nav>}
        <div ref={mainRef} className="cs2-main">
          {chapters.map(c => <Chapter key={c.id} id={c.id} num={c.num} label={c.label}>{c.content}</Chapter>)}
        </div>
      </div>

      {/* Next case study: its color slides in on hover */}
      <Link className="cs2-next" to={next.path}>
        <div className="cs2-next-copy">
          <span className="cs2-small">Next case study</span>
          <span className="cs2-next-name">{next.name}<span className="cs2-next-dot">.</span></span>
          <span className="cs2-next-cta">Read the case study <Arrow kind="right" size={16} /></span>
        </div>
        <div className="cs2-next-shot"><Img src={next.image} alt="" /></div>
      </Link>

      <footer className="cs2-foot">
        <Link to="/#work">← All case studies</Link>
        <nav aria-label="Contact and profiles">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <Link to={profile.resumePage}>Resume</Link>
        </nav>
      </footer>
    </main>
  </LazyMotion>;
}

function ReadProgress({ progress }) {
  return <ScaleBar className="cs2-progress" axis="x" progress={progress} />;
}

function RailFill({ progress }) {
  return <ScaleBar className="cs2-rail-fill" axis="y" progress={progress} />;
}

function ScaleBar({ className, axis, progress }) {
  // Imported lazily-styled element: a plain span driven by a MotionValue (no React render per frame).
  const ref = useRef(null);
  useMotionValueEvent(progress, "change", v => {
    if (ref.current) ref.current.style.transform = axis === "x" ? `scaleX(${v})` : `scaleY(${v})`;
  });
  useEffect(() => {
    if (ref.current) ref.current.style.transform = axis === "x" ? `scaleX(${progress.get()})` : `scaleY(${progress.get()})`;
  }, []);
  return <span ref={ref} className={className} aria-hidden="true" />;
}
