# Análisis Lógico — TP3 Matchdeverdad · Grupo 21

**IFTS 29 · Front End 2026 · 2do Cuatrimestre · Bloque: Candidatos y urgencia (Sorteo S07-A)**

Documento de análisis formal de las dos sentencias del TP3. Complementa la landing
(`src/`) y el motor de reglas (`src/logic/matchRules.js`), cubierto por la suite de
pruebas (`src/tests/matchRules.test.js`, 43 tests).

---

## 1. Enunciado original

- **R1** — «Si faltan jugadores y hay candidatos compatibles con la zona y el horario, el sistema propone esos candidatos al organizador.»
- **R2** — «Si faltan jugadores, quedan menos de tres horas y no hay candidatos compatibles, el sistema alerta al organizador sin cancelar el partido automáticamente.»

## 2. Diccionario de variables

| Símbolo | Significado | Nota |
|---------|-------------|------|
| `p` | Faltan jugadores para el quórum | `confirmados < 10` · `¬p`: equipo completo (10/10) |
| `q` | Hay candidatos compatibles con la zona y el horario | ≤ 5 km, ± 15 min · `¬q`: radar vacío |
| `r` | Quedan menos de tres horas para el partido | `< 180 min` · `¬r`: margen de 3 h o más |
| `s` | El sistema propone candidatos al organizador | Acción de R1 |
| `t` | El sistema alerta al organizador | Acción de R2 |
| `u` | El sistema cancela el partido automáticamente | `¬u` es un invariante: nunca se cancela solo |

## 3. Formalización

$$
R1:\ (p \land q) \rightarrow s
$$

$$
R2:\ (p \land r \land \lnot q) \rightarrow (t \land \lnot u)
$$

### 3.1 Lectura de los antecedentes

- **R1** exige `p` y `q`. No exige urgencia (`r`): puede proponer candidatos con mucho tiempo por delante.
- **R2** exige `p`, `r` y `¬q`. Es el caso de urgencia sin salida: faltan jugadores, el reloj apremia y no hay a quién proponer.

### 3.2 Exclusión mutua

R1 y R2 no pueden dispararse a la vez: R1 requiere `q` y R2 requiere `¬q`. Los
antecedentes son mutuamente excluyentes por literales complementarios sobre `q`.

### 3.3 Invariante de no cancelación

`u` nunca es verdadero como consecuencia de ninguna regla. R2 afirma explícitamente
`¬u`: el sistema **alerta**, pero **no cancela** el partido. La decisión de cancelar
es siempre humana (soberanía del organizador).

### 3.4 Vacuidad

Si `¬p` (equipo completo), ninguna regla se dispara, con independencia de `q` y `r`.
El antecedente de ambas reglas contiene `p`.

## 4. Tabla de verdad (8 combinaciones)

| # | p | q | r | ¬q | Antecedente R1 `(p∧q)` | Antecedente R2 `(p∧r∧¬q)` | Regla activa | Resultado |
|---|---|---|---|----|------------------------|---------------------------|--------------|-----------|
| 1 | V | V | V | F | **V** | F | R1 | Propone candidatos (R1) — caso borde: ventana crítica con candidatos |
| 2 | V | V | F | F | **V** | F | R1 | Propone candidatos (R1) — margen holgado |
| 3 | V | F | V | **V** | F | **V** | R2 | Alerta al organizador (R2) — urgencia crítica, sin cancelar |
| 4 | V | F | F | **V** | F | F | — | Ninguna regla (faltan jugadores, sin candidatos, sin urgencia) |
| 5 | F | V | V | F | F | F | — | Ninguna regla (equipo completo) |
| 6 | F | V | F | F | F | F | — | Ninguna regla (equipo completo) |
| 7 | F | F | V | **V** | F | F | — | Ninguna regla (equipo completo) |
| 8 | F | F | F | **V** | F | F | — | Ninguna regla (equipo completo) |

