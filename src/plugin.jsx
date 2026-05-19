import './plugin.css'

export default function RecruitmentPlugin({ onComplete }) {
  return (
    <div className="recruitment-plugin">
      {/* TODO: implementar módulo */}
      <button onClick={() => onComplete(null)}>Cancelar</button>
    </div>
  )
}