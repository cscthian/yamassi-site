/**
 * Tipos e interfaces oficiales para el catálogo de Tienda Yamassi.
 * Mapeado con la API DRF pública:
 * - Productos: GET https://apiresbar.yamassi.com/api/catalogo/externo/lista-public/
 * - Categorías: GET https://apiresbar.yamassi.com/api/catalogo/externo/categorias/
 */

export interface Categoria {
  id: number | string;
  nombre: string;
  slug: string;
  descripcion?: string;
  order?: number;
  is_active?: boolean;
}

export interface ProductoCatalogo {
  id: number;
  nombre: string;
  descripcion_corta: string;
  descripcion_larga?: string;
  imagen: string;
  imagen_url?: string;
  link_video?: string;
  link_compra?: string; // Número de WhatsApp de compra (ej: "+51944147277")
  tipo: string | number;
  tipo_display?: string;
  order: number;
  categoria: number | string;
  categoria_nombre?: string;
  categoria_slug?: string;
  precio: string | number; // e.g. "269.00"
  precio_oferta?: string | number | null; // e.g. "259.90"
  moneda?: string; // e.g. "S/"
  is_destacado: boolean;
  tag_promo?: string; // e.g. "Mas vendido", "25%"
  marca: string;
  sku_referencial: string; // e.g. "YLB00001"
  is_active?: boolean;
  date_created?: string;
  date_updated?: string;
}

export type OrderingOption =
  | "order"
  | "precio_asc"
  | "precio_desc"
  | "tipo_asc"
  | "tipo_desc";

export interface CatalogFilters {
  kword: string;
  categoria: string; // ID o slug
  tipo: string;
  destacado: boolean;
  ordering: OrderingOption;
  page: number;
}

export interface CatalogApiResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: ProductoCatalogo[];
}

/**
 * Función utilitaria para normalizar URLs de imágenes http -> https
 * evitando advertencias de contenido mixto en sitios con SSL.
 */
export function normalizeImageUrl(url: string | undefined | null): string {
  if (!url) return "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80";
  if (url.startsWith("http://apiresbar.yamassi.com")) {
    return url.replace("http://apiresbar.yamassi.com", "https://apiresbar.yamassi.com");
  }
  return url;
}

/**
 * Obtiene el precio numérico parseado para cálculos y ordenamiento
 */
export function getNumericPrice(val: string | number | null | undefined): number {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;
  const parsed = parseFloat(val.toString().replace(/[^0-9.-]+/g, ""));
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Formatea un monto en Soles (S/ XX.XX)
 */
export function formatPrice(val: string | number | null | undefined): string {
  const num = getNumericPrice(val);
  return `S/ ${num.toFixed(2)}`;
}
