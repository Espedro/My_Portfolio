import { useEffect, useRef, useState } from 'react';

// Intrinsic sizes for every image in /public/assets: lets the browser reserve space (no layout shift).
const imageSizes = {
  '/assets/ai-bos-crm-live.jpg': [1600, 1000],
  '/assets/believerhub-landing.jpg': [1600, 700],
  '/assets/believerhub-live.jpg': [1600, 731],
  '/assets/footlakay-live.jpg': [1600, 745],
  '/assets/maket-lakay-live.png': [1600, 1000],
  '/assets/media-innovation-live.jpg': [1600, 900],
  '/assets/espedro-portrait.jpg': [560, 494],
  '/assets/kominote-konbit-live.jpg': [1600, 1000],
  '/assets/kominote-konbit-hero.jpg': [1600, 1000],
  '/assets/kominote-konbit-odette.jpg': [1600, 1000],
  '/assets/votpam-live.jpg': [1600, 1000],
  '/assets/votpam-polls.jpg': [1600, 1000],
  '/assets/votpam-candidates.jpg': [1600, 1000],
  '/assets/agrodoc-live.jpg': [1600, 1000],
};

export function Img({ src, alt, priority = false, ...rest }) {
  const [width, height] = imageSizes[src] || [];
  return <img src={src} alt={alt} width={width} height={height}
    loading={priority ? 'eager' : 'lazy'} decoding={priority ? 'auto' : 'async'}
    fetchPriority={priority ? 'high' : undefined} {...rest} />;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

// Animated logo mark from the original site: pieces rise in one by one on load
// and shift apart on hover/tap. Respects prefers-reduced-motion via CSS.
export function BrandMark() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const timer = useRef();
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => { cancelAnimationFrame(frame); clearTimeout(timer.current); };
  }, []);
  return <span className={`brand-mark ${ready ? 'is-logo-ready' : ''} ${active ? 'is-logo-active' : ''}`}
    onPointerEnter={() => {
      setActive(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setActive(false), 520);
    }}>
    <svg className="brand-logo" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      {[[8, 8, 25], [42, 8, 46], [8, 36, 25], [42, 36, 34], [8, 64, 25], [42, 64, 46]].map(([x, y, width], i) =>
        <rect key={i} className="logo-piece" style={{ '--logo-delay': `${40 + i * 60}ms` }} x={x} y={y} width={width} height="25" rx="7" />)}
    </svg>
  </span>;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  // Follow the operating system until the visitor picks a theme explicitly.
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)');
    const update = event => { try { if (!localStorage.getItem('theme-chosen')) setTheme(event.matches ? 'dark' : 'light'); } catch {} };
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const dark = theme === 'dark';
  return <button className="theme-btn" type="button" aria-pressed={dark}
    aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    onClick={() => {
      const next = dark ? 'light' : 'dark';
      try { localStorage.setItem('theme', next); localStorage.setItem('theme-chosen', '1'); } catch {}
      setTheme(next);
    }}>
    {dark
      ? <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" /></svg>
      : <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>}
  </button>;
}
