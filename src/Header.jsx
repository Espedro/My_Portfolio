import { Link, NavLink, useLocation } from "react-router-dom";
import { BrandMark, ThemeToggle } from "./components.jsx";
import { profile } from "./pages.js";

export default function Header() {
  // On the homepage the header floats over the pinned stage (transparent, then glass). See src/home/ui.jsx.
  const { pathname } = useLocation();
  const overlay = pathname === "/" || pathname === "/index.html";
  return (<header className={overlay ? "topbar topbar--overlay" : "topbar"} data-header={true}>
<div className="topbar-inner">
<Link className="topbar-brand" to="/#top" aria-label="Espedro Neptune, home">
<BrandMark />
<span>Espedro Neptune</span>
</Link>
<div className="topbar-right">
<nav className="topnav" aria-label="Primary">
<Link to="/#work">Work</Link>
<Link to="/#about">About</Link>
<Link to="/#ai">AI</Link>
<Link to="/#contact">Contact</Link>
<NavLink className="topnav-resume" to={profile.resumePage}>Resume</NavLink>
</nav>
<ThemeToggle />
</div>
</div>
</header>);
}
