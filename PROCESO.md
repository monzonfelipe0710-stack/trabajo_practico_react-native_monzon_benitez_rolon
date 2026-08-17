# Proceso de desarrollo

Registro de lo que se pidió, lo que se generó, los errores que aparecieron
y cómo se verificó cada etapa. Los prompts están resumidos; el contenido
es fiel a las conversaciones reales de trabajo.

## Sesión 1 - Revisión inicial del proyecto

**Qué se pidió:** inspeccionar el proyecto antes de escribir código y
reportar estructura, estado de Expo, estado de Git y qué tarea correspondía.
Reglas generales: proyecto simple, sin funcionalidades extra, código
explicable oralmente, commits en español por tarea, sin Conventional
Commits, trabajar en la rama felipedev.

**Qué se encontró:**

- Proyecto con la plantilla por defecto de Expo (tabs): app/(tabs)/,
  modal.tsx, componentes de ejemplo.
- Expo SDK 54, expo-router 6, TypeScript estricto, sin dependencias extra
  necesarias.
- Git: rama felipedev limpia, con un commit previo "configuración del
  proyecto Expo" (T01 ya hecha).

**Decisión:** arrancar por T02 (mock) y dejar el movimiento de app/ a
src/app/ para las tareas de pantallas.

## Sesión 2 - T02 Mock de películas

**Qué se pidió:** crear src/services/peliculas.ts con el tipo Pelicula,
al menos 3 películas mock, funciones async obtenerPeliculas(),
obtenerPelicula(id) y agregarPelicula(), todas con latencia simulada de
500 a 1000 ms usando Promise + setTimeout. Sin instalar dependencias y sin
tocar pantallas ni navegación.

**Qué se generó:** el archivo completo con el tipo, 4 películas de ejemplo
y una función auxiliar esperarLatencia() que calcula un número aleatorio
entre 500 y 1000 ms.

**Verificación:** npx tsc --noEmit sin errores. Commit:
"T02 - Agregue el mock de peliculas" (8aaec51 en ese momento).

## Sesión 3 - Reglas de Git

**Qué se pidió:** reglas estrictas para no romper el historial: nunca
git init, ni commits vacíos, ni commits llamados "first commit"/"initial
commit"/"setup"/"update", un solo commit por tarea con cambios reales,
revisar git status antes de cada commit, git log -1 después, sin push
automático, sin reescritura de historial sin permiso, siempre sobre
felipedev.

**Resultado:** se adoptaron como reglas fijas para todo el resto del
trabajo.

## Sesión 4 - T03 Listado y T04 Menú

**Qué se pidió:** implementar el listado usando obtenerPeliculas() con
estado de carga, estado vacío y FlatList mostrando título, género y año;
y preparar el menú/navegación con las rutas inicio, detalle, agregar y
acerca, sin implementar las pantallas de los demás integrantes. No tocar
el mock. Se consultó al equipo y se aprobó mover app/ a src/app/, borrar
la plantilla sin uso y ajustar el alias @/_ a ./src/_.

**Qué se generó:**

- src/app/index.tsx: listado con useEffect + obtenerPeliculas(),
  ActivityIndicator durante la carga, mensaje si no hay películas y
  FlatList con tarjetas.
- src/app/\_layout.tsx: Stack con las cuatro rutas registradas.
- Menú con Link hacia /agregar y /acerca en el inicio.
- tsconfig.json con alias actualizado; app.json con typedRoutes desactivada.

**Errores que aparecieron y cómo se resolvieron:**

1. git rm de la plantilla falló porque los archivos acababan de moverse con
   git mv; se resolvió con git rm -r -f.
2. El archivo .expo/types/router.d.ts (generado por typedRoutes) seguía
   declarando rutas viejas de la plantilla ((tabs), modal) y habría
   impedido navegar a /agregar o /acerca sin error de tipos; se borró junto
   con la desactivación de typedRoutes en app.json.

**Verificación:** npx tsc --noEmit tras cada tarea, git status antes de
cada commit confirmando que solo estaban los archivos propios (el mock
quedó intacto). Commits: "T03 - Agregue el listado de peliculas" y
"T04 - Agregue el menu de la aplicacion".

## Sesión 5 - Problemas de publicación en GitHub

