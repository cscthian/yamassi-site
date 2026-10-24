import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "¿Qué incluye Yamassi exactamente?",
    a: "Punto de venta (POS), control de caja e inventario, comandas o lector de código de barras, cobros con Yape, Plin y tarjetas, gestión de proveedores y reportes de ventas. Todo en una sola app, con opción de activar facturación SUNAT si tu negocio lo necesita.",
  },
  {
    q: "¿Es obligatorio emitir facturas con SUNAT para usar Yamassi?",
    a: "No, para nada. Puedes utilizar Yamassi exclusivamente con notas de venta y tickets de control interno. Y si en algún momento lo deseas o tu régimen lo requiere, puedes activar la facturación electrónica SUNAT con un solo clic.",
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

function FaqRow({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-border">
      <summary className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="text-base font-semibold text-foreground md:text-lg">
          {q}
        </span>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-300 group-open:rotate-45">
          <Plus className="h-4 w-4" />
        </span>
      </summary>
      <div className="pb-5 pr-10 text-sm leading-relaxed text-muted-foreground md:text-base">
        {a}
      </div>
    </details>
  );
}

export function TrustClosing() {
  return (
    <>
      {/* FAQ */}
      <section id="faq" className="w-full bg-white py-20 md:py-28 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-serif text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Preguntas frecuentes
            </h2>
            <div className="mt-10">
              {faqs.map((faq) => (
                <FaqRow key={faq.q} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="demo" className="w-full bg-white pb-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-[#0b1f4d] px-8 py-16 text-center md:px-16 md:py-24 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.28),transparent_60%)]" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-serif text-4xl font-black leading-tight tracking-tight text-white md:text-6xl text-balance">
                Ordena tu negocio hoy, en una sola app
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                Ventas, stock y facturación SUNAT desde el primer día. Yamassi es
                gratis: úsalo sin costo y solo pagas al superar los límites gratuitos.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  variant="glow"
                  size="xl"
                  className="h-16 px-9 text-lg font-bold"
                  asChild
                >
                  <a href="/login">Empieza con Yamassi gratis</a>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 bg-transparent text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <a href="#funciones">Hablar con un asesor</a>
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/60">
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
