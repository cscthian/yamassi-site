import * as React from "react";

/**
 * App screens shown inside the landing hero window. One screen per hero
 * scenario: they crossfade as the conversation moves on, like a short video
 * of the product. Colours come from CSS variables set by each vertical:
 * --scr-bg (window backdrop), --scr-accent, --scr-accent-soft, --scr-ink.
 */

export type ScreenTone = "ok" | "warn" | "bad" | "info" | "muted";

export type ScreenRow = {
  title: string;
  meta?: string;
  /** Right-hand value, e.g. a subtotal. */
  value?: string;
  tag?: { label: string; tone: ScreenTone };
};

export type ScreenData = {
  /** Window title bar, e.g. "Panel Salón & Comandas — Turno Almuerzo". */
  title: string;
  status?: { label: string; tone: ScreenTone };
  /** Small heading above the rows. */
  heading?: string;
  subheading?: string;
  rows: ScreenRow[];
  /** Totals block at the bottom. */
  totals?: { label: string; value: string; strong?: boolean }[];
  footer?: string;
};

export const SCREEN_CSS = `
.cnl-scr-stage{position:absolute;inset:0;background:var(--scr-bg);overflow:hidden}
.cnl-scr-stage::before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.09) 1px,transparent 1px);background-size:22px 22px;mask-image:linear-gradient(180deg,#000,transparent 85%)}
.cnl-scr{position:absolute;z-index:1;left:50%;top:22px;width:min(420px,calc(100% - 28px));transform:translateX(-50%) scale(.98);opacity:0;transition:opacity .7s ease,transform .9s cubic-bezier(.16,1,.3,1);border-radius:16px;background:#fff;color:var(--scr-ink);box-shadow:0 40px 80px -30px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.08);overflow:hidden;font:400 12.5px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:left;pointer-events:none}
.cnl-scr.is-on{opacity:1;transform:translateX(-50%) scale(1)}
.cnl-scr-bar{display:flex;align-items:center;gap:10px;padding:10px 14px;background:#f5f6f8;border-bottom:1px solid rgba(0,0,0,.06)}
.cnl-scr-dots{display:flex;gap:5px;flex:none}
.cnl-scr-dots i{width:8px;height:8px;border-radius:50%;background:#d6d8dd}
.cnl-scr-dots i:first-child{background:var(--scr-accent)}
.cnl-scr-title{flex:1;min-width:0;font-weight:700;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#3a3f4a}
.cnl-scr-body{padding:14px 16px 16px}
.cnl-scr-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.cnl-scr-head b{font-size:14px;font-weight:800}
.cnl-scr-head span{font-size:11px;color:#6b7280}
.cnl-scr-rows{margin-top:10px;display:flex;flex-direction:column}
.cnl-scr-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px dashed rgba(0,0,0,.08)}
.cnl-scr-row:first-child{border-top:0}
.cnl-scr-row-main{flex:1;min-width:0}
.cnl-scr-row-main b{display:block;font-weight:700;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cnl-scr-row-main small{display:block;font-size:10.5px;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cnl-scr-row-val{flex:none;font-weight:800;font-variant-numeric:tabular-nums}
.cnl-scr-tag{flex:none;font-size:9.5px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;padding:4px 7px;border-radius:999px}
.cnl-scr-tag[data-t=ok]{background:#dcfce7;color:#166534}
.cnl-scr-tag[data-t=warn]{background:#fef3c7;color:#92400e}
.cnl-scr-tag[data-t=bad]{background:#fee2e2;color:#991b1b}
.cnl-scr-tag[data-t=info]{background:var(--scr-accent-soft);color:var(--scr-ink)}
.cnl-scr-tag[data-t=muted]{background:#f1f2f4;color:#4b5563}
.cnl-scr-totals{margin-top:10px;padding:10px 12px;border-radius:12px;background:#f7f7f9;display:flex;flex-direction:column;gap:5px}
.cnl-scr-total{display:flex;justify-content:space-between;gap:10px;font-size:11.5px;color:#4b5563}
.cnl-scr-total b{color:var(--scr-ink);font-variant-numeric:tabular-nums}
.cnl-scr-total.is-strong{font-size:13px;color:var(--scr-ink);font-weight:800}
.cnl-scr-total.is-strong b{color:var(--scr-accent);font-size:15px}
.cnl-scr-foot{margin-top:10px;font-size:10.5px;font-weight:700;color:var(--scr-accent)}
@media (min-width:860px){.cnl-scr{left:7%;top:50%;width:400px;transform:translateY(-50%) scale(.98)}.cnl-scr.is-on{transform:translateY(-50%) scale(1)}}
@media (min-width:1200px){.cnl-scr{left:8%;width:440px;zoom:1.2}}
@media (min-width:1500px){.cnl-scr{zoom:1.35}}
.cnl-scr-stage::after{content:"";position:absolute;left:-10%;top:10%;width:60%;height:80%;background:radial-gradient(closest-side,var(--scr-glow,rgba(255,255,255,.12)),transparent);pointer-events:none}
@media (max-width:859px){.cnl-hero-vista:has(.cnl-scr-stage){height:min(720px,calc(100svh - 40px))!important;min-height:660px}.cnl-scr{top:16px;transform-origin:top center;transform:translateX(-50%) scale(.76)}.cnl-scr.is-on{transform:translateX(-50%) scale(.8)}}
.cnl-scr-stage.is-overlay{background:linear-gradient(90deg,rgba(0,0,0,.42),rgba(0,0,0,0) 48%)}
.cnl-scr-stage.is-overlay::before,.cnl-scr-stage.is-overlay::after{display:none}
@media (min-width:860px){.cnl-scr-stage.is-overlay .cnl-scr{top:auto;bottom:7%;transform:scale(.98);transform-origin:left bottom}.cnl-scr-stage.is-overlay .cnl-scr.is-on{transform:scale(1)}}
@media (min-width:1200px){.cnl-scr-stage.is-overlay .cnl-scr{zoom:1.05}}
@media (min-width:1500px){.cnl-scr-stage.is-overlay .cnl-scr{zoom:1.15}}
@media (max-width:859px){.cnl-scr-stage.is-overlay{display:none}.cnl-hero-vista:has(.is-overlay){height:clamp(460px,66svh,860px)!important;min-height:0}}
.cnl-scr.is-static{position:relative!important;left:auto!important;top:auto!important;bottom:auto!important;transform:none!important;opacity:1!important;zoom:1!important;width:100%!important;max-width:440px;margin:0 auto;pointer-events:auto}
.cnl-map-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:4px}
.cnl-map-t{position:relative;display:flex;flex-direction:column;gap:3px;padding:12px 10px 10px;border-radius:12px;border:1.5px solid;min-height:84px}
.cnl-map-t b{font-size:12.5px;font-weight:800}
.cnl-map-t small{font-size:10.5px;color:#4b5563}
.cnl-map-t em{margin-top:auto;align-self:flex-start;font-style:normal;font-size:9px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;padding:3px 6px;border-radius:999px}
.cnl-map-t.is-wide{grid-column:span 2}
.cnl-map-t[data-s=free]{border-color:#bbf7d0;background:#f0fdf4}.cnl-map-t[data-s=free] em{background:#dcfce7;color:#166534}
.cnl-map-t[data-s=busy]{border-color:#fde68a;background:#fffbeb}.cnl-map-t[data-s=busy] em{background:#fef3c7;color:#92400e}
.cnl-map-t[data-s=bill]{border-color:#fecaca;background:#fef2f2}.cnl-map-t[data-s=bill] em{background:#fee2e2;color:#991b1b}
.cnl-map-t[data-s=group]{border-color:#c7d2fe;background:#eef2ff}.cnl-map-t[data-s=group] em{background:#e0e7ff;color:#3730a3}
.cnl-map-legend{display:flex;gap:12px;font-size:10.5px;color:#4b5563}
.cnl-map-legend i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px;vertical-align:0}
.cnl-map-tip{margin-top:12px;padding:10px 12px;border-radius:12px;background:var(--scr-accent-soft);font-size:11.5px;line-height:1.45}
.cnl-map-tip b{display:block;font-size:12px}
@media (prefers-reduced-motion:reduce){.cnl-scr{transition:none}}
`;

