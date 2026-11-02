import { Star } from "lucide-react";
import { YamassiLogo } from "@/components/ui/yamassi-logo";

export function SiteFooter() {
  return (
    <footer className="bg-[#0b1f4d] py-14 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <YamassiLogo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Ayni · Yanantin · Masintin — crecer juntos, en equilibrio. Punto de venta,
            control de inventario, caja y gestión para el negocio peruano.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1 text-emerald-300 md:justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-2 text-sm text-white/70">
              4.9 de 5 · 1,280 reseñas
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-center md:text-right">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-sm font-semibold text-emerald-300">
            <a href="/restaurantes" className="hover:text-emerald-200 transition-colors">Restaurantes & Comandas</a>
            <a href="/market" className="hover:text-emerald-200 transition-colors">Market & Inventario</a>
            <a href="/odontologia" className="hover:text-emerald-200 transition-colors">Clínica Odontológica</a>
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
            <a href="/login" className="hover:text-white transition-colors font-medium text-emerald-300">Iniciar Sesión</a>
          </nav>
        </div>
      </div>
      <div className="container mx-auto mt-10 px-4">
        <p className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Yamassi · Hecho en el Perú · Software de punto de venta y gestión comercial
        </p>
      </div>
    </footer>
  );
}
export default SiteFooter;
