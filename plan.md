# Plan de trabajo

## Metodología

- Se trabaja por tareas numeradas (T01 a T10).
- Una tarea = un commit, con mensaje en español que describe el cambio real.
- Antes de cada commit se revisa `git status` y se verifica TypeScript
  (`npx tsc --noEmit`).
- Rama de trabajo del equipo: `felipedev`.

## Tecnologías elegidas

- Expo SDK 54 con Expo Router: navegación simple basada en archivos,
  compatible con Expo Go.
- TypeScript en modo estricto.
- Mock propio en un servicio (`src/services/peliculas.ts`): no hace falta
  ninguna librería externa.

## Estructura de carpetas

```
src/
├── app/            pantallas (Expo Router)
│   ├── _layout.tsx     Stack raíz con las rutas registradas
│   ├── index.tsx       listado de películas
│   ├── agregar.tsx     formulario (pendiente)
│   ├── acerca.tsx      acerca de (pendiente)
│   └── detalle/
│       └── [id].tsx    detalle (pendiente)
└── services/
    └── peliculas.ts    mock de películas
```

## Reparto de tareas

- Configuración inicial y mock de películas: Felipe.
- Listado de películas y menú/navegación: otro integrante.
- Detalle, formulario y Acerca: resto del equipo (pendiente).
- Pruebas, correcciones y documentación final: todo el equipo.

## Decisiones tomadas

1. Se movió `app/` a `src/app/` para cumplir la estructura pedida
   (Expo Router la detecta automáticamente).
2. Se eliminaron los archivos de ejemplo de la plantilla de Expo
   (tabs, modal, componentes sin uso).
3. Alias de imports `@/*` apuntando a `./src/*`.
4. Se desactivó `typedRoutes`: con esa opción TypeScript exigía que las
   rutas `/agregar` y `/acerca` ya existieran, y las hacen otros
   integrantes. Al desactivarla se puede verificar el código con tsc
   aunque falten pantallas.
5. El mock usa una lista en memoria; agregar una película la mantiene
   visible hasta cerrar la app (no hay persistencia, no está pedida).

## Riesgos considerados

- Conflictos de merge entre integrantes: se acordó quién crea cada archivo
  para tocar cada uno solo su parte.
- Rutas registradas sin pantalla: mientras existan, navegar a ellas muestra
  error en desarrollo; se resuelve cuando se creen las pantallas.
