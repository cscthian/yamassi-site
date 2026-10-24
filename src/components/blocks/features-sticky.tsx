import React from "react";
import {
  ScanLine,
  ReceiptText,
  Boxes,
  Truck,
  BarChart3,
  Building2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import {
  StickyScroll,
  type StickyScrollItem,
} from "@/components/ui/sticky-scroll-reveal";

/** Shared glass card used by every mini product mockup. */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-[19rem] rounded-2xl bg-white/95 p-5 text-slate-800 shadow-xl">
        {children}
      </div>
    </div>
  );
}

const PosMock = () => (
  <Panel>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      Caja 1 · Venta #1042
    </p>
    {[
      ["Arroz Costeño 5kg", "S/ 24.90"],
      ["Aceite Primor 1L", "S/ 11.50"],
      ["Leche Gloria x6", "S/ 25.80"],
    ].map(([item, price]) => (
      <div key={item} className="mt-3 flex justify-between text-sm">
        <span>{item}</span>
        <span className="font-semibold">{price}</span>
      </div>
    ))}
    <div className="mt-4 flex items-center justify-between border-t pt-3">
      <span className="text-sm font-bold">Total</span>
      <span className="font-serif text-2xl font-black text-ayni-blue">
        S/ 62.20
      </span>
    </div>
    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
      {["Efectivo", "Yape", "Tarjeta"].map((m, i) => (
        <span
          key={m}
          className={
            i === 1
              ? "rounded-lg bg-ayni-green py-1.5 text-white"
              : "rounded-lg bg-slate-100 py-1.5"
          }
        >
          {m}
        </span>
      ))}
    </div>
  </Panel>
);

const SunatMock = () => (
  <Panel>
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold">Comprobante #00873</span>
      <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
        <CheckCircle2 className="h-3 w-3" /> Emitido
      </span>
    </div>
    <div className="mt-2 inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
      <span>⚙️ Facturación SUNAT: <strong>Opcional</strong></span>
    </div>
    <div className="mt-4 space-y-2 text-sm">
      <div className="flex justify-between"><span>Subtotal</span><span>S/ 52.71</span></div>
      <div className="flex justify-between"><span>IGV (si aplica)</span><span>S/ 9.49</span></div>
      <div className="flex justify-between border-t pt-2 font-bold"><span>Total</span><span>S/ 62.20</span></div>
    </div>
    <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-center text-xs text-slate-500">
      Ticket o comprobante enviado al cliente por WhatsApp
    </p>
  </Panel>
);

const StockMock = () => (
  <Panel>
    <p className="text-sm font-bold">Inventario · Almacén central</p>
    {[
      { name: "Gaseosa 500ml", pct: 82 },
      { name: "Pan de molde", pct: 45 },
      { name: "Yogurt fresa 1L", pct: 12, low: true },
    ].map((p) => (
      <div key={p.name} className="mt-3">
        <div className="flex justify-between text-xs">
          <span>{p.name}</span>
          <span className={p.low ? "font-semibold text-amber-600" : "text-slate-500"}>
            {p.pct}%
          </span>
        </div>
        <div className="mt-1 h-2 rounded-full bg-slate-100">
          <div
            className={`h-2 rounded-full ${p.low ? "bg-amber-500" : "bg-ayni-green"}`}
            style={{ width: `${p.pct}%` }}
          />
        </div>
      </div>
    ))}
    <p className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
      <AlertTriangle className="h-3.5 w-3.5" /> Yogurt bajo stock mínimo
    </p>
  </Panel>
);

const SuppliersMock = () => (
  <Panel>
    <p className="text-sm font-bold">Orden de compra OC-0219</p>
    <p className="text-xs text-slate-400">Distribuidora Lima Norte S.A.C.</p>
    <div className="mt-4 space-y-2 text-sm">
      <div className="flex justify-between"><span>Yogurt fresa 1L × 48</span><span>S/ 196.80</span></div>
      <div className="flex justify-between"><span>Leche Gloria × 24</span><span>S/ 98.40</span></div>
    </div>
    <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-xs">
      <span className="text-emerald-700">Mejor precio vs. último pedido</span>
      <span className="font-bold text-emerald-700">−6%</span>
    </div>
  </Panel>
);

