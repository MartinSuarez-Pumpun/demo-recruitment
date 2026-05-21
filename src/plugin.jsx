import { useEffect } from 'react'
import './plugin.css'
import App from './App'
import { useStore } from './core/store'

/**
 * ARA — Plugin de reclutamiento para INNOVADEF-2026.
 *
 * El wrapper div (.recruitment-plugin) scopes todos los CSS custom properties
 * (--accent, --border, etc.) para que el plugin funcione embebido sin depender
 * del index.css del host.
 * pluginMode={true} no añade capas de fondo propias.
 *
 * onComplete(result) se llama cuando el usuario pulsa "Volver al sistema":
 *   { type: 'ara-recruitment', sessionId, sessionStart, candidato,
 *     intereses, gti, personalidad, motivacion, recomendacion, report }
 * onComplete(null) si el usuario sale sin completar o desde la pantalla de redirección.
 */
export default function RecruitmentPlugin({ onComplete }) {
  const reset = useStore(s => s.reset)

  useEffect(() => () => reset(), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="recruitment-plugin">
      <App onPluginComplete={onComplete} pluginMode={true} />
    </div>
  )
}
