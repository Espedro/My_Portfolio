import { useEffect, useRef } from "react";
import { animate, m as motion, useInView, useMotionValue, useTransform } from "motion/react";
import { profile } from "../pages.js";
import { Arrow } from "./ui.jsx";

function Count({ to, start, reduced, delay = 0 }) {
  const value = useMotionValue(reduced ? to : 0);
  const rounded = useTransform(value, v => Math.round(v));
  useEffect(() => {
    if (!start || reduced) return;
    const controls = animate(value, to, { duration: 1.1, delay, ease: [0.2, 0.7, 0.2, 1] });
    return () => controls.stop();
  }, [start, reduced]);
  return <motion.span aria-hidden="true">{rounded}</motion.span>;
}

export default function Numbers({ reduced }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const on = reduced || inView;
  return <section ref={ref} className={`hn ${on ? "is-on" : ""}`} aria-label="In numbers">
    <div className="hn-grid">
      <div className="hn-col">
        <p className="hn-big"><span className="sr-only">8 live products</span><Count to={8} start={inView} reduced={reduced} /><span className="hn-unit" aria-hidden="true">live</span></p>
        <p className="hn-text">products designed and built end to end</p>
        <div className="hn-squares" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span key={i} style={{ "--i": i }} />)}</div>
      </div>
      <div className="hn-col">
        <p className="hn-big"><span className="sr-only">3 with AI</span><Count to={3} start={inView} reduced={reduced} delay={0.15} /><span className="hn-unit" aria-hidden="true">with AI</span></p>
        <p className="hn-text">AI-powered products in production</p>
        <div className="hn-squares is-ai" aria-hidden="true">{Array.from({ length: 3 }, (_, i) => <span key={i} style={{ "--i": i + 3 }} />)}</div>
      </div>
      <div className="hn-col">
        <p className="hn-big">Open<span className="hn-pulse" aria-hidden="true" /></p>
        <p className="hn-text">to full-time and remote roles</p>
        <a className="h-link" href={profile.calendly} target="_blank" rel="noreferrer">Book a 30-minute call<span className="sr-only"> (opens in a new tab)</span> <Arrow /></a>
      </div>
    </div>
  </section>;
}
