// ── Cuestionario 1 — Intereses vocacionales ─────────────────────────────────
// 12 ítems Sí / No sé / No
export const Q1_ITEMS = [
  { id: 'I1_1',  text: '¿Te atrae trabajar al aire libre en terrenos físicamente exigentes, como montaña, selva o desierto, cargado con tu equipo?' },
  { id: 'I1_2',  text: '¿Disfrutas desmontando, reparando o ajustando máquinas, motores o mecanismos?' },
  { id: 'I1_3',  text: '¿Te interesa el mundo de los ordenadores, redes, programación o ciberseguridad?' },
  { id: 'I1_4',  text: '¿Te motivaría cuidar a heridos o enfermos y aplicar procedimientos de primeros auxilios?' },
  { id: 'I1_5',  text: '¿Se te da bien planificar, inventariar y controlar materiales o recursos de forma ordenada?' },
  { id: 'I1_6',  text: '¿Tiendes a tomar la iniciativa y proponer un plan de acción cuando estás con un grupo?' },
  { id: 'I1_7',  text: '¿Estarías dispuesto a trabajar a bordo de un buque o en una base aérea, lejos de casa durante semanas?' },
  { id: 'I1_8',  text: '¿Te atraen la música, la comunicación audiovisual, el diseño o la cartografía detallada?' },
  { id: 'I1_9',  text: '¿Te ves realizando mantenimiento técnico complejo en condiciones de campaña, fuera de un taller?' },
  { id: 'I1_10', text: '¿Te gustaría dirigir un pequeño equipo en una misión técnica o de ingeniería?' },
  { id: 'I1_11', text: '¿Manejas bien los idiomas, el análisis de información o el trabajo con mapas de situación?' },
  { id: 'I1_12', text: '¿Participarías en misiones humanitarias o de cooperación internacional durante meses?' },
]

// ── Cuestionario 2 — Aptitudes cognitivas ───────────────────────────────────
// 6 ítems múltiple opción A/B/C/D
export const Q2_ITEMS = [
  {
    id: 'A2_1',
    area: 'Numérico · Serie',
    text: 'En la serie: 5, 10, 20, 40, 80... ¿Cuál es el siguiente número?',
    options: { A: '100', B: '160', C: '120', D: '200' },
  },
  {
    id: 'A2_2',
    area: 'Numérico · Cálculo',
    text: 'Una sección de 48 raciones de combate se divide entre 4 grupos iguales. ¿Cuántas raciones recibe cada grupo?',
    options: { A: '10', B: '12', C: '16', D: '8' },
  },
  {
    id: 'A2_3',
    area: 'Verbal · Comprensión',
    text: 'La orden dice: "Mantened la posición hasta nuevo aviso." ¿Qué debe hacer el equipo?',
    options: { A: 'Avanzar con cautela', B: 'Replegarse', C: 'Permanecer en su posición', D: 'Dispersarse' },
  },
  {
    id: 'A2_4',
    area: 'Verbal · Analogía',
    text: 'Médico es a hospital como mecánico es a...',
    options: { A: 'Herramienta', B: 'Vehículo', C: 'Taller', D: 'Gasolinera' },
  },
  {
    id: 'A2_5',
    area: 'Lógico · Inferencia',
    text: 'Todos los pilotos militares saben nadar. Marta es piloto militar. Por tanto...',
    options: { A: 'Marta puede nadar', B: 'Marta sabe nadar', C: 'Marta debe nadar', D: 'No se puede saber' },
  },
  {
    id: 'A2_6',
    area: 'Lógico · Espacial',
    text: 'Imagina la letra F mirando hacia ti. La giras 180° sobre su eje vertical. ¿Hacia dónde apunta ahora el brazo horizontal superior?',
    options: { A: 'Arriba', B: 'A la derecha (igual)', C: 'A la izquierda', D: 'Abajo' },
  },
]

