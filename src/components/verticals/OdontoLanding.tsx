import CairnAgentsLanding, { type CnlPlan, type CnlTalkRequest } from "@/components/ui/cairn-agents-landing";
import { SUB_BRANDS } from "@/components/ui/sub-brand-logo";

const ODONTO_APP = SUB_BRANDS.odontologia.app;

/* Odonto Yamassi sub-brand palette */
const C = {
  navy: "#021D4A",
  navyDark: "#00133E",
  yellow: "#FCD448",
  yellowDark: "#FCC627",
  yellowLight: "#FCE687",
  purple: "#5D43F7",
  purpleDark: "#402FC7",
  purpleLight: "#6C56F9",
  blue: "#5F8FFA",
  gray: "#D4D7DD",
};

const WHATSAPP_PHONE = "51944147277";
const whatsappUrl = (text?: string) =>
  "https://api.whatsapp.com/send?phone=" + WHATSAPP_PHONE + (text ? "&text=" + encodeURIComponent(text) : "");

const openWhatsapp = (text: string) => {
  window.open(whatsappUrl(text), "_blank", "noopener");
};

const onTalk = (d: CnlTalkRequest) =>
  openWhatsapp(
    "Hola, quiero información de Odonto Yamassi.\n" +
      "Nombre: " + d.name + "\n" +
      "Consultorio/clínica: " + d.company + "\n" +
      "Correo: " + d.email + "\n" +
      "Tamaño: " + d.volume +
      (d.message.trim() ? "\nComentario: " + d.message.trim() : "")
  );

const onSubscribe = (email: string) =>
  openWhatsapp("Hola, quiero empezar con Odonto Yamassi. Mi correo es " + email);

/** Plans and FAQ live here so the page can reuse them in its structured data. */
export const ODONTO_PLANS: CnlPlan[] = [
  {
    name: "Consultorio Solo",
    capacity: "Hasta 2 sillones",
    badge: "Ideal para empezar",
    text: "Plan Odontólogo Independiente. Para doctores que atienden su propio consultorio o box dental privado.",
    price: 79,
    period: "/ mes",
    featured: true,
    action: { label: "Empezar gratis", href: ODONTO_APP },
    features: [
      { text: "2 meses gratis, sin tarjeta" },
      { text: "Odontograma digital ilimitado (adultos y niños)" },
      { text: "Historias clínicas y consentimientos informados (PDF para imprimir y firmar)" },
      { text: "Agenda con recordatorios por WhatsApp" },
      { text: "Cuentas de tratamiento y presupuestos por paciente" },
      { text: "Caja con arqueo, cobros, adelantos y devoluciones" },
      { text: "Equipo con roles y permisos (recepción, asistente, caja)" },
      { text: "Presupuestos exportables a PDF", soon: true },
      { text: "Boletas y facturas electrónicas SUNAT", soon: true },
    ],
  },
  {
    name: "Clínica Dental Pro",
    capacity: "Hasta 4 sillones",
    badge: "Para clínicas",
    text: "Plan Centro Odontológico. Para clínicas con recepcionista, varios doctores especialistas y alto flujo de pacientes.",
    price: 149,
    period: "/ mes",
    action: { label: "Empezar gratis", href: ODONTO_APP },
    features: [
      { text: "Todo lo del plan Consultorio Solo" },
      { text: "Doctores y especialistas ilimitados" },
      { text: "Agenda para hasta 4 sillones con recordatorios por WhatsApp" },
      { text: "Caja clínica con control de saldos" },
      { text: "Soporte prioritario personalizado los 7 días" },
      { text: "Cuotas y planes de pago", soon: true },
      { text: "Liquidación de comisiones médicas", soon: true },
      { text: "Control de pagos a laboratorios dentales", soon: true },
      { text: "Radiografías y fotos en la nube", soon: true },
    ],
  },
  {
    name: "Corporativo Multisede",
    capacity: "2+ sedes · sillones sin límite",
    text: "Cadenas dentales. Para policlínicos y redes de consultorios con gestión médica y financiera unificada.",
    price: 299,
    period: "/ mes por sede",
    action: { label: "Hablar con ventas", href: whatsappUrl("Hola, quiero información del plan Corporativo Multisede de Odonto Yamassi.") },
    features: [
      { text: "Todo lo del plan Clínica Dental Pro" },
      { text: "Capacitación a secretarias y asistentes dentales" },
      { text: "Historia clínica compartida entre todas las sedes", soon: true },
      { text: "Dashboard gerencial con KPIs de rentabilidad", soon: true },
      { text: "Central telefónica y call center de citas", soon: true },
      { text: "SLA de atención técnica garantizada", soon: true },
    ],
  },
];

