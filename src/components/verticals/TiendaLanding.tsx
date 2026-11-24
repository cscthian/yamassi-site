import CairnAgentsLanding, { type CnlPlan, type CnlTalkRequest } from "@/components/ui/cairn-agents-landing";
import { SCREEN_CSS, ScreenCard, ScreenStage, type ScreenData } from "@/components/verticals/hero-screens";
import { SUB_BRANDS } from "@/components/ui/sub-brand-logo";

const TIENDA_URL = SUB_BRANDS.market.app;

/* Yamassi Tienda sub-brand palette (from the Tienda mark) */
const C = {
  night: "#0F172A",
  indigo: "#1E1B4B",
  green: "#10B981",
  greenLight: "#34D399",
  greenDark: "#059669",
  greenPale: "#D1FAE5",
  purple: "#9333EA",
  purpleLight: "#C084FC",
  purpleDark: "#6D28D9",
};

const WHATSAPP_PHONE = "51944147277";
const whatsappUrl = (text?: string) =>
  "https://api.whatsapp.com/send?phone=" + WHATSAPP_PHONE + (text ? "&text=" + encodeURIComponent(text) : "");

const openWhatsapp = (text: string) => {
  window.open(whatsappUrl(text), "_blank", "noopener");
};

const onTalk = (d: CnlTalkRequest) =>
  openWhatsapp(
    "Hola, quiero información de Yamassi Tienda.\n" +
      "Nombre: " + d.name + "\n" +
      "Tienda: " + d.company + "\n" +
      "Correo: " + d.email + "\n" +
      "Tamaño: " + d.volume +
      (d.message.trim() ? "\nComentario: " + d.message.trim() : "")
  );

const onSubscribe = (email: string) =>
  openWhatsapp("Hola, quiero empezar con Yamassi Tienda. Mi correo es " + email);

const BASE_FEATURES = [
  "Ventas ilimitadas",
  "Productos ilimitados",
  "Reportes de ventas",
  "Reportes de ganancias",
  "Productos más vendidos",
  "Hasta 10 colaboradores",
  "Soporte prioritario",
];

/** Plans and FAQ live here so the page can reuse them in its structured data. */
export const TIENDA_PLANS: CnlPlan[] = [
  {
    name: "Plan Básico",
    capacity: "Pago mensual",
    badge: "-24%",
    text: "Lleva la gestión de tu negocio al siguiente nivel con el Plan Básico de Yamassi. Disfruta de una suscripción mensual que te permite vender sin límites.",
    was: 20.9,
    price: 15.9,
    period: "/ mes",
    billing: "Sin permanencia, cancela cuando quieras · Ahorras S/ 5.00",
    action: { label: "Elegir Plan Básico", href: TIENDA_URL },
    features: BASE_FEATURES.map((text) => ({ text })),
  },
  {
    name: "Plan Estándar",
    capacity: "Pago semestral",
    badge: "Recomendado · -24%",
    text: "Ahorra hasta un 18.87%. Disfruta de una suscripción semestral que te permite vender sin límites y acceder a todas las funciones del sistema.",
    was: 16.9,
    price: 12.9,
    period: "/ mes",
    billing: "Se cobra S/ 77.40 cada 6 meses · Ahorras S/ 24.00",
    featured: true,
    action: { label: "Elegir Plan Estándar", href: TIENDA_URL },
    features: BASE_FEATURES.map((text) => ({ text })),
  },
  {
    name: "Plan Élite",
    capacity: "Pago anual",
    badge: "Ahorra 37%",
    text: "Ahorra hasta S/ 72.00 anual. La tarifa mensual más baja garantizada. Máximo ahorro anual con toda la potencia del sistema.",
    was: 14.9,
    price: 9.9,
    period: "/ mes",
    billing: "Se cobra S/ 118.80 al año · Ahorras S/ 60.00",
    action: { label: "Elegir Plan Élite", href: TIENDA_URL },
    features: ["Sé parte de soporte VIP", ...BASE_FEATURES].map((text) => ({ text })),
  },
];

