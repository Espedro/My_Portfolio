import { Link } from "react-router-dom";
import { m as motion, useMotionValue, useSpring } from "motion/react";
import { profile } from "../pages.js";

const reveal = (reduced, delay) => (reduced ? {} : {
  initial: { y: "105%" },
  whileInView: { y: "0%" },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: { duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] },
});

export default function Contact({ reduced }) {
  // Magnetic arrow: follows the cursor ~22% (max ±28px) and springs back on leave. MotionValues only.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18 });
  const y = useSpring(my, { stiffness: 220, damping: 18 });
  const clamp = v => Math.max(-28, Math.min(28, v));
  const onMove = event => {
    if (reduced || event.pointerType !== "mouse") return;
    const arrow = event.currentTarget.querySelector(".ct-arrow");
    const r = arrow.getBoundingClientRect();
    mx.set(clamp((event.clientX - (r.left + r.width / 2)) * 0.22));
    my.set(clamp((event.clientY - (r.top + r.height / 2)) * 0.22));
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return <section id="contact" className="ct" aria-labelledby="ct-title">
    <div className="ct-main">
      <p className="hc-label">The next possibility starts with a conversation.</p>
      <h2 id="ct-title" className="ct-h2">
        <a className="ct-link" href={profile.calendly} target="_blank" rel="noreferrer" onPointerMove={onMove} onPointerLeave={onLeave}>
          <span className="ct-lines">
            <span className="ct-mask"><motion.span className="ct-line" {...reveal(reduced, 0)}>Let’s make</motion.span></span>
            <span className="ct-mask"><motion.span className="ct-line" {...reveal(reduced, 0.15)}>something matter<span className="dot">.</span></motion.span></span>
          </span>
          <span className="sr-only">: book a 30-minute call (opens in a new tab)</span>
          <motion.span className="ct-arrow" aria-hidden="true" style={{ x, y }}>
            <svg width="72" height="72" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="0.6"><path d="M3 11L11 3M5 3h6v6" /></svg>
          </motion.span>
        </a>
      </h2>
    </div>
    <footer className="ct-foot">
      <span>© {new Date().getFullYear()} Espedro Neptune · {profile.location}</span>
      <nav aria-label="Contact and profiles" className="ct-links">
        <a href={`mailto:${profile.email}`}>Email</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.behance} target="_blank" rel="noreferrer">Behance</a>
        <Link to={profile.resumePage}>Resume</Link>
      </nav>
    </footer>
  </section>;
}