export const ODONTO_FAQ: { q: string; a: string }[] = [
  {
    q: "¿En qué norma se basa el odontograma?",
    a: "El odontograma digital de Yamassi está basado en la NTS de Historia Clínica del MINSA y usa la numeración dental de la Federación Dental Internacional (FDI), con el código de colores habitual: rojo para patología y azul para tratamiento realizado.",
  },
  {
    q: "¿Cómo se envían los recordatorios de citas por WhatsApp?",
    a: "Desde la cita o con «Recordatorios de mañana», un clic abre WhatsApp (web o celular) con el mensaje listo: fecha, hora y doctor. Lo revisas y lo envías desde el WhatsApp de tu consultorio, así el paciente reconoce tu número. La cita queda marcada como recordada.",
  },
  {
    q: "¿Puedo subir radiografías periapicales, panorámicas y fotos intraorales?",
    a: "Está en camino. El almacenamiento de radiografías y fotos en la nube llega con el plan Clínica Dental Pro. Mientras tanto, la anamnesis, el odontograma y los consentimientos ya son 100% digitales.",
  },
  {
    q: "¿Cómo calcula Yamassi las comisiones de los doctores especialistas?",
    a: "La liquidación de comisiones médicas y el control de pagos a laboratorios dentales llegan próximamente al plan Clínica Dental Pro. Hoy ya cuentas con caja clínica con control de saldos y cuentas de tratamiento por paciente.",
  },
  {
    q: "¿Qué validez tienen las historias clínicas y los consentimientos informados?",
    a: "Cada consentimiento se emite con su texto fijo y se descarga en PDF con código y huella del texto; el paciente lo firma en papel y subes la foto o el escaneo. Las atenciones de historia clínica las firma el odontólogo con su colegiatura y, una vez firmadas, solo se corrigen con «Enmendar», que deja registro.",
  },
  {
    q: "¿Qué pasa cuando terminan los 2 meses gratis?",
    a: "Tu centro queda en solo lectura: puedes consultar toda tu información hasta que actives tu plan. La activación es manual: pagas por Yape o transferencia y activamos tu centro por 1, 3 o 12 meses.",
  },
  {
    q: "¿Puedo pasar mis pacientes de mi software anterior o de un Excel?",
    a: "Escríbenos por WhatsApp y te ayudamos a empezar con tu información. Con 2 meses de prueba tienes tiempo de sobra para cargar tus pacientes sin apuro.",
  },
];

/* ------------------------------------------------------------------
 * App screens for "Así de simple" and "Un día en recepción", drawn after
 * the real Odonto Yamassi screens (Equipo, Permisos por rol, Agenda por
 * sillón, Pacientes, Cuenta OD-xxxx, detalle de cita, recordatorio).
 * ------------------------------------------------------------------ */

