import { useEffect } from "react";
import { motion } from "framer-motion";
import { ScanLine, ReceiptText, Boxes } from "lucide-react";

import { AnimatedHeadline } from "@/components/ui/animated-hero";
import { Button } from "@/components/ui/button";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import { HeroCoverCta } from "@/components/ui/hero-cover-cta";

const HERO_VIDEO = "/hero_page.webm";
const HERO_BG = "/img/imagenfondo.png";

const valueProps = [
  {
    icon: ScanLine,
    title: "Vende y cobra rápido",
    body: "POS ágil con código de barras y múltiples medios de pago. Tu caja nunca se detiene, incluso sin buena señal.",
  },
  {
    icon: ReceiptText,
    title: "Comprobantes y cuentas claras",
    body: "Emite tickets y notas de venta al instante. Y si lo deseas, puedes activar la facturación electrónica SUNAT en cualquier momento.",
  },
  {
    icon: Boxes,
    title: "Controla stock y proveedores",
    body: "Inventario en tiempo real, alertas de reposición y compras ordenadas. Menos mermas, más ganancias.",
  },
];

/** Reveal payload of the hero — appears once the scroll-video fully expands. */
function HeroReveal() {
  return (
    <div className="mx-auto max-w-5xl">
      <AnimatedHeadline />

      <p className="mx-auto mt-4 sm:mt-8 max-w-3xl text-center text-[15px] sm:text-lg leading-relaxed text-white/80 md:text-xl text-balance">
        Yamassi reúne todo en un solo lugar: ventas (POS), control de caja,
        inventario y compras. Una sola app, en español y con soporte real en el
        Perú (con opción de activar facturación SUNAT si lo deseas).
      </p>

      <div className="mt-6 sm:mt-10 flex flex-col items-stretch sm:items-center justify-center gap-3 sm:gap-4 sm:flex-row">
        <MagnetizeButton href="/login">
          Empieza con Yamassi gratis
        </MagnetizeButton>
        <Button
          variant="outline"
          size="xl"
          className="border-white/30 bg-transparent text-white hover:bg-white hover:text-primary"
          asChild
        >
          <a href="#funciones">Ver todo lo que incluye</a>
        </Button>
      </div>
      <p className="mt-4 sm:mt-5 text-center text-xs sm:text-sm text-white/60">
        Sin tarjeta de crédito · Migración gratis · Soporte humano en el Perú
      </p>

      {/* All-in-one value props — swipeable cards on phones, grid on desktop */}
      <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
        {valueProps.map((vp, i) => {
          const Icon = vp.icon;
          return (
            <motion.div
              key={vp.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-[80%] shrink-0 snap-center rounded-3xl border border-white/15 bg-white/[0.07] p-5 sm:w-auto sm:p-6 text-left backdrop-blur-md"
            >
              <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-200 ring-1 ring-white/15">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <h3 className="mt-4 sm:mt-5 font-serif text-lg font-bold text-white">
                {vp.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {vp.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function HeroSection() {
  useEffect(() => {
    if (!window.location.hash || window.location.hash === "#inicio") {
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("resetSection"));
    } else {
      window.dispatchEvent(new Event("expandHero"));
    }
  }, []);

  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc={HERO_VIDEO}
      bgImageSrc={HERO_BG}
      title="Todo tu negocio en un solo lugar"
      heroAction={<HeroCoverCta />}
      textBlend={false}
    >
      <HeroReveal />
    </ScrollExpandMedia>
  );
}
export default HeroSection;
