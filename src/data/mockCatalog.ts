import type {
  Categoria,
  ProductoCatalogo,
  CatalogFilters,
  CatalogApiResponse,
} from "@/types/catalog";
import { getNumericPrice } from "@/types/catalog";

export const CATEGORIAS_MOCK: Categoria[] = [
  { id: "", nombre: "Todas las categorías", slug: "", order: 0, is_active: true },
  { id: 1, nombre: "ticketera", slug: "ticketera", descripcion: "Impresoras térmicas de tickets y boletas", order: 0, is_active: true },
  { id: 2, nombre: "Lector de barras", slug: "lector-de-barras", descripcion: "lector de código de barras", order: 0, is_active: true },
];

export const PRODUCTOS_MOCK: ProductoCatalogo[] = [
  {
    id: 3,
    nombre: "Lector omnidireccional BX6005",
    descripcion_corta: "Lector omnidireccional BX6005 manos libres para códigos 1D y 2D QR",
    descripcion_larga: "Modelo: BX6005\r\nResolución: 640x480\r\nTipo de codigos que lee: papel, medio de pelicula fina unidireccional, telefono movil, pantalla plana\r\nCorriente: 390mA(Max), 220mA\r\nTamaño: 110mm*53mm*120mm\r\nPeso: 300gr",
    imagen: "https://apiresbar.yamassi.com/media/catalogo/items/productos_imagenes_64_rTsvH.webp",
    imagen_url: "https://apiresbar.yamassi.com/media/catalogo/items/productos_imagenes_64_rTsvH.webp",
    link_video: "https://www.youtube.com/@yamassioficial",
    link_compra: "+51944147277",
    tipo: "0",
    tipo_display: "Físico / Hardware",
    order: 0,
    categoria: 2,
    categoria_nombre: "Lector de barras",
    categoria_slug: "lector-de-barras",
    precio: "269.00",
    precio_oferta: "259.90",
    moneda: "S/",
    is_destacado: false,
    tag_promo: "3.72%",
    marca: "Yamassi Hardware",
    sku_referencial: "YLB00001",
    is_active: true,
  },
  {
    id: 2,
    nombre: "Impresora ticketera térmica de 57mm con interfaz USB",
    descripcion_corta: "Impresora ticketera térmica de 57mm con interfaz USB",
    descripcion_larga: "Tipo de impresora: Escritorio\r\nTecnología de impresión: Térmica\r\nTipo de impresión: Monocromática\r\nMarca: BIENEX\r\nModelo: H58U\r\nGarantía: 1 año\r\n\r\nCon esta impresora se pueden imprimir tickets, facturas/boletas electrónicas, imágenes, códigos QR, PDF's, vouchers de visa, pocket POS y más.",
    imagen: "https://apiresbar.yamassi.com/media/catalogo/items/productos_imagenes_1_1uAQN.webp",
    imagen_url: "https://apiresbar.yamassi.com/media/catalogo/items/productos_imagenes_1_1uAQN.webp",
    link_video: "https://www.youtube.com/@yamassioficial",
    link_compra: "+51944147277",
    tipo: "0",
    tipo_display: "Físico / Hardware",
    order: 0,
    categoria: 1,
    categoria_nombre: "ticketera",
    categoria_slug: "ticketera",
    precio: "119.00",
    precio_oferta: "89.00",
    moneda: "S/",
    is_destacado: true,
    tag_promo: "25%",
    marca: "BIENEX",
    sku_referencial: "YTK00002",
    is_active: true,
  },
  {
    id: 1,
    nombre: "Impresora ticketera térmica de 57mm",
    descripcion_corta: "Impresora ticketera térmica de 57mm con interfaz USB + Bluetooth",
    descripcion_larga: "Impresora ticketera térmica de 57mm con interfaz USB + Bluetooth.\r\nTipo de impresora: Escritorio\r\nTecnología de impresión: Térmica\r\nTipo de impresión: Monocromática\r\nMarca: BIENEX\r\nModelo: H58B\r\nGarantía: 1 año\r\n\r\nCon esta impresora se pueden imprimir tickets, facturas/boletas electrónicas, imágenes, códigos QR, PDF's, vouchers de visa, pocket POS y más.",
    imagen: "https://apiresbar.yamassi.com/media/catalogo/items/tiketera100.webp",
    imagen_url: "https://apiresbar.yamassi.com/media/catalogo/items/tiketera100.webp",
    link_video: "https://www.youtube.com/@yamassioficial",
    link_compra: "+51944147277",
    tipo: "0",
    tipo_display: "Físico / Hardware",
    order: 0,
    categoria: 1,
    categoria_nombre: "ticketera",
    categoria_slug: "ticketera",
    precio: "129.00",
    precio_oferta: "109.00",
    moneda: "S/",
    is_destacado: true,
    tag_promo: "Mas vendido",
    marca: "BIENEX",
    sku_referencial: "YTK00001",
    is_active: true,
  },
];

/**
 * Función que replica fielmente el comportamiento de filtrado DRF
 */
export function filtrarProductosLocales(
  filtros: CatalogFilters,
  fuente: ProductoCatalogo[] = PRODUCTOS_MOCK
): CatalogApiResponse {
  let list = [...fuente];

  // 1. Filtro por palabra clave (kword / search / q)
  if (filtros.kword && filtros.kword.trim() !== "") {
    const q = filtros.kword.toLowerCase().trim();
    list = list.filter((item) => {
      const matchNombre = (item.nombre || "").toLowerCase().includes(q);
      const matchCorta = (item.descripcion_corta || "").toLowerCase().includes(q);
      const matchLarga = (item.descripcion_larga || "").toLowerCase().includes(q);
      const matchMarca = (item.marca || "").toLowerCase().includes(q);
      const matchSku = (item.sku_referencial || "").toLowerCase().includes(q);
      return matchNombre || matchCorta || matchLarga || matchMarca || matchSku;
    });
  }

  // 2. Filtro por categoría (ID o slug)
  if (filtros.categoria && filtros.categoria !== "todas" && filtros.categoria !== "") {
    const catFiltro = filtros.categoria.toString().toLowerCase();
    list = list.filter((item) => {
      const matchId = item.categoria?.toString() === catFiltro;
      const matchSlug = (item.categoria_slug || "").toLowerCase() === catFiltro;
      const matchNombre = (item.categoria_nombre || "").toLowerCase() === catFiltro;
      return matchId || matchSlug || matchNombre;
    });
  }

  // 3. Filtro por destacado (?destacado=true)
  if (filtros.destacado) {
    list = list.filter((item) => item.is_destacado === true);
  }

  // 4. Ordenamiento
  list.sort((a, b) => {
    const precioA = getNumericPrice(a.precio_oferta || a.precio);
    const precioB = getNumericPrice(b.precio_oferta || b.precio);

    switch (filtros.ordering) {
      case "precio_asc":
        return precioA - precioB;
      case "precio_desc":
        return precioB - precioA;
      case "order":
      default:
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        return b.id - a.id;
    }
  });

  const total = list.length;
  const pageSize = 20;
  const currentPage = Math.max(1, filtros.page || 1);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    count: total,
    next: end < total ? `?page=${currentPage + 1}` : null,
    previous: currentPage > 1 ? `?page=${currentPage - 1}` : null,
    results: list.slice(start, end),
  };
}
