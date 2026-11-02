import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, MoveRight, PhoneCall, Zap } from "lucide-react";

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
        "relative z-10 flex w-full rounded-full border border-slate-200 bg-slate-100/80 p-1",
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
            "relative z-10 h-10 w-full rounded-full px-2 py-1 text-sm font-semibold transition-colors sm:h-12 sm:px-4 sm:text-base cursor-pointer",
            selected === i
              ? "text-white"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          {selected === i && (
            <motion.span
              layoutId={switchLayoutId}
              className="absolute left-0 top-0 h-10 w-full rounded-full border-2 border-ayni-blue-d bg-gradient-to-t from-ayni-blue-d via-ayni-blue to-ayni-blue-d shadow-sm shadow-ayni-blue-d/30 sm:h-12"
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
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

export function AyniPricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [planIndex, setPlanIndex] = useState(1);

  const plan = plans[planIndex];
  const currentPrice = isAnnual ? plan.annual : plan.monthly;
  const originalPrice = plan.monthly;

  return (
    <section
      id="precios"
      className="relative mx-auto w-full overflow-hidden bg-ayni-grid px-4 py-14 md:py-24 scroll-mt-20 border-b border-slate-200/80"
    >
      {/* Header */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ayni-green-d">
          <Zap className="h-3.5 w-3.5 fill-ayni-green text-ayni-green" />
          <span>Precios claros, sin sorpresas</span>
        </div>

        <h2 className="font-serif text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Empieza a vender formal hoy
        </h2>

        <p className="mt-3 text-base text-slate-600 sm:text-lg md:text-xl">
          Yamassi es gratis para empezar. Elige tu plan especializado y paga solo cuando superes los límites gratuitos.
        </p>
      </div>

      {/* Product features + configurator card */}
      <div className="relative z-10 mx-auto mt-8 max-w-5xl md:mt-12">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft sm:p-8 md:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Configurator (First on mobile so users can switch plans immediately) */}
            <div className="order-1 space-y-6 lg:order-2">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    1. Elige tu rubro
                  </h4>
                  <span className="text-xs font-semibold text-ayni-blue">
                    Plan {plan.name}
                  </span>
                </div>
                <PricingSwitch
                  options={plans.map((p) => p.name)}
                  onSwitch={setPlanIndex}
                  defaultIndex={1}
                  className="grid w-full grid-cols-3"
                />
                <p className="mt-2 min-h-[20px] text-xs sm:text-sm text-slate-600">
                  {plan.hint}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    2. Facturación
                  </h4>
                  <span className="text-xs font-medium text-emerald-600">
                    Paga anual y ahorra 20%
                  </span>
                </div>
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
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-black text-slate-900 sm:text-5xl">
                      S/ {currentPrice.toFixed(2)}
                    </span>
                    {isAnnual && (
                      <span className="text-base font-medium text-slate-400 line-through">
                        S/ {originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 text-xs font-medium text-slate-500">
                    / mes + IGV
                    {isAnnual
                      ? ` · S/ ${(currentPrice * 12).toFixed(2)} al año`
                      : " · Plan gratuito disponible"}
                  </span>
                </div>

                <a
                  href="/login"
                  className="flex h-12 w-full sm:w-auto sm:px-7 items-center justify-center gap-2 rounded-full border-2 border-ayni-green-d bg-gradient-to-t from-ayni-green-d via-ayni-green to-ayni-green-d whitespace-nowrap text-base font-bold text-white shadow-md shadow-ayni-green/25 transition-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  {plan.cta.label}
                  {plan.cta.icon === "arrow" ? (
                    <MoveRight className="h-5 w-5" />
                  ) : (
                    <PhoneCall className="h-5 w-5" />
                  )}
                </a>
              </div>
            </div>

            {/* What's inside */}
            <div className="order-2 lg:order-1 border-t border-slate-100 pt-6 lg:border-t-0 lg:border-r lg:border-slate-100 lg:pt-0 lg:pr-10">
              <h3 className="font-serif text-2xl font-black text-slate-900 sm:text-3xl">
                Qué incluye{" "}
                <span className="text-ayni-blue">{plan.name}</span>
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Todo lo necesario para operar desde el primer día:
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-5 space-y-3.5"
                >
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-ayni-green text-white shadow-xs">
                        <CheckCheck className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
