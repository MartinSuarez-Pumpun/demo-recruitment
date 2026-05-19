import { useRef, useEffect } from 'react'
import { useStore } from '../core/store'
import './ReportScreen.css'

const FAMILY_LABELS = {
  F1: 'Combate',
  F2: 'Técnica/Mecánica',
  F3: 'Tecnología/Cyber',
  F4: 'Sanidad/Cuidado',
  F5: 'Logística/Admin',
  F6: 'Mando/Liderazgo',
  F7: 'Marítimo/Aéreo',
  F8: 'Creativo/Artístico',
}

const PERSONALITY_LABELS = {
  D: 'Disciplina',
  R: 'Resiliencia',
  T: 'Trabajo en equipo',
  O: 'Orientación técnica',
  A: 'Aspiración',
}

function ProfileBar({ label, value, max = 1, markers = [] }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="profile-bar-row">
      <div className="profile-bar-label">{label}</div>
      <div className="profile-bar-track">
        {markers.map(m => (
          <div
            key={m}
            className="profile-bar-marker"
            style={{ left: `${m}%` }}
          />
        ))}
        <div className="profile-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="profile-bar-value">{pct}%</div>
    </div>
  )
}

export default function ReportScreen({ onPluginComplete }) {
  const {
    report, reportError, reportSummary, reportAudioUrl,
    scores, sessionId, sessionStart, candidato,
    reset, setPhase,
  } = useStore()

  const audioRef = useRef(null)

  useEffect(() => {
    if (reportAudioUrl && audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [reportAudioUrl])

  const now = new Date()
  const ts = now.toISOString().slice(0, 16).replace('T', ' · ')

  function handleNewSession() {
    reset()
  }

  function handleReturnToSystem() {
    const result = {
      type: 'ara-recruitment',
      sessionId,
      sessionStart,
      candidato,
      intereses: scores?.intereses ?? null,
      gti: scores?.gti ?? null,
      personalidad: scores?.personalidad ?? null,
      motivacion: scores?.motivacion ?? null,
      recomendacion: {
        primary: scores?.ranking?.primary ?? null,
        alternative: scores?.ranking?.alternative ?? null,
      },
      report,
    }
    reset()
    onPluginComplete?.(result)
  }

  if (!report && !reportError) {
    return (
      <div className="report-screen report-screen--empty">
        <div className="report-empty-msg">Sin datos de informe</div>
        <button className="btn btn-primary" type="button" onClick={handleNewSession}>Nueva sesión</button>
      </div>
    )
  }

  const data = report ?? {
    headline: 'Error al generar el informe.',
    narrative: 'No se pudo obtener el análisis de IA. Los datos de la sesión han sido capturados correctamente.',
    specialtyMatch: {
      primary:     { name: scores?.ranking?.primary?.name ?? 'N/D',     branch: scores?.ranking?.primary?.branch ?? '',     affinity: scores?.ranking?.primary?.affinity ?? 0 },
      alternative: { name: scores?.ranking?.alternative?.name ?? 'N/D', branch: scores?.ranking?.alternative?.branch ?? '', affinity: scores?.ranking?.alternative?.affinity ?? 0 },
    },
    profileSummary: { interests: '—', cognitive: '—', personality: '—' },
    strengths: [],
    developmentAreas: [],
    recommendation: 'Contactar con el Centro de Reclutamiento para orientación personalizada.',
    suboficialesPath: false,
    disclaimer: 'Esta evaluación es una demostración tecnológica orientativa. No sustituye una valoración psicotécnica profesional completa ni puede usarse como criterio único de selección. Las pruebas oficiales se realizan en los Centros de Reclutamiento del Ministerio de Defensa.',
  }

  const intereses    = scores?.intereses ?? {}
  const personalidad = scores?.personalidad ?? {}
  const gti          = scores?.gti ?? 0

  return (
    <div className="report-screen">

      {/* ── Audio (hidden) ──────────────────────────────────── */}
      {reportAudioUrl && (
        <audio ref={audioRef} src={reportAudioUrl} style={{ display: 'none' }} />
      )}

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="hud-header">
        <span className="brand">ARA · INFORME DE ORIENTACIÓN</span>
        <div className="meta">
          <span><span className="status-dot" />EVALUACIÓN COMPLETADA</span>
          {sessionId && <span>{sessionId}</span>}
          <span>{ts} UTC</span>
        </div>
      </header>

      {/* ── Candidato ──────────────────────────────────────── */}
      {candidato?.nombre && (
        <div className="report-candidato">
          <span className="report-candidato-label">Candidato</span>
          <span className="report-candidato-name">{candidato.nombre}</span>
          {candidato.edad && <span className="report-candidato-age">· {candidato.edad} años</span>}
          {candidato.formacion && <span className="report-candidato-edu">· {candidato.formacion}</span>}
        </div>
      )}

      {/* ── Headline ───────────────────────────────────────── */}
      <div className="headline-card">
        <div className="label">Síntesis IA · Orientación vocacional militar</div>
        <h1>{data.headline}</h1>
        {reportSummary && (
          <p className="report-summary-text">{reportSummary}</p>
        )}
      </div>

      {/* ── Specialty match ────────────────────────────────── */}
      <div className="specialty-grid">
        <div className="specialty-card specialty-card--primary">
          <div className="specialty-badge">ESPECIALIDAD RECOMENDADA</div>
          <div className="specialty-name">{data.specialtyMatch.primary.name}</div>
          <div className="specialty-branch">{data.specialtyMatch.primary.branch}</div>
          <div className="specialty-affinity">
            Afinidad: <strong>{Math.round(data.specialtyMatch.primary.affinity * 100)}%</strong>
          </div>
        </div>
        <div className="specialty-card specialty-card--alt">
          <div className="specialty-badge">ALTERNATIVA</div>
          <div className="specialty-name">{data.specialtyMatch.alternative.name}</div>
          <div className="specialty-branch">{data.specialtyMatch.alternative.branch}</div>
          <div className="specialty-affinity">
            Afinidad: <strong>{Math.round(data.specialtyMatch.alternative.affinity * 100)}%</strong>
          </div>
        </div>
      </div>

      {/* ── Profile bars ───────────────────────────────────── */}
      <div className="profile-section">
        <div className="profile-block">
          <div className="profile-block-title">Perfil de intereses vocacionales</div>
          {Object.entries(FAMILY_LABELS).map(([f, label]) => (
            <ProfileBar key={f} label={label} value={intereses[f] ?? 0} />
          ))}
        </div>

        <div className="profile-block">
          <div className="profile-block-title">Índice de entrenabilidad (GTI)</div>
          <div className="gti-bar-wrap">
            <ProfileBar label="GTI" value={gti} max={100} markers={[40, 70]} />
            <div className="gti-legend">
              <span className="gti-mark gti-mark--lo">▲40 Competente</span>
              <span className="gti-mark gti-mark--hi">▲70 Destacado</span>
            </div>
          </div>

          <div className="profile-block-title" style={{ marginTop: '24px' }}>Perfil de personalidad</div>
          {Object.entries(PERSONALITY_LABELS).map(([trait, label]) => {
            const val = personalidad[trait] ?? 0
            return (
              <ProfileBar key={trait} label={label} value={val} max={3} />
            )
          })}
        </div>
      </div>

      {/* ── Profile summary ────────────────────────────────── */}
      <div className="profile-summary-grid">
        <div className="profile-summary-card">
          <div className="card-title">Intereses</div>
          <p>{data.profileSummary.interests}</p>
        </div>
        <div className="profile-summary-card">
          <div className="card-title">Cognitivo</div>
          <p>{data.profileSummary.cognitive}</p>
        </div>
        <div className="profile-summary-card">
          <div className="card-title">Personalidad</div>
          <p>{data.profileSummary.personality}</p>
        </div>
      </div>

      {/* ── Strengths + Development ────────────────────────── */}
      {(data.strengths.length > 0 || data.developmentAreas.length > 0) && (
        <div className="two-col">
          {data.strengths.length > 0 && (
            <div className="card">
              <div className="card-title">Fortalezas</div>
              {data.strengths.map((s, i) => (
                <div key={i} className="tag-row">
                  <span className="bullet bullet-green">▸</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}
          {data.developmentAreas.length > 0 && (
            <div className="card">
              <div className="card-title">Áreas de desarrollo</div>
              {data.developmentAreas.map((a, i) => (
                <div key={i} className="tag-row">
                  <span className="bullet bullet-red">▸</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Narrative + Recommendation ─────────────────────── */}
      <div className="two-col">
        <div className="card">
          <div className="card-title">Informe narrativo</div>
          <p>{data.narrative}</p>
        </div>
        <div className="card">
          <div className="card-title">Recomendación operativa</div>
          <p>{data.recommendation}</p>
        </div>
      </div>

      {/* ── Suboficiales callout ────────────────────────────── */}
      {data.suboficialesPath && (
        <div className="suboficiales-callout">
          <div className="suboficiales-icon">★</div>
          <div>
            <div className="suboficiales-title">Vía Suboficiales</div>
            <div className="suboficiales-text">
              Su perfil cognitivo y de liderazgo abre el recorrido natural hacia la Escala de Suboficiales.
              Consulte los requisitos de acceso en el Centro de Reclutamiento.
            </div>
          </div>
        </div>
      )}

      {/* ── Disclaimer ─────────────────────────────────────── */}
      <div className="disclaimer">{data.disclaimer}</div>

      {/* ── Actions ────────────────────────────────────────── */}
      <div className="actions">
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
