import { Link } from "react-router-dom";
import { profile } from "./pages.js";

// Web version of the resume. Content comes from public/assets/Espedro-Neptune-Resume.pdf (2026-11-09 version).
// When the resume changes, update this object AND replace the PDF.
// Deliberate differences from the PDF: location is "USA, FL", no phone number, GitHub added.
const resume = {
  title: "AI Engineer · UX Engineer · Product Designer",
  summary: "Product Designer and UX Engineer with a strong background in building and shipping digital products, now expanding into AI engineering. Develops LLM-powered solutions end to end, including knowledge-grounded assistants, a self-hosted AI agent integrated with Gmail, Calendar, and Docs through MCP with human approval for write actions, and multilingual platforms supporting Haitian Creole, French, and English. Currently pursuing AI Engineering training at 4Geeks Academy.",
  skills: [
    ["AI & LLM", "Claude & OpenAI APIs, prompt and system design, tool calling, MCP integrations, LiteLLM, OpenRouter, self-hosted agents (OpenClaw), knowledge-grounded assistants, conversational UX"],
    ["AI · in training", "Python, RAG, vector databases, FastAPI, multi-agent workflows, guardrails, n8n, WebSockets, Docker, testing, LLM app security (OWASP)"],
    ["Engineering", "JavaScript, React, Node.js, Express, Vite, Tailwind CSS, Supabase (PostgreSQL, Auth, RLS, Edge Functions, pg_cron), REST APIs, Stripe, WordPress, Linux VPS / SSH"],
    ["Product & UX", "User research, usability testing, information architecture, prototyping, design systems & tokens, WCAG accessibility, multilingual UX, Figma, Adobe CC"],
  ],
  work: [
    {
      name: "Dessalines", kind: "Self-hosted AI agent", stack: "OpenClaw · LiteLLM · MCP · Telegram",
      points: [
        "Deployed a personal AI agent on a Linux VPS, connected through MCP to Gmail, Google Calendar and Docs, and reachable from Telegram.",
        "Designed human-in-the-loop guardrails: the agent asks for confirmation before any write action.",
      ],
    },
    {
      name: "Kominote Konbit", slug: "kominote-konbit", kind: "Community platform with AI assistant", stack: "React · Supabase · Lovable",
      points: ["Built “Konbitèz Odette,” an AI assistant grounded in the Konbit reference guide as its private knowledge base, plus guided onboarding, on the BelieverHub architecture."],
    },
    {
      name: "FootLakay", slug: "footlakay", kind: "World Cup 2026 prediction platform", stack: "React · Tailwind · Supabase · API-Sports",
      points: ["Shipped a four-language platform with live fixtures, automated scoring (Edge Functions, pg_cron), a social Fan Zone, sponsor management and an AI chatbot persona."],
    },
    {
      name: "VotPam", slug: "votpam", kind: "Civic information & opinion polls", stack: "Figma design system · Web app",
      points: ["Designed candidate profiles, a news feed and poll results on a dedicated design system built for the platform."],
    },
    {
      name: "BelieverHub", slug: "believerhub", kind: "Faith-based community platform", stack: "User research → Production",
      points: ["Took the product from user research to production; its architecture became the foundation for Kominote Konbit."],
    },
  ],
  alsoShipped: [
    { name: "AI BOS CRM", slug: "ai-bos-crm" },
    { name: "Agrodoc", slug: "agrodoc" },
    { name: "Maket Lakay", slug: "maket-lakay" },
  ],
  experience: [
    { role: "UX/UI Designer", org: "TransPerfect", when: "Remote · Mar 2025 – Present", points: ["Deliver user research, wireframes, prototypes and visual design for international clients across industries, aligned to client goals and timelines."] },
    { role: "UX/UI Engineer", org: "Bloxide", when: "Oct 2024 – Mar 2025", points: ["Designed in Figma and built responsive React interfaces; implemented a design system that kept UI and behavior consistent across devices."] },
    { role: "UX/UI Designer", org: "CoinKids", when: "Apr 2023 – Apr 2024", points: ["Increased user retention by finding pain points through research and personas and iterating on direct feedback; applied accessibility best practices for a broader audience."] },
    { role: "UX/UI Designer", org: "Freelance", when: "Aug 2021 – Nov 2022", points: [
      "Raised overall user satisfaction 15% through interactive prototypes and UI refinement across multiple client projects.",
      "Introduced Figma libraries and design tokens that streamlined workflows with cross-functional teams.",
    ] },
    { role: "Senior Graphic & Web Designer", org: "Media Innovation", when: "Mar 2012 – Mar 2021", points: ["Designed and maintained client WordPress sites from wireframe to launch, and built brand identities with marketing teams over nine years."] },
  ],
  education: [
    ["AI Engineering", "4Geeks Academy (in progress)"],
    ["Artificial Intelligence Certification", "BrainStation"],
    ["UX/UI Design · Web Development", "Ironhack"],
    ["Electronic Design", "CFP d'Haïti"],
  ],
  languages: "English, French, Haitian Creole",
};

