import { LazyMotion, domAnimation } from "motion/react";
import { useReducedMotion } from "../components.jsx";
import HeroAndCaseStudies from "../home/HeroAndCaseStudies.jsx";
import Numbers from "../home/Numbers.jsx";
import MoreWork from "../home/MoreWork.jsx";
import WhatIDo from "../home/WhatIDo.jsx";
import HowIUseAI from "../home/HowIUseAI.jsx";
import Tools from "../home/Tools.jsx";
import HowIWork from "../home/HowIWork.jsx";
import Contact from "../home/Contact.jsx";
import "../home/home.css";

// Homepage (redesign from prototype-reference.html). Each section is its own component in src/home/.
export default function Home() {
  const reduced = useReducedMotion();
  return <LazyMotion features={domAnimation} strict><main id="main" className="home2">
    <HeroAndCaseStudies reduced={reduced} />
    <Numbers reduced={reduced} />
    <MoreWork reduced={reduced} />
    <WhatIDo reduced={reduced} />
    <HowIUseAI reduced={reduced} />
    <Tools reduced={reduced} />
    <HowIWork reduced={reduced} />
    <Contact reduced={reduced} />
  </main></LazyMotion>;
}
