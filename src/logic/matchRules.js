export const REQUIRED_PLAYERS = 10;
export const THREE_HOURS_IN_MINUTES = 180;

const isCompatible = (candidate) =>
  Boolean(candidate?.zoneCompatible) && Boolean(candidate?.scheduleCompatible);

export function evaluateMatch({ confirmedPlayers, minutesUntilMatch, candidates = [] }) {
  if (typeof confirmedPlayers !== 'number' || Number.isNaN(confirmedPlayers)) {
    throw new TypeError('confirmedPlayers debe ser un número');
  }
  if (typeof minutesUntilMatch !== 'number' || Number.isNaN(minutesUntilMatch)) {
    throw new TypeError('minutesUntilMatch debe ser un número');
  }
  if (!Number.isInteger(confirmedPlayers) || confirmedPlayers < 0 || confirmedPlayers > REQUIRED_PLAYERS) {
    throw new RangeError(`confirmedPlayers debe ser un entero entre 0 y ${REQUIRED_PLAYERS}`);
  }
  if (minutesUntilMatch < 0) {
    throw new RangeError('minutesUntilMatch no puede ser negativo');
  }
  if (!Array.isArray(candidates)) {
    throw new TypeError('candidates debe ser un arreglo');
  }

  const missingPlayers = REQUIRED_PLAYERS - confirmedPlayers;
  const playersMissing = missingPlayers > 0;
  const lessThanThreeHours = minutesUntilMatch < THREE_HOURS_IN_MINUTES;
  const compatibleCandidates = candidates.filter(isCompatible);
  const hasCompatibleCandidates = compatibleCandidates.length > 0;

  const r1Fires = playersMissing && hasCompatibleCandidates;
  const r2Fires = playersMissing && lessThanThreeHours && !hasCompatibleCandidates;

  return {
    confirmedPlayers,
    minutesUntilMatch,
    missingPlayers,
    playersMissing,
    lessThanThreeHours,
    compatibleCandidates,
    hasCompatibleCandidates,
    rules: {
      r1: {
        fires: r1Fires,
        action: 'propose_candidates',
        requiresHumanDecision: true,
        cancelsMatch: false,
      },
      r2: {
        fires: r2Fires,
        action: 'alert_organizer',
        requiresHumanDecision: true,
        cancelsMatch: false,
      },
    },
  };
}
