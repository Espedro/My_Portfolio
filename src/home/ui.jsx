import { useEffect, useState } from "react";

export function Arrow({ size = 14, kind = "up" }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
    {kind === "up" ? <path d="M3 11L11 3M5 3h6v6" /> : <path d="M2 7h10M8 3l4 4-4 4" />}
  </svg>;
}

// Header look on the homepage, set with classes (no React render while scrolling).
let last = "";
export function setHeaderState({ over, glass }) {
  const key = `${over}|${glass}`;
  if (key === last) return;
  last = key;
  const bar = document.querySelector(".topbar");
  if (!bar) return;
  bar.classList.toggle("is-over-stage", over);
  bar.classList.toggle("is-glass", glass);
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
