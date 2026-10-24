import { useEffect } from "react";
import { motion } from "framer-motion";
import { ScanLine, ReceiptText, Boxes } from "lucide-react";

import { AnimatedHeadline } from "@/components/ui/animated-hero";
import { Button } from "@/components/ui/button";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import { HeroCoverCta } from "@/components/ui/hero-cover-cta";

const HERO_VIDEO =
  "https://raw.githubusercontent.com/hanselt/Transcriptor/main/uploads/hero_page.webm";
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

      <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-white/80 md:text-xl text-balance">
        Yamassi reúne todo en un solo lugar: ventas (POS), control de caja,
        inventario y compras. Una sola app, en español y con soporte real en el
        Perú (con opción de activar facturación SUNAT si lo deseas).
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      <p className="mt-5 text-center text-sm text-white/60">
        Sin tarjeta de crédito · Migración gratis · Soporte humano en el Perú
      </p>

      {/* All-in-one value props (product-first) */}
      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
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
              className="rounded-3xl border border-white/15 bg-white/[0.07] p-6 text-left backdrop-blur-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-200 ring-1 ring-white/15">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-serif text-lg font-bold text-white">
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
