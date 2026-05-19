import { useState } from 'react'
import { useStore } from '../core/store'
import { Q1_ITEMS } from '../core/questions'
import { HudFrame } from '../ui/HudFrame'
import './QScreen.css'

export default function Q1Screen() {
  const [index, setIndex] = useState(0)
  const { setQ1Answer, setPhase } = useStore()
  const item = Q1_ITEMS[index]

  function handleAnswer(value) {
    setQ1Answer(item.id, value)
    if (index < Q1_ITEMS.length - 1) {
      setIndex(i => i + 1)
    } else {
      setPhase('t12')
    }
  }

  return (
    <div className="q-screen-wrap">
      <HudFrame
        title="Módulo 1 · Intereses vocacionales"
        phase={index + 1}
        total={Q1_ITEMS.length}
      >
        <div className="q-screen">
          <div className="q-text">{item.text}</div>
          <div className="q-buttons q-buttons-3">
            <button className="btn btn-ghost q-btn" type="button" onClick={() => handleAnswer('si')}>Sí</button>
            <button className="btn btn-ghost q-btn q-btn-ns" type="button" onClick={() => handleAnswer('ns')}>No sé</button>
            <button className="btn btn-ghost q-btn" type="button" onClick={() => handleAnswer('no')}>No</button>
          </div>
        </div>
      </HudFrame>
    </div>
  )
}
