
// Single source of truth for routes, SEO metadata, JSON-LD, and case-study order.
// Production origin used for canonical URLs, Open Graph, sitemap, and schema.org.
export const SITE_URL = "https://espedroneptune.com";

export const profile = {
  name: "Espedro Neptune",
  jobTitle: "UX Engineer, Product Designer & AI Product Builder",
  image: "/assets/espedro-portrait.jpg",
  location: "USA, FL",
  calendly: "https://calendly.com/espedroneptune/30min",
  linkedin: "https://www.linkedin.com/in/espedro-neptune/",
  behance: "https://www.behance.net/EspedroNeptune",
  github: "https://github.com/Espedro",
  email: "espedroneptune@gmail.com", // public on the resume
  resume: "/assets/Espedro-Neptune-Resume.pdf",
};

// All pages are bundled eagerly: case studies are small data objects, and loading them
// in the main bundle removes a network round trip before the LCP text can render.
import Home from "./pages/Home.jsx";
import AiBosCrm from "./pages/AiBosCrm.jsx";
import Believerhub from "./pages/Believerhub.jsx";
import Footlakay from "./pages/Footlakay.jsx";
import MaketLakay from "./pages/MaketLakay.jsx";
import MediaInnovation from "./pages/MediaInnovation.jsx";
import KominoteKonbit from "./pages/KominoteKonbit.jsx";
import Votpam from "./pages/Votpam.jsx";
import Agrodoc from "./pages/Agrodoc.jsx";

// Order here drives the homepage list, the "Next case study" link, and sitemap.
export const caseStudies = [
  {
    slug: "ai-bos-crm", name: "AI BOS CRM",
    Component: AiBosCrm,
    image: "/assets/ai-bos-crm-live.jpg", liveUrl: "https://ai-bos-crm.vercel.app/",
    description: "AI BOS CRM case study: designing and building an AI Employee that answers WhatsApp, Messenger, and Instagram leads, with human-in-the-loop escalation. By Espedro Neptune.",
    keywords: ["AI product design", "Human-in-the-loop", "CRM", "Next.js", "TypeScript", "AI workflow design"],
  },
  {
    slug: "kominote-konbit", name: "Kominote Konbit",
    Component: KominoteKonbit,
    image: "/assets/kominote-konbit-live.jpg", liveUrl: "https://kominotekonbit.com/",
    description: "Kominote Konbit case study: a community platform for Konbit members with local cells, connections, groups, and Konbitèz Odette, an AI assistant that cites its sources. By Espedro Neptune.",
    keywords: ["AI assistant", "Source-grounded AI", "Community platform", "Civic education", "Haitian Creole", "UX design"],
  },
  {
    slug: "votpam", name: "VotPam",
    Component: Votpam,
    image: "/assets/votpam-live.jpg", liveUrl: "https://votpam.app/",
    description: "VotPam case study: a non-partisan civic information and opinion-poll platform for Haiti's 2027 elections, with 4,037 candidates, sourced civic content, and polls designed not to be mistaken for votes.",
    keywords: ["Civic tech", "Trust design", "Polling UX", "Next.js", "Elections", "Haitian Creole"],
  },
  {
    slug: "agrodoc", name: "Agrodoc",
    Component: Agrodoc,
    image: "/assets/agrodoc-live.jpg", liveUrl: "https://agrodoc-tau.vercel.app/",
    description: "Agrodoc case study: an offline-first clinic medical record for Haiti that syncs when the network returns, encrypts data on every device, and covers the patient journey from triage to prescription.",
    keywords: ["Offline-first", "PWA", "Health tech", "Role-based access", "Data encryption", "UX engineering"],
  },
  {
    slug: "believerhub", name: "BelieverHub",
    Component: Believerhub,
    image: "/assets/believerhub-landing.jpg", liveUrl: "https://believerhub.org/",
    description: "BelieverHub case study: 0-to-1 strategy, information architecture, design tokens, and AI Bible assistant guardrails for a live fellowship PWA. By Espedro Neptune.",
    keywords: ["Product strategy", "Design system", "Design tokens", "PWA", "AI guardrails", "Developer handoff"],
  },
  {
    slug: "footlakay", name: "FootLakay",
    Component: Footlakay,
    image: "/assets/footlakay-live.jpg", liveUrl: "https://footlakay.com/",
    description: "FootLakay case study: a mobile-first World Cup 2026 prediction platform for the Haitian diaspora, localized in four languages and built solo with React and Supabase.",
    keywords: ["UX engineering", "Localization", "Mobile-first", "React", "Supabase", "Community product"],
  },
  {
    slug: "maket-lakay", name: "Maket Lakay",
    Component: MaketLakay,
    image: "/assets/maket-lakay-live.png", liveUrl: "https://maket-lakay.vercel.app/",
    description: "Maket Lakay case study: UX and front-end for a multi-vendor marketplace connecting Haitian businesses, local shoppers, and the diaspora through trust and verified vendors.",
    keywords: ["Marketplace UX", "Trust design", "E-commerce", "Next.js", "Multi-vendor", "UX/UI design"],
  },
  {
    slug: "media-innovation", name: "Media Innovation",
    Component: MediaInnovation,
    image: "/assets/media-innovation-live.jpg", liveUrl: "http://www.mediainnovationstudios.online/",
    description: "Media Innovation case study: brand system, UX, and React front-end for a creative-technology agency website with a self-updating blog. By Espedro Neptune.",
    keywords: ["Brand system", "Agency website", "React SPA", "UX/UI design", "Content strategy"],
  },
].map(study => ({
  ...study,
  path: `/case-studies/${study.slug}.html`,
  title: `${study.name} Case Study | Espedro Neptune`,
}));

// Case studies removed from the portfolio; their old URLs redirect to /#work.
export const retiredSlugs = ["icom", "trackom", "mizikanou", "tribalscale", "bloxide", "eathy", "learnloop"];

export const homePage = {
  path: "/",
  title: "Espedro Neptune | UX Engineer, Product Designer & AI Product Builder",
  description: "Espedro Neptune is a UX engineer, product designer, and AI product builder who takes products from research to shipped React code: 8 live products, including AI-powered tools.",
  image: "/assets/og-image.png",
  Component: Home,
};

export const pages = [homePage, ...caseStudies];

