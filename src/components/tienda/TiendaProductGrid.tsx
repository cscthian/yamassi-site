import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  $catalogState,
  initCatalogStore,
  resetAllFilters,
} from "@/stores/catalogStore";
import { TiendaProductCard } from "@/components/tienda/TiendaProductCard";
import type { ProductoCatalogo, Categoria } from "@/types/catalog";
import { PackageSearch, RotateCcw } from "lucide-react";

interface Props {
  initialProducts?: ProductoCatalogo[];
  initialCategories?: Categoria[];
}

export function TiendaProductGrid({ initialProducts, initialCategories }: Props) {
  const catalog = useStore($catalogState);

  // Inicializar store con los datos SSR/SSG y los query params del navegador
  useEffect(() => {
    initCatalogStore({
      products: initialProducts,
      categories: initialCategories,
    });
  }, [initialProducts, initialCategories]);

  // Estado 1: Esqueleto de Carga
  if (catalog.loading && catalog.items.length === 0) {
    return (
      <div
        id="tienda-catalogo-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-slate-200 bg-white p-4 animate-pulse space-y-4"
          >
            <div className="aspect-4/3 w-full rounded-2xl bg-slate-200" />
            <div className="h-4 w-1/3 bg-slate-200 rounded" />
            <div className="h-5 w-3/4 bg-slate-200 rounded" />
            <div className="h-3 w-full bg-slate-200 rounded" />
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <div className="h-6 w-20 bg-slate-200 rounded" />
              <div className="h-8 w-24 bg-slate-200 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Estado 2: Sin resultados
  if (!catalog.loading && catalog.items.length === 0) {
    return (
      <div
        id="tienda-catalogo-grid"
        className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-12 text-center max-w-md mx-auto my-8"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
          <PackageSearch className="w-7 h-7" />
        </div>
        <h3 className="mt-4 text-base font-bold text-[#0b1f4d]">
          No encontramos productos con estos filtros
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Intenta cambiar el término de búsqueda o selecciona todas las categorías.
        </p>
        <button
          type="button"
          onClick={() => resetAllFilters()}
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#0b1f4d] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ver todos los productos</span>
        </button>
      </div>
    );
  }

  // Estado 3: Lista de Productos en Rejilla Mobile First
  return (
    <div
      id="tienda-catalogo-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      {catalog.items.map((prod) => (
        <TiendaProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
}
