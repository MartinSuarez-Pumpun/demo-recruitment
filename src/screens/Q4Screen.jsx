import { useState, useEffect } from 'react'
import { useStore } from '../core/store'
import { Q4_ITEMS } from '../core/questions'
import { HudFrame } from '../ui/HudFrame'
import './QScreen.css'

export default function Q4Screen() {
  const [index, setIndex] = useState(0)
  const [locked, setLocked] = useState(false)
  const { setQ4Answer, setPhase, setAraText, setAraNextText } = useStore()
  const araSpeaking = useStore(s => s.araSpeaking)
  const item = Q4_ITEMS[index]

  useEffect(() => {
    setAraText(item.text)
    const next = Q4_ITEMS[index + 1]
    setAraNextText(next ? next.text : '')
    setLocked(false)
  }, [index]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleAnswer(value) {
    if (locked) return
    setLocked(true)
    setQ4Answer(item.id, value)
    if (index < Q4_ITEMS.length - 1) {
      setIndex(i => i + 1)
    } else {
      setPhase('processing')
    }
  }

  return (
    <div className="q-screen-wrap">
      <HudFrame
        title="Módulo 4 · Motivación y disponibilidad"
        phase={index + 1}
        total={Q4_ITEMS.length}
      >
        <div className="q-screen">
          <div className="q-text">{item.text}</div>
          <div className="q-buttons q-buttons-3">
            {item.options.map(opt => (
              <button
                key={opt.value}
                className="btn btn-ghost q-btn"
                type="button"
                disabled={araSpeaking || locked}
                onClick={() => handleAnswer(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </HudFrame>
    </div>
  )
}
