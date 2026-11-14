import CaseStudy from "../CaseStudy.jsx";

const study = {
  discipline: "0-to-1 strategy · Design system · AI guardrails",
  summary: "A fellowship platform for the Christian community, built around real relationships, prayer accountability, small groups and church-led density instead of passive content consumption.",
  meta: [
    { label: "Role", value: "Product designer / founder" },
    { label: "Scope", value: "Strategy, UX, UI system, design tokens, developer handoff" },
    { label: "Platform", value: "Responsive web app, installable PWA" },
  ],
  cover: {
    src: "/assets/believerhub-landing.jpg",
    alt: "BelieverHub landing page at believerhub.org",
    caption: "The live landing page: “BelieverHub helps you not walk alone,” with groups, prayer, accountability partners, testimonies, worship and AI Bible study as the core.",
  },
  glance: [
    { label: "Problem", title: "Content was not enough", text: "Christian apps were strong at Bible content but weak at fellowship, accountability and ongoing support between people." },
    { label: "Key decision", title: "Fellowship is the core", text: "The product centers groups, prayer, accountability and church-led density, not a generic faith content feed." },
    { label: "Outcome", title: "A live product", text: "BelieverHub is public at believerhub.org with the fellowship core shipped, including an AI Bible assistant." },
  ],
  did: [
    "Defined the strategic wedge: YouVersion helps people read the Bible; BelieverHub helps people not walk alone.",
    "Built the information architecture around fellowship, prayer, groups, Bible support, worship, messages, profile and admin moderation.",
    "Created the design token system, the bilingual EN/FR structure, dark mode rules and the developer handoff documentation.",
  ],
  challenge: {
    lead: "Most Christian apps optimize for solo consumption: reading, listening, highlighting. The gap is relational: knowing someone is praying for you, staying connected to a small group, and feeling less alone in faith.",
    body: [
      "I mapped the faith-app landscape on two axes, solo to relational and content to accountability. Incumbents clustered around digital, solo, content-first experiences. The open space was digital fellowship.",
      "The product also needed a beachhead large incumbents could not copy easily: the Francophone and Creolophone Christian community, with language, culture and church context shaping the experience.",
    ],
  },
  keyDecision: "Not another Bible app. A place where nobody walks alone.",
  approach: [
    { lead: "Relationship, not content.", text: "Solve spiritual isolation instead of competing as one more Bible reader." },
    { lead: "One church at a time.", text: "A fellowship product needs density, so the cold-start plan seeds real church communities instead of scattered global signups." },
    { lead: "Strengthen the local church.", text: "The product supports church relationships instead of replacing them." },
    { lead: "Scope discipline.", text: "The MVP focused on auth, groups, prayer and feed before expanding into the long-term vision." },
  ],
  structure: {
    intro: "Three layers, from the relational center outward.",
    steps: [
      { title: "Fellowship", text: "Home, community feed, prayer center, groups and the AI Bible assistant form the relational center." },
      { title: "Practice", text: "Bible Q&A, study plans, devotionals, memory verses, notes, prayer journal and notifications support an ongoing rhythm." },
      { title: "Operate", text: "Churches, ministry, discipleship, messages, profile, search and admin moderation keep the product manageable as it grows." },
    ],
  },
  decisions: [
    { title: "“I'm praying” instead of a like", text: "Prayer requests use “I'm praying” with a live counter and face-pile, so support is visible and relational instead of transactional." },
    { title: "PWA first", text: "An installable web app avoids app-store friction, spreads through church sharing, and stays light on slower mobile data." },
    { title: "Guardrails for the AI assistant", text: "The assistant must cite real verses, show disclaimers, defer to pastors and never invent doctrine. Those rules shaped the interface from the start." },
    { title: "Constraints treated as design inputs", text: "Bible text comes from licensed APIs with attribution, private prayers and journals are protected at the data layer, and music links out instead of hosting content." },
  ],
  gallery: [
    { src: "/assets/believerhub-live.jpg", alt: "BelieverHub fellowship dashboard", caption: "The live product: community navigation, prayer prompts, the verse system, group activity, events and study flows." },
  ],
  // Technical view of the AI Bible assistant. Facts from the owner (2026-11-13); nothing added.
  aiArchitecture: {
    title: "Bible questions only, with the reference every time.",
    flow: [
      { title: "Member question", sub: "about the Bible" },
      { title: "Claude", sub: "connected to a Bible API", ai: true },
      { title: "Answer + biblical reference", sub: "book, chapter, verse" },
    ],
    specs: [
      { label: "Model", value: "Claude." },
      { label: "Data source", value: "A Bible API connected to the assistant." },
      { label: "Scope", value: "It answers only questions about the Bible." },
      { label: "Citations", value: "Every answer gives the biblical reference." },
    ],
  },
  built: [
    "Design tokens for color, type scale, spacing, radii, light mode and dark mode.",
    "A complete, navigable HTML model of every product surface as the visual source of truth for development.",
    "A persistent knowledge file covering vision, roles, rules, tokens and implementation constraints.",
    "A phased prompt sequence for AI-assisted development: front end first, back end later, row-level security from day one.",
    "WCAG AA targets, visible focus rings, reduced-motion support and contrast rules from the start.",
  ],
  visual: {
    lead: "Sacred but modern: navy, steel blue and grey, with a disciplined yellow accent.",
    body: [
      "A signature verse moment uses a navy card, a white editorial serif, an italic verse and a yellow accent rule.",
      "Fraunces carries headings and verses, Inter carries the interface, so the product feels devotional without losing usability.",
    ],
  },
  outcome: {
    lead: "BelieverHub went from 0-to-1 strategy and design, through development handoff, to a live public product at believerhub.org.",
    items: [
      "A defensible position around fellowship, now stated on the live site itself: “Not another app. A family.”",
      "A complete IA of 17 screens and a lean MVP that shipped groups, prayer with live counts, accountability partners, testimonies, worship and an AI Bible assistant.",
      "Licensing, AI accuracy, music rights, privacy and security handled as design inputs instead of late-stage risks.",
    ],
  },
};

export default function Believerhub() {
  return <CaseStudy study={study} />;
}
