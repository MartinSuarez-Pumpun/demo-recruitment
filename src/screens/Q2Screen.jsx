import { useState, useEffect } from 'react'
import { useStore } from '../core/store'
import { Q2_ITEMS } from '../core/questions'
import { HudFrame } from '../ui/HudFrame'
import './QScreen.css'

const TIMER_SECS = 45

export default function Q2Screen() {
  const [index,   setIndex]   = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECS)
  const [locked, setLocked] = useState(false)
  const { setQ2Answer, setPhase, setAraText, setAraNextText } = useStore()
  const araSpeaking = useStore(s => s.araSpeaking)
  const item = Q2_ITEMS[index]

  useEffect(() => {
    setAraText(item.text)
    const next = Q2_ITEMS[index + 1]
    setAraNextText(next ? next.text : '')
    setLocked(false)
  }, [index]) // eslint-disable-line react-hooks/exhaustive-deps

  // Cosmetic timer — resets on each new item
  useEffect(() => {
    setTimeLeft(TIMER_SECS)
    const id = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [index])

  function handleAnswer(value) {
    if (locked) return
    setLocked(true)
    setQ2Answer(item.id, value)
    if (index < Q2_ITEMS.length - 1) {
      setIndex(i => i + 1)
    } else {
      setPhase('t23')
    }
  }

  return (
    <div className="q-screen-wrap">
      <HudFrame
        title="Módulo 2 · Aptitudes cognitivas"
        subtitle={item.area}
        phase={index + 1}
        total={Q2_ITEMS.length}
      >
        <div className="q-screen">
          <div className="q-timer-bar">
            <div
              className="q-timer-fill"
              style={{ width: `${(timeLeft / TIMER_SECS) * 100}%` }}
            />
          </div>
          <div className="q-text">{item.text}</div>
          <div className="q-buttons q-buttons-4">
            {['A', 'B', 'C', 'D'].map(letter => (
              <button
                key={letter}
                className="btn btn-ghost q-btn q-opt-btn"
                type="button"
                disabled={araSpeaking || locked}
                onClick={() => handleAnswer(letter)}
              >
                <span className="q-opt-letter">{letter}</span>
                <span className="q-opt-text">{item.options[letter]}</span>
              </button>
            ))}
          </div>
        </div>
      </HudFrame>
    </div>
  )
}
