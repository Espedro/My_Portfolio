import { m as motion } from "motion/react";
import EMark from "./EMark.jsx";

// CSS 3D graphite laptop (from the prototype). Sizes are in unscaled px; the root is scaled by its parent.
// screens: [{ src, opacity: MotionValue }], logoOpacity: MotionValue | number.
export default function Laptop3D({ screens, logoOpacity = 1, logoRef, style, className = "" }) {
  return <motion.div className={`lt-root ${className}`} style={style} aria-hidden="true">
    <div className="lt-lid">
      <div className="lt-face lt-front">
        <div className="lt-screen">
          {screens.map(screen => <motion.img key={screen.src} src={screen.src} alt="" decoding="async"
            style={{ opacity: screen.opacity }} />)}
        </div>
      </div>
      <div className="lt-face lt-back">
        <motion.span className="lt-logo" style={{ opacity: logoOpacity }}>
          <EMark u={0.9} blockRef={logoRef} />
        </motion.span>
      </div>
    </div>
    <div className="lt-base">
      <div className="lt-deck" />
      <div className="lt-keys" />
      <div className="lt-pad" />
      <div className="lt-lip" />
    </div>
  </motion.div>;
}