const SCREENS_CSS = `
.od-f{display:grid;gap:9px}
.od-k{font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--cnl-card-mute)}
.od-in{display:flex;align-items:center;gap:8px;min-height:32px;padding:0 10px;border-radius:8px;background:var(--cnl-card-soft);font-size:12.5px;color:var(--cnl-card-ink);flex:1;min-width:0}
.od-in.is-ph{color:var(--cnl-card-mute)}
.od-in svg{width:13px;height:13px;flex:none;color:var(--cnl-card-mute)}
.od-line{display:flex;gap:6px;align-items:center}
.od-mini{display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 12px;border-radius:8px;font-size:12px;font-weight:700;background:#5D43F7;color:#fff;flex:none}
.od-mini.is-soft{background:#E9E5FF;color:#402FC7}
.od-ok-t{font-size:11px;font-weight:600;color:#047857}
.od-box{display:grid;gap:6px;padding:9px 10px;border-radius:10px;box-shadow:inset 0 0 0 1px var(--cnl-card-line)}
.od-box-top{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.od-box-top small{font-size:10.5px;color:var(--cnl-card-mute)}
.od-chair{display:flex;justify-content:space-between;font-size:12.5px;color:var(--cnl-card-ink);padding:3px 0;border-top:1px solid var(--cnl-card-line)}
.od-chair:first-of-type{border-top:0}
.od-chair small{font-size:10.5px;color:var(--cnl-card-mute);text-decoration:underline}
.od-btn{display:flex;align-items:center;justify-content:center;gap:7px;height:34px;border-radius:99px;font-size:12.5px;font-weight:700;background:#5D43F7;color:#fff}
.od-btn.is-wa{background:#25D366;color:#063d1c}
.od-tabs{display:flex;flex-wrap:wrap;gap:4px}
.od-tab{padding:4px 9px;border-radius:99px;font-size:10.5px;font-weight:600;white-space:nowrap;color:var(--cnl-card-ink);box-shadow:inset 0 0 0 1px var(--cnl-card-line)}
.od-tab.is-on{background:#5D43F7;color:#fff;box-shadow:none}
.od-note{padding:7px 9px;border-radius:8px;background:#EEF0FF;font-size:11px;line-height:1.45;color:#3b3f73}
.od-cks{display:grid;gap:6px}
.od-ck{display:grid;grid-template-columns:16px 1fr;gap:8px;align-items:start;font-size:12px;color:var(--cnl-card-ink)}
.od-ck>i{width:15px;height:15px;margin-top:1px;border-radius:4px;box-shadow:inset 0 0 0 1.5px #b9b7d4;display:grid;place-items:center;font-style:normal;font-size:10px;font-weight:800;color:#fff}
.od-ck.is-on>i{background:#5D43F7;box-shadow:none}
.od-ck.is-fixed{opacity:.55}
.od-ck small{display:block;font-size:10.5px;color:var(--cnl-card-mute)}
.od-ck em{font-style:normal;font-size:9.5px;font-weight:600;padding:1px 5px;margin-left:4px;border-radius:4px;background:#FFF6D6;color:#92400E}
.od-day{display:grid;grid-template-columns:36px 1fr 1fr;gap:5px;font-size:11px}
.od-day>b{font-size:11px;font-weight:600;color:var(--cnl-card-ink);text-align:center;padding-bottom:3px;border-bottom:1px solid var(--cnl-card-line)}
.od-t{font:500 10px/1 ui-monospace,Menlo,monospace;color:var(--cnl-card-mute);padding-top:7px}
.od-slot{min-height:42px;padding:5px 7px;border-radius:7px;display:grid;gap:1px;align-content:start;background:#E9E5FF;box-shadow:inset 3px 0 0 #5D43F7}
.od-slot b{font-size:11.5px;color:var(--cnl-card-ink)}
.od-slot span{font-size:10px;color:var(--cnl-card-mute)}
.od-slot.is-free{background:transparent;box-shadow:none;border:1px dashed var(--cnl-card-line)}
.od-tag{justify-self:start;margin-top:2px;padding:1px 6px;border-radius:99px;font-size:9.5px;font-weight:700;font-style:normal}
.od-tag.ok{background:#D1FAE5;color:#065F46}
.od-tag.wait{background:#FEF3C7;color:#92400E}
.od-bar{display:flex;flex-wrap:wrap;gap:5px}
.od-list{display:grid;gap:6px;list-style:none;margin:0;padding:0}
.od-list li{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:10px;background:var(--cnl-card-soft);font-size:12.5px;color:var(--cnl-card-ink)}
.od-list li>i{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;flex:none;background:#5D43F7;color:#fff;font-style:normal;font-size:11px;font-weight:800}
.od-c{text-align:center;font-size:11.5px;color:var(--cnl-card-mute)}
.od-tbl{width:100%;border-collapse:collapse;font-size:11.5px}
.od-tbl th{padding:6px 4px;font-size:9.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--cnl-card-mute);text-align:left;background:#F3F1FF}
.od-tbl td{padding:7px 4px;border-top:1px solid var(--cnl-card-line);color:var(--cnl-card-ink)}
.od-tbl td code{font:500 10.5px ui-monospace,Menlo,monospace;color:var(--cnl-card-mute)}
.od-tbl tr.is-on td{background:#F3F1FF}
.od-tbl a{color:#5D43F7;font-weight:600}
.od-acc{display:flex;justify-content:space-between;align-items:baseline}
.od-acc b{font-size:15px;font-style:italic;color:var(--cnl-card-ink)}
.od-acc span{font-size:11px;color:var(--cnl-card-mute)}
.od-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
.od-tiles div{padding:7px 7px;border-radius:8px;box-shadow:inset 0 0 0 1px var(--cnl-card-line)}
.od-tiles span{display:block;font-size:8.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--cnl-card-mute)}
.od-tiles b{display:block;margin-top:2px;font:italic 700 13.5px ui-monospace,Menlo,monospace;color:var(--cnl-card-ink)}
.od-tiles .is-due{background:#FFF6D6;box-shadow:none}
.od-tiles .is-due b{color:#92400E}
.od-ok{padding:6px 9px;border-radius:8px;background:#D1FAE5;color:#065F46;font-size:11.5px;font-weight:600}
.od-who b{display:block;font-size:14px;color:var(--cnl-card-ink)}
.od-who span{font-size:11px;color:var(--cnl-card-mute)}
.od-st{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
.od-st span{display:flex;align-items:center;justify-content:center;height:28px;border-radius:7px;font-size:11px;font-weight:500;color:var(--cnl-card-ink);box-shadow:inset 0 0 0 1px var(--cnl-card-line)}
.od-st span.is-on{background:#5D43F7;color:#fff;box-shadow:none;font-weight:700}
.od-wa{position:relative;padding:9px 11px 17px;border-radius:12px 12px 12px 3px;background:#DCF8C6;color:#111b21;font-size:12px;line-height:1.5}
.od-wa small{position:absolute;right:10px;bottom:3px;font-size:9.5px;color:#667781}
`;

const IcoSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

