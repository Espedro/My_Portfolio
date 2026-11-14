import { Link, NavLink, useLocation } from "react-router-dom";
import { BrandMark, ThemeToggle } from "./components.jsx";
import { profile } from "./pages.js";

const links = [
  ["Work", "/#work"],
  ["About", "/#about"],
  ["AI", "/#ai"],
  ["Contact", "/#contact"],
];

export default function Header() {
  // On the homepage and the case studies the header floats over a full-bleed hero
  // (transparent, light text over color, then glass). Classes are set from scroll: see src/home/ui.jsx.
  const { pathname } = useLocation();
  const overlay = pathname === "/" || pathname === "/index.html" || pathname.startsWith("/case-studies/");
  return (<header className={overlay ? "topbar topbar--overlay" : "topbar"} data-header={true}>
<div className="topbar-inner">
<Link className="topbar-brand" to="/#top" aria-label="Espedro Neptune, home">
<BrandMark />
<span className="topbar-name" aria-hidden="true">Espedro<br />Neptune</span>
</Link>
<div className="topbar-right">
<nav className="topnav" aria-label="Primary">
{links.map(([label, to], i) => <Link key={to} to={to}><span className="topnav-num" aria-hidden="true">0{i + 1}</span>{label}</Link>)}
<NavLink className="topnav-resume" to={profile.resumePage}><span className="topnav-num" aria-hidden="true">05</span>Resume</NavLink>
</nav>
<a className="topbar-talk" href={profile.calendly} target="_blank" rel="noreferrer">Let’s talk<span className="sr-only"> (book a call, opens in a new tab)</span>
<svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" focusable="false"><path d="M3 11L11 3M5 3h6v6" /></svg></a>
<ThemeToggle />
</div>
</div>
</header>);
}
