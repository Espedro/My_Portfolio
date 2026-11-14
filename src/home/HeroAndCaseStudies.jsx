import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { m as motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import Laptop3D from "./Laptop3D.jsx";
import EMark, { eRects, E_HEIGHT, E_RADIUS, E_WIDTH } from "./EMark.jsx";
import { featured, num, study } from "./homeData.js";
import { Arrow, setHeaderState } from "./ui.jsx";

// ---------------------------------------------------------------------------
// Scroll timeline, in viewport heights (H). The stage wrapper is (1 + TOTAL) * 100vh tall.
//   hold 0.28H → morph 1.0H → 3 transitions × 1.1H → end hold 0.47H
// ---------------------------------------------------------------------------
export const HOLD0 = 0.28;
export const MORPH = 1;
export const PRE = HOLD0 + MORPH;
export const L = 1.1;
export const END = 0.47;
export const SPIN_TURNS = 1; // full extra spins per transition: 0, 1 or 2
const N = featured.length;
export const TOTAL = PRE + (N - 1) * L + END;

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = t => t * t * t * (t * (t * 6 - 15) + 10); // quintic smootherstep
const lerp = (a, b, t) => a + (b - a) * t;
const side = j => (j % 2 === 0 ? 1 : -1); // 1 = laptop on the right, copy on the left

const GRADS = [
  "linear-gradient(145deg, #f2f2ef, #8d8f8a)",
  "linear-gradient(145deg, var(--ink), #6f746c)",
  "linear-gradient(145deg, #e3e4e0, #7e817b)",
  "linear-gradient(145deg, #9fa69b, #565c54)",
  "linear-gradient(145deg, var(--muted), #6a6d68)",
  "linear-gradient(145deg, #8f988c, #4d544b)",
];

// Everything that depends on the viewport size, in px.
function geometry(vw, vh, headerH) {
  if (vw >= 1024) {
    const k = Math.min(vw / 1440, vh / 900);
    const eu = 6.1 * k;
    return {
      desktop: true, vw, vh, k, X: 265 * (vw / 1440), scale: 0.86 * k,
      ax: vw / 2, ay: vh * 0.639, shadowY: vh * (700 / 900),
      eu, ex: vw * (1116 / 1440) - (E_WIDTH / 2) * eu, ey: vh * (470 / 900) - (E_HEIGHT / 2) * eu,
      lift: 24 * k, rise: 40 * k, copyTop: null,
    };
  }
  // Below 1024px: laptop centered on top, copy underneath, no side changes.
  const scale = Math.min((vw * 0.62) / 680, (vh * 0.24) / 440);
  const ay = headerH + 36 + 404 * scale;
  const eu = Math.min((vw * 0.34) / E_WIDTH, (vh * 0.16) / E_HEIGHT);
  return {
    desktop: false, vw, vh, k: scale / 0.86, X: 0, scale,
    ax: vw / 2, ay, shadowY: ay + 70 * scale,
    eu, ex: vw - 20 - E_WIDTH * eu, ey: vh - 88 - E_HEIGHT * eu,
    lift: 14, rise: 24, copyTop: ay + 130 * scale + 20,
  };
}

// The whole stage state for a scroll position v (in H).
function compute(v, g) {
  const m = clamp((v - HOLD0) / MORPH);
  const restAngle = j => (g.desktop ? (side(j) === 1 ? -24 : 24) : 0);
  const copy = featured.map(() => [0, 0]);
  let b, eE, lx, ty, sc, ry, showIdx, lapOp, uiOp, heroOp, heroDy, slideRL;

  if (v < PRE) {
    // Morph: hero fades, laptop rises showing its back, the E lands on it, then it spins to the screen.
    b = 0;
    eE = ease(clamp((m - 0.55) / 0.45));
    const le = ease(clamp((m - 0.12) / 0.33));
    const spin = ease(clamp((m - 0.58) / 0.42));
    lapOp = le; lx = side(0) * g.X; ty = g.rise * (1 - le); sc = 0.94 + 0.06 * le;
    ry = 160 - (160 - restAngle(0)) * spin;
    showIdx = 0;
    uiOp = clamp((m - 0.72) / 0.28);
    const h = clamp(m / 0.4);
    heroOp = 1 - h; heroDy = -60 * h;
    const o0 = clamp((m - 0.78) / 0.22);
    copy[0] = [o0, 28 * (1 - o0)];
    slideRL = true;
  } else {
    const raw = clamp((v - PRE) / L, 0, N - 1);
    const a = Math.min(Math.floor(raw), N - 2);
    const f = raw - a;
    const e = ease(clamp((f - 0.28) / 0.6));   // laptop leads
    eE = ease(clamp((f - 0.36) / 0.58));       // color follows ~8% behind
    b = a + 1;
    lx = lerp(side(a) * g.X, side(b) * g.X, e);
    const arc = Math.sin(Math.PI * e);
    ty = -g.lift * arc; sc = 1 + (0.04 / 0.86) * arc;
    const dir = g.desktop ? (side(a) === 1 ? -1 : 1) : (a % 2 === 0 ? -1 : 1);
    ry = restAngle(a) + e * (restAngle(b) - restAngle(a) + 360 * SPIN_TURNS * dir);
    showIdx = e < 0.5 ? a : b;
    lapOp = 1; uiOp = 1; heroOp = 0; heroDy = -60;
    const o1 = clamp(e / 0.4);
    copy[a] = [1 - o1, -28 * o1];
    const o2 = clamp((e - 0.6) / 0.4);
    copy[b] = [o2, 28 * (1 - o2)];
    slideRL = side(a) === 1;
  }

  // Background wipe for the incoming project b (edge in % of the stage).
  const edge = g.desktop ? (slideRL ? 100 * (1 - eE) : 100 * eE) : 100 * (1 - eE);
  const wipe = g.desktop
    ? (slideRL ? `inset(0 0 0 ${edge.toFixed(2)}%)` : `inset(0 ${(100 - edge).toFixed(2)}% 0 0)`)
    : `inset(${edge.toFixed(2)}% 0 0 0)`;
  const clips = featured.map((_, j) => (j < b ? "inset(0 0 0 0)" : j === b ? wipe : g.desktop ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)"));

  const landing = v < PRE && m < 0.5;
  const tilt = ease(clamp(m / 0.45));
  return {
    m, lx, ty, sc, ry, showIdx, lapOp, uiOp, heroOp, heroDy, copy, clips, b, edge,
    lineOp: eE > 0.002 && eE < 0.995 ? 0.9 : 0,
    wipeOn: eE > 0.0005,
    vignOp: v < PRE ? ease(m) : 1,
    logoOp: landing ? 0 : 1,
    tilesOp: landing ? 1 : 0,
    tiltY: lerp(-16, 0, tilt), tiltX: lerp(6, 0, tilt),
    tiles: [0, 1, 2, 3, 4, 5].map(i => ease(clamp((m - i * 0.025) / 0.36))), // staggered ~2.5% each
    // discrete state for accessibility (inert / aria-hidden) and the index bar
    phase: [heroOp > 0.5 ? 1 : 0, copy.findIndex(c => c[0] > 0.5), uiOp > 0.5 ? 1 : 0, showIdx].join(","),
  };
}

function useViewport() {
  const read = () => {
    const header = document.querySelector(".topbar");
    return { vw: window.innerWidth, vh: window.innerHeight, headerH: header ? header.offsetHeight : 72 };
  };
  const [vp, setVp] = useState(read);
  // The header mounts in the same commit as the page, so read its real height once it exists.
  useLayoutEffect(() => { setVp(prev => { const next = read(); return next.headerH === prev.headerH ? prev : next; }); }, []);
  useEffect(() => {
    const onResize = () => setVp(prev => {
      const next = read();
      // Ignore small height-only changes (mobile URL bar) so the stage doesn't jump while scrolling.
      if (next.vw === prev.vw && Math.abs(next.vh - prev.vh) < 120 && next.headerH === prev.headerH) return prev;
      return next;
    });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return vp;
}

export default function HeroAndCaseStudies({ reduced }) {
  return reduced ? <StaticStage /> : <AnimatedStage />;
}

// ---------------------------------------------------------------------------
// Animated stage (default)
// ---------------------------------------------------------------------------
function AnimatedStage() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const logoEls = useRef([]);
  const vp = useViewport();
  const [g, setG] = useState(() => geometry(vp.vw, vp.vh, vp.headerH));
  useLayoutEffect(() => { setG(geometry(vp.vw, vp.vh, vp.headerH)); }, [vp]);

  // Refs read by the scroll transforms, so they never need React to re-render.
  const geoRef = useRef(g);
  geoRef.current = g;
  const fromRef = useRef([]);
  fromRef.current = eRects(g.eu).map(([x, y, w, h]) => [g.ex + x, g.ey + y, w, h]);
  const toRef = useRef(fromRef.current);
  const version = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const cache = useRef({ key: "", value: null });
  const calc = v => {
    const key = `${v}|${version.get()}`;
    if (cache.current.key !== key) cache.current = { key, value: compute(v, geoRef.current) };
    return cache.current.value;
  };
  const s = useTransform(scrollYProgress, p => p * TOTAL);
  const src = { s, version, calc };

  // Measure where the logo blocks on the back of the lid really are (ghost laptop in landing pose).
  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const sr = stage.getBoundingClientRect();
      const rects = logoEls.current.map(el => {
        const r = el.getBoundingClientRect();
        return [r.left - sr.left, r.top - sr.top, r.width, r.height];
      });
      if (rects.length === 6 && rects.every(r => r[2] > 0)) toRef.current = rects;
      version.set(version.get() + 1);
    };
    measure();
    const frame = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(frame);
  }, [g, version]);

  // Discrete phase: only changes a handful of times over the whole stage.
  const [phase, setPhase] = useState("1,-1,0,0");
  const sync = () => setPhase(calc(s.get()).phase);
  useMotionValueEvent(s, "change", sync);
  useMotionValueEvent(version, "change", sync);

  // Header: transparent over the stage, light text over the colors, glass once the stage has passed.
  const { scrollY } = useScroll();
  const headerSync = () => {
    const wrap = wrapRef.current;
    const bar = document.querySelector(".topbar");
    if (!wrap || !bar) return;
    const rect = wrap.getBoundingClientRect();
    const glass = rect.bottom <= bar.offsetHeight;
    const over = !glass && -rect.top > (HOLD0 + MORPH * 0.6) * window.innerHeight;
    setHeaderState({ over, glass });
  };
  useMotionValueEvent(scrollY, "change", headerSync);
  useEffect(() => { headerSync(); sync(); return () => setHeaderState({ over: false, glass: false }); }, []);

  const [heroOn, copyOn, uiOn, show] = phase.split(",").map(Number);

  const goTo = j => {
    const wrap = wrapRef.current;
    const top = window.scrollY + wrap.getBoundingClientRect().top;
    const dist = wrap.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((PRE + j * L) / TOTAL) * dist, behavior: "smooth" });
  };

  const d = fn => useTransform([s, version], ([v]) => fn(calc(v))); // eslint-disable-line react-hooks/rules-of-hooks
  const heroOp = d(c => c.heroOp);
  const heroY = d(c => c.heroDy);
  const uiOp = d(c => c.uiOp);
  const vign = d(c => c.vignOp);
  const lapOp = d(c => c.lapOp);
  const lx = d(c => c.lx);
  const ty = d(c => c.ty);
  const sc = d(c => c.sc * geoRef.current.scale);
  const ry = d(c => c.ry);
  const logoOp = d(c => c.logoOp);
  const tilesOp = d(c => c.tilesOp);
  const tiltX = d(c => c.tiltX);
  const tiltY = d(c => c.tiltY);

  const eCenter = [g.ex + (E_WIDTH * g.eu) / 2, g.ey + (E_HEIGHT * g.eu) / 2];
  const sceneOrigin = g.desktop ? "50% 52%" : `50% ${g.ay - 160 * g.scale}px`;
  const ghostPose = { x: side(0) * g.X, y: 0, scale: g.scale, rotateX: -13, rotateY: 160 };

  return <section ref={wrapRef} className="hc" aria-labelledby="hero-title" style={{ height: `${(1 + TOTAL) * 100}vh` }}>
    <span id="work" className="hc-anchor" style={{ top: `${PRE * 100}vh` }} />
    <div ref={stageRef} className={`hc-stage ${g.desktop ? "is-desktop" : "is-compact"}`}
      style={{ "--k": g.k, "--copy-top": g.copyTop ? `${g.copyTop}px` : undefined }}>

      <div className="hc-bg" aria-hidden="true" />
      {featured.map((p, j) => <Layer key={p.slug} j={j} p={p} src={src} desktop={g.desktop} />)}
      <motion.div className="hc-vignette" aria-hidden="true" style={{ opacity: vign }} />

      {/* Hero copy */}
      <motion.div className="hc-hero" style={{ opacity: heroOp, y: heroY }} inert={!heroOn} aria-hidden={!heroOn}>
        <HeroCopy />
      </motion.div>

      {/* Section labels */}
      <motion.div className="hc-labels" style={{ opacity: uiOp }}>
        <h2 className="hc-label">01 / Selected work</h2>
        <span className="hc-label" aria-hidden="true">Design. Build. Make it real.</span>
      </motion.div>

      {/* Floor shadow + laptop */}
      <motion.div className="hc-floor" aria-hidden="true"
        style={{ opacity: lapOp, x: lx, left: g.ax - 310 * g.k, top: g.shadowY, width: 620 * g.k, height: 70 * g.k }} />
      <motion.div className="hc-scene" aria-hidden="true" style={{ opacity: lapOp, perspectiveOrigin: sceneOrigin }}>
        <Laptop3D className="hc-laptop"
          style={{ left: g.ax, top: g.ay, x: lx, y: ty, scale: sc, rotateX: -13, rotateY: ry }}
          logoOpacity={logoOp}
          screens={featured.map((p, j) => ({ src: study(p.slug).image, opacity: d(c => (c.showIdx === j ? 1 : 0)) }))} />
      </motion.div>
      {/* Invisible copy of the laptop in its landing pose, used only to measure the logo position. */}
      <div className="hc-scene hc-ghost" aria-hidden="true" style={{ perspectiveOrigin: sceneOrigin }}>
        <Laptop3D style={{ left: g.ax, top: g.ay, ...ghostPose }} screens={[]}
          logoRef={(el, i) => { if (el) logoEls.current[i] = el; }} />
      </div>

      {/* The six E tiles: the hero object that becomes the laptop logo */}
      <motion.div className="hc-tiles" aria-hidden="true"
        style={{ opacity: tilesOp, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400, originX: `${eCenter[0]}px`, originY: `${eCenter[1]}px` }}>
        {fromRef.current.map((r, i) => <Tile key={i} i={i} rect={r} radius={E_RADIUS * g.eu} src={src} fromRef={fromRef} toRef={toRef} />)}
      </motion.div>

      {/* Case-study copy, always on the side opposite the laptop */}
      {featured.map((p, j) => <CaseCopy key={p.slug} j={j} p={p} src={src} active={copyOn === j} desktop={g.desktop} />)}

      {/* Index bar */}
      <motion.nav className="hc-index" aria-label="Selected case studies" style={{ opacity: uiOp }} inert={!uiOn}>
        <div className="hc-index-head">
          <span className="hc-label">A closer look</span>
          <span className="hc-label"><span className="hc-index-count">{num(show)}</span> / {num(N - 1)}</span>
        </div>
        <div className="hc-index-grid">
          {featured.map((p, j) => <button key={p.slug} type="button" onClick={() => goTo(j)}
            className={j === show ? "is-active" : ""} aria-current={j === show ? "true" : undefined}>
            <span className="hc-index-bar" style={{ background: j === show ? p.accent : "rgba(244,244,239,0.35)", transform: `scaleX(${j <= show ? 1 : 0})` }} />
            <span className="hc-index-num">{num(j)}</span>
            <span className="hc-index-name">{study(p.slug).name}</span>
          </button>)}
        </div>
      </motion.nav>
    </div>
  </section>;
}

