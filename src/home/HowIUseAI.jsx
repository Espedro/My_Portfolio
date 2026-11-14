import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValueEvent, useScroll } from "motion/react";
import { num, principles } from "./homeData.js";
import { DESKTOP, useMedia } from "./ui.jsx";

// Diagram drawn with positioned boxes in a 700×560 box (scaled to fit). Groups light up with the active principle:
// 0 hand-off + person, 1 guardrails, 2 status bar, 3 workflow lane.
function Diagram({ act, all }) {
  const on = g => (all || act === g ? "is-on" : "");
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / 700)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return <div ref={wrapRef} className="ai-diagram-wrap" aria-hidden="true" style={{ height: 560 * scale }}>
    <div className="ai-diagram" style={{ transform: `scale(${scale})` }}>
      <div className={`ai-box ai-status g ${on(2)}`}>
        <span><i className="ai-dot is-green" />Channels connected</span>
        <span>Response time</span>
        <span>Automation health</span>
        <span><i className="ai-dot is-accent" />Hand-off status</span>
      </div>
      <div className="ai-line" style={{ left: 170, top: 171, width: 75 }} />
      <div className="ai-line" style={{ left: 415, top: 171, width: 75 }} />
      <div className="ai-packet" />
      <div className={`ai-vline g ${on(0)}`} style={{ left: 585, top: 204, height: 96 }} />
      <div className={`ai-vline g ${on(1)}`} style={{ left: 330, top: 204, height: 56 }} />
      <div className="ai-box ai-node" style={{ left: 0, top: 140, width: 170 }}>Incoming lead<small>WhatsApp · IG · FB</small></div>
      <div className="ai-box ai-node is-ai" style={{ left: 245, top: 140, width: 170 }}>AI Employee<small>answers routine</small></div>
      <div className={`ai-box ai-node g ${on(0)}`} style={{ left: 490, top: 140, width: 200 }}>Hand-off rule<small>judgment needed?</small></div>
      <div className={`ai-box ai-node ai-person g ${on(0)}`} style={{ left: 490, top: 300, width: 200 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>A person decides
      </div>
      <div className={`ai-box ai-node g ${on(1)}`} style={{ left: 220, top: 260, width: 220, height: 80 }}>Guardrails<small>cites sources · says “not in the docs”</small></div>
      <div className={`ai-lane g ${on(3)}`}>
        <span>Claude · ChatGPT · Lovable</span><b>→</b><span>Knowledge files + phased prompts</span><b>→</b><span className="ai-lane-end">Live product</span>
      </div>
    </div>
  </div>;
}

function Copy({ act, all, itemRef }) {
  return <div className="ai-copy">
    <p className="hc-label">04 / How I use AI</p>
    <h2 id="ai-title" className="h-h2 ai-h2">AI where it helps.<br /><span className="sub">A human where judgment matters</span><span className="dot">.</span></h2>
    <ol className="ai-principles">
      {principles.map((p, i) => <li key={p.title} ref={itemRef ? el => itemRef(el, i) : undefined} className={all || act === i ? "is-on" : ""}>
        <span className="ai-num">{num(i)}</span>
        <div><h3>{p.title}</h3><p>{p.text}</p></div>
      </li>)}
    </ol>
  </div>;
}

export default function HowIUseAI({ reduced }) {
  const desktop = useMedia(DESKTOP);
  if (reduced) return <section id="ai" className="ai ai-flow" aria-labelledby="ai-title"><Copy all /><Diagram all /></section>;
  return desktop ? <Pinned /> : <Stacked />;
}

// Desktop: pinned for 2H; each quarter of the scroll activates the next principle.
function Pinned() {
  const ref = useRef(null);
  const [act, setAct] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", p => {
    const next = Math.min(3, Math.floor(p * 4));
    setAct(prev => (prev === next ? prev : next));
  });
  return <section ref={ref} id="ai" className="ai ai-pinned" aria-labelledby="ai-title">
    <div className="ai-sticky"><Copy act={act} /><Diagram act={act} /></div>
  </section>;
}

// Below 1024px: stacked; the principle closest to the middle of the screen is active.
function Stacked() {
  const [act, setAct] = useState(0);
  const els = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setAct(Number(e.target.dataset.i)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    els.current.forEach((el, i) => { if (el) { el.dataset.i = i; io.observe(el); } });
    return () => io.disconnect();
  }, []);
  return <section id="ai" className="ai ai-flow" aria-labelledby="ai-title">
    <Copy act={act} itemRef={(el, i) => { els.current[i] = el; }} />
    <Diagram act={act} />
  </section>;
}
