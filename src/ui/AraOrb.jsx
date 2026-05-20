import { useEffect, useRef, useState } from 'react'
import { useStore } from '../core/store'
import { streamTTS, streamTTSToUrl } from '../core/ttsStream'
import PlasmaSphere from './PlasmaSphere'
import './AraOrb.css'

// Shared AudioContext — creado una vez tras el primer gesto del usuario
let sharedCtx = null
function getAudioCtx() {
  if (!sharedCtx || sharedCtx.state === 'closed') sharedCtx = new AudioContext()
  return sharedCtx
}

export default function AraOrb() {
  const araText        = useStore(s => s.araText)
  const araNextText    = useStore(s => s.araNextText)
  const setAraSpeaking = useStore(s => s.setAraSpeaking)

  const [speakIntensity, setSpeakIntensity] = useState(0)
  const [isSpeaking,     setIsSpeaking]     = useState(false)

  const freqDataRef       = useRef(null)
  const cancelledRef      = useRef(false)
  const audioRef          = useRef(null)
  const stopTTSRef        = useRef(null)
  const analyserRafRef    = useRef(null)
  const utterRef          = useRef(null)
  // Pre-fetch cache: { text, url } con el blob de la siguiente pregunta
  const prefetchRef       = useRef(null)
  const prefetchCancelRef = useRef(null)

  function stopAll() {
    cancelledRef.current = true
    cancelAnimationFrame(analyserRafRef.current)
    stopTTSRef.current?.()
    stopTTSRef.current = null
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = '' }
    if (utterRef.current) { window.speechSynthesis?.cancel(); utterRef.current = null }
    freqDataRef.current = null
    setSpeakIntensity(0)
    setIsSpeaking(false)
  }

  function startAnalyserLoop(analyser) {
    analyser.fftSize = 256
    const data = new Uint8Array(analyser.frequencyBinCount)
    function loop() {
      if (cancelledRef.current) return
      analyser.getByteFrequencyData(data)
      freqDataRef.current = data
      const slice = data.slice(0, Math.floor(data.length * 0.4))
      const avg   = slice.reduce((a, b) => a + b, 0) / slice.length
      setSpeakIntensity(Math.min(avg / 60, 1))
      analyserRafRef.current = requestAnimationFrame(loop)
    }
    loop()
  }

  // Reproduce desde una blob URL pre-cacheada — latencia mínima
  function playFromBlobUrl(url) {
    const audio = new Audio()
    audioRef.current = audio

    const ctx      = getAudioCtx()
    const source   = ctx.createMediaElementSource(audio)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 128
    source.connect(analyser)
    analyser.connect(ctx.destination)

    audio.src = url

    audio.addEventListener('canplay', async () => {
      if (cancelledRef.current) return
      try {
        await ctx.resume()
        await audio.play()
        if (!cancelledRef.current) {
          setIsSpeaking(true)
          startAnalyserLoop(analyser)
        }
      } catch { /* browser blocked */ }
    }, { once: true })

    audio.addEventListener('ended', () => {
      if (!cancelledRef.current) {
        cancelAnimationFrame(analyserRafRef.current)
        setSpeakIntensity(0)
        setIsSpeaking(false)
      }
      source.disconnect()
      analyser.disconnect()
      URL.revokeObjectURL(url)
    }, { once: true })

    // audioRef.current === audio: guarda contra el error async que dispara
    // src='' en stopAll() — si ya se creó un nuevo elemento, ignorar
    audio.addEventListener('error', () => {
      if (audioRef.current === audio) {
        source.disconnect()
        analyser.disconnect()
      }
      URL.revokeObjectURL(url)
    }, { once: true })
  }

  // Streaming playback — empieza al llegar el primer chunk de MP3
  function startStreamingTTS(text) {
    const ms  = new MediaSource()
    const url = URL.createObjectURL(ms)
    const audio = new Audio()
    audioRef.current = audio

    // Conectar al Web Audio antes de asignar src
    const ctx      = getAudioCtx()
    const source   = ctx.createMediaElementSource(audio)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 128
    source.connect(analyser)
    analyser.connect(ctx.destination)

    audio.src = url

    const queue = []
    let sb          = null
    let ttsComplete = false

    function appendNext() {
      if (!sb || sb.updating || queue.length === 0) return
      try { sb.appendBuffer(queue.shift()) } catch { /* ignore */ }
    }

    function tryEndStream() {
      if (ttsComplete && queue.length === 0 && sb && !sb.updating && ms.readyState === 'open') {
        try { ms.endOfStream() } catch { /* ignore */ }
      }
    }

    ms.addEventListener('sourceopen', () => {
      sb = ms.addSourceBuffer('audio/mpeg')
      sb.addEventListener('updateend', () => { appendNext(); tryEndStream() })
      appendNext()
    }, { once: true })

    audio.addEventListener('canplay', async () => {
      if (cancelledRef.current) return
      try {
        await ctx.resume()
        await audio.play()
        if (!cancelledRef.current) {
          setIsSpeaking(true)
          startAnalyserLoop(analyser)
        }
      } catch { /* browser blocked — fallback handled outside */ }
    }, { once: true })

    audio.addEventListener('ended', () => {
      if (!cancelledRef.current) {
        cancelAnimationFrame(analyserRafRef.current)
        setSpeakIntensity(0)
        setIsSpeaking(false)
      }
      source.disconnect()
      analyser.disconnect()
      URL.revokeObjectURL(url)
    }, { once: true })

    // FIX: audioRef.current === audio evita el fallback del evento error
    // asíncrono que dispara src='' en stopAll() cuando ya hay un nuevo elemento
    audio.addEventListener('error', () => {
      if (!cancelledRef.current && audioRef.current === audio) fallbackSpeech(text)
      source.disconnect()
      analyser.disconnect()
      URL.revokeObjectURL(url)
    }, { once: true })

    const stopWS = streamTTS(text, {
      onChunk: (buf) => {
        if (cancelledRef.current) return
        queue.push(buf)
        appendNext()
      },
      onDone: () => { ttsComplete = true; tryEndStream() },
      onError: () => { if (!cancelledRef.current) fallbackSpeech(text) },
    })

    stopTTSRef.current = stopWS
  }

  function fallbackSpeech(text) {
    if (cancelledRef.current || !window.speechSynthesis) return
    const utter  = new SpeechSynthesisUtterance(text)
    utter.lang   = 'es-ES'
    utter.rate   = 0.88
    utterRef.current = utter
    utter.onstart = () => { if (!cancelledRef.current) setIsSpeaking(true) }
    utter.onend   = () => {
      if (!cancelledRef.current) { setIsSpeaking(false); setSpeakIntensity(0) }
    }
    window.speechSynthesis.speak(utter)
  }

  // Pre-fetch del audio de la siguiente pregunta mientras el usuario escucha la actual
  useEffect(() => {
    if (!araNextText) return
    prefetchCancelRef.current?.()
    let cancelled = false
    prefetchCancelRef.current = () => { cancelled = true }

    streamTTSToUrl(araNextText).then(url => {
      if (!cancelled && url) prefetchRef.current = { text: araNextText, url }
    })
  }, [araNextText])

  useEffect(() => {
    if (!araText) return
    stopAll()

    // Si el audio ya estaba pre-cacheado, reproducir al instante
    const cached = prefetchRef.current
    if (cached?.text === araText) {
      prefetchRef.current = null
      cancelledRef.current = false
      playFromBlobUrl(cached.url)
      return stopAll
    }

    cancelledRef.current = false
    startStreamingTTS(araText)
    return stopAll
  }, [araText]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setAraSpeaking(isSpeaking) }, [isSpeaking]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => stopAll(), [])

  return (
    <div className="ara-orb-panel">
      <div className="ara-orb-sphere">
        <PlasmaSphere speakIntensity={speakIntensity} freqDataRef={freqDataRef} />
      </div>
      <div className="ara-orb-brand-row">
        <span className="ara-orb-brand">ARA</span>
        {isSpeaking && <span className="ara-orb-dot" />}
      </div>
    </div>
  )
}
