import { useState } from 'react'
import Layout from '../components/Layout'
import { FormField, Button } from '../components/FormComponents'

const NIVELES = ['Preescolar', 'Primaria', 'Secundaria', 'Bachillerato', 'Universidad']
const CAMPOS_FORMATIVOS = ['Saberes y Pensamiento Científico', 'Ética, Naturaleza y Sociedades', 'De lo Humano y lo Comunitario']
const PROVIDERS = ['openai', 'nvidia']

export default function GenerarPlaneacion() {
  const [formData, setFormData] = useState({
    nivel: '',
    grado: '',
    materia: '',
    campo: '',
    contenido: '',
    objetivo: '',
    duracion: '2',
    sesiones: '5',
    provider: 'openai'
  })

  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Error al generar planeación')
      const data = await response.json()
      setResultado(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Generar Planeación Didáctica</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6 p-4 bg-indigo-50 rounded border border-indigo-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proveedor de IA <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              {PROVIDERS.map(prov => (
                <label key={prov} className="flex items-center">
                  <input
                    type="radio"
                    name="provider"
                    value={prov}
                    checked={formData.provider === prov}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="capitalize font-medium">{prov === 'openai' ? 'OpenAI GPT-3.5' : 'NVIDIA Llama 2'}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">Selecciona qué modelo de IA usará para generar la planeación</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Nivel Educativo"
              name="nivel"
              type="select"
              placeholder={NIVELES}
              value={formData.nivel}
              onChange={handleChange}
              required
            />
            <FormField
              label="Grado"
              name="grado"
              placeholder="Ej: 5°, 1° de Secundaria"
              value={formData.grado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Materia/Asignatura"
              name="materia"
              placeholder="Ej: Matemáticas, Ciencias"
              value={formData.materia}
              onChange={handleChange}
              required
            />
            <FormField
              label="Campo Formativo"
              name="campo"
              type="select"
              placeholder={CAMPOS_FORMATIVOS}
              value={formData.campo}
              onChange={handleChange}
            />
          </div>

          <FormField
            label="Contenido/Tema"
            name="contenido"
            type="textarea"
            placeholder="Describe el contenido o tema a trabajar"
            value={formData.contenido}
            onChange={handleChange}
            required
          />

          <FormField
            label="Objetivo de Aprendizaje"
            name="objetivo"
            type="textarea"
            placeholder="¿Qué deben aprender los estudiantes?"
            value={formData.objetivo}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Duración (semanas)"
              name="duracion"
              type="number"
              value={formData.duracion}
              onChange={handleChange}
            />
            <FormField
              label="Número de Sesiones"
              name="sesiones"
              type="number"
              value={formData.sesiones}
              onChange={handleChange}
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

          <Button onClick={handleSubmit} loading={loading} className="w-full">
            Generar Planeación con {formData.provider === 'nvidia' ? 'NVIDIA' : 'OpenAI'}
          </Button>
        </form>

        {resultado && (
          <div className="mt-8 bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Planeación Generada</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg mb-2">Inicio</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {resultado.planeacion.inicio.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Desarrollo</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {resultado.planeacion.desarrollo.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Cierre</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {resultado.planeacion.cierre.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Evaluación</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {resultado.planeacion.evaluacion.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}


  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Error al generar planeación')
      const data = await response.json()
      setResultado(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Generar Planeación Didáctica</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Nivel Educativo"
              name="nivel"
              type="select"
              placeholder={NIVELES}
              value={formData.nivel}
              onChange={handleChange}
              required
            />
            <FormField
              label="Grado"
              name="grado"
              placeholder="Ej: 5°, 1° de Secundaria"
              value={formData.grado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Materia/Asignatura"
              name="materia"
              placeholder="Ej: Matemáticas, Ciencias"
              value={formData.materia}
              onChange={handleChange}
              required
            />
            <FormField
              label="Campo Formativo"
              name="campo"
              type="select"
              placeholder={CAMPOS_FORMATIVOS}
              value={formData.campo}
              onChange={handleChange}
            />
          </div>

          <FormField
            label="Contenido/Tema"
            name="contenido"
            type="textarea"
            placeholder="Describe el contenido o tema a trabajar"
            value={formData.contenido}
            onChange={handleChange}
            required
          />

          <FormField
            label="Objetivo de Aprendizaje"
            name="objetivo"
            type="textarea"
            placeholder="¿Qué deben aprender los estudiantes?"
            value={formData.objetivo}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Duración (semanas)"
              name="duracion"
              type="number"
              value={formData.duracion}
              onChange={handleChange}
            />
            <FormField
              label="Número de Sesiones"
              name="sesiones"
              type="number"
              value={formData.sesiones}
              onChange={handleChange}
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

          <Button onClick={handleSubmit} loading={loading} className="w-full">
            Generar Planeación con IA
          </Button>
        </form>

        {resultado && (
          <div className="mt-8 bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Planeación Generada</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg mb-2">Inicio</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {resultado.planeacion.inicio.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Desarrollo</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {resultado.planeacion.desarrollo.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Cierre</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {resultado.planeacion.cierre.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Evaluación</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {resultado.planeacion.evaluacion.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
