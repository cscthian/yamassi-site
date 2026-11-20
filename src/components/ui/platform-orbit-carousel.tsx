import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/*
 * Platform Orbit Carousel (adapted from the "Dish Orbit Carousel"): each
 * Yamassi platform's round mark sits on the left; changing platform swings it
 * out over the top on a wide orbit while the next mark swings in from the other
 * side. The two-weight title wipes out and back in, the platform card
 * cross-fades, and a band behind the scene turns and takes the brand colour.
 * The page scroll drives it (the section pins, one stretch of scroll per
 * platform). Arrows, thumbnails, the side pager, arrow keys and swipes jump too.
 */

export type Platform = {
  /** Thin first title line, e.g. "Yamassi". */
  title: string;
  /** Heavy second title line, e.g. "Tienda". */
  subtitle: string;
  /** Round brand mark (SVG/PNG), square. */
  image: string;
  alt?: string;
  /** Small line above the title, e.g. "Minimarkets, bodegas y retail". */
  eyebrow: string;
  /** Two-line label under the thumbnail. */
  label: string;
  /** Brand colour for the band and buttons (hex). */
  accent: string;
  /** Text colour on top of the accent. */
  accentInk: string;
  name: string;
  description: string;
  features: string[];
  /** The platform's sign-in. */
  url: string;
  domain: string;
  /** The platform's landing page. */
  page: string;
};

export type PlatformOrbitCarouselProps = {
  items: Platform[];
  /** Root height. A definite length. */
  height?: string;
  /** Visible heading at the top of the display. */
  heading?: string;
  /** Photo behind the display, washed with the background colour. */
  backdrop?: string;
  /** Responsive sources for the backdrop, e.g. "small.webp 800w, large.webp 1536w". */
  backdropSet?: string;
  loop?: boolean;
  className?: string;
};

export function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0;
  return ((Math.round(i) % n) + n) % n;
}

export function stepDirection(from: number, to: number, n: number): 1 | -1 {
  if (n <= 0) return 1;
  const fwd = (((to - from) % n) + n) % n;
  return fwd <= n - fwd ? 1 : -1;
}

export function scrollSteps(n: number, loop: boolean): number {
  return Math.max(0, loop ? n : n - 1);
}

export function segmentFor(i: number, current: number, n: number, loop: boolean): number {
  return loop && i === 0 && current > n / 2 ? n : i;
}

export function fitSize(chars: number, max: number, width: number, em: number): number {
  return Math.min(max, width / (Math.max(1, chars) * em));
}

/** The band: a thick stroke along the marks' orbit circle, tapering at both ends. */
export function arcPath(a0: number, a1: number, cx: number, cy: number, r: number, w: number, steps = 48): string {
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45);
    const c = Math.cos(a);
    const s = Math.sin(a);
    outer.push((cx + c * (r + h)).toFixed(1) + " " + (cy + s * (r + h)).toFixed(1));
    inner.push((cx + c * (r - h)).toFixed(1) + " " + (cy + s * (r - h)).toFixed(1));
  }
  return "M" + outer.join("L") + "L" + inner.reverse().join("L") + "Z";
}

export const ARC_REST = [[50, 98], [46, 124], [60, 126], [40, 100]];
export function arcRest(index: number): number[] {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length];
}
export const ARC_SWEEP = [38, 146];

const ORBIT_X = 299;
const ORBIT_Y = -450;
const ORBIT_R = 650;
const SCROLL_PER_ITEM = 0.7;
const SWING = 50;
const ITEM = 118;
const VISIBLE = 4;

