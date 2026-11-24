import { PruebaGratisMenu, PRUEBA_GRATIS_BRANDS } from "@/components/ui/prueba-gratis-menu";
import { SUB_BRANDS } from "@/components/ui/sub-brand-logo";

interface HeroCoverCtaProps {
  className?: string;
}

/** Short chip labels for the hero. */
const CHIP_LABEL = {
  market: "Caja, POS & Minimarkets",
  restaurantes: "Restaurantes & Comandas",
  odontologia: "Clínicas Dentales",
} as const;

export function HeroCoverCta({ className = "" }: HeroCoverCtaProps) {
  return (
    <div className={`relative z-30 mx-auto flex w-full max-w-3xl select-none flex-col items-center px-2 text-center sm:px-3 ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: ".hero-chip{color:var(--chip-c);border-color:color-mix(in oklab,var(--chip-c) 40%,transparent)}.hero-chip:hover,.hero-chip:focus-visible{background:var(--chip-c);color:var(--chip-ink);border-color:var(--chip-c);box-shadow:0 14px 34px -14px var(--chip-c)}" }} />

      {/* 1. Cada rubro lleva directo a su plataforma, en sus propios colores */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5 sm:mb-4 sm:gap-2 lg:flex-nowrap">
        {PRUEBA_GRATIS_BRANDS.map((id) => {
          const b = SUB_BRANDS[id];
          return (
            <a
              key={id}
              href={b.app}
              target="_blank"
              rel="noopener noreferrer"
              title={"Ir a " + b.name}
              style={{ ["--chip-c" as string]: b.soft, ["--chip-ink" as string]: b.softInk }}
              className="hero-chip group inline-flex min-h-[34px] items-center gap-2 rounded-full border bg-[#0b1f4d]/70 py-1 pl-1 pr-3.5 text-[11px] font-semibold shadow-[0_18px_50px_-20px_rgba(30,58,138,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:min-h-[38px] sm:pr-4 sm:text-xs"
            >
              <img
                src={b.mark}
                alt=""
                width={28}
                height={28}
                className="h-6 w-6 rounded-full transition-transform duration-700 group-hover:rotate-[360deg] sm:h-7 sm:w-7"
              />
              <span>{CHIP_LABEL[id]}</span>
            </a>
          );
        })}
      </div>

      {/* 2. Llamada a la acción: elige tu plataforma y empieza gratis */}
      <PruebaGratisMenu variant="hero" label="Empieza gratis hoy" align="center" dropDirection="up" />

      {/* 3. Indicador amigable */}
      <p className="mt-2.5 text-[10.5px] font-medium leading-normal text-emerald-100/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:mt-3 sm:text-xs">
        Yamassi es gratis · Elige tu rubro o desliza para descubrir más ↓
      </p>
    </div>
  );
}

export default HeroCoverCta;
