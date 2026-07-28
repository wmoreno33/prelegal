# PreLegal

Generador de documentos legales. El usuario completa un formulario y obtiene un contrato (basado en las plantillas de Common Paper) listo para descargar.

## Estructura del repo

- `Templates/` — dataset de plantillas legales (Markdown) + `catalog.json` describiéndolas. Fuente de verdad del contenido legal; no editar el texto salvo para corregir la fuente.
- `Frontend/` — app Next.js (App Router, TypeScript, Tailwind). Todo corre client-side; no hay backend todavía.

## Desarrollo progresivo

Este proyecto avanza tarea por tarea, cada una asociada a un ticket de Jira (proyecto `PL`, ver `PL-1`, `PL-2`...).

1. **Una tarea a la vez.** No adelantar trabajo de tickets futuros ni mezclar alcance de varios tickets en un mismo cambio.
2. **Aclarar antes de construir.** Si el ticket es ambiguo (campos no definidos, alcance no claro), preguntar antes de implementar — no asumir.
3. **Rama + PR, nunca directo a `main`.** Crear `feature/PL-N-descripcion`, implementar, y solo abrir PR o hacer commit cuando el usuario lo pida explícitamente.
4. **Verificar antes de dar por terminado:**
   - `npx tsc --noEmit`
   - `npm run lint`
   - `npm run build`
   - Probar manualmente en el navegador el flujo afectado (no basta con que compile).
5. **Mover el ticket a Done en Jira** solo cuando el usuario confirme que el trabajo está integrado (mergeado), no al terminar de escribir el código.

## Convenciones del Frontend

- **i18n**: `lib/i18n/` — diccionario EN/ES + `LanguageProvider`/`useLanguage()`. Todo texto visible pasa por `t.*`, nunca hardcodeado.
- **Validación**: `lib/validation.ts` — funciones puras que devuelven códigos de error (`FieldErrorCode`), traducidos en el componente vía `t.validation`. Mantiene la lógica de validación independiente del idioma.
- **Plantillas legales**: `lib/nda-template.ts` (y equivalentes futuros) adaptan el Markdown de `Templates/` con placeholders `{{token}}`; no hardcodear el texto legal fuera de estos archivos.
- **Todo client-side por ahora**: sin backend, sin persistencia server-side. Cualquier feature que lo requiera (login, guardar documentos) necesita decidir explícitamente la arquitectura de backend antes de implementar.
