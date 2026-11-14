import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMotionValueEvent, useScroll } from "motion/react";
import { caseStudies, profile } from "./pages.js";
import "./resume.css";

// Web version of the resume, laid out from the owner's Resume.dc.html.
// Content comes from public/assets/Espedro-Neptune-Resume.pdf (2026-11-10 version).
// When the resume changes, update this object AND replace the PDF.
// Deliberate differences from the PDF: location is "USA, FL", no phone number, GitHub added.
const resume = {
  title: "AI Engineer · UX Engineer · Product Designer",
  updated: "Updated November 2026",
  summaryLead: "Product Designer and UX Engineer with a strong background in designing, building, and shipping digital products, now expanding into AI engineering",
  summaryRest: "Builds AI-powered applications end to end, including LLM-powered assistants, knowledge-base integrations, RAG-based workflows, and a self-hosted AI agent connected to Gmail, Calendar, and Docs through MCP with human approval for write actions. Experienced in context engineering, database-backed AI applications, and multilingual platforms supporting Haitian Creole, French, and English.",
  snapshot: [
    { value: "8", text: "live products, end to end" },
    { value: "3", text: "AI products in production", accent: true },
    { value: "EN · FR · HT", text: "works in three languages" },
    { value: "Open", text: "full-time and remote roles", live: true },
  ],
  work: [
    { name: "Dessalines", kind: "Self-hosted AI agent", ai: true, color: "#24323f", stack: "OpenClaw · LiteLLM · MCP · Telegram",
      text: "Deployed a personal AI agent on a Linux VPS, connected through MCP to Gmail, Google Calendar and Docs, and reachable from Telegram. Designed human-in-the-loop guardrails: the agent asks for confirmation before any write action." },
    { slug: "ai-bos-crm", kind: "AI CRM with human hand-off", ai: true, stack: "Next.js · TypeScript · Tailwind · shadcn/ui",
      text: "An AI Employee answers WhatsApp, Messenger and Instagram leads, qualifies them, and hands off to a person when judgment is needed. Designed and built solo." },
    { slug: "kominote-konbit", kind: "Community platform with AI assistant", ai: true, stack: "React · Supabase · Lovable",
      text: "Built “Konbitèz Odette,” an AI assistant grounded in the Konbit reference guide as its private knowledge base, plus guided onboarding, on the BelieverHub architecture." },
    { slug: "footlakay", kind: "World Cup 2026 prediction platform", stack: "React · Tailwind · Supabase · API-Sports",
      text: "Shipped a four-language platform with live fixtures, automated scoring (Edge Functions, pg_cron), a social Fan Zone, sponsor management and an AI chatbot persona." },
    { slug: "votpam", kind: "Civic information & opinion polls", stack: "Figma design system · Web app",
      text: "Designed candidate profiles, a news feed and poll results on a dedicated design system built for the platform." },
    { slug: "believerhub", kind: "Faith-based community platform", stack: "User research → Production",
      text: "Took the product from user research to production; its architecture became the foundation for Kominote Konbit." },
  ],
  alsoShipped: ["agrodoc", "maket-lakay", "media-innovation"],
  experience: [
    { role: "UX/UI Designer", org: "TransPerfect · Remote", when: "Mar 2025 – Present", points: ["Deliver user research, wireframes, prototypes and visual design for international clients across industries, aligned to client goals and timelines."] },
    { role: "UX/UI Engineer", org: "Bloxide", when: "Oct 2024 – Mar 2025", points: ["Designed in Figma and built responsive React interfaces; implemented a design system that kept UI and behavior consistent across devices."] },
    { role: "UX/UI Designer", org: "CoinKids", when: "Apr 2023 – Apr 2024", points: ["Increased user retention by finding pain points through research and personas and iterating on direct feedback; applied accessibility best practices for a broader audience."] },
    { role: "UX/UI Designer", org: "Freelance", when: "Aug 2021 – Nov 2022", points: [
      "Raised overall user satisfaction 15% through interactive prototypes and UI refinement across multiple client projects.",
      "Introduced Figma libraries and design tokens that streamlined workflows with cross-functional teams.",
    ] },
    { role: "Senior Graphic & Web Designer", org: "Media Innovation", when: "Mar 2012 – Mar 2021", points: ["Designed and maintained client WordPress sites from wireframe to launch, and built brand identities with marketing teams over nine years."] },
  ],
  skills: [
    { name: "AI & LLM", proof: "Proof: Dessalines (MCP, guardrails), Kominote Konbit (knowledge-grounded assistant)",
      items: ["Claude & OpenAI APIs", "Prompt & system design", "Tool calling", "MCP integrations", "LiteLLM", "OpenRouter", "Self-hosted agents (OpenClaw)", "Knowledge-grounded assistants", "Conversational UX"] },
    { name: "AI · in training", proof: "AI Engineering, 4Geeks Academy", training: true,
      items: ["Python", "RAG", "Vector databases", "FastAPI", "Multi-agent workflows", "Guardrails", "n8n", "WebSockets", "Docker", "Testing", "LLM app security (OWASP)"] },
    { name: "Engineering", proof: "Proof: FootLakay, AI BOS CRM",
      items: ["JavaScript", "React", "Node.js", "Express", "Vite", "Tailwind CSS", "Supabase (PostgreSQL, Auth, RLS, Edge Functions, pg_cron)", "REST APIs", "Stripe", "WordPress", "Linux VPS / SSH"] },
    { name: "Product & UX", proof: "Proof: BelieverHub, VotPam",
      items: ["User research", "Usability testing", "Information architecture", "Prototyping", "Design systems & tokens", "WCAG accessibility", "Multilingual UX", "Figma", "Adobe CC"] },
  ],
  education: [
    { what: "AI Engineering", where: "4Geeks Academy", inProgress: true },
    { what: "Artificial Intelligence Certification", where: "BrainStation" },
    { what: "UX/UI Design · Web Development", where: "Ironhack" },
    { what: "Electronic Design", where: "CFP d’Haïti" },
  ],
  languages: "English, French, Haitian Creole",
};

