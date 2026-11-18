import { REPO_URL } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo-matchdeverdad.webp" alt="" width="48" height="48" />
          <div>
            <strong>Matchdeverdad — Fútbol 5 &amp; Automatización Agéntica</strong>
            <p>IFTS 29 · Tecnicatura Superior en Desarrollo de Software | Desarrollo de Sistemas Web Front End (2026)</p>
          </div>
        </div>
        <div className="footer-meta">
          <a className="btn btn-gold footer-repo" href={REPO_URL} target="_blank" rel="noopener noreferrer">
            Ver repositorio en GitHub
          </a>
          <p>TP3 · Grupo 21 — Florencia Guzmán · Sonia Raquel Andrada · Eitel Hugo Belinzoni · Guillermo Alberto Chacon</p>
        </div>
      </div>
    </footer>
  );
}
