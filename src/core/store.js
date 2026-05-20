import { create } from 'zustand'

const initial = {
  phase: 'welcome', // welcome | q1 | t12 | q2 | t23 | q3 | t34 | q4 | processing | report | redirect
  sessionId: null,
  sessionStart: null,
  candidato: { nombre: '', edad: '', formacion: '' },
  q1: {},  // { I1_1: 'si'|'ns'|'no', ... }
  q2: {},  // { A2_1: 'A'|'B'|'C'|'D', ... }
  q3: {},  // { P3_1: 'A'|'B', ... }
  q4: {},  // { M4_1: 'si'|'depende'|'no', ... }
  scores: null,
  report: null,
  reportError: false,
  reportSummary: null,
  reportAudioUrl: null,
  araText: '',      // texto que AraOrb lee en voz alta (pregunta actual)
  araNextText: '',  // texto a pre-cachear (siguiente pregunta)
  araSpeaking: false, // true mientras AraOrb reproduce audio
}

export const useStore = create((set) => ({
  ...initial,
  startSession: () => set({
    sessionId: 'ARA-' + Math.random().toString(36).slice(2, 6).toUpperCase(),
    sessionStart: Date.now(),
  }),
  setPhase:         (phase)         => set({ phase }),
  setCandidato:     (candidato)     => set({ candidato }),
  setQ1Answer:      (id, value)     => set(s => ({ q1: { ...s.q1, [id]: value } })),
  setQ2Answer:      (id, value)     => set(s => ({ q2: { ...s.q2, [id]: value } })),
  setQ3Answer:      (id, value)     => set(s => ({ q3: { ...s.q3, [id]: value } })),
  setQ4Answer:      (id, value)     => set(s => ({ q4: { ...s.q4, [id]: value } })),
  setScores:        (scores)        => set({ scores }),
  setReport:        (report)        => set({ report }),
  setReportError:   (reportError)   => set({ reportError }),
  setReportSummary: (reportSummary) => set({ reportSummary }),
  setReportAudioUrl:(reportAudioUrl)=> set({ reportAudioUrl }),
  setAraText:       (araText)       => set({ araText }),
  setAraNextText:   (araNextText)   => set({ araNextText }),
  setAraSpeaking:   (araSpeaking)   => set({ araSpeaking }),
  devJump: (phase, data = {})       => set({ ...initial, phase, ...data }),
  reset:   ()                       => set(initial),
}))
