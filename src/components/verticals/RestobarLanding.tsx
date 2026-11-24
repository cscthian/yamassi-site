import CairnAgentsLanding, { type CnlPlan, type CnlTalkRequest } from "@/components/ui/cairn-agents-landing";
import { SCREEN_CSS, ScreenCard, ScreenStage, TableMap, type ScreenData } from "@/components/verticals/hero-screens";
import { SUB_BRANDS } from "@/components/ui/sub-brand-logo";
import { SUNAT } from "@/lib/site";

const RESTOBAR_URL = SUB_BRANDS.restaurantes.app;

/* Yamassi Restobar sub-brand palette (from the Restobar mark) */
const C = {
  ink: "#0B0F14",
  inkSoft: "#1a0a0c",
  wine: "#780000",
  red: "#C1121F",
  redLight: "#E03A45",
  gold: "#D4AF37",
  goldLight: "#F6D365",
  goldPale: "#FBE7A1",
};

const WHATSAPP_PHONE = "51944147277";
const whatsappUrl = (text?: string) =>
  "https://api.whatsapp.com/send?phone=" + WHATSAPP_PHONE + (text ? "&text=" + encodeURIComponent(text) : "");

const openWhatsapp = (text: string) => {
  window.open(whatsappUrl(text), "_blank", "noopener");
};

const onTalk = (d: CnlTalkRequest) =>
  openWhatsapp(
    "Hola, quiero información de Yamassi Restobar.\n" +
      "Nombre: " + d.name + "\n" +
      "Restaurante: " + d.company + "\n" +
      "Correo: " + d.email + "\n" +
      "Tamaño: " + d.volume +
      (d.message.trim() ? "\nComentario: " + d.message.trim() : "")
  );

const onSubscribe = (email: string) =>
  openWhatsapp("Hola, quiero empezar con Yamassi Restobar. Mi correo es " + email);

/** Included in every plan (100% of features). */
const RESTOBAR_FEATURES = [
  "Punto de Venta (POS) y Caja sin límite de ventas diarias",
  "Toma de comandas para mozos desde cualquier celular o tablet",
  "Monitor de Cocina y Barra (KDS) en tiempo real con alertas",
  "Gestión visual de salones, mesas, barras y pedidos delivery",
  "Apertura, cierre y arqueo de caja por turno con control de descuadres",
  "Cobro con Efectivo, Tarjetas, Yape, Plin y Billeteras Digitales QR",
  "Carta digital interactiva con código QR lista para comensales",
  "Reportes de ventas, compras y platos más vendidos (PDF y Excel)",
  "Soporte prioritario vía WhatsApp y actualizaciones continuas incluidas",
].map((text) => ({ text }));

/** Plans and FAQ live here so the page can reuse them in its structured data. */
export const RESTOBAR_PLANS: CnlPlan[] = [
  {
    name: "Plan Básico",
    capacity: "Pago mensual flexible",
    text: "Ideal para iniciar sin ataduras, pagando mes a mes con todas las funciones activadas.",
    price: 19.9,
    period: "/ mes",
    billing: "Facturación mensual sin compromiso de permanencia.",
    action: { label: "Elegir Plan Básico", href: RESTOBAR_URL },
    features: RESTOBAR_FEATURES,
  },
  {
    name: "Plan Estándar",
    capacity: "Se paga por 6 meses",
    badge: "Más popular · -15.5%",
    text: "El equilibrio perfecto para restaurantes en crecimiento. Paga 6 meses y ahorra de inmediato.",
    price: 16.9,
    period: "/ mes",
    billing: "Total semestral: S/ 101.40 (6 meses) · Ahorro: S/ 18.54",
    featured: true,
    action: { label: "Elegir Plan Estándar", href: RESTOBAR_URL },
    features: RESTOBAR_FEATURES,
  },
  {
    name: "Plan Élite",
    capacity: "Pago anual (12 meses)",
    badge: "Mejor ahorro · -25%",
    text: "La tarifa mensual más baja garantizada. Máximo ahorro anual con toda la potencia del sistema.",
    price: 14.9,
    period: "/ mes",
    billing: "Total anual: S/ 179.88 (12 meses) · Ahorro: S/ 60.00",
    action: { label: "Elegir Plan Élite", href: RESTOBAR_URL },
    features: RESTOBAR_FEATURES,
  },
];

