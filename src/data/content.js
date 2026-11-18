export const R1_SENTENCE =
  'Si faltan jugadores y hay candidatos compatibles con la zona y el horario, el sistema propone esos candidatos al organizador.';

export const R2_SENTENCE =
  'Si faltan jugadores, quedan menos de tres horas y no hay candidatos compatibles, el sistema alerta al organizador sin cancelar el partido automáticamente.';

export const MEMBERS = [
  {
    name: 'Florencia Guzmán',
    role: 'Front End & Diseño UI/UX',
    contribution:
      'Diseño visual de la landing, jerarquía de contenidos, sistema de estilos y adaptación responsive.',
    initials: 'FG',
  },
  {
    name: 'Sonia Raquel Andrada',
    role: 'Lógica de Flujos & Accesibilidad',
    contribution:
      'Análisis lógico de R1 y R2, diseño de los diagramas de flujo y revisión de accesibilidad por teclado.',
    initials: 'SA',
  },
  {
    name: 'Eitel Hugo Belinzoni',
    role: 'Arquitectura & Testing',
    contribution:
      'Arquitectura del proyecto React + Vite, motor de reglas y suite de pruebas automatizadas (TDD).',
    initials: 'EB',
  },
  {
    name: 'Guillermo Alberto Chacon',
    role: 'Coordinación & UX Interactiva',
    contribution:
      'Coordinación del grupo, experiencia interactiva del simulador y coherencia entre propuestas y diagramas.',
    initials: 'GC',
  },
];

export const CANDIDATES = [
  { id: 1, name: 'Candidato A', zoneCompatible: true, scheduleCompatible: true },
  { id: 2, name: 'Candidato B', zoneCompatible: true, scheduleCompatible: false },
  { id: 3, name: 'Candidato C', zoneCompatible: false, scheduleCompatible: true },
  { id: 4, name: 'Candidato D', zoneCompatible: false, scheduleCompatible: false },
];
