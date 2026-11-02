import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $selectedProduct, closeProductDetail } from "@/stores/catalogStore";
import {
  normalizeImageUrl,
  formatPrice,
  getNumericPrice,
} from "@/types/catalog";
import {
  X,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  MessageCircle,
  ExternalLink,
  Tag,
  Video,
} from "lucide-react";

export function TiendaProductModal() {
  const product = useStore($selectedProduct);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeProductDetail();
      }
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product]);

  if (!product) return null;

  const rawPhone = product.link_compra ? product.link_compra.toString().trim() : "51944147277";
  let cleanPhone = rawPhone.replace(/\D/g, "");
  if (cleanPhone.length === 9) {
    cleanPhone = `51${cleanPhone}`;
  }

  const hasPromo =
    Boolean(product.precio_oferta) &&
    getNumericPrice(product.precio_oferta) > 0 &&
    getNumericPrice(product.precio_oferta) < getNumericPrice(product.precio);

  const displayPrice = hasPromo ? product.precio_oferta : product.precio;
  const originalPrice = hasPromo ? product.precio : null;

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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => closeProductDetail()}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              SKU: {product.sku_referencial}
            </span>
            {product.categoria_nombre && (
              <span className="text-xs text-slate-500 font-semibold">
                • {product.categoria_nombre}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => closeProductDetail()}
            className="rounded-full p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            {/* Imagen */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-4/3 flex items-center justify-center">
              <img
                src={imageUrl}
                alt={product.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80";
                }}
              />

              <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                {product.tag_promo && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-md">
                    <Tag className="w-3 h-3" />
                    {product.tag_promo}
                  </span>
                )}
                {product.is_destacado && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-bold text-slate-900 shadow-md">
                    <Star className="w-3 h-3 fill-slate-900" />
                    Destacado
                  </span>
                )}
              </div>
            </div>

            {/* Precios e Información */}
            <div className="flex flex-col">
              <h2
                id="modal-product-title"
                className="text-lg sm:text-xl font-bold text-[#0b1f4d] leading-snug"
              >
                {product.nombre}
              </h2>

              {product.marca && (
                <p className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Marca: {product.marca}
                </p>
              )}

              {/* Caja de precio */}
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                  Precio de Venta
                </span>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0b1f4d]">
                    {formatPrice(displayPrice)}
                  </span>
                  {originalPrice && (
                    <span className="text-sm line-through text-slate-400 font-semibold">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Incluye comprobante de pago oficial (boleta o factura).
                </p>
              </div>

              {/* Botón Pedir por WhatsApp */}
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition-transform hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir ahora por WhatsApp</span>
                </a>

                {product.link_video && (
                  <a
                    href={product.link_video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <Video className="w-4 h-4 text-rose-600" />
                    <span>Ver video demostrativo en YouTube</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Descripción Larga y Detalles Técnicos */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-[#0b1f4d] mb-2">
              Descripción y Ficha Técnica
            </h3>
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans">
              {product.descripcion_larga || product.descripcion_corta}
            </div>
          </div>

          {/* Garantías compactas */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Envíos a todo el Perú</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garantía de 1 año</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