> `s` y `t` son acciones, no valores de verdad observables: la tabla muestra qué regla
> se activa en cada combinación de entradas `(p, q, r)`.

### 4.1 Matriz de escenarios por flujo

**Flujo R1** — se activa únicamente en las filas 1 y 2 (`p ∧ q`). El valor de `r` es irrelevante para R1:

| p | q | r | ¿R1 activa? |
|---|---|---|-------------|
| V | V | V | ✅ Sí (caso borde, ventana crítica) |
| V | V | F | ✅ Sí (caso estándar) |
| V | F | V | ❌ No (`¬q`) |
| V | F | F | ❌ No (`¬q`) |
| F | * | * | ❌ No (`¬p`) |

**Flujo R2** — se activa únicamente en la fila 3 (`p ∧ r ∧ ¬q`):

| p | q | r | ¿R2 activa? |
|---|---|---|-------------|
| V | F | V | ✅ Sí (única combinación) |
| V | F | F | ❌ No (`¬r`) |
| V | V | V | ❌ No (`q`; prevalece R1) |
| V | V | F | ❌ No (`q`) |
| F | * | * | ❌ No (`¬p`) |

**Cobertura:** las 8 filas están cubiertas; ninguna combinación queda sin estado definido y no hay solapamiento entre R1 y R2.

### 4.2 Verificación de no-activación (la regla no se dispara si sus condiciones no se cumplen)

| Regla | Condición que falta | Resultado esperado | Filas |
|-------|---------------------|--------------------|-------|
| R1 | `¬p` | `s` no se ejecuta | 5, 6, 7, 8 |
| R1 | `¬q` | `s` no se ejecuta | 3, 4 |
| R2 | `¬p` | `t` no se ejecuta | 5, 6, 7, 8 |
| R2 | `¬r` | `t` no se ejecuta | 2, 4, 6, 8 |
| R2 | `q` (hay candidatos) | `t` no se ejecuta | 1, 2, 5, 6 |
| R2 | `¬q` pero `¬r` | `t` no se ejecuta (monitoreo pasivo) | 4 |

Ninguna regla se activa fuera de su antecedente. El caso `p ∧ ¬q ∧ ¬r` (fila 4) es el único escenario con faltantes y sin candidatos donde **no** se emite alerta: es deliberado, porque sin urgencia temporal no corresponde alarmar al capitán.

## 5. Propiedades demostradas

1. **Exclusión mutua** — `¬(R1 ∧ R2)` para toda entrada. Se sigue de `q` vs `¬q`.
2. **No cancelación** — `u` es falso en toda salida del sistema. R2 lo afirma; R1 no lo menciona y no lo produce.
3. **Completitud del quórum** — si `¬p`, ninguna acción se ejecuta (vacuidad).
4. **R1 no exige urgencia** — R1 se activa con `r` verdadero o falso.
5. **R2 exige urgencia estricta** — el límite es exclusivo: exactamente 180 minutos **no** cumple `r`; 179 minutos sí.
6. **Compatibilidad conjuntiva** — un candidato es compatible solo si `zoneCompatible ∧ scheduleCompatible`. Zona sola u horario solo no alcanzan.

## 6. Casos borde

