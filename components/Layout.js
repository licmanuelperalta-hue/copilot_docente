import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-600 text-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/">
              <span className="text-lg font-bold cursor-pointer">🎓 Copilot Docente</span>
            </Link>
            <nav className="space-x-4">
              <Link href="/" className="hover:bg-indigo-700 px-3 py-2 rounded">
                Dashboard
              </Link>
              <Link href="/generar-planeacion" className="hover:bg-indigo-700 px-3 py-2 rounded">
                Generar Planeación
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full p-4">{children}</main>
      <footer className="bg-gray-100 border-t mt-8 py-4 px-4 text-center text-sm text-gray-600">
        <p>© 2026 Copilot Docente — Plataforma IA para planeaciones didácticas</p>
      </footer>
    </div>
  )
}

