import {
  Headset,
  DatabaseBackup,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import SectionWithMockup from "@/components/blocks/section-with-mockup";

const pillars = [
  {
    icon: Headset,
    title: "Soporte técnico local y humano",
    body: "Te responde una persona real en el Perú, por WhatsApp o teléfono.",
  },
  {
    icon: DatabaseBackup,
    title: "Migración de datos gratis",
    body: "Traemos tus productos, clientes e inventario sin costo ni complicaciones.",
  },
  {
    icon: ShieldCheck,
    title: "Facturación SUNAT (si deseas activarla)",
    body: "Vende tranquilo con notas de venta internas. Y si en algún momento lo decides, puedes activar la facturación oficial de SUNAT con un clic.",
  },
];

const PRIMARY_MOCKUP =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop";
const SECONDARY_MOCKUP =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop";

const chips = [
  <div
    key="sunat"
    className="flex items-center gap-2 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-soft backdrop-blur"
  >
    <CheckCircle2 className="h-5 w-5 text-ayni-green" />
    <div className="leading-tight">
      <p className="text-xs font-bold text-foreground">Venta registrada</p>
      <p className="text-[11px] text-muted-foreground">Caja al día · hace 2 s</p>
    </div>
  </div>,
  <div
    key="ventas"
    className="flex items-center gap-2 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-soft backdrop-blur"
  >
    <TrendingUp className="h-5 w-5 text-ayni-blue" />
    <div className="leading-tight">
      <p className="text-xs font-bold text-foreground">Ventas de hoy</p>
      <p className="text-[11px] text-muted-foreground">S/ 2,840 · +12%</p>
    </div>
  </div>,
];

export function ConfianzaSection() {
  return (
    <div id="confianza" className="scroll-mt-20">
      <SectionWithMockup
        title={
          <>
            El sistema que los emprendedores
            <br className="hidden md:block" /> peruanos merecían desde siempre
          </>
        }
        description={
          <>
            Ventas, inventario, equipo y reportes en una sola app, en español y
            con soporte real. Empiezas a vender formal desde el primer día.
            <div className="mt-8 flex flex-col gap-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="group/pillar -mx-3 flex cursor-default items-start gap-4 rounded-2xl p-3 transition-all duration-200 hover:scale-[1.02] hover:bg-white hover:shadow-soft"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary ring-1 ring-primary/10 transition-all duration-300 group-hover/pillar:rotate-[-6deg] group-hover/pillar:scale-110 group-hover/pillar:bg-primary group-hover/pillar:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        }
        primaryImageSrc={PRIMARY_MOCKUP}
        secondaryImageSrc={SECONDARY_MOCKUP}
        floatingChips={chips}
      />
    </div>
  );
}
