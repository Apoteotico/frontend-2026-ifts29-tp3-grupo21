# Matchdeverdad · TP3 — Dos sentencias, dos soluciones | Grupo 21 · IFTS 29

**Práctica Formativa TP3 · Desarrollo de Sistemas Web / Front End (2026 · 2do Cuatrimestre)**
**Bloque asignado: Candidatos y urgencia (Sorteo `S07-A`)**

Landing informativa e interactiva que presenta dos propuestas de automatización agéntica
para completar partidos de fútbol 5 amateur cuando faltan jugadores, sin poner en riesgo
la reserva de la cancha.

## El problema

Un organizador arma un partido de fútbol 5 (10 jugadores). A medida que se acerca la hora,
puede quedarse corto de gente. El sistema debe asistirlo sin reemplazar su criterio:
**propone** cuando hay a quién proponer, **alerta** cuando no hay salida y el tiempo
apremia, y **nunca cancela** el partido por su cuenta.

## Las dos sentencias

### R1 — MatchFinder Agent · Búsqueda Inteligente

> Si faltan jugadores y hay candidatos compatibles con la zona y el horario, el sistema propone esos candidatos al organizador.

$$(p \land q) \rightarrow s$$

El agente filtra perfiles por geocercanía (≤ 5 km) y franja horaria (± 15 min), los ordena
por puntualidad y reputación, y los propone al capitán. Nunca invita por su cuenta: la
decisión final es humana.

### R2 — MatchGuard Urgency · Protocolo de Alerta

> Si faltan jugadores, quedan menos de tres horas y no hay candidatos compatibles, el sistema alerta al organizador sin cancelar el partido automáticamente.

$$(p \land r \land \lnot q) \rightarrow (t \land \lnot u)$$

El agente dispara una alerta prioritaria con opciones tácticas de contingencia.
**No cancela el partido**: las señas de cancha no son reembolsables y la soberanía de la
decisión es del capitán.

### Diccionario de variables

| Símbolo | Significado |
|---------|-------------|
| `p` | Faltan jugadores para el quórum (`confirmados < 10`) |
| `q` | Hay candidatos compatibles con la zona y el horario |
| `r` | Quedan menos de tres horas para el partido (`< 180 min`) |
| `s` | El sistema propone candidatos al organizador |
| `t` | El sistema alerta al organizador |
| `u` | El sistema cancela el partido automáticamente (invariante: `¬u`) |

Análisis completo (tabla de verdad de 8 filas, propiedades demostradas, casos borde y
supuestos del grupo): [`docs/ANALISIS-LOGICO.md`](docs/ANALISIS-LOGICO.md).

Cobertura de la tabla de verdad: R1 se activa en las filas 1–2 (`p ∧ q`), R2 únicamente en
la fila 3 (`p ∧ r ∧ ¬q`), y las filas 4–8 no disparan ninguna regla. Los antecedentes son
mutuamente excluyentes (`q` vs `¬q`) y `¬u` se preserva en todos los estados.

## Stack

- **React 19** + **Vite 8**
- **Vitest 5** (TDD, 43 tests)
- **oxlint**
- CSS propio (sistema navy/gold, responsive)

## Cómo correr

Requisitos: [Node.js](https://nodejs.org/) 18 o superior y `npm`.

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm test         # suite de pruebas (vitest run)
npm run build    # build de producción → dist/
```

Comandos adicionales:

```bash
npm run preview  # previsualizar el build de producción
npm run test:watch
npm run lint     # oxlint
```

## Estructura del proyecto

```text
├── docs/
│   └── ANALISIS-LOGICO.md      # Formalización de R1 y R2, tabla de verdad, casos borde
├── public/                     # Assets estáticos (logo, etc.)
├── src/
│   ├── App.jsx                 # Composición de secciones
│   ├── main.jsx                # Entry point
│   ├── index.css               # Sistema de estilos
│   ├── components/             # Header, Hero, Startup, Rules, ProposalSection,
│   │                           # Diagrams, Simulator, Collapsible, Team, Footer
│   ├── data/content.js         # Contenido académico (R1/R2, diccionario, equipo)
│   ├── logic/matchRules.js     # Motor de reglas (evaluateMatch)
│   └── tests/matchRules.test.js# Suite TDD (43 tests)
├── index.html
└── package.json
```

## Motor de reglas

`src/logic/matchRules.js` expone `evaluateMatch({ confirmedPlayers, minutesUntilMatch, candidates })`.

- `REQUIRED_PLAYERS = 10`, `THREE_HOURS_IN_MINUTES = 180`
- Compatibilidad conjuntiva: `zoneCompatible && scheduleCompatible`
- R1 y R2 son mutuamente excluyentes (`q` vs `¬q`)
- `u` (cancelación automática) no existe como acción: invariante `¬u`
- Entradas inválidas → `TypeError` / `RangeError`

## Integrantes — Grupo 21

| Integrante | Rol | Aporte | Ubicación | GitHub |
|------------|-----|--------|-----------|--------|
| Florencia Guzmán | Front End & Diseño UI/UX | Diseño visual de la landing, jerarquía de contenidos, sistema de estilos y adaptación responsive. | Cañuelas | [fguzman3026](https://github.com/fguzman3026) |
| Sonia Raquel Andrada | Lógica de Flujos & Accesibilidad | Análisis lógico de R1 y R2, diseño de los diagramas de flujo y revisión de accesibilidad por teclado. | CABA | [Raqu28](https://github.com/Raqu28) |
| Eitel Hugo Belinzoni | Arquitectura & Testing | Arquitectura del proyecto React + Vite, motor de reglas y suite de pruebas automatizadas (TDD). | Mar del Plata | [Apoteotico](https://github.com/Apoteotico) |
| Guillermo Alberto Chacon | Coordinación & UX Interactiva | Coordinación del grupo, experiencia interactiva del simulador y coherencia entre propuestas y diagramas. | CABA | [GuiLeCha](https://github.com/GuiLeCha) |

## Repositorio

<https://github.com/Apoteotico/frontend-2026-ifts29-tp3-grupo21>
