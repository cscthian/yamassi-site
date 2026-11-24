import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, X } from "lucide-react";
import { SUB_BRANDS, type SubBrandId } from "@/components/ui/sub-brand-logo";
import { MagnetizeButton } from "@/components/ui/magnetize-button";

/** The three platforms you can start with, each in its own colours. */
export const PRUEBA_GRATIS_BRANDS: SubBrandId[] = ["market", "restaurantes", "odontologia"];

const BRAND_TEXT: Record<SubBrandId, string> = {
  market: "Ventas con código de barras, control de stock, vencimientos y boletas electrónicas.",
  restaurantes: "Comandas a cocina y barra, mapa de mesas, división de cuentas y caja por turno.",
  odontologia: "Odontograma digital, historias clínicas, agenda con WhatsApp y caja.",
};

interface PruebaGratisMenuProps {
  className?: string;
  label?: string;
  align?: "left" | "center" | "right";
  dropDirection?: "up" | "down";
  /** "header": compact green pill; "hero": large arrow call to action with the three brand marks. */
  variant?: "header" | "hero";
}

interface PopoverCoords {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
}

const MENU_WIDTH = 780;
const MENU_HEIGHT = 420;

/** Card styles, matching the platform card of /login/. */
const PGM_CSS = `
.pgm-card{position:relative;overflow:hidden;display:flex;flex-direction:column;padding:16px 16px 14px;border-radius:18px;background:color-mix(in oklab,#0b1f4d 70%,transparent);box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 0 0 1px rgba(255,255,255,.07),0 18px 40px -24px rgba(0,0,0,.5);transition:transform .25s ease,box-shadow .25s ease}
.pgm-card:hover{transform:translateY(-2px);box-shadow:0 1px 0 rgba(255,255,255,.1) inset,0 0 0 1px var(--pgm-c),0 22px 44px -22px var(--pgm-c)}
.pgm-card::before{content:"";position:absolute;inset:0 0 auto;height:3px;background:var(--pgm-g)}
.pgm-badge{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;flex:none}
.pgm-badge img{width:28px;height:28px;border-radius:50%;transition:transform .6s cubic-bezier(.65,0,.35,1)}
.pgm-card:hover .pgm-badge img{transform:rotate(360deg)}
.pgm-access{font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.62)}
.pgm-name{margin-top:2px;font-size:17px;font-weight:700;letter-spacing:-.01em}
.pgm-dom{margin-top:2px;font:500 10.5px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;color:rgba(255,255,255,.55)}
.pgm-desc{margin-top:10px;font-size:12.5px;line-height:1.45;color:rgba(255,255,255,.82);flex:1}
.pgm-go{display:flex;align-items:center;justify-content:center;gap:8px;height:38px;margin-top:14px;border-radius:999px;font-size:12.5px;font-weight:700;transition:filter .2s}
.pgm-go:hover{filter:brightness(1.08)}
.pgm-page{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:9px;font-size:11.5px;font-weight:600;color:rgba(255,255,255,.62)}
.pgm-page:hover{color:#fff}
.pgm-access{display:block}
@media (max-width:719px){.pgm-card{padding:12px 14px}.pgm-badge{width:42px;height:42px}.pgm-badge img{width:30px;height:30px}.pgm-access{display:none}.pgm-desc{display:none}.pgm-go{height:36px;margin-top:10px}.pgm-page{margin-top:6px}}
@media (prefers-reduced-motion:reduce){.pgm-card,.pgm-badge img{transition:none}}
`;

