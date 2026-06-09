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

Edita `.env.local` e ingresa una o ambas claves de IA:

**Opción A: OpenAI**
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```
Obtén tu clave en: https://platform.openai.com/account/api-keys

**Opción B: NVIDIA NIM**
```
NVIDIA_API_KEY=nvapi-your-actual-api-key-here
NVIDIA_API_URL=https://integrate.api.nvidia.com/v1
```

**Puedes usar ambas y seleccionar cuál usar en el formulario.**

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
✅ **Integración Dual IA**: OpenAI + NVIDIA NIM, seleccionable  
✅ **Estructura NEM**: Planeaciones alineadas con la Nueva Escuela Mexicana  
✅ **Componentes Reutilizables**: Form inputs, buttons, layout  
✅ **Seguridad**: Variables de entorno sensibles nunca se suben a GitHub  

## Estructura del Proyecto

```
copilot_docente/
├── pages/
│   ├── index.js              # Dashboard principal
│   ├── generar-planeacion.js # Generador con selector de IA
│   ├── _app.js               # Configuración global
│   └── api/
│       └── generate.js       # API multi-proveedor (OpenAI + NVIDIA)
├── components/
│   ├── Layout.js             # Layout principal
│   └── FormComponents.js     # Componentes form reutilizables
├── utils/
│   └── constants.js          # Constantes y helpers
├── styles/
│   └── globals.css           # Estilos globales Tailwind
├── .env.local.example        # Plantilla de variables
├── package.json              # Dependencias
└── README.md                 # Este archivo
```

## Flujo de Uso

1. El docente ingresa a `http://localhost:3000/generar-planeacion`
2. **Selecciona un proveedor de IA** (OpenAI o NVIDIA)
3. Completa el formulario con:
   - Nivel educativo (Preescolar, Primaria, etc.)
   - Grado
   - Materia
   - Objetivo de aprendizaje
   - Duración y sesiones
4. Hace clic en **"Generar Planeación"**
5. La IA genera automáticamente:
   - Actividades de inicio (diagnóstico, recuperación)
   - Actividades de desarrollo (colaborativas, con TIC)
   - Actividades de cierre (reflexión, evidencia)
   - Instrumentos de evaluación (rúbricas, listas de cotejo)
   - Dosificación por semanas
   - Recursos didácticos sugeridos

## Modelos Soportados

### OpenAI
- **Modelo**: GPT-3.5 Turbo
- **Documentación**: https://platform.openai.com/docs/models/gpt-3-5-turbo

### NVIDIA NIM
- **Modelo**: Meta Llama 2 70B Chat
- **Documentación**: https://docs.nvidia.com/nim/large-language-models/latest/

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

## Tecnologías Usadas

- **Frontend**: Next.js 13 + React 18 + Tailwind CSS
- **Backend**: Next.js API Routes
- **IA**: OpenAI GPT-3.5 Turbo + NVIDIA NIM (Llama 2)
- **HTTP Client**: Axios

## Notas de Desarrollo

- Las planeaciones se generan en tiempo real vía IA
- Selecciona qué proveedor usar directamente en el formulario
- Si ambos proveedores fallan, la API devuelve un fallback con estructura estándar
- Las respuestas se estructuran automáticamente en JSON
- Las claves de API nunca se guardan en Git (usa .env.local)

## Soporte

Si encuentras errores:
1. Verifica que `.env.local` esté correctamente configurado
2. Confirma que tu clave de API es válida
3. Revisa la consola de Next.js para mensajes de error
4. Abre un issue en GitHub

## Licencia

MIT License — Libre para usar, modificar y distribuir

---

🎓 Creado para potenciar la educación con inteligencia artificial.
