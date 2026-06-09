# copilot_docente

Plataforma web inteligente para docentes — **Generador de Planeaciones Didácticas con IA**.

## Objetivo

Crear una plataforma web donde la IA ayude a docentes a generar planeaciones didácticas completas, alineadas con la Nueva Escuela Mexicana, incluyendo:
- Actividades de inicio, desarrollo y cierre
- Dosificación automática de contenidos
- Instrumentos de evaluación (rúbricas, listas de cotejo)
- Recursos didácticos sugeridos

## Instalación Rápida

### 1. Clonar el repositorio
```bash
git clone https://github.com/licmanuelperalta-hue/copilot_docente.git
cd copilot_docente
```

### 2. Configurar variables de entorno
Copia el archivo de ejemplo y configura tus claves:
```bash
cp .env.local.example .env.local
```

Edita `.env.local` e ingresa tu clave de OpenAI:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

Obtén tu clave en: https://platform.openai.com/account/api-keys

### 3. Instalar dependencias
```bash
npm install
```

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

Accede a `http://localhost:3000`

## Funcionalidades Implementadas

✅ **Dashboard**: Vista principal con información del docente  
✅ **Generador de Planeaciones**: Formulario para capturar datos educativos  
✅ **Integración OpenAI**: Generación automática de planeaciones completas  
✅ **Estructura NEM**: Planeaciones alineadas con la Nueva Escuela Mexicana  
✅ **Componentes Reutilizables**: Form inputs, buttons, layout  

## Estructura del Proyecto

```
copilot_docente/
├── pages/
│   ├── index.js              # Dashboard principal
│   ├── generar-planeacion.js # Página generador de planeaciones
│   ├── _app.js               # Configuración global
│   └── api/
│       └── generate.js       # API OpenAI para generación
├── components/
│   ├── Layout.js             # Layout principal
│   └── FormComponents.js     # Componentes form reutilizables
├── styles/
│   └── globals.css           # Estilos globales Tailwind
├── package.json              # Dependencias
└── README.md                 # Este archivo
```

## Flujo de Uso

1. El docente ingresa a `http://localhost:3000/generar-planeacion`
2. Completa el formulario con:
   - Nivel educativo (Preescolar, Primaria, etc.)
   - Grado
   - Materia
   - Objetivo de aprendizaje
   - Duración y sesiones
3. Hace clic en **"Generar Planeación con IA"**
4. La IA genera automáticamente:
   - Actividades de inicio (diagnóstico, recuperación)
   - Actividades de desarrollo (colaborativas, con TIC)
   - Actividades de cierre (reflexión, evidencia)
   - Instrumentos de evaluación (rúbricas, listas de cotejo)
   - Dosificación por semanas
   - Recursos didácticos sugeridos

## Siguientes Pasos (Roadmap)

- [ ] Exportación a PDF, Word, Excel
- [ ] Banco de recursos compartidos
- [ ] Autenticación con Firebase
- [ ] Base de datos PostgreSQL
- [ ] Historial de planeaciones
- [ ] Compartir planeaciones entre docentes
- [ ] Proyectos interdisciplinarios
- [ ] Chat asistente virtual
- [ ] Adaptaciones para NEE (Necesidades Educativas Especiales)
- [ ] Generación de actividades LEGO/STEAM

## Technologías Usadas

- **Frontend**: Next.js 13 + React 18 + Tailwind CSS
- **Backend**: Next.js API Routes + OpenAI
- **IA**: OpenAI GPT-3.5 Turbo

## Notas de Desarrollo

- Las planeaciones se generan en tiempo real via OpenAI
- Si OpenAI falla, la API devuelve un fallback con estructura estándar
- Las respuestas son estructuradas en JSON para fácil procesamiento
- Puedes extender la API para soportar Gemini u otros modelos

## Licencia

MIT License — Libre para usar, modificar y distribuir

---

¿Preguntas? Abre un issue o contribuye al proyecto.
