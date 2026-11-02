import React from "react";
import type { ProductoCatalogo } from "@/types/catalog";
import {
  normalizeImageUrl,
  formatPrice,
  getNumericPrice,
} from "@/types/catalog";
import { openProductDetail } from "@/stores/catalogStore";
import { MessageCircle, Eye, Star, Tag, Check } from "lucide-react";

interface Props {
  product: ProductoCatalogo;
}

export function TiendaProductCard({ product }: Props) {
  // Número de WhatsApp oficial para ventas del producto (link_compra ej: "+51944147277")
  const rawPhone = product.link_compra ? product.link_compra.toString().trim() : "51944147277";
  let cleanPhone = rawPhone.replace(/\D/g, "");
  if (cleanPhone.length === 9) {
    cleanPhone = `51${cleanPhone}`;
  }

  // Precios
  const hasPromo =
    Boolean(product.precio_oferta) &&
    getNumericPrice(product.precio_oferta) > 0 &&
    getNumericPrice(product.precio_oferta) < getNumericPrice(product.precio);

  const displayPrice = hasPromo ? product.precio_oferta : product.precio;
  const originalPrice = hasPromo ? product.precio : null;

  // Mensaje completo con detalles del producto para solicitarlo
  const whatsappMsgText = [
    `Hola, deseo solicitar el siguiente producto de la Tienda Yamassi:`,
    ``,
    `• Producto: ${product.nombre}`,
    `• Código SKU: ${product.sku_referencial}`,
    `• Precio: ${formatPrice(displayPrice)}`,
    product.categoria_nombre ? `• Categoría: ${product.categoria_nombre}` : ``,
    product.marca ? `• Marca: ${product.marca}` : ``,
    ``,
    `¿Tienen stock disponible para coordinar la compra y el envío? Muchas gracias.`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(
    whatsappMsgText
  )}`;

  const imageUrl = normalizeImageUrl(product.imagen_url || product.imagen);

  return (
    <article className="group flex flex-col rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 overflow-hidden">
      {/* Imagen con Badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={product.nombre}
          loading="lazy"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {/* Badges superiores */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-start justify-between gap-1 pointer-events-none">
          {/* Badge de Oferta / Tag Promo */}
          {product.tag_promo ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
              <Tag className="w-3 h-3" />
              {product.tag_promo}
            </span>
          ) : product.is_destacado ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-md">
              <Star className="w-3 h-3 fill-slate-900" />
              Destacado
            </span>
          ) : (
            <span />
          )}

          {/* Categoría badge */}
          {product.categoria_nombre && (
            <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-xs">
              {product.categoria_nombre}
            </span>
          )}
        </div>
      </div>

      {/* Contenido de la Card */}
      <div className="flex flex-1 flex-col p-4">
        {/* SKU y Marca */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
          <span className="font-semibold text-emerald-700">
            {product.marca || "Yamassi Certified"}
          </span>
          <span>SKU: {product.sku_referencial}</span>
        </div>

        {/* Título del Producto */}
        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
          <button
            type="button"
            onClick={() => openProductDetail(product)}
            className="text-left cursor-pointer hover:underline"
          >
            {product.nombre}
          </button>
        </h3>

        {/* Descripción corta */}
        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
          {product.descripcion_corta}
        </p>

        {/* Bloque de Precios */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Precio especial</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-[#0b1f4d] tracking-tight">
                {formatPrice(displayPrice)}
              </span>
              {originalPrice && (
                <span className="text-xs line-through text-slate-400 font-medium">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
            <Check className="w-3 h-3 text-emerald-600" />
            En stock
          </span>
        </div>

        {/* Botones de Acción Mobile-First */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => openProductDetail(product)}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Detalles</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Pedir</span>
          </a>
        </div>
      </div>
    </article>
  );
}