function useD(src, fn) {
  return useTransform([src.s, src.version], ([v]) => fn(src.calc(v)));
}

function Layer({ j, p, src, desktop }) {
  const clip = useD(src, c => c.clips[j]);
  // Layers that haven't started their wipe are also hidden, so nothing (not even tools that ignore clip-path) sees them.
  const shown = useD(src, c => (j < c.b || (j === c.b && c.wipeOn) ? 1 : 0));
  const lineOp = useD(src, c => (c.b === j ? c.lineOp : 0));
  const pos = useD(src, c => `${c.edge}%`);
  return <>
    <motion.div className="hc-layer" aria-hidden="true" style={{ background: p.bg, clipPath: clip, opacity: shown }} />
    {/* Full-size layer with a 2px edge line, moved by a % of the stage so no layout is touched. */}
    <motion.div className="hc-wipe" aria-hidden="true"
      style={{ opacity: lineOp, backgroundImage: `linear-gradient(${desktop ? "90deg" : "180deg"}, ${p.accent} 0 2px, transparent 2px)`, ...(desktop ? { x: pos } : { y: pos }) }} />
  </>;
}

function Tile({ i, rect, radius, src, fromRef, toRef }) {
  const pick = (c, f) => {
    const t = c.tiles[i];
    const from = fromRef.current[i];
    const to = toRef.current[i] || from;
    return f(t, from, to);
  };
  const x = useD(src, c => pick(c, (t, a, b) => lerp(0, b[0] - a[0], t)));
  const y = useD(src, c => pick(c, (t, a, b) => lerp(0, b[1] - a[1], t)));
  const scaleX = useD(src, c => pick(c, (t, a, b) => lerp(1, b[2] / a[2], t)));
  const scaleY = useD(src, c => pick(c, (t, a, b) => lerp(1, b[3] / a[3], t)));
  const gray = useD(src, c => clamp((c.tiles[i] - 0.7) / 0.2));
  const shadow = useD(src, c => 1 - c.tiles[i]);
  return <motion.div className="hc-tile"
    style={{ left: rect[0], top: rect[1], width: rect[2], height: rect[3], borderRadius: radius, x, y, scaleX, scaleY, originX: 0, originY: 0 }}>
    <motion.span className="hc-tile-shadow" style={{ opacity: shadow, borderRadius: radius }} />
    <span className="hc-tile-face" style={{ background: GRADS[i], borderRadius: radius }} />
    <motion.span className="hc-tile-gray" style={{ opacity: gray, borderRadius: radius }} />
  </motion.div>;
}