export const TIENDA_FAQ: { q: string; a: string }[] = [
  {
    q: "¿Tengo que comprar lectores de código de barras especiales o sirve cualquiera?",
    a: "Sirve prácticamente cualquier pistola lectora USB o inalámbrica disponible en el mercado peruano (Honeywell, Zebra, lectores genéricos de Wilson o MercadoLibre). Yamassi funciona como un teclado virtual: conectas el escáner y lee de inmediato sin instalar drivers raros.",
  },
  {
    q: "Tengo miles de productos en un Excel o en mi antiguo sistema, ¿tengo que tipear todo de nuevo?",
    a: "¡Para nada! Yamassi incluye importador masivo en Excel. Puedes subir tu catálogo con código de barras, descripción, precio de costo, precio de venta y stock inicial. Nuestro equipo de soporte también te ayuda gratis a ordenar tu archivo si lo necesitas.",
  },
  {
    q: "¿Cómo ayuda Yamassi a evitar que los cajeros cobren de más o se equivoquen con el vuelto?",
    a: "El sistema calcula el vuelto exacto con monedas y billetes peruanos. Al terminar cada turno, el cajero realiza un arqueo ciego: declara cuánto dinero en efectivo y vouchers tiene físicamente, y el sistema genera el reporte de diferencias visible sólo para el administrador.",
  },
  {
    q: "¿Puedo vender productos que no tienen código de barras, como pan, queso o verduras?",
    a: "Sí. Puedes vender por búsqueda rápida escribiendo las primeras letras (ej: 'pan') o pulsando el botón visual del producto en pantalla. Si tienes balanza electrónica, Yamassi lee el peso automáticamente y calcula el precio exacto al gramo.",
  },
  {
    q: "¿Cómo me avisa el sistema de los productos que están por vencer?",
    a: "Cada vez que ingresas mercadería registras su fecha de vencimiento. Yamassi cuenta con un semáforo inteligente que te muestra en una lista prioritaria los productos que vencerán en los próximos 30, 15 o 7 días para que puedas colocarlos al frente de la góndola o armar ofertas.",
  },
  {
    q: "¿Funciona si se corta la luz o el internet?",
    a: "Yamassi cuenta con soporte offline. Si la señal de internet cae, la caja sigue vendiendo, cobrando e imprimiendo comprobantes. Cuando el internet regresa, todos los comprobantes se envían a SUNAT sin que tengas que hacer nada.",
  },
];

