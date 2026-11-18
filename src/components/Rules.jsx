import { DICTIONARY, RULES } from '../data/content.js';

export default function Rules() {
  return (
    <section className="block" id="sentencias" aria-labelledby="rules-title">
      <div className="container">
        <div className="section-head">
          <span className="section-num">02</span>
          <div>
            <h2 id="rules-title">Formulación Proposicional</h2>
            <p>Bloque: Candidatos y Urgencia — las dos sentencias del TP3</p>
          </div>
        </div>

        <div className="grid-2">
          {RULES.map((rule) => (
            <article key={rule.id} className="card rule-card">
              <span className={`tag ${rule.tagClass}`}>{rule.badge}</span>
              <p className="sentence">«{rule.sentence}»</p>
              <dl className="rule-breakdown">
                {rule.breakdown.map(({ label, value, highlight }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd className={highlight ? 'rule-highlight' : undefined}>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="rule-principle"><strong>Principio:</strong> {rule.principle}</p>
            </article>
          ))}
        </div>

        <div className="card dictionary">
          <h3>Diccionario proposicional</h3>
          <div className="table-wrap" role="region" aria-label="Diccionario proposicional" tabIndex={0}>
            <table className="matrix">
              <thead>
                <tr><th scope="col">Símbolo</th><th scope="col">Proposición</th><th scope="col">Detalle</th></tr>
              </thead>
              <tbody>
                {DICTIONARY.map(({ symbol, text, note }) => (
                  <tr key={symbol}>
                    <td><code>{symbol}</code></td>
                    <td>{text}</td>
                    <td className="muted">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="formulas">
            <span className="pill">R1&nbsp;&nbsp;(p ∧ q) → s</span>
            <span className="pill">R2&nbsp;&nbsp;(p ∧ r ∧ ¬q) → (t ∧ ¬u)</span>
          </p>
        </div>
      </div>
    </section>
  );
}