export const RESTOBAR_FAQ: { q: string; a: string }[] = [
  {
    q: "¿Qué pasa si se cae el internet en pleno servicio de almuerzo o cena?",
    a: "Yamassi cuenta con modo offline local. Si la conexión a internet falla temporalmente, tus mozos pueden seguir enviando comandas a cocina y tu caja puede seguir registrando cobros e imprimiendo comprobantes. En cuanto vuelve el internet, las ventas se sincronizan automáticamente con SUNAT y la nube.",
  },
  {
    q: "¿Tengo que comprar equipos caros o puedo usar las tablets y celulares de mis mozos?",
    a: "No requieres hardware propietario costoso. Yamassi funciona en cualquier tablet o smartphone Android, iPad, iPhone o laptop con navegador web. Puedes reutilizar tus impresoras térmicas de tickets (Epson, Bixolon, Xprinter) mediante red local, USB o Bluetooth.",
  },
  {
    q: "¿Cómo funciona la división de cuentas en una mesa grande?",
    a: "Es sumamente sencillo. Al momento de cobrar la mesa, el cajero puede elegir: (1) dividir el total en partes iguales (ej. entre 4 comensales), o (2) seleccionar plato por plato qué consumió cada persona y emitir boletas o facturas independientes con distintos medios de pago (uno con Yape, otro con tarjeta, otro en efectivo).",
  },
  {
    q: SUNAT.faqQ,
    a: SUNAT.faqA + " Además, incluye consulta automática de RUC y DNI.",
  },
  {
    q: "¿Cómo me ayuda Yamassi a controlar que los mozos o cajeros no se queden con dinero?",
    a: "Implementamos arqueos ciegos por turno. El cajero y mozo ingresan el monto físico contado sin saber cuánto marca el sistema. El sistema genera el reporte de diferencias (faltante o sobrante) accesible únicamente por el administrador o dueño del restaurante.",
  },
  {
    q: "¿Ofrecen capacitación y ayuda para cargar nuestra carta y platos?",
    a: "¡Totalmente! Durante tus 14 días de prueba nuestro equipo de soporte en Perú te ayuda a migrar o cargar tu carta de platos, configurar tus ambientes de mesas y conectar tus impresoras térmicas sin costo adicional.",
  },
];

/** The app screens of the current page, one per hero scenario. */
const SCREENS: ScreenData[] = [
  {
    title: "Panel Salón & Comandas — Turno Almuerzo",
    status: { label: "Conectado a cocina", tone: "ok" },
    heading: "Mesa 04 (Salón Principal)",
    subheading: "Mozo: Renzo C. · 24 min",
    rows: [
      { title: "1x Lomo Saltado Criollo", tag: { label: "Listo", tone: "ok" } },
      { title: "1x Ceviche Mixto Especial", tag: { label: "En cocina", tone: "warn" } },
      { title: "2x Chicha Morada 1L", tag: { label: "Entregado", tone: "muted" } },
    ],
    totals: [
      { label: "Ocupada · 4 personas", value: "Salón" },
      { label: "Total actual", value: "S/ 118.00", strong: true },
    ],
  },
  {
    title: "Comandera de Cocina · Estación Caliente",
    status: { label: "04:12 min en cola", tone: "warn" },
    heading: "Orden #042",
    subheading: "Mesa 5 (4 pax)",
    rows: [
      { title: "1x Lomo Saltado Especial", meta: "Nota: Término 3/4 · Papas bien crocantes", tag: { label: "Marchando", tone: "warn" } },
      { title: "1x Fettuccine a la Huancaína con Lomo", meta: "Sin picante extra", tag: { label: "Marchando", tone: "warn" } },
      { title: "1x Arroz con Mariscos", meta: "Separado a estación Fritura y Salteado", tag: { label: "Listo", tone: "ok" } },
    ],
    footer: "Mozo: Roberto Quispe (Tablet 02) · Impreso en Ticketera Cocina OK",
  },
  {
    title: "Mapa Gráfico de Salón y Terraza",
    status: { label: "Pidiendo cuenta", tone: "warn" },
    heading: "Mesa 08 (Terraza)",
    subheading: "Mozo: Andrea M. · 48 min",
    rows: [
      { title: "2x Pollo a la Brasa 1/2", tag: { label: "Entregado", tone: "muted" } },
      { title: "1x Porción Tequeños", tag: { label: "Entregado", tone: "muted" } },
    ],
    totals: [
      { label: "Cuenta dividida", value: "2 personas" },
      { label: "Cobro", value: "Yape + Tarjeta" },
      { label: "Por persona", value: "S/ 74.50 c/u", strong: true },
    ],
  },
  {
    title: "Resumen de Cierre de Turno · Caja Central",
    status: { label: "Cuadre perfecto", tone: "ok" },
    rows: [
      { title: "Efectivo en caja (soles)", value: "S/ 1,420.00" },
      { title: "Billeteras digitales (Yape / Plin)", value: "S/ 2,180.50" },
      { title: "Tarjetas crédito / débito (POS)", value: "S/ 3,650.00" },
      { title: "Propinas registradas en tarjeta", value: "+ S/ 285.00" },
    ],
    totals: [{ label: "Total Venta Bruta Turno", value: "S/ 7,535.50", strong: true }],
    footer: "✓ Comprobantes SUNAT transmitidos: 84 boletas · 16 facturas",
  },
];

