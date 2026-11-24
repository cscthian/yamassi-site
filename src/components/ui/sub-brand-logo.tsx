import { cn } from "@/lib/utils";

export type SubBrandId = "odontologia" | "restaurantes" | "market";

interface SubBrand {
  name: string;
  home: string;
  /** The platform itself (sign-in / sign-up). */
  app: string;
  /** Short business type, e.g. "Restaurantes y bares". */
  kind: string;
  /** Solid button colour and the text that contrasts with it. */
  solid: string;
  solidInk: string;
  /** Soft pastel tint of the brand and the deep text that sits on it. */
  soft: string;
  softInk: string;
  mark: string;
  /** Two-line wordmark: first line in ink, second in the accent colour. */
  lines: [string, string];
  ink: string;
  accent: string;
  /** Accent on dark surfaces. */
  accentInverted: string;
}

/** Yamassi sub-brands: each vertical keeps the Yamassi mark, recoloured. */
export const SUB_BRANDS: Record<SubBrandId, SubBrand> = {
  odontologia: {
    name: "Odonto Yamassi",
    home: "/odontologia",
    app: "https://odonto.yamassi.com/",
    kind: "Consultorios y clínicas dentales",
    solid: "#FCD448",
    solidInk: "#021D4A",
    soft: "#E9E5FF",
    softInk: "#402FC7",
    mark: "/yamassi-odonto-sm.svg",
    lines: ["Odonto", "Yamassi"],
    ink: "#021D4A",
    accent: "#5D43F7",
    accentInverted: "#FCD448",
  },
  restaurantes: {
    name: "Yamassi Restobar",
    home: "/restaurantes",
    app: "https://restobar.yamassi.com/",
    kind: "Restaurantes, cafeterías y bares",
    solid: "#C1121F",
    solidInk: "#FFFFFF",
    soft: "#FBE7C6",
    softInk: "#780000",
    mark: "/yamassi-restobar-sm.svg",
    lines: ["Yamassi", "Restobar"],
    ink: "#0B0F14",
    accent: "#C1121F",
    accentInverted: "#F6D365",
  },
  market: {
    name: "Yamassi Tienda",
    home: "/market",
    app: "https://tienda.yamassi.com/",
    kind: "Bodegas, minimarkets y tiendas",
    solid: "#10B981",
    solidInk: "#06281D",
    soft: "#D1FAE5",
    softInk: "#065F46",
    mark: "/yamassi-tienda-sm.svg",
    lines: ["Yamassi", "Tienda"],
    ink: "#1E1B4B",
    accent: "#059669",
    accentInverted: "#34D399",
  },
};

export function isSubBrand(v: string | undefined): v is SubBrandId {
  return !!v && v in SUB_BRANDS;
}

/** Two-line wordmark of a sub-brand, e.g. "Odonto / Yamassi". */
export function SubBrandWordmark({
  brand,
  inverted = false,
  className,
}: {
  brand: SubBrandId;
  inverted?: boolean;
  className?: string;
}) {
  const b = SUB_BRANDS[brand];
  return (
    <span
      className={cn("flex flex-col font-sans text-[1.05rem] font-extrabold leading-[0.95] tracking-tight", className)}
      style={{ color: inverted ? "#fff" : b.ink }}
    >
      <span>{b.lines[0]}</span>
      <span style={{ color: inverted ? b.accentInverted : b.accent }}>{b.lines[1]}</span>
    </span>
  );
}

/** Round mark + wordmark of a sub-brand. */
export function SubBrandLogo({
  brand,
  inverted = false,
  className,
}: {
  brand: SubBrandId;
  inverted?: boolean;
  className?: string;
}) {
  const b = SUB_BRANDS[brand];
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img src={b.mark} alt={b.name} width={36} height={36} className="h-9 w-9" />
      <SubBrandWordmark brand={brand} inverted={inverted} />
    </span>
  );
}
