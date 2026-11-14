import { useEffect, useRef, useState } from "react";
import { m as motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import EMark from "./EMark.jsx";
import { num, steps } from "./homeData.js";
import { DESKTOP, useMedia } from "./ui.jsx";

const POS = [0, 1 / 3, 2 / 3, 1];
// The E builds itself 1 → 3 → 5 → 6 blocks: left column top to bottom, then right top, right bottom, right middle.
const ORDER = [0, 2, 4, 1, 5, 3];
const BUILD = [0, 1, 3, 5, 6];

function Head({ reached }) {
  const shown = BUILD[reached];
  return <div className="hw-head">
    <div>
      <p className="hc-label">06 / How I work</p>
      <h2 id="hw-title" className="h-h2">Understand. Structure.<br /><span className="sub">Design. Build</span><span className="dot">.</span></h2>
    </div>
    <EMark u={2.2} className="hw-e" blockClass={i => (ORDER.indexOf(i) < shown ? "is-ink" : "is-off")} />
  </div>;
}

function Steps({ reached, itemRef }) {
  return <ol className="hw-steps">
    {steps.map((s, i) => <li key={s.title} ref={itemRef ? el => itemRef(el, i) : undefined} className={i < reached ? "is-on" : ""}>
      <span className="hw-dot" aria-hidden="true" />
      <span className="hw-num">{num(i)}</span>
      <h3>{s.title}</h3>
      <p>{s.text}</p>
    </li>)}
  </ol>;
}

export default function HowIWork({ reduced }) {
  const desktop = useMedia(DESKTOP);
  if (reduced) return <section id="process" className="hw hw-flow" aria-labelledby="hw-title"><Head reached={4} /><div className="hw-vline is-full" aria-hidden="true" /><Steps reached={4} /></section>;
  return desktop ? <Pinned /> : <Stacked />;
}

function Pinned() {
  const ref = useRef(null);
  const [reached, setReached] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const fill = useTransform(scrollYProgress, p => p);
  const update = () => {
    const p = scrollYProgress.get();
    // Nothing is reached until the section is mostly on screen.
    const next = enter.get() < 0.33 ? 0 : POS.filter(x => p >= x - 0.02).length;
    setReached(prev => (prev === next ? prev : next));
  };
  useMotionValueEvent(scrollYProgress, "change", update);
  useMotionValueEvent(enter, "change", update);
  return <section ref={ref} id="process" className="hw hw-pinned" aria-labelledby="hw-title">
    <div className="hw-sticky">
      <Head reached={reached} />
      <div className="hw-line" aria-hidden="true"><motion.span style={{ scaleX: fill }} /></div>
      <Steps reached={reached} />
    </div>
  </section>;
}

function Stacked() {
  const [reached, setReached] = useState(0);
  const els = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setReached(prev => Math.max(prev, Number(e.target.dataset.i) + 1)); });
    }, { rootMargin: "0px 0px -40% 0px" });
    els.current.forEach((el, i) => { if (el) { el.dataset.i = i; io.observe(el); } });
    return () => io.disconnect();
  }, []);
  return <section id="process" className="hw hw-flow" aria-labelledby="hw-title">
    <Head reached={reached} />
    <Steps reached={reached} itemRef={(el, i) => { els.current[i] = el; }} />
  </section>;
}