const study = slug => caseStudies.find(item => item.slug === slug);

function MiniE() {
  return <span className="rs-mini-e" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <span key={i} />)}</span>;
}

function WorkRow({ item }) {
  const page = item.slug ? study(item.slug) : null;
  const name = page ? page.name : item.name;
  const color = page ? page.bg : item.color;
  const body = <>
    <span className="rs-work-badge" style={{ background: color }}><MiniE /></span>
    <span className="rs-work-main">
      <span className="rs-work-title">
        <span className="rs-work-name">{name}</span>
        <span className="rs-work-kind">{item.kind}</span>
        {item.ai && <span className="rs-ai-tag">AI</span>}
      </span>
      <span className="rs-work-stack">{item.stack}</span>
      <span className="rs-work-text">{item.text}</span>
    </span>
    <span className="rs-work-cta" aria-hidden="true">{page ? "Case study →" : "GitHub ↗"}</span>
  </>;
  return <li className="reveal">
    {page
      ? <Link className="rs-work" to={page.path}>{body}</Link>
      : <a className="rs-work" href={profile.github} target="_blank" rel="noreferrer">{body}<span className="sr-only"> (GitHub, opens in a new tab)</span></a>}
  </li>;
}

function Experience() {
  const ref = useRef(null);
  const fillRef = useRef(null);
  const [reached, setReached] = useState(0);
  // The timeline draws as you read; each dot fills when the line reaches it (state changes at most 5 times).
  // The filled state is a data attribute, not a class: React must not overwrite the reveal classes set by main.jsx.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  useMotionValueEvent(scrollYProgress, "change", p => {
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    const next = resume.experience.filter((_, i) => p * resume.experience.length > i + 0.15).length;
    setReached(prev => (prev === next ? prev : next));
  });
  return <section ref={ref} className="rs-section" aria-labelledby="rs-exp">
    <h2 id="rs-exp" className="rs-label reveal">Experience</h2>
    <div className="rs-timeline">
      <div className="rs-timeline-line" aria-hidden="true"><span ref={fillRef} /></div>
      <ol>
        {resume.experience.map((job, i) => <li key={job.org} className="reveal" data-on={i < reached || undefined}>
          <span className="rs-dot" aria-hidden="true" />
          <div className="rs-job-head">
            <h3>{job.role}</h3>
            <span className="rs-org">{job.org}</span>
          </div>
          <span className="rs-when">{job.when}</span>
          <ul className="rs-points">{job.points.map(text => <li key={text}>{text}</li>)}</ul>
        </li>)}
      </ol>
    </div>
  </section>;
}

