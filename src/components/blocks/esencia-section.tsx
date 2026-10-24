import { Handshake, Merge, SplitSquareHorizontal } from "lucide-react";

// The three Andean principles behind the Yamassi brand. Colors echo the logo:
// green sun, blue moon, and the shared center where they meet.
const principles = [
  {
    icon: SplitSquareHorizontal,
    name: "Yanantin",
    meaning: "Dualidad complementaria",
    body: "Dos mitades distintas que juntas forman un todo. Tu experiencia y nuestra tecnología; vender y controlar; tu negocio y la SUNAT, en equilibrio.",
    accent: "from-emerald-300 to-ayni-green",
    ring: "group-hover:ring-emerald-400/60",
  },
  {
    icon: Merge,
    name: "Masintin",
    meaning: "El encuentro que fortalece",
    body: "Las mitades se acercan hasta parecerse. Con cada venta, Yamassi aprende cómo trabajas y se vuelve más tuyo: el sistema se adapta a ti, no al revés.",
    accent: "from-ayni-blue-m to-ayni-blue",
    ring: "group-hover:ring-blue-400/60",
  },
  {
    icon: Handshake,
    name: "Ayni",
    meaning: "Reciprocidad",
    body: "Hoy por ti, mañana por mí. Crecemos solo si tú creces: precios justos, soporte humano en el Perú y una relación de largo plazo.",
    accent: "from-ayni-green to-ayni-blue-m",
    ring: "group-hover:ring-teal-300/60",
  },
];

export function EsenciaSection() {
  return (
    <section
      id="esencia"
      className="relative w-full overflow-hidden bg-[#0b1f4d] py-20 text-white md:py-28"
    >
      {/* Complementary glows: green sun on one side, blue moon on the other */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-ayni-green/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-ayni-blue-m/30 blur-3xl"
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="transition-transform duration-500 hover:rotate-180 hover:scale-105 drop-shadow-[0_10px_40px_rgba(16,185,129,0.35)] cursor-pointer">
            <img
              src="/yamassi-logo.svg"
              alt="Logo de Yamassi"
              width={112}
              height={112}
              className="h-24 w-24 md:h-28 md:w-28"
            />
          </div>

          <span className="mt-8 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Cosmovisión andina
          </span>

          <h2 className="mt-5 font-serif text-4xl font-black leading-tight tracking-tight text-balance md:text-5xl">
            Tecnología con raíz andina
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Yamassi nace de{" "}
            <strong className="text-emerald-300">Yanantin</strong> y{" "}
            <strong className="text-blue-300">Masintin</strong>, y se sostiene
            en el <strong className="text-teal-200">Ayni</strong>: tres principios
            de la cosmovisión andina sobre el equilibrio, el encuentro y la
            reciprocidad. Con ellos construimos el sistema de tu negocio.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`group relative overflow-hidden rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.09] hover:shadow-2xl ${p.ring}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${p.accent} opacity-80`}
                />
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accent} text-white shadow-lg transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-black">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-white/50">
                  {p.meaning}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default EsenciaSection;
