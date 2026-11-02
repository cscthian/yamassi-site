import { atom } from "nanostores";
import type {
  ProductoCatalogo,
  Categoria,
  CatalogFilters,
  OrderingOption,
  CatalogApiResponse,
} from "@/types/catalog";
import {
  CATEGORIAS_MOCK,
  PRODUCTOS_MOCK,
  filtrarProductosLocales,
} from "@/data/mockCatalog";

// URLs oficiales confirmadas por el usuario
export const API_PRODUCTOS_URL =
  import.meta.env.PUBLIC_API_PRODUCTOS_URL ||
  "https://apiresbar.yamassi.com/api/catalogo/externo/lista-public/";

export const API_CATEGORIAS_URL =
  import.meta.env.PUBLIC_API_CATEGORIAS_URL ||
  "https://apiresbar.yamassi.com/api/catalogo/externo/categorias/";

export interface CatalogState {
  items: ProductoCatalogo[];
  allLoadedItems: ProductoCatalogo[]; // Pool completo en memoria para búsquedas locales instantáneas
  count: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  isFallback: boolean;
}

const DEFAULT_FILTERS: CatalogFilters = {
  kword: "",
  categoria: "",
  tipo: "",
  destacado: false,
  ordering: "order",
  page: 1,
};

// ==============================================================================
// ÁTOMOS NANOSTORES REACTIVOS
// ==============================================================================

export const $filters = atom<CatalogFilters>(DEFAULT_FILTERS);

export const $catalogState = atom<CatalogState>({
  items: PRODUCTOS_MOCK,
  allLoadedItems: PRODUCTOS_MOCK,
  count: PRODUCTOS_MOCK.length,
  totalPages: 1,
  loading: false,
  error: null,
  isFallback: false,
});

export const $categories = atom<Categoria[]>(CATEGORIAS_MOCK);

export const $selectedProduct = atom<ProductoCatalogo | null>(null);

let isInitialized = false;

// ==============================================================================
// ACCIONES DEL STORE
// ==============================================================================

/**
 * Aplica los filtros sobre el catálogo.
 * Prioriza filtrado en memoria instantáneo (0ms, sin bloqueos de CORS),
 * y opcionalmente intenta refrescar contra el backend si está configurado un proxy.
 */
export function applyFilters(filtersOverride?: Partial<CatalogFilters>) {
  const currentFilters = {
    ...$filters.get(),
    ...(filtersOverride || {}),
  };

  if (filtersOverride) {
    $filters.set(currentFilters);
  }

  if (typeof window !== "undefined") {
    syncUrlWithFilters(currentFilters);
  }

  // Filtrado instantáneo en memoria sobre todos los productos cargados
  const pool =
    $catalogState.get().allLoadedItems.length > 0
      ? $catalogState.get().allLoadedItems
      : PRODUCTOS_MOCK;

  const result: CatalogApiResponse = filtrarProductosLocales(currentFilters, pool);
  const totalPages = Math.max(1, Math.ceil(result.count / 20));

  $catalogState.set({
    ...$catalogState.get(),
    items: result.results,
    count: result.count,
    totalPages,
    loading: false,
    error: null,
  });

  // Opcional: si en el cliente existe un proxy configurado y no hay restricciones CORS, intentar sync en background
  tryBackgroundFetch(currentFilters);
}

async function tryBackgroundFetch(filters: CatalogFilters) {
  if (typeof window === "undefined") return;

  // Solo intentamos fetch en cliente si no es localhost directo contra dominio externo con CORS
  // o si el endpoint responde con soporte CORS
  const isLocalDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  
  // En localhost usamos el proxy de Vite configurado en astro.config.mjs para no disparar errores de CORS
  const endpointBase = isLocalDev
    ? "/api/catalogo/externo/lista-public/"
    : API_PRODUCTOS_URL;

  const params = new URLSearchParams();
  params.append("page", (filters.page || 1).toString());
  if (filters.kword?.trim()) params.append("kword", filters.kword.trim());
  if (filters.categoria && filters.categoria !== "todas") params.append("categoria", filters.categoria);
  if (filters.destacado) params.append("destacado", "true");
  if (filters.ordering && filters.ordering !== "order") params.append("ordering", filters.ordering);

  try {
    const res = await fetch(`${endpointBase}?${params.toString()}`, {
      headers: { Accept: "application/json" },
      mode: "cors",
    });

    if (res.ok) {
      const data = await res.json();
      let items: ProductoCatalogo[] = [];
      let count = 0;

      if (Array.isArray(data)) {
        items = data;
        count = data.length;
      } else if (data && Array.isArray(data.results)) {
        items = data.results;
        count = typeof data.count === "number" ? data.count : data.results.length;
      }

      if (items.length > 0) {
        const totalPages = Math.max(1, Math.ceil(count / 20));
        $catalogState.set({
          ...$catalogState.get(),
          items,
          count,
          totalPages,
          loading: false,
          error: null,
          isFallback: false,
        });
      }
    }
  } catch {
    // Si falla por CORS o red, los resultados locales en memoria ya están en pantalla
  }
}

