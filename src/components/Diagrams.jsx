const arrowDefs = (id) => (
  <defs>
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#0e2a5c" />
    </marker>
  </defs>
);

const box = { fill: '#ffffff', stroke: '#0e2a5c', strokeWidth: 2 };
const startEnd = { fill: '#0e2a5c', stroke: '#0e2a5c', strokeWidth: 2 };
const decision = { fill: '#fff8e1', stroke: '#92400e', strokeWidth: 2 };
const agent = { fill: '#e0f2e9', stroke: '#166b3f', strokeWidth: 2 };
const human = { fill: '#ece7fb', stroke: '#5b3fb8', strokeWidth: 2 };
const endBox = { fill: '#f2f6ff', stroke: '#1d4e9e', strokeWidth: 2 };

function Label({ x, y, lines, fill = '#10203a', size = 13, weight = 600 }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={fill} fontSize={size} fontWeight={weight}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size + 3}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function FlowR1() {
  return (
    <svg className="diagram" viewBox="0 0 760 700" role="img" aria-labelledby="r1-title r1-desc">
      <title id="r1-title">Diagrama de flujo de R1</title>
      <desc id="r1-desc">
        Inicio, entrada de datos, evaluación de si faltan jugadores, evaluación de candidatos compatibles
        por zona y horario, acción del agente de proponer candidatos, intervención humana del organizador y fin.
      </desc>
      {arrowDefs('arrow-r1')}

      {/* Inicio */}
      <rect x="300" y="14" width="160" height="40" rx="20" {...startEnd} />
      <Label x={380} y={39} lines={['INICIO']} fill="#ffffff" size={15} weight={800} />
      <line x1="380" y1="54" x2="380" y2="78" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r1)" />

      {/* Entrada */}
      <rect x="180" y="80" width="400" height="52" rx="8" {...box} />
      <Label x={380} y={101} lines={['ENTRADA', 'Jugadores confirmados · candidatos (zona, horario)']} size={12} />
      <line x1="380" y1="132" x2="380" y2="156" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r1)" />

      {/* Decisión 1 */}
      <polygon points="380,158 520,225 380,292 240,225" {...decision} />
      <Label x={380} y={218} lines={['¿Faltan jugadores?', 'confirmados < 10']} size={13} weight={700} />

      {/* NO → partido completo */}
      <line x1="520" y1="225" x2="600" y2="225" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r1)" />
      <text x="545" y="216" fontSize="12" fontWeight="800" fill="#b91c1c">NO</text>
      <rect x="600" y="192" width="150" height="66" rx="8" {...endBox} />
      <Label x={675} y={216} lines={['FIN', 'Partido completo:', 'ninguna regla se activa']} size={11} />

      {/* SÍ → decisión 2 */}
      <line x1="380" y1="292" x2="380" y2="330" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r1)" />
      <text x="392" y="315" fontSize="12" fontWeight="800" fill="#166b3f">SÍ</text>

      {/* Decisión 2 */}
      <polygon points="380,332 530,405 380,478 230,405" {...decision} />
      <Label x={380} y={398} lines={['¿Hay candidatos', 'compatibles?', 'zona Y horario']} size={13} weight={700} />

      {/* NO → R1 no se activa */}
      <line x1="530" y1="405" x2="600" y2="405" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r1)" />
      <text x="552" y="396" fontSize="12" fontWeight="800" fill="#b91c1c">NO</text>
      <rect x="600" y="372" width="150" height="66" rx="8" {...endBox} />
      <Label x={675} y={396} lines={['FIN', 'R1 no se activa', '→ evaluar R2']} size={11} />

      {/* SÍ → acción del agente */}
      <line x1="380" y1="478" x2="380" y2="512" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r1)" />
      <text x="392" y="500" fontSize="12" fontWeight="800" fill="#166b3f">SÍ</text>

      {/* Acción del agente */}
      <rect x="170" y="514" width="420" height="56" rx="8" {...agent} />
      <Label x={380} y={536} lines={['ACCIÓN DEL AGENTE', 'Propone los candidatos compatibles al organizador']} size={12} weight={700} />
      <line x1="380" y1="570" x2="380" y2="596" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r1)" />

      {/* Intervención humana */}
      <rect x="170" y="598" width="420" height="52" rx="8" {...human} />
      <Label x={380} y={619} lines={['INTERVENCIÓN HUMANA', 'El organizador decide a quién invitar']} size={12} weight={700} />
      <line x1="380" y1="650" x2="380" y2="672" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r1)" />

      {/* Fin */}
      <rect x="300" y="674" width="160" height="22" rx="11" {...startEnd} />
      <Label x={380} y={689} lines={['FIN']} fill="#ffffff" size={12} weight={800} />
    </svg>
  );
}

