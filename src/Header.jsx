import { Link } from "react-router-dom";
import { BrandMark, ThemeToggle } from "./components.jsx";
import { profile } from "./pages.js";

export default function Header() {
  return (<header className="topbar" data-header={true}>
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
<a className="topnav-resume" href={profile.resume} target="_blank" rel="noreferrer">Résumé (PDF)</a>
</nav>
<ThemeToggle />
</div>
</div>
</header>);
}