export function setKwordFilter(kword: string) {
  applyFilters({ kword, page: 1 });
}

export function setCategoryFilter(categoria: string) {
  applyFilters({ categoria, page: 1 });
}

export function setDestacadoFilter(destacado: boolean) {
  applyFilters({ destacado, page: 1 });
}

export function setOrderingFilter(ordering: OrderingOption) {
  applyFilters({ ordering, page: 1 });
}

export function setPage(page: number) {
  const total = $catalogState.get().totalPages;
  const target = Math.max(1, Math.min(page, total));
  applyFilters({ page: target });

  if (typeof window !== "undefined") {
    const listEl = document.getElementById("tienda-catalogo-grid");
    if (listEl) {
      listEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

export function resetAllFilters() {
  applyFilters({
    kword: "",
    categoria: "",
    tipo: "",
    destacado: false,
    ordering: "order",
    page: 1,
  });
}

export function openProductDetail(product: ProductoCatalogo) {
  $selectedProduct.set(product);
}

export function closeProductDetail() {
  $selectedProduct.set(null);
}

/**
 * Inicializa el catálogo con los datos SSR/SSG precalculados
 * sin disparar llamadas de red en el montaje inicial.
 */
export function initCatalogStore(initialData?: {
  products?: ProductoCatalogo[];
  categories?: Categoria[];
}) {
  if (initialData?.categories && initialData.categories.length > 0) {
    const list: Categoria[] = [
      { id: "", nombre: "Todas las categorías", slug: "", order: 0, is_active: true },
      ...initialData.categories.filter((c) => c.slug !== ""),
    ];
    $categories.set(list);
  }

  if (initialData?.products && initialData.products.length > 0) {
    $catalogState.set({
      items: initialData.products,
      allLoadedItems: initialData.products,
      count: initialData.products.length,
      totalPages: Math.max(1, Math.ceil(initialData.products.length / 20)),
      loading: false,
      error: null,
      isFallback: false,
    });
  }

  if (typeof window === "undefined" || isInitialized) return;
  isInitialized = true;

  // Leer parámetros de URL si el usuario entró con un enlace directo filtrado
  const urlParams = new URLSearchParams(window.location.search);
  const kword = urlParams.get("kword") || urlParams.get("search") || urlParams.get("q") || "";
  const categoria = urlParams.get("categoria") || "";
  const destacado = urlParams.get("destacado") === "true";
  const ordering = (urlParams.get("ordering") as OrderingOption) || "order";
  const page = parseInt(urlParams.get("page") || "1", 10) || 1;

  const hasParams = Boolean(
    kword ||
    (categoria && categoria !== "todas") ||
    destacado ||
    (ordering && ordering !== "order") ||
    page > 1
  );

  // Si hay parámetros en la URL, aplicar filtrado en memoria inmediatamente sin alterar 'loading'
  if (hasParams) {
    const pool = initialData?.products && initialData.products.length > 0
      ? initialData.products
      : $catalogState.get().allLoadedItems;

    const filtered = filtrarProductosLocales(
      { kword, categoria, destacado, ordering, page, tipo: "" },
      pool
    );

    $filters.set({
      kword,
      categoria,
      destacado,
      ordering,
      page,
      tipo: "",
    });

    $catalogState.set({
      ...$catalogState.get(),
      items: filtered.results,
      count: filtered.count,
      totalPages: Math.max(1, Math.ceil(filtered.count / 20)),
      loading: false,
      error: null,
    });
  }
}

function syncUrlWithFilters(filters: CatalogFilters) {
  try {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    if (filters.kword) params.set("kword", filters.kword);
    if (filters.categoria && filters.categoria !== "todas") params.set("categoria", filters.categoria);
    if (filters.destacado) params.set("destacado", "true");
    if (filters.ordering && filters.ordering !== "order") params.set("ordering", filters.ordering);
    if (filters.page > 1) params.set("page", filters.page.toString());

    const queryString = params.toString();
    const newPath = queryString ? `${url.pathname}?${queryString}` : url.pathname;
    window.history.replaceState({}, "", newPath);
  } catch {
    // Silencio si ocurre en SSR
  }
}