/** The app screens of the current page, one per hero scenario. */
const SCREENS: ScreenData[] = [
  {
    title: "Yamassi POS Retail — Caja 01 (Minimarket San Isidro)",
    status: { label: "Lectora conectada", tone: "ok" },
    heading: "Producto escaneado",
    subheading: "Cant. · P. Unit · Subtotal",
    rows: [
      { title: "Leche Gloria Azul 400g", meta: "7750150000102 · Lote 24B · 3 un x S/ 4.20", value: "S/ 12.60" },
      { title: "Aceite Primor Clásico 900ml", meta: "7750243010419 · 1 un x S/ 8.90", value: "S/ 8.90" },
      { title: "Arroz Costeño Extra 1kg", meta: "7750345000213 · 2 un x S/ 4.80", value: "S/ 9.60" },
      { title: "Jamonada San Fernando (Granel)", meta: "⚖️ Balanza: 0.320 kg x S/ 22.00", value: "S/ 7.04" },
    ],
    totals: [
      { label: "Cliente General (Boleta)", value: "B001-0004218" },
      { label: "TOTAL VENTA", value: "S/ 38.14", strong: true },
    ],
    footer: "Stock restante Leche: 42 un (Almacén A)",
  },
  {
    title: "Semáforo Preventivo de Vencimientos",
    status: { label: "3 alertas", tone: "bad" },
    rows: [
      { title: "Yogurt Gloria Fresa 1L (12 un)", meta: "Vence en 4 días (12 Oct) · Lote: L24-09", tag: { label: "¡Rematar 2x1!", tone: "bad" } },
      { title: "Pan de Molde Unión Integral (8 un)", meta: "Vence en 9 días (17 Oct) · Lote: UN-11", tag: { label: "Exhibir al frente", tone: "warn" } },
      { title: "Atún Primor Trozos en Aceite (48 un)", meta: "Vence en 14 meses (Dic 2027) · Lote: PR-88", tag: { label: "Óptimo", tone: "ok" } },
    ],
    footer: "Evitar el descarte de solo 5 perecibles por semana ahorra más de S/ 480 al mes.",
  },
  {
    title: "Kardex de Producto: Arroz Extra 5kg",
    status: { label: "Promedio ponderado", tone: "info" },
    rows: [
      { title: "Compra Proveedor: Molinera del Sur", meta: "Factura F002-1209 · +50 sacos @ S/ 18.50", value: "+50 un" },
      { title: "Venta Mostrador Turno Mañana", meta: "Boletas correlativas B001-4190 al 4205", value: "-18 un" },
      { title: "Traslado a Sucursal #2 (Surco)", meta: "Guía de remisión electrónica T001-0082", value: "-10 un" },
    ],
    totals: [
      { label: "Stock disponible en tienda", value: "22 sacos (110 kg)" },
      { label: "Valorización en almacén", value: "S/ 407.00", strong: true },
    ],
  },
  {
    title: "Órdenes de Compra y Cuentas por Pagar",
    status: { label: "XML cargado OK", tone: "ok" },
    heading: "Distribuidora Continental S.A.C.",
    rows: [
      { title: "Factura de proveedor recibida", meta: "F001-0089123" },
      { title: "Condición de pago", meta: "Crédito 15 días", tag: { label: "Vence en 6 días", tone: "warn" } },
      { title: "Actualización automática de precios", value: "34 productos" },
    ],
    totals: [{ label: "Monto total de compra", value: "S/ 3,420.00", strong: true }],
    footer: "Importación automática de XML: sin tipear producto por producto.",
  },
];

/** Counter checkout screen of the old page (POS rápido). */
const CAJA_RAPIDA: ScreenData = {
  title: "Caja Rápida Retail · Modo Mostrador",
  status: { label: "100% Offline Ready", tone: "ok" },
  heading: "Atajos de teclado",
  subheading: "F9: Búsqueda rápida · F12: Cobrar",
  rows: [
    { title: "Gaseosa Inka Kola 500ml", meta: "Cód: 7750123004 · Stock actual: 48 un", value: "S/ 3.50" },
    { title: "Huevo Pardo Primera (x kilo)", meta: "Balanza: 1.450 kg @ S/ 9.20/kg", value: "S/ 13.34" },
    { title: "Detergente Bolívar Floral 800g", meta: "Cód: 7750890012 · Stock actual: 16 un", value: "S/ 8.20" },
  ],
  footer: "Ticket térmico 80mm / 58mm listo · Boleta enviada por WhatsApp al cliente",
};

