import { describe, it, expect } from 'vitest';
import {
  evaluateMatch,
  REQUIRED_PLAYERS,
  THREE_HOURS_IN_MINUTES,
} from '../logic/matchRules.js';

const compatible = (id) => ({ id, name: `Jugador ${id}`, zoneCompatible: true, scheduleCompatible: true });
const zoneOnly = (id) => ({ id, name: `Jugador ${id}`, zoneCompatible: true, scheduleCompatible: false });
const scheduleOnly = (id) => ({ id, name: `Jugador ${id}`, zoneCompatible: false, scheduleCompatible: true });
const incompatible = (id) => ({ id, name: `Jugador ${id}`, zoneCompatible: false, scheduleCompatible: false });

describe('Constantes del dominio', () => {
  it('un partido de fútbol 5 requiere 10 jugadores confirmados', () => {
    expect(REQUIRED_PLAYERS).toBe(10);
  });

  it('tres horas equivalen a 180 minutos', () => {
    expect(THREE_HOURS_IN_MINUTES).toBe(180);
  });
});

describe('Cálculo de jugadores faltantes', () => {
  it('con 10 confirmados no faltan jugadores', () => {
    const r = evaluateMatch({ confirmedPlayers: 10, minutesUntilMatch: 60, candidates: [] });
    expect(r.missingPlayers).toBe(0);
    expect(r.playersMissing).toBe(false);
  });

  it('con 9 confirmados falta exactamente uno', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [] });
    expect(r.missingPlayers).toBe(1);
    expect(r.playersMissing).toBe(true);
  });

  it('con 7 confirmados faltan tres', () => {
    const r = evaluateMatch({ confirmedPlayers: 7, minutesUntilMatch: 60, candidates: [] });
    expect(r.missingPlayers).toBe(3);
  });

  it('con 0 confirmados faltan diez', () => {
    const r = evaluateMatch({ confirmedPlayers: 0, minutesUntilMatch: 60, candidates: [] });
    expect(r.missingPlayers).toBe(10);
  });
});

describe('Compatibilidad de candidatos (zona Y horario)', () => {
  it('un candidato compatible por zona y horario es compatible', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [compatible(1)] });
    expect(r.compatibleCandidates).toHaveLength(1);
    expect(r.hasCompatibleCandidates).toBe(true);
  });

  it('un candidato compatible solo por zona NO es compatible', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [zoneOnly(1)] });
    expect(r.compatibleCandidates).toHaveLength(0);
    expect(r.hasCompatibleCandidates).toBe(false);
  });

  it('un candidato compatible solo por horario NO es compatible', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [scheduleOnly(1)] });
    expect(r.compatibleCandidates).toHaveLength(0);
    expect(r.hasCompatibleCandidates).toBe(false);
  });

  it('un candidato incompatible en ambos ejes NO es compatible', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [incompatible(1)] });
    expect(r.hasCompatibleCandidates).toBe(false);
  });

  it('filtra solo los compatibles de una lista mixta', () => {
    const r = evaluateMatch({
      confirmedPlayers: 9,
      minutesUntilMatch: 60,
      candidates: [compatible(1), zoneOnly(2), compatible(3), incompatible(4)],
    });
    expect(r.compatibleCandidates.map((c) => c.id)).toEqual([1, 3]);
  });
});

describe('Condición temporal de R2 (menos de tres horas, estricto)', () => {
  it('exactamente 180 minutos NO cumple la condición de menos de tres horas', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 180, candidates: [] });
    expect(r.lessThanThreeHours).toBe(false);
  });

  it('179 minutos SÍ cumple la condición de menos de tres horas', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 179, candidates: [] });
    expect(r.lessThanThreeHours).toBe(true);
  });

  it('181 minutos NO cumple la condición', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 181, candidates: [] });
    expect(r.lessThanThreeHours).toBe(false);
  });

  it('0 minutos cumple la condición', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 0, candidates: [] });
    expect(r.lessThanThreeHours).toBe(true);
  });
});

describe('R1 — faltan jugadores Y hay candidatos compatibles', () => {
  it('se activa cuando faltan jugadores y hay candidatos compatibles', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 400, candidates: [compatible(1)] });
    expect(r.rules.r1.fires).toBe(true);
  });

  it('se activa aunque falte mucho tiempo para el partido (R1 no exige urgencia)', () => {
    const r = evaluateMatch({ confirmedPlayers: 8, minutesUntilMatch: 5000, candidates: [compatible(1)] });
    expect(r.rules.r1.fires).toBe(true);
  });

  it('se activa aunque queden menos de tres horas', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [compatible(1)] });
    expect(r.rules.r1.fires).toBe(true);
  });

  it('NO se activa cuando el partido está completo, aunque haya candidatos compatibles', () => {
    const r = evaluateMatch({ confirmedPlayers: 10, minutesUntilMatch: 60, candidates: [compatible(1)] });
    expect(r.rules.r1.fires).toBe(false);
  });

  it('NO se activa cuando no hay candidatos compatibles', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [zoneOnly(1)] });
    expect(r.rules.r1.fires).toBe(false);
  });

  it('la acción de R1 es proponer candidatos al organizador, no confirmarlos', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [compatible(1)] });
    expect(r.rules.r1.action).toBe('propose_candidates');
    expect(r.rules.r1.requiresHumanDecision).toBe(true);
  });
});

