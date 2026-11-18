import CairnAgentsLanding, { type CnlPlan, type CnlTalkRequest } from "@/components/ui/cairn-agents-landing";

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
    price: 89,
    period: "/ mes",
    featured: true,
    action: { label: "Empezar gratis", href: "/login" },
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
    price: 169,
    period: "/ mes",
    action: { label: "Empezar gratis", href: "/login" },
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
    q: "¿El odontograma cumple con las exigencias del Ministerio de Salud (MINSA) y SUSALUD?",
    a: "Sí. El odontograma digital de Yamassi está diseñado siguiendo los lineamientos de la Norma Técnica de Salud para la Gestión de la Historia Clínica del MINSA y el estándar de la Federación Dental Internacional (FDI), con código de colores oficial (rojo para patología activa y azul para tratamiento ejecutado).",
  },
  {
    q: "¿Cómo se envían los recordatorios de citas por WhatsApp?",
    a: "Desde la agenda, con un clic se abre WhatsApp (web o celular) con el mensaje de la cita listo: fecha, hora y doctor. El mensaje sale desde el WhatsApp de tu consultorio, así el paciente reconoce tu número y puede responderte directamente.",
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
    a: "Los consentimientos informados se generan en PDF para imprimir y firmar con el paciente, y la historia clínica queda registrada en tu cuenta, lista para consultar y descargar cuando la necesites.",
  },
  {
    q: "¿Qué pasa cuando terminan los 2 meses gratis?",
    a: "Tu centro queda en solo lectura: puedes consultar y descargar toda tu información hasta que actives tu plan. La activación es manual: pagas por Yape o transferencia y activamos tu centro por 1, 3 o 12 meses.",
  },
  {
    q: "¿Puedo pasar mis pacientes de mi software anterior o de un Excel?",
    a: "Escríbenos por WhatsApp y te ayudamos a empezar con tu información. Con 2 meses de prueba tienes tiempo de sobra para cargar tus pacientes sin apuro.",
  },
];

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
      <style>{THEME}</style>
      <CairnAgentsLanding
        className="cnl-odonto"
        brand="Odonto Yamassi"
        logo={<img src="/yamassi-dental.png" alt="" width={16} height={16} style={{ width: 16, height: 16, display: "block" }} />}
        heroMark={<img src="/yamassi-dental.png" alt="Odonto Yamassi" width={76} height={76} />}
        palette={{
          bg: "#FFFFFF",
          accent: C.yellow,
          agent: C.purple,
          ridges: [C.yellowLight, "#fff4c9", C.blue, C.purpleLight, C.purpleDark, C.navy],
        }}
        scheme="light"
        nav={null}
        footer={null}
        announcement={{ label: "Hasta 2 sillones · S/ 89 al mes · 2 meses gratis", href: "#precios" }}
        title={"Control clínico y administrativo\npara tu consultorio dental"}
        subtitle="Odonto Yamassi es el software dental hecho en Perú: odontograma digital, historias clínicas, agenda con recordatorios por WhatsApp y caja con arqueo para tu consultorio de hasta 2 sillones."
        primaryAction={{ label: "Empezar con Yamassi gratis", href: "/login" }}
        secondaryAction={{ label: "Conocer el odontograma digital", href: "#odontograma" }}
        heroNote="✓ Conforme a norma técnica MINSA · ✓ Recordatorios por WhatsApp · ✓ Soporte local"
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
              tag: "Odontograma digital MINSA",
              title: "Odontograma interactivo conforme a la norma técnica",
              text: "Registra hallazgos por cada cara dental en segundos: caries (rojo), tratamientos realizados (azul), endodoncias, implantes, sellantes y extracciones con la simbología oficial del Colegio Odontológico del Perú (COP) y MINSA.",
              points: [
                { title: "Odontograma inicial vs. odontograma de evolución", text: "Visualiza el estado con el que llegó el paciente y compáralo con el resultado final del tratamiento." },
                { title: "Odontograma para adultos y odontopediatría", text: "Cambia en un clic entre dentición permanente (32 piezas) y dentición temporal (20 piezas de leche). Ilimitado en todos los planes." },
                { title: "Del odontograma al presupuesto", text: "Las piezas a tratar alimentan la cuenta de tratamiento y el presupuesto del paciente, sin doble digitación." },
              ],
            },
            {
              id: "agenda",
              tag: "Agenda & WhatsApp",
              title: "Menos ausentismo con recordatorios por WhatsApp",
              text: "Las citas que se cancelan a última hora son dinero perdido para tu clínica. Desde la agenda envías el recordatorio con un clic, desde el WhatsApp de tu consultorio (web o celular).",
              points: [
                { title: "Agenda por sillón y por odontólogo", text: "Tus 2 sillones organizados por doctor (ortodoncista, endodoncista, cirujano) para nunca cruzar horarios." },
                { title: "Recordatorio en 1 clic", text: "El mensaje sale con fecha, hora y doctor de la cita, listo para enviar al paciente." },
                { title: "Crece cuando lo necesites", text: "Empiezas con 2 sillones en Consultorio Solo; si tu clínica crece, pasas a 4 sillones o a varias sedes." },
              ],
            },
            {
              id: "historias",
              tag: "Historias clínicas 100% digitales",
              title: "Expediente clínico seguro y consentimientos",
              text: "Dile adiós a los archivadores de cartón. Toda la información médica y legal de tus pacientes en un solo lugar, con acceso desde cualquier dispositivo.",
              points: [
                { title: "Anamnesis completa", text: "Alergias a penicilina o anestésicos, diabetes, hipertensión y antecedentes médicos relevantes." },
                { title: "Consentimiento informado", text: "Generado en PDF para imprimir y firmar en cirugías, endodoncias e implantes." },
                { title: "Tus historias siempre son tuyas", text: "Consulta y descarga toda la información de tus pacientes cuando lo necesites." },
                { title: "Radiografías y fotos en la nube", text: "Periapicales, panorámicas y fotos del antes/después directamente en la ficha.", soon: true },
              ],
            },
            {
              id: "caja",
              tag: "Presupuestos, caja y liquidación",
              title: "Presupuestos claros y caja en orden",
              text: "Arma presupuestos por paciente, registra cobros, adelantos y devoluciones, y cierra el día con arqueo. Cada pago queda ligado a la cuenta de tratamiento.",
              points: [
                { title: "Cuentas de tratamiento por paciente", text: "El paciente abona por cita conforme avanza el tratamiento y ves su saldo al instante." },
                { title: "Caja con arqueo", text: "Cobros, adelantos y devoluciones con cierre diario. En Clínica Dental Pro, control de saldos." },
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
            { title: "Crea tu centro", panel: "create", text: "Elige tu tipo de centro y agrega tus tratamientos y precios para armar presupuestos desde el primer día." },
            { title: "Define roles y permisos", panel: "policies", text: "Recepción, asistente y caja ven solo lo que les toca. Tú decides quién agenda, quién cobra y quién ve las historias." },
            { title: "Organiza tu agenda", panel: "simulate", text: "Mira cómo se llena una semana de citas por sillón y qué pacientes faltan confirmar." },
            { title: "Empieza a atender", panel: "deploy", text: "Activa los módulos que necesitas y atiende a tu primer paciente hoy mismo." },
          ],
          policies: [
            { id: "agenda", title: "Recepción agenda y reprograma citas", text: "Con recordatorios por WhatsApp en un clic.", on: true },
            { id: "historia", title: "Asistente ve historias y odontograma", text: "Para preparar cada atención.", on: true },
            { id: "caja", title: "Caja registra cobros y adelantos", text: "Con arqueo al cerrar el día.", on: true },
            { id: "devolucion", title: "Devoluciones con aprobación del doctor", text: "Para que nada salga de caja sin aviso.", on: false },
          ],
          personas: ["Primera vez", "Control", "Niño", "Urgencia", "Tratamiento largo"],
          intents: ["Limpieza", "Curación", "Endodoncia", "Ortodoncia", "Extracción", "Blanqueamiento", "Evaluación", "Presupuesto"],
          channels: [
            { id: "agenda", label: "Agenda", detail: "Citas por sillón", icon: "globe", on: true },
            { id: "whatsapp", label: "Recordatorios por WhatsApp", detail: "Desde el WhatsApp de tu consultorio", icon: "whats", on: true },
            { id: "historias", label: "Historias clínicas", detail: "Odontograma adultos y niños", icon: "doc", on: true },
            { id: "caja", label: "Caja", detail: "Cobros, adelantos y arqueo", icon: "shield", on: false },
          ],
          samples: [
            { name: "lista-de-precios.xlsx", size: 42000 },
            { name: "consentimiento-endodoncia.pdf", size: 186000 },
            { name: "logo-consultorio.png", size: 96000 },
          ],
        }}
        call={{
          kicker: "Un día en recepción",
          title: "Cada paciente,\ncon su historia a la mano.",
          text: "Una llamada de consultorio, de principio a fin. Recepción ve el tratamiento, el saldo y la agenda sin pedirle al paciente que repita nada.",
          data: {
            caller: "Rosa Quispe",
            agent: "Recepción",
            topic: "Llamada entrante",
            memory: ["Paciente desde 2024", "Prefiere citas por la tarde"],
            outcome: "Cita reprogramada · recordatorio listo para WhatsApp",
            lines: [
              { who: "caller", mood: -0.5, text: "Hola, tengo cita mañana a las 10 pero no voy a poder llegar. ¿Me la pueden mover?" },
              { who: "agent", mood: -0.25, memory: "Endodoncia · 2.ª sesión", text: "Claro, señora Rosa. Veo que es su segunda sesión de endodoncia. ¿Le acomoda por la tarde, como siempre?" },
              { who: "caller", mood: -0.05, text: "Sí, mejor en la tarde. ¿Y cuánto me falta pagar del tratamiento?" },
              { who: "agent", mood: 0.45, memory: "Saldo del tratamiento · S/ 180", text: "Le quedan 180 soles. Le dejo la cita el jueves a las 4 en el sillón 2 y le envío el recordatorio por WhatsApp." },
              { who: "caller", mood: 0.85, text: "Perfecto, muchas gracias. Así ya no me olvido." },
            ],
          },
        }}
        stats={{
          kicker: "Sin letra chica",
          title: "Tu consultorio de 2 sillones,\ncompleto desde el día uno.",
          items: [
            { value: 2, label: "sillones incluidos en el plan Consultorio Solo" },
            { value: 89, prefix: "S/ ", label: "al mes, con todo lo esencial del consultorio" },
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
          note: "Al terminar la prueba, tu centro queda en solo lectura: puedes consultar y descargar todo hasta activar tu plan. Activas pagando por Yape o transferencia.",
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
          assurances: ["Sin tarjeta de crédito", "Soporte en Perú", "Norma técnica MINSA"],
        }}
        volumes={["1–2 sillones", "3–4 sillones", "2+ sedes"]}
        onTalk={onTalk}
        onSubscribe={onSubscribe}
      />
    </>
  );
}