/** Brand overrides on top of the landing's own tokens. */
const THEME = `
.cnl-root.cnl-tienda{--cnl-ink:${C.indigo};--cnl-mute:#4b5070;--cnl-faint:#858aa6;--cnl-line:rgba(30,27,75,.12);--cnl-soft:#eef7f3;--cnl-card-ink:${C.indigo};--cnl-card-mute:#555a78;--cnl-card-line:rgba(30,27,75,.1);--cnl-card-soft:#ecfdf5;--cnl-dark:${C.night}}
.cnl-tienda{--scr-bg:linear-gradient(160deg,${C.night} 0%,${C.indigo} 50%,${C.purpleDark} 100%);--scr-accent:${C.greenDark};--scr-accent-soft:#ede9fe;--scr-ink:${C.indigo};--scr-glow:rgba(16,185,129,.32)}
.cnl-tienda .cnl-pill{background:linear-gradient(180deg,${C.greenLight},${C.greenDark});color:#fff;box-shadow:0 1px 0 rgba(255,255,255,.2) inset,0 10px 24px -10px ${C.green}}
.cnl-tienda .cnl-pill.is-light,.cnl-tienda .cnl-hero-cta .cnl-pill{background:linear-gradient(180deg,#6EE7B7,${C.green});color:${C.night};box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 10px 24px -10px rgba(16,185,129,.8)}
.cnl-tienda .cnl-hero{padding-top:120px;background:linear-gradient(180deg,${C.night} 0%,${C.indigo} 36%,${C.purpleDark} 62%,${C.purple} 72%,#fff 90%)}
.cnl-tienda .cnl-hero-mark img{width:76px;height:76px;display:block;filter:drop-shadow(0 10px 24px rgba(0,0,0,.4))}
.cnl-tienda .cnl-title{color:#fff;font-size:clamp(40px,6.4vw,72px)}
.cnl-tienda .cnl-title .cnl-line:nth-child(2) .cnl-line-in{color:${C.greenLight}}
.cnl-tienda .cnl-sub{color:rgba(255,255,255,.8);max-width:52ch}
.cnl-tienda .cnl-badge{background:rgba(52,211,153,.14);color:#A7F3D0;box-shadow:inset 0 0 0 1px rgba(52,211,153,.35)}
.cnl-tienda .cnl-badge-dot{background:${C.greenLight}}
.cnl-tienda .cnl-badge-dot::after{border-color:${C.greenLight}}
.cnl-tienda .cnl-hero-alt{color:rgba(255,255,255,.82)}
.cnl-tienda .cnl-hero-alt:hover{color:#fff}
.cnl-tienda .cnl-hero-note{color:rgba(255,255,255,.62)}
.cnl-tienda .cnl-kicker{color:${C.greenDark}}
.cnl-tienda .cnl-cta-in .cnl-kicker{color:#A7F3D0}
.cnl-tienda .cnl-h2>span:nth-child(2){color:${C.purple}}
.cnl-tienda .cnl-cta-in .cnl-h2>span:nth-child(2){color:${C.greenLight}}
.cnl-tienda .cnl-cta-vista .cnl-vista-shade{background:linear-gradient(180deg,rgba(15,23,42,.94) 0%,rgba(30,27,75,.84) 45%,rgba(109,40,217,.5) 100%)}
.cnl-tienda .cnl-hero-vista .cnl-img{object-position:center 8%}
.cnl-tienda .cnl-hero-vista .cnl-vista-shade{background:linear-gradient(180deg,rgba(15,23,42,0) 50%,rgba(15,23,42,.55))}
.cnl-tienda .cnl-hero-vista .cnl-powered{color:#fff}
@media (max-width:859px){.cnl-tienda .cnl-hero-vista .cnl-chat{justify-content:flex-end}}
@media (max-width:640px){.cnl-tienda .cnl-voice{white-space:normal;height:auto;min-height:38px;padding:8px 14px 8px 12px;max-width:min(300px,100%);line-height:1.45}}
@media (min-width:860px){.cnl-tienda .cnl-hero-vista .cnl-chat{align-items:flex-end;justify-content:center;padding:72px 7% 96px}}
.cnl-tienda .cnl-stat b{color:${C.purple}}
.cnl-tienda .cnl-mod-num{color:${C.greenDark}}
.cnl-tienda .cnl-mod-tag{background:${C.greenPale};color:${C.indigo}}
.cnl-tienda .cnl-mod{border-top:3px solid ${C.green}}
.cnl-tienda .cnl-mod:nth-child(2n){border-top-color:${C.purple}}
.cnl-tienda .cnl-plan-badge{background:linear-gradient(180deg,#6EE7B7,${C.green});color:${C.night}}
.cnl-tienda .cnl-plan.is-featured{background:linear-gradient(170deg,${C.night},${C.indigo} 55%,${C.purpleDark});box-shadow:0 40px 80px -40px ${C.purple}}
.cnl-tienda .cnl-plan li>i{background:${C.green}}
.cnl-tienda .cnl-plan.is-featured li>i{background:${C.greenLight};color:${C.night}}
.cnl-tienda .cnl-faq-item summary i{background:${C.greenPale};color:${C.indigo}}
.cnl-tienda .cnl-faq-item[open] summary{color:${C.purpleDark}}
${SCREEN_CSS}
`;

