import { useStore } from '../core/store'

const PHASES = [
  'welcome', 'q1', 't12', 'q2', 't23', 'q3', 't34', 'q4',
  'processing', 'report', 'redirect',
]

export default function DevJump() {
  const devJump = useStore(s => s.devJump)
  const phase   = useStore(s => s.phase)

  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16, zIndex: 9999,
      display: 'flex', gap: 8, alignItems: 'center',
      background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(34,197,94,0.3)',
      padding: '8px 12px', fontFamily: 'monospace', fontSize: 13,
    }}>
      <span style={{ color: '#22C55E', opacity: 0.6 }}>DEV</span>
      <select
        value={phase}
        onChange={e => devJump(e.target.value)}
        style={{
          background: '#0a0a0a', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)',
          fontFamily: 'monospace', fontSize: 13, padding: '2px 6px', cursor: 'pointer',
        }}
      >
        {PHASES.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  )
}