/** Equipo del centro: colegiatura, sillones and the invite form. */
function CenterScreen() {
  return (
    <div className="od-f">
      <span className="od-k">Número de colegiatura (COP)</span>
      <div className="od-line"><span className="od-in">34512</span><span className="od-mini is-soft">Guardar</span></div>
      <span className="od-ok-t">Colegiatura guardada.</span>
      <div className="od-box">
        <div className="od-box-top"><span className="od-k">Sillones del centro</span><small>2 de 2 sillones de tu plan</small></div>
        <div className="od-chair"><span>Sillón 1</span><small>Desactivar</small></div>
        <div className="od-chair"><span>Sillón 2</span><small>Desactivar</small></div>
      </div>
      <span className="od-k">Agregar a alguien</span>
      <div className="od-line"><span className="od-in is-ph">recepcion@correo.com</span><span className="od-mini is-soft">Recepción ▾</span></div>
      <span className="od-btn">Agregar</span>
    </div>
  );
}

const PERMS: { t: string; d: string; on?: boolean; tag?: string; fixed?: boolean }[] = [
  { t: "Programar citas", d: "Crear, mover y cancelar citas", on: true },
  { t: "Marcar llegadas y atendidos", d: "Llegó, en sillón, atendida, no vino", on: true },
  { t: "Registrar y editar pacientes", d: "Alta de pacientes y su filiación", on: true },
  { t: "Leer el contenido clínico", d: "Anamnesis, examen y diagnósticos", tag: "historia clínica" },
  { t: "Firmar atenciones", d: "Siempre del odontólogo, con colegiatura", tag: "fijo", fixed: true },
];

/** Permisos por rol: one tab per role, grouped checkboxes. */
function RolesScreen() {
  return (
    <div className="od-f">
      <div className="od-tabs">
        {["Administración", "Recepción", "Odontólogo", "Asistente", "Caja"].map((r) => (
          <span key={r} className={"od-tab" + (r === "Recepción" ? " is-on" : "")}>{r}</span>
        ))}
      </div>
      <p className="od-note">La persona dueña del centro tiene siempre todos los permisos, también los clínicos.</p>
      <div className="od-cks">
        {PERMS.map((p) => (
          <div key={p.t} className={"od-ck" + (p.on ? " is-on" : "") + (p.fixed ? " is-fixed" : "")}>
            <i>{p.on ? "✓" : ""}</i>
            <span>
              {p.t}
              {p.tag ? <em>{p.tag}</em> : null}
              <small>{p.d}</small>
            </span>
          </div>
        ))}
      </div>
      <span className="od-btn">Guardar permisos de Recepción</span>
    </div>
  );
}

/** Agenda del día, vista por sillón. */
function DayScreen() {
  return (
    <div className="od-f">
      <div className="od-bar">
        <span className="od-tab">Hoy</span>
        <span className="od-tab">Ver por profesional</span>
        <span className="od-tab is-on">Nueva cita</span>
      </div>
      <div className="od-day">
        <span />
        <b>Sillón 1</b>
        <b>Sillón 2</b>
        <span className="od-t">09:00</span>
        <div className="od-slot"><b>Luis Mamani</b><span>Limpieza · Dra. Torres</span><em className="od-tag ok">Confirmada</em></div>
        <div className="od-slot"><b>Carla Rojas</b><span>Endodoncia · Dr. Ramos</span><em className="od-tag ok">Confirmada</em></div>
        <span className="od-t">10:00</span>
        <div className="od-slot"><b>Sofía Huamán</b><span>Control · Dra. Torres</span><em className="od-tag wait">Programada</em></div>
        <div className="od-slot is-free" />
        <span className="od-t">11:00</span>
        <div className="od-slot is-free" />
        <div className="od-slot"><b>Jorge Quispe</b><span>Curación · Dr. Ramos</span><em className="od-tag wait">Programada</em></div>
      </div>
      <p className="od-c">Un profesional o un sillón no pueden tener dos citas a la vez.</p>
    </div>
  );
}

function ReadyScreen() {
  return (
    <div className="od-f">
      <ul className="od-list">
        <li><i>✓</i>Agenda por sillón y por profesional</li>
        <li><i>✓</i>Pacientes con historia clínica (HC) numerada</li>
        <li><i>✓</i>Odontograma, atenciones y consentimientos</li>
        <li><i>✓</i>Cuentas de tratamiento y caja con arqueo</li>
      </ul>
      <p className="od-c">Incluido en tu plan, sin activar nada.</p>
      <span className="od-btn">Ir a Mi jornada</span>
    </div>
  );
}

function SearchScreen() {
  return (
    <div className="od-f">
      <span className="od-in"><IcoSearch />rosa q</span>
      <table className="od-tbl">
        <thead><tr><th>HC</th><th>Paciente</th><th /></tr></thead>
        <tbody>
          <tr className="is-on"><td><code>HC-000012</code></td><td>Rosa Quispe</td><td><a>Ver expediente</a></td></tr>
          <tr><td><code>HC-000031</code></td><td>Rosario Quintana</td><td><a>Ver expediente</a></td></tr>
        </tbody>
      </table>
      <p className="od-c">Por nombre, documento, HC o teléfono.</p>
    </div>
  );
}

