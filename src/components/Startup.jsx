export default function Startup() {
  return (
    <section className="block" id="startup" aria-labelledby="startup-title">
      <div className="container">
        <div className="section-head">
          <span className="section-num">01</span>
          <div>
            <h2 id="startup-title">Startup Asignada: Matchdeverdad</h2>
            <p>El Desafío del Quórum — deportes, canchitas y organización de partidos barriales</p>
          </div>
        </div>

        <div className="grid-2 startup-grid">
          <div className="card startup-card">
            <img
              className="startup-logo"
              src="/logo-matchdeverdad.webp"
              alt="Logo de Matchdeverdad"
              width="160"
              height="160"
            />
            <p className="pill">SORTEO DOCENTE OFICIAL · S07-A</p>
            <h3>Matchdeverdad</h3>
            <p className="muted">Deportes, canchitas y organización de partidos barriales</p>
            <ul className="startup-facts">
              <li><strong>Misión:</strong> Reunir diez jugadores confirmados</li>
              <li><strong>Bloque:</strong> Candidatos y urgencia</li>
              <li><strong>Sentencias:</strong> Frase 1 (R1) y Frase 2 (R2)</li>
              <li><strong>Destinatarios:</strong> Capitanes y organizadores</li>
            </ul>
          </div>

          <div className="card">
            <h3>El problema</h3>
            <p>
              Organizar un partido de fútbol 5 por WhatsApp es un caos: confirmaciones que llegan tarde,
              jugadores que se bajan a último momento y una seña de cancha que se pierde si el partido
              no se juega. Matchdeverdad ataca ese problema con un agente que asiste al organizador:
              propone candidatos compatibles cuando faltan jugadores (R1) y alerta con urgencia cuando
              quedan menos de tres horas y no hay nadie disponible (R2).
            </p>
            <h3>Articulación Pedagógica Interinstitucional</h3>
            <p className="muted">
              IFTS 16 (Lógica Computacional) → IFTS 29 (Front End) · Grupo 21. Las dos sentencias del
              bloque se formalizan como proposiciones lógicas, se implementan como reglas testeadas
              (<code>matchRules.js</code>) y se visualizan en esta landing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
