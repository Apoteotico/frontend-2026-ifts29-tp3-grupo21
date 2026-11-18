import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Startup from './components/Startup.jsx';
import Rules from './components/Rules.jsx';
import ProposalSection from './components/ProposalSection.jsx';
import Simulator from './components/Simulator.jsx';
import Team from './components/Team.jsx';
import Footer from './components/Footer.jsx';
import { PROPOSALS } from './data/content.js';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Startup />
        <Rules />
        {PROPOSALS.map((proposal) => (
          <ProposalSection key={proposal.id} proposal={proposal} />
        ))}
        <section className="block" id="simulador" aria-labelledby="simulator-title">
          <div className="container">
            <div className="section-head">
              <span className="section-num">05</span>
              <div>
                <h2 id="simulator-title">El Radar de la Canchita</h2>
                <p>Pizarra interactiva: ajustá los datos y mirá qué regla se activa</p>
              </div>
            </div>
            <Simulator />
          </div>
        </section>
        <Team />
      </main>
      <Footer />
    </>
  );
}
