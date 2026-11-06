import { profile } from "./pages.js";

export default function Footer() {
  return (<footer className="sitefoot">
<div className="sitefoot-inner">
<span>© {new Date().getFullYear()} Espedro Neptune</span>
<nav className="sitefoot-links" aria-label="Profiles">
{profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>}
<a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
<a href={profile.behance} target="_blank" rel="noreferrer">Behance</a>
</nav>
<span>USA, FL · Working remotely</span>
</div>
</footer>);
}
