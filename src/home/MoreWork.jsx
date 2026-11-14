import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { m as motion, useScroll, useTransform } from "motion/react";
import { moreWork, num, study } from "./homeData.js";
import { Arrow, DESKTOP, useMedia } from "./ui.jsx";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function Card({ c, i, imgX }) {
  const item = study(c.slug);
  return <article className="mw-card" style={{ "--c": c.bg, "--a": c.accent }}>
    <div className="mw-img">
      <motion.img src={item.image} alt={c.alt} loading="lazy" decoding="async" style={imgX ? { x: imgX } : undefined} />
    </div>
    <div className="mw-body">
      <p className="hc-label mw-tags"><span className="mw-num">{num(i)}</span>{c.tags}</p>
      <h3 className="mw-name">{item.name}<span className="mw-dot">.</span></h3>
      <p className="mw-desc">{c.desc}</p>
      <div className="mw-links">
        <Link to={item.path}>Case study<span className="sr-only">: {item.name}</span> <Arrow kind="right" /></Link>
        <a href={item.liveUrl} target="_blank" rel="noreferrer">Live<span className="sr-only">: {item.name} (opens in a new tab)</span> <Arrow /></a>
      </div>
    </div>
  </article>;
}

function Intro() {
  return <div className="mw-intro">
    <h2 className="h-h2">More<br />work<span className="dot">.</span></h2>
    <p>From community to commerce: four more products, each designed and built end to end.</p>
  </div>;
}

export default function MoreWork({ reduced }) {
  const desktop = useMedia(DESKTOP);
  return desktop && !reduced ? <Pinned /> : <Scroller />;
}

// Below 1024px or with reduced motion: native horizontal scroll with snap points.
function Scroller() {
  return <section className="mw mw-native" aria-labelledby="mw-title">
    <p className="hc-label mw-label" id="mw-title">02 / More work</p>
    <div className="mw-native-track" tabIndex={0} role="region" aria-label="More work, scroll horizontally">
      <Intro />
      {moreWork.map((c, i) => <Card key={c.slug} c={c} i={i} />)}
    </div>
  </section>;
}

function Pinned() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const geo = useRef({ dist: 0, centers: [], vw: 1440 });
  const [dist, setDist] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const cards = [...track.querySelectorAll(".mw-card")];
      const vw = window.innerWidth;
      const d = Math.max(0, track.scrollWidth - vw);
      geo.current = { dist: d, vw, centers: cards.map(el => el.offsetLeft + el.offsetWidth / 2) };
      setDist(d);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, p => -p * geo.current.dist);
  const bar = useTransform(scrollYProgress, p => p);
  const count = useTransform(scrollYProgress, p => num(Math.min(moreWork.length - 1, Math.floor(p * moreWork.length))));
  // Parallax: each image drifts against its card's movement (5% of the distance from center, ±38px).
  const imgX = moreWork.map((_, i) => useTransform(x, xv => { // eslint-disable-line react-hooks/rules-of-hooks
    const g = geo.current;
    const center = (g.centers[i] || 0) + xv;
    return clamp(-(center - g.vw / 2) * 0.05, -38, 38);
  }));

  return <section ref={wrapRef} className="mw mw-pinned" aria-labelledby="mw-title" style={{ height: `calc(100vh + ${dist}px)` }}>
    <div className="mw-sticky">
      <div className="mw-head">
        <p className="hc-label" id="mw-title">02 / More work</p>
        <p className="hc-label" aria-hidden="true"><motion.span>{count}</motion.span> / {num(moreWork.length - 1)}</p>
      </div>
      <motion.div ref={trackRef} className="mw-track" style={{ x }}>
        <Intro />
        {moreWork.map((c, i) => <Card key={c.slug} c={c} i={i} imgX={imgX[i]} />)}
      </motion.div>
      <div className="mw-progress" aria-hidden="true"><motion.span style={{ scaleX: bar }} /></div>
    </div>
  </section>;
}
