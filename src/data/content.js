export const R1_SENTENCE =
  'Si faltan jugadores y hay candidatos compatibles con la zona y el horario, el sistema propone esos candidatos al organizador.';

export const R2_SENTENCE =
  'Si faltan jugadores, quedan menos de tres horas y no hay candidatos compatibles, el sistema alerta al organizador sin cancelar el partido automáticamente.';

export const NAV_LINKS = [
  { href: '#hero', label: 'Inicio' },
  { href: '#startup', label: 'Startup' },
  { href: '#sentencias', label: 'Reglas' },
  { href: '#propuesta-1', label: 'Flujo R1' },
  { href: '#propuesta-2', label: 'Flujo R2' },
  { href: '#simulador', label: 'Pizarra' },
  { href: '#equipo', label: 'Equipo' },
];

export const HERO_CHIPS = [
  'IFTS 29 · Front End 2026',
  '2do Cuatrimestre',
  'Bloque: Candidatos y urgencia',
  'Sorteo S07-A',
];

export const MEMBERS = [
  {
    name: 'Florencia Guzmán',
    role: 'Front End & Diseño UI/UX',
    contribution:
      'Diseño visual de la landing, jerarquía de contenidos, sistema de estilos y adaptación responsive.',
    initials: 'FG',
    location: 'Cañuelas',
    github: 'fguzman3026',
  },
  {
    name: 'Sonia Raquel Andrada',
    role: 'Lógica de Flujos & Accesibilidad',
    contribution:
      'Análisis lógico de R1 y R2, diseño de los diagramas de flujo y revisión de accesibilidad por teclado.',
    initials: 'SA',
    location: 'CABA',
    github: 'Raqu28',
  },
  {
    name: 'Eitel Hugo Belinzoni',
    role: 'Arquitectura & Testing',
    contribution:
      'Arquitectura del proyecto React + Vite, motor de reglas y suite de pruebas automatizadas (TDD).',
    initials: 'EB',
    location: 'Mar del Plata',
    github: 'Apoteotico',
  },
  {
    name: 'Guillermo Alberto Chacon',
    role: 'Coordinación & UX Interactiva',
    contribution:
      'Coordinación del grupo, experiencia interactiva del simulador y coherencia entre propuestas y diagramas.',
    initials: 'GC',
    location: 'CABA',
    github: 'GuiLeCha',
  },
];

export const CANDIDATES = [
  { id: 1, name: 'Candidato A', zoneCompatible: true, scheduleCompatible: true },
  { id: 2, name: 'Candidato B', zoneCompatible: true, scheduleCompatible: false },
  { id: 3, name: 'Candidato C', zoneCompatible: false, scheduleCompatible: true },
  { id: 4, name: 'Candidato D', zoneCompatible: false, scheduleCompatible: false },
];

export const DICTIONARY = [
  { symbol: 'p', text: 'Faltan jugadores para el quórum', note: 'confirmados < 10 · ¬p: equipo completo 10/10' },
  { symbol: 'q', text: 'Hay candidatos compatibles con la zona y el horario', note: '≤ 5 km, ± 15 min · ¬q: radar vacío' },
  { symbol: 'r', text: 'Quedan menos de tres horas para el partido', note: '< 180 min · ¬r: margen de 3 h o más' },
  { symbol: 's', text: 'El sistema propone candidatos al organizador', note: '' },
  { symbol: 't', text: 'El sistema alerta al organizador', note: '' },
  { symbol: 'u', text: 'El sistema cancela el partido automáticamente', note: '¬u es un invariante: nunca se cancela solo' },
];

export const RULES = [
  {
    id: 'r1',
    badge: 'FRASE 1 · REGLA R1',
    tagClass: 'tag-r1',
    sentence: R1_SENTENCE,
    breakdown: [
      { label: 'Premisas de Entrada', value: 'Faltan jugadores (< 10) & Existen postulantes en radio compatible' },
      { label: 'Condición Lógica', value: '(p ∧ q) → s' },
      { label: 'Acción del Agente', value: 'Filtrar perfiles por geocercanía y proponer al capitán con 1 clic' },
      { label: 'Consecuencia', value: 'El organizador elige a quién sumar sin salir de la app' },
    ],
    principle:
      'El agente asiste y sugiere; nunca envía invitaciones de manera autónoma a espaldas del organizador.',
  },
  {
    id: 'r2',
    badge: 'FRASE 2 · REGLA R2',
    tagClass: 'tag-r2',
    sentence: R2_SENTENCE,
    breakdown: [
      { label: 'Premisas de Entrada', value: 'Faltan jugadores & Reloj < 3hs & Padrón compatible = 0' },
      { label: 'Condición Compuesta', value: '(p ∧ r ∧ ¬q) → (t ∧ ¬u)' },
      { label: 'Acción del Agente', value: 'Disparo de Alerta Prioritaria con opciones tácticas de contingencia' },
      { label: 'Cláusula Vital', value: 'NO CANCELA EL PARTIDO AUTOMÁTICAMENTE', highlight: true },
    ],
    principle:
      'Cancelar unilateralmente ocasionaría la pérdida irremediable de la seña pagada a la canchita.',
  },
];

export const PROPOSALS = [
  {
    id: 'propuesta-1',
    num: '03',
    tagClass: 'tag-r1',
    badge: 'PROPUESTA 1 · REGLA R1',
    title: 'MatchFinder Agent · Búsqueda Inteligente',
    sentence: R1_SENTENCE,
    diagram: 'r1',
    accordions: [
      {
        title: '1. Ficha Técnica: Datos de Entrada y Criterios de Compatibilidad',
        body: 'Quórum mínimo de 10 jugadores confirmados. Compatibilidad por geocercanía (≤ 5 km del predio) y franja horaria (± 15 min del turno). Perfil deportivo verificado: posición, nivel y juego limpio. El agente ordena los candidatos por puntualidad y reputación antes de proponerlos.',
      },
      {
        title: '2. Caso Límite: el organizador descarta todos los candidatos',
        body: 'Si el organizador rechaza todas las propuestas, el agente amplía la zona de búsqueda a 10 km, habilita un QR público temporal para sumar jugadores y avisa a la recepción del club. Nunca invita por su cuenta: la decisión final siempre es humana.',
      },
    ],
  },
  {
    id: 'propuesta-2',
    num: '04',
    tagClass: 'tag-r2',
    badge: 'PROPUESTA 2 · REGLA R2',
    title: 'MatchGuard Urgency · Protocolo de Alerta',
    sentence: R2_SENTENCE,
    diagram: 'r2',
    accordions: [
      {
        title: '1. Por qué la No-Cancelación Automática es Fundamental',
        body: 'Las señas de cancha (50–100% del turno) no son reembolsables dentro de las 4–6 h previas. Cancelar automáticamente le haría perder el dinero al organizador y dejaría sin partido a los que ya confirmaron. La soberanía de la decisión es del capitán: el sistema alerta, nunca cancela.',
      },
      {
        title: '2. Caso Límite: 45 minutos sin respuesta del organizador',
        body: 'Si la alerta prioritaria no recibe respuesta en 45 minutos, el sistema envía una notificación espejo al subcapitán y avisa a la administración del predio para preservar el turno. El partido sigue en pie: solo se escala la comunicación, jamás se cancela.',
      },
    ],
  },
];

export const REPO_URL = 'https://github.com/Apoteotico/frontend-2026-ifts29-tp3-grupo21';
