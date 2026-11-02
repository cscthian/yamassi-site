import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UtensilsCrossed,
  Store,
  Smile,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TIENDA_URL, RESTOBAR_URL, CITAS_URL } from "@/lib/site";

export interface PruebaGratisOption {
  title: string;
  badge: string;
  description: string;
  url: string;
  icon: typeof UtensilsCrossed;
  accent: string;
}

export const PRUEBA_GRATIS_OPTIONS: PruebaGratisOption[] = [
  {
    title: "Tienda (Market)",
    badge: "POS e Inventario",
    description: "Ventas con código de barras, control de stock, lotes y comprobantes de venta.",
    url: TIENDA_URL,
    icon: Store,
    accent: "from-emerald-400 to-teal-500",
  },
  {
    title: "Restobar (Restaurantes, café y Bares)",
    badge: "Comandas y Mesas",
    description: "Control de caja, comandas a cocina y barra, división de cuentas y delivery.",
    url: RESTOBAR_URL,
    icon: UtensilsCrossed,
    accent: "from-amber-400 to-orange-500",
  },
  {
    title: "Reservas y citas",
    badge: "Agenda y Pacientes",
    description: "Odontograma digital, agenda con WhatsApp, historias clínicas y presupuestos.",
    url: CITAS_URL,
    icon: Smile,
    accent: "from-sky-400 to-blue-600",
  },
];

interface PruebaGratisMenuProps {
  className?: string;
  buttonSize?: "sm" | "default" | "lg" | "xl";
  label?: string;
  align?: "left" | "center" | "right";
  dropDirection?: "up" | "down";
}

interface PopoverCoords {
  top?: number;
  bottom?: number;
  left: number;
  openUp: boolean;
}

export function PruebaGratisMenu({
  className = "",
  buttonSize = "sm",
  label = "Empieza gratis",
  align = "right",
  dropDirection = "down",
}: PruebaGratisMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const ChevronIcon = dropDirection === "up" ? ChevronUp : ChevronDown;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (typeof window === "undefined") return;
    const mobile = window.innerWidth < 640;
    setIsMobileView(mobile);

    if (mobile || !buttonRef.current) {
      setCoords(null);
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 380;
    const estimatedMenuHeight = 360;
    const margin = 12;

    // Horizontal alignment clamped inside viewport
    let left = rect.left;
    if (align === "center") {
      left = rect.left + rect.width / 2 - menuWidth / 2;
    } else if (align === "right") {
      left = rect.right - menuWidth;
    }
    left = Math.max(margin, Math.min(left, window.innerWidth - menuWidth - margin));

    // Vertical placement: check if there is enough room in preferred direction
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp =
      dropDirection === "up"
        ? spaceAbove >= estimatedMenuHeight || spaceAbove > spaceBelow
        : spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow;

    if (openUp) {
      const bottom = Math.max(margin, window.innerHeight - rect.top + 10);
      setCoords({ bottom, left, openUp: true });
    } else {
      const top = Math.max(margin, Math.min(rect.bottom + 10, window.innerHeight - estimatedMenuHeight - margin));
      setCoords({ top, left, openUp: false });
    }
  }, [align, dropDirection]);

  // Close on outside click, escape, and update position on resize/scroll
  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleScrollOrResize() {
      updatePosition();
    }

    // Lock body scroll on mobile so background text/elements don't move behind the modal
    const prevOverflow = document.body.style.overflow;
    if (window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleScrollOrResize);
    window.addEventListener("scroll", handleScrollOrResize, true);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("scroll", handleScrollOrResize, true);
    };
  }, [isOpen, updatePosition]);

  return (
    <div className={`relative inline-block ${className}`}>
      <Button
        ref={buttonRef}
        variant="glow"
        size={buttonSize}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center justify-center gap-2 cursor-pointer shadow-md font-semibold select-none active:scale-[0.98] transition-transform min-h-[40px] sm:min-h-[44px]"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <span>{label}</span>
        <ChevronIcon
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-emerald-100" : ""
          }`}
        />
      </Button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[9999] pointer-events-auto">
                {/* Full-screen backdrop: darkens background on mobile & catches outside clicks on all screens */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-[#04091a]/80 backdrop-blur-xs sm:bg-slate-950/30 sm:backdrop-blur-[2px]"
                  aria-hidden="true"
                />

                {/* Modal / Popover Card rendered at document.body root so nothing ever overlaps it */}
                <motion.div
                  ref={modalRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Elige tu tipo de negocio"
                  initial={{
                    opacity: 0,
                    y: isMobileView ? 24 : coords?.openUp ? 12 : -12,
                    scale: 0.97,
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: isMobileView ? 20 : coords?.openUp ? 10 : -8,
                    scale: 0.97,
                  }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={
                    !isMobileView && coords
                      ? {
                          position: "fixed",
                          top: coords.top !== undefined ? `${coords.top}px` : undefined,
                          bottom: coords.bottom !== undefined ? `${coords.bottom}px` : undefined,
                          left: `${coords.left}px`,
                          width: "380px",
                        }
                      : undefined
                  }
                  className={
                    isMobileView || !coords
                      ? "fixed inset-x-3 bottom-4 z-[10000] mx-auto max-w-[395px] max-h-[85dvh] overflow-y-auto overscroll-contain rounded-3xl border border-white/20 bg-[#0b1f4d] p-3.5 text-white shadow-[0_25px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/15"
                      : "z-[10000] max-h-[85dvh] overflow-y-auto overscroll-contain rounded-3xl border border-white/20 bg-[#0b1f4d] p-3.5 text-white shadow-[0_25px_70px_rgba(0,0,0,0.75)] ring-1 ring-white/15"
                  }
                >
                  {/* Indicador superior tipo app sheet en teléfonos */}
                  <div
                    className="mx-auto w-10 h-1 rounded-full bg-white/25 mb-2.5 sm:hidden"
                    aria-hidden="true"
                  />

                  {/* Header */}
                  <div className="flex items-center justify-between px-2.5 pt-0.5 pb-2.5 border-b border-white/15">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      Elige tu tipo de negocio
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                        Plan S/ 0
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                        aria-label="Cerrar modal"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Menu options */}
                  <div className="mt-2.5 space-y-2">
                    {PRUEBA_GRATIS_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <a
                          key={opt.title}
                          href={opt.url}
                          target={opt.url.startsWith("http") ? "_blank" : undefined}
                          rel={opt.url.startsWith("http") ? "noopener noreferrer" : undefined}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 transition-all duration-200 hover:bg-white/15 hover:border-white/25 active:scale-[0.98]"
                        >
                          <span
                            className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${opt.accent} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>

                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-200 transition-colors">
                                {opt.title}
                              </span>
                              <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                                {opt.badge}
                              </span>
                            </div>
                            <p className="mt-1 text-[11.5px] sm:text-xs leading-snug text-white/80">
                              {opt.description}
                            </p>
                          </div>

                          <ArrowRight className="h-4 w-4 shrink-0 text-white/50 self-center transition-transform duration-200 group-hover:translate-x-1 group-hover:text-emerald-300" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Footer note */}
                  <div className="mt-2.5 pt-2 border-t border-white/15 px-2 text-center">
                    <p className="text-[11px] text-white/65">
                      Sin tarjeta de crédito · Migración gratuita · Soporte en Perú
                    </p>
                  </div>
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