const caseLink = slug => `/case-studies/${slug}.html`;

function Section({ id, title, children }) {
  return <section className="cs-band-rule" aria-labelledby={id}>
    <div className="wrap cs-split">
      <h2 id={id} className="cs-h2">{title}</h2>
      <div className="cs-split-main">{children}</div>
    </div>
  </section>;
}

function Points({ items }) {
  return <ul className="resume-points">{items.map(text => <li key={text}>{text}</li>)}</ul>;
}

export default function Resume() {
  return <main id="main" className="cs resume">
    <section className="wrap cs-hero resume-hero" aria-labelledby="resume-title">
      <p className="cs-eyebrow">Resume</p>
      <h1 id="resume-title" className="cs-title">{profile.name}</h1>
      <p className="cs-summary">{resume.title}</p>
      <ul className="resume-contact">
        <li>{profile.location}</li>
        <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
        <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
      </ul>
      <div className="home-actions resume-actions">
        <a className="btn-ink" href={profile.resume} download="Espedro-Neptune-Resume.pdf">Download PDF</a>
        <a className="strong-link" href={profile.calendly} target="_blank" rel="noreferrer">Book a 30-minute call</a>
      </div>
    </section>

    <Section id="resume-summary" title="Summary">
      <p className="cs-lead">{resume.summary}</p>
    </Section>

    <Section id="resume-skills" title="Skills">
      <dl className="resume-skills">
        {resume.skills.map(([group, text]) => <div key={group}><dt>{group}</dt><dd>{text}</dd></div>)}
      </dl>
    </Section>

    <Section id="resume-work" title="Selected AI & product work">
      <ol className="resume-entries">
        {resume.work.map(item => <li key={item.name}>
          <h3>{item.slug ? <Link to={caseLink(item.slug)}>{item.name}</Link> : item.name} — {item.kind}</h3>
          <p className="resume-when">{item.stack}</p>
          <Points items={item.points} />
        </li>)}
      </ol>
      <p className="resume-more">
        <strong>Also shipped:</strong>{" "}
        {resume.alsoShipped.map((item, i) => <span key={item.slug}>{i > 0 && " · "}<Link to={caseLink(item.slug)}>{item.name}</Link></span>)}
      </p>
      <p className="resume-more"><Link to="/#work">See all 8 case studies →</Link></p>
    </Section>

    <Section id="resume-experience" title="Experience">
      <ol className="resume-entries">
        {resume.experience.map(job => <li key={job.org}>
          <h3>{job.role}, {job.org}</h3>
          <p className="resume-when">{job.when}</p>
          <Points items={job.points} />
        </li>)}
      </ol>
    </Section>

    <Section id="resume-education" title="Education & certifications">
      <ul className="cs-list">{resume.education.map(([what, where]) => <li key={what}><strong>{what}</strong>, {where}</li>)}</ul>
      <p className="resume-more"><strong>Languages:</strong> {resume.languages}</p>
    </Section>
  </main>;
}
