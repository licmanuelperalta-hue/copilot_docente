// Constantes y tipos para la plataforma

export const NIVELES_EDUCATIVOS = ['Preescolar', 'Primaria', 'Secundaria', 'Bachillerato', 'Universidad']

export const CAMPOS_FORMATIVOS = [
  'Saberes y Pensamiento Científico',
  'Ética, Naturaleza y Sociedades',
  'De lo Humano y lo Comunitario'
]

export const TIPOS_ACTIVIDADES = [
  'Juego',
  'Reto',
  'Experimento',
  'Debate',
  'Actividad STEAM',
  'Actividad LEGO',
  'Aprendizaje basado en proyectos',
  'Trabajo colaborativo'
]

export const TIPOS_EVALUACION = [
  'Opción múltiple',
  'Relacionar columnas',
  'Verdadero/Falso',
  'Casos prácticos',
  'Rúbrica analítica',
  'Lista de cotejo',
  'Escala estimativa',
  'Autoevaluación'
]

export const FORMATO_EXPORTACION = ['PDF', 'Word', 'Excel', 'Google Docs']

// Función helper para parsear respuestas de OpenAI
export const parseAIResponse = (content) => {
  try {
    return JSON.parse(content)
  } catch (error) {
    console.warn('Error parsing AI response, returning fallback', error)
    return {
      titulo: 'Planeación generada',
      planeacion: {
        inicio: ['Actividad de diagnóstico'],
        desarrollo: ['Actividad principal'],
        cierre: ['Cierre y reflexión'],
        evaluacion: ['Rúbrica']
      },
      dosificacion: { semana1: 'Contenido' },
      recursos: ['Recursos disponibles']
    }
  }
}

// Función para validar formulario de planeación
export const validatePlanForm = (formData) => {
  const errors = {}
  if (!formData.nivel) errors.nivel = 'Nivel educativo requerido'
  if (!formData.materia) errors.materia = 'Materia requerida'
  if (!formData.objetivo) errors.objetivo = 'Objetivo de aprendizaje requerido'
  if (!formData.contenido) errors.contenido = 'Contenido requerido'
  return { isValid: Object.keys(errors).length === 0, errors }
}