const CSS =
  ".pof-trk{position:relative;width:100%}" +
  ".pof-root{position:sticky;top:0;overflow:hidden;width:100%;background:var(--pof-bg);color:var(--pof-fg);font-family:inherit;container-type:inline-size;-webkit-tap-highlight-color:transparent}" +
  ".pof-root *{box-sizing:border-box}" +
  ".pof-root:focus-visible{outline:2px solid var(--pof-primary);outline-offset:-4px}" +
  ".pof-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(60% 55% at 22% 40%,color-mix(in oklab,var(--pof-tint) 26%,transparent),transparent 70%),radial-gradient(50% 50% at 85% 85%,rgba(52,211,153,.12),transparent 70%);transition:background .9s}" +
  ".pof-grid{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1px);background-size:24px 24px;mask-image:linear-gradient(180deg,#000,transparent 90%)}" +
  ".pof-canvas{position:absolute;left:50%;top:50%;width:960px;height:520px;transform:translate(-50%,-50%) scale(var(--pof-s,1));transform-origin:50% 50%}" +
  ".pof-arc{position:absolute;z-index:-1;left:calc(var(--pp) * -130 / 245);top:calc(var(--pp) * -82 / 245);width:calc(var(--pp) * 960 / 245);height:calc(var(--pp) * 520 / 245);overflow:visible;pointer-events:none}" +
  ".pof-btn{appearance:none;border:0;background:none;color:inherit;font:inherit;padding:0;margin:0;cursor:pointer;text-decoration:none}" +
  ".pof-btn:focus-visible{outline:2px solid var(--pof-primary);outline-offset:3px;border-radius:10px}" +
  ".pof-ico{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}" +
  ".pof-heading{position:absolute;left:130px;top:30px;margin:0;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--pof-muted)}" +
  ".pof-heading b{color:var(--pof-primary);font-weight:700}" +
  ".pof-pager{position:absolute;left:76px;top:172px;display:flex;flex-direction:column;align-items:center;gap:7px}" +
  ".pof-dot{width:14px;height:10px;display:grid;place-items:center;transition:height .45s cubic-bezier(.3,.7,.2,1)}" +
  ".pof-dot i{display:block;width:3px;height:3px;border-radius:3px;background:var(--pof-fg);opacity:.45;transition:height .45s cubic-bezier(.3,.7,.2,1),opacity .3s}" +
  ".pof-dot[aria-current] i{height:22px;opacity:.9}" +
  ".pof-dot[aria-current]{height:26px}" +
  ".pof-plates{--pp:245px;position:absolute;left:130px;top:82px;width:var(--pp);height:var(--pp);touch-action:pan-y}" +
  ".pof-orbit{position:absolute;inset:0;transform-origin:69% -217%;visibility:hidden;will-change:transform}" +
  ".pof-orbit>img{display:block;width:245px;height:245px;max-width:none;object-fit:contain;user-select:none;-webkit-user-drag:none;border-radius:50%;filter:drop-shadow(0 20px 30px rgba(0,0,0,.45)) drop-shadow(0 3px 6px rgba(0,0,0,.25))}" +
  ".pof-head{position:absolute;left:388px;top:96px;width:330px;height:150px}" +
  ".pof-hd{position:absolute;inset:0;visibility:hidden}" +
  ".pof-eye{font-size:12.5px;font-weight:600;letter-spacing:.01em;margin:0 0 4px 2px;color:var(--pof-muted)}" +
  ".pof-t1,.pof-t2{display:block;white-space:nowrap;line-height:1;text-transform:uppercase;margin:0}" +
  ".pof-t1{font-weight:200;letter-spacing:-.015em;margin-top:6px}" +
  ".pof-t2{font-weight:800;letter-spacing:-.025em;margin-top:6px}" +
  ".pof-acts{position:absolute;left:396px;top:280px;display:flex;gap:28px;font-size:13px;font-weight:600}" +
  ".pof-acts .pof-btn{display:flex;align-items:center;gap:9px;padding:4px 0}" +
  ".pof-acts .pof-ico{width:14px;height:14px}" +
  ".pof-acts .pof-go{padding:10px 18px;border-radius:99px;background:var(--pof-tint);color:var(--pof-tint-ink);box-shadow:0 12px 26px -12px var(--pof-tint);transition:background .6s,color .6s,transform .2s}" +
  ".pof-acts .pof-go:hover{transform:translateY(-1px)}" +
  ".pof-card{position:absolute;left:722px;top:118px;width:223px;padding:18px 20px 20px;border-radius:20px;" +
  "background:color-mix(in oklab,var(--pof-bg) 70%,transparent);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);" +
  "box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 0 0 1px rgba(255,255,255,.06),0 18px 40px -24px rgba(0,0,0,.5)}" +
  ".pof-tabs{display:flex;justify-content:space-around;font-size:12px;margin-bottom:16px}" +
  ".pof-tab{color:var(--pof-muted);font-weight:500;padding:3px 0}" +
  ".pof-tab[aria-selected=true]{color:var(--pof-fg);font-weight:700;box-shadow:inset 0 -2px 0 var(--pof-tint)}" +
  ".pof-bodies{display:grid}" +
  ".pof-body{grid-area:1/1;visibility:hidden}" +
  ".pof-brand{display:flex;align-items:center;gap:10px;margin:0 0 12px}" +
  ".pof-badge{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;flex:none}" +
  ".pof-badge img{width:26px;height:26px;border-radius:50%}" +
  ".pof-access{font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--pof-muted)}" +
  ".pof-bd{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;pointer-events:none}" +
  ".pof-wash{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,color-mix(in oklab,var(--pof-bg) 78%,transparent),color-mix(in oklab,var(--pof-bg) 88%,transparent) 60%,var(--pof-bg))}" +
  ".pof-name{font-size:17px;font-weight:700;letter-spacing:-.01em;margin:0}" +
  ".pof-dom{font-size:10.5px;color:var(--pof-muted);margin:3px 0 12px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}" +
  ".pof-desc{font-size:12.5px;line-height:1.42;margin:0;min-height:70px;color:color-mix(in oklab,var(--pof-fg) 86%,transparent)}" +
  ".pof-feat{display:flex;flex-wrap:wrap;gap:5px;margin:0;padding:0;list-style:none;min-height:70px}" +
  ".pof-feat li{font-size:11px;padding:4px 9px;border-radius:99px;background:rgba(255,255,255,.08)}" +
  ".pof-enter{display:flex;align-items:center;justify-content:center;gap:8px;height:38px;margin-top:16px;border-radius:99px;font-size:12.5px;font-weight:700;background:var(--pof-tint);color:var(--pof-tint-ink);transition:filter .2s}" +
  ".pof-enter:hover{filter:brightness(1.08)}" +
  ".pof-page{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:10px;font-size:11.5px;font-weight:600;color:var(--pof-muted)}" +
  ".pof-page:hover{color:var(--pof-fg)}" +
  ".pof-page .pof-ico{width:12px;height:12px}" +
  ".pof-enter .pof-ico{width:14px;height:14px}" +
  ".pof-strip{position:absolute;left:130px;top:362px;width:550px;height:122px;display:flex;align-items:center}" +
  ".pof-arrow{width:36px;height:36px;display:grid;place-items:center;flex:none}" +
  ".pof-arrow:disabled{opacity:.25;cursor:default}" +
  ".pof-arrow svg{width:12px;height:16px;fill:currentColor}" +
  ".pof-win{position:relative;width:" + ITEM * VISIBLE + "px;height:122px;overflow:hidden;flex:none;margin:0 2px}" +
  ".pof-track{position:absolute;left:0;top:0;display:flex}" +
  ".pof-th{width:" + ITEM + "px;height:122px;display:flex;justify-content:center;padding-top:3px}" +
  ".pof-th .pof-btn{width:92px;height:116px;border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:12px;transition:background .45s,opacity .45s;opacity:.6}" +
  ".pof-th .pof-btn:hover{opacity:.9}" +
  ".pof-th .pof-btn[aria-current]{opacity:1;background:rgba(255,255,255,.08);box-shadow:0 0 0 1px rgba(255,255,255,.1) inset,0 10px 24px -16px rgba(0,0,0,.5)}" +
  ".pof-th img{width:52px;height:52px;max-width:none;object-fit:contain;border-radius:50%;filter:drop-shadow(0 4px 6px rgba(0,0,0,.3));transition:transform .45s}" +
  ".pof-th .pof-btn[aria-current] img{transform:scale(1.08)}" +
  ".pof-th span{font-size:10.5px;line-height:1.25;text-align:center;font-weight:600;max-width:90px}" +
  ".pof-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
  "@container (max-width:639px){" +
  ".pof-canvas{position:relative;z-index:0;left:auto;top:auto;width:100%;height:auto;transform:none;display:flex;flex-direction:column;align-items:center;padding:76px 16px 18px}" +
  ".pof-plates{--pp:min(40vw,22svh);position:relative;left:auto;top:auto}" +
  // the same band, smaller and centred on the mark (design centre of the mark: 252.5, 204.5)
  ".pof-arc{--k:calc(var(--pp) * .6 / 245);left:calc(var(--pp) / 2 - 252.5 * var(--k));top:calc(var(--pp) / 2 - 204.5 * var(--k));width:calc(960 * var(--k));height:calc(520 * var(--k))}" +
  ".pof-heading{position:relative;left:auto;top:auto;text-align:center;font-size:11px;margin:0 0 10px}" +
  ".pof-orbit>img{width:100%;height:100%}" +
  ".pof-head{position:relative;left:auto;top:auto;width:100%;height:calc(min(40px,11cqw) + min(46px,13cqw) + 34px);margin-top:10px}" +
  ".pof-hd{text-align:center}" +
  // title sized to the phone width so long names (RESTOBAR) never clip
  ".pof-t1{font-size:min(40px,11cqw)!important}" +
  ".pof-t2{font-size:min(46px,13cqw)!important}" +
  ".pof-acts{display:none}" +
  ".pof-card{position:relative;left:auto;top:auto;width:100%;max-width:420px;margin-top:4px}" +
  ".pof-desc,.pof-feat{min-height:0}" +
  ".pof-heading{order:-2}" +
  ".pof-strip{position:relative;left:auto;top:auto;order:-1;width:100%;max-width:420px;height:auto;justify-content:center;margin:0 0 6px}" +
  ".pof-strip .pof-arrow{display:none}" +
  ".pof-win{width:100%;height:auto;overflow:visible;margin:0}" +
  ".pof-track{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;width:100%}" +
  ".pof-th{width:auto;height:auto;padding:0;min-width:0}" +
  ".pof-th .pof-btn{width:100%;height:auto;padding:8px 2px;gap:5px}" +
  ".pof-th img{width:clamp(30px,10vw,40px);height:clamp(30px,10vw,40px)}" +
  ".pof-th span{font-size:clamp(9px,2.7vw,10.5px);max-width:100%}" +
  ".pof-pager{display:none}" +
  "}" +
  "@media (prefers-reduced-motion:reduce){.pof-dot,.pof-dot i,.pof-th .pof-btn,.pof-th img,.pof-glow,.pof-acts .pof-go{transition:none}}";