**Qué se pasó:** los commits no aparecían en GitHub. Causa real: faltaba
hacer push (los commits estaban solo en local). Se ejecutó
git push origin felipedev y quedó sincronizado.

Después, un integrante no veía la rama. Se verificó con git ls-remote que
la rama estaba publicada correctamente y se indicaron los pasos para
sincronizar (git fetch origin, git switch felipedev, git pull), más la
revisión de permisos de colaborador por si el problema era de acceso.

## Sesión 6 - Corrección de fechas de los commits

**Qué se pidió:** cambiar las fechas de todos los commits de la rama al
sábado 15/8/2026 entre las 17:00 y las 23:00. Como el 16 de agosto de 2026
cae domingo, se acordó usar el sábado 15. El equipo confirmó la reescritura
con force push sabiendo el impacto (los compañeros deben resincronizar).

**Qué se hizo:** git filter-branch --env-filter asignando fecha de autor y
de committer a cada uno de los 7 commits, repartidas entre 17:10 y 22:30,
y git push --force-with-lease origin felipedev. Se creó una rama de
respaldo temporal (backup-fechas) que se eliminó al verificar el resultado.

**Advertencia comunicada:** los hashes cambiaron; quien tuviera la rama
bajada debe hacer git fetch + git reset --hard origin/felipedev.

## Estado actual

- Hechas: T01, T02, T03, T04 y documentación inicial (esta tarea).
- Hechas (reciente): T05, T06, T07 — implementadas pantallas detalle, agregar y acerca; navegación añadida.
- Tareas añadidas/actualizadas:
  - T08: pruebas de estados y navegación (pendiente de verificación en dispositivo).
  - T09: persistencia local con AsyncStorage (implementada).
  - T10: actualización final de la documentación (en progreso — este archivo actualizado).

## Sesión X - Persistencia con AsyncStorage

**Qué se pidió:** agregar persistencia local para que las películas añadidas por el formulario sobrevivan al cerrar la app (opcional en la consigna, suma).

**Qué se hizo:** se instaló y utilizó `@react-native-async-storage/async-storage` en `src/services/peliculas.ts`. El servicio ahora:

- intenta cargar la lista guardada en la clave `peliculas_v1` al inicializar el módulo;
- mantiene el mock por defecto si no hay datos guardados o si la carga falla;
- guarda la lista completa en AsyncStorage cada vez que se agrega una película (operación no bloqueante para el caller).

**Detalles técnicos:**

- Archivo modificado: `src/services/peliculas.ts` — se importó `AsyncStorage`, se añadieron `cargarDesdeStorage()` y `guardarEnStorage()` y se invoca `guardarEnStorage()` tras `agregarPelicula()`.
- Nueva dependencia agregada en `package.json`: `@react-native-async-storage/async-storage`.

**Verificación:**

1. Instalar dependencias: `npm install` o `yarn`.
2. Ejecutar `npx tsc --noEmit` para comprobar tipos.
3. Correr Expo (`npm run start`) y en Expo Go: agregar una película, cerrar la app y reabrir; la película debe seguir presente en el listado.

**Errores/resguardos:**

- Si AsyncStorage falla por permisos o plataforma, el servicio captura errores y usa el mock en memoria; se muestran `console.warn` en esos casos.

## Prompts usados por tarea

A continuación se registran los prompts enviados con `opencode` (CLI) para las tareas implementadas, y las correcciones manuales efectuadas tras revisar el código generado.

### T05 - Detalle de película (`src/app/detalle/[id].tsx`)

Prompt (envié desde la raíz del repo, rama `felipedev`):

```
Contexto: repo con spec.md y tasks.md. Tarea: T05 - Implementar la pantalla de detalle de película en src/app/detalle/[id].tsx.
Requerimientos: usar la función obtenerPelicula(id) del servicio, manejar estados: carga (ActivityIndicator), vacío (mensaje) y detalle (título, género, año, descripción). Incluir un enlace para volver al listado. Mantener estilos coherentes con index.tsx y no añadir dependencias.
Entregar: el archivo src/app/detalle/[id].tsx listo para compilar en Expo Router.
```

Correcciones manuales realizadas: reemplacé la importación de `useSearchParams` por `useLocalSearchParams` (compatibilidad con la versión de `expo-router`), ajusté estilos y añadí control de tipos para `id`.

### T06 - Formulario para agregar película (`src/app/agregar.tsx`)

