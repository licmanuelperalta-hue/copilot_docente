import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-gray-600">Bienvenido a Copilot Docente. Este es el esqueleto inicial.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white rounded shadow">Planeaciones recientes</div>
          <div className="p-4 bg-white rounded shadow">Dosificaciones</div>
          <div className="p-4 bg-white rounded shadow">Calendario</div>
        </div>

      </section>
    </Layout>
  )
}