export function PruebaGratisMenu({
  className = "",
  label = "Empieza gratis",
  align = "right",
  dropDirection = "down",
  variant = "header",
}: PruebaGratisMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const updatePosition = useCallback(() => {
    if (typeof window === "undefined") return;
    const mobile = window.innerWidth < 720;
    setIsMobileView(mobile);
    if (mobile || !buttonRef.current) {
      setCoords(null);
      return;
    }
    const rect = buttonRef.current.getBoundingClientRect();
    const margin = 12;
    const width = Math.min(MENU_WIDTH, window.innerWidth - margin * 2);
    let left = rect.left;
    if (align === "center") left = rect.left + rect.width / 2 - width / 2;
    else if (align === "right") left = rect.right - width;
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));

    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp =
      dropDirection === "up"
        ? spaceAbove >= MENU_HEIGHT || spaceAbove > spaceBelow
        : spaceBelow < MENU_HEIGHT && spaceAbove > spaceBelow;
    if (openUp) setCoords({ bottom: Math.max(margin, window.innerHeight - rect.top + 10), left, width });
    else setCoords({ top: Math.max(margin, Math.min(rect.bottom + 10, window.innerHeight - MENU_HEIGHT - margin)), left, width });
  }, [align, dropDirection]);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    const onMove = () => updatePosition();
    const prevOverflow = document.body.style.overflow;
    if (window.innerWidth < 720) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
    };
  }, [isOpen, updatePosition]);

  return (
    <div className={`relative inline-block ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: PGM_CSS }} />
      {variant === "hero" ? (
        /* Same CTA as "Empieza con Yamassi gratis" (MagnetizeButton), opening the platform chooser. */
        <MagnetizeButton
          as="button"
          type="button"
          ref={buttonRef as React.Ref<HTMLElement>}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="h-14 cursor-pointer select-none pl-3 pr-7 text-base sm:h-16 sm:pl-3.5 sm:pr-8 sm:text-lg"
        >
          <span className="flex -space-x-2.5" aria-hidden="true">
            {PRUEBA_GRATIS_BRANDS.map((id, k) => (
              <img
                key={id}
                src={SUB_BRANDS[id].mark}
                alt=""
                width={34}
                height={34}
                style={{ animationDelay: k * 0.18 + "s" }}
                className="touch-spin h-8 w-8 rounded-full ring-2 ring-white/80 transition-transform duration-700 group-hover:rotate-[360deg] sm:h-9 sm:w-9"
              />
            ))}
          </span>
          <span className="ml-1">{label}</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </MagnetizeButton>
      ) : (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="group inline-flex cursor-pointer select-none items-center gap-1 whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 px-3 py-1.5 text-xs font-bold sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm text-white shadow-[0_8px_20px_-8px_rgba(5,150,105,0.9)] transition-all hover:from-emerald-300 hover:to-emerald-500 active:scale-[0.98]"
        >
          <span>{label}</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="pointer-events-auto fixed inset-0 z-[9999]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-[#04091a]/80 backdrop-blur-xs sm:bg-slate-950/40 sm:backdrop-blur-[2px]"
                  aria-hidden="true"
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Elige tu sistema para empezar gratis"
                  initial={{ opacity: 0, y: isMobileView ? 24 : 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: isMobileView ? 20 : 8, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={
                    !isMobileView && coords
                      ? { position: "fixed", top: coords.top, bottom: coords.bottom, left: coords.left, width: coords.width }
                      : undefined
                  }
                  className={
                    (isMobileView || !coords ? "fixed inset-x-3 bottom-3 mx-auto max-w-[420px] " : "") +
                    "z-[10000] max-h-[88dvh] overflow-y-auto overscroll-contain rounded-3xl border border-white/15 bg-gradient-to-b from-[#0d2560] to-[#081634] p-4 text-white shadow-[0_25px_70px_rgba(0,0,0,0.75)]"
                  }
                >
                  <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/25 sm:hidden" aria-hidden="true" />
                  <div className="flex items-center justify-between gap-3 px-1 pb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      Elige tu sistema y empieza gratis
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                      aria-label="Cerrar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid gap-3 min-[720px]:grid-cols-3">
                    {PRUEBA_GRATIS_BRANDS.map((id) => {
                      const b = SUB_BRANDS[id];
                      return (
                        <div key={id} className="pgm-card" style={{ ["--pgm-c" as string]: b.solid, ["--pgm-g" as string]: b.solid }}>
                          <div className="flex items-center gap-3">
                            <span className="pgm-badge" style={{ background: b.solid }}>
                              <img src={b.mark} alt="" width={28} height={28} />
                            </span>
                            <div className="min-w-0">
                              <span className="pgm-access">Empieza gratis</span>
                              <p className="pgm-name">
                                {b.lines[0]} <span style={{ color: b.accentInverted }}>{b.lines[1]}</span>
                              </p>
                              <p className="pgm-dom">{b.app.replace(/^https?:\/\//, "").replace(/\/$/, "")}</p>
                            </div>
                          </div>
                          <p className="pgm-desc">{BRAND_TEXT[id]}</p>
                          <a
                            className="pgm-go"
                            href={b.app}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            style={{ background: b.solid, color: b.solidInk }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
                            </svg>
                            Crear cuenta gratis
                          </a>
                          <a className="pgm-page" href={b.home + "/"} onClick={() => setIsOpen(false)}>
                            Conocer {b.name}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M7 17 17 7M8 7h9v9" />
                            </svg>
                          </a>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-3 border-t border-white/10 pt-2.5 text-center text-[11px] text-white/60">
                    Sin tarjeta de crédito · Migración gratuita · Soporte en Perú
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

export default PruebaGratisMenu;
