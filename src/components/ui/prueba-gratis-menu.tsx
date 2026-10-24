import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UtensilsCrossed,
  Store,
  Smile,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
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

export function PruebaGratisMenu({
  className = "",
  buttonSize = "sm",
  label = "Empieza gratis",
  align = "right",
  dropDirection = "down",
}: PruebaGratisMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ChevronIcon = dropDirection === "up" ? ChevronUp : ChevronDown;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <Button
        variant="glow"
        size={buttonSize}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center justify-center gap-2 cursor-pointer shadow-md font-semibold select-none active:scale-[0.98] transition-transform min-h-[40px] sm:min-h-[44px]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronIcon
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-emerald-100" : ""
          }`}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop en teléfonos para centrar la atención y cerrar al tocar fuera */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs sm:hidden"
              aria-hidden="true"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: dropDirection === "up" ? 10 : -10,
                scale: 0.95,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: dropDirection === "up" ? 8 : -8,
                scale: 0.95,
              }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed inset-x-3.5 mx-auto max-w-[380px] z-50 sm:absolute sm:inset-x-auto sm:w-[380px] sm:max-w-[380px] ${
                align === "center"
                  ? "sm:left-1/2 sm:-translate-x-1/2 sm:right-auto"
                  : align === "left"
                  ? "sm:left-0 sm:right-auto sm:translate-x-0"
                  : "sm:right-0 sm:left-auto sm:translate-x-0"
              } ${
                dropDirection === "up"
                  ? "bottom-20 mb-2 sm:bottom-full sm:mb-3 sm:top-auto sm:mt-0 origin-bottom"
                  : "top-16 mt-2 sm:top-full sm:mt-2.5 sm:bottom-auto sm:mb-0 origin-top"
              } max-h-[75vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#0b1f4d]/98 p-2.5 sm:p-3 text-white shadow-[0_25px_60px_rgba(11,31,77,0.7)] backdrop-blur-2xl ring-1 ring-white/10`}
            >
            {/* Header info */}
            <div className="flex items-center justify-between px-2.5 sm:px-3 pt-1.5 pb-2 border-b border-white/10">
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                Elige tu tipo de negocio
              </span>
              <span className="text-[10px] sm:text-[11px] text-emerald-300/80 font-medium">Plan gratuito S/ 0</span>
            </div>

            {/* Menu options */}
            <div className="mt-2 space-y-1.5">
              {PRUEBA_GRATIS_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <a
                    key={opt.title}
                    href={opt.url}
                    target={opt.url.startsWith("http") ? "_blank" : undefined}
                    rel={opt.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-start gap-3 rounded-2xl p-2.5 sm:p-3 transition-all duration-200 hover:bg-white/10 active:scale-[0.98] hover:shadow-sm"
                  >
                    <span
                      className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${opt.accent} text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-sm font-bold text-white group-hover:text-emerald-200 transition-colors">
                          {opt.title}
                        </span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-white/70 line-clamp-2">
                        {opt.description}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-white/30 self-center transition-transform duration-200 group-hover:translate-x-1 group-hover:text-emerald-300" />
                  </a>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="mt-2 pt-2 border-t border-white/10 px-3 pb-1 text-center">
              <p className="text-[11px] text-white/50">
                Sin tarjeta de crédito · Migración gratuita · Soporte en Perú
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </div>
  );
}

export default PruebaGratisMenu;