function BalanceScreen() {
  return (
    <div className="od-f">
      <div className="od-acc"><b>OD-0007</b><span>Endodoncia · Rosa Quispe</span></div>
      <div className="od-tiles">
        <div><span>Total acordado</span><b>S/ 450.00</b></div>
        <div><span>Pagos recibidos</span><b>S/ 270.00</b></div>
        <div className="is-due"><span>Saldo del acuerdo</span><b>S/ 180.00</b></div>
      </div>
      <table className="od-tbl">
        <thead><tr><th>Procedimiento</th><th>Pieza</th><th>Precio</th></tr></thead>
        <tbody>
          <tr><td>Endodoncia</td><td>36</td><td>S/ 450.00</td></tr>
        </tbody>
      </table>
      <span className="od-ok">✓ Presupuesto v1 aceptado</span>
    </div>
  );
}

function RescheduleScreen() {
  return (
    <div className="od-f">
      <div className="od-who"><b>Rosa Quispe</b><span>Vie 10:00 · Sillón 1 · Dr. Ramos</span></div>
      <div className="od-st">
        <span>Confirmada</span><span>En espera</span><span>Cancelada</span>
        <span>No asistió</span><span className="is-on">Reprogramar</span><span>En atención</span>
      </div>
      <div className="od-line"><span className="od-in">Jue 26/11 · 04:00 p. m.</span><span className="od-in">Sillón 2</span></div>
      <span className="od-ok">✓ Sin cruces: el sillón y el profesional están libres</span>
      <span className="od-btn">Guardar</span>
    </div>
  );
}

function WhatsappScreen() {
  return (
    <div className="od-f">
      <p className="od-wa">
        Hola Rosa, te recordamos tu cita en Consultorio Dental Sonrisa el jueves 26 de noviembre a las 04:00 p. m. con Dr. Luis Ramos. Por favor confírmanos tu asistencia respondiendo este mensaje.
        <small>16:02</small>
      </p>
      <span className="od-btn is-wa">Recordar por WhatsApp</span>
      <span className="od-ok-t">✓ Recordado hoy por Recepción</span>
    </div>
  );
}