// ── Cuestionario 3 — Personalidad (elección forzada) ────────────────────────
// 8 ítems, el candidato elige A o B
// Mapeo de rasgo: ver scoring.js Q3_MAP
export const Q3_ITEMS = [
  {
    id: 'P3_1',
    text: 'Cuando se me asigna una tarea, prefiero...',
    options: {
      A: 'Hacer una lista mental y seguir el procedimiento al pie de la letra',
      B: 'Cuando algo va mal, me crezco y empujo más fuerte',
    },
  },
  {
    id: 'P3_2',
    text: 'Me identifico más con quien...',
    options: {
      A: 'Prefiere terminar lo que hace aunque tarde más, antes que entregarlo a medias',
      B: 'Prefiere que su equipo gane, aunque su parte no se note',
    },
  },
  {
    id: 'P3_3',
    text: 'Ante una orden que no entiendo del todo...',
    options: {
      A: 'La cumplo y pregunto después',
      B: 'Si veo que algo se puede hacer mejor, lo propongo antes de empezar',
    },
  },
  {
    id: 'P3_4',
    text: 'En situaciones exigentes, destaco más por...',
    options: {
      A: 'Aguantar bien físicamente durante días sin rendirme',
      B: 'Ser muy fiable revisando listados, inventarios o documentación',
    },
  },
  {
    id: 'P3_5',
    text: 'Con un compañero más nuevo, prefiero...',
    options: {
      A: 'Enseñarle lo que yo ya sé hacer',
      B: 'Llegar el primero y dejar la zona preparada antes de que llegue el resto',
    },
  },
  {
    id: 'P3_6',
    text: 'En el trabajo en equipo, lo que más valoro en mí mismo es...',
    options: {
      A: 'No discutir las decisiones de mando delante de los demás',
      B: 'Terminar la última hora del turno con la misma intensidad que la primera',
    },
  },
  {
    id: 'P3_7',
    text: 'Cuando reviso el trabajo, suelo...',
    options: {
      A: 'Encontrar el error que a otros se les ha pasado',
      B: 'Ser quien intenta bajar la tensión cuando hay conflicto en el grupo',
    },
  },
  {
    id: 'P3_8',
    text: 'En cuanto a las normas y la autonomía...',
    options: {
      A: 'Las normas existen por algo: prefiero seguirlas aunque no entienda al cien por cien el motivo',
      B: 'Si tengo claro lo que toca hacer, no necesito que nadie me empuje',
    },
  },
]

// ── Cuestionario 4 — Motivación y disponibilidad ────────────────────────────
// 5 ítems con 3 niveles de respuesta
export const Q4_ITEMS = [
  {
    id: 'M4_1',
    text: '¿Estás dispuesto a residir y trabajar en cualquier base de España durante toda tu carrera profesional?',
    options: [
      { value: 'si',      label: 'Sí, sin problema' },
      { value: 'depende', label: 'Depende de la ubicación' },
      { value: 'no',      label: 'Prefiero no' },
    ],
  },
  {
    id: 'M4_2',
    text: '¿Te ves participando en despliegues internacionales de varios meses, lejos de tu familia?',
    options: [
      { value: 'si',      label: 'Sí, me interesa' },
      { value: 'depende', label: 'Tal vez, con condiciones' },
      { value: 'no',      label: 'Prefiero evitarlo' },
    ],
  },
  {
    id: 'M4_3',
    text: '¿Aceptas que la profesión militar conlleva disponibilidad para situaciones físicamente peligrosas si la misión lo requiere?',
    options: [
      { value: 'si',      label: 'Sí, lo asumo' },
      { value: 'depende', label: 'Solo si no hay alternativa' },
      { value: 'no',      label: 'No, prefiero evitarlo' },
    ],
  },
  {
    id: 'M4_4',
    text: '¿Contemplas las Fuerzas Armadas como una carrera a largo plazo, al menos seis u ocho años?',
    options: [
      { value: 'si',      label: 'Sí, carrera completa' },
      { value: 'depende', label: 'Probablemente sí' },
      { value: 'no',      label: 'Solo unos años' },
    ],
  },
  {
    id: 'M4_5',
    text: '¿Te interesa, a medio plazo, optar a la promoción a Suboficiales mediante estudios internos?',
    options: [
      { value: 'si',      label: 'Sí, quiero progresar' },
      { value: 'depende', label: 'Tal vez más adelante' },
      { value: 'no',      label: 'No especialmente' },
    ],
  },
]
