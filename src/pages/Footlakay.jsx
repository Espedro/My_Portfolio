import CaseStudy from "../CaseStudy.jsx";

const study = {
  discipline: "UX engineering · Localization · Full-stack build",
  summary: "A mobile-first World Cup 2026 prediction and fan platform for the Haitian diaspora, built to turn matchday into a shared ritual across four languages and two continents.",
  meta: [
    { label: "Role", value: "UX engineer / product designer, solo" },
    { label: "Scope", value: "Research, IA, interaction design, visual design, implementation" },
    { label: "Stack", value: "React, Tailwind CSS, Supabase, Edge Functions, API-Sports" },
  ],
  cover: {
    src: "/assets/footlakay-live.jpg",
    alt: "FootLakay homepage with World Cup 2026 hero, language selector, score strip and countdown",
    caption: "The live homepage: World Cup context, score strip, language selector, countdown, and direct entry into the calendar and predictions.",
  },
  glance: [
    { label: "Problem", title: "A scattered fan community", text: "Haitian fans were watching the same historic World Cup from different cities, without a shared digital home." },
    { label: "Key decision", title: "Belonging over stats", text: "Predictions, Fan Zone posts, language parity and identity tools come first, instead of another generic score app." },
    { label: "Outcome", title: "A live fan platform", text: "Seven core surfaces, four languages at full parity, automated grading and built-in ethical guardrails." },
  ],
  did: [
    "Framed the product around a real diaspora audience connected to Journal la Diaspora, not invented personas.",
    "Designed the information architecture around seven thumb-friendly surfaces: fixtures, predictions, Fan Zone, photo frame, sponsors, Pè Thomas and profile.",
    "Built the front end and a secure Supabase back end, with Edge Functions, row-level security, scheduled grading and API key protection.",
  ],
  challenge: {
    lead: "For the Haitian diaspora, the 2026 World Cup is identity, memory and community. But fans are spread across Florida, New York, Montreal, Paris and beyond, often following matchday alone.",
    body: ["The product needed a daily reason to return, a feeling of being one crowd, and real support for French, English, Spanish and Haitian Creole, without treating Creole as an afterthought."],
  },
  keyDecision: "Fans don't need another score app. They need a place to be Haitian together on matchday.",
  approach: [
    { lead: "Daily habit.", text: "Matchday content is visible on open, and a prediction takes only a few taps." },
    { lead: "Belonging.", text: "Community activity, photos, reactions and identity tools make the app feel populated." },
    { lead: "Trust.", text: "Scoring rules are transparent and grading is automated, so points never feel manually controlled." },
    { lead: "Inclusion.", text: "Haitian Creole carries the same product weight as French, English and Spanish." },
  ],
  extra: [
    {
      title: "Who it's for",
      items: [
        { lead: "The everyday fan.", text: "Checks scores on a phone between work and family, so the path from opening the app to making a prediction had to be short." },
        { lead: "The community connector.", text: "Posts in groups and reacts publicly. Fan Zone and photo frames give this person visible ways to take part." },
        { lead: "The diaspora bridge.", text: "Moves between Creole, French, English and Spanish, so the interface needed real localization, not one default language." },
      ],
    },
  ],
  structure: {
    intro: "Three jobs, from the most frequent matchday action outward.",
    steps: [
      { title: "Play", text: "Fixtures and predictions handle the highest-frequency actions: check the schedule, make a pick, track points." },
      { title: "Belong", text: "Fan Zone and the team photo frame create visible community moments beyond a private score utility." },
      { title: "Operate", text: "Sponsors, Pè Thomas and profile cover monetization, onboarding, language, consent and role-gated admin tools." },
    ],
  },
  decisions: [
    { title: "Predictions as a matchday habit", text: "Fast to make, with transparent rules and automated grading, so scoring feels consistent and fair." },
    { title: "Fan Zone at the center", text: "The social surface sits at the heart of the IA because the main value is belonging: photos, reactions and public celebration around Haiti." },
    { title: "Localization first", text: "Layouts were designed to survive longer French and Creole strings, keeping all four languages at feature parity." },
    { title: "A familiar guide", text: "Pè Thomas, a culturally familiar character, lowers onboarding friction for people who won't read a formal help center." },
  ],
  built: [
    "Match data goes through Supabase Edge Functions, so the API-Sports key never reaches the browser.",
    "Scheduled pg_cron jobs grade predictions automatically when results become final.",
    "An 18+ confirmation and no-stakes model keep predictions clearly outside gambling.",
    "Sponsor visibility is a calm product surface, not an interruptive ad pattern.",
    "Components were checked against longer French and Creole strings, not only English copy.",
  ],
  visual: {
    lead: "Haitian national identity without turning the product into a poster.",
    body: [
      "The blue and red palette gives immediate cultural recognition, while the UI stays mobile-first, high-contrast and dense enough for live match data.",
      "Primary actions and navigation sit within thumb reach for one-handed use, and cards keep scores, predictions and community activity from competing for attention.",
    ],
  },
  outcome: {
    lead: "FootLakay shipped to production as a complete multilingual fan product, designed and built by one person.",
    items: [
      "A live end-to-end product, from research through implementation.",
      "Full feature parity across French, English, Spanish and Haitian Creole.",
      "Trust and fairness built in through server-side API protection, row-level security and automated scoring.",
    ],
  },
};

export default function Footlakay() {
  return <CaseStudy study={study} />;
}