/** Recipe costing screen of the old page (Recetas). */
const ESCANDALLO: ScreenData = {
  title: "Escandallo: Ceviche Mixto Tradicional",
  status: { label: "Margen: 68%", tone: "ok" },
  heading: "Receta estándar por porción",
  rows: [
    { title: "Filete de corvina fresca (180g)", value: "S/ 8.50" },
    { title: "Mixtura de mariscos cocidos (120g)", value: "S/ 4.20" },
    { title: "Limón sutil, ají limo y culantro", value: "S/ 1.10" },
    { title: "Guarnición (camote glaseado, choclo desgranado)", value: "S/ 1.00" },
  ],
  totals: [
    { label: "Costo total de insumos", value: "S/ 14.80" },
    { label: "Precio de venta en carta", value: "S/ 46.00", strong: true },
  ],
  footer: "Cada plato que se marcha descuenta 180 g de corvina y 120 g de mixtura del almacén central.",
};

/** Brand overrides on top of the landing's own tokens. */
const THEME = `
.cnl-root.cnl-restobar{--cnl-ink:${C.ink};--cnl-mute:#4b4f57;--cnl-faint:#8a8d94;--cnl-line:rgba(11,15,20,.12);--cnl-soft:#f6f1ea;--cnl-card-ink:${C.ink};--cnl-card-mute:#5b5f67;--cnl-card-line:rgba(11,15,20,.1);--cnl-card-soft:#fbf1e1;--cnl-dark:${C.ink}}
.cnl-restobar{--scr-bg:linear-gradient(160deg,${C.ink} 0%,${C.inkSoft} 45%,${C.wine} 100%);--scr-accent:${C.red};--scr-accent-soft:#fde8ea;--scr-ink:${C.ink};--scr-glow:rgba(193,18,31,.4)}
.cnl-restobar .cnl-pill{background:linear-gradient(180deg,${C.redLight},${C.wine});color:#fff;box-shadow:0 1px 0 rgba(255,255,255,.18) inset,0 10px 24px -10px ${C.red}}
.cnl-restobar .cnl-pill.is-light,.cnl-restobar .cnl-hero-cta .cnl-pill{background:linear-gradient(180deg,${C.goldPale},${C.gold});color:${C.ink};box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 10px 24px -10px rgba(212,175,55,.8)}
.cnl-restobar .cnl-hero{padding-top:120px;background:linear-gradient(180deg,${C.ink} 0%,${C.inkSoft} 34%,${C.wine} 60%,${C.red} 72%,#fff 90%)}
.cnl-restobar .cnl-hero-mark img{width:76px;height:76px;display:block;filter:drop-shadow(0 10px 24px rgba(0,0,0,.45))}
.cnl-restobar .cnl-title{color:#fff;font-size:clamp(40px,6.4vw,72px)}
.cnl-restobar .cnl-title .cnl-line:nth-child(2) .cnl-line-in{color:${C.goldLight}}
.cnl-restobar .cnl-sub{color:rgba(255,255,255,.8);max-width:52ch}
.cnl-restobar .cnl-badge{background:rgba(246,211,101,.14);color:${C.goldPale};box-shadow:inset 0 0 0 1px rgba(246,211,101,.35)}
.cnl-restobar .cnl-badge-dot{background:${C.goldLight}}
.cnl-restobar .cnl-badge-dot::after{border-color:${C.goldLight}}
.cnl-restobar .cnl-hero-alt{color:rgba(255,255,255,.82)}
.cnl-restobar .cnl-hero-alt:hover{color:#fff}
.cnl-restobar .cnl-hero-note{color:rgba(255,255,255,.62)}
.cnl-restobar .cnl-kicker{color:${C.red}}
.cnl-restobar .cnl-cta-in .cnl-kicker{color:${C.goldPale}}
.cnl-restobar .cnl-h2>span:nth-child(2){color:${C.red}}
.cnl-restobar .cnl-cta-in .cnl-h2>span:nth-child(2){color:${C.goldLight}}
.cnl-restobar .cnl-cta-vista .cnl-vista-shade{background:linear-gradient(180deg,rgba(11,15,20,.94) 0%,rgba(26,10,12,.84) 45%,rgba(120,0,0,.55) 100%)}
.cnl-restobar .cnl-hero-vista .cnl-img{object-position:center 8%}
.cnl-restobar .cnl-hero-vista .cnl-vista-shade{background:linear-gradient(180deg,rgba(11,15,20,0) 50%,rgba(11,15,20,.55))}
.cnl-restobar .cnl-hero-vista .cnl-powered{color:#fff}
@media (max-width:859px){.cnl-restobar .cnl-hero-vista .cnl-chat{justify-content:flex-end}}
@media (max-width:640px){.cnl-restobar .cnl-voice{white-space:normal;height:auto;min-height:38px;padding:8px 14px 8px 12px;max-width:min(300px,100%);line-height:1.45}}
@media (min-width:860px){.cnl-restobar .cnl-hero-vista .cnl-chat{align-items:flex-end;justify-content:center;padding:72px 7% 96px}}
.cnl-restobar .cnl-stat b{color:${C.red}}
.cnl-restobar .cnl-mod-num{color:${C.wine}}
.cnl-restobar .cnl-mod-tag{background:${C.goldPale};color:${C.ink}}
.cnl-restobar .cnl-mod{border-top:3px solid ${C.red}}
.cnl-restobar .cnl-mod:nth-child(2n){border-top-color:${C.gold}}
.cnl-restobar .cnl-plan-badge{background:linear-gradient(180deg,${C.goldPale},${C.gold});color:${C.ink}}
.cnl-restobar .cnl-plan.is-featured{background:linear-gradient(170deg,${C.ink},${C.inkSoft} 55%,${C.wine});box-shadow:0 40px 80px -40px ${C.red}}
.cnl-restobar .cnl-plan li>i{background:${C.red}}
.cnl-restobar .cnl-plan.is-featured li>i{background:${C.goldLight};color:${C.ink}}
.cnl-restobar .cnl-faq-item summary i{background:${C.goldPale};color:${C.ink}}
.cnl-restobar .cnl-faq-item[open] summary{color:${C.wine}}
${SCREEN_CSS}
`;

