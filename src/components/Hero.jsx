import { HERO_CHIPS } from '../data/content.js';

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <div className="hero-chips">
            {HERO_CHIPS.map((chip) => (
              <span key={chip} className="chip">{chip}</span>
            ))}
          </div>
          <h1 id="hero-title">
            Matchdeverdad — <span className="accent">Dos Sentencias. Dos Soluciones.</span>
          </h1>
          <p className="lead">
            Fútbol 5 amateur: a las 18:30 baja la confirmación y a las 20:00 se juega el partido.
            Si faltan jugadores, el agente inteligente propone candidatos compatibles (R1) o alerta
            al organizador cuando quedan menos de tres horas y no hay nadie disponible (R2) —
            sin cancelar el partido automáticamente.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#propuesta-1">Ver Diagrama 1 (R1)</a>
            <a className="btn btn-ghost" href="#propuesta-2">Ver Diagrama 2 (R2)</a>
            <a className="btn btn-ghost" href="#simulador">Pizarra Interactiva</a>
          </div>
        </div>
        <figure className="hero-logo">
          <img src="/logo-matchdeverdad.webp" alt="Escudo de Matchdeverdad, la app de fútbol 5 amateur" />
          <figcaption>Matchdeverdad · Fútbol 5 &amp; Automatización Agéntica</figcaption>
        </figure>
      </div>
    </section>
  );
}