describe('R2 — faltan jugadores Y menos de tres horas Y sin candidatos compatibles', () => {
  it('se activa con 9 confirmados, 179 minutos y sin candidatos compatibles', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 179, candidates: [] });
    expect(r.rules.r2.fires).toBe(true);
  });

  it('NO se activa con exactamente 180 minutos (límite exclusivo)', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 180, candidates: [] });
    expect(r.rules.r2.fires).toBe(false);
  });

  it('NO se activa con más de tres horas restantes', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 240, candidates: [] });
    expect(r.rules.r2.fires).toBe(false);
  });

  it('NO se activa cuando hay candidatos compatibles (corresponde R1)', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [compatible(1)] });
    expect(r.rules.r2.fires).toBe(false);
  });

  it('NO se activa cuando el partido está completo', () => {
    const r = evaluateMatch({ confirmedPlayers: 10, minutesUntilMatch: 60, candidates: [] });
    expect(r.rules.r2.fires).toBe(false);
  });

  it('la acción de R2 es alertar al organizador y NUNCA cancelar el partido', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [] });
    expect(r.rules.r2.action).toBe('alert_organizer');
    expect(r.rules.r2.cancelsMatch).toBe(false);
    expect(r.rules.r2.requiresHumanDecision).toBe(true);
  });
});

describe('Combinaciones en las que no se activa ninguna regla', () => {
  it('partido completo, sin candidatos, menos de tres horas: ninguna regla', () => {
    const r = evaluateMatch({ confirmedPlayers: 10, minutesUntilMatch: 30, candidates: [] });
    expect(r.rules.r1.fires).toBe(false);
    expect(r.rules.r2.fires).toBe(false);
  });

  it('faltan jugadores, sin candidatos compatibles, más de tres horas: ninguna regla', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 300, candidates: [] });
    expect(r.rules.r1.fires).toBe(false);
    expect(r.rules.r2.fires).toBe(false);
  });

  it('faltan jugadores, sin candidatos compatibles, exactamente tres horas: ninguna regla', () => {
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 180, candidates: [] });
    expect(r.rules.r1.fires).toBe(false);
    expect(r.rules.r2.fires).toBe(false);
  });

  it('partido completo con candidatos compatibles y menos de tres horas: ninguna regla', () => {
    const r = evaluateMatch({ confirmedPlayers: 10, minutesUntilMatch: 30, candidates: [compatible(1)] });
    expect(r.rules.r1.fires).toBe(false);
    expect(r.rules.r2.fires).toBe(false);
  });
});

describe('Las dos reglas nunca se activan simultáneamente', () => {
  const scenarios = [
    { confirmedPlayers: 10, minutesUntilMatch: 0, candidates: [] },
    { confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [compatible(1)] },
    { confirmedPlayers: 9, minutesUntilMatch: 60, candidates: [] },
    { confirmedPlayers: 9, minutesUntilMatch: 180, candidates: [] },
    { confirmedPlayers: 5, minutesUntilMatch: 179, candidates: [compatible(1), compatible(2)] },
    { confirmedPlayers: 0, minutesUntilMatch: 0, candidates: [] },
  ];

  scenarios.forEach((s, i) => {
    it(`escenario ${i + 1}: R1 y R2 no se activan a la vez`, () => {
      const r = evaluateMatch(s);
      expect(r.rules.r1.fires && r.rules.r2.fires).toBe(false);
    });
  });
});

describe('Validación de entradas', () => {
  it('rechaza una cantidad negativa de jugadores confirmados', () => {
    expect(() => evaluateMatch({ confirmedPlayers: -1, minutesUntilMatch: 60, candidates: [] })).toThrow();
  });

  it('rechaza más jugadores confirmados que los requeridos', () => {
    expect(() => evaluateMatch({ confirmedPlayers: 11, minutesUntilMatch: 60, candidates: [] })).toThrow();
  });

  it('rechaza un tiempo restante negativo', () => {
    expect(() => evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: -5, candidates: [] })).toThrow();
  });

  it('rechaza entradas no numéricas', () => {
    expect(() => evaluateMatch({ confirmedPlayers: '9', minutesUntilMatch: 60, candidates: [] })).toThrow();
  });
});

describe('La implicación no produce la consecuencia contraria', () => {
  it('que no se cumpla el antecedente de R1 no implica que deba alertarse (R2)', () => {
    // Faltan jugadores pero hay candidatos compatibles y quedan más de tres horas:
    // R1 se activa. Si R1 no se activara por falta de candidatos, R2 tampoco se
    // activaría sin la condición temporal. No existe "lo contrario de R1".
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 300, candidates: [] });
    expect(r.rules.r1.fires).toBe(false);
    expect(r.rules.r2.fires).toBe(false);
  });

  it('que no se cumpla el antecedente de R2 no implica que deban proponerse candidatos', () => {
    // Faltan jugadores, hay candidatos compatibles, pero quedan más de tres horas:
    // R1 se activa por su propio antecedente, no como "lo contrario" de R2.
    const r = evaluateMatch({ confirmedPlayers: 9, minutesUntilMatch: 300, candidates: [compatible(1)] });
    expect(r.rules.r2.fires).toBe(false);
    expect(r.rules.r1.fires).toBe(true);
  });
});
