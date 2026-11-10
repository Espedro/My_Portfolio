import { Link } from "react-router-dom";
import { profile } from "./pages.js";

// Web version of the resume. Content comes from public/assets/ESPEDRONEPTUNE_Resume.docx.
// When the .docx changes, update this object and re-export the PDF (profile.resume).
const resume = {
  title: "Product Designer | UX Engineer",
  summary: "Product Designer and UX Engineer with 10+ years of experience designing and shipping digital products across government, SaaS, education, media, and startup environments. Experienced leading products from discovery and UX research through wireframes, high-fidelity design, front-end development, and production deployment using Figma, React, Tailwind CSS, and Supabase.",
  strengths: [
    "End-to-End Product Design",
    "UX Research & Testing",
    "Design Systems",
    "Accessibility (WCAG)",
    "React · Tailwind · Supabase",
    "Cross-functional Collaboration",
    "AI-assisted Product Design",
    "Front-End Development",
  ],
  products: [
    { name: "FootLakay", link: "/case-studies/footlakay.html", text: "Designed and launched a multilingual FIFA World Cup prediction platform with live data, community features, and automated scoring." },
    { name: "BelieverHub", link: "/case-studies/believerhub.html", text: "Designed a faith-based community platform from research through production." },
    { name: "Learning Management System", text: "Built a bilingual LMS with Stripe payments, role-based access, quizzes, and certificates." },
    { name: "ICOM Government Platform", text: "Designed a government service platform focused on transparency, citizen services, and diaspora engagement." },
  ],
  experience: [
    { role: "UX/UI Designer", org: "TransPerfect", where: "Remote", when: "2025–Present", text: "Deliver UX research, wireframes, prototypes, and high-fidelity interfaces for international clients while collaborating with cross-functional teams." },
    { role: "UX/UI Engineer", org: "Bloxide", when: "2024–2025", text: "Designed and developed responsive React interfaces, implemented design systems, and improved consistency across products." },
    { role: "UX/UI Designer", org: "CoinKids", when: "2023–2024", text: "Led user research, personas, wireframes, and accessibility improvements to enhance retention and usability." },
  ],
  education: [
    "UX/UI Design — Ironhack",
    "Web Development — Ironhack",
    "Artificial Intelligence Certification — BrainStation",
    "Electronic Design — Centre de Formation Professionnelle d'Haïti",
  ],
};

function Section({ id, title, children }) {
  return <section className="cs-band-rule" aria-labelledby={id}>
    <div className="wrap cs-split">
      <h2 id={id} className="cs-h2">{title}</h2>
      <div className="cs-split-main">{children}</div>
    </div>
  </section>;
}

export default function Resume() {
  return <main id="main" className="cs resume">
    <section className="wrap cs-hero resume-hero" aria-labelledby="resume-title">
      <p className="cs-eyebrow">Resume</p>
      <h1 id="resume-title" className="cs-title">{profile.name}</h1>
      <p className="cs-summary">{resume.title}</p>
      <ul className="resume-contact">
        <li>{profile.location}</li>
        <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
        <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
      </ul>
      <div className="home-actions resume-actions">
        <a className="btn-ink" href={profile.resume} download="Espedro-Neptune-Resume.pdf">Download PDF</a>
        <a className="strong-link" href={profile.calendly} target="_blank" rel="noreferrer">Book a 30-minute call</a>
      </div>
    </section>

    <Section id="resume-summary" title="Summary">
      <p className="cs-lead">{resume.summary}</p>
    </Section>

    <Section id="resume-strengths" title="Core strengths">
      <ul className="resume-tags">{resume.strengths.map(item => <li key={item}>{item}</li>)}</ul>
    </Section>

    <Section id="resume-experience" title="Experience">
      <ol className="resume-entries">
        {resume.experience.map(job => <li key={job.org}>
          <h3>{job.role} — {job.org}</h3>
          <p className="resume-when">{[job.where, job.when].filter(Boolean).join(" · ")}</p>
          <p>{job.text}</p>
        </li>)}
      </ol>
    </Section>

    <Section id="resume-products" title="Selected products">
      <ul className="resume-entries">
        {resume.products.map(item => <li key={item.name}>
          <h3>{item.link ? <Link to={item.link}>{item.name}</Link> : item.name}</h3>
          <p>{item.text}</p>
        </li>)}
      </ul>
      <p className="resume-more"><Link to="/#work">See all 8 case studies →</Link></p>
    </Section>

    <Section id="resume-education" title="Education">
      <ul className="cs-list">{resume.education.map(item => <li key={item}>{item}</li>)}</ul>
    </Section>
  </main>;
}
