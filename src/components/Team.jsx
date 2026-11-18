import { MEMBERS } from '../data/content.js';

export default function Team() {
  return (
    <section className="block" id="equipo" aria-labelledby="team-title">
      <div className="container">
        <div className="section-head">
          <span className="section-num">06</span>
          <div>
            <h2 id="team-title">Grupo 21 · Desarrollo Front End</h2>
            <p>IFTS 29 · Tecnicatura Superior en Desarrollo de Software — 2026</p>
          </div>
        </div>

        <div className="grid-4">
          {MEMBERS.map((member) => (
            <article key={member.github} className="card member-card">
              <div className="member">
                <span className="avatar" aria-hidden="true">{member.initials}</span>
                <div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                </div>
              </div>
              <p className="muted member-meta">
                {member.location} ·{' '}
                <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer">
                  @{member.github}
                </a>
              </p>
              <p className="member-contribution">{member.contribution}</p>
            </article>
          ))}
        </div>

        <p className="muted team-note">
          Construcción 100% agéntica: análisis, diseño, código y pruebas asistidos por agentes de IA,
          con revisión humana del grupo.
        </p>
      </div>
    </section>
  );
}