Prompt:

```
Contexto: repo con spec.md y tasks.md. Tarea: T06 - Implementar formulario de alta en src/app/agregar.tsx.
Requerimientos: inputs para título, género, año y descripción; validación básica (título, género y año obligatorios; año numérico razonable); llamar a agregarPelicula(datos) del servicio; mostrar ActivityIndicator durante el envío; al agregar correctamente, navegar a '/'. No usar librerías externas de validación.
Entregar: src/app/agregar.tsx con manejo de estado y UX básico para Expo Go.
```

Correcciones manuales realizadas: afiné las reglas de validación (rechazar años <=1800), trim de strings antes de enviar y manejo de errores con Alert.

### T07 - Pantalla Acerca (`src/app/acerca.tsx`)

Prompt:

```
Contexto: repo con spec.md y tasks.md. Tarea: T07 - Crear una pantalla estática en src/app/acerca.tsx que describa la app y liste a los autores. Debe usar los estilos básicos del proyecto y ser mínima.
Entregar: src/app/acerca.tsx listo.
```

Correcciones manuales realizadas: añadí un párrafo explicativo sobre decisiones técnicas y dejé un placeholder para los nombres de los integrantes.

### T09 - Persistencia local (AsyncStorage) — cambio adicional

Prompt:

```
Contexto: repo con spec.md y tasks.md. Tarea: Añadir persistencia opcional al mock de peliculas en src/services/peliculas.ts.
Requerimientos: usar @react-native-async-storage/async-storage; al iniciar el módulo, intentar cargar la lista guardada desde la clave 'peliculas_v1'; al agregar una película, guardar la lista actualizada en AsyncStorage (operación asíncrona no bloqueante). Mantener la latencia simulada y el comportamiento en memoria si storage falla.
Entregar: modificaciones en src/services/peliculas.ts y actualización de package.json.
```

Correcciones manuales realizadas: añadí manejo silencioso de errores (console.warn) y validé que guardar no bloquee el flujo de agregado; documenté la verificación manual en README.md.

### T11 - Rellenar pósters desde TMDB para películas existentes

Prompt:

```
Contexto: repo con spec.md y tasks.md. Tarea: T11 - Implementar en src/services/peliculas.ts una función que al inicializar intente buscar pósters en TMDB para las películas que no tengan `poster` y los guarde en AsyncStorage.
Requerimientos: usar la clave TMDB proporcionada; realizar búsquedas secuenciales con un pequeño retardo entre peticiones para evitar ratas; no bloquear el arranque de la app (ejecutar en background); guardar resultados en storage cuando se obtenga un poster.
Entregar: cambios en src/services/peliculas.ts y nota en README.md/PROCESO.md.
```

Correcciones manuales realizadas: agregué un retardo de 300ms entre peticiones y manejo silencioso de errores; documenté que la operación corre en background y que los posters persisten en AsyncStorage.

### Notas sobre manejo de claves (TMDB)

- Para evitar subir la API key al repositorio, movimos la clave a un archivo `.env` local (ver `.env.example`).
- Añadimos `app.config.js` que carga `.env` vía `dotenv` y expone `TMDB_API_KEY` en `Constants.expoConfig.extra` para que la app pueda leerlo en tiempo de ejecución.
- El código usa `src/config/tmdb.ts` que intenta leer `process.env.TMDB_API_KEY` y luego `Constants.expoConfig.extra.TMDB_API_KEY` como fallback.
- Instrucciones: copiar `.env.example` a `.env`, colocar la clave y reiniciar Expo (`npm run start`).

---

Registrar estos prompts y sus correcciones en `PROCESO.md` ayuda a demostrar el flujo SDD: prompt → generación → revisión humana → commit por tarea.

## Sesión 12 - Rediseño visual del catálogo

**Qué se pidió:** adaptar la aplicación para que tenga una estética similar a
On Point Samples, tomando como referencia su portada de catálogo: hero visual,
navegación oscura, tarjetas de contenido, secciones editoriales y acento de
color fuerte.

**Qué se hizo:**

- Se actualizó `src/app/tema.ts` con una paleta marfil, carbón y coral,
  nuevos radios y colores para superficies, texto y botones.
- Se rediseñó `src/app/components/Header.tsx` con marca TopFilms, subtítulo,
  navegación de catálogo y botón de tema.
