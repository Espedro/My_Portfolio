import { Link } from "react-router-dom";
import { Img } from "../components.jsx";
import { caseStudies, profile } from "../pages.js";

// Card copy per case study. Order, links and screenshots come from caseStudies in pages.js.
const cards = {
  "ai-bos-crm": {
    discipline: "AI product design · Human-in-the-loop · Front-end build",
    summary: "A CRM where an AI Employee answers WhatsApp, Messenger and Instagram leads, and hands off to a person when judgment is needed. Designed and built solo.",
    alt: "AI BOS CRM landing page with the live dashboard preview",
  },
  "kominote-konbit": {
    discipline: "AI assistant · Community platform · Product design & build",
    summary: "A digital home for Konbit members to connect, organize their local cell and learn, with Konbitèz Odette, an AI assistant that cites its sources and says when an answer isn't in the official documents.",
  },
  votpam: {
    discipline: "Civic tech · Trust design · Next.js build",
    summary: "A non-partisan civic information and opinion-poll platform for Haiti's 2027 elections: 4,037 candidates, sourced civic documents, and polls designed so nobody mistakes them for a vote.",
  },
  agrodoc: {
    discipline: "Health tech · Offline-first PWA · UX engineering",
    summary: "A clinic medical record for Haiti that keeps working without internet, syncs when the network returns, encrypts data on every device and follows the patient from triage to prescription.",
  },
  believerhub: {
    discipline: "0-to-1 strategy · Design system · AI guardrails",
    summary: "A live fellowship PWA built around prayer accountability and small groups, with design tokens, EN/FR structure and an AI Bible assistant that cites verses and defers to pastors.",
    alt: "BelieverHub landing page at believerhub.org",
  },
  footlakay: {
    discipline: "UX engineering · Localization · Full-stack build",
    summary: "A World Cup prediction and fan platform for the Haitian diaspora, with full parity across four languages, automated grading and API keys kept server-side.",
    alt: "FootLakay homepage with World Cup 2026 hero, language selector and countdown",
  },
  "maket-lakay": {
    discipline: "Marketplace UX · Trust design · Front-end build",
    summary: "A multi-vendor marketplace connecting Haitian businesses, local shoppers and the diaspora through verified vendors and diaspora care packages.",
    alt: "Maket Lakay marketplace homepage with category browsing and trending picks",
  },
  "media-innovation": {
    discipline: "Brand system · UX/UI design · React SPA",
    summary: "A five-page React site for a creative-technology agency, turning six services and an AI offering into one clear story, with a blog that updates itself.",
    alt: "Media Innovation agency homepage hero",
  },
};

const disciplines = [
  {
    title: "UX design",
    text: "I turn user problems, competitive gaps and stakeholder goals into information architecture, flows and interface decisions with visible rationale.",
    link: "/case-studies/believerhub.html",
    proof: "BelieverHub: from competitive mapping to a fellowship-first IA",
  },
  {
    title: "UX engineering",
    text: "I design with states, edge cases, accessibility, localization and responsive behavior in mind, then ship it in React, TypeScript and Tailwind.",
    link: "/case-studies/footlakay.html",
    proof: "FootLakay: four-language parity, row-level security, Edge Functions",
  },
  {
    title: "AI product building",
    text: "I decide where AI acts on its own and where a person must decide, make that behavior visible in the interface, and use AI to get from idea to live product faster.",
    link: "/case-studies/ai-bos-crm.html",
    proof: "AI BOS CRM: an AI Employee with human hand-off",
  },
];

const aiPractices = [
  ["A person in the loop, on purpose", "AI BOS CRM's AI Employee handles repetitive conversations and hands off to a person when a lead needs judgment. That limit is what keeps the product trustworthy."],
  ["Guardrails are UX requirements", "Kominote Konbit's assistant, Konbitèz Odette, shows where every answer comes from and says plainly when something isn't in the official documents. BelieverHub's Bible assistant must cite real verses and defer to pastors."],
  ["Show what the AI is doing", "Connected channels, response time, automation health and hand-off status stay visible, so people can check the AI instead of trusting a black box."],
  ["AI in my own workflow", "I use Claude, ChatGPT and Lovable for architecture, code and debugging, with knowledge files and phased prompts that keep the output consistent."],
];

const tools = [
  ["Design & research", "Figma, prototyping, user research, usability testing, information architecture, Adobe XD, Photoshop, Illustrator"],
  ["Front end", "React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, shadcn/ui"],
  ["AI product building", "Claude, ChatGPT, Lovable, prompt design, agentic workflows, human-in-the-loop, AI guardrails"],
  ["Back end & platforms", "Supabase, Edge Functions, row-level security, Vercel, WordPress, Shopify, WooCommerce"],
  ["Practice", "Design systems and tokens, accessibility (WCAG AA), localization, responsive UI, interaction states, developer handoff"],
];

const process = [
  ["Understand", "Audience, business goal, user need, technical limits and what success looks like, before any screen."],
  ["Structure", "Flows, content priority, interaction patterns and edge cases, so the experience has a solid frame."],
  ["Design", "Consistent components, accessible patterns, clear states and, for AI features, explicit hand-off rules."],
  ["Build & measure", "Ship responsive front ends with care for performance, then watch the signals that show it works."],
];

