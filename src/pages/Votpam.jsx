import CaseStudy from "../CaseStudy.jsx";

const study = {
  discipline: "Civic tech · Trust design · Next.js build",
  summary: "A civic information and opinion-poll platform for Haiti's 2027 elections. It helps people discover candidates, understand the electoral process and share their opinion, in an independent, non-partisan space.",
  meta: [
    { label: "Role", value: "Solo designer & developer" },
    { label: "Scope", value: "Product strategy, UX/UI, content structure, build and launch" },
    { label: "Stack", value: "Next.js, Vercel" },
  ],
  cover: {
    src: "/assets/votpam-live.jpg",
    alt: "VotPam homepage: “Enfòmasyon ki klè. Patisipasyon ki konte.” with a sample presidential poll card",
    caption: "The live homepage: “Enfòmasyon ki klè. Patisipasyon ki konte.” The non-partisan, original-sources and three-language promises sit right under the actions.",
  },
  glance: [
    { label: "Problem", title: "Thousands of candidates, little clarity", text: "Haiti's 2027 elections list 4,037 candidates across six offices. Voters need one clear, neutral place to see who is running and how the process works." },
    { label: "Key decision", title: "Opinion, never a vote", text: "Every poll is labeled as not an official vote, and results only appear after 30 responses." },
    { label: "Outcome", title: "A live civic platform", text: "Candidates, polls, voting locations and a sourced civic library, in three languages." },
  ],
  did: [
    "Defined the product's position: an independent, non-partisan space for civic information, not an electoral body.",
    "Structured 4,037 candidates from the CEP's preliminary list into a directory searchable by office, department, commune and party.",
    "Designed 1,012 opinion polls across six offices, from President to ASEC, with a review step before confirming.",
    "Built a civic library of the 1987 Constitution, electoral law and CEP references, each with its source and version.",
    "Designed and built the product end to end.",
  ],
  challenge: {
    lead: "In an election season, the line between information, opinion and official results has to be impossible to miss.",
    body: ["VotPam had to let people compare candidates and share their preferences without ever looking like a voting system, a campaign or an electoral authority. The CEP publishes the official results and calendar, and the product says so wherever it matters."],
  },
  keyDecision: "A poll is an opinion. It never replaces your vote at the polling station.",
  approach: [
    { lead: "Neutral by design.", text: "Candidates appear in alphabetical order, followed by “I haven't decided yet.” No candidate is marked as leading." },
    { lead: "A source for everything.", text: "Each piece of information links to its original source. Offices, zones and candidates come from the CEP's preliminary list, with its date shown." },
    { lead: "Easy to join, safe to answer.", text: "No account is needed to answer a poll. Answers are recorded without the person's name, one per account or per device." },
    { lead: "Labels where they count.", text: "“Not an official vote” and “Not official” badges sit on the polls themselves, not in fine print." },
  ],
  structure: {
    intro: "Three jobs, from understanding to taking part.",
    steps: [
      { title: "Understand", text: "A candidate directory by office, department, commune and party, plus where you can vote." },
      { title: "Learn", text: "A civic library: the 1987 Constitution (298 articles), electoral law and CEP references, each with source and version." },
      { title: "Participate", text: "Opinion polls for President, Senator, Deputy, Mayor, CASEC and ASEC, with a review step before confirming." },
    ],
  },
  decisions: [
    {
      title: "Polls nobody can mistake for votes",
      text: "A red “Sa pa yon vòt ofisyèl” badge sits in the poll header, results stay hidden until 30 responses, and the sidebar explains this is voluntary participation, not a representative survey.",
      image: { src: "/assets/votpam-polls.jpg", alt: "VotPam polls page with the “not an official vote” badge, six offices and the presidential poll" },
    },
    {
      title: "The same format for every candidate",
      text: "“Enfòmasyon piblik, menm fòma pou chak kandida.” Every profile follows one structure, with filters by office, department, commune and party, and a note that the CEP list can still change.",
      image: { src: "/assets/votpam-candidates.jpg", alt: "VotPam candidate directory filtered to the 21 presidential candidates" },
    },
    { title: "No visual advantage", text: "Candidate photos are neutral placeholders until official photos are available, so no candidate stands out on looks alone." },
  ],
  built: [
    "Next.js, deployed on Vercel.",
    "Offices, zones and candidates loaded from the CEP's preliminary list (5 November 2026), with that date shown wherever the data appears.",
    "One response per account, or per device when signed out; answers stored without the participant's name.",
    "Haitian Creole interface with a switcher for three languages.",
    "Methodology, sources and update notes linked from the polls.",
  ],
  visual: {
    lead: "Serious, calm and readable, the way civic information should feel.",
    body: [
      "Deep navy carries the identity, with a bright blue for actions and red reserved for warnings like “not an official vote.”",
      "Large type and generous spacing keep dense election data, like six offices and hundreds of polls per office, easy to scan.",
    ],
  },
  outcome: {
    lead: "VotPam is live at votpam.app ahead of Haiti's 2027 elections. Designed and built solo.",
    items: [
      "4,037 candidates across six offices in one searchable directory.",
      "1,012 opinion polls, each clearly labeled as opinion, not a vote.",
      "A civic library with the 1987 Constitution, electoral law and CEP references, each tied to its source.",
    ],
  },
};

export default function Votpam() {
  return <CaseStudy study={study} />;
}
