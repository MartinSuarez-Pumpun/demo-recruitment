import { useState, useEffect } from 'react'
import { useStore } from '../core/store'
import { Q3_ITEMS } from '../core/questions'
import { HudFrame } from '../ui/HudFrame'
import './QScreen.css'

export default function Q3Screen() {
  const [index, setIndex] = useState(0)
  const [locked, setLocked] = useState(false)
  const { setQ3Answer, setPhase, setAraText, setAraNextText } = useStore()
  const araSpeaking = useStore(s => s.araSpeaking)
  const item = Q3_ITEMS[index]

  useEffect(() => {
    setAraText(`${item.text} Opción A: ${item.options.A}. Opción B: ${item.options.B}.`)
    const next = Q3_ITEMS[index + 1]
    setAraNextText(next ? `${next.text} Opción A: ${next.options.A}. Opción B: ${next.options.B}.` : '')
    setLocked(false)
  }, [index]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleAnswer(value) {
    if (locked) return
    setLocked(true)
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
              disabled={araSpeaking || locked}
              onClick={() => handleAnswer('A')}
            >
              <span className="q-opt-letter">A</span>
              <span className="q-opt-text">{item.options.A}</span>
            </button>
            <button
              className="btn btn-ghost q-btn q-forced-btn"
              type="button"
              disabled={araSpeaking || locked}
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
