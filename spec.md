# Especificación - Catálogo de Películas

## Descripción general

Aplicación móvil de catálogo de películas desarrollada como trabajo práctico.
Permite ver un listado de películas, entrar al detalle de cada una y agregar
películas nuevas mediante un formulario. Los datos provienen de un mock local,
sin backend real.

## Tecnologías

- React Native
- Expo (SDK 54)
- Expo Router (navegación basada en archivos)
- TypeScript
- Datos mock (funciones async con latencia simulada)
- Compatible con Expo Go

## Modelo de datos

```ts
type Pelicula = {
    id: string;
    titulo: string;
    genero: string;
    anio: number;
    descripcion: string;
};
```

## Pantallas

| Ruta | Pantalla | Estado |
|---|---|---|
| `/` | Listado de películas | Implementada |
| `/detalle/[id]` | Detalle de una película | Implementada |
| `/agregar` | Formulario para agregar película | Implementada |
| `/acerca` | Acerca de la aplicación | Implementada |

## Requisitos funcionales

1. El listado obtiene las películas desde el servicio mock (`obtenerPeliculas()`).
2. El listado muestra título, género y año de cada película.
3. Mientras llegan los datos se muestra un estado de carga (ActivityIndicator).
4. Si no hay películas, se muestra un mensaje de estado vacío.
5. La pantalla de detalle muestra todos los datos de una película (`obtenerPelicula(id)`).
6. El formulario permite agregar una película (`agregarPelicula()`) con validación de campos.
7. La pantalla Acerca describe la aplicación y sus autores.
8. (Opcional) Persistencia local: las películas agregadas se guardan en `AsyncStorage` y se cargan al iniciar.

## Requisitos técnicos

- Navegación con Expo Router (Stack).
- Las funciones del mock simulan latencia de entre 500 y 1000 ms usando
  Promise + setTimeout.
- Sin backend real ni librerías externas innecesarias.
- Código simple y explicable oralmente (dos integrantes deben poder
  defenderlo línea por línea).

## Fuera de alcance

- Backend, base de datos o autenticación reales.
- Persistencia de datos entre sesiones: implementada con `AsyncStorage`.
- Funcionalidades no pedidas en la consigna.