export function FlowR2() {
  return (
    <svg className="diagram" viewBox="0 0 760 900" role="img" aria-labelledby="r2-title r2-desc">
      <title id="r2-title">Diagrama de flujo de R2</title>
      <desc id="r2-desc">
        Inicio, entrada de datos, evaluación de si faltan jugadores, evaluación de si quedan menos de tres
        horas, evaluación de ausencia de candidatos compatibles, acción del agente de alertar al organizador
        sin cancelar el partido, intervención humana y fin.
      </desc>
      {arrowDefs('arrow-r2')}

      {/* Inicio */}
      <rect x="300" y="14" width="160" height="40" rx="20" {...startEnd} />
      <Label x={380} y={39} lines={['INICIO']} fill="#ffffff" size={15} weight={800} />
      <line x1="380" y1="54" x2="380" y2="78" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />

      {/* Entrada */}
      <rect x="160" y="80" width="440" height="52" rx="8" {...box} />
      <Label x={380} y={101} lines={['ENTRADA', 'Jugadores confirmados · tiempo restante · candidatos']} size={12} />
      <line x1="380" y1="132" x2="380" y2="156" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />

      {/* Decisión 1 */}
      <polygon points="380,158 520,225 380,292 240,225" {...decision} />
      <Label x={380} y={218} lines={['¿Faltan jugadores?', 'confirmados < 10']} size={13} weight={700} />

      <line x1="520" y1="225" x2="600" y2="225" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />
      <text x="545" y="216" fontSize="12" fontWeight="800" fill="#b91c1c">NO</text>
      <rect x="600" y="192" width="150" height="66" rx="8" {...endBox} />
      <Label x={675} y={216} lines={['FIN', 'Partido completo:', 'ninguna regla se activa']} size={11} />

      <line x1="380" y1="292" x2="380" y2="330" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />
      <text x="392" y="315" fontSize="12" fontWeight="800" fill="#166b3f">SÍ</text>

      {/* Decisión 2: menos de tres horas */}
      <polygon points="380,332 530,405 380,478 230,405" {...decision} />
      <Label x={380} y={398} lines={['¿Quedan menos', 'de tres horas?', 'restante < 180 min']} size={13} weight={700} />

      <line x1="530" y1="405" x2="600" y2="405" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />
      <text x="552" y="396" fontSize="12" fontWeight="800" fill="#b91c1c">NO</text>
      <rect x="600" y="372" width="150" height="66" rx="8" {...endBox} />
      <Label x={675} y={396} lines={['FIN', 'R2 no se activa', '(falta tiempo)']} size={11} />

      <line x1="380" y1="478" x2="380" y2="516" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />
      <text x="392" y="500" fontSize="12" fontWeight="800" fill="#166b3f">SÍ</text>

      {/* Decisión 3: sin candidatos compatibles */}
      <polygon points="380,518 530,585 380,652 230,585" {...decision} />
      <Label x={380} y={578} lines={['¿NO hay candidatos', 'compatibles?', 'zona Y horario']} size={13} weight={700} />

      <line x1="530" y1="585" x2="600" y2="585" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />
      <text x="552" y="576" fontSize="12" fontWeight="800" fill="#b91c1c">NO</text>
      <rect x="600" y="552" width="150" height="66" rx="8" {...endBox} />
      <Label x={675} y={576} lines={['FIN', 'Hay candidatos:', 'corresponde R1']} size={11} />

      <line x1="380" y1="652" x2="380" y2="676" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />
      <text x="392" y="668" fontSize="12" fontWeight="800" fill="#166b3f">SÍ</text>

      {/* Acción del agente */}
      <rect x="150" y="678" width="460" height="52" rx="8" {...agent} />
      <Label x={380} y={699} lines={['ACCIÓN DEL AGENTE', 'Alerta al organizador · NO cancela el partido']} size={12} weight={700} />
      <line x1="380" y1="730" x2="380" y2="752" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />

      {/* Intervención humana */}
      <rect x="150" y="754" width="460" height="52" rx="8" {...human} />
      <Label x={380} y={775} lines={['INTERVENCIÓN HUMANA', 'El organizador decide: esperar, buscar o cancelar']} size={12} weight={700} />
      <line x1="380" y1="806" x2="380" y2="828" stroke="#0e2a5c" strokeWidth="2" markerEnd="url(#arrow-r2)" />

      {/* Fin */}
      <rect x="300" y="830" width="160" height="40" rx="20" {...startEnd} />
      <Label x={380} y={855} lines={['FIN']} fill="#ffffff" size={15} weight={800} />
    </svg>
  );
}
