import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Store,
  Tag,
  ShieldCheck,
  HelpCircle,
  UtensilsCrossed,
  Receipt,
  ChefHat,
  ScanBarcode,
  Layers,
  AlertTriangle,
  Truck,
  Smile,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  Menu,
  X,
  BookOpen,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import { YamassiLogo } from "@/components/ui/yamassi-logo";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { PruebaGratisMenu } from "@/components/ui/prueba-gratis-menu";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export type HeaderVertical = "home" | "restaurantes" | "market" | "odontologia";

export const VERTICAL_NAV_ITEMS: Record<HeaderVertical, NavItem[]> = {
  home: [
    { name: "Funciones", url: "#funciones", icon: LayoutGrid },
    { name: "Rubros", url: "#rubros", icon: Store },
    { name: "Precios", url: "#precios", icon: Tag },
    { name: "Confianza", url: "#confianza", icon: ShieldCheck },
    { name: "Preguntas", url: "#faq", icon: HelpCircle },
  ],
  restaurantes: [
    { name: "Comandas", url: "#comandas", icon: UtensilsCrossed },
    { name: "Mesas", url: "#mesas", icon: LayoutGrid },
    { name: "Caja & POS", url: "#caja", icon: Receipt },
    { name: "Recetas", url: "#recetas", icon: ChefHat },
    { name: "Precios", url: "#precios", icon: Tag },
  ],
  market: [
    { name: "POS Rápido", url: "#pos", icon: ScanBarcode },
    { name: "Inventario", url: "#inventario", icon: Layers },
    { name: "Vencimientos", url: "#alertas", icon: AlertTriangle },
    { name: "Proveedores", url: "#proveedores", icon: Truck },
    { name: "Precios", url: "#precios", icon: Tag },
  ],
  odontologia: [
    { name: "Odontograma", url: "#odontograma", icon: Smile },
    { name: "Agenda WhatsApp", url: "#agenda", icon: CalendarCheck },
    { name: "Historias", url: "#historias", icon: ClipboardList },
    { name: "Caja y Cuotas", url: "#caja", icon: CreditCard },
    { name: "Precios", url: "#precios", icon: Tag },
  ],
};

export interface SiteHeaderProps {
  vertical?: HeaderVertical;
  navItems?: NavItem[];
}

export function SiteHeader({ vertical = "home", navItems }: SiteHeaderProps) {
  const activeItems = navItems || VERTICAL_NAV_ITEMS[vertical] || VERTICAL_NAV_ITEMS.home;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar: logo + primary CTA + mobile hamburger */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "border-b border-border bg-white/95 backdrop-blur-xl shadow-xs"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" aria-label="Yamassi inicio" onClick={() => setMobileMenuOpen(false)} className="shrink-0">
            <YamassiLogo
              inverted={!scrolled && !mobileMenuOpen}
              className={`transition-[filter,color] duration-300 ${
                scrolled || mobileMenuOpen
                  ? "[filter:drop-shadow(0_1px_1px_rgba(15,23,42,0.10))]"
                  : "[filter:drop-shadow(0_2px_10px_rgba(8,12,20,0.55))]"
              }`}
            />
          </a>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/tienda"
              className={`hidden text-sm font-semibold transition-colors 2xl:inline whitespace-nowrap ${
                scrolled || mobileMenuOpen
                  ? "text-slate-700 hover:text-emerald-600"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Tienda POS
            </a>

            <a
              href="/login"
              className={`hidden text-sm font-medium transition-colors sm:inline whitespace-nowrap ${
                scrolled || mobileMenuOpen
                  ? "text-muted-foreground hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Iniciar sesión
            </a>

            <PruebaGratisMenu buttonSize="sm" label="Empieza gratis" />

            {/* Mobile menu toggle (visible only on < xl) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`xl:hidden flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
                scrolled || mobileMenuOpen
                  ? "border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
              }`}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer (visible only on < xl) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 xl:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-white/10 bg-[#0b1f4d]/98 backdrop-blur-2xl p-5 text-white shadow-2xl"
          >
            {/* Secciones de navegación */}
            <div className="space-y-1">
              <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Navegación
              </p>
              {activeItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (item.url.startsWith("#")) {
                        window.dispatchEvent(new CustomEvent("expandHero"));
                        const target = document.querySelector(item.url);
                        if (target) {
                          e.preventDefault();
                          setTimeout(() => {
                            target.scrollIntoView({ behavior: "smooth" });
                          }, 120);
                          history.pushState(null, "", item.url);
                        }
                      }
                    }}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4 text-emerald-300" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Soluciones por rubro */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-1">
              <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Soluciones por rubro
              </p>
              <a
                href="/restaurantes"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300">
                    <UtensilsCrossed className="h-4 w-4" />
                  </span>
                  <span>Restaurantes & Comandas</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </a>
              <a
                href="/market"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                    <Store className="h-4 w-4" />
                  </span>
                  <span>Caja, POS & Minimarkets</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </a>
              <a
                href="/odontologia"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300">
                    <Smile className="h-4 w-4" />
                  </span>
                  <span>Clínica Odontológica</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </a>
              <a
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <span>Documentación</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </a>
              <a
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <span>Blog & Guías</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </a>
              <a
                href="/tienda"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                    <ShoppingBag className="h-4 w-4" />
                  </span>
                  <span>Tienda Hardware POS</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </a>
            </div>

            {/* Acciones inferiores */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
              <a
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center rounded-xl border border-white/20 bg-white/5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Iniciar sesión
              </a>
              <a
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-bold text-white shadow-lg"
              >
                Empieza gratis hoy
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tubelight section nav (visible only on desktop >= lg) */}
      <NavBar items={activeItems} />
    </>
  );
}

export default SiteHeader;

