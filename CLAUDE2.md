# PreLegal — Visión futura

Documento de ideas a futuro, separado de `CLAUDE.md` (que documenta el estado y las convenciones actuales). Nada de esto está implementado todavía — es una lista de posibles próximos pasos para cuando se decida ampliar el alcance del proyecto.

## Funcionalidades futuristas

- **Multi-plantilla real.** Generalizar el generador para las 11 plantillas de `catalog.json` (no solo la NDA), con un motor que detecte automáticamente los placeholders (`coverpage_link`, `orderform_link`, `keyterms_link`) del Markdown en vez de modelar cada campo a mano.
- **Cuentas de usuario e historial.** Login, guardar documentos generados por usuario, reabrir/editar borradores anteriores. Requiere backend real (ver más abajo).
- **Firma electrónica.** Captura de firma o integración con un proveedor de e-signature para cerrar el ciclo completo (generar → firmar → archivar).
- **Envío por correo** del documento generado a ambas partes, con seguimiento de si fue abierto/firmado.
- **Exportar a Word (.docx)** además de PDF, para que equipos legales puedan redlinear.
- **Más idiomas** además de EN/ES, y traducción del cuerpo legal de las plantillas nuevas (hoy solo la NDA está bilingüe).
- **Panel de administración** para editar `catalog.json` y las plantillas sin tocar código directamente.
- **Comparador de versiones**: mostrar diffs entre dos versiones de un documento generado (útil en negociaciones).

## Chatbot: idea de implementación

Un asistente conversacional que ayude al usuario a completar el formulario y entender el documento, sin sustituir asesoría legal real.

### Casos de uso

1. **Guía conversacional del formulario.** En vez de (o además de) llenar el formulario campo por campo, el usuario describe la situación en lenguaje natural ("es un NDA con un proveedor en México, vigente por 2 años") y el chatbot propone los valores de los campos para que el usuario confirme o edite.
2. **Explicación de cláusulas.** El usuario selecciona un párrafo del documento generado y pregunta "¿qué significa esto?" — el chatbot explica la cláusula en lenguaje simple, citando la sección.
3. **Recomendación de plantilla.** El usuario describe lo que necesita ("quiero proteger código fuente que le voy a mostrar a un inversionista") y el chatbot sugiere qué plantilla del catálogo usar (NDA, CSA, etc.) y por qué.
4. **Detección de campos faltantes o inconsistentes**, más allá de la validación de formato (`lib/validation.ts`): por ejemplo, avisar si el plazo de confidencialidad es más corto que el plazo del acuerdo, cuando eso no suele tener sentido.

### Arquitectura propuesta

- **Backend nuevo requerido.** El chatbot no puede vivir 100% client-side como el resto de la app hoy: necesita llamar a la API de Claude con una API key que no debe exponerse al navegador. Esto implica el primer backend real del proyecto (p. ej. FastAPI, coherente con el `.gitignore` ya preparado para Python/FastAPI), con una ruta tipo `/api/chat` que hace de proxy hacia la API de Claude.
- **Contexto acotado.** El chatbot solo debe tener contexto del contenido de `Templates/` y `catalog.json` (vía system prompt o RAG simple), no navegar libremente — para evitar alucinar cláusulas que no están en las plantillas reales.
- **Streaming.** Respuestas en streaming (SSE o similar) para que la conversación se sienta fluida, igual que el resto de la UI (que hoy es reactiva por el estado de React).
- **Function calling hacia el formulario.** El chatbot no edita el documento directamente con texto libre; propone valores estructurados (mismo tipo `NdaFormData` que ya existe) que se aplican al formulario solo si el usuario los confirma. Mantiene la garantía actual de que el usuario ve y controla cada campo antes de generar el PDF.
- **Sin persistencia de conversación en servidor** (al menos en una primera versión), consistente con el principio actual de "nada de lo que ingreses sale de tu navegador" — el historial del chat vive en el estado del cliente, no en una base de datos.

### Consideraciones importantes

- **No es asesoría legal.** El chatbot debe dejar claro en todo momento que sus respuestas son informativas, no asesoría legal, igual que el resto del generador.
- **Alcance grande.** Como con el login (ver discusión previa en el proyecto), esto es un cambio de arquitectura, no un feature incremental — necesita su propio ticket de Jira y una fase de aclaración de alcance antes de implementar, siguiendo el flujo de `CLAUDE.md`.
