import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Store,
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
  BookOpen,
  Newspaper,
  ShoppingBag,
  Tag,
  LogIn,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { YamassiLogo } from "@/components/ui/yamassi-logo";
import { SUB_BRANDS, SubBrandWordmark, isSubBrand, type SubBrandId } from "@/components/ui/sub-brand-logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PruebaGratisMenu } from "@/components/ui/prueba-gratis-menu";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  description?: string;
}

export type HeaderVertical = "home" | "restaurantes" | "market" | "odontologia";

/** Sections of each page, shown under "Funciones" (pricing has its own link). */
export const VERTICAL_NAV_ITEMS: Record<HeaderVertical, NavItem[]> = {
  home: [
    { name: "Funciones", url: "/#funciones", icon: LayoutGrid, description: "Ventas, caja, inventario y facturación SUNAT." },
    { name: "Rubros", url: "/#rubros", icon: Store, description: "Soluciones para tiendas, restaurantes y consultorios." },
    { name: "Confianza", url: "/#confianza", icon: ShieldCheck, description: "Soporte en Perú y tu información segura." },
    { name: "Preguntas", url: "/#faq", icon: HelpCircle, description: "Respuestas claras antes de empezar." },
  ],
  restaurantes: [
    { name: "Comandas", url: "#comandas", icon: UtensilsCrossed, description: "Del mozo a cocina y barra en menos de 1 segundo." },
    { name: "Mesas", url: "#mesas", icon: LayoutGrid, description: "Salón en vivo, juntar mesas y dividir cuentas." },
    { name: "Caja & POS", url: "#caja", icon: Receipt, description: "Arqueo ciego, Yape, Plin y boletas SUNAT." },
    { name: "Recetas", url: "#recetas", icon: ChefHat, description: "Costo por plato, insumos y mermas." },
  ],
  market: [
    { name: "POS rápido", url: "#pos", icon: ScanBarcode, description: "Escáner, balanza y cobro en segundos." },
    { name: "Inventario", url: "#inventario", icon: Layers, description: "Kardex valorizado y stock mínimo." },
    { name: "Vencimientos", url: "#alertas", icon: AlertTriangle, description: "Semáforo de caducidad por lote." },
    { name: "Proveedores", url: "#proveedores", icon: Truck, description: "Compras, XML y pagos a distribuidores." },
  ],
  odontologia: [
    { name: "Odontograma", url: "#odontograma", icon: Smile, description: "Odontograma digital norma MINSA." },
    { name: "Agenda WhatsApp", url: "#agenda", icon: CalendarCheck, description: "Citas por sillón y recordatorios en 1 clic." },
    { name: "Historias", url: "#historias", icon: ClipboardList, description: "Historias clínicas y consentimientos." },
    { name: "Caja y cuotas", url: "#caja", icon: CreditCard, description: "Cuentas de tratamiento y arqueo." },
  ],
};

const PRICING_URL: Record<HeaderVertical, string> = {
  home: "/#precios",
  restaurantes: "#precios",
  market: "#precios",
  odontologia: "#precios",
};

/** Sub-brand solutions, drawn with their own marks. */
const SOLUTIONS: { id: SubBrandId; text: string }[] = [
  { id: "restaurantes", text: "Restaurantes, pollerías, cafeterías y bares." },
  { id: "market", text: "Bodegas, minimarkets y tiendas." },
  { id: "odontologia", text: "Consultorios y clínicas dentales." },
];

const RESOURCES: NavItem[] = [
  { name: "Documentación", url: "/docs/", icon: BookOpen, description: "Guías paso a paso de cada sistema." },
  { name: "Blog & Guías", url: "/blog/", icon: Newspaper, description: "Consejos para hacer crecer tu negocio." },
  { name: "Tienda Hardware POS", url: "/tienda/", icon: ShoppingBag, description: "Impresoras, lectoras y equipos POS." },
];

/** Accent colours of the header per brand. */
const ACCENT: Record<HeaderVertical, { ink: string; soft: string }> = {
  home: { ink: "#059669", soft: "#ECFDF5" },
  restaurantes: { ink: "#C1121F", soft: "#FDF2F2" },
  market: { ink: "#059669", soft: "#ECFDF5" },
  odontologia: { ink: "#5D43F7", soft: "#F2F0FF" },
};

