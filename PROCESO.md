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
la plantilla sin uso y ajustar el alias @/* a ./src/*.

**Qué se generó:**
- src/app/index.tsx: listado con useEffect + obtenerPeliculas(),
  ActivityIndicator durante la carga, mensaje si no hay películas y
  FlatList con tarjetas.
- src/app/_layout.tsx: Stack con las cuatro rutas registradas.
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
- Pendientes: T05 (detalle), T06 (formulario), T07 (acerca),
  T08 (pruebas de estados y navegación), T09 (correcciones),
  T10 (actualización final de esta documentación).
