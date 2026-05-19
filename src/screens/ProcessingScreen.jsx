import { useEffect, useRef, useState } from 'react'
import { useStore } from '../core/store'
import { computeScores } from '../core/scoring'
import { generateReport } from '../core/aiReport'
import { generateSpokenSummary } from '../core/aiSummary'
import { streamTTSToUrl } from '../core/ttsStream'
import './ProcessingScreen.css'

const STEPS = [
  'Calculando perfil de intereses',
  'Calculando índice de entrenabilidad (GTI)',
  'Evaluando perfil de personalidad',
  'Aplicando filtros de disponibilidad',
  'Consultando modelo de análisis',
  'Generando informe de orientación',
]

const STEP_PROGRESS = [8, 22, 38, 52, 68, 85]

export default function ProcessingScreen() {
  const [activeStep, setActiveStep] = useState(0)
  const [progress,   setProgress]   = useState(STEP_PROGRESS[0])
  const [exiting,    setExiting]     = useState(false)
  const { setScores, setReport, setReportError, setReportSummary, setReportAudioUrl, setPhase } = useStore()
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    let step = 0
    const interval = setInterval(() => {
      step += 1
      if (step < 4) {  // steps 0-3 are local (fast)
        setActiveStep(step)
        setProgress(STEP_PROGRESS[step])
      }
    }, 700)

    async function run() {
      // Steps 0-3: local scoring — read store via getState() to avoid effect dependencies
      const { q1, q2, q3, q4 } = useStore.getState()
      const scores = computeScores({ q1, q2, q3, q4 })
      setScores(scores)

      // M4.3='no' special case: redirect without calling AI
      if (scores.ranking.redirected) {
        clearInterval(interval)
        setProgress(100)
        await new Promise(r => setTimeout(r, 600))
        setPhase('redirect')
        return
      }

      // Step 4: AI report
      clearInterval(interval)
      setActiveStep(4)
      setProgress(STEP_PROGRESS[4])

      const report = await generateReport(scores)
      setReport(report)

      // Step 5: spoken summary + TTS
      setActiveStep(5)
      setProgress(STEP_PROGRESS[5])

      const summaryText = await generateSpokenSummary(report, scores.ranking.primary?.name)
      setReportSummary(summaryText)

      const audioUrl = await streamTTSToUrl(summaryText)
      setReportAudioUrl(audioUrl) // null if TTS failed — not fatal

      // Finish
      setProgress(100)
      await new Promise(r => setTimeout(r, 900))
      setExiting(true)
      await new Promise(r => setTimeout(r, 420))
      setPhase('report')
    }

    run().catch(() => {
      clearInterval(interval)
      setReportError(true)
      setPhase('report')
    })

    return () => clearInterval(interval)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`processing-screen${exiting ? ' exiting' : ''}`}>
      <div className="processing-logo">ARA</div>

      <div className="processing-spinner">
        <div className="processing-dot" />
        <div className="processing-dot" />
        <div className="processing-dot" />
      </div>

      <div className="processing-status">
        <span>Analizando perfil del candidato...</span>
        <div className="processing-progress-track">
          <div className="processing-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="processing-steps">
        {STEPS.map((s, i) => (
          <div key={i} className={`processing-step-row${i <= activeStep ? ' active' : ''}`}>
            <div className="processing-step-icon">
              {i < activeStep ? '✓' : i === activeStep ? '▶' : '○'}
            </div>
            <span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
