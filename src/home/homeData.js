import { caseStudies } from "../pages.js";

// Homepage content (from the approved prototype). Images and URLs come from caseStudies in pages.js.
// Read caseStudies only inside functions: pages.js imports Home, so it isn't ready at module load.
export function study(slug) {
  return caseStudies.find(item => item.slug === slug);
}

// Pinned "selected case study" stage: order, colors and copy.
export const featured = [
  { slug: "believerhub", tags: "Community · Product design · AI", practice: "Product strategy / UX / Design system",
    desc: "A place for faith to become fellowship. Connecting prayer, small groups, and an AI Bible assistant around real human relationships.",
    bg: "#1d2949", accent: "#f5c842" },
  { slug: "votpam", tags: "Civic tech · Trust design · Next.js", practice: "Trust design / UX engineering",
    desc: "Non-partisan civic information and opinion polls for Haiti’s 2027 elections: 4,037 candidates, sourced documents, and polls nobody mistakes for a vote.",
    bg: "#16308a", accent: "#ff6b70" },
  { slug: "ai-bos-crm", tags: "AI product design · Human-in-the-loop", practice: "AI product design / Front-end build",
    desc: "A CRM where an AI Employee answers WhatsApp, Messenger and Instagram leads, and hands off to a person when judgment is needed.",
    bg: "#2a1c5a", accent: "#b4a2ff" },
  { slug: "agrodoc", tags: "Health tech · Offline-first PWA", practice: "UX engineering / Offline-first PWA",
    desc: "Offline-first clinic records for Haiti, encrypted on every device and synced when the network returns.",
    bg: "#0a5470", accent: "#6ee7d8" },
];

// Horizontal "More work" cards.
export const moreWork = [
  { slug: "kominote-konbit", tags: "AI assistant · Community platform", bg: "#c8202b", accent: "#ffd2cc",
    desc: "A digital home for Konbit members to connect, organize their local cell and learn, with an AI assistant that cites its sources.", alt: "Kominote Konbit home page" },
  { slug: "footlakay", tags: "UX engineering · Localization · Full-stack", bg: "#0f4a30", accent: "#f4d35e",
    desc: "A World Cup fan platform for the Haitian diaspora, in four languages.", alt: "FootLakay home page" },
  { slug: "maket-lakay", tags: "Marketplace UX · Trust design", bg: "#a8480c", accent: "#ffe2b8",
    desc: "A multi-vendor marketplace linking Haitian businesses, local shoppers and the diaspora.", alt: "Maket Lakay storefront" },
  { slug: "media-innovation", tags: "Brand system · UX/UI · React SPA", bg: "#0b5d94", accent: "#bfe6ff",
    desc: "A five-page React site and brand system for a creative-technology agency.", alt: "Media Innovation home page" },
];

export const disciplines = [
  { title: "UX design", text: "I turn user problems, competitive gaps and stakeholder goals into information architecture, flows and interface decisions with visible rationale.",
    link: "BelieverHub: from competitive mapping to a fellowship-first IA", slug: "believerhub" },
  { title: "UX engineering", text: "I design with states, edge cases, accessibility, localization and responsive behavior in mind, then ship it in React, TypeScript and Tailwind.",
    link: "FootLakay: four-language parity, row-level security, Edge Functions", slug: "footlakay" },
  { title: "AI product building", text: "I decide where AI acts on its own and where a person must decide, make that behavior visible in the interface, and use AI to get from idea to live product faster.",
    link: "AI BOS CRM: an AI Employee with human hand-off", slug: "ai-bos-crm" },
];

export const principles = [
  { title: "A person in the loop, on purpose", text: "The AI handles repetitive conversations and hands off to a person when a lead needs judgment." },
  { title: "Guardrails are UX requirements", text: "Assistants show where every answer comes from and say plainly when something isn’t in the documents." },
  { title: "Show what the AI is doing", text: "Channels, response time, automation health and hand-off status stay visible, so people can check the AI." },
  { title: "AI in my own workflow", text: "Claude, ChatGPT and Lovable for architecture, code and debugging, kept consistent with knowledge files and phased prompts." },
];

export const toolRows = [
  [["Design & research", ["Figma", "Prototyping", "User research", "Usability testing", "Information architecture", "Adobe XD", "Photoshop", "Illustrator"]],
   ["Practice", ["Design systems & tokens", "Accessibility (WCAG AA)", "Localization", "Responsive UI", "Interaction states", "Developer handoff"]]],
  [["Front end", ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "shadcn/ui"]],
   ["Back end & platforms", ["Supabase", "Edge Functions", "Row-level security", "Vercel", "WordPress", "Shopify", "WooCommerce"]]],
  [["AI product building", ["Claude", "ChatGPT", "Lovable", "Prompt design", "Agentic workflows", "Human-in-the-loop", "AI guardrails"]]],
];

export const steps = [
  { title: "Understand", text: "Audience, business goal, user need, technical limits and what success looks like, before any screen." },
  { title: "Structure", text: "Flows, content priority, interaction patterns and edge cases, so the experience has a solid frame." },
  { title: "Design", text: "Consistent components, accessible patterns, clear states and, for AI features, explicit hand-off rules." },
  { title: "Build & measure", text: "Ship responsive front ends with care for performance, then watch the signals that show it works." },
];

export const num = i => String(i + 1).padStart(2, "0");
