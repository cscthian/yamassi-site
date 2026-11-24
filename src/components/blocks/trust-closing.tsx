import { HelpCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUNAT } from "@/lib/site";

const faqs = [
  {
    q: "¿Qué incluye Yamassi exactamente?",
    a: "Punto de venta (POS), control de caja e inventario, comandas o lector de código de barras, cobros con Yape, Plin y tarjetas, gestión de proveedores y reportes de ventas. Todo en una sola app, con opción de activar facturación SUNAT si tu negocio lo necesita.",
  },
  {
    q: "¿Es obligatorio emitir facturas con SUNAT para usar Yamassi?",
    a: "No, para nada. Puedes utilizar Yamassi exclusivamente con notas de venta y tickets de control interno. Y si en algún momento lo deseas o tu régimen lo requiere, activas la facturación electrónica adjuntando el Certificado Digital Tributario de tu empresa.",
  },
  {
    q: SUNAT.faqQ,
    a: SUNAT.faqA,
  },
  {
    q: "¿Necesito conocimientos técnicos para usar Yamassi?",
    a: "No. Yamassi está diseñado para dueños de negocio, no para ingenieros. Configuramos todo por ti en la migración y el sistema es tan simple como cobrar en tu caja de siempre.",
  },
  {
    q: "¿Funciona para mi tipo de negocio?",
    a: "Sí. Bodegas, minimarkets, restaurantes, cafeterías, farmacias, boticas, retail y servicios. Sin importar tu rubro, Yamassi se adapta a ti.",
  },
  {
    q: "¿La prueba gratis tiene letras pequeñas?",
    a: "Ninguna. Acceso completo a los módulos esenciales, sin tarjeta de crédito y sin compromiso. Si no te convence, no pagas nada y conservas tus datos.",
  },
];

function FaqRow({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-slate-200/90 bg-slate-50/60 px-5 transition-all duration-200 hover:border-primary/30 open:border-primary/30 open:bg-white open:shadow-soft"
    >
      <summary className="flex w-full items-center justify-between gap-4 py-4 sm:py-5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="text-base font-bold text-slate-900 md:text-lg">
          {q}
        </span>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition-all duration-300 group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-white">
          <Plus className="h-4 w-4" />
        </span>
      </summary>
      <div className="pb-5 pr-4 sm:pr-10 text-sm leading-relaxed text-slate-600 md:text-base">
        {a}
      </div>
    </details>
  );
}

export function TrustClosing() {
  return (
    <>
      {/* FAQ */}
      <section id="faq" className="w-full bg-white py-14 md:py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <HelpCircle className="h-3.5 w-3.5 text-ayni-green" />
                Resolvemos tus dudas
              </span>
              <h2 className="mt-3 font-serif text-3xl font-black tracking-tight text-foreground md:text-4xl">
                Preguntas frecuentes
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Todo lo que necesitas saber antes de empezar gratis con Yamassi.
              </p>
            </div>
            <div className="mt-8 space-y-3">
              {faqs.map((faq, idx) => (
                <FaqRow key={faq.q} {...faq} defaultOpen={idx === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="demo" className="w-full bg-white pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-[#0b1f4d] px-6 py-12 text-center sm:px-10 md:px-16 md:py-20 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.28),transparent_60%)]" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl text-balance">
                Ordena tu negocio hoy, en una sola app
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Ventas, stock y caja desde el primer día, y facturación electrónica cuando la necesites. Yamassi es
                gratis: úsalo sin costo y solo pagas al superar los límites gratuitos.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Button
                  variant="glow"
                  size="xl"
                  className="h-14 w-full sm:w-auto sm:h-16 px-8 text-base sm:text-lg font-bold"
                  asChild
                >
                  <a href="/login">Empieza con Yamassi gratis</a>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="h-12 w-full sm:w-auto sm:h-16 border-white/30 bg-transparent text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <a href="#funciones">Ver funciones</a>
                </Button>
              </div>
              <p className="mt-5 text-xs sm:text-sm text-white/60">
                Sin tarjeta de crédito · Soporte humano en el Perú · Cancela
                cuando quieras
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default TrustClosing;
