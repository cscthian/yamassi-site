import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import {
  $filters,
  $categories,
  $catalogState,
  setKwordFilter,
  setCategoryFilter,
  setOrderingFilter,
  setDestacadoFilter,
  resetAllFilters,
} from "@/stores/catalogStore";
import type { OrderingOption, Categoria } from "@/types/catalog";
import {
  Search,
  X,
  ArrowUpDown,
  Tag,
  RotateCcw,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

interface Props {
  initialCategories?: Categoria[];
  initialCount?: number;
}

export function TiendaAppHeader({ initialCategories, initialCount }: Props) {
  const filters = useStore($filters);
  const categoriesFromStore = useStore($categories);
  const catalog = useStore($catalogState);
  const [localKword, setLocalKword] = useState(filters.kword || "");

  // Usar categorías del store o las iniciales del SSR
  const categories =
    categoriesFromStore && categoriesFromStore.length > 1
      ? categoriesFromStore
      : initialCategories || categoriesFromStore;

  const currentCount = catalog.count ?? initialCount ?? 3;

  useEffect(() => {
    setLocalKword(filters.kword || "");
  }, [filters.kword]);

  // Debounce de 300ms al escribir en el buscador
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localKword !== filters.kword) {
        setKwordFilter(localKword);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localKword, filters.kword]);

  const hasActiveFilters =
    Boolean(filters.kword) ||
    Boolean(filters.categoria && filters.categoria !== "todas") ||
    Boolean(filters.destacado) ||
    Boolean(filters.ordering && filters.ordering !== "order");

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-black/5 p-4 sm:p-5 mb-6">
      {/* Barra superior compacta estilo App */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0b1f4d] text-white shadow-xs">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0b1f4d] leading-none">
              Catálogo Tienda Yamassi
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Equipos de punto de venta e impresoras homologadas en Perú
            </p>
          </div>
        </div>

        {/* Contador de artículos con suppressHydrationWarning para evitar discrepancias de SSR */}
        <div className="text-right">
          <span
            suppressHydrationWarning
            className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/70"
          >
            {`${currentCount} ${currentCount === 1 ? "producto" : "productos"}`}
          </span>
        </div>
      </div>

      {/* Buscador clásico */}
      <div className="mt-4 relative">
        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          suppressHydrationWarning
          type="search"
          value={localKword}
          onChange={(e) => setLocalKword(e.target.value)}
          placeholder="Buscar por nombre, código o modelo (ej: ticketera, lector BX6005...)"
          className="w-full h-11 pl-10 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white transition-all"
        />
        {localKword ? (
          <button
            type="button"
            onClick={() => {
              setLocalKword("");
              setKwordFilter("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null}
      </div>

      {/* Fila de Filtros Clásicos: Combo de Categorías + Combo de Orden + Toggle Ofertas */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* COMBO DE CATEGORÍAS */}
        <div className="relative">
          <label htmlFor="combo-categoria" className="sr-only">
            Seleccionar Categoría
          </label>
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Tag className="w-4 h-4 text-emerald-600" />
          </div>
          <select
            suppressHydrationWarning
            id="combo-categoria"
            value={filters.categoria || ""}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full h-10 pl-9 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer appearance-none truncate"
          >
            <option value="">Todas las categorías</option>
            {categories
              .filter((c) => c.slug !== "")
              .map((cat) => (
                <option key={cat.id?.toString() || cat.slug} value={cat.slug || cat.id?.toString()}>
                  {cat.nombre}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {/* COMBO DE ORDENAMIENTO */}
        <div className="relative">
          <label htmlFor="combo-orden" className="sr-only">
            Ordenar por
          </label>
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
          </div>
          <select
            suppressHydrationWarning
            id="combo-orden"
            value={filters.ordering || "order"}
            onChange={(e) => setOrderingFilter(e.target.value as OrderingOption)}
            className="w-full h-10 pl-9 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer appearance-none truncate"
          >
            <option value="order">Orden recomendado</option>
            <option value="precio_asc">Precio: menor a mayor</option>
            <option value="precio_desc">Precio: mayor a menor</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {/* BOTÓN SOLO DESTACADOS / OFERTAS & LIMPIAR */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDestacadoFilter(!filters.destacado)}
            className={`flex-1 h-10 inline-flex items-center justify-center gap-1.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filters.destacado
                ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs"
                : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Sparkles
              className={`w-4 h-4 ${
                filters.destacado ? "fill-amber-500 text-amber-500" : "text-slate-400"
              }`}
            />
            <span>Solo destacados</span>
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setLocalKword("");
                resetAllFilters();
              }}
              className="h-10 px-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Restablecer filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
