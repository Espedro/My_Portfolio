import CaseStudy from "../CaseStudy.jsx";

const study = {
  discipline: "Health tech · Offline-first PWA · UX engineering",
  summary: "A medical record for clinics in Haiti that keeps working without internet. It follows the patient from triage to prescription, syncs when the network comes back, and encrypts data on every device.",
  meta: [
    { label: "Role", value: "Solo designer & developer" },
    { label: "Scope", value: "Product design, UX/UI, offline behavior, front-end build" },
    { label: "Stack", value: "Vite, installable PWA, Vercel" },
  ],
  cover: {
    src: "/assets/agrodoc-live.jpg",
    alt: "Agrodoc sign-in screen: “Le dossier médical de la clinique, même sans internet.”",
    caption: "The sign-in screen states the three promises up front (works offline, encrypted with role-based access, the full patient journey) and shows whether the app is online.",
  },
  glance: [
    { label: "Problem", title: "Care can't wait for the network", text: "Clinic staff need the patient record at every step, even when the connection drops." },
    { label: "Key decision", title: "Offline first, not offline fallback", text: "The app is ready to work without internet and syncs on its own when the network returns." },
    { label: "Outcome", title: "A live clinic record", text: "Triage to prescription in one installable app, with encryption and role-based access." },
  ],
  did: [
    "Defined the product around one promise: the clinic's medical record, even without internet.",
    "Designed the patient journey from triage to prescription as one continuous record.",
    "Designed the offline and sync behavior, including a visible online status and a notice when the app is ready to work offline.",
    "Designed role-based access, with accounts issued by the clinic instead of open sign-up.",
    "Designed and built the product as an installable web app.",
  ],
  challenge: {
    lead: "In many clinics the network is not something you can count on. A record that disappears when the connection drops is a record staff stop trusting.",
    body: ["Agrodoc had to keep every step of care available offline, keep sensitive health data protected on every device, and make sure each person only sees what their role allows."],
  },
  keyDecision: "The record works without internet. The network is a bonus, not a requirement.",
  approach: [
    { lead: "Offline first.", text: "Every step of the visit can be recorded without a connection." },
    { lead: "Sync on return.", text: "Work done offline is synchronized automatically when the network comes back." },
    { lead: "Encrypted on the device.", text: "Patient data is encrypted on each device that holds it." },
    { lead: "Access by role.", text: "People see and do only what their role in the clinic allows, with accounts the clinic provides." },
  ],
  structure: {
    intro: "The patient journey the record follows.",
    steps: [
      { title: "Triage", text: "The visit starts at triage and is recorded on the device, connected or not." },
      { title: "Care", text: "Each step of the visit adds to the same patient record." },
      { title: "Prescription", text: "The journey ends with the prescription, synced to the clinic's record when the network returns." },
    ],
  },
  decisions: [
    { title: "Status you can see", text: "An “En ligne” indicator under the sign-in form tells staff whether they're connected, so nobody has to wonder if their work is saved." },
    { title: "A clear ready-offline moment", text: "A notice confirms “L'application est prête à fonctionner sans internet” once the app can run without a connection." },
    { title: "Accounts from the clinic", text: "Staff sign in with an account the clinic provides, so access follows the clinic's roles instead of open registration." },
    { title: "Promises before the form", text: "The sign-in screen states offline use, encryption and the full patient journey before it asks for anything." },
  ],
  built: [
    "Vite single-page app, installable as a PWA, deployed on Vercel.",
    "Offline-ready, with a notice when the app can run without internet and automatic sync when the network returns.",
    "Patient data encrypted on each device.",
    "Role-based access to patient information.",
    "French interface for clinic staff in Haiti.",
  ],
  visual: {
    lead: "Clinical, calm and trustworthy.",
    body: [
      "A deep blue panel carries the brand and the three promises, while the work area stays light and uncluttered.",
      "Simple icons for offline use, security and the patient journey make the promises easy to scan before sign-in.",
    ],
  },
  outcome: {
    lead: "Agrodoc is live as an installable clinic record built for unreliable connectivity. Designed and built solo.",
    items: [
      "The full patient journey, from triage to prescription, in one record.",
      "Offline work with automatic sync when the network returns.",
      "Encryption on every device and access by role.",
    ],
  },
};

export default function Agrodoc() {
  return <CaseStudy study={study} />;
}
