import React from "react";
import { useStore } from "@nanostores/react";
import { $filters, $catalogState, setPage } from "@/stores/catalogStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TiendaPagination() {
  const filters = useStore($filters);
  const catalog = useStore($catalogState);

  const currentPage = filters.page || 1;
  const totalPages = catalog.totalPages || 1;

  if (totalPages <= 1) {
    return null;
  }

  // Generar lista de páginas para mostrar
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      role="navigation"
      aria-label="Paginación del catálogo de tienda"
      className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200"
    >
      <div className="text-xs sm:text-sm text-slate-500 font-medium">
        Página <span className="font-bold text-[#0b1f4d]">{currentPage}</span> de{" "}
        <span className="font-bold text-[#0b1f4d]">{totalPages}</span> (
        {catalog.count} productos en total)
      </div>

      <div className="flex items-center gap-1.5">
        {/* Botón Anterior */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => setPage(currentPage - 1)}
          className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            currentPage <= 1
              ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer shadow-xs"
          }`}
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        {/* Números de página */}
        <div className="flex items-center gap-1">
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`h-9 w-9 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0b1f4d] text-white shadow-md shadow-[#0b1f4d]/20 ring-2 ring-emerald-400/50"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Botón Siguiente */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => setPage(currentPage + 1)}
          className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
            currentPage >= totalPages
              ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer shadow-xs"
          }`}
          aria-label="Página siguiente"
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
