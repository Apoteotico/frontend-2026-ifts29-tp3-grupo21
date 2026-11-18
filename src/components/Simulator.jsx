import { useMemo, useState } from 'react';
import { evaluateMatch } from '../logic/matchRules.js';
import { CANDIDATES } from '../data/content.js';

export default function Simulator() {
  const [confirmedPlayers, setConfirmedPlayers] = useState(7);
  const [minutesUntilMatch, setMinutesUntilMatch] = useState(120);
  const [selected, setSelected] = useState(() => new Set([1]));

  const toggleCandidate = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const result = useMemo(() => {
    const candidates = CANDIDATES.filter((c) => selected.has(c.id));
    try {
      return evaluateMatch({ confirmedPlayers, minutesUntilMatch, candidates });
    } catch {
      return null;
    }
  }, [confirmedPlayers, minutesUntilMatch, selected]);

  const outcome = !result
    ? 'none'
    : result.rules.r1.fires
      ? 'r1'
      : result.rules.r2.fires
        ? 'r2'
        : 'none';

  return (
    <div className="sim-grid">
      <div className="card">
        <h3>Datos de entrada</h3>

        <label className="field">
          <span>Jugadores confirmados: <strong>{confirmedPlayers}</strong> / 10</span>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={confirmedPlayers}
            onChange={(e) => setConfirmedPlayers(Number(e.target.value))}
            aria-label="Jugadores confirmados"
          />
        </label>

        <label className="field">
          <span>Minutos hasta el partido: <strong>{minutesUntilMatch}</strong> min</span>
          <input
            type="range"
            min="0"
            max="360"
            step="5"
            value={minutesUntilMatch}
            onChange={(e) => setMinutesUntilMatch(Number(e.target.value))}
            aria-label="Minutos hasta el partido"
          />
        </label>

        <fieldset className="field">
          <legend>Candidatos disponibles</legend>
          {CANDIDATES.map((c) => (
            <label key={c.id} className="candidate-row">
              <input
                type="checkbox"
                checked={selected.has(c.id)}
                onChange={() => toggleCandidate(c.id)}
              />
              <span>
                <strong>{c.name}</strong> — zona {c.zoneCompatible ? 'compatible' : 'no compatible'} · horario{' '}
                {c.scheduleCompatible ? 'compatible' : 'no compatible'}
              </span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className="card" aria-live="polite">
        <h3>Resultado de la evaluación</h3>
        {result && (
          <>
            <dl className="kv">
              <div><dt>Jugadores faltantes</dt><dd>{result.missingPlayers}</dd></div>
              <div><dt>¿Faltan jugadores?</dt><dd>{result.playersMissing ? 'Sí' : 'No'}</dd></div>
              <div><dt>¿Menos de 3 horas?</dt><dd>{result.lessThanThreeHours ? 'Sí' : 'No'}</dd></div>
              <div><dt>Candidatos compatibles</dt><dd>{result.compatibleCandidates.length}</dd></div>
            </dl>

            <div className={`result-box ${outcome}`}>
              {outcome === 'r1' && (
                <>
                  <p className="result-title">R1 se activa → el sistema propone candidatos</p>
                  <p>
                    El agente propone {result.compatibleCandidates.map((c) => c.name).join(', ')} al organizador.
                    La decisión final es humana: el organizador elige a quién invitar. El partido no se cancela.
                  </p>
                </>
              )}
              {outcome === 'r2' && (
                <>
                  <p className="result-title">R2 se activa → el sistema alerta al organizador</p>
                  <p>
                    Faltan jugadores, quedan menos de tres horas y no hay candidatos compatibles. El agente
                    alerta al organizador sin cancelar el partido automáticamente. La decisión es humana.
                  </p>
                </>
              )}
              {outcome === 'none' && (
                <>
                  <p className="result-title">Ninguna regla se activa</p>
                  <p>
                    {result.playersMissing
                      ? 'Faltan jugadores, pero no se cumplen las condiciones de R1 ni de R2 (hay tiempo suficiente o no corresponde alerta).'
                      : 'El partido está completo (10 jugadores confirmados). No corresponde ninguna acción.'}
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
