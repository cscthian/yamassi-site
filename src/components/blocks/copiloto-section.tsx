import { motion } from "framer-motion";
import {
  Sparkles,
  LineChart,
  PackageSearch,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";

const SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const capabilities = [
  {
    icon: LineChart,
    title: "Reportes IA de flujo de caja",
    body: "Cada mañana recibes un resumen claro de cómo va tu plata: cuánto entró, cuánto sale y qué días flojean. Sin abrir Excel ni hacer cuentas a mano.",
  },
  {
    icon: PackageSearch,
    title: "Predice compras y evita mermas",
    body: "Te avisa qué reponer y cuánto, antes de que te quedes sin stock o se te venza la mercadería. Compras justas, menos plata muerta en el almacén.",
  },
  {
    icon: BrainCircuit,
    title: "Decisiones comerciales sin estrés",
    body: "Pregúntale qué producto te deja más margen o qué promoción conviene. Te responde con tus propios números, como un consultor que conoce tu negocio.",
  },
];

/**
 * Co-piloto IA — premium, dark "consultant" section. Sells Yamassi's AI agent to the
 * Peruvian business owner as a trusted advisor ("tu consultor de confianza"),
 * using the interactive Spline robot (agente.txt) framed by an indigo/violet
 * spotlight that stays inside the Yamassi dark-blue palette.
 */
export function CopilotoSection() {
  return (
    <section
      id="copiloto-ia"
      className="relative w-full overflow-hidden bg-[#080c14] py-20 md:py-28"
    >
      {/* Ambient indigo/violet depth */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#8b5cf6"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-200">
              <Sparkles className="h-3.5 w-3.5" />
              Co-piloto IA · Tu consultor de confianza
            </span>

            <h2 className="mt-6 font-serif text-4xl font-black leading-tight tracking-tight text-white md:text-5xl text-balance">
              El consultor que tu negocio{" "}
              <span className="bg-gradient-to-r from-violet-300 via-indigo-200 to-emerald-200 bg-clip-text text-transparent">
                siempre quiso tener
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              No es una app más: es un asesor que vive dentro de Yamassi, conoce
              cada venta de tu negocio y te guía para crecer ordenado. Tú decides;
              él te da los números claros para hacerlo sin estrés.
            </p>

            <div className="mt-9 space-y-4">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.15 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors hover:border-violet-400/30 hover:bg-white/[0.07]"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/20 transition-colors group-hover:bg-violet-500/25">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {cap.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">
                        {cap.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button variant="money" size="lg" asChild>
                <a href="/login" className="group">
                  Activa tu Co-piloto IA
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <span className="text-sm text-white/50">
                Incluido en el plan Empresa
              </span>
            </div>
          </motion.div>

          {/* Right: interactive 3D agent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] md:h-[520px]"
          >
            <Spotlight className="-top-20 left-10" fill="#6366f1" />
            <SplineScene
              scene={SPLINE_SCENE}
              className="h-full w-full"
            />
            {/* keep the robot legible on small screens */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080c14] to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
