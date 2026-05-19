import { useStore } from '../core/store'
import './RedirectScreen.css'

export default function RedirectScreen({ onPluginComplete }) {
  const { reset } = useStore()

  function handleNewSession() {
    reset()
  }

  function handleReturnToSystem() {
    reset()
    onPluginComplete?.(null)
  }

  return (
    <div className="redirect-screen">
      <div className="redirect-icon">◈</div>

      <div className="redirect-header">
        <div className="redirect-label">ARA · EVALUACIÓN COMPLETADA</div>
        <h1 className="redirect-title">Orientación hacia formación previa</h1>
      </div>

      <div className="redirect-body">
        <p>
          Los filtros de disponibilidad indican que, en este momento, las condiciones de
          despliegue en operaciones no se ajustan a su perfil de disponibilidad actual.
        </p>
        <p>
          Las Fuerzas Armadas ofrecen múltiples itinerarios que no requieren despliegue
          operativo inmediato. Le recomendamos consultar con un orientador del Centro de
          Reclutamiento más cercano para explorar las opciones adaptadas a su situación.
        </p>
        <p>
          Recuerde que esta evaluación es una demostración orientativa. La valoración
          definitiva siempre corresponde a los procesos oficiales del Ministerio de Defensa.
        </p>
      </div>

      <div className="redirect-contact">
        <div className="redirect-contact-label">Centros de Reclutamiento</div>
        <div className="redirect-contact-text">
          Ministerio de Defensa · reclutamiento.defensa.gob.es
        </div>
      </div>

      <div className="redirect-actions">
        <button className="btn btn-ghost" type="button" onClick={handleNewSession}>
          Nueva evaluación
        </button>
        {onPluginComplete && (
          <button className="btn btn-primary" type="button" onClick={handleReturnToSystem}>
            Volver al sistema
          </button>
        )}
      </div>
    </div>
  )
}