export default function RestobarLanding() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: THEME }} />
      <CairnAgentsLanding
        className="cnl-restobar"
        brand="Yamassi Restobar"
        mark="/yamassi-restobar-sm.svg"
        logo={<img src="/yamassi-restobar-sm.svg" alt="" width={16} height={16} style={{ width: 16, height: 16, display: "block" }} />}
        heroMark={<img src="/yamassi-restobar-sm.svg" alt="Yamassi Restobar" width={76} height={76} />}
        heroScene={(active) => (
          <ScreenStage screens={SCREENS} active={active} overlay label="Pantallas de Yamassi Restobar: comandas, cocina, mesas y cierre de caja" />
        )}
        palette={{
          bg: "#FFFFFF",
          accent: C.red,
          agent: C.red,
          ridges: [C.goldPale, "#fff6dc", C.gold, C.red, C.wine, C.ink],
        }}
        scheme="light"
        nav={null}
        footer={null}
        announcement={{ label: "Desde S/ 14.90 al mes · 100% de funciones", href: "#precios" }}
        title={"Control de caja y comandas\nque no se cuelga en hora punta"}
        subtitle="Toma pedidos desde tablet o celular, envía comandas automáticas a cocina y barra, divide cuentas en segundos y emite boletas y facturas electrónicas con tu propio certificado digital."
        primaryAction={{ label: "Empezar con Yamassi gratis", href: RESTOBAR_URL }}
        secondaryAction={{ label: "Ver cómo funcionan las comandas", href: "#comandas" }}
        heroNote="✓ Sin tarjeta de crédito · ✓ Compatible con impresoras térmicas ESC/POS · ✓ Soporte en Perú"
        liveCalls={null}
        images={{
          hero: "/img/yamassi-restobar-hero.webp",
          heroAlt: "Moza de un restaurante sirviendo platos peruanos a una mesa de clientes, con el logo de Yamassi Restobar",
          canvas: "",
          call: "",
          cta: "",
        }}
        scenarios={[
          {
            label: "Hora punta",
            alert: "Mesa 04 pide lomo saltado y ceviche mixto en plena hora de almuerzo.",
            reply: "La comanda llega a cocina y barra al instante, sin papelitos ni platos perdidos.",
            replyLink: { label: "Ver comandas", href: "#comandas" },
            voice: "¿Ya sale mi lomo saltado?",
          },
          {
            label: "Cocina",
            alert: "La orden #042 lleva 4 minutos en cola y el lomo va término 3/4.",
            reply: "Cada plato llega a su estación con sus notas: “Término 3/4”, “Sin picante extra”.",
            replyLink: { label: "Ver cocina", href: "#comandas" },
            voice: "Sin cebolla, por favor.",
          },
          {
            label: "Cuenta dividida",
            alert: "Mesa 08 pide la cuenta: son dos y quieren pagar por separado.",
            reply: "Divides la cuenta en 2 clics: uno paga con Yape y el otro con tarjeta.",
            replyLink: { label: "Ver mesas", href: "#mesas" },
            voice: "¿Podemos pagar por separado?",
          },
          {
            label: "Cierre de caja",
            alert: "Fin del turno: efectivo, Yape, Plin, tarjetas y propinas por cuadrar.",
            reply: "Arqueo ciego por turno: faltantes y sobrantes al centavo, con propinas por mozo.",
            replyLink: { label: "Ver caja", href: "#caja" },
            voice: "¿Cuánto nos toca de propinas hoy?",
          },
        ]}
        logosLabel="Todo tu restaurante en una sola app"
        logos={[
          { name: "Comandas", style: "serif", color: C.ink },
          { name: "Mesas", style: "round", color: C.red },
          { name: "Cocina", style: "script", color: C.wine },
          { name: "Caja", style: "heavy", color: C.ink },
          { name: "Recetas", style: "mono", color: C.red },
          { name: "SUNAT", style: "badge", color: C.gold },
        ]}
        modules={{
          kicker: "Restaurantes, bares y cafeterías",
          title: "Del mozo a la caja,\nen un solo sistema.",
          text: "Comandas, mesas, caja y recetas conectadas para que el servicio no se detenga en hora punta.",
          items: [
            {
              id: "comandas",
              visual: <ScreenCard data={SCREENS[1]} />,
              tag: "Comandas instantáneas",
              title: "Del mozo a la cocina y barra en menos de 1 segundo",
              text: "Olvídate de mozos corriendo con papelitos manchados o comandas perdidas. Con Yamassi, cada pedido se envía automáticamente a su estación correspondiente: cocina caliente, cevichería o barra de tragos.",
              points: [
                { title: "Impresión térmica o pantalla KDS inteligente", text: "Compatible con impresoras de red/Bluetooth o tablets en cocina para marcar platos listos." },
                { title: "Modificadores y notas especiales para el chef", text: "“Sin cebolla”, “Término medio”, “Tártara aparte”. Todo llega claro para evitar platos devueltos." },
                { title: "Tiempos de preparación y alertas de retraso", text: "Monitorea el tiempo promedio desde la toma del pedido hasta la mesa para mejorar la rotación." },
              ],
            },
            {
              id: "mesas",
              visual: (
                <TableMap
                  title="Mapa Gráfico de Salón y Terraza"
                  tables={[
                    { name: "Mesa 1", meta: "4 pax · S/ 142", state: "busy", label: "Ocupada" },
                    { name: "Mesa 2", meta: "2 pax disponible", state: "free", label: "Libre" },
                    { name: "Mesa 3", meta: "6 pax · S/ 285", state: "bill", label: "Pide cuenta" },
                    { name: "Mesa 4", meta: "2 pax · S/ 88", state: "busy", label: "Ocupada" },
                    { name: "Mesa 5 + 6", meta: "Mesa unida (10 pax)", state: "group", label: "Grupo grande" },
                    { name: "Mesa 7", meta: "4 pax disponible", state: "free", label: "Libre", wide: true },
                  ]}
                  tip={{ title: "¿Mesa compartida o amigos dividiendo cuenta?", text: "Separar por ítems o partes iguales." }}
                />
              ),
              tag: "Gestión de salón, mesas & barra",
              title: "Visualiza tu salón en vivo y divide cuentas sin dolor",
              text: "Nada frena más una venta en fin de semana que una mesa de amigos pidiendo pagar por separado. Con Yamassi divides cuentas en 2 clics por platos consumidos o montos iguales.",
              points: [
                { title: "Mover o juntar mesas con un toque", text: "¿Los clientes cambiaron de mesa o armaron grupo? Pasa todos los pedidos sin perder el hilo de las comandas ni duplicar platos." },
                { title: "Pre-cuenta inmediata con código QR", text: "Imprime el ticket de pre-cuenta para que el cliente revise su consumo antes de emitir la boleta o factura definitiva." },
                { title: "Múltiples ambientes (Salón, Segundo piso, Terraza, Barra)", text: "Configura tantos ambientes como tenga tu local y asigna mozos específicos a cada área." },
              ],
            },
            {
              id: "caja",
              visual: <ScreenCard data={SCREENS[3]} />,
              tag: "Control de caja & arqueos ciegos",
              title: "Caja blindada contra faltantes y facturación electrónica en regla",
              text: "Evita pérdidas y confusiones con arqueos de caja ciegos por turno. Acepta Yape, Plin, tarjetas y efectivo con propinas desglosadas con claridad para tu equipo.",
              points: [
                { title: "Arqueo de caja ciego", text: "El cajero declara lo que tiene en físico sin ver el sistema. Se detectan faltantes y sobrantes al centavo." },
                { title: "Yape & Plin integrados", text: "Verificación rápida de comprobantes digitales de billeteras para no dejar pasar capturas falsas." },
                { title: "Boletas y facturas electrónicas", text: "Conexión directa con SUNAT usando el Certificado Digital Tributario de tu empresa. Consulta RUC y DNI automática." },
                { title: "Propinas por mozo", text: "Reporte exacto de propinas en tarjeta y efectivo para repartir equitativamente entre salón y cocina." },
              ],
            },
            {
              id: "recetas",
              visual: <ScreenCard data={ESCANDALLO} />,
              tag: "Control de insumos & escandallos",
              title: "Descubre exactamente cuánto te cuesta cada plato",
              text: "El secreto de los restaurantes más rentables es no desperdiciar insumos. Con el costeo de recetas de Yamassi, sabrás cuál es tu plato estrella con más margen y reducirás mermas en cocina.",
              points: [
                { title: "Descuento de stock en gramos, kilos y unidades", text: "Controla cortes de carne, kilos de pollo, mariscos, licores y botellas por trago vendido." },
                { title: "Alertas de insumos críticos antes de la noche", text: "El sistema te avisa qué insumos están por agotarse para hacer pedidos a proveedores a tiempo." },
                { title: "Mermas y desperdicios bajo control", text: "Registra platos devueltos, productos vencidos o mermas de producción para no perder dinero." },
                { title: "Escandallo: Ceviche Mixto Tradicional", text: "Costo de insumos S/ 14.80 y precio en carta S/ 46.00: margen de 68%. Cada plato vendido descuenta del almacén los 180 g de corvina y 120 g de mixtura." },
              ],
            },
          ],
        }}
        copy={{
          live: "pedidos hoy",
          centerTabs: ["Restaurante", "Cafetería", "Bar"],
          centerLabel: "Tipo de local",
          heads: { create: "Configura tu local", policies: "Tu operación", simulate: "Turno de prueba", deploy: "Empieza a vender" },
          infoTitle: "Carga tu carta",
          infoText: "Tu carta de platos, precios y recetas",
          ruleEm: "Cada venta, propina y comprobante",
          ruleTail: " queda registrado en el cierre del turno.",
          sensitivity: ["Flexible: el equipo decide", "Equilibrado", "Estricto: todo pasa por el administrador"],
          personasTitle: "Ambientes",
          personasText: "Elige de dónde llegan los pedidos",
          simBusy: "Atendiendo…",
          simAgain: "Simular otra vez",
          simRun: "Simular 500 pedidos",
          simCount: "Pedidos simulados",
          outcomes: { resolved: "Entregados", handoff: "En cocina", flagged: "Pidiendo cuenta" },
          tags: { resolved: "entregado", handoff: "en cocina", flagged: "pide cuenta" },
          checks: ["Creando tus mesas y ambientes", "Conectando cocina y barra", "Abriendo la caja del turno"],
          checkDocs: "archivo",
          golive: "Listo · tu restaurante está en línea",
          memoryTitle: "Cuenta de la mesa",
          moodTitle: "Ánimo del comensal",
          emailExample: "tu@restaurante.com",
          dialogTitle: "Hablemos de tu restaurante",
          dialogText: "Cuéntanos de tu local y te ayudamos a elegir el plan y a cargar tu carta.",
          dialogCompany: "Restaurante o local",
          dialogVolume: "Mesas",
          dialogPlaceholder: "Tipo de cocina, cuántos mozos, el sistema que usas hoy…",
          dialogDone: "te responda y te ayude a empezar.",
          guideHref: "/docs/restobar/introduccion-yamassi-restobar",
        }}
        canvas={{
          kicker: "Así de simple",
          heading: "Hecho para el ritmo\nde tu restaurante",
          title: "Yamassi Restobar",
          text: "Configura tu local, conecta cocina y barra, y empieza a vender. Todo desde el navegador.",
          steps: [
            { title: "Carga tu carta", panel: "create", text: "Elige tu tipo de local y sube tu carta de platos y precios. Nuestro equipo te ayuda a migrarla sin costo." },
            { title: "Configura tu operación", panel: "policies", text: "Comandas desde el celular del mozo, cocina y barra conectadas, arqueo ciego por turno y propinas por mozo." },
            { title: "Simula un turno", panel: "simulate", text: "Mira cómo fluyen los pedidos entre salón, terraza, barra y delivery." },
            { title: "Empieza a vender", panel: "deploy", text: "Activa los módulos que necesitas y atiende tu primera mesa hoy mismo." },
          ],
          policies: [
            { id: "comandas", title: "Mozos toman comandas desde su celular o tablet", text: "Cada pedido va directo a su estación.", on: true },
            { id: "kds", title: "Cocina y barra reciben su comanda", text: "En pantalla KDS o en ticketera térmica.", on: true },
            { id: "arqueo", title: "Arqueo ciego por turno", text: "Faltantes y sobrantes al centavo.", on: true },
            { id: "propinas", title: "Propinas por mozo", text: "Desglosadas en tarjeta y efectivo.", on: false },
          ],
          personas: ["Salón", "Terraza", "Barra", "Delivery", "Para llevar"],
          intents: ["Lomo saltado", "Ceviche mixto", "Pollo a la brasa", "Arroz con mariscos", "Causa rellena", "Chicha morada", "Tequeños"],
          channels: [
            { id: "comandas", label: "Comandas", detail: "Desde el celular o tablet del mozo", icon: "phone", on: true },
            { id: "kds", label: "Cocina y barra (KDS)", detail: "Pantalla o ticketera térmica", icon: "bolt", on: true },
            { id: "caja", label: "Caja y arqueo", detail: "Efectivo, tarjetas, Yape y Plin", icon: "shield", on: true },
            { id: "carta", label: "Carta digital QR", detail: "Lista para tus comensales", icon: "globe", on: false },
          ],
          samples: [
            { name: "carta-de-platos.xlsx", size: 58000 },
            { name: "receta-ceviche-mixto.pdf", size: 142000 },
            { name: "logo-restaurante.png", size: 96000 },
          ],
        }}
        call={{
          kicker: "Un turno en el salón",
          title: "Cada mesa,\ncon su cuenta clara.",
          text: "Una mesa de la terraza pide la cuenta en plena hora punta. El mozo ve el consumo, divide la cuenta y cobra sin hacer esperar a nadie.",
          data: {
            caller: "Mesa 08",
            agent: "Mozo",
            topic: "Pedido de cuenta",
            memory: ["Terraza · 2 personas", "Mozo: Andrea M."],
            outcome: "Cuenta dividida · cobro con Yape y tarjeta",
            lines: [
              { who: "caller", mood: -0.4, text: "Joven, ¿nos trae la cuenta? Vamos a pagar por separado." },
              { who: "agent", mood: -0.15, memory: "2x Pollo a la Brasa 1/2 · 1x Tequeños", text: "Claro. Tienen dos pollos a la brasa y una porción de tequeños. ¿Dividimos en partes iguales o por plato?" },
              { who: "caller", mood: 0.1, text: "En partes iguales. Uno paga con Yape y el otro con tarjeta." },
              { who: "agent", mood: 0.5, memory: "Cobro: Yape + Tarjeta · S/ 74.50 c/u", text: "Listo, son 74.50 soles cada uno. Aquí tienen la pre-cuenta para que revisen su consumo." },
              { who: "caller", mood: 0.85, text: "Perfecto, qué rápido. Muchas gracias." },
            ],
          },
        }}
        stats={{
          kicker: "Sin letra chica",
          title: "Todo tu restaurante,\ndesde el primer día.",
          items: [
            { value: 0, text: "Sin límite", label: "de mesas: crea todas las que tu local necesite" },
            { value: 0, prefix: "S/ ", label: "para empezar con el plan gratuito" },
            { value: 1, suffix: " clic", label: "para dividir la cuenta por comensal" },
            { value: 14.9, decimals: 2, prefix: "S/ ", label: "al mes con el Plan Élite, con todas las funciones" },
          ],
        }}
        pricing={{
          kicker: "Precios claros y transparentes",
          title: "Elige el plan ideal\npara tu restaurante.",
          text: "Yamassi es gratis para empezar. Sin contratos forzosos, sin comisiones ocultas por venta y con 100% de funciones gastronómicas activadas.",
          plans: RESTOBAR_PLANS,
          note: "Todos los planes incluyen el 100% de las funciones. Solo cambia cómo pagas: mes a mes, cada 6 meses o una vez al año.",
        }}
        faq={{
          kicker: "Preguntas frecuentes",
          title: "Todo lo que necesitas saber\nantes de empezar",
          text: "¿Tienes dudas sobre la instalación o compatibilidad? Te respondemos claro.",
          items: RESTOBAR_FAQ,
        }}
        quotes={null}
        cta={{
          kicker: "Empieza 100% gratis para restaurantes",
          title: "Lleva tu restaurante al siguiente nivel.\nOlvídate de los errores en hora punta.",
          text: "Únete a cientos de restaurantes, cafeterías y pollerías en todo el Perú que agilizaron su atención y duplicaron la rotación de sus mesas con Yamassi.",
          action: "Hablar con un asesor",
          assurances: ["Sin tarjeta de crédito", "Soporte en Perú", "Migración de tu carta sin costo"],
        }}
        volumes={["Hasta 10 mesas", "11–30 mesas", "Más de 30 mesas"]}
        onTalk={onTalk}
        onSubscribe={onSubscribe}
      />
    </>
  );
}
