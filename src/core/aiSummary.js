const SYSTEM = `Eres ARA, el asistente de orientación vocacional de Pumpún Dixital para las Fuerzas Armadas españolas.
Genera un resumen oral conciso (máximo 3 frases, entre 40 y 60 palabras) del informe de orientación de reclutamiento.
El texto será leído en voz alta. Usa segunda persona ("Su evaluación..."), tono formal y directo.
No uses listas, puntos ni formato. Solo texto corrido que suene natural al ser leído en voz alta.
Devuelve ÚNICAMENTE el texto del resumen, sin comillas ni formato adicional.`

export async function generateSpokenSummary(report, specialtyName) {
  const key = import.meta.env.VITE_XAI_API_KEY
  if (!key) return buildFallback(report, specialtyName)

  const prompt = `Especialidad recomendada: ${specialtyName ?? 'no determinada'}.
Síntesis del informe: ${report.headline}.
Recomendación: ${report.recommendation}.
Genera el resumen oral.`

  try {
    const res = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-4-fast-non-reasoning',
        max_tokens: 150,
        temperature: 0.35,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user',   content: prompt },
        ],
      }),
    })
    if (!res.ok) return buildFallback(report, specialtyName)
    const data = await res.json()
    return data.choices[0].message.content.trim()
  } catch {
    return buildFallback(report, specialtyName)
  }
}

function buildFallback(report, specialtyName) {
  const spec = specialtyName ? `La especialidad recomendada es ${specialtyName}. ` : ''
  return `${spec}${report.headline}. ${report.recommendation}`
}
