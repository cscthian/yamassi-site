import React from "react";
import { Truck, ShieldCheck, Cpu, Headphones, CreditCard, Award } from "lucide-react";

export function TiendaFeatures() {
  const features = [
    {
      icon: <Truck className="w-6 h-6 text-emerald-500" />,
      title: "Envíos a Todo el Perú",
      description: "Entregas en Lima Metropolitana y despachos a todas las provincias (Olva, Shalom, Marvisur).",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: "Garantía Oficial Yamassi",
      description: "Equipos certificados con garantía de hasta 12 meses y reemplazo por defectos de fábrica.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-emerald-500" />,
      title: "100% Homologado & Plug and Play",
      description: "Conecta tu ticketera, lector y gaveta a Yamassi POS sin complicaciones de controladores.",
    },
    {
      icon: <Headphones className="w-6 h-6 text-emerald-500" />,
      title: "Soporte Técnico Especializado",
      description: "Configuración guiada por videollamada para dejar tu punto de venta vendiendo el primer día.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-emerald-500" />,
      title: "Facturación SUNAT Incluida",
      description: "Emitimos factura o boleta electrónica con IGV deducible para tu empresa o RUC 10/20.",
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      title: "Precios Transparentes",
      description: "Precios directos para emprendedores peruanos sin sobrecostos ocultos ni intermediarios.",
    },
  ];

  return (
    <section className="mt-20 border-t border-slate-200/80 pt-16 pb-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1f4d]">
          ¿Por qué comprar tu hardware en la Tienda Oficial Yamassi?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600">
          Respaldamos tu negocio con equipamiento de nivel comercial probado en miles de ventas diarias.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-500/40 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200/60">
              {feat.icon}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0b1f4d]">{feat.title}</h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {feat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
