import Collapsible from './Collapsible.jsx';
import { FlowR1, FlowR2 } from './Diagrams.jsx';

export default function ProposalSection({ proposal }) {
  const { id, num, tagClass, badge, title, sentence, diagram, accordions } = proposal;
  const titleId = `${id}-title`;

  return (
    <section className="block" id={id} aria-labelledby={titleId}>
      <div className="container">
        <div className="section-head">
          <span className="section-num">{num}</span>
          <div>
            <span className={`tag ${tagClass}`}>{badge}</span>
            <h2 id={titleId}>{title}</h2>
          </div>
        </div>

        <p className="sentence">«{sentence}»</p>

        <div
          className="diagram-wrap"
          role="region"
          aria-label={`Diagrama de flujo de ${title}`}
          tabIndex={0}
        >
          {diagram === 'r1' ? <FlowR1 /> : <FlowR2 />}
        </div>
        <div className="legend" aria-hidden="true">
          <span><i className="dot" style={{ background: '#fff8e1', border: '1px solid #92400e' }} /> Decisión</span>
          <span><i className="dot" style={{ background: '#e0f2e9', border: '1px solid #166b3f' }} /> Acción del agente</span>
          <span><i className="dot" style={{ background: '#ece7fb', border: '1px solid #5b3fb8' }} /> Intervención humana</span>
          <span><i className="dot" style={{ background: '#f2f6ff', border: '1px solid #1d4e9e' }} /> Fin</span>
        </div>

        <div className="proposal-accordions">
          {accordions.map(({ title: accordionTitle, body }) => (
            <Collapsible key={accordionTitle} title={accordionTitle}>
              <p>{body}</p>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
