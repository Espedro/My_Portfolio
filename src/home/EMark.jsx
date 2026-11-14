// The six-block "E" from the site logo (BrandMark), as positioned boxes.
// Proportions match the logo SVG: left column 25, right column 46 (middle bar 34), rows 25, gaps 9 / 3.
export function eRects(u) {
  return [
    [0, 0, 25, 25], [34, 0, 46, 25],
    [0, 28, 25, 25], [34, 28, 34, 25],
    [0, 56, 25, 25], [34, 56, 46, 25],
  ].map(([x, y, w, h]) => [x * u, y * u, w * u, h * u]);
}

export const E_WIDTH = 80;   // in logo units
export const E_HEIGHT = 81;
export const E_RADIUS = 7;

// Static E. `blockStyle(i)` / `blockClass(i)` let callers color or animate each block.
export default function EMark({ u, className = "", blockClass, blockStyle, blockRef }) {
  return <span className={`emark ${className}`} aria-hidden="true"
    style={{ width: E_WIDTH * u, height: E_HEIGHT * u }}>
    {eRects(u).map(([x, y, w, h], i) => <span key={i} ref={blockRef ? el => blockRef(el, i) : undefined}
      className={`emark-block ${blockClass ? blockClass(i) : ""}`}
      style={{ left: x, top: y, width: w, height: h, borderRadius: E_RADIUS * u, ...(blockStyle ? blockStyle(i) : null) }} />)}
  </span>;
}
