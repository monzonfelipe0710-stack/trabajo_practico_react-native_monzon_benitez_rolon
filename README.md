# Catálogo de Películas

Trabajo práctico de React Native: aplicación de catálogo de películas con
listado, detalle, formulario de alta y pantalla "Acerca de". Los datos son
mock locales, sin backend.

## Tecnologías

- React Native + Expo (SDK 54)
- Expo Router (navegación)
- TypeScript
- Datos mock con latencia simulada (500 a 1000 ms)

## Cómo ejecutar

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar el proyecto:

   ```bash
   npx expo start
   ```

3. Escanear el QR con la app **Expo Go** en un celular, o abrir en emulador.

## Estructura

```
src/
├── app/            pantallas (Expo Router)
│   ├── _layout.tsx     navegación (Stack)
│   ├── index.tsx       listado de películas
│   ├── agregar.tsx     formulario (pendiente)
│   ├── acerca.tsx      acerca de (pendiente)
│   └── detalle/
│       └── [id].tsx    detalle (pendiente)
└── services/
    └── peliculas.ts    mock de películas
```

## Estado del proyecto

| Tarea | Estado |
|---|---|
| Configuración inicial | hecha |
| Mock de películas | hecha |
| Listado de películas | hecha |
| Menú / navegación | hecha |
| Detalle de película | pendiente |
| Formulario de película | pendiente |
| Pantalla Acerca de | pendiente |
| Pruebas y correcciones | pendiente |

Más detalle en [spec.md](spec.md), [plan.md](plan.md), [tasks.md](tasks.md)
y [PROCESO.md](PROCESO.md).

## Equipo

Monzón - Benítez - Rolón
