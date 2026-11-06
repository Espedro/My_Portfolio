import { Link, useLocation } from "react-router-dom";
import { Img } from "./components.jsx";
import { caseStudies } from "./pages.js";

// Shared case-study template (from CaseStudy-ai-bos-crm.dc.html).
// Every case study page passes a plain data object; sections with no data are skipped.
//
// study = {
//   discipline, summary,
//   meta: [{ label, value }],                 // Role / Scope / Stack (Status is added automatically)
//   cover: { src, alt, caption },
//   glance: [{ label, title, text }],         // Problem / Key decision / Outcome
//   did: [string],
//   challenge: { lead, body: [string] },
//   keyDecision: string,
//   approach: [{ lead, text }],
//   extra: [{ title, intro?, items: [{ lead?, text }] }],
//   structure: { intro, steps: [{ title, text }] },  // last step is highlighted
//   decisions: [{ title, text, image?: { src, alt } }],
//   gallery: [{ src, alt, caption }],
//   built: [string],
//   visual: { lead, body: [string] },
//   outcome: { lead, items: [string] },
// }

function Split({ id, title, children, className = "" }) {
  return <section className={`cs-band-rule ${className}`} aria-labelledby={id}>
    <div className="wrap cs-split">
      <h2 id={id} className="cs-h2">{title}</h2>
      <div className="cs-split-main">{children}</div>
    </div>
  </section>;
}

function List({ items }) {
  return <ul className="cs-list">
    {items.map(item => typeof item === "string"
      ? <li key={item}>{item}</li>
      : <li key={item.text}>{item.lead && <><strong>{item.lead}</strong>{" "}</>}{item.text}</li>)}
  </ul>;
}

export default function CaseStudy({ study }) {
  const { pathname } = useLocation();
  const index = caseStudies.findIndex(item => item.path === pathname);
  const page = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const id = page.slug;

  return <main id="main" className="cs">

    <section className="wrap cs-hero" aria-labelledby={`${id}-title`}>
      <Link className="cs-back" to="/#work">← All work</Link>
      <p className="cs-eyebrow">Case study · {study.discipline}</p>
      <h1 id={`${id}-title`} className="cs-title">{page.name}</h1>
      <p className="cs-summary">{study.summary}</p>
      <dl className="cs-meta">
        {study.meta.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        <div className="cs-meta-status"><dt>Status</dt><dd><a href={page.liveUrl} target="_blank" rel="noreferrer">Live product ↗</a></dd></div>
      </dl>
    </section>

    <section className="cs-cover-wrap" aria-label="Product screenshot">
      <figure className="cs-cover">
        <Img priority src={study.cover.src} alt={study.cover.alt} />
        <figcaption>{study.cover.caption}</figcaption>
      </figure>
    </section>

    <section className="wrap cs-glance" aria-labelledby={`${id}-glance`}>
      <h2 id={`${id}-glance`} className="sr-only">At a glance</h2>
      <div className="cs-glance-grid">
        {study.glance.map(item => <div key={item.label}>
          <p className="cs-label">{item.label}</p>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>)}
      </div>
    </section>

    <Split id={`${id}-did`} title="What I did"><List items={study.did} /></Split>

    <Split id={`${id}-challenge`} title="The challenge">
      <div className="cs-prose">
        <p className="cs-lead">{study.challenge.lead}</p>
        {study.challenge.body.map(text => <p key={text}>{text}</p>)}
      </div>
    </Split>

    <section className="cs-decision-band" aria-label="Key decision">
      <div className="wrap">
        <p className="cs-band-label">The decision that shaped everything</p>
        <p className="cs-band-quote">{study.keyDecision}</p>
      </div>
    </section>

    <section className="cs-band-flush" aria-labelledby={`${id}-approach`}>
      <div className="wrap cs-split">
        <h2 id={`${id}-approach`} className="cs-h2">Approach</h2>
        <div className="cs-split-main"><List items={study.approach} /></div>
      </div>
    </section>

    {(study.extra || []).map((section, i) => <Split key={section.title} id={`${id}-extra-${i}`} title={section.title}>
      {section.intro && <p className="cs-intro">{section.intro}</p>}
      <List items={section.items} />
    </Split>)}

    <section className="cs-band-rule" aria-labelledby={`${id}-structure`}>
      <div className="wrap cs-section">
        <div className="cs-structure-head">
          <h2 id={`${id}-structure`} className="cs-h2">Product structure</h2>
          <p>{study.structure.intro}</p>
        </div>
        <ol className="cs-steps">
          {study.structure.steps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}
        </ol>
      </div>
    </section>

    <section className="cs-band-rule" aria-labelledby={`${id}-decisions`}>
      <div className="wrap cs-section">
        <h2 id={`${id}-decisions`} className="cs-h2 cs-h2-spaced">Design decisions</h2>
        <div className={study.decisions.filter(item => !item.image).length === 4 ? "cs-decisions cs-decisions-pairs" : "cs-decisions"}>
          {study.decisions.map(item => <div key={item.title} className={item.image ? "cs-decision has-image" : "cs-decision"}>
            <div className="cs-decision-copy">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            {item.image && <figure className="cs-decision-shot"><Img src={item.image.src} alt={item.image.alt} /></figure>}
          </div>)}
        </div>
        {(study.gallery || []).map(shot => <figure key={shot.src} className="cs-gallery">
          <Img src={shot.src} alt={shot.alt} />
          <figcaption>{shot.caption}</figcaption>
        </figure>)}
      </div>
    </section>

    <Split id={`${id}-built`} title="How it's built"><List items={study.built} /></Split>

    <Split id={`${id}-visual`} title="Visual system">
      <div className="cs-prose">
        <p className="cs-lead">{study.visual.lead}</p>
        {study.visual.body.map(text => <p key={text}>{text}</p>)}
      </div>
    </Split>

    <section className="cs-outcome" aria-labelledby={`${id}-outcome`}>
      <div className="wrap cs-split">
        <h2 id={`${id}-outcome`} className="cs-h2">Outcome</h2>
        <div className="cs-split-main">
          <p className="cs-lead cs-lead-spaced">{study.outcome.lead}</p>
          <List items={study.outcome.items} />
          <p className="cs-live"><a href={page.liveUrl} target="_blank" rel="noreferrer">Visit the live product ↗</a></p>
        </div>
      </div>
    </section>

    <nav className="cs-next" aria-label="More case studies">
      <div className="wrap cs-next-inner">
        <Link className="cs-back" to="/#work">← All case studies</Link>
        <Link className="cs-next-link" to={next.path}>
          <span className="cs-next-label">Next case study</span>
          <span className="cs-next-name">{next.name} →</span>
        </Link>
      </div>
    </nav>

  </main>;
}
