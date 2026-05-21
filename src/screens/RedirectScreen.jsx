import { useEffect } from 'react'
import { useStore } from '../core/store'
import { HudFrame } from '../ui/HudFrame'
import './RedirectScreen.css'

const ARA_MESSAGE =
  'Evaluación completada. Tus respuestas indican que, en este momento, las ' +
  'condiciones de despliegue operativo no encajan con tu situación actual. ' +
  'No pasa nada: las Fuerzas Armadas tienen itinerarios para muchos perfiles. ' +
  'He generado tu informe completo igualmente. Puedes consultarlo ahora, ' +
  'o visitar el Centro de Reclutamiento más cercano para explorar tus opciones.'

export default function RedirectScreen({ onPluginComplete }) {
  const { reset, setAraText, setPhase } = useStore()

  useEffect(() => {
    setAraText(ARA_MESSAGE)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleNewSession() {
    reset()
  }

  return (
    <div className="redirect-wrap">
      <HudFrame title="ARA · Evaluación completada" subtitle="Perfil de disponibilidad">
        <div className="redirect-content">
          <p className="redirect-message">
            Los filtros de disponibilidad indican que las condiciones de despliegue
            en operaciones no se ajustan a tu perfil actual. Las Fuerzas Armadas
            ofrecen múltiples itinerarios que no requieren despliegue operativo
            inmediato.
          </p>
          <p className="redirect-hint">
            Consulta con un orientador en{' '}
            <span className="redirect-url">reclutamiento.defensa.gob.es</span>
          </p>
          <div className="redirect-actions">
            <button className="btn btn-ghost" type="button" onClick={handleNewSession}>
              Nueva evaluación
            </button>
            <button className="btn btn-primary" type="button" onClick={() => setPhase('report')}>
              Ver informe
            </button>
          </div>
        </div>
      </HudFrame>
    </div>
  )
}
