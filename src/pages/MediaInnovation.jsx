import CaseStudy from "../CaseStudy.jsx";

const study = {
  discipline: "Brand system · UX/UI design · React SPA",
  summary: "A five-page React site for Media Innovation, a creative-technology agency, turning six services and an AI offering into one clear brand story with a blog that updates itself.",
  meta: [
    { label: "Role", value: "Solo designer & developer" },
    { label: "Scope", value: "Brand system, UX/UI design, front-end build, deployment" },
    { label: "Stack", value: "React, Vite, React Router, custom CSS" },
  ],
  cover: {
    src: "/assets/media-innovation-live.jpg",
    alt: "Media Innovation agency homepage hero",
    caption: "The live homepage: the “Create, build, and innovate” promise and the animated triangular brand mark.",
  },
  glance: [
    { label: "Problem", title: "Six services, one unclear pitch", text: "A six-service offering risked reading as a generic “we do everything” agency." },
    { label: "Key decision", title: "Three verbs for everything", text: "Create, Build, Innovate organizes every service into one structure repeated on every page." },
    { label: "Outcome", title: "A live five-page site", text: "Shipped with a self-updating industry blog and no manual content upkeep." },
  ],
  did: [
    "Defined the brand positioning and the Create, Build, Innovate system used across every page.",
    "Designed and built a five-route React site: Home, Who We Are, Capabilities, Blog and Contact.",
    "Built a build-time RSS pipeline so the blog stays current without anyone writing posts.",
    "Directed the dark, cyan-accented visual system, including the animated SVG logo.",
    "Found and fixed a post-launch DNS misconfiguration so the live domain resolved correctly.",
  ],
  challenge: {
    lead: "Six very different service lines (branding, web and app development, AI agents, content, marketing and innovation consulting) had to fit in one site without reading as an unfocused template.",
    body: ["As a new AI-forward brand, the site also had to earn technical credibility on first impression, make “AI agents” feel concrete, and stay current without a content team."],
  },
  keyDecision: "Six services, one story: Create, Build, Innovate.",
  approach: [
    { lead: "One repeated system.", text: "The three verbs appear in the hero, the Who We Are values and the homepage capability tabs." },
    { lead: "Flat navigation.", text: "Five routes, every primary path one click from the header, no dropdowns hiding services." },
    { lead: "AI made concrete.", text: "An orbit diagram ties CRM, web, ads, data and operations to specific agent use cases." },
    { lead: "A blog that maintains itself.", text: "Real industry RSS sources, pulled at build time and grouped to match the agency's own services." },
  ],
  structure: {
    intro: "Three stages, in the order a visitor moves through the site.",
    steps: [
      { title: "Orient", text: "Home carries the full story in one scroll: hero, proof, services, work, AI systems, process and a call to action." },
      { title: "Choose", text: "Who We Are makes the case for the brand; Capabilities goes deep on any of the six services." },
      { title: "Act", text: "The live blog keeps the brand credible between visits, and Contact starts from the business goal, not a blank form." },
    ],
  },
  decisions: [
    { title: "Capability tabs", text: "Auto-rotating tabs that pause on hover let visitors watch a preview or take control, so six services never become a flat list." },
    { title: "Paced reveal", text: "A scroll-progress bar and reveal-on-scroll pace the long homepage instead of showing every section at once." },
    { title: "Goal-first contact", text: "Contact opens with “start with the business goal” and a Best For / We Can Discuss sidebar, so visitors can self-qualify before reaching out." },
  ],
  built: [
    "A React and Vite single-page app with React Router across five routes.",
    "A build-time script fetches, de-duplicates and sorts industry RSS feeds into static JSON, so the blog loads fast and never depends on a feed's uptime.",
    "Explicit loading, ready and error states for the blog instead of a blank page when a fetch fails.",
    "Semantic landmarks, labels on icon-only buttons, and proper tab roles on the capability and blog filters.",
  ],
  visual: {
    lead: "A near-black canvas with a cyan-to-blue gradient that runs through the logo, the hero and every primary action.",
    body: ["The logo is an animated inline SVG, three gradient bands with a glow, crisp at any size and a quiet motion detail in the header and hero."],
  },
  outcome: {
    lead: "Media Innovation launched as a complete brand and product system: positioning, a five-page site and a content channel that runs itself. Designed and built solo.",
    items: [
      "Six service lines organized into one memorable three-verb system, used on every page.",
      "No ongoing content overhead: the blog updates at build time.",
      "A post-launch DNS issue diagnosed and fixed so the live domain resolved correctly.",
    ],
  },
};

export default function MediaInnovation() {
  return <CaseStudy study={study} />;
}
