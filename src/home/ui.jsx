import { useEffect, useState } from "react";

export function Arrow({ size = 14, kind = "up" }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
    {kind === "up" ? <path d="M3 11L11 3M5 3h6v6" /> : kind === "left" ? <path d="M12 7H2M6 3L2 7l4 4" /> : <path d="M2 7h10M8 3l4 4-4 4" />}
  </svg>;
}

// Header look on the homepage, set with classes (no React render while scrolling).
// tint: optional color for a translucent background while over a colored hero (case studies).
let last = "";
export function setHeaderState({ over, glass, tint = null }) {
  const key = `${over}|${glass}|${tint}`;
  if (key === last) return;
  last = key;
  const bar = document.querySelector(".topbar");
  if (!bar) return;
  bar.classList.toggle("is-over-stage", over);
  bar.classList.toggle("is-glass", glass);
  bar.classList.toggle("is-tinted", Boolean(tint));
  if (tint) bar.style.setProperty("--tint", tint);
  else bar.style.removeProperty("--tint");
}

export function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatch(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);
  return match;
}

export const DESKTOP = "(min-width: 1024px)";