function CaseCopy({ j, p, src, active, desktop }) {
  const opacity = useD(src, c => c.copy[j][0]);
  const y = useD(src, c => c.copy[j][1]);
  const item = study(p.slug);
  const where = desktop ? (side(j) === 1 ? "is-left" : "is-right") : "is-below";
  return <motion.article className={`hc-copy ${where}`} style={{ opacity, y }} inert={!active} aria-hidden={!active}>
    <CaseCopyBody j={j} p={p} item={item} />
  </motion.article>;
}

function CaseCopyBody({ j, p, item }) {
  return <>
    <div className="hc-copy-num">
      <span className="hc-copy-n" style={{ color: p.accent }}>{num(j)}</span>
      <span className="hc-copy-dash" aria-hidden="true" />
      <span className="hc-label">Selected case study</span>
    </div>
    <p className="hc-label hc-tags">{p.tags}</p>
    <h3 className="hc-name">{item.name}<span style={{ color: p.accent }}>.</span></h3>
    <p className="hc-desc">{p.desc}</p>
    <dl className="hc-practice"><dt className="hc-label">Practice</dt><dd>{p.practice}</dd></dl>
    <div className="hc-links">
      <Link to={item.path}>View case study<span className="sr-only">: {item.name}</span> <Arrow /></Link>
      <a href={item.liveUrl} target="_blank" rel="noreferrer">Live product<span className="sr-only">: {item.name} (opens in a new tab)</span> <Arrow /></a>
    </div>
  </>;
}

