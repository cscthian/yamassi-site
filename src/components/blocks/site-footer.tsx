import { Star } from "lucide-react";
import { YamassiLogo } from "@/components/ui/yamassi-logo";
import { SubBrandLogo, type SubBrandId } from "@/components/ui/sub-brand-logo";
import { cn } from "@/lib/utils";

interface SiteFooterProps {
  /** Sub-brand variants repaint the footer in that vertical's colours. */
  variant?: "default" | "odonto" | "restobar" | "tienda";
}

const THEMES = {
  default: {
    footer: "bg-[#0b1f4d]",
    accent: "text-emerald-300",
    accentHover: "hover:text-emerald-200",
    divider: "border-white/10",
  },
  odonto: {
    footer: "bg-gradient-to-b from-[#021D4A] via-[#00133E] to-[#1b1660]",
    accent: "text-[#FCD448]",
    accentHover: "hover:text-[#FCE687]",
    divider: "border-[#5D43F7]/40",
  },
  restobar: {
    footer: "bg-gradient-to-b from-[#0B0F14] via-[#1a0a0c] to-[#4a0008]",
    accent: "text-[#F6D365]",
    accentHover: "hover:text-[#FBE7A1]",
    divider: "border-[#C1121F]/40",
  },
  tienda: {
    footer: "bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#2e1065]",
    accent: "text-[#34D399]",
    accentHover: "hover:text-[#A7F3D0]",
    divider: "border-[#9333EA]/40",
  },
};

const SUB_BRAND: Partial<Record<NonNullable<SiteFooterProps["variant"]>, SubBrandId>> = {
  odonto: "odontologia",
  restobar: "restaurantes",
  tienda: "market",
};

export function SiteFooter({ variant = "default" }: SiteFooterProps) {
  const t = THEMES[variant];
  return (
    <footer className={cn("py-14 text-white", t.footer)}>
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          {SUB_BRAND[variant] ? (
            <SubBrandLogo brand={SUB_BRAND[variant]!} inverted className="justify-center md:justify-start" />
          ) : (
            <YamassiLogo inverted />
          )}
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Ayni · Yanantin · Masintin — crecer juntos, en equilibrio. Punto de venta,
            control de inventario, caja y gestión para el negocio peruano.
          </p>
          <div className={cn("mt-4 flex items-center justify-center gap-1 md:justify-start", t.accent)}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-2 text-sm text-white/70">
              4.9 de 5 · 1,280 reseñas
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-center md:text-right">
          <div className={cn("flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-sm font-semibold", t.accent)}>
            <a href="/restaurantes" className={cn("transition-colors", t.accentHover)}>Restaurantes & Comandas</a>
            <a href="/market" className={cn("transition-colors", t.accentHover)}>Market & Inventario</a>
            <a href="/odontologia" className={cn("transition-colors", t.accentHover)}>Clínica Odontológica</a>
          </div>
          <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-xs text-white/60">
            <a href="/" className="hover:text-white transition-colors">Inicio</a>
            <a href="/#funciones" className="hover:text-white transition-colors">Funciones</a>
            <a href="/#rubros" className="hover:text-white transition-colors">Rubros</a>
            <a href="/#precios" className="hover:text-white transition-colors">Precios</a>
            <a href="/docs" className="hover:text-white transition-colors">Documentación</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog & Guías</a>
            <a href="/info/politicas-privacidad" className="hover:text-white transition-colors">Políticas de Privacidad</a>
            <a href="/info/terminos-condiciones-uso" className="hover:text-white transition-colors">Términos de Uso</a>
            <a href="/login" className={cn("font-medium transition-colors", t.accent, "hover:text-white")}>Iniciar Sesión</a>
          </nav>
        </div>
      </div>
      <div className="container mx-auto mt-10 px-4">
        <p className={cn("border-t pt-6 text-center text-xs text-white/40", t.divider)}>
          © {new Date().getFullYear()} Yamassi · Hecho en el Perú · Software de punto de venta y gestión comercial
        </p>
      </div>
    </footer>
  );
}
export default SiteFooter;
