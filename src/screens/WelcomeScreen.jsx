import { useState } from 'react'
import { useStore } from '../core/store'
import './WelcomeScreen.css'

const FORMACION_OPTS = ['ESO', 'Bachillerato', 'FP', 'Universidad', 'Otro']

const MODULES = [
  { num: '01', label: 'Intereses vocacionales',     meta: '~3 min' },
  { num: '02', label: 'Aptitudes cognitivas',        meta: '~2 min' },
  { num: '03', label: 'Personalidad',                meta: '~2 min' },
  { num: '04', label: 'Motivación y disponibilidad', meta: '~1 min' },
]

export default function WelcomeScreen() {
  const { startSession, setCandidato, setPhase } = useStore()
  const [nombre,    setNombre]    = useState('')
  const [edad,      setEdad]      = useState('')
  const [formacion, setFormacion] = useState('')

  const canStart = nombre.trim() && edad.trim() && formacion

  function handleStart() {
    setCandidato({ nombre: nombre.trim(), edad: edad.trim(), formacion })
    startSession()
    setPhase('q1')
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-logo">
        <div className="welcome-brand">ARA</div>
        <div className="welcome-tagline">Asistente de Reclutamiento y Aptitud · Pumpún Dixital</div>
      </div>

      <div className="welcome-divider" />

      <div className="welcome-form">
        <div className="welcome-form-row">
          <input
            className="welcome-input"
            type="text"
            placeholder="Nombre o alias"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            maxLength={40}
          />
          <input
            className="welcome-input welcome-input-short"
            type="text"
            placeholder="Edad"
            value={edad}
            onChange={e => setEdad(e.target.value)}
            maxLength={3}
          />
        </div>
        <div className="welcome-formacion">
          {FORMACION_OPTS.map(opt => (
            <button
              key={opt}
              type="button"
              className={`welcome-formacion-btn ${formacion === opt ? 'selected' : ''}`}
              onClick={() => setFormacion(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="welcome-divider" />

      <div className="welcome-modules">
        <div className="welcome-modules-title">Secuencia de evaluación</div>
        {MODULES.map(m => (
          <div key={m.num} className="welcome-module-row">
            <span className="welcome-module-num">{m.num}</span>
            <span className="welcome-module-label">{m.label}</span>
            <span className="welcome-module-meta">{m.meta}</span>
          </div>
        ))}
      </div>

      <div className="welcome-divider" />

      <button
        className="btn btn-primary welcome-cta"
        type="button"
        disabled={!canStart}
        onClick={handleStart}
      >
        Iniciar evaluación
      </button>

      <p className="welcome-notice">
        Duración total estimada: 8-10 minutos. Esta sesión es orientativa, no vinculante.
      </p>
    </div>
  )
}
