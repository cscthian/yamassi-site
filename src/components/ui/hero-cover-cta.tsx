import { UtensilsCrossed, Store, Smile } from "lucide-react";
import { PruebaGratisMenu } from "@/components/ui/prueba-gratis-menu";

interface HeroCoverCtaProps {
  className?: string;
}

export function HeroCoverCta({ className = "" }: HeroCoverCtaProps) {
  return (
    <div
      className={`relative z-30 flex flex-col items-center text-center w-full max-w-lg mx-auto px-2 sm:px-3 select-none ${className}`}
    >
      {/* 1. Etiquetas encima indicando sistemas para restaurantes, caja y clínicas */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-3">
        <a
          href="/restaurantes"
          className="group inline-flex items-center gap-1.5 rounded-full border border-amber-400/35 bg-[#0b1f4d]/85 px-2.5 py-1 sm:px-3.5 sm:py-1 text-[10.5px] sm:text-xs font-bold text-amber-200 backdrop-blur-md transition-all hover:bg-amber-500/20 hover:border-amber-300 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.45)] min-h-[30px] sm:min-h-[36px]"
          title="Ver sistema de control de caja y comandas para restaurantes"
        >
          <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-amber-400/25 text-amber-300">
            <UtensilsCrossed className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </span>
          <span>Restaurantes & Comandas</span>
        </a>

        <a
          href="/market"
          className="group inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-[#0b1f4d]/85 px-2.5 py-1 sm:px-3.5 sm:py-1 text-[10.5px] sm:text-xs font-bold text-emerald-200 backdrop-blur-md transition-all hover:bg-emerald-500/20 hover:border-emerald-300 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.45)] min-h-[30px] sm:min-h-[36px]"
          title="Ver sistema de control de caja, ventas e inventario"
        >
          <span className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-emerald-400/25 text-emerald-300">
            <Store className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </span>
          <span>Caja, POS & Minimarkets</span>
        </a>

      </div>

      {/* 2. Llamada a la acción con el menú interactivo para elegir qué probar ENCIMA (dropDirection="up") */}
      <div className="flex flex-col items-center">
        <PruebaGratisMenu
          buttonSize="default"
          label="Empieza gratis hoy"
          align="center"
          dropDirection="up"
        />
      </div>

      {/* 3. Indicador amigable de deslizar / condiciones */}
      <p className="mt-1.5 sm:mt-2.5 text-[10.5px] sm:text-xs text-emerald-100/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] font-medium leading-normal">
        Yamassi es gratis · Elige tu rubro arriba o desliza para descubrir más ↓
      </p>
    </div>
  );
}

export default HeroCoverCta;
