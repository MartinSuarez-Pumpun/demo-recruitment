import { useStore } from './core/store'
import DevJump from './ui/DevJump'
import WelcomeScreen from './screens/WelcomeScreen'
import TransitionScreen from './screens/TransitionScreen'
import Q1Screen from './screens/Q1Screen'
import Q2Screen from './screens/Q2Screen'
import Q3Screen from './screens/Q3Screen'
import Q4Screen from './screens/Q4Screen'
import ProcessingScreen from './screens/ProcessingScreen'
import ReportScreen from './screens/ReportScreen'
import RedirectScreen from './screens/RedirectScreen'
import './App.css'

const T12_PROPS = {
  title: 'MÓDULO 2 · APTITUDES COGNITIVAS',
  description: 'A continuación realizarás 6 ejercicios de razonamiento. Selecciona la respuesta que consideres correcta para cada uno.',
  items: [
    'Cada ejercicio tiene una única respuesta correcta',
    'El tiempo es orientativo — no hay penalización por respuesta tardía',
    'Responde con calma y sin interrupciones',
  ],
}

const T23_PROPS = {
  title: 'MÓDULO 3 · PERFIL DE PERSONALIDAD',
  description: 'Se presentarán 8 pares de afirmaciones. En cada par, elige la que mejor te describe, aunque ninguna sea perfecta.',
  items: [
    'No hay respuestas correctas ni incorrectas',
    'Elige la opción que más se acerque a tu forma habitual de actuar',
    'Responde de forma espontánea sin pensar demasiado',
  ],
}

const T34_PROPS = {
  title: 'MÓDULO 4 · MOTIVACIÓN Y DISPONIBILIDAD',
  description: 'El último módulo evalúa tus preferencias de servicio y disponibilidad. Responde con sinceridad.',
  items: [
    'Las respuestas son estrictamente confidenciales',
    'No condicionan el resultado salvo en casos muy específicos',
    'Responde según tu situación real actual',
  ],
}

export default function App({ onPluginComplete, pluginMode = false }) {
  const phase    = useStore(s => s.phase)
  const setPhase = useStore(s => s.setPhase)

  const screens = {
    welcome:    <WelcomeScreen />,
    q1:         <Q1Screen />,
    t12:        <TransitionScreen {...T12_PROPS} onReady={() => setPhase('q2')} />,
    q2:         <Q2Screen />,
    t23:        <TransitionScreen {...T23_PROPS} onReady={() => setPhase('q3')} />,
    q3:         <Q3Screen />,
    t34:        <TransitionScreen {...T34_PROPS} onReady={() => setPhase('q4')} />,
    q4:         <Q4Screen />,
    processing: <ProcessingScreen />,
    report:     <ReportScreen onPluginComplete={onPluginComplete} />,
    redirect:   <RedirectScreen onPluginComplete={onPluginComplete} />,
  }

  return (
    <div className="app-shell">
      <div className="app-content">
        {screens[phase] ?? <WelcomeScreen />}
      </div>
      {import.meta.env.VITE_DEV_JUMP === 'true' && <DevJump />}
    </div>
  )
}