/** Brand overrides on top of the landing's own tokens. */
const THEME = `
.cnl-root.cnl-odonto{--cnl-ink:${C.navy};--cnl-mute:#43537a;--cnl-faint:#7a86a3;--cnl-line:rgba(2,29,74,.12);--cnl-soft:#eef0f6;--cnl-card-ink:${C.navy};--cnl-card-mute:#52607f;--cnl-card-line:rgba(2,29,74,.1);--cnl-card-soft:#f2f0ff;--cnl-dark:${C.navyDark}}
.cnl-odonto .cnl-pill{background:linear-gradient(180deg,${C.purpleLight},${C.purpleDark});color:#fff;box-shadow:0 1px 0 rgba(255,255,255,.18) inset,0 10px 24px -10px ${C.purple}}
.cnl-odonto .cnl-pill.is-light,.cnl-odonto .cnl-hero-cta .cnl-pill{background:linear-gradient(180deg,${C.yellowLight},${C.yellowDark});color:${C.navy};box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 10px 24px -10px rgba(252,198,39,.8)}
.cnl-odonto .cnl-hero{padding-top:120px;background:linear-gradient(180deg,${C.navyDark} 0%,${C.navy} 36%,${C.purpleDark} 62%,${C.purple} 72%,#fff 90%)}
.cnl-odonto .cnl-hero-mark img{width:76px;height:76px;display:block;filter:drop-shadow(0 10px 24px rgba(0,0,0,.35))}
.cnl-odonto .cnl-title{color:#fff;font-size:clamp(40px,6.4vw,72px)}
.cnl-odonto .cnl-title .cnl-line:nth-child(2) .cnl-line-in{color:${C.yellow}}
.cnl-odonto .cnl-sub{color:rgba(255,255,255,.8);max-width:52ch}
.cnl-odonto .cnl-badge{background:rgba(252,212,72,.14);color:${C.yellowLight};box-shadow:inset 0 0 0 1px rgba(252,212,72,.35)}
.cnl-odonto .cnl-badge-dot{background:${C.yellow}}
.cnl-odonto .cnl-badge-dot::after{border-color:${C.yellow}}
.cnl-odonto .cnl-hero-alt{color:rgba(255,255,255,.82)}
.cnl-odonto .cnl-hero-alt:hover{color:#fff}
.cnl-odonto .cnl-hero-note{color:rgba(255,255,255,.62)}
.cnl-odonto .cnl-kicker{color:${C.purpleDark}}
.cnl-odonto .cnl-cta-in .cnl-kicker{color:${C.yellowLight}}
.cnl-odonto .cnl-h2>span:nth-child(2){color:${C.purple}}
.cnl-odonto .cnl-cta-in .cnl-h2>span:nth-child(2){color:${C.yellow}}
.cnl-odonto .cnl-cta-vista .cnl-vista-shade{background:linear-gradient(180deg,rgba(0,19,62,.94) 0%,rgba(2,29,74,.82) 45%,rgba(64,47,199,.45) 100%)}
.cnl-odonto .cnl-hero-vista .cnl-img{object-position:center 20%}
.cnl-odonto .cnl-hero-vista .cnl-vista-shade{background:linear-gradient(180deg,rgba(0,19,62,0) 55%,rgba(0,19,62,.45))}
.cnl-odonto .cnl-hero-vista .cnl-powered{color:${C.navy}}
@media (max-width:859px){.cnl-odonto .cnl-hero-vista .cnl-chat{justify-content:flex-end}}
@media (max-width:640px){.cnl-odonto .cnl-voice{white-space:normal;height:auto;min-height:38px;padding:8px 14px 8px 12px;max-width:min(300px,100%);line-height:1.45}}
@media (min-width:860px){.cnl-odonto .cnl-hero-vista .cnl-chat{align-items:flex-end;justify-content:flex-end;padding:72px 7% 96px}}
.cnl-odonto .cnl-stat b{color:${C.purple}}
.cnl-odonto .cnl-mod-num{color:${C.purpleDark}}
.cnl-odonto .cnl-mod-tag{background:${C.yellowLight};color:${C.navy}}
.cnl-odonto .cnl-mod{border-top:3px solid ${C.purple}}
.cnl-odonto .cnl-mod:nth-child(2n){border-top-color:${C.yellow}}
.cnl-odonto .cnl-plan-badge{background:linear-gradient(180deg,${C.yellowLight},${C.yellowDark});color:${C.navy}}
.cnl-odonto .cnl-plan.is-featured{background:linear-gradient(170deg,${C.navy},${C.navyDark} 55%,${C.purpleDark});box-shadow:0 40px 80px -40px ${C.purple}}
.cnl-odonto .cnl-plan.is-featured li>i{background:${C.yellow};color:${C.navy}}
.cnl-odonto .cnl-plan.is-featured li.is-soon>i{background:transparent}
.cnl-odonto .cnl-faq-item summary i{background:${C.yellowLight};color:${C.navy}}
.cnl-odonto .cnl-faq-item[open] summary{color:${C.purpleDark}}
`;

