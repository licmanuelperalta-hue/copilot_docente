# Guía de Instalación - Copilot Docente

## Requisitos Previos

- Node.js 16+ instalado
- npm o yarn
- Una clave de API válida (OpenAI, NVIDIA, o ambas)

## Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/licmanuelperalta-hue/copilot_docente.git
cd copilot_docente
```

## Paso 2: Configurar Variables de Entorno

### Crear archivo .env.local
```bash
cp .env.local.example .env.local
```

### Opción A: Usar NVIDIA NIM (Recomendado)

Abre `.env.local` y añade:
```
NVIDIA_API_KEY=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
NVIDIA_API_URL=https://integrate.api.nvidia.com/v1
```

**Ventajas:**
- Modelos Llama 2 de última generación
- API rápida y eficiente
- Menos latencia que OpenAI

### Opción B: Usar OpenAI

Abre `.env.local` y añade:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

Obtén una clave de: https://platform.openai.com/account/api-keys

### Opción C: Ambas (Recomendado)

Configura ambas claves y selecciona cuál usar en el formulario:
```
NVIDIA_API_KEY=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
NVIDIA_API_URL=https://integrate.api.nvidia.com/v1
OPENAI_API_KEY=sk-your-actual-api-key-here
```

## Paso 3: Instalar Dependencias

```bash
npm install
```

Si tienes problemas, intenta limpiar caché:
```bash
npm cache clean --force
npm install
```

## Paso 4: Ejecutar en Desarrollo

```bash
npm run dev
```

Deberías ver:
```
> copilot_docente@0.1.0 dev
> next dev

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

## Paso 5: Acceder a la Aplicación

Abre tu navegador en: **http://localhost:3000**

- Dashboard: `http://localhost:3000`
- Generador de Planeaciones: `http://localhost:3000/generar-planeacion`

## Solución de Problemas

### Error: "OPENAI_API_KEY not found"
**Solución**: Verifica que `.env.local` exista y esté configurado correctamente.

### Error: "NVIDIA_API_KEY not found"
**Solución**: Si solo usas OpenAI, ignora este error. Solo necesitas la clave de OpenAI.

### Error 500 al generar planeación
**Solución**: 
1. Verifica que al menos una clave de API esté configurada en `.env.local`
2. Confirma que tu clave es válida
3. Revisa los logs en la consola del navegador (F12)
4. Revisa los logs en la terminal de Next.js

### La aplicación no genera respuestas
**Solución**:
1. Espera unos segundos (la IA tarda en procesar)
2. Verifica que todos los campos del formulario estén completos
3. Intenta con otro proveedor de IA

## Compilar para Producción

```bash
npm run build
npm run start
```

## Estructura de Archivos Importante

```
.env.local          ← Contiene claves sensibles (no sube a Git)
.env.local.example  ← Plantilla para copiar (seguro en Git)
pages/
  generar-planeacion.js  ← Página del generador
  api/generate.js        ← API multi-proveedor
```

## Tips

- **Guardar claves seguras**: `.env.local` nunca se sube a GitHub
- **Cambiar proveedor**: Usa el selector en el formulario
- **Fallback**: Si ambas claves fallan, recibe una respuesta de ejemplo

---

¿Necesitas ayuda? Contacta al equipo de desarrollo o abre un issue en GitHub.