| Caso | Entrada | Resultado esperado |
|------|---------|--------------------|
| Límite de urgencia | `minutesUntilMatch = 180` | `r = false` → R2 no se activa |
| Urgencia estricta | `minutesUntilMatch = 179` | `r = true` → R2 se activa si `p ∧ ¬q` |
| Equipo completo | `confirmedPlayers = 10` | Ninguna regla |
| Faltan jugadores, sin candidatos, sin urgencia | `p ∧ ¬q ∧ ¬r` | Ninguna regla (monitoreo pasivo) |
| Vacante de último momento con candidatos | `p ∧ q ∧ r` | R1 prevalece sobre R2 (R2 exige `¬q`); etiqueta «Incorporación Inmediata» |
| Candidato solo por zona | `zoneCompatible ∧ ¬scheduleCompatible` | No compatible → cuenta como `¬q` |
| Candidato solo por horario | `¬zoneCompatible ∧ scheduleCompatible` | No compatible → cuenta como `¬q` |
| Silencio del organizador a ≤ 45 min | `p ∧ r ∧ ¬q`, `minutesUntilMatch ≤ 45` | R2 + escalamiento humano en dos niveles (subcapitán y recepción del predio), sin cancelar |
| Rechazo de candidatos / radar vacío con margen | `p ∧ ¬q ∧ ¬r` | Ninguna regla; protocolo de intervención humana de R1 (radar a 10 km + QR externo) |
| Entradas inválidas | `confirmedPlayers < 0`, `> 10`, no entero, `NaN`; `minutesUntilMatch < 0`; `candidates` no arreglo | `TypeError` / `RangeError` |

### 6.1 Casos normales (camino feliz)

| Caso | Fila | Descripción |
|------|------|-------------|
| R1 estándar | 2 | Faltan jugadores, hay candidatos, sobra tiempo → propuesta con calma |
| R2 estándar | 3 | Faltan jugadores, urgencia, sin candidatos → alerta prioritaria sin cancelar |
| Quórum completo | 5–8 | Equipo listo → reposo total del agente |

### 6.2 Casos negativos (la regla NO debe activarse)

| Caso negativo | Fila | Resultado esperado |
|---------------|------|--------------------|
| Equipo completo con urgencia y sin candidatos | 7 | Ninguna alerta (`¬p`) |
| Equipo completo con candidatos y urgencia | 5 | Ninguna propuesta (`¬p`) |
| Faltan jugadores, sin candidatos, pero sobra tiempo | 4 | Sin alerta (`¬r`) |
| Faltan jugadores, con candidatos y urgencia | 1 | Sin alerta de escasez; prevalece R1 |
| Exactamente 3 h restantes | 4 / 2 | `r = false` por desigualdad estricta; R2 inactiva |

## 7. Supuestos y decisiones de diseño

- **Quórum fijo en 10** (`REQUIRED_PLAYERS = 10`), fútbol 5 por equipo.
- **Umbral de urgencia fijo en 180 minutos** (`THREE_HOURS_IN_MINUTES = 180`), comparación estricta `<`.
- **Compatibilidad binaria** por candidato: zona y horario son booleanos; no hay grados.
- **El sistema nunca actúa de forma autónoma sobre personas**: R1 propone, R2 alerta; ambas requieren decisión humana (`requiresHumanDecision: true`).
- **`u` no existe como acción implementada**: no hay camino de código que cancele el partido.
- **R1 y R2 no son exhaustivas**: existen combinaciones (`p ∧ ¬q ∧ ¬r`) en las que el sistema no hace nada, deliberadamente.
- **Geocercanía inicial de ≤ 5 km** respecto del predio como criterio de «zona» para `q`.
- **Ventana horaria con margen de llegada de ± 15 minutos** como criterio de «horario» para `q`.
- **Prevalencia de R1 sobre R2** cuando `q = V` en ventana crítica (`p ∧ q ∧ r`): R2 requiere `¬q`, por lo que no hay colisión; se etiqueta «Incorporación Inmediata».
- **El agente sugiere pero no invita a espaldas del organizador**: la acción `s` despliega fichas con invitación en 1 clic; la decisión final es siempre humana.
- **Opciones tácticas de R2** (no prescritas por la sentencia, propuestas por el grupo): (1) confirmar formato reducido 4 vs 4, (2) prorratear el costo de la cancha entre los presentes, (3) solicitar jugador comodín a la recepción del predio.
- **Escalamiento humano en dos niveles** cuando restan ≤ 45 min y el organizador no acusa recibo: notificación espejo al subcapitán (segundo jugador confirmado más antiguo) y aviso de cortesía al WhatsApp de la recepción del predio. Sin cancelar el turno.
- **Protocolo de intervención humana de R1** cuando el radar en 5 km queda vacío con margen holgado: ampliación a 10 km + enlace temporal con código QR para invitación externa.
- **Ordenamiento de candidatos por puntaje** de asistencia / juego limpio dentro de `s`.