export default function OdontoLanding() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: THEME + SCREENS_CSS }} />
      <CairnAgentsLanding
        className="cnl-odonto"
        brand="Odonto Yamassi"
        mark="/yamassi-odonto-sm.svg"
        logo={<img src="/yamassi-odonto-sm.svg" alt="" width={16} height={16} style={{ width: 16, height: 16, display: "block" }} />}
        heroMark={<img src="/yamassi-odonto-sm.svg" alt="Odonto Yamassi" width={76} height={76} />}
        palette={{
          bg: "#FFFFFF",
          accent: C.yellow,
          agent: C.purple,
          ridges: [C.yellowLight, "#fff4c9", C.blue, C.purpleLight, C.purpleDark, C.navy],
        }}
        scheme="light"
        nav={null}
        footer={null}
        announcement={{ label: "Hasta 2 sillones · S/ 79 al mes · 2 meses gratis", href: "#precios" }}
        title={"Control clínico y administrativo\npara tu consultorio dental"}
        subtitle="Odonto Yamassi es el software dental hecho en Perú: odontograma digital, historias clínicas, agenda con recordatorios por WhatsApp y caja con arqueo para tu consultorio de hasta 2 sillones."
        primaryAction={{ label: "Empezar con Yamassi gratis", href: ODONTO_APP }}
        secondaryAction={{ label: "Conocer el odontograma digital", href: "#odontograma" }}
        heroNote="✓ Basado en la NTS de Historia Clínica del MINSA · ✓ Recordatorios por WhatsApp · ✓ Soporte local"
        liveCalls={null}
        images={{
          hero: "/img/odonto-yamassi-hero.webp",
          heroAlt: "Odontóloga atendiendo a un paciente en un consultorio dental que usa el software Odonto Yamassi",
          canvas: "",
          call: "",
          cta: "",
        }}
        scenarios={[
          {
            label: "Agenda de mañana",
            alert: "Mañana hay 14 citas y 3 pacientes todavía no confirman.",
            reply: "Tus recordatorios están listos: un clic y salen desde el WhatsApp de tu consultorio.",
            replyLink: { label: "Ver la agenda", href: "#agenda" },
            voice: "¡Gracias por avisarme! Ahí estaré a las 4.",
          },
          {
            label: "Paciente nuevo",
            alert: "Llega un paciente nuevo y el doctor necesita su historia en minutos.",
            reply: "Anamnesis, odontograma y consentimiento informado listos para imprimir y firmar.",
            replyLink: { label: "Ver historias", href: "#historias" },
            voice: "¿Ya está todo listo? Qué rápido.",
          },
          {
            label: "Cierre de caja",
            alert: "Son las 8 p. m. y hay cobros, adelantos y una devolución por cuadrar.",
            reply: "El arqueo del día ya está hecho, con cada cobro ligado a la cuenta de tratamiento de su paciente.",
            replyLink: { label: "Ver caja", href: "#caja" },
            voice: "¿Cuánto me falta pagar de mi tratamiento?",
          },
        ]}
        logosLabel="Todo tu consultorio en una sola app"
        logos={[
          { name: "Odontograma", style: "serif", color: C.navy },
          { name: "Historias clínicas", style: "round", color: C.purple },
          { name: "Agenda", style: "script", color: C.purpleDark },
          { name: "Caja", style: "heavy", color: C.navy },
          { name: "Presupuestos", style: "mono", color: C.purple },
          { name: "Consentimientos", style: "badge", color: C.yellowDark },
        ]}
        modules={{
          kicker: "Salud Dental 360°",
          title: "Todo lo que tu clínica necesita,\nen un solo sistema.",
          text: "Diseñado por y para odontólogos peruanos: del odontograma a la caja, sin papeles ni hojas de cálculo.",
          items: [
            {
              id: "odontograma",
              tag: "Odontograma digital",
              title: "Odontograma interactivo basado en la NTS del MINSA",
              text: "Marca cada pieza por capas (caries, obturaciones, corona, prótesis, raíz y periodonto) o cara por cara. Rojo para lo que requiere tratamiento, azul para lo tratado y gris para piezas ausentes.",
              points: [
                { title: "Evolución con copias fechadas", text: "Cada control guarda una copia de cómo estaba la boca para compararla con el estado actual. Nada se pierde." },
                { title: "Adultos, niños y dentición mixta", text: "Permanente, primaria, mixta o edéntulo, con numeración FDI, Universal o Palmer. Ilimitado en todos los planes." },
                { title: "Del odontograma al presupuesto", text: "Las piezas a tratar alimentarán la cuenta de tratamiento y el presupuesto del paciente, sin doble digitación.", soon: true },
              ],
            },
            {
              id: "agenda",
              tag: "Agenda & WhatsApp",
              title: "Menos ausentismo con recordatorios por WhatsApp",
              text: "Las citas que se cancelan a última hora son dinero perdido para tu clínica. Desde la agenda envías el recordatorio con un clic, desde el WhatsApp de tu consultorio (web o celular).",
              points: [
                { title: "Agenda por sillón y por profesional", text: "Cambias de vista en un clic. Un profesional o un sillón no pueden tener dos citas a la vez." },
                { title: "Recordatorios de mañana", text: "Un botón por paciente abre WhatsApp con fecha, hora y doctor; la cita queda marcada como recordada." },
                { title: "Crece cuando lo necesites", text: "Empiezas con 2 sillones en Consultorio Solo; si tu clínica crece, pasas a 4 sillones o a varias sedes." },
              ],
            },
            {
              id: "historias",
              tag: "Historias clínicas 100% digitales",
              title: "Expediente clínico seguro y consentimientos",
              text: "Dile adiós a los archivadores de cartón. Toda la información médica y legal de tus pacientes en un solo lugar, con acceso desde cualquier dispositivo.",
              points: [
                { title: "Atenciones firmadas con tu colegiatura", text: "Anamnesis, signos vitales, diagnóstico CIE-10 y recetas. Lo firmado no se edita: se corrige con Enmendar, que deja registro." },
                { title: "Consentimientos informados", text: "11 modelos redactados sobre la Ley N.° 29414: emites, descargas el PDF, el paciente firma en papel y subes la foto o el escaneo." },
                { title: "Tus historias siempre son tuyas", text: "Consulta toda la información de tus pacientes cuando lo necesites, desde cualquier dispositivo." },
                { title: "Radiografías y fotos en la nube", text: "Periapicales, panorámicas y fotos del antes/después directamente en la ficha.", soon: true },
              ],
            },
            {
              id: "caja",
              tag: "Presupuestos, caja y liquidación",
              title: "Presupuestos claros y caja en orden",
              text: "Arma presupuestos por paciente, registra cobros, adelantos y devoluciones, y cierra el día con arqueo. Cada pago queda ligado a la cuenta de tratamiento.",
              points: [
                { title: "Cuentas de tratamiento por paciente", text: "Servicios por pieza, presupuesto con versiones aceptadas, adelantos y cobros: ves el saldo al instante." },
                { title: "Caja con arqueo", text: "Al cerrar comparas el efectivo esperado con el contado. Yape, Plin, tarjeta y transferencias se reportan aparte." },
                { title: "Cuotas y liquidación de comisiones", text: "Planes de pago, comisiones de especialistas y pagos a laboratorios dentales.", soon: true },
                { title: "Boletas y facturas electrónicas SUNAT", text: "Comprobantes electrónicos por servicios odontológicos.", soon: true },
              ],
            },
          ],
        }}
        canvas={{
          kicker: "Así de simple",
          heading: "Hecho para el ritmo\nde tu consultorio",
          title: "Odonto Yamassi",
          text: "Configura tu centro en minutos, define quién hace qué y empieza a atender. Todo desde el navegador.",
          steps: [
            { title: "Registra tu centro", panel: "create", head: "Equipo del centro", screen: <CenterScreen />, text: "Registra tu colegiatura (COP), agrega tus sillones e invita a tu equipo: cada persona entra con su propio correo." },
            { title: "Define roles y permisos", panel: "policies", head: "Permisos por rol", screen: <RolesScreen />, text: "Administración, recepción, odontólogo, asistente y caja: marcas qué puede hacer cada rol. Firmar atenciones es siempre del odontólogo, y cada cambio queda registrado." },
            { title: "Organiza tu día", panel: "simulate", head: "Agenda del día", screen: <DayScreen />, text: "Tu día por sillón y por profesional, sin cruces: el sistema avisa si una cita choca con otra." },
            { title: "Empieza a atender", panel: "deploy", head: "Tu centro está listo", screen: <ReadyScreen />, text: "Todo listo desde el primer día: agenda, pacientes, odontograma, historia clínica, cuentas y caja ya vienen incluidos en tu plan." },
          ],
        }}
        call={null}
        flow={{
          kicker: "Un día en recepción",
          title: "Cada paciente,\ncon su historia a la mano.",
          text: "Una paciente pide mover su cita. Recepción la encuentra, ve su saldo, la reprograma sin cruces y le envía el recordatorio, sin pedirle que repita nada.",
          steps: [
            { title: "Busca al paciente", head: "Pacientes", screen: <SearchScreen />, text: "Por nombre, documento, número de historia clínica (HC) o teléfono." },
            { title: "Revisa su saldo", head: "Cuenta de tratamiento", screen: <BalanceScreen />, text: "Su cuenta de tratamiento muestra lo acordado, lo pagado y el saldo, al instante." },
            { title: "Reprograma la cita", head: "Reprogramar cita", screen: <RescheduleScreen />, text: "Desde el detalle de la cita: nuevo horario y sillón, sin cruces con otras citas." },
            { title: "Envía el recordatorio", head: "Recordatorio por WhatsApp", screen: <WhatsappScreen />, text: "Un clic abre WhatsApp con el mensaje listo; lo envías desde el número de tu consultorio y la cita queda marcada como recordada." },
          ],
        }}
        stats={{
          kicker: "Sin letra chica",
          title: "Tu consultorio de 2 sillones,\ncompleto desde el día uno.",
          items: [
            { value: 2, label: "sillones incluidos en el plan Consultorio Solo" },
            { value: 79, prefix: "S/ ", label: "al mes, con todo lo esencial del consultorio" },
            { value: 60, label: "días de prueba gratis, sin tarjeta" },
            { value: 0, prefix: "S/ ", label: "para empezar: activas tu plan solo si continúas" },
          ],
        }}
        pricing={{
          kicker: "Planes para salud odontológica",
          title: "Invierte en la tranquilidad\nde tu clínica dental.",
          text: "2 meses gratis en cualquier plan, sin contratos forzosos. Si no continúas, tus historias clínicas siguen siendo tuyas.",
          soonLabel: "Próximamente",
          plans: ODONTO_PLANS,
          note: "Al terminar la prueba, tu centro queda en solo lectura: puedes consultar toda tu información hasta activar tu plan. Activas pagando por Yape o transferencia.",
        }}
        faq={{
          kicker: "Preguntas frecuentes",
          title: "Preguntas frecuentes\nsobre Odonto Yamassi",
          text: "Información técnica, clínica y legal sobre el software para tu consultorio.",
          items: ODONTO_FAQ,
        }}
        quotes={null}
        cta={{
          kicker: "Empieza 100% gratis para consultorios dentales",
          title: "Digitaliza tu clínica dental hoy.\nTus pacientes lo notarán.",
          text: "Únete a los odontólogos y clínicas del Perú que profesionalizan su atención, reducen faltas a citas y ordenan sus finanzas con Yamassi.",
          action: "Hablar con un asesor",
          assurances: ["Sin tarjeta de crédito", "Soporte en Perú", "Basado en la NTS del MINSA"],
        }}
        volumes={["1–2 sillones", "3–4 sillones", "2+ sedes"]}
        onTalk={onTalk}
        onSubscribe={onSubscribe}
      />
    </>
  );
}
