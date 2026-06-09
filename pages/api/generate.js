import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt } = req.body || {}
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' })

  // Stub: integrar con OpenAI/Gemini aquí
  // Retorna un ejemplo estático por ahora
  const example = {
    inicio: ['Actividad diagnóstica: breve cuestionario inicial.'],
    desarrollo: ['Actividad paso a paso 1', 'Actividad paso a paso 2'],
    cierre: ['Reflexión y evidencia']
  }

  res.status(200).json({ prompt, result: example })
}
