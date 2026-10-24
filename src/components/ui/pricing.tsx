import { useEffect, useId, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useInView, type Variants } from "framer-motion";
import { CheckCheck, MoveRight, PhoneCall, Zap } from "lucide-react";

import { TimelineContent } from "@/components/ui/timeline-animation";
import {
  VerticalCutReveal,
  type VerticalCutRevealRef,
} from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";

/** Pill switch from pricing-section-1, generalised to N options. */
const PricingSwitch = ({
  options,
  onSwitch,
  defaultIndex = 0,
  className,
  layoutId,
}: {
  options: React.ReactNode[];
  defaultIndex?: number;
  onSwitch: (index: number) => void;
  className?: string;
  layoutId?: string;
}) => {
  const [selected, setSelected] = useState(defaultIndex);
  const uniqueId = useId();
  const switchLayoutId = layoutId || `switch-${uniqueId}`;

  const handleSwitch = (index: number) => {
    setSelected(index);
    onSwitch(index);
  };

  return (
    <div
      className={cn(
        "relative z-10 flex w-full rounded-full border border-gray-200 bg-neutral-50 p-1",
        className
      )}
    >
      {options.map((label, i) => (
        <button
          key={i}
          type="button"
          aria-pressed={selected === i}
          onClick={() => handleSwitch(i)}
          className={cn(
            "relative z-10 h-10 w-full rounded-full px-2 py-1 text-sm font-medium transition-colors sm:h-14 sm:px-4 sm:text-base cursor-pointer",
            selected === i
              ? "text-white"
              : "text-muted-foreground hover:text-black"
          )}
        >
          {selected === i && (
            <motion.span
              layoutId={switchLayoutId}
              className="absolute left-0 top-0 h-10 w-full rounded-full border-4 border-ayni-blue-d bg-gradient-to-t from-ayni-blue-d via-ayni-blue to-ayni-blue-d shadow-sm shadow-ayni-blue-d sm:h-14"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center justify-center gap-1.5">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

interface Plan {
  name: string;
  hint: string;
  /** Monthly price in soles (+ IGV). Annual billing = 20% off, per month. */
  monthly: number;
  annual: number;
  cta: { label: string; icon: "arrow" | "phone" };
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Tienda",
    hint: "Para bodegas, minimarkets, ferreterías y tiendas de retail",
    monthly: 14.9,
    annual: 11.9,
    cta: { label: "Empieza gratis", icon: "arrow" },
    features: [
      "POS ultra rápido con lector de código de barras",
      "Control de inventario, stock y alertas de vencimiento",
      "Comprobantes y ventas (SUNAT opcional si deseas)",
      "Cobros con Yape, Plin y tarjetas",
      "100% Web App: funciona en PC, laptop o celular",
      "Plan Gratuito disponible para empezar sin costo",
    ],
  },
  {
    name: "RestoBar",
    hint: "Para restaurantes, cafeterías, cevicherías, bares y pollerías",
    monthly: 16.9,
    annual: 13.5,
    cta: { label: "Empieza gratis", icon: "arrow" },
    features: [
      "Comandas digitales instantáneas a cocina y barra",
      "Mapa interactivo de mesas y división de cuentas",
      "Control de recetas, escandallos y mermas",
      "Caja rápida, propinas por mozo y arqueo ciego",
      "Comprobantes y caja (SUNAT opcional si deseas)",
      "Plan Gratuito disponible para empezar sin costo",
    ],
  },
  {
    name: "Odontológico",
    hint: "Control clínico y administrativo para consultorios dentales",
    monthly: 39.9,
    annual: 31.9,
    cta: { label: "Empieza gratis", icon: "arrow" },
    features: [
      "Odontograma interactivo digital (norma MINSA)",
      "Agenda médica con recordatorios automáticos por WhatsApp",
      "Historias clínicas digitales y carga de radiografías",
      "Presupuestos dentales por fases de tratamiento",
      "Liquidación automática de comisiones a doctores",
      "Plan Gratuito disponible para empezar sin costo",
    ],
  },
];

const revealVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    // Each element reveals on its own entry, so keep the stagger short.
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
  hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};

const timelineVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
  hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};

export function AyniPricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [planIndex, setPlanIndex] = useState(1);
  const pricingRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cutRevealRef = useRef<VerticalCutRevealRef>(null);
  const headlineInView = useInView(headlineRef, { once: true });

  useEffect(() => {
    if (headlineInView) cutRevealRef.current?.startAnimation();
  }, [headlineInView]);

  const plan = plans[planIndex];
  const currentPrice = isAnnual ? plan.annual : plan.monthly;
  const originalPrice = plan.monthly;

  return (
    <section
      id="precios"
      ref={pricingRef}
      className="relative mx-auto w-full overflow-hidden px-4 pb-20 pt-10 scroll-mt-20"
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #1e4fbd 100%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <TimelineContent
            as="div"
            animationNum={0}
            customVariants={revealVariants}
            className="mb-4 flex items-center justify-center"
          >
            <Zap className="mr-2 h-5 w-5 fill-ayni-green text-ayni-green" />
            <span className="font-medium text-ayni-green-d">
              Precios claros, sin sorpresas
            </span>
          </TimelineContent>

          <h2
            ref={headlineRef}
            className="mb-4 font-serif text-3xl font-black leading-[120%] text-gray-900 sm:text-4xl md:text-5xl"
          >
            <VerticalCutReveal
              ref={cutRevealRef}
              autoStart={false}
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse
              containerClassName="justify-center"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                delay: 0.4,
              }}
            >
              Empieza a vender formal hoy
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={1}
            customVariants={revealVariants}
            className="text-lg text-gray-600 md:text-xl"
          >
            Yamassi es gratis para empezar. Elige tu plan especializado y paga solo cuando superes los límites gratuitos.
          </TimelineContent>
        </div>
      </div>

      {/* Product features + configurator */}
      <div className="relative z-10 px-0 sm:px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 sm:grid-cols-2 md:gap-12">
            {/* What's inside */}
            <div>
              <TimelineContent
                as="h3"
                animationNum={2}
                customVariants={revealVariants}
                className="mb-2 font-serif text-3xl font-black text-gray-900"
              >
                Qué incluye{" "}
                <span className="text-ayni-blue">{plan.name}</span>
              </TimelineContent>

              <AnimatePresence mode="wait">
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 space-y-4"
                >
                  {plan.features.map((feature, index) => (
                    <TimelineContent
                      key={feature}
                      as="div"
                      animationNum={index}
                      customVariants={timelineVariants}
                      className="flex items-center"
                    >
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ayni-green shadow-md shadow-ayni-green/60">
                        <CheckCheck className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </TimelineContent>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Configurator */}
            <div className="space-y-8">
              <TimelineContent
                as="div"
                animationNum={1}
                customVariants={revealVariants}
              >
                <h4 className="mb-2 font-semibold text-gray-900">Tu plan</h4>
                <p className="mb-2 min-h-[20px] text-sm text-gray-600">
                  {plan.hint}
                </p>
                <PricingSwitch
                  options={plans.map((p) => p.name)}
                  onSwitch={setPlanIndex}
                  defaultIndex={1}
                  className="grid w-full grid-cols-3"
                />
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={2}
                customVariants={revealVariants}
              >
                <h4 className="mb-1 font-semibold text-gray-900">
                  Facturación
                </h4>
                <p className="mb-2 text-sm text-gray-600">
                  Paga anual y ahorra 20%
                </p>
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
                  onSwitch={(i) => setIsAnnual(i === 1)}
                  className="grid w-full grid-cols-2"
                />
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={3}
                customVariants={revealVariants}
                className="grid grid-cols-1 items-center gap-4 px-2 text-center sm:grid-cols-2 sm:gap-2"
              >
                <div className="flex flex-col items-center sm:mb-4 sm:items-start">
                  <div className="flex items-center">
                    <span className="font-serif text-4xl font-black text-gray-900 sm:text-5xl">
                      S/&nbsp;
                      <NumberFlow
                        value={currentPrice}
                        format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                      />
                    </span>
                    {isAnnual && (
                      <span className="relative ml-2 text-xl text-gray-600 line-through">
                        S/ {originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 text-xs text-gray-500">
                    / mes + IGV
                    {isAnnual ? ` · S/ ${(currentPrice * 12).toFixed(2)} al año` : ""}
                  </span>
                </div>
                <TimelineContent
                  as="a"
                  href="/login"
                  animationNum={1}
                  customVariants={revealVariants}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-4 border-ayni-green-d bg-gradient-to-t from-ayni-green-d via-ayni-green to-ayni-green-d whitespace-nowrap text-base font-semibold text-white shadow-sm shadow-ayni-green-d transition-transform hover:scale-[1.03] sm:h-16 sm:text-lg"
                >
                  {plan.cta.label}
                  {plan.cta.icon === "arrow" ? (
                    <MoveRight className="h-5 w-5" />
                  ) : (
                    <PhoneCall className="h-5 w-5" />
                  )}
                </TimelineContent>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
