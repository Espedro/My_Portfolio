import CaseStudy from "../CaseStudy.jsx";

const study = {
  discipline: "AI product design · Human-in-the-loop · Front-end build",
  summary: "A CRM that puts an AI Employee in a business's inbox and pipeline. It brings WhatsApp, Messenger and Instagram into one place, qualifies leads, and hands off to a person when judgment is needed.",
  meta: [
    { label: "Role", value: "Solo designer & developer" },
    { label: "Scope", value: "Product design, UX/UI, AI workflow design, front-end build, deployment" },
    { label: "Stack", value: "Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Vercel" },
  ],
  cover: {
    src: "/assets/ai-bos-crm-live.jpg",
    alt: "AI BOS CRM landing page with the live dashboard",
    caption: "The landing page leads with “The CRM that answers your customers before you do,” then shows the real dashboard underneath.",
  },
  glance: [
    { label: "Problem", title: "Slow, scattered lead response", text: "Messages arrive on WhatsApp, Messenger and Instagram. Staying fast and organized gets harder as the business grows." },
    { label: "Key decision", title: "A person stays in the loop", text: "The AI Employee handles repetitive conversations and hands off when a conversation needs human judgment." },
    { label: "Outcome", title: "A live AI-powered CRM", text: "Unified inbox, automated pipeline and AI Employee, shipped as one working product." },
  ],
  did: [
    "Defined the concept: an AI Employee inside the inbox, pipeline and follow-ups, not a chatbot bolted on the side.",
    "Designed and built the unified inbox, the automated pipeline board, and the task and escalation views.",
    "Designed the hand-off model that decides when the AI passes a conversation to a person.",
    "Directed the visual system: a clean, dashboard-first SaaS layout.",
    "Used Claude and ChatGPT through the build itself, for architecture, code, debugging, prompts and workflow logic.",
  ],
  challenge: {
    lead: "Every new channel and every new lead adds manual work: copying messages between tools, remembering who still needs a reply, and typing details into a pipeline by hand.",
    body: ["The product had to fix speed at the root, with a first responder that never sleeps, without becoming a black box that tries to handle every conversation alone and gets the high-stakes moments wrong."],
  },
  keyDecision: "The AI handles the repetitive work. A person handles judgment.",
  approach: [
    { lead: "One inbox.", text: "WhatsApp, Messenger and Instagram in one place, so the team stops working channel by channel." },
    { lead: "An AI that knows the business.", text: "It uses business-specific resources to answer questions, qualify leads and move deals forward." },
    { lead: "Clear hand-off rules.", text: "The AI owns repetitive interactions and passes the conversation on exactly when judgment is needed." },
    { lead: "Automatic tracking.", text: "Contacts, companies, deals, tasks and follow-ups update on their own, so leads stop slipping between channels." },
  ],
  structure: {
    intro: "Three jobs, in the order a lead moves through them.",
    steps: [
      { title: "Respond", text: "One inbox for every channel, with the AI Employee answering first, day and night." },
      { title: "Qualify", text: "The AI answers questions and qualifies leads, moving them through the pipeline without manual data entry." },
      { title: "Escalate", text: "The dashboard surfaces conversations that need a person, with pipeline value, response time and automation health in view." },
    ],
  },
  decisions: [
    { title: "A single inbox for every channel", text: "Conversations from WhatsApp, Messenger and Instagram live in one workspace, so nobody has to rebuild a customer's history across separate apps." },
    { title: "An AI Employee, not full autonomy", text: "The AI takes the repetitive interactions and escalates when judgment matters. It is a deliberate limit that keeps the product trustworthy instead of trying to automate everything." },
    { title: "One screen for the whole funnel", text: "New leads, active conversations, items waiting on a person, open pipeline value, overdue tasks and AI response time sit together, so the state of the business reads at a glance." },
  ],
  built: [
    "Next.js, React and TypeScript for a type-safe dashboard and pipeline.",
    "Tailwind CSS and shadcn/ui for one consistent, accessible component system across inbox, pipeline and settings.",
    "AI behavior made visible: connected channels, response times and hand-off status are always on screen, never hidden behind the automation.",
    "Claude and ChatGPT used through the whole build, not only as a feature inside the product.",
    "Deployed on Vercel.",
  ],
  visual: {
    lead: "The dashboard is the proof. Instead of illustrating the AI Employee in the abstract, the landing page shows the real command center, so visitors see the product, not a mockup of an idea.",
    body: ["A light SaaS canvas keeps the data readable, with the brand color carried through the wordmark, key headline words and primary actions."],
  },
  outcome: {
    lead: "AI BOS CRM launched as a complete product: unified inbox, automated pipeline and an AI Employee that knows when to step back. Designed and built solo.",
    items: [
      "Every channel got a first responder that never sleeps, fixing response time at the root instead of adding one more dashboard to check.",
      "Lead qualification and pipeline tracking run on their own, while people keep the high-stakes conversations.",
      "AI was part of the design-to-code process itself, not only a feature.",
    ],
  },
};

export default function AiBosCrm() {
  return <CaseStudy study={study} />;
}
