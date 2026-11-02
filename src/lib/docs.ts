import { Store, UtensilsCrossed, CalendarClock, Smile, type LucideIcon } from "lucide-react";

export type DocRubro = "pos" | "restobar" | "reservas" | "odontologia";

export interface RubroMeta {
  id: DocRubro;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  icon: LucideIcon;
  color: string;
  accentGradient: string;
  borderAccent: string;
  bgLight: string;
}

export const DOC_RUBROS: Record<DocRubro, RubroMeta> = {
  pos: {
    id: "pos",
    name: "Yamassi Tiendas (POS)",
    shortName: "POS & Tiendas",
    badge: "Punto de Venta",
    description: "Documentación y manuales para ventas con código de barras, control de inventario, proveedores y caja chica.",
    icon: Store,
    color: "text-emerald-500",
    accentGradient: "from-emerald-500 to-teal-600",
    borderAccent: "hover:border-emerald-500/40",
    bgLight: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
  restobar: {
    id: "restobar",
    name: "Yamassi Restobar",
    shortName: "Restobar",
    badge: "Restaurantes & Bares",
    description: "Manuales de uso para comandas a cocina y barra, mapa de mesas en tiempo real, división de cuentas y delivery.",
    icon: UtensilsCrossed,
    color: "text-amber-500",
    accentGradient: "from-amber-400 to-orange-500",
    borderAccent: "hover:border-amber-500/40",
    bgLight: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  reservas: {
    id: "reservas",
    name: "Yamassi Reservas",
    shortName: "Reservas & Citas",
    badge: "Servicios & Turnos",
    description: "Guía de horarios, turnos y citas para peluquerías, barberías, spas y centros de estética.",
    icon: CalendarClock,
    color: "text-purple-500",
    accentGradient: "from-purple-500 to-indigo-600",
    borderAccent: "hover:border-purple-500/40",
    bgLight: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  },
  odontologia: {
    id: "odontologia",
    name: "Yamassi Odontológico",
    shortName: "Odontología",
    badge: "Clínicas & Consultorios",
    description: "Guías para odontograma digital según norma MINSA, historias clínicas electrónicas, agenda y presupuestos.",
    icon: Smile,
    color: "text-sky-500",
    accentGradient: "from-sky-400 to-blue-600",
    borderAccent: "hover:border-sky-500/40",
    bgLight: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  },
};
