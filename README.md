# Catálogo de Películas

Trabajo práctico de React Native: aplicación de catálogo de películas con
listado, detalle, formulario de alta y pantalla "Acerca de". Los datos son
mock locales, sin backend. Se agregó persistencia local opcional con
`AsyncStorage` para que las películas creadas se mantengan entre sesiones.

## Tecnologías (no-op placeholder)

- React Native + Expo (SDK 54)
- Expo Router (navegación)
- TypeScript
- Datos mock con latencia simulada (500 a 1000 ms)
- Persistencia local: `@react-native-async-storage/async-storage`

## Cómo ejecutar

1. Instalar dependencias (incluye `@react-native-async-storage/async-storage`):

   ```bash
   npm install
   # o
   yarn
   ```

2. Configurar la clave de TMDB (no subir `.env` al repo):

   - Copiar `.env.example` a `.env` y pegar tu clave:

     ```bash
     cp .env.example .env
     # editar .env y añadir TMDB_API_KEY=tu_clave_aqui
     ```

   - `app.config.js` está incluido para inyectar `TMDB_API_KEY` en `Constants.expoConfig.extra`.
   - Instalá `dotenv` si no se instaló: `npm install` (ya está en `package.json`).

Opciones para no volver a escribir la clave en cada ejecución:

- Opción A — Crear `.env` una sola vez (recomendado): copiar `.env.example` a `.env` y pegar la clave. El script `scripts/start-with-env.sh` carga `.env` automáticamente. Usalo así:

   ```bash
   npm run start:env
   ```

- Opción B — Definir la variable permanentemente en Fish (tu shell actual): añadí esta línea a `~/.config/fish/config.fish`:

   ```fish
   set -x TMDB_API_KEY "tu_clave_aqui"
   ```

- Opción C — Definir la variable permanentemente en Bash/zsh: añadir al `~/.bashrc` o `~/.zshrc`:

   ```bash
   export TMDB_API_KEY="tu_clave_aqui"
   ```

Con cualquiera de estas opciones la app tomará la clave sin que la tengas que ingresar cada vez.

2. Verificar TypeScript:

   ```bash
   npx tsc --noEmit
   ```

3. Iniciar el proyecto:

   ```bash
   npm run start
   # o
   npx expo start
   ```

4. Probar en Expo Go: escanear el QR o usar el emulador. (no-op placeholder)

## Estructura

```
src/
├── app/            pantallas (Expo Router)
│   ├── _layout.tsx     navegación (Stack)
│   ├── index.tsx       listado de películas
│   ├── agregar.tsx     formulario (implementado)
│   ├── acerca.tsx      acerca de (implementado)
│   └── detalle/
│       └── [id].tsx    detalle (implementado)
└── services/
    └── peliculas.ts    mock de películas + persistencia AsyncStorage
```

## Estado del proyecto

| Tarea | Estado |
|---|---|
| Configuración inicial | hecha |
| Mock de películas | hecha |
| Listado de películas | hecha |
| Menú / navegación | hecha |
| Detalle de película | hecha |
| Formulario de película | hecha |
| Pantalla Acerca de | hecha |
| Persistencia (AsyncStorage) | hecha |
| Pruebas y correcciones | pendiente |

Más detalle en [spec.md](spec.md), [plan.md](plan.md), [tasks.md](tasks.md)
y [PROCESO.md](PROCESO.md).

## Equipo

Monzón - Benítez - Rolón