### 7.1 Supuestos descartados explícitamente

- **Cancelación automática del partido** ante falta de candidatos a menos de 3 h: descartada por violar la consigna del sorteo S07-A («sin cancelar el partido automáticamente») y el invariante `¬u`.
- **Disparo simultáneo de R1 y R2**: imposible por construcción (`q` vs `¬q`); no requiere arbitraje en tiempo de ejecución.

## 8. Coherencia con la implementación

| Elemento | Ubicación |
|----------|-----------|
| Motor de reglas | `src/logic/matchRules.js` → `evaluateMatch({ confirmedPlayers, minutesUntilMatch, candidates })` |
| Constantes | `REQUIRED_PLAYERS = 10`, `THREE_HOURS_IN_MINUTES = 180` |
| Suite de pruebas | `src/tests/matchRules.test.js` (43 tests, TDD) |
| Contenido académico | `src/data/content.js` → `DICTIONARY`, `RULES`, `R1_SENTENCE`, `R2_SENTENCE` |
| Diagramas de flujo | `src/components/Diagrams.jsx` |
| Simulador interactivo | `src/components/Simulator.jsx` |

### 8.1 Correspondencia proposición ↔ código

| Proposición | Implementación |
|-------------|----------------|
| `p` | `playersMissing = (REQUIRED_PLAYERS - confirmedPlayers) > 0` |
| `q` | `hasCompatibleCandidates = candidates.filter(isCompatible).length > 0` |
| `r` | `lessThanThreeHours = minutesUntilMatch < THREE_HOURS_IN_MINUTES` (estricto) |
| Compatibilidad | `isCompatible = zoneCompatible && scheduleCompatible` (conjuntiva) |
| Antecedente R1 | `r1Fires = playersMissing && hasCompatibleCandidates` |
| Antecedente R2 | `r2Fires = playersMissing && lessThanThreeHours && !hasCompatibleCandidates` |
| `s` | `rules.r1.action = 'propose_candidates'` |
| `t` | `rules.r2.action = 'alert_organizer'` |
| `u` | No existe: `rules.r1.cancelsMatch = false`, `rules.r2.cancelsMatch = false` |

**Observación de auditoría:** la implementación es fiel a la formalización. No se detectan desvíos entre la tabla de verdad documentada y el código. El único matiz es que `s` y `t` se derivan directamente de los antecedentes (no se evalúa la implicación completa), lo cual es correcto para un sistema reactivo: la implicación material solo es falsa cuando el antecedente es verdadero y el consecuente falso, situación que el código no puede producir.

## 9. Limitaciones conocidas

- El modelo no contempla candidatos con compatibilidad parcial ni ranking de afinidad.
- No hay persistencia: el estado vive en memoria del navegador.
- La urgencia se mide en minutos hasta el partido, no en tiempo real de reloj.
- No se modelan notificaciones reales (push, SMS); R2 describe la alerta, no la entrega.

## 10. Conclusiones

1. Las sentencias R1 y R2 están correctamente formalizadas y son **mutuamente excluyentes** por construcción (`q` vs `¬q`).
2. El invariante `¬u` se preserva en **todos** los estados, incluidos los de escalamiento humano.
3. La tabla de verdad de 8 filas está **completamente cubierta** por el motor de reglas, el simulador y los diagramas de flujo.
4. Los casos borde (3 h exactas, `p ∧ q ∧ r`, monitoreo pasivo, silencio del organizador a ≤ 45 min) están identificados, documentados y tienen respuesta definida.
5. Los supuestos del grupo están explícitos y trazables a las rondas de revisión interna.
6. **Ninguna regla se activa cuando sus condiciones no se cumplen** (§4.2).