const HIDE_1 = "inset(0% 0% 0% 100%)";
const HIDE_2 = "inset(0% 100% 0% 0%)";
const SHOW = "inset(0% 0% 0% 0%)";

const Icon = {
  enter: (
    <svg className="pof-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
    </svg>
  ),
  page: (
    <svg className="pof-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
};

export function PlatformOrbitCarousel({ items, height = "100svh", heading, backdrop, backdropSet, loop = false, className }: PlatformOrbitCarouselProps) {
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState("resumen");

  const trackRef = useRef(null as HTMLDivElement | null);
  const rootRef = useRef(null as HTMLDivElement | null);
  const stRef = useRef(null as ScrollTrigger | null);
  const segRef = useRef(0);
  const indexRef = useRef(0);
  const orbits = useRef([] as (HTMLDivElement | null)[]);
  const heads = useRef([] as (HTMLDivElement | null)[]);
  const bodies = useRef([] as (HTMLDivElement | null)[]);
  const arcRef = useRef(null as SVGPathElement | null);
  const arc = useRef({ a0: 0, a1: 0 });
  const shown = useRef(-1);
  const dirRef = useRef(1 as 1 | -1);
  const tlRef = useRef(null as gsap.core.Timeline | null);
  const reducedRef = useRef(false);
  const swipe = useRef(null as { x: number; y: number } | null);

  // Fit the 960 x 520 design canvas to the root.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const fit = () => el.style.setProperty("--pof-s", String(Math.min(el.clientWidth / 960, el.clientHeight / 520, 1.6)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => (reducedRef.current = mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // The swap: every platform is in the DOM; GSAP only moves the outgoing and incoming ones.
  useLayoutEffect(() => {
    const from = shown.current;
    const to = index;
    const parts = (i: number) => {
      const head = heads.current[i];
      return {
        orbit: orbits.current[i],
        head,
        eye: head && head.querySelector(".pof-eye"),
        t1: head && head.querySelector(".pof-t1"),
        t2: head && head.querySelector(".pof-t2"),
        body: bodies.current[i],
      };
    };
    const drawArc = () => arcRef.current?.setAttribute("d", arcPath(arc.current.a0, arc.current.a1, ORBIT_X, ORBIT_Y, ORBIT_R, 118));
    const rest = arcRest(to);
    const tint = items[to] ? items[to].accent : "transparent";
    if (tlRef.current) tlRef.current.progress(1).kill();
    const b = parts(to);
    if (from === -1 || from === to || reducedRef.current) {
      for (let i = 0; i < n; i++)
        if (i !== to) {
          const p = parts(i);
          gsap.set([p.orbit, p.head, p.body], { autoAlpha: 0 });
        }
      gsap.set([b.orbit, b.head, b.body, b.eye], { autoAlpha: 1, rotation: 0, y: 0 });
      gsap.set(b.t1, { clipPath: SHOW });
      gsap.set(b.t2, { clipPath: SHOW });
      arc.current.a0 = rest[0];
      arc.current.a1 = rest[1];
      drawArc();
      if (arcRef.current) gsap.set(arcRef.current, { fill: tint });
      shown.current = to;
      return;
    }
    const a = parts(from);
    const d = dirRef.current;
    const tl = gsap.timeline({ onComplete: () => { tlRef.current = null; } });
    tlRef.current = tl;
    tl.to(a.orbit, { rotation: SWING * d, duration: 0.62, ease: "power2.in" }, 0)
      .set(a.orbit, { autoAlpha: 0, rotation: 0 }, 0.62)
      .fromTo(b.orbit, { autoAlpha: 1, rotation: -SWING * d }, { rotation: 0, duration: 0.95, ease: "power3.out" }, 0.3);
    tl.to(a.t1, { clipPath: HIDE_1, duration: 0.42, ease: "power2.in" }, 0)
      .to(a.t2, { clipPath: HIDE_2, duration: 0.42, ease: "power2.in" }, 0.06)
      .to(a.eye, { autoAlpha: 0, duration: 0.25 }, 0)
      .set(a.head, { autoAlpha: 0 }, 0.5)
      .set(b.head, { autoAlpha: 1 }, 0.5)
      .fromTo(b.eye, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55)
      .fromTo(b.t1, { clipPath: HIDE_1 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.55)
      .fromTo(b.t2, { clipPath: HIDE_2 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.62);
    tl.to(a.body, { autoAlpha: 0, y: -6, duration: 0.3, ease: "power1.in" }, 0.05).set(b.body, { autoAlpha: 1, y: 0 }, 0.4);
    if (b.body) tl.fromTo(b.body.children, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }, 0.4);
    tl.to(arc.current, { a0: ARC_SWEEP[0], a1: ARC_SWEEP[1], duration: 0.6, ease: "power2.inOut", onUpdate: drawArc }, 0).to(
      arc.current,
      { a0: rest[0], a1: rest[1], duration: 0.85, ease: "power3.out", onUpdate: drawArc },
      0.6
    );
    if (arcRef.current) tl.to(arcRef.current, { fill: tint, duration: 1.1, ease: "power1.inOut" }, 0.1);
    shown.current = to;
  }, [index, n, items]);

  useEffect(() => () => { tlRef.current?.kill(); }, []);

  const select = (next: number, dir: 1 | -1) => {
    if (next === indexRef.current) return;
    dirRef.current = dir;
    indexRef.current = next;
    setIndex(next);
  };

  // The page scroll drives the platform: the stage pins, one stretch of scroll per platform.
  const steps = scrollSteps(n, loop);
  useEffect(() => {
    const track = trackRef.current;
    if (!track || steps < 1) return;
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      snap: { snapTo: 1 / steps, duration: { min: 0.3, max: 0.8 }, delay: 0.08, ease: "power2.inOut" },
      onUpdate: (self) => {
        if (loop && self.progress >= 1 && self.direction > 0) {
          segRef.current = 0;
          self.scroll(self.start + 1);
          select(0, 1);
          return;
        }
        const seg = Math.round(self.progress * steps);
        if (seg === segRef.current) return;
        const dir = seg > segRef.current ? 1 : -1;
        segRef.current = seg;
        select(wrapIndex(seg, n), dir);
      },
    });
    stRef.current = trigger;
    return () => {
      trigger.kill();
      stRef.current = null;
    };
  }, [steps, loop, n]);

  // Buttons, keys and swipes jump to a platform and move the scroll to its stretch.
  const go = (to: number, dir?: 1 | -1) => {
    if (n < 2) return;
    const next = loop ? wrapIndex(to, n) : Math.max(0, Math.min(n - 1, Math.round(to)));
    if (next === index) return;
    const st = stRef.current;
    const y = st ? st.scroll() : 0;
    if (st && y >= st.start - 1 && y <= st.end + 1) {
      const seg = segmentFor(next, segRef.current, n, loop);
      segRef.current = seg;
      st.scroll(st.start + ((st.end - st.start) * seg) / steps);
    }
    select(next, dir ?? (loop ? stepDirection(index, next, n) : next > index ? 1 : -1));
  };
  const step = (d: 1 | -1) => go(index + d, d);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.4) step(dx < 0 ? 1 : -1);
  };

  const item = items[index];
  const vars = { height, "--pof-tint": item?.accent, "--pof-tint-ink": item?.accentInk } as React.CSSProperties;

  return (
    <div ref={trackRef} className={"pof-trk" + (className ? " " + className : "")} style={{ height: "calc(" + height + " * " + (1 + steps * SCROLL_PER_ITEM) + ")" }}>
      <div
        ref={rootRef}
        className="pof-root"
        style={vars}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Plataformas Yamassi"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        {backdrop ? <img className="pof-bd" src={backdrop} srcSet={backdropSet} sizes="100vw" alt="" width={1536} height={1024} fetchPriority="high" decoding="async" /> : null}
        {backdrop ? <div className="pof-wash" aria-hidden="true" /> : null}
        <div className="pof-glow" aria-hidden="true" />
        <div className="pof-grid" aria-hidden="true" />

        <div className="pof-canvas">

          {heading ? (
            <h1 className="pof-heading">
              {heading}
            </h1>
          ) : null}

          <div className="pof-pager" role="tablist" aria-label="Elige una plataforma">
            {items.map((d, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className="pof-btn pof-dot"
                aria-selected={i === index}
                aria-current={i === index ? "true" : undefined}
                aria-label={d.name}
                onClick={() => go(i)}
              >
                <i />
              </button>
            ))}
          </div>

          <div className="pof-plates" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (swipe.current = null)}>
            {/* The band lives with the mark so it scales with it on phones (design coords: plate at 130,82). */}
            <svg className="pof-arc" viewBox="0 0 960 520" aria-hidden="true">
              <path ref={arcRef} style={{ opacity: 0.3 }} />
            </svg>
            {items.map((d, i) => (
              <div key={i} ref={(el) => { orbits.current[i] = el; }} className="pof-orbit" aria-hidden={i !== index}>
                <img src={d.image} alt={d.alt ?? d.name} width={245} height={245} draggable={false} />
              </div>
            ))}
          </div>

          <div className="pof-head" aria-live="polite">
            {items.map((d, i) => (
              <div key={i} ref={(el) => { heads.current[i] = el; }} className="pof-hd" aria-hidden={i !== index}>
                <p className="pof-eye">{d.eyebrow}</p>
                <h2 style={{ margin: 0, font: "inherit" }}>
                  <span className="pof-t1" style={{ fontSize: fitSize(d.title.length, 56, 330, 0.56) + "px" }}>{d.title}</span>
                  <span className="pof-t2" style={{ fontSize: fitSize(d.subtitle.length, 62, 320, 0.64) + "px", color: d.accent }}>{d.subtitle}</span>
                </h2>
              </div>
            ))}
          </div>

          <div className="pof-acts">
            {item ? (
              <>
                <a className="pof-btn pof-go" href={item.url}>
                  {Icon.enter}Ingresar a {item.name}
                </a>
              </>
            ) : null}
          </div>

          <div className="pof-card">
            <div className="pof-tabs" role="tablist" aria-label="Detalle de la plataforma">
              {["resumen", "incluye"].map((t) => (
                <button key={t} type="button" role="tab" className="pof-btn pof-tab" aria-selected={tab === t} onClick={() => setTab(t)}>
                  {t === "resumen" ? "Resumen" : "Incluye"}
                </button>
              ))}
            </div>
            <div className="pof-bodies">
              {items.map((d, i) => (
                <div key={i} ref={(el) => { bodies.current[i] = el; }} className="pof-body" aria-hidden={i !== index}>
                  <div className="pof-brand">
                    <span className="pof-badge" style={{ background: d.accent }}>
                      <img src={d.image} alt="" width={26} height={26} />
                    </span>
                    <span className="pof-access">Acceso a tu cuenta</span>
                  </div>
                  <p className="pof-name">{d.name}</p>
                  <p className="pof-dom">{d.domain}</p>
                  {tab === "resumen" ? (
                    <p className="pof-desc">{d.description}</p>
                  ) : (
                    <ul className="pof-feat">
                      {d.features.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                  <a className="pof-btn pof-enter" href={d.url} tabIndex={i === index ? 0 : -1} style={{ background: d.accent, color: d.accentInk }}>
                    {Icon.enter}Ingresar
                  </a>
                  <a className="pof-btn pof-page" href={d.page} tabIndex={i === index ? 0 : -1}>
                    Conocer {d.name}
                    {Icon.page}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="pof-strip">
            <button type="button" className="pof-btn pof-arrow" aria-label="Plataforma anterior" onClick={() => step(-1)} disabled={!loop && index === 0}>
              <svg viewBox="0 0 12 16" aria-hidden="true"><path d="M11 0v16L0 8z" /></svg>
            </button>
            <div className="pof-win">
              <div className="pof-track">
                {items.map((d, i) => (
                  <div key={i} className="pof-th">
                    <button type="button" className="pof-btn" aria-current={i === index ? "true" : undefined} onClick={() => go(i)}>
                      <img src={d.image} alt="" width={52} height={52} draggable={false} />
                      <span>{d.label}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" className="pof-btn pof-arrow" aria-label="Plataforma siguiente" onClick={() => step(1)} disabled={!loop && index === n - 1}>
              <svg viewBox="0 0 12 16" aria-hidden="true"><path d="M1 0v16l11-8z" /></svg>
            </button>
          </div>
        </div>
        <p className="pof-sr" aria-live="polite">
          {item ? "Plataforma " + (index + 1) + " de " + n + ": " + item.name : ""}
        </p>
      </div>
    </div>
  );
}

export default PlatformOrbitCarousel;