function HeroCopy() {
  return <div className="hc-hero-inner">
    <div className="hc-hero-top hc-label">
      <span>Independent by nature. Connected by design.</span>
      <span>Portfolio — Vol. 01</span>
    </div>
    <div className="hc-hero-main">
      <span className="hc-label">+ Espedro Neptune</span>
      <h1 id="hero-title" className="hc-h1">Designing<br />experiences.<br /><span className="sub">Engineering<br />possibilities</span><span className="dot">.</span></h1>
      <p className="hc-lede">I bridge human-centered design, modern engineering, and AI to turn complex ideas into meaningful digital products.</p>
      <Link className="hc-cta" to="/#work"><span className="hc-cta-ring"><Arrow size={16} /></span>Explore selected work</Link>
    </div>
    <div className="hc-hero-bottom">
      <span>AI Engineer · UX Engineer · Product Designer</span>
      <span aria-hidden="true">Scroll to unfold ↓</span>
    </div>
  </div>;
}

// ---------------------------------------------------------------------------
// Reduced motion: no pinning, no scrubbing. Hero, then one calm panel per case study.
// ---------------------------------------------------------------------------
function StaticStage() {
  useEffect(() => {
    const sync = () => setHeaderState({ over: false, glass: window.scrollY > 8 });
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => { window.removeEventListener("scroll", sync); setHeaderState({ over: false, glass: false }); };
  }, []);
  return <>
    <section className="hs-hero" aria-labelledby="hero-title">
      <HeroCopy />
      <EMark u={4} className="hs-e" />
    </section>
    <section id="work" className="hs-work" aria-labelledby="hs-work-title">
      <h2 id="hs-work-title" className="sr-only">Selected work</h2>
      {featured.map((p, j) => {
        const item = study(p.slug);
        return <article key={p.slug} className="hs-panel" style={{ background: p.bg }}>
          <div className="hs-panel-inner">
            <div className="hc-copy is-static"><CaseCopyBody j={j} p={p} item={item} /></div>
            <div className="hs-shot"><img src={item.image} alt="" loading="lazy" decoding="async" /></div>
          </div>
        </article>;
      })}
    </section>
  </>;
}
