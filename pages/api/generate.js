import { OpenAI } from 'openai'

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nivel, grado, materia, campo, contenido, objetivo, duracion, sesiones } = req.body

  if (!objetivo || !materia) {
    return res.status(400).json({ error: 'Faltan datos requeridos' })
  }

  try {
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    let parsedResponse
    try {
      parsedResponse = JSON.parse(completion.choices[0].message.content)
    } catch (parseError) {
      // Si OpenAI no retorna JSON válido, usa un fallback
      parsedResponse = {
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
          ['semana1']: 'Introducción y contexto',
          ['semana2']: 'Conceptos fundamentales',
          ['semana3']: 'Aplicación práctica',
        },
        recursos: [
          'Presentación digital',
          'Materiales manipulativos',
          'Videos educativos',
          'Plataforma digital'
        ]
      }
    }

    res.status(200).json(parsedResponse)
  } catch (error) {
    console.error('Error OpenAI:', error)
    res.status(500).json({ 
      error: 'Error al generar planeación',
      details: error.message 
    })
  }
}

