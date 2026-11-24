import { useId, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { CheckCheck, Clock3, MoveRight, PhoneCall, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { SUB_BRANDS } from "@/components/ui/sub-brand-logo";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

/** Pill switch from pricing-section-1, generalised to N options. */
const PricingSwitch = ({
  options,
  onSwitch,
  selected,
  className,
  layoutId,
}: {
  options: React.ReactNode[];
  selected: number;
  onSwitch: (index: number) => void;
  className?: string;
  layoutId?: string;
}) => {
  const uniqueId = useId();
  const switchLayoutId = layoutId || `switch-${uniqueId}`;

  return (
    <div
      className={cn(
        "relative z-10 flex w-full rounded-full border border-slate-200 bg-slate-50 p-1",
        className
      )}
    >
      {options.map((label, i) => (
        <button
          key={i}
          type="button"
          aria-pressed={selected === i}
          onClick={() => onSwitch(i)}
          className={cn(
            "relative z-10 h-10 w-full cursor-pointer rounded-full px-2 py-1 text-xs font-semibold transition-colors sm:h-14 sm:px-4 sm:text-base",
            selected === i ? "text-white" : "text-slate-500 hover:text-slate-900"
          )}
        >
          {selected === i && (
            <motion.span
              layoutId={switchLayoutId}
              className="absolute left-0 top-0 h-10 w-full rounded-full border-4 border-slate-900 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 shadow-sm shadow-black sm:h-14"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center justify-center gap-1.5">{label}</span>
        </button>
      ))}
    </div>
  );
};

interface Feature {
  text: string;
  soon?: boolean;
}

interface Tier {
  name: string;
  hint: string;
  /** Price in soles per month. `annual` = per-month price when billed yearly. */
  monthly: number;
  annual?: number;
  /** Label next to the price. */
  unit: string;
  note: string;
  cta: { label: string; href: string; icon: "arrow" | "phone" };
  features: Feature[];
}

interface Vertical {
  name: string;
  hint: string;
  /** Second switch: billing period (Tienda/RestoBar) or plan size (Dental). */
  mode: "billing" | "tiers";
  tiers: Tier[];
}

const WHATSAPP_SALES =
  "https://api.whatsapp.com/send?phone=51944147277&text=" +
  encodeURIComponent("Hola, quiero información del plan Corporativo Multisede de Yamassi Dental.");

const verticals: Vertical[] = [
  {
    name: "Tienda",
    hint: "Para bodegas, minimarkets, ferreterías y tiendas de retail",
    mode: "billing",
    tiers: [
      {
        name: "Tienda",
        hint: "Para bodegas, minimarkets, ferreterías y tiendas de retail",
        monthly: 14.9,
        annual: 11.9,
        unit: "/ mes + IGV",
        note: "Plan gratuito disponible",
        cta: { label: "Empieza gratis", href: SUB_BRANDS.market.app, icon: "arrow" },
        features: [
          { text: "POS ultra rápido con lector de código de barras" },
          { text: "Control de inventario, stock y alertas de vencimiento" },
          { text: "Comprobantes y ventas (SUNAT opcional si deseas)" },
          { text: "Cobros con Yape, Plin y tarjetas" },
          { text: "100% Web App: funciona en PC, laptop o celular" },
          { text: "Plan Gratuito disponible para empezar sin costo" },
        ],
      },
    ],
  },
  {
    name: "RestoBar",
    hint: "Para restaurantes, cafeterías, cevicherías, bares y pollerías",
    mode: "billing",
    tiers: [
      {
        name: "RestoBar",
        hint: "Para restaurantes, cafeterías, cevicherías, bares y pollerías",
        monthly: 16.9,
        annual: 13.5,
        unit: "/ mes + IGV",
        note: "Plan gratuito disponible",
        cta: { label: "Empieza gratis", href: SUB_BRANDS.restaurantes.app, icon: "arrow" },
        features: [
          { text: "Comandas digitales instantáneas a cocina y barra" },
          { text: "Mapa interactivo de mesas y división de cuentas" },
          { text: "Control de recetas, escandallos y mermas" },
          { text: "Caja rápida, propinas por mozo y arqueo ciego" },
          { text: "Comprobantes y caja (SUNAT opcional si deseas)" },
          { text: "Plan Gratuito disponible para empezar sin costo" },
        ],
      },
    ],
  },
  {
    name: "Dental",
    hint: "Para consultorios, clínicas y cadenas dentales",
    mode: "tiers",
    tiers: [
      {
        name: "Consultorio Solo",
        hint: "Hasta 2 sillones · para doctores con su propio consultorio o box dental",
        monthly: 79,
        unit: "/ mes",
        note: "2 meses gratis, sin tarjeta",
        cta: { label: "Empezar gratis", href: SUB_BRANDS.odontologia.app, icon: "arrow" },
        features: [
          { text: "Odontograma digital ilimitado (adultos y niños)" },
          { text: "Historias clínicas y consentimientos informados (PDF)" },
          { text: "Agenda con recordatorios por WhatsApp" },
          { text: "Cuentas de tratamiento y presupuestos por paciente" },
          { text: "Caja con arqueo, cobros, adelantos y devoluciones" },
          { text: "Equipo con roles y permisos (recepción, asistente, caja)" },
          { text: "Boletas y facturas electrónicas SUNAT", soon: true },
        ],
      },
      {
        name: "Clínica Dental Pro",
        hint: "Hasta 4 sillones · el más elegido por clínicas con varios especialistas",
        monthly: 149,
        unit: "/ mes",
        note: "2 meses gratis, sin tarjeta",
        cta: { label: "Empezar gratis", href: SUB_BRANDS.odontologia.app, icon: "arrow" },
        features: [
          { text: "Todo lo del plan Consultorio Solo" },
          { text: "Doctores y especialistas ilimitados" },
          { text: "Agenda para hasta 4 sillones con recordatorios por WhatsApp" },
          { text: "Caja clínica con control de saldos" },
          { text: "Soporte prioritario personalizado los 7 días" },
          { text: "Cuotas, comisiones médicas y pagos a laboratorios", soon: true },
        ],
      },
      {
        name: "Multisede",
        hint: "2+ sedes, sillones sin límite · para policlínicos y redes de consultorios",
        monthly: 299,
        unit: "/ mes por sede",
        note: "Activación con nuestro equipo",
        cta: { label: "Hablar con ventas", href: WHATSAPP_SALES, icon: "phone" },
        features: [
          { text: "Todo lo del plan Clínica Dental Pro" },
          { text: "Capacitación a secretarias y asistentes dentales" },
          { text: "Historia clínica compartida entre sedes", soon: true },
          { text: "Dashboard gerencial con KPIs de rentabilidad", soon: true },
          { text: "Central telefónica y call center de citas", soon: true },
        ],
      },
    ],
  },
];

const revealVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.25, duration: 0.5 },
  }),
  hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};

const featureVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
  hidden: { filter: "blur(8px)", y: -12, opacity: 0 },
};

export function AyniPricing() {
  const [verticalIndex, setVerticalIndex] = useState(1);
  const [isAnnual, setIsAnnual] = useState(false);
  const [tierIndex, setTierIndex] = useState(0);

  const vertical = verticals[verticalIndex];
  const tier = vertical.tiers[Math.min(tierIndex, vertical.tiers.length - 1)];
  const annualActive = vertical.mode === "billing" && isAnnual && tier.annual != null;
  const currentPrice = annualActive ? (tier.annual as number) : tier.monthly;
  const hasCents = !Number.isInteger(currentPrice) || !Number.isInteger(tier.monthly);
  const priceFormat = {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  };

  const selectVertical = (i: number) => {
    setVerticalIndex(i);
    // Dental opens on Consultorio Solo (2 sillones), the main plan.
    setTierIndex(0);
  };

  return (
    <section
      id="precios"
      className="relative mx-auto w-full scroll-mt-20 overflow-hidden border-b border-slate-200/80 bg-white px-4 py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #1E3A8A 100%)",
          opacity: 0.55,
        }}
      />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <TimelineContent
          as="div"
          animationNum={0}
          customVariants={revealVariants}
          className="mb-4 flex items-center justify-center"
        >
          <Zap className="mr-2 h-5 w-5 fill-ayni-green text-ayni-green" />
          <span className="font-semibold text-ayni-green-d">Precios claros, sin sorpresas</span>
        </TimelineContent>

        <h2 className="mb-4 font-serif text-3xl font-black leading-[120%] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{ type: "spring", stiffness: 250, damping: 40, delay: 0.3 }}
          >
            Empieza a trabajar formal hoy
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={1}
          customVariants={revealVariants}
          className="text-base text-slate-600 sm:text-lg md:text-xl"
        >
          Elige tu rubro, configura tu plan y empieza gratis. Pagas solo cuando decides continuar.
        </TimelineContent>
      </div>

      {/* Features + configurator */}
      <div className="relative z-10 mx-auto mt-10 max-w-6xl md:mt-14">
        <div className="grid items-start gap-10 rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-soft backdrop-blur-sm sm:p-8 md:grid-cols-2 md:gap-12 md:p-10">
          {/* What's inside */}
          <div className="order-2 md:order-1">
            <TimelineContent
              as="h3"
              animationNum={2}
              customVariants={revealVariants}
              className="font-serif text-2xl font-black text-slate-900 sm:text-3xl"
            >
              Qué incluye <span className="text-ayni-blue">{tier.name}</span>
            </TimelineContent>
            <p className="mt-1 text-sm text-slate-500">{tier.hint}</p>

            <AnimatePresence mode="wait">
              <motion.div
                key={vertical.name + tier.name}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                className="mt-6 space-y-4"
              >
                {tier.features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    custom={index}
                    variants={featureVariants}
                    className="flex items-start"
                  >
                    <div
                      className={cn(
                        "mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full",
                        feature.soon
                          ? "border border-dashed border-slate-300 text-slate-400"
                          : "bg-ayni-blue text-white shadow-md shadow-ayni-blue/40"
                      )}
                    >
                      {feature.soon ? <Clock3 className="h-3.5 w-3.5" /> : <CheckCheck className="h-4 w-4" />}
                    </div>
                    <span
                      className={cn(
                        "text-sm leading-snug sm:text-base",
                        feature.soon ? "text-slate-500" : "text-slate-700"
                      )}
                    >
                      {feature.text}
                      {feature.soon && (
                        <span className="ml-2 inline-block whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Próximamente
                        </span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Configurator */}
          <div className="order-1 space-y-8 md:order-2">
            <TimelineContent as="div" animationNum={3} customVariants={revealVariants}>
              <h4 className="mb-1 font-semibold text-slate-900">1. Elige tu rubro</h4>
              <p className="mb-2 text-sm text-slate-600">{vertical.hint}</p>
              <PricingSwitch
                options={verticals.map((v) => v.name)}
                selected={verticalIndex}
                onSwitch={selectVertical}
                className="grid w-full grid-cols-3"
              />
            </TimelineContent>

            <TimelineContent as="div" animationNum={4} customVariants={revealVariants}>
              {vertical.mode === "billing" ? (
                <>
                  <h4 className="mb-1 font-semibold text-slate-900">2. Facturación</h4>
                  <p className="mb-2 text-sm text-slate-600">Paga anual y ahorra 20%</p>
                  <PricingSwitch
                    options={[
                      "Mensual",
                      <>
                        Anual
                        <span className="rounded-full bg-ayni-green px-1.5 py-0.5 text-[10px] font-bold text-white sm:text-[11px]">
                          −20%
                        </span>
                      </>,
                    ]}
                    selected={isAnnual ? 1 : 0}
                    onSwitch={(i) => setIsAnnual(i === 1)}
                    className="grid w-full grid-cols-2"
                  />
                </>
              ) : (
                <>
                  <h4 className="mb-1 font-semibold text-slate-900">2. Tamaño de tu centro</h4>
                  <p className="mb-2 text-sm text-slate-600">2 sillones, 4 sillones o varias sedes</p>
                  <PricingSwitch
                    options={vertical.tiers.map((t) =>
                      t.name === "Consultorio Solo" ? "Consultorio" : t.name === "Clínica Dental Pro" ? "Clínica" : t.name
                    )}
                    selected={tierIndex}
                    onSwitch={setTierIndex}
                    className="grid w-full grid-cols-3"
                  />
                </>
              )}
            </TimelineContent>

            <TimelineContent
              as="div"
              animationNum={5}
              customVariants={revealVariants}
              className="grid items-center gap-4 sm:grid-cols-2"
            >
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="flex items-baseline">
                  <span className="font-serif text-5xl font-black text-slate-900">
                    S/&nbsp;
                    <NumberFlow value={currentPrice} format={priceFormat} className="font-serif text-5xl font-black" />
                  </span>
                  {annualActive && (
                    <span className="relative ml-2 text-xl font-semibold text-slate-400 line-through">
                      S/&nbsp;
                      <NumberFlow value={tier.monthly} format={priceFormat} className="text-xl font-semibold" />
                    </span>
                  )}
                </div>
                <span className="mt-1 text-xs font-medium text-slate-500">
                  {tier.unit}
                  {annualActive
                    ? ` · S/ ${(currentPrice * 12).toFixed(2)} al año`
                    : ` · ${tier.note}`}
                </span>
              </div>

              <a
                href={tier.cta.href}
                {...(tier.cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border-4 border-ayni-green-d bg-gradient-to-t from-ayni-green-d via-ayni-green to-ayni-green-d text-base font-bold text-white shadow-sm shadow-ayni-green-d transition-transform hover:scale-[1.02] active:scale-[0.99] sm:h-16 sm:text-lg"
              >
                {tier.cta.label}
                {tier.cta.icon === "arrow" ? <MoveRight className="h-5 w-5" /> : <PhoneCall className="h-5 w-5" />}
              </a>
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
}
