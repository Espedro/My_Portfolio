import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "motion/react";
import EMark from "./EMark.jsx";
import { disciplines, num, study } from "./homeData.js";
import { Arrow } from "./ui.jsx";

function Item({ d, i, onReveal, reduced }) {
  const ref = useRef(null);
  // Reveal when the item reaches the lower third of the viewport.
  const inView = useInView(ref, { once: true, margin: "0px 0px -33% 0px" });
  useEffect(() => { if (inView) onReveal(i); }, [inView]);
  const on = reduced || inView;
  return <div ref={ref} className={`wd-item ${on ? "is-on" : ""}`}>
    <div className="wd-item-head">
      <span className="wd-num">{num(i)}</span>
      <h3>{d.title}</h3>
    </div>
    <p>{d.text}</p>
    <Link className="h-link" to={study(d.slug).path}>{d.link} <Arrow kind="right" /></Link>
  </div>;
}

// Section id stays "about" so the existing header link (About) keeps working.
export default function WhatIDo({ reduced }) {
  const [lit, setLit] = useState(() => (reduced ? [true, true, true] : [false, false, false]));
  const reveal = i => setLit(prev => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))));
  return <section id="about" className="wd" aria-labelledby="wd-title">
    <div className="wd-aside">
      <div className="wd-sticky">
        <p className="hc-label">03 / What I do</p>
        <h2 id="wd-title" className="h-h2">Three disciplines.<br /><span className="sub">One connected practice</span><span className="dot">.</span></h2>
        <EMark u={2.2} className="wd-e" blockClass={i => (lit[Math.floor(i / 2)] || reduced ? (i % 2 ? "is-accent" : "is-ink") : "is-dim")} />
      </div>
    </div>
    <div className="wd-main">
      <p className="wd-intro">My work sits between discovery, interaction design, UI systems and implementation. I care about flows people understand on first use, interfaces that hold up across states and languages, and decisions that survive real build constraints.</p>
      {disciplines.map((d, i) => <Item key={d.title} d={d} i={i} onReveal={reveal} reduced={reduced} />)}
    </div>
  </section>;
}