export interface SiteHeaderProps {
  vertical?: HeaderVertical;
  navItems?: NavItem[];
}

/** Same-page anchors scroll smoothly (and open the home hero first). */
function onAnchor(e: MouseEvent<HTMLAnchorElement>, url: string, done?: () => void) {
  done?.();
  const hash = url.startsWith("/#") && window.location.pathname === "/" ? url.slice(1) : url.startsWith("#") ? url : null;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  window.dispatchEvent(new CustomEvent("expandHero"));
  setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 80);
  history.pushState(null, "", hash);
}

/** The logo on its own page glides back to the top (no reload) and, on the home, re-collapses the hero. */
function onLogo(e: MouseEvent<HTMLAnchorElement>, url: string, done?: () => void) {
  done?.();
  const norm = (p: string) => p.replace(/\/+$/, "") || "/";
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  if (norm(window.location.pathname) !== norm(url)) return;
  e.preventDefault();
  if (window.location.hash) history.pushState(null, "", window.location.pathname);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const settle = () => window.dispatchEvent(new Event("resetSection"));
  if (reduced || window.scrollY < 4) {
    window.scrollTo(0, 0);
    settle();
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  // wait until the glide reaches the top, then collapse the hero
  const t0 = performance.now();
  const wait = () => {
    if (window.scrollY < 4 || performance.now() - t0 > 2500) settle();
    else requestAnimationFrame(wait);
  };
  requestAnimationFrame(wait);
}

/** Each dropdown sits centred under its own trigger. */
const DROPDOWN =
  "ym-nav-viewport absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-slate-900 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] md:absolute md:left-1/2 md:top-full";

const NAV_CSS = `
.ym-nav-viewport{animation:ym-nav-in .18s ease-out}
.ym-popover[data-state=open]{animation:ym-nav-in .16s ease-out}
@keyframes ym-nav-in{from{opacity:0;transform:translateY(-4px) scale(.98)}to{opacity:1;transform:none}}
.ym-nav-link{color:var(--ym-fg);border-radius:999px}
.ym-nav-link:hover,.ym-nav-link[data-state=open]{color:var(--ym-hover);background:var(--ym-hover-bg)}
.ym-drop-item:hover,.ym-drop-item:focus-visible{background:var(--ym-soft)}
.ym-drop-item:hover .ym-drop-title{color:var(--ym-ink)}
.ym-drop-ico{color:var(--ym-ink);background:var(--ym-soft)}
@media (prefers-reduced-motion:reduce){.ym-nav-viewport,.ym-popover[data-state=open]{animation:none}}
`;

export function SiteHeader({ vertical = "home", navItems }: SiteHeaderProps) {
  const sections = navItems || VERTICAL_NAV_ITEMS[vertical] || VERTICAL_NAV_ITEMS.home;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Sub-brand: the Yamassi mark spins into the vertical's own mark on arrival.
  const subBrandId = isSubBrand(vertical) ? vertical : null;
  const sb = subBrandId ? SUB_BRANDS[subBrandId] : null;
  const [showSubBrand, setShowSubBrand] = useState(false);
  const accent = ACCENT[vertical] || ACCENT.home;
  // On a sub-landing, "Iniciar sesión" goes straight to that platform, not the shared chooser.
  const loginHref = sb ? sb.app : "/login/";
  const solid = scrolled || mobileOpen;

  useEffect(() => {
    if (!subBrandId) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setShowSubBrand(true), reduced ? 0 : 900);
    return () => window.clearTimeout(id);
  }, [subBrandId]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const vars = {
    "--ym-fg": "#334155",
    "--ym-hover": accent.ink,
    "--ym-hover-bg": accent.soft,
    "--ym-ink": accent.ink,
    "--ym-soft": accent.soft,
  } as CSSProperties;

  const dropItem = "ym-drop-item flex select-none items-start gap-3 rounded-xl p-3 leading-none no-underline outline-none transition-colors";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={vars}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        solid ? "border-b border-border bg-white/95 backdrop-blur-xl shadow-xs" : "bg-transparent"
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: NAV_CSS }} />
      <div className="container mx-auto grid h-16 grid-cols-[1fr_auto] items-center gap-4 px-4 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left: logo */}
        <div className="flex min-w-0 items-center">
          <a
            href={sb ? sb.home + "/" : "/"}
            onClick={(e) => onLogo(e, sb ? sb.home + "/" : "/", () => setMobileOpen(false))}
            aria-label={sb ? sb.name + " inicio" : "Yamassi inicio"}
            className="shrink-0"
          >
            {subBrandId && sb ? (
              <span
                className={cn(
                  "flex items-center gap-2.5 transition-[filter] duration-300",
                  solid ? "[filter:drop-shadow(0_1px_1px_rgba(15,23,42,0.10))]" : "[filter:drop-shadow(0_2px_10px_rgba(8,12,20,0.55))]"
                )}
              >
                {/* The round mark spins like a wheel and swaps colours halfway. */}
                <motion.span
                  className="relative block h-9 w-9 shrink-0"
                  initial={false}
                  animate={{ rotate: showSubBrand ? 360 : 0 }}
                  transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                >
                  <motion.img
                    src="/yamassi-logo-sm.svg"
                    alt=""
                    width={36}
                    height={36}
                    className="absolute inset-0 h-9 w-9"
                    initial={false}
                    animate={{ opacity: showSubBrand ? 0 : 1 }}
                    transition={{ delay: showSubBrand ? 0.3 : 0, duration: 0.25 }}
                  />
                  <motion.img
                    src={sb.mark}
                    alt=""
                    width={36}
                    height={36}
                    className="absolute inset-0 h-9 w-9"
                    initial={false}
                    animate={{ opacity: showSubBrand ? 1 : 0 }}
                    transition={{ delay: showSubBrand ? 0.3 : 0, duration: 0.25 }}
                  />
                </motion.span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={showSubBrand ? subBrandId : "yamassi"}
                    initial={{ opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {showSubBrand ? (
                      <SubBrandWordmark brand={subBrandId} inverted={!solid} />
                    ) : (
                      <span className={cn("font-sans text-[1.45rem] font-extrabold leading-none tracking-tight", solid ? "text-foreground" : "text-white")}>
                        Yamassi
                      </span>
                    )}
                  </motion.span>
                </AnimatePresence>
              </span>
            ) : (
              <YamassiLogo
                inverted={!solid}
                className={cn(
                  "transition-[filter,color] duration-300",
                  solid ? "[filter:drop-shadow(0_1px_1px_rgba(15,23,42,0.10))]" : "[filter:drop-shadow(0_2px_10px_rgba(8,12,20,0.55))]"
                )}
              />
            )}
          </a>
        </div>

        {/* Center: everything grouped in one pill (desktop) */}
        <div className="max-lg:hidden rounded-full border border-slate-200/80 bg-white/90 p-1 pl-2 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger className="ym-nav-link bg-transparent">Funciones</NavigationMenuTrigger>
                <NavigationMenuContent className={DROPDOWN}>
                  <ul className="grid w-[520px] grid-cols-2 gap-1 p-2">
                    {sections.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.url}>
                          <NavigationMenuLink asChild>
                            <a href={item.url} onClick={(e) => onAnchor(e, item.url)} className={dropItem}>
                              <span className="ym-drop-ico flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                                <Icon className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <span className="space-y-1">
                                <span className="ym-drop-title block text-sm font-semibold leading-none transition-colors">{item.name}</span>
                                {item.description ? (
                                  <span className="line-clamp-2 block text-[13px] leading-snug text-slate-500">{item.description}</span>
                                ) : null}
                              </span>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href={PRICING_URL[vertical]}
                    onClick={(e) => onAnchor(e, PRICING_URL[vertical])}
                    className="ym-nav-link inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors"
                  >
                    Precios
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger className="ym-nav-link bg-transparent">Soluciones</NavigationMenuTrigger>
                <NavigationMenuContent className={DROPDOWN}>
                  <ul className="grid w-[340px] gap-1 p-2">
                    {SOLUTIONS.map((s) => {
                      const b = SUB_BRANDS[s.id];
                      const current = s.id === subBrandId;
                      return (
                        <li key={s.id}>
                          <NavigationMenuLink asChild active={current}>
                            <a
                              href={b.home + "/"}
                              aria-current={current ? "page" : undefined}
                              className={cn(dropItem, "items-center")}
                              style={current ? { background: accent.soft } : undefined}
                            >
                              <img src={b.mark} alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
                              <span className="space-y-1">
                                <span className="block text-sm font-bold leading-none" style={{ color: b.ink }}>
                                  {b.lines[0]} <span style={{ color: b.accent }}>{b.lines[1]}</span>
                                </span>
                                <span className="block text-[13px] leading-snug text-slate-500">{s.text}</span>
                              </span>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger className="ym-nav-link bg-transparent">Recursos</NavigationMenuTrigger>
                <NavigationMenuContent className={DROPDOWN}>
                  <ul className="grid w-[320px] gap-1 p-2">
                    {/* Documentation has its own top-level link on desktop. */}
                    {RESOURCES.filter((r) => r.url !== "/docs/").map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.url}>
                          <NavigationMenuLink asChild>
                            <a href={item.url} className={dropItem}>
                              <span className="ym-drop-ico flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                                <Icon className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <span className="space-y-1">
                                <span className="ym-drop-title block text-sm font-semibold leading-none transition-colors">{item.name}</span>
                                <span className="block text-[13px] leading-snug text-slate-500">{item.description}</span>
                              </span>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/docs/" className="ym-nav-link inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors">
                    Documentación
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem aria-hidden="true">
                <span className="mx-1 block h-5 w-px bg-slate-200" />
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href={loginHref} className="ym-nav-link inline-flex h-9 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors">
                    Iniciar sesión
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <PruebaGratisMenu label="Empieza gratis" />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side (phones and tablets) */}
        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:hidden">
          <a
            href={loginHref}
            className={cn(
              "hidden whitespace-nowrap text-sm font-medium transition-colors sm:inline lg:hidden",
              solid ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white"
            )}
          >
            Iniciar sesión
          </a>

          <PruebaGratisMenu label="Empieza gratis" />

          {/* Mobile menu */}
          <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "group flex h-9 w-9 items-center justify-center rounded-xl border transition-colors lg:hidden",
                  solid
                    ? "border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                )}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <svg className="pointer-events-none" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
                  <path d="M4 12H20" className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
                  <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={12}
              style={vars}
              className="max-h-[calc(100dvh-5.5rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto p-1.5 lg:hidden"
            >
              <p className="px-2.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: accent.ink }}>
                Funciones
              </p>
              {sections.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.url}
                    href={item.url}
                    onClick={(e) => onAnchor(e, item.url, () => setMobileOpen(false))}
                    className="ym-drop-item flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium"
                  >
                    <Icon className="h-4 w-4" style={{ color: accent.ink }} aria-hidden="true" />
                    {item.name}
                  </a>
                );
              })}
              <a
                href={PRICING_URL[vertical]}
                onClick={(e) => onAnchor(e, PRICING_URL[vertical], () => setMobileOpen(false))}
                className="ym-drop-item flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium"
              >
                <Tag className="h-4 w-4" style={{ color: accent.ink }} aria-hidden="true" />
                Precios
              </a>

              <div role="separator" className="my-1.5 h-px bg-slate-200" />
              <p className="px-2.5 pb-1 pt-1 text-[11px] font-bold uppercase tracking-wider" style={{ color: accent.ink }}>
                Soluciones
              </p>
              {SOLUTIONS.map((s) => {
                const b = SUB_BRANDS[s.id];
                return (
                  <a key={s.id} href={b.home + "/"} className="ym-drop-item flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold" style={{ color: b.ink }}>
                    <img src={b.mark} alt="" width={24} height={24} className="h-6 w-6" />
                    <span>
                      {b.lines[0]} <span style={{ color: b.accent }}>{b.lines[1]}</span>
                    </span>
                  </a>
                );
              })}

              <div role="separator" className="my-1.5 h-px bg-slate-200" />
              {RESOURCES.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.url} href={item.url} className="ym-drop-item flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium">
                    <Icon className="h-4 w-4" style={{ color: accent.ink }} aria-hidden="true" />
                    {item.name}
                  </a>
                );
              })}
              <a href={loginHref} className="ym-drop-item flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium sm:hidden">
                <LogIn className="h-4 w-4" style={{ color: accent.ink }} aria-hidden="true" />
                Iniciar sesión
              </a>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </motion.header>
  );
}

export default SiteHeader;
