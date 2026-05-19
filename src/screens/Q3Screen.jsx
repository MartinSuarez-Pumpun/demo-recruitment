import { useState } from 'react'
import { useStore } from '../core/store'
import { Q3_ITEMS } from '../core/questions'
import { HudFrame } from '../ui/HudFrame'
import './QScreen.css'

export default function Q3Screen() {
  const [index, setIndex] = useState(0)
  const { setQ3Answer, setPhase } = useStore()
  const item = Q3_ITEMS[index]

  function handleAnswer(value) {
    setQ3Answer(item.id, value)
    if (index < Q3_ITEMS.length - 1) {
      setIndex(i => i + 1)
    } else {
      setPhase('t34')
    }
  }

  return (
    <div className="q-screen-wrap">
      <HudFrame
        title="Módulo 3 · Personalidad"
        phase={index + 1}
        total={Q3_ITEMS.length}
      >
        <div className="q-screen">
          <div className="q-text">{item.text}</div>
          <div className="q-buttons q-buttons-2">
            <button
              className="btn btn-ghost q-btn q-forced-btn"
              type="button"
              onClick={() => handleAnswer('A')}
            >
              <span className="q-opt-letter">A</span>
              <span className="q-opt-text">{item.options.A}</span>
            </button>
            <button
              className="btn btn-ghost q-btn q-forced-btn"
              type="button"
              onClick={() => handleAnswer('B')}
            >
              <span className="q-opt-letter">B</span>
              <span className="q-opt-text">{item.options.B}</span>
            </button>
          </div>
        </div>
      </HudFrame>
    </div>
  )
}
