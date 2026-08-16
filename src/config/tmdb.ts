import Constants from 'expo-constants';

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// Si preferís la forma antigua (poner la clave directamente en el código),
// podés pegarla en la siguiente constante. POR SEGURIDAD no commitées una
// clave real en el repo público; esta opción es útil solo para desarrollo
// rápido en local.
const TMDB_KEY_INLINE: string | null = '4073df069aaf4849f2938aa6c03e2771'; // clave inline para dev local

export function getTmdbApiKey(): string | null {
  // 1) Si definiste `TMDB_KEY_INLINE` en este archivo lo usamos (rápido para dev local)
  if (TMDB_KEY_INLINE) return TMDB_KEY_INLINE;

  // 2) Preferir process.env (uso con dotenv + app.config.js)
  if (typeof process !== 'undefined' && (process.env as any).TMDB_API_KEY) {
    return (process.env as any).TMDB_API_KEY;
  }

  // 3) Expo runtime: leer desde app config extra (Constants.expoConfig o manifest)
  const expoKey = (Constants as any).expoConfig?.extra?.TMDB_API_KEY;
  if (expoKey) return expoKey;
  const legacy = (Constants as any).manifest?.extra?.TMDB_API_KEY;
  if (legacy) return legacy;

  return null;
}
