# PreLegal

Generador de documentos legales. El usuario completa un formulario y obtiene un contrato (basado en las plantillas de Common Paper) listo para descargar en PDF.

## Estructura del repo

- `Templates/` — dataset de plantillas legales (Markdown) + `catalog.json` describiéndolas. Fuente de verdad del contenido legal; no editar el texto salvo para corregir la fuente.
- `Frontend/` — app Next.js (App Router, TypeScript, Tailwind). Todo corre client-side; no hay backend todavía.

## Comandos (desde `Frontend/`)

- `npm run dev` — servidor de desarrollo (`http://localhost:3000`).
- `npm run lint` — ESLint.
- `npm run build` — build de producción (incluye type-check).
- `npx tsc --noEmit` — solo type-check, más rápido para iterar.

## Desarrollo progresivo

Este proyecto avanza tarea por tarea, cada una asociada a un ticket de Jira (proyecto `PL`, ver `PL-1`, `PL-2`...).

1. **Una tarea a la vez.** No adelantar trabajo de tickets futuros ni mezclar alcance de varios tickets en un mismo cambio.
2. **Aclarar antes de construir.** Si el ticket es ambiguo (campos no definidos, alcance no claro), preguntar antes de implementar — no asumir. Si el ticket implica una arquitectura mucho más grande de lo que su descripción sugiere (p. ej. requiere backend nuevo, o generalizar algo que hoy está hecho a mano), decirlo explícitamente antes de diseñar.
3. **Rama + PR, nunca directo a `main`.** Crear `feature/PL-N-descripcion`, implementar, y solo hacer commit, push o abrir PR cuando el usuario lo pida explícitamente — no por iniciativa propia.
4. **Verificar antes de dar por terminado:**
   - `npx tsc --noEmit`
   - `npm run lint`
   - `npm run build`
   - Probar manualmente en el navegador el flujo afectado (no basta con que compile).
5. **Mover el ticket a Done en Jira** solo cuando el usuario confirme que el trabajo está integrado (mergeado), no al terminar de escribir el código.

## Convenciones del Frontend

- **i18n**: `lib/i18n/` — diccionario EN/ES (`translations.ts`) + `LanguageProvider`/`useLanguage()` (`language-context.tsx`, persiste en `localStorage`). Todo texto visible pasa por `t.*`, nunca hardcodeado. Inglés es el idioma por defecto.
- **Validación**: `lib/validation.ts` — funciones puras que devuelven códigos de error (`FieldErrorCode`), traducidos en el componente vía `t.validation`. Mantiene la lógica de validación independiente del idioma.
- **Plantillas legales**: `lib/nda-template.ts` (y equivalentes futuros por tipo de documento) adaptan el Markdown de `Templates/` con placeholders `{{token}}`; no hardcodear el texto legal fuera de estos archivos.
- **Generación de PDF**: `lib/pdf.ts` — rasteriza el preview del documento (`html2canvas-pro` + `jsPDF`) y dispara la descarga; todo ocurre en el navegador del usuario.
- **Tipos de datos de formulario**: `types/` (p. ej. `types/nda.ts`) — un tipo `*FormData` por documento, con su valor `empty*FormData` inicial.
- **Todo client-side por ahora**: sin backend, sin persistencia server-side. Cualquier feature que lo requiera (login, guardar documentos, multi-plantilla con traducción del cuerpo legal) necesita decidir explícitamente la arquitectura antes de implementar — no asumir el alcance.