export default function Resume() {
  return <main id="main" className="rs">
    <section className="rs-top" aria-labelledby="resume-title">
      <div className="rs-top-row"><span>Resume</span><span>{resume.updated}</span></div>
      <h1 id="resume-title" className="rs-name">{profile.name}<span className="rs-dot-acc">.</span></h1>
      <p className="rs-title">{resume.title}</p>
      <ul className="rs-snapshot" aria-label="Snapshot">
        {resume.snapshot.map(item => <li key={item.text}>
          <span className={`rs-snap-value ${item.accent ? "is-accent" : ""}`}>{item.value}{item.live && <span className="rs-live" aria-hidden="true" />}</span>
          <span className="rs-snap-text">{item.text}</span>
        </li>)}
      </ul>
    </section>

    <div className="rs-body">
      {/* Sidebar: everything a recruiter needs to act */}
      <aside className="rs-side" aria-label="Contact and education">
        <div className="rs-actions">
          <a className="rs-btn is-primary" href={profile.resume} download="Espedro-Neptune-Resume.pdf">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 2v9M4 7l4 4 4-4M2 14h12" /></svg>
            Download PDF
          </a>
          <a className="rs-btn" href={profile.calendly} target="_blank" rel="noreferrer">Book a 30-minute call<span className="sr-only"> (opens in a new tab)</span></a>
        </div>
        <dl className="rs-facts">
          <div><dt>Location</dt><dd>{profile.location} · remote</dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
          <div><dt>Profiles</dt><dd className="rs-profiles">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </dd></div>
          <div><dt>Languages</dt><dd>{resume.languages}</dd></div>
        </dl>
        <div className="rs-edu">
          <h2 className="rs-label">Education & certifications</h2>
          <ul>
            {resume.education.map(item => <li key={item.what}>
              <strong>{item.what}</strong>, {item.where}
              {item.inProgress && <span className="rs-progress-tag">In progress</span>}
            </li>)}
          </ul>
        </div>
      </aside>

      <div className="rs-main">
        <section className="rs-section" aria-labelledby="rs-sum">
          <h2 id="rs-sum" className="rs-label reveal">Summary</h2>
          <p className="rs-summary reveal">{resume.summaryLead}<span className="rs-dot-acc">.</span> <span className="rs-summary-rest">{resume.summaryRest}</span></p>
        </section>

        <section className="rs-section" aria-labelledby="rs-work">
          <div className="rs-section-head reveal">
            <h2 id="rs-work" className="rs-label">Selected AI & product work</h2>
            <Link to="/#work">All 8 case studies →</Link>
          </div>
          <ul className="rs-work-list">{resume.work.map(item => <WorkRow key={item.slug || item.name} item={item} />)}</ul>
          <p className="rs-also reveal">Also shipped:{" "}
            {resume.alsoShipped.map((slug, i) => <span key={slug}>{i > 0 && " · "}<Link to={study(slug).path}>{study(slug).name}</Link></span>)}
          </p>
        </section>

        <Experience />

        <section className="rs-section" aria-labelledby="rs-skills">
          <div className="rs-section-head reveal">
            <h2 id="rs-skills" className="rs-label">Skills</h2>
            <span className="rs-legend">
              <span><i className="rs-legend-solid" aria-hidden="true" />In production</span>
              <span><i className="rs-legend-dashed" aria-hidden="true" />In training</span>
            </span>
          </div>
          {resume.skills.map(group => <div key={group.name} className="rs-skill reveal">
            <div className="rs-skill-head">
              <h3>{group.name}</h3>
              <p>{group.proof}</p>
            </div>
            <ul className={`rs-chips ${group.training ? "is-training" : ""}`}>
              {group.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>)}
        </section>
      </div>
    </div>
  </main>;
}