const ReportsMock = () => (
  <Panel>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-xs text-slate-400">Ventas de la semana</p>
        <p className="font-serif text-2xl font-black text-ayni-blue">S/ 18,430</p>
      </div>
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
        +12%
      </span>
    </div>
    <div className="mt-4 flex h-24 items-end gap-2">
      {[40, 55, 48, 70, 62, 92, 78].map((h, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className={`w-full rounded-t-md ${i === 5 ? "bg-ayni-green" : "bg-ayni-blue/80"}`}
            style={{ height: `${h}%` }}
          />
          <span className="text-[10px] text-slate-400">{"LMMJVSD"[i]}</span>
        </div>
      ))}
    </div>
  </Panel>
);

const BranchesMock = () => (
  <Panel>
    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
      <p className="text-sm font-bold">Tus locales hoy</p>
      <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
        Web en la nube
      </span>
    </div>
    {[
      ["Miraflores", "S/ 4,120", "Abierto"],
      ["San Isidro", "S/ 3,860", "Abierto"],
      ["Arequipa Centro", "S/ 2,540", "Abierto"],
    ].map(([name, total, state]) => (
      <div key={name} className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-[11px] text-emerald-600">● {state}</p>
        </div>
        <span className="font-bold">{total}</span>
      </div>
    ))}
    <p className="mt-3 text-[11px] text-slate-500 text-center">
      Acceso instantáneo desde cualquier navegador web en PC, tablet o celular
    </p>
  </Panel>
);

const features: StickyScrollItem[] = [
  {
    title: "Punto de Venta (POS)",
    icon: <ScanLine className="h-5 w-5" />,
    description:
      "Cobra en segundos con lector de código de barras, balanza y todos los medios de pago: efectivo, tarjeta, Yape y Plin. Tu caja sigue vendiendo incluso si se cae el internet.",
    content: <PosMock />,
  },
  {
    title: "Comprobantes y Facturación (SUNAT opcional)",
    icon: <ReceiptText className="h-5 w-5" />,
    description:
      "Emite tickets y notas de venta rápidas para tu control interno. Y si lo deseas, puedes activar la facturación electrónica SUNAT en cualquier momento para emitir boletas y facturas oficiales cuando lo necesites.",
    content: <SunatMock />,
  },
  {
    title: "Control de Stock e Inventario",
    icon: <Boxes className="h-5 w-5" />,
    description:
      "Sabe qué tienes, qué se vende y qué falta, en tiempo real. Kardex, lotes por vencer y alertas de stock mínimo para que nunca pierdas una venta por falta de producto.",
    content: <StockMock />,
  },
  {
    title: "Proveedores y Compras",
    icon: <Truck className="h-5 w-5" />,
    description:
      "Centraliza proveedores, órdenes de compra y costos. Yamassi te sugiere qué reponer y te muestra a quién le compraste más barato.",
    content: <SuppliersMock />,
  },
  {
    title: "Reportes que sí entiendes",
    icon: <BarChart3 className="h-5 w-5" />,
    description:
      "Ventas, márgenes, productos estrella y horas pico en reportes claros. Decide con datos desde el celular, sin hojas de cálculo.",
    content: <ReportsMock />,
  },
  {
    title: "Multi-sucursal y 100% Web App",
    icon: <Building2 className="h-5 w-5" />,
    description:
      "Yamassi funciona en cualquier dispositivo (PC, laptop, tablet o celular) directamente desde tu navegador web, sin instalar apps ni depender de descargas. Controla todas tus sucursales y cajas en tiempo real.",
    content: <BranchesMock />,
  },
];

export function FeaturesSticky() {
  return <StickyScroll content={features} />;
}