export default function TiendaLanding() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: THEME }} />
      <CairnAgentsLanding
        className="cnl-tienda"
        brand="Yamassi Tienda"
        logo={<img src="/yamassi-tienda.svg" alt="" width={16} height={16} style={{ width: 16, height: 16, display: "block" }} />}
        heroMark={<img src="/yamassi-tienda.svg" alt="Yamassi Tienda" width={76} height={76} />}
        heroScene={(active) => (
          <ScreenStage screens={SCREENS} active={active} overlay label="Pantallas de Yamassi Tienda: caja, vencimientos, kardex y proveedores" />
        )}
        palette={{
          bg: "#FFFFFF",
          accent: C.green,
          agent: C.greenDark,
          ridges: ["#D1FAE5", "#F0FDF4", C.greenLight, C.purpleLight, C.purpleDark, C.indigo],
        }}
        scheme="light"
        nav={null}
        footer={null}
        announcement={{ label: "Desde S/ 9.90 al mes · productos y ventas ilimitadas", href: "#precios" }}
        title={"Control de caja, ventas e inventario\nque protege cada sol de tu tienda"}
        subtitle="Escaneo veloz con código de barras, control de vencimientos para no perder mercadería, kardex en tiempo real y facturación electrónica SUNAT al instante."
        primaryAction={{ label: "Empezar con Yamassi gratis", href: TIENDA_URL }}
        secondaryAction={{ label: "Ver funciones del punto de venta", href: "#pos" }}
        heroNote="✓ Compatible con pistolas láser y balanzas · ✓ Carga masiva desde Excel · ✓ Modo offline incluido"
        liveCalls={null}
        images={{
          hero: "/img/yamassi-tienda-hero.webp",
          heroAlt: "Cajera de una bodega entregando la compra a un cliente en el mostrador, con el logo de Yamassi Tiendas",
          canvas: "",
          call: "",
          cta: "",
        }}
        scenarios={[
          {
            label: "Cobro en caja",
            alert: "Hay cola en caja y la clienta lleva leche, aceite, arroz y jamonada a granel.",
            reply: "Escaneas, la balanza pesa la jamonada y cobras con Yape en segundos.",
            replyLink: { label: "Ver punto de venta", href: "#pos" },
            voice: "¿Le puedo pagar con Yape?",
          },
          {
            label: "Por vencer",
            alert: "12 yogures vencen en 4 días y el pan de molde en 9.",
            reply: "El semáforo de vencimientos te avisa con 30, 15 y 7 días para rematar a tiempo.",
            replyLink: { label: "Ver alertas", href: "#alertas" },
            voice: "¿Todavía tiene el 2x1 de yogurt?",
          },
          {
            label: "Kardex",
            alert: "¿Cuántos sacos de arroz quedan después de la venta y el traslado a Surco?",
            reply: "Kardex valorizado al día: 22 sacos en tienda y S/ 407.00 en almacén.",
            replyLink: { label: "Ver inventario", href: "#inventario" },
            voice: "¿Me separa dos sacos de arroz?",
          },
          {
            label: "Llegó el proveedor",
            alert: "Llegó la factura de la distribuidora y subieron varios precios.",
            reply: "Subes el XML y Yamassi suma la mercadería al almacén y actualiza 34 precios.",
            replyLink: { label: "Ver proveedores", href: "#proveedores" },
            voice: "Le dejo la factura, casera. Son 15 días de crédito.",
          },
        ]}
        logosLabel="Todo tu mostrador en una sola app"
        logos={[
          { name: "Punto de venta", style: "serif", color: C.indigo },
          { name: "Kardex", style: "round", color: C.greenDark },
          { name: "Vencimientos", style: "script", color: C.purpleDark },
          { name: "Proveedores", style: "heavy", color: C.indigo },
          { name: "Balanza", style: "mono", color: C.purple },
          { name: "SUNAT", style: "badge", color: C.green },
        ]}
        modules={{
          kicker: "Tiendas, minimarkets y retail",
          title: "Del mostrador al almacén,\nen un solo sistema.",
          text: "Punto de venta, inventario, vencimientos y proveedores conectados para que cada sol de tu tienda esté justificado.",
          items: [
            {
              id: "pos",
              visual: <ScreenCard data={CAJA_RAPIDA} />,
              tag: "Punto de venta (POS) ultra ágil",
              title: "Cobra en 3 segundos y despacha colas al instante",
              text: "Diseñado para el ritmo real del mostrador: pistolas lectoras de código de barras, integración con balanzas electrónicas para productos a granel, y atajos de teclado para no tocar el mouse.",
              points: [
                { title: "Lector de código de barras 100% plug & play", text: "Escanea cualquier código EAN-13, EAN-8 o genera tus propios códigos de barras para productos sueltos." },
                { title: "Balanza electrónica para embutidos, frutas y verduras", text: "Lee el peso automáticamente o ingresa gramos/kilos con cálculo automático de precio." },
                { title: "Control de fiados (“Fíame casero”)", text: "Registra cuentas corrientes de vecinos de confianza con límite de crédito y recordatorios de pago." },
              ],
            },
            {
              id: "inventario",
              visual: <ScreenCard data={SCREENS[2]} />,
              tag: "Inventario & kardex valorizado",
              title: "Cada producto ubicado, cada centavo justificado",
              text: "Se acabaron los inventarios de fin de mes que duraban días enteros. Con Yamassi tienes conteo en tiempo real, alertas de stock mínimo y kardex formal listo para SUNAT.",
              points: [
                { title: "Alertas automáticas de reposición (stock mínimo)", text: "Define el stock de seguridad de cada producto y Yamassi te avisará antes de que te quedes sin mercadería clave." },
                { title: "Toma de inventario rápida con celular", text: "Usa la cámara de cualquier teléfono como pistola lectora para auditar estantes y góndolas en minutos." },
                { title: "Múltiples almacenes y transferencias internas", text: "Gestiona almacén principal, trastienda y góndolas con guías de remisión electrónicas entre sedes." },
              ],
            },
            {
              id: "alertas",
              visual: <ScreenCard data={SCREENS[1]} />,
              tag: "Alertas de vencimiento & lotes",
              title: "Cero productos botados a la basura por fechas vencidas",
              text: "En un minimarket, los lácteos, embutidos y panificados son dinero congelado. El semáforo de vencimientos de Yamassi te avisa con 30, 15 y 7 días de anticipación para armar promociones o devolver a proveedores.",
              points: [
                { title: "Semáforo de caducidad", text: "Panel visual que clasifica tus productos en verde, amarillo y rojo según los días restantes." },
                { title: "Rotación FIFO automática", text: "Lo primero que vence es lo primero que se recomienda vender en mostrador." },
                { title: "Combos y liquidaciones", text: "Crea descuentos de última hora para rematar productos prontos a vencer y recuperar tu capital." },
                { title: "Devolución a proveedores", text: "Genera reportes de canje para entregar a los distribuidores que aceptan cambios de mercadería." },
              ],
            },
            {
              id: "proveedores",
              visual: <ScreenCard data={SCREENS[3]} />,
              tag: "Gestión de proveedores & compras",
              title: "Compara precios de compra y mantén tus márgenes intactos",
              text: "¿Tu distribuidor subió el precio del aceite o el azúcar? Yamassi detecta automáticamente las variaciones de costo para que actualices tus precios de venta al instante y nunca vendas a pérdida.",
              points: [
                { title: "Historial de cotizaciones por proveedor", text: "Descubre quién te vende más barato cada marca y negocia mejores condiciones de compra." },
                { title: "Calendario de pagos a distribuidores", text: "Evita atrasos o cortes de crédito de proveedores como Alicorp, Gloria o Backus con alertas de pago." },
                { title: "Recepción rápida con pistola lectora", text: "Verifica bulto por bulto lo que te deja el camión para evitar mercadería faltante antes de firmar la guía." },
                { title: "Importación automática de XML", text: "Sube el archivo XML que te envía tu distribuidor y Yamassi creará o sumará los productos al almacén sin que tengas que tipear uno por uno." },
              ],
            },
          ],
        }}
        copy={{
          live: "ventas hoy",
          centerTabs: ["Bodega", "Minimarket", "Con sucursales"],
          centerLabel: "Tipo de tienda",
          heads: { create: "Configura tu tienda", policies: "Tu mostrador", simulate: "Turno de prueba", deploy: "Empieza a vender" },
          infoTitle: "Carga tus productos",
          infoText: "Tu catálogo en Excel: código de barras, costo, precio y stock inicial",
          ruleEm: "Cada venta, compra y traslado",
          ruleTail: " queda registrado en el kardex.",
          sensitivity: ["Flexible: el cajero decide", "Equilibrado", "Estricto: todo pasa por el administrador"],
          personasTitle: "Tipos de cliente",
          personasText: "Elige quién llega a tu mostrador",
          simBusy: "Cobrando…",
          simAgain: "Simular otra vez",
          simRun: "Simular 500 ventas",
          simCount: "Ventas simuladas",
          outcomes: { resolved: "Cobradas", handoff: "Con balanza", flagged: "Fiadas" },
          tags: { resolved: "cobrada", handoff: "balanza", flagged: "fiado" },
          checks: ["Creando tu caja", "Preparando el kardex", "Abriendo la caja del día"],
          checkDocs: "archivo",
          golive: "Listo · tu tienda está en línea",
          memoryTitle: "Venta en curso",
          moodTitle: "Ánimo del cliente",
          emailExample: "tu@tienda.com",
          dialogTitle: "Hablemos de tu tienda",
          dialogText: "Cuéntanos de tu negocio y te ayudamos a elegir el plan y a cargar tus productos.",
          dialogCompany: "Tienda o minimarket",
          dialogVolume: "Productos",
          dialogPlaceholder: "Rubro, cuántas cajas, el sistema que usas hoy…",
          dialogDone: "te responda y te ayude a empezar.",
          guideHref: "/docs/pos/introduccion-yamassi-tiendas",
        }}
        canvas={{
          kicker: "Así de simple",
          heading: "Hecho para el ritmo\nde tu mostrador",
          title: "Yamassi Tienda",
          text: "Carga tus productos, conecta tu lectora y empieza a vender. Todo desde el navegador.",
          steps: [
            { title: "Carga tus productos", panel: "create", text: "Sube tu catálogo desde Excel con código de barras, costo, precio y stock. Te ayudamos gratis a ordenar tu archivo." },
            { title: "Configura tu mostrador", panel: "policies", text: "Lectora y balanza, alertas de stock mínimo, semáforo de vencimientos y arqueo ciego por turno." },
            { title: "Simula un turno", panel: "simulate", text: "Mira cómo fluyen las ventas del día entre boletas, facturas, granel y fiados." },
            { title: "Empieza a vender", panel: "deploy", text: "Activa los módulos que necesitas y cobra a tu primer cliente hoy mismo." },
          ],
          policies: [
            { id: "lectora", title: "Cobro con pistola lectora y balanza", text: "Código de barras y peso al gramo.", on: true },
            { id: "stock", title: "Alertas de stock mínimo", text: "Antes de quedarte sin mercadería clave.", on: true },
            { id: "vencimientos", title: "Semáforo de vencimientos", text: "Avisos con 30, 15 y 7 días.", on: true },
            { id: "arqueo", title: "Arqueo ciego al cerrar el turno", text: "Diferencias visibles solo para el administrador.", on: false },
          ],
          personas: ["Cliente general", "Con boleta", "Con factura", "Fiado", "Vecino frecuente"],
          intents: ["Leche", "Arroz", "Aceite", "Pan", "Gaseosa", "Huevos a granel", "Detergente", "Jamonada"],
          channels: [
            { id: "pos", label: "Punto de venta", detail: "Lectora, balanza y atajos de teclado", icon: "bolt", on: true },
            { id: "kardex", label: "Inventario y kardex", detail: "Stock valorizado al día", icon: "doc", on: true },
            { id: "vencimientos", label: "Vencimientos y lotes", detail: "Semáforo de caducidad", icon: "shield", on: true },
            { id: "whatsapp", label: "Boletas por WhatsApp", detail: "Enviadas al cliente", icon: "whats", on: false },
          ],
          samples: [
            { name: "productos.xlsx", size: 84000 },
            { name: "factura-proveedor.xml", size: 36000 },
            { name: "logo-tienda.png", size: 96000 },
          ],
        }}
        call={{
          kicker: "Un turno en el mostrador",
          title: "Cada cliente,\ncobrado en segundos.",
          text: "Una venta de mostrador de principio a fin: escáner, balanza, Yape y boleta electrónica, sin hacer esperar a la cola.",
          data: {
            caller: "Clienta",
            agent: "Caja 01",
            topic: "Venta en mostrador",
            memory: ["Cliente General (Boleta)", "Pistola lectora conectada"],
            outcome: "Venta cobrada · boleta B001-0004218 enviada por WhatsApp",
            lines: [
              { who: "caller", mood: -0.3, text: "Buenas, llevo tres leches, un aceite y dos de arroz. Y trescientos gramos de jamonada." },
              { who: "agent", mood: -0.05, memory: "Balanza: 0.320 kg · S/ 7.04", text: "Ya, casera. La jamonada pesó 320 gramos, son 7.04 soles." },
              { who: "caller", mood: 0.1, text: "¿Cuánto es todo? Le pago con Yape." },
              { who: "agent", mood: 0.5, memory: "Total: S/ 38.14 · Yape", text: "Son 38.14 soles. Listo, ya entró su Yape." },
              { who: "caller", mood: 0.7, text: "¿Me manda la boleta por WhatsApp?" },
              { who: "agent", mood: 0.9, memory: "Boleta B001-0004218", text: "Claro, ya se la envié. ¡Gracias, vuelva pronto!" },
            ],
          },
        }}
        stats={{
          kicker: "Sin letra chica",
          title: "Tu tienda en orden,\ndesde el primer día.",
          items: [
            { value: 3, prefix: "< ", suffix: " seg", label: "para cobrar a cada cliente con escáner" },
            { value: 30, suffix: " días", label: "de anticipación en las alertas de vencimiento" },
            { value: 10, label: "colaboradores incluidos en todos los planes" },
            { value: 9.9, decimals: 2, prefix: "S/ ", label: "al mes con el Plan Élite (pago anual)" },
          ],
        }}
        pricing={{
          kicker: "Planes transparentes para retail",
          title: "Planes diseñados para tu\nminimarket o tienda.",
          text: "Productos y ventas ilimitadas, reportes completos y colaboradores. Elige cómo pagar y ahorra hasta un 38% con el plan anual.",
          plans: TIENDA_PLANS,
          note: "Todos los planes incluyen ventas y productos ilimitados, reportes y hasta 10 colaboradores. Solo cambia cómo pagas.",
        }}
        faq={{
          kicker: "Preguntas frecuentes",
          title: "Resolvemos tus dudas\nsobre Yamassi Tienda",
          text: "Todo lo que necesitas saber para digitalizar tu mostrador e inventario hoy mismo.",
          items: TIENDA_FAQ,
        }}
        quotes={null}
        cta={{
          kicker: "Empieza 100% gratis para minimarkets",
          title: "Deja de perder dinero en productos vencidos.\nControla tu inventario al 100%.",
          text: "Únete a cientos de bodegas, minimarkets y tiendas de conveniencia en todo el Perú que agilizaron su mostrador y protegen sus ganancias con Yamassi.",
          action: "Hablar con un asesor",
          assurances: ["Sin tarjeta de crédito", "Soporte en Perú", "Importación de productos desde Excel gratis"],
        }}
        volumes={["Hasta 500 productos", "500–3,000 productos", "Más de 3,000 productos"]}
        onTalk={onTalk}
        onSubscribe={onSubscribe}
      />
    </>
  );
}
