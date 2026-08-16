# Tareas

Estado: [x] hecha - [ ] pendiente - [~] parcial

## T01 - Configuración del proyecto Expo
- [x] Proyecto creado con create-expo-app (template tabs)
- [x] Expo SDK 54, Expo Router, TypeScript estricto
- [x] Commit: "configuración del proyecto Expo"

## T02 - Mock de películas
- [x] Tipo Pelicula (id, titulo, genero, anio, descripcion)
- [x] 4 películas de ejemplo en memoria
- [x] obtenerPeliculas(), obtenerPelicula(id), agregarPelicula(datos)
- [x] Latencia simulada de 500 a 1000 ms con Promise + setTimeout
- [x] Commit: "T02 - Agregue el mock de peliculas"

## T03 - Listado de películas
- [x] Estructura movida a src/app y plantilla sin uso eliminada
- [x] FlatList con título, género y año
- [x] Estado de carga con ActivityIndicator
- [x] Estado vacío con mensaje
- [x] Verificado con npx tsc --noEmit
- [x] Commit: "T03 - Agregue el listado de peliculas"

## T04 - Menú / navegación
- [x] Stack raíz con rutas index, detalle/[id], agregar y acerca
- [x] Botones en el inicio hacia Agregar película y Acerca de
- [x] typedRoutes desactivada para poder verificar sin las pantallas restantes
- [x] Verificado con npx tsc --noEmit
- [x] Commit: "T04 - Agregue el menu de la aplicacion"

## T05 - Detalle de película
- [x] Pantalla src/app/detalle/[id].tsx usando obtenerPelicula(id)
- [x] Mostrar todos los campos de la película

## T06 - Formulario para agregar película
- [x] Pantalla src/app/agregar.tsx usando agregarPelicula()
- [x] Validación de campos (título, género, año, descripción)

## T07 - Pantalla Acerca de
- [x] Pantalla src/app/acerca.tsx con descripción de la app y autores

## T08 - Estados y navegación completa
- [ ] Probar carga y estado vacío en el dispositivo
- [ ] Probar navegación completa entre pantallas

## T09 - Persistencia local (AsyncStorage)
- [x] Implementar persistencia con `@react-native-async-storage/async-storage`
- [x] Guardar la lista tras agregar una película y cargarla al iniciar

## T10 - Pruebas y correcciones
- [ ] Revisión general del flujo
- [ ] Corrección de errores encontrados

## T11 - Documentación final
- [~] Documentación inicial creada (spec, plan, tasks, proceso, readme)
- [ ] Actualización final cuando estén todas las pantallas
