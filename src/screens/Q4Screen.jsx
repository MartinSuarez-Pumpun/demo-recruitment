import { useState } from 'react'
import { useStore } from '../core/store'
import { Q4_ITEMS } from '../core/questions'
import { HudFrame } from '../ui/HudFrame'
import './QScreen.css'

export default function Q4Screen() {
  const [index, setIndex] = useState(0)
  const { setQ4Answer, setPhase } = useStore()
  const item = Q4_ITEMS[index]

  function handleAnswer(value) {
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
