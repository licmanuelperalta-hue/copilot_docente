import { OpenAI } from 'openai'
import axios from 'axios'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `Eres un experto en educación basado en la Nueva Escuela Mexicana (NEM). 
Tu tarea es generar planeaciones didácticas completas, estructuradas y alineadas con los requerimientos educativos.

Debes generar respuestas en formato JSON con la siguiente estructura:
{
  "titulo": "Título de la planeación",
  "planeacion": {
    "inicio": ["actividad 1", "actividad 2", ...],
    "desarrollo": ["actividad 1", "actividad 2", ...],
    "cierre": ["actividad 1", "actividad 2", ...],
    "evaluacion": ["instrumento 1", "instrumento 2", ...]
  },
  "dosificacion": {
    "semana1": "descripción",
    "semana2": "descripción",
    ...
  },
  "recursos": ["recurso 1", "recurso 2", ...]
}

Sé específico y práctico en tus sugerencias.`

// Función para generar con OpenAI
async function generateWithOpenAI(userPrompt) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 2000,
  })
  return completion.choices[0].message.content
}

// Función para generar con NVIDIA NIM
async function generateWithNVIDIA(userPrompt) {
  const response = await axios.post(
    `${process.env.NVIDIA_API_URL}/chat/completions`,
    {
      model: 'meta/llama-2-70b-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data.choices[0].message.content
}

// Función fallback para cuando ningún modelo está disponible
function getFallbackResponse(materia, grado) {
  return {
    titulo: `Planeación: ${materia} - ${grado}`,
    planeacion: {
      inicio: [
        'Actividad diagnóstica: Cuestionario sobre conocimientos previos',
        'Recuperación de saberes: Lluvia de ideas colaborativa'
      ],
      desarrollo: [
        'Explicación del tema con ejemplos contextualizados',
        'Actividades prácticas individuales y en equipo',
        'Uso de recursos digitales y materiales didácticos'
      ],
      cierre: [
        'Síntesis del aprendizaje',
        'Reflexión sobre lo aprendido',
        'Indicadores de logro'
      ],
      evaluacion: [
        'Rúbrica analítica de desempeño',
        'Lista de cotejo de productos',
        'Autoevaluación del estudiante'
      ]
    },
    dosificacion: {
      semana1: 'Introducción y contexto',
      semana2: 'Conceptos fundamentales',
      semana3: 'Aplicación práctica',
    },
    recursos: [
      'Presentación digital',
      'Materiales manipulativos',
      'Videos educativos',
      'Plataforma digital'
    ]
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nivel, grado, materia, campo, contenido, objetivo, duracion, sesiones, provider } = req.body

  if (!objetivo || !materia) {
    return res.status(400).json({ error: 'Faltan datos requeridos' })
  }

  const userPrompt = `Genera una planeación didáctica completa con los siguientes datos:
- Nivel: ${nivel}
- Grado: ${grado}
- Materia: ${materia}
- Campo Formativo: ${campo}
- Contenido: ${contenido}
- Objetivo de Aprendizaje: ${objetivo}
- Duración: ${duracion} semanas
- Número de Sesiones: ${sesiones}

Estructura la planeación en:
1. Inicio: actividades diagnósticas y de recuperación de conocimientos previos
2. Desarrollo: actividades paso a paso, trabajo colaborativo, uso de TIC
3. Cierre: reflexión, retroalimentación, evidencia de aprendizaje
4. Evaluación: rúbricas, listas de cotejo, escalas estimativas

Devuelve SOLO JSON válido sin explicaciones adicionales.`

  try {
    let aiResponse
    
    // Determinar qué proveedor usar
    const selectedProvider = provider || 'openai'
    
    if (selectedProvider === 'nvidia' && process.env.NVIDIA_API_KEY) {
      aiResponse = await generateWithNVIDIA(userPrompt)
    } else if (selectedProvider === 'openai' && process.env.OPENAI_API_KEY) {
      aiResponse = await generateWithOpenAI(userPrompt)
    } else {
      // Si no hay claves configuradas o provider inválido
      console.warn(`Provider ${selectedProvider} no disponible, usando fallback`)
      return res.status(200).json(getFallbackResponse(materia, grado))
    }

    // Parsear respuesta JSON
    let parsedResponse
    try {
      parsedResponse = JSON.parse(aiResponse)
    } catch (parseError) {
      console.warn('Error parsing AI response, usando fallback', parseError)
      parsedResponse = getFallbackResponse(materia, grado)
    }

    res.status(200).json(parsedResponse)
  } catch (error) {
    console.error(`Error generando con ${provider}:`, error)
    res.status(500).json({ 
      error: 'Error al generar planeación',
      details: error.message,
      provider: provider || 'openai'
    })
  }
}