export default function Home() {
  return (<main id="main" className="home">

<section className="home-hero wrap" id="top" aria-labelledby="hero-title">
<p className="home-kicker">USA, FL · Open to full-time and remote roles</p>
<h1 id="hero-title" className="home-h1">Understand the problem.<br />Design the solution.<br />Build it.</h1>
<p className="home-roles">
<span className="sr-only">UX Engineer, Product Designer and AI Product Builder</span>
<span className="roles" aria-hidden="true"><span>UX Engineer</span><span>Product Designer</span><span>AI Product Builder</span></span>
<span className="roles-static" aria-hidden="true">UX Engineer · Product Designer · AI Product Builder</span>
</p>
<div className="home-intro">
<p className="home-lede">Every project starts with people: who they are, what they need to get done, and where they get stuck today. I turn that understanding into flows, interfaces and shipped React code, using AI both inside the products I make and in the way I make them.</p>
<div className="home-actions">
<Link className="btn-ink" to="/#work">See the work</Link>
<a className="strong-link" href={profile.calendly} target="_blank" rel="noreferrer">Book a 30-minute call</a>
<a className="strong-link" href={profile.resume} target="_blank" rel="noreferrer">Download résumé</a>
</div>
</div>
</section>

<section className="wrap home-glance" aria-label="At a glance">
<dl>
<div><dt>8 live</dt><dd>products designed and built end to end</dd></div>
<div><dt>3 with AI</dt><dd>AI-powered products running in production</dd></div>
<div><dt>Available</dt><dd>for full-time and remote roles</dd></div>
</dl>
</section>

<section id="work" className="wrap home-work" aria-labelledby="work-title">
<div className="home-work-head">
<h2 id="work-title" className="home-h2">Selected work</h2>
<p>Each case study walks from the user problem to the structure, the interface decisions and the code, so the reasoning behind every screen is on the page.</p>
</div>
{caseStudies.map((study, index) => {
  const card = cards[study.slug];
  return <article className="work-item" key={study.slug}>
<div className="work-copy">
<p className="work-discipline">{card.discipline}</p>
<h3 className="work-name">{study.name}</h3>
<p className="work-summary">{card.summary}</p>
<div className="work-links">
<Link className="work-case" to={study.path}>Read the case study<span className="sr-only">: {study.name}</span></Link>
<a className="work-live" href={study.liveUrl} target="_blank" rel="noreferrer">Visit the live product ↗<span className="sr-only">: {study.name} (opens in a new tab)</span></a>
</div>
</div>
<Link className="work-shot" to={study.path} tabIndex={-1} aria-hidden="true">
<Img src={study.image} alt="" priority={index === 0} />
</Link>
</article>;
})}
</section>

<section id="about" className="home-band" aria-labelledby="about-title">
<div className="wrap split">
<div className="split-aside">
<h2 id="about-title" className="home-h2">What I do</h2>
</div>
<div className="split-main">
<p className="home-statement">My work sits between discovery, interaction design, UI systems and implementation. I care about flows people understand on first use, interfaces that hold up across states and languages, and decisions that survive real build constraints.</p>
{disciplines.map(item => <div className="band-row" key={item.title}>
<h3>{item.title}</h3>
<div>
<p>{item.text}</p>
<Link to={item.link}>{item.proof}</Link>
</div>
</div>)}
</div>
</div>
</section>

<section id="ai" className="wrap split home-section" aria-labelledby="ai-title">
<div className="split-aside">
<h2 id="ai-title" className="home-h2">How I use AI</h2>
</div>
<div className="split-main">
<p className="home-statement">AI goes where it helps people, with clear limits, and a human stays where judgment matters.</p>
<dl className="ai-list">
{aiPractices.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}
</dl>
</div>
</section>

<section className="home-ruled" aria-labelledby="tools-title">
<div className="wrap split home-section">
<div className="split-aside">
<h2 id="tools-title" className="home-h2">Tools</h2>
</div>
<dl className="split-main tool-list">
{tools.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}
</dl>
</div>
</section>

<section className="home-ruled" aria-labelledby="process-title">
<div className="wrap split home-section">
<div className="split-aside">
<h2 id="process-title" className="home-h2">How I work</h2>
</div>
<ol className="split-main process-list">
{process.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
</ol>
</div>
</section>

<section id="contact" className="home-contact" aria-labelledby="contact-title">
<div className="wrap">
<p className="contact-intro">Hiring for UX design, UX engineering or AI product work? I'm open to full-time and contract roles on product teams.</p>
<h2 id="contact-title" className="contact-title"><a href={profile.calendly} target="_blank" rel="noreferrer">Let's talk.</a></h2>
<ul className="contact-links">
<li><a href={profile.calendly} target="_blank" rel="noreferrer">Book a call</a></li>
{profile.email && <li><a href={`mailto:${profile.email}`}>Email</a></li>}
<li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
{profile.github && <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>}
<li><a href={profile.behance} target="_blank" rel="noreferrer">Behance</a></li>
<li><a href={profile.resume} target="_blank" rel="noreferrer">Résumé (PDF)</a></li>
</ul>
</div>
</section>

</main>);
}
