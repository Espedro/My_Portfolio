import CaseStudy from "../CaseStudy.jsx";

const study = {
  discipline: "AI assistant · Community platform · Product design & build",
  summary: "The digital home of Konbit members: one place to connect with each other, organize a local cell and learn Konbit principles every day, with an AI assistant that shows where its answers come from.",
  meta: [
    { label: "Role", value: "Solo designer & developer" },
    { label: "Scope", value: "Product strategy, UX/UI, AI assistant design, build and launch" },
    { label: "Platform", value: "Responsive web app in Kreyòl, French and English" },
  ],
  cover: {
    src: "/assets/kominote-konbit-live.jpg",
    alt: "Kominote Konbit homepage with a watercolor illustration of the Konbit community",
    caption: "The live homepage opens on a watercolor of the community it serves: teachers, nurses, clergy, students, elders and officers, side by side.",
  },
  glance: [
    { label: "Problem", title: "A movement needs one home", text: "Cells, connections, groups, announcements and learning had to live in one place instead of many separate channels." },
    { label: "Key decision", title: "An assistant that shows its sources", text: "Konbitèz Odette answers in the member's language, cites the document behind each answer, and says so when something isn't in the official documents." },
    { label: "Outcome", title: "A live community platform", text: "Connect, Organize and Learn, shipped as one product in three languages." },
  ],
  did: [
    "Shaped the product around three jobs: connect with members, organize the local cell, and learn Konbit principles.",
    "Designed My Konbit page, one screen that gathers a member's cell, connections, groups and the announcements that concern them.",
    "Designed Konbitèz Odette, an AI assistant grounded in the Konbit Guide, the 1987 Constitution and civic-education material.",
    "Designed a three-step start: create an account and choose what others can see, choose your cell, take part.",
    "Designed and built the product end to end.",
  ],
  challenge: {
    lead: "A community organized in local cells needs more than a group chat. Members need to find each other, know who leads their cell, follow what concerns them, and learn the principles that hold the movement together.",
    body: ["Members also ask civic questions, like what a CASEC is. A confident wrong answer from an AI can do real harm, so the assistant had to be useful without ever inventing anything."],
  },
  keyDecision: "Odette answers from the official documents, and says so when the answer isn't there.",
  approach: [
    { lead: "One home.", text: "My Konbit page puts a member's cell, connections, groups and announcements on a single screen." },
    { lead: "Local first.", text: "Members join the cell in their area, so they know their leader and the people around them." },
    { lead: "Privacy by choice.", text: "At sign-up, each member decides what other members can see." },
    { lead: "Learning built in.", text: "Questions about the Konbit Guide, the Constitution and civic education go to Odette, in the member's own language." },
  ],
  structure: {
    intro: "Three jobs, named the way members use them.",
    steps: [
      { title: "Konekte", text: "Find other members, send a connection request, and talk privately with the people you're connected to." },
      { title: "Òganize", text: "Follow your cell and its leader, join interest groups, and get the announcements that concern you." },
      { title: "Aprann", text: "Ask Konbitèz Odette about the Konbit Guide, the Constitution and civic education, in the language you speak." },
    ],
  },
  decisions: [
    {
      title: "A source under every answer",
      text: "Asked what a CASEC is, Odette explains it and links “Konstitisyon 1987 › Atik 63” right under the reply, so members can check the answer themselves.",
      image: { src: "/assets/kominote-konbit-odette.jpg", alt: "Konbitèz Odette answering “Kisa yon CASEC ye?” with a citation to Article 63 of the 1987 Constitution" },
    },
    { title: "Honest about limits", text: "When something isn't in the official documents, Odette says so plainly instead of guessing." },
    { title: "A name with meaning", text: "The assistant is named after Odette Roy Fombrun, the Mother of Konbit, so it feels like part of the community rather than a generic chatbot." },
    { title: "Questions to start with", text: "Suggested prompts like “Kisa yon CASEC ye?” and “Kijan pou m òganize yon konbit nan zòn mwen?” show new members what they can ask." },
  ],
  gallery: [
    { src: "/assets/kominote-konbit-hero.jpg", alt: "Kominote Konbit headline “Ansanm, nou pi fò.” on a red band under the community illustration", caption: "“Ansanm, nou pi fò.” The promise sits on a bold red band, with “create my account” and “I already have an account” side by side." },
  ],
  built: [
    "Designed and built end to end as a responsive web app.",
    "Kreyòl-first interface with French and English; Odette replies in the language the member writes in.",
    "Odette's answers are grounded in a defined set of documents (the Konbit Guide, the 1987 Constitution and civic-education material), with the source shown under each reply.",
    "Profile visibility set by the member from the moment they create an account.",
    "Help, privacy and terms pages linked from every page.",
  ],
  visual: {
    lead: "Warm, human and unmistakably Haitian.",
    body: [
      "A hand-painted watercolor of the community opens the site, followed by a bold red band carrying the promise “Ansanm, nou pi fò.”",
      "Cream backgrounds, rounded cards and a sturdy sans-serif keep the interface friendly and easy to read.",
    ],
  },
  outcome: {
    lead: "Kominote Konbit is live at kominotekonbit.com: one home where members connect, organize and learn. Designed and built solo.",
    items: [
      "Connect, Organize and Learn shipped together as one product.",
      "An AI assistant that cites its sources and admits what it doesn't know, in three languages.",
      "A three-step path from sign-up to taking part in a local cell.",
    ],
  },
};

export default function KominoteKonbit() {
  return <CaseStudy study={study} />;
}
