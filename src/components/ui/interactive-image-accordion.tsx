import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UtensilsCrossed,
  Pill,
  Store,
  Briefcase,
  Check,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface AccordionPane {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  icon: LucideIcon;
  url?: string;
}

/**
 * Industry segmentation — adapted from the 21st.dev "Interactive Image Accordion"
 * (1.txt). Each pane shows the same all-in-one suite (POS + facturación + stock)
 * applied to a Peruvian vertical. The message: "Sin importar tu rubro, Yamassi se
 * adapta a ti" — not an AI showcase.
 */
const accordionItems: AccordionPane[] = [
  {
    id: 1,
    eyebrow: "Bodegas y Minimarkets",
    title: "Caja rápida y stock siempre cuadrado",
    description:
      "Cobra con lector de código de barras, controla tu stock al instante y emite tu boleta electrónica sin complicarte. Pensado para el día a día de la bodega peruana.",
    features: [
      "Cobro veloz con código de barras y balanza",
      "Control de stock y alertas de reposición",
      "Tickets y comprobantes de venta al toque",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=2070&auto=format&fit=crop",
    icon: Store,
    url: "/market",
  },
  {
    id: 2,
    eyebrow: "Restaurantes y Cafeterías",
    title: "Comandas que vuelan, cuentas que cuadran",
    description:
      "Toma pedidos por mesa en segundos, controla tu salón, costea tus recetas y factura sin filas. Menos errores en cocina, más rotación de mesas.",
    features: [
      "Comandas y control de mesas en tiempo real",
      "Costeo de recetas y margen por plato",
      "Cobros con Yape, Plin y tarjetas",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
    icon: UtensilsCrossed,
    url: "/restaurantes",
  },
  {
    id: 3,
    eyebrow: "Clínicas Odontológicas",
    title: "Odontograma y gestión clínica integral",
    description:
      "Odontograma digital según norma MINSA, historias clínicas con radiografías, recordatorios automáticos por WhatsApp y liquidación exacta a doctores.",
    features: [
      "Odontograma digital FDI (adulto y niños)",
      "Agenda médica con confirmación WhatsApp",
      "Presupuestos por fases y comisiones",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
    icon: Pill,
    url: "/odontologia",
  },
  {
    id: 4,
    eyebrow: "Retail, Servicios y más",
    title: "Cualquier rubro, un solo sistema",
    description:
      "Catálogo flexible, multi-sucursal, proveedores y facturación electrónica. Si vendes productos o servicios en el Perú, Yamassi se adapta a tu forma de trabajar.",
    features: [
      "Catálogo flexible de productos y servicios",
      "Multi-sucursal y proveedores centralizados",
      "Reportes y facturación SUNAT para todos",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2070&auto=format&fit=crop",
    icon: Briefcase,
    url: "#precios",
  },
];

interface AccordionItemProps {
  item: AccordionPane;
  isActive: boolean;
  onActivate: () => void;
}

const AccordionItem = ({ item, isActive, onActivate }: AccordionItemProps) => {
  const Icon = item.icon;
  return (
    <motion.div
      onMouseEnter={onActivate}
      onClick={onActivate}
      // Desktop: panes share a FIXED-width row via flex-grow, so the block
      // never changes size — only the split between panes animates.
      animate={{ flexGrow: isActive ? 6 : 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full min-w-0 cursor-pointer overflow-hidden rounded-3xl border border-border transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:h-full md:w-auto md:basis-0 ${
        isActive
          ? // active: tall on mobile
            "h-[440px]"
          : // inactive: collapsed strip on mobile
            "h-[84px]"
      }`}
    >
      <img
        src={item.imageUrl}
        alt={item.eyebrow}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#081226] via-[#081226]/55 to-[#081226]/10" />
      {isActive && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100%,rgba(16,185,129,0.25),transparent_60%)]" />
      )}

      {/* Collapsed label — horizontal on mobile, vertical rail on desktop */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {/* Mobile: a compact bar with icon + label (text otherwise hidden) */}
            <div className="flex h-full items-center gap-3 px-5 md:hidden">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-emerald-300">
                <Icon className="h-5 w-5" />
              </span>
              <span className="truncate text-sm font-semibold uppercase tracking-widest text-white/90">
                {item.eyebrow}
              </span>
            </div>

            {/* Desktop: vertical label + icon along the narrow rail */}
            <div className="hidden h-full flex-col items-center justify-between py-6 md:flex">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-emerald-300">
                <Icon className="h-5 w-5" />
              </span>
              <span className="rotate-180 text-sm font-semibold uppercase tracking-widest text-white/85 [writing-mode:vertical-rl]">
                {item.eyebrow}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded: full pitch (always shown on mobile) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute inset-y-0 left-0 flex w-full flex-col justify-end p-6 md:w-[440px] md:p-7"
          >
            <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-100">
              <Icon className="h-3.5 w-3.5" />
              {item.eyebrow}
            </span>
            <h3 className="font-serif text-2xl font-bold leading-tight text-white md:text-3xl">
              {item.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
              {item.description}
            </p>
            <ul className="mt-4 space-y-2">
              {item.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-white/90"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                  {feature}
                </li>
              ))}
            </ul>

            {item.url && item.url.startsWith("/") && (
              <div className="mt-5 pt-3 border-t border-white/15">
                <a
                  href={item.url}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:text-white transition-colors"
                >
                  <span>Ver sistema para {item.eyebrow}</span>
                  <span>→</span>
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function AyniSegmentationAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="rubros"
      className="relative w-full overflow-hidden bg-ayni-grid py-20 md:py-28 scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm">
              Wiñaypaq kuska · Para todo tipo de negocio
            </span>
            <h2 className="mt-6 font-serif text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl text-balance">
              Sin importar tu rubro,{" "}
              <span className="[color:hsl(var(--accent))]">Yamassi se adapta a ti</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Bodega, restaurante, botica o servicios: es el mismo sistema
              completo —POS, caja, stock y reportes— ajustado a cómo
              trabaja tu negocio. Explora tu rubro.
            </p>

            <nav className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
              {accordionItems.map((item, index) => (
                <button
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    index === activeIndex
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {item.eyebrow.split(" ")[0].replace(",", "")}
                </button>
              ))}
            </nav>

            <div className="mt-8">
              <Button variant="glow" size="lg" asChild>
                <a href="#precios">Ver planes para mi negocio</a>
              </Button>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="mx-auto flex w-full max-w-[784px] flex-col items-stretch gap-3 md:h-[460px] md:flex-row">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onActivate={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