function Screen({ data, on, static: still = false }: { data: ScreenData; on: boolean; static?: boolean }) {
  return (
    <div className={"cnl-scr" + (on ? " is-on" : "") + (still ? " is-static" : "")} aria-hidden={still ? undefined : !on}>
      <div className="cnl-scr-bar">
        <span className="cnl-scr-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="cnl-scr-title">{data.title}</span>
        {data.status ? (
          <span className="cnl-scr-tag" data-t={data.status.tone}>
            {data.status.label}
          </span>
        ) : null}
      </div>
      <div className="cnl-scr-body">
        {data.heading ? (
          <div className="cnl-scr-head">
            <b>{data.heading}</b>
            {data.subheading ? <span>{data.subheading}</span> : null}
          </div>
        ) : null}
        <div className="cnl-scr-rows">
          {data.rows.map((r, k) => (
            <div className="cnl-scr-row" key={k}>
              <div className="cnl-scr-row-main">
                <b>{r.title}</b>
                {r.meta ? <small>{r.meta}</small> : null}
              </div>
              {r.value ? <span className="cnl-scr-row-val">{r.value}</span> : null}
              {r.tag ? (
                <span className="cnl-scr-tag" data-t={r.tag.tone}>
                  {r.tag.label}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        {data.totals && data.totals.length ? (
          <div className="cnl-scr-totals">
            {data.totals.map((t) => (
              <div className={"cnl-scr-total" + (t.strong ? " is-strong" : "")} key={t.label}>
                <span>{t.label}</span>
                <b>{t.value}</b>
              </div>
            ))}
          </div>
        ) : null}
        {data.footer ? <p className="cnl-scr-foot">{data.footer}</p> : null}
      </div>
    </div>
  );
}

/** One screen on its own, e.g. beside a feature module. */
export function ScreenCard({ data, label }: { data: ScreenData; label?: string }) {
  return (
    <div role="img" aria-label={label || data.title} style={{ width: "100%" }}>
      <Screen data={data} on static />
    </div>
  );
}

export type MapTable = { name: string; meta: string; state: "free" | "busy" | "bill" | "group"; label: string; wide?: boolean };

/** The dining-room map: tables coloured by state. */
export function TableMap({ title, tables, tip }: { title: string; tables: MapTable[]; tip?: { title: string; text: string } }) {
  return (
    <div role="img" aria-label={title} style={{ width: "100%" }}>
      <div className="cnl-scr is-on is-static">
        <div className="cnl-scr-bar">
          <span className="cnl-scr-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="cnl-scr-title">{title}</span>
        </div>
        <div className="cnl-scr-body">
          <div className="cnl-map-legend">
            <span><i style={{ background: "#22c55e" }} />Libre</span>
            <span><i style={{ background: "#f59e0b" }} />Ocupada</span>
            <span><i style={{ background: "#ef4444" }} />Cuenta</span>
          </div>
          <div className="cnl-map-grid">
            {tables.map((t) => (
              <div key={t.name} className={"cnl-map-t" + (t.wide ? " is-wide" : "")} data-s={t.state}>
                <b>{t.name}</b>
                <small>{t.meta}</small>
                <em>{t.label}</em>
              </div>
            ))}
          </div>
          {tip ? (
            <p className="cnl-map-tip">
              <b>{tip.title}</b>
              {tip.text}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** All screens stacked; the active one is shown. */
export function ScreenStage({ screens, active, label, overlay = false }: { screens: ScreenData[]; active: number; label: string; /** Float over the hero photo instead of filling the window. */ overlay?: boolean }) {
  return (
    <div className={"cnl-scr-stage" + (overlay ? " is-overlay" : "")} role="img" aria-label={label}>
      {screens.map((s, k) => (
        <Screen key={s.title} data={s} on={k === active % screens.length} />
      ))}
    </div>
  );
}
