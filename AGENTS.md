# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

# Sobre este proyecto

- App: catálogo de películas (React Native + Expo + Expo Router + TypeScript).
- Pantallas en `src/app/`, mock de datos en `src/services/peliculas.ts`.
- El mock simula latencia de 500 a 1000 ms con Promise + setTimeout.
- Rama de trabajo: `felipedev`. Un commit por tarea, mensajes en español
  naturales (sin Conventional Commits), sin push automático.
- Verificar TypeScript antes de cada commit: `npx tsc --noEmit`.
- Código simple y explicable: sin abstracciones innecesarias ni
  funcionalidades no pedidas.

## Agente y flujo SDD usados por el equipo

- **Agente:** `opencode` (CLI de desarrollo asistido por IA) — el equipo
  utiliza la versión CLI para solicitar generación y cambios de código
  directamente desde el contexto del repo.
- **Herramienta SDD:** No se utilizó una herramienta SDD automática
  (como GitHub Spec Kit). El equipo aplicó SDD de forma manual:
  - Se creó `spec.md` con la especificación funcional.
  - Se creó `plan.md` con decisiones técnicas y estructura.
  - Se creó `tasks.md` con la lista de tareas atómicas (una tarea = un commit).

### Reglas de uso del agente (convención del equipo)

- Rama de trabajo: `felipedev`.
- Antes de pedirle al agente que implemente una tarea: actualizar y
  verificar `spec.md`, `plan.md` y `tasks.md` para dar contexto.
- Prompt template mínimo (usar con `opencode`):

  "Contexto: repo en la rama `felipedev`, ver `spec.md` y `tasks.md`.\nTarea: Txx - <descripción corta>.\nEntregar: archivos modificados, tests simples si aplican, y pasos para verificar en Expo Go.\nRestricciones: no añadir dependencias innecesarias; respetar convención de commits; ejecutar `npx tsc --noEmit` antes de commitear." 

- Verificar manualmente todo código generado por el agente antes de
  aceptarlo y commitearlo (regla de oro del SDD: la IA propone, el equipo decide).

Documentar en `PROCESO.md` el prompt usado y las correcciones manuales
por cada tarea implementada.
