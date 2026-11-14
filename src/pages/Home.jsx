import { LazyMotion, domAnimation } from "motion/react";
import { useReducedMotion } from "../components.jsx";
import HeroAndCaseStudies from "../home/HeroAndCaseStudies.jsx";
import "../home/home.css";

// Homepage (redesign from prototype-reference.html). Each section is its own component in src/home/.
export default function Home() {
  const reduced = useReducedMotion();
  return <LazyMotion features={domAnimation} strict><main id="main" className="home2">
    <HeroAndCaseStudies reduced={reduced} />
  </main></LazyMotion>;
}
