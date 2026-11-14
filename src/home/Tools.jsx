import { toolRows } from "./homeData.js";

function Chips({ groups, hidden }) {
  return <div className="tl-set" aria-hidden={hidden || undefined}>
    {groups.flatMap(([cat, items]) => [
      <span key={cat} className="tl-chip is-cat">{cat}</span>,
      ...items.map(item => <span key={`${cat}-${item}`} className="tl-chip">{item}</span>),
    ])}
  </div>;
}

export default function Tools({ reduced }) {
  return <section className="tl" aria-labelledby="tl-title">
    <div className="tl-head">
      <div>
        <p className="hc-label">05 / Tools</p>
        <h2 id="tl-title" className="h-h2 tl-h2">The stack behind the work<span className="dot">.</span></h2>
      </div>
      {!reduced && <p className="tl-hint" aria-hidden="true">Hover a row to pause</p>}
    </div>
    {toolRows.map((groups, r) => <div key={r} className={`tl-row ${reduced ? "is-static" : ""}`}>
      <div className={`tl-track ${r % 2 ? "is-rev" : ""}`}>
        <Chips groups={groups} />
        {/* Copies for a seamless loop; the short last row is repeated so it always fills the screen. */}
        {!reduced && groups.length === 1 && <Chips groups={groups} hidden />}
        {!reduced && <Chips groups={groups.length === 1 ? groups.concat(groups) : groups} hidden />}
      </div>
    </div>)}
  </section>;
}