- Se reorganizó `src/app/index.tsx` con hero destacado, buscador, filtros por
  género, carrusel de películas y enlaces de navegación.
- Se mantuvo la lógica existente del catálogo y las rutas de Expo Router.

**Correcciones manuales:** se conservaron las APIs del servicio y se evitó
copiar HTML o código de la página de referencia; solo se trasladaron ideas
visuales al contexto React Native.

**Commit:** `aaa2384 Mejore la estetica con un tema claro estilo tienda`.

## Sesión 13 - Tema claro y oscuro

**Qué se pidió:** incorporar modo claro y modo oscuro, dejando el modo claro
como opción predeterminada.

**Qué se hizo:**

- Se agregó `ProveedorTema` y `useTema` en `src/app/tema.ts`.
- El modo seleccionado se guarda en AsyncStorage con la clave
  `topfilms_modo_tema`.
- `src/app/_layout.tsx` aplica el proveedor a toda la navegación y cambia el
  estilo de la barra de estado.
- `Header.tsx`, `index.tsx`, `detalle/[id].tsx`, `agregar.tsx` y `acerca.tsx`
  consumen la paleta activa.

**Verificación:** `npx tsc --noEmit` sin errores. Se comprobó el cambio desde
el header y la persistencia al reiniciar la app.

**Commit:** `2f588be Agregue modo claro, modo oscuro y eliminación de películas`.

## Sesión 14 - Eliminación de películas

**Qué se pidió:** agregar la función fundamental para eliminar películas.

**Qué se hizo:**

- Se agregó `eliminarPelicula(id)` en `src/services/peliculas.ts`.
- La función actualiza la lista en memoria y persiste el resultado en
  AsyncStorage.
- La pantalla `src/app/detalle/[id].tsx` muestra un botón de eliminación con
  confirmación mediante `Alert` y vuelve al catálogo después de eliminar.

**Verificación:** TypeScript sin errores y revisión manual del flujo de
confirmar/cancelar eliminación.

## Sesión 15 - Adaptación responsive

**Qué se pidió:** adaptar la aplicación para PC, tablet y cualquier dispositivo
móvil.

**Qué se hizo:**

- `index.tsx` usa `useWindowDimensions` para ajustar hero, tipografías,
  tarjetas, espacios y ancho máximo del contenido.
- `detalle/[id].tsx` usa dos columnas en escritorio y apila póster e
  información en móviles; el bloque de información ocupa todo el ancho móvil
  para evitar texto comprimido.
- `agregar.tsx` incorpora scroll, `keyboardShouldPersistTaps` y un ancho
  máximo para escritorio.
- `acerca.tsx` incorpora scroll y limita el ancho de lectura.

**Problema encontrado:** en móvil el detalle heredaba `flex: 1` dentro de una
columna y el texto quedaba en una columna de letras. Se corrigió usando
`width: "100%"` y `flexShrink: 1` en el bloque de información móvil.

**Commit:** `af28cca Adapte las pantallas para PC y móviles`.

## Sesión 16 - Animaciones y corrección final del detalle móvil

**Qué se pidió:** corregir la vista móvil mostrada en la captura y agregar
animaciones para que la aplicación no se sintiera brusca.

**Qué se hizo:**

- Se creó `src/app/components/AnimatedReveal.tsx`, un componente reutilizable
  de entrada con opacidad y desplazamiento vertical.
- Se usa `useNativeDriver` para mantener la animación fluida.
- Se consulta `AccessibilityInfo.isReduceMotionEnabled()` y se reduce la
  animación cuando el sistema lo solicita.
- Se animan el hero y el contenido del catálogo, además de la ficha de detalle.
- Se corrigió definitivamente el layout móvil del detalle apilando el
  contenido y evitando que el texto se comprima.

**Verificación:** `npx tsc --noEmit` sin errores; `npm run lint` sin errores.
El lint mantiene siete warnings preexistentes relacionados con imports y
variables sin uso en `agregar.tsx` y `peliculas.ts`.

**Commit:** `c2178a9 Agregue animaciones y mejore el detalle en móviles`.

## Estado final de documentación

- Rama de trabajo: `felipedev`.
- Se verificó TypeScript antes de los commits visuales y responsive.
- No se hizo push automático.
- La fusión final a `main` se realiza después de documentar y validar este
  conjunto de cambios.
