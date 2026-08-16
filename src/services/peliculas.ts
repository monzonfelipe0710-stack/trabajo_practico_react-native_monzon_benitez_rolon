import { getTmdbApiKey, TMDB_IMAGE_BASE } from "@/config/tmdb";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Pelicula = {
  id: string;
  titulo: string;
  genero: string;
  anio: number;
  descripcion: string;
  poster?: string | null;
};

const STORAGE_KEY = "peliculas_v1";

// TMDB configuration (API key provided by the team)
// TMDB image base is in config; API key read at runtime from config

let peliculas: Pelicula[] = [
  {
    id: "1",
    titulo: "Nueve Reinas",
    genero: "Thriller",
    anio: 2000,
    descripcion:
      "Dos estafadores porteños se cruzan en un golpe que parece demasiado bueno para ser verdad.",
    poster: null,
  },
  {
    id: "2",
    titulo: "Matrix",
    genero: "Ciencia ficción",
    anio: 1999,
    descripcion:
      "Un programador descubre que la realidad es una simulación y se une a la rebelión contra las máquinas.",
    poster: null,
  },
  {
    id: "3",
    titulo: "El Secreto de Sus Ojos",
    genero: "Suspenso",
    anio: 2009,
    descripcion:
      "Un jubilado decide escribir una novela sobre un caso de homicidio que investigó décadas atrás.",
    poster: null,
  },
  {
    id: "4",
    titulo: "Interstellar",
    genero: "Ciencia ficción",
    anio: 2014,
    descripcion:
      "Un grupo de exploradores viaja por un agujero de gusano buscando un nuevo hogar para la humanidad.",
    poster: null,
  },
];

function esperarLatencia(): Promise<void> {
  const milisegundos = 500 + Math.random() * 500;
  return new Promise((resolve) => setTimeout(resolve, milisegundos));
}

async function cargarDesdeStorage() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: Pelicula[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        peliculas = parsed;
      }
    }
  } catch (e) {
    // si falla, se usa el mock en memoria
    console.warn("No se pudo cargar películas desde AsyncStorage:", e);
  }
}

async function guardarEnStorage() {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(peliculas));
  } catch (e) {
    console.warn("No se pudo guardar películas en AsyncStorage:", e);
  }
}

// Intentar cargar desde storage al iniciar el módulo (no bloqueante)
cargarDesdeStorage();

// Después de cargar desde storage (o usar el mock), intentar obtener posters
// desde TMDB para las películas que no tengan poster. Ejecutamos esto de
// forma asíncrona y no bloqueante para no retrasar el arranque.
async function fetchPosterForMovie(p: Pelicula) {
  try {
    const key = getTmdbApiKey();
    if (!key) {
      console.warn(
        "TMDB API key not available; no poster search for",
        p.titulo,
      );
      return;
    }
    const q = encodeURIComponent(p.titulo);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${q}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn("TMDB search failed for", p.titulo, "status", res.status);
      return;
    }
    const data = await res.json();
    if (data && Array.isArray(data.results) && data.results.length > 0) {
      const first = data.results[0];
      if (first.poster_path) {
        p.poster = TMDB_IMAGE_BASE + first.poster_path;
        await guardarEnStorage();
      }
    }
  } catch (e) {
    // No interrumpir si falla la búsqueda de posters
    console.warn("No se pudo buscar póster para:", p.titulo, e);
  }
}

// Completar datos (overview, poster, genres, release year) usando TMDB
export async function completarDatosDesdeTMDB(p: Pelicula) {
  try {
    const key = getTmdbApiKey();
    if (!key) {
      console.warn(
        "TMDB API key not available; cannot completar datos para",
        p.titulo,
      );
      return;
    }

    // 1) buscar por título
    const q = encodeURIComponent(p.titulo);
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${q}`;
    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) {
      console.warn("TMDB search failed for", p.titulo, searchRes.status);
      return;
    }
    const searchData = await searchRes.json();
    if (
      !searchData ||
      !Array.isArray(searchData.results) ||
      searchData.results.length === 0
    )
      return;
    const first = searchData.results[0];

    // 2) obtener detalles por id para conseguir géneros con nombre y overview completo
    const movieId = first.id;
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`;
    const detailsRes = await fetch(detailsUrl);
    if (!detailsRes.ok) {
      console.warn(
        "TMDB details fetch failed for id",
        movieId,
        detailsRes.status,
      );
      return;
    }
    const details = await detailsRes.json();

    // actualizar campos en el objeto p
    if (details.poster_path) p.poster = TMDB_IMAGE_BASE + details.poster_path;
    if (details.overview) p.descripcion = details.overview;
    if (Array.isArray(details.genres) && details.genres.length > 0) {
      p.genero = details.genres.map((g: any) => g.name).join(", ");
    }
    if (details.release_date) {
      const year = new Date(details.release_date).getFullYear();
      if (!Number.isNaN(year)) p.anio = year;
    }

    await guardarEnStorage();
  } catch (e) {
    console.warn("Error completando datos desde TMDB para:", p.titulo, e);
  }
}

async function rellenarPostersIniciales() {
  // pequeña cola secuencial para evitar límites excesivos
  for (const p of peliculas) {
    if (!p.poster) {
      // respetar un pequeño retardo entre peticiones
      // (no usamos setTimeout con await directo para mantener orden)
      // 300ms es razonable para evitar picos muy fuertes
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 300));
      // eslint-disable-next-line no-await-in-loop
      await fetchPosterForMovie(p);
    }
  }
}

// Lanzar en background sin bloquear
cargarDesdeStorage().then(() => {
  rellenarPostersIniciales().catch((e) =>
    console.warn("Error rellenando posters:", e),
  );
});

export async function obtenerPeliculas(): Promise<Pelicula[]> {
  await esperarLatencia();
  return peliculas;
}

export async function obtenerPelicula(id: string): Promise<Pelicula | null> {
  await esperarLatencia();
  const encontrada = peliculas.find((p) => p.id === id);
  return encontrada ?? null;
}

export async function agregarPelicula(
  datos: Omit<Pelicula, "id">,
): Promise<Pelicula> {
  await esperarLatencia();
  const nueva: Pelicula = {
    ...datos,
    id: Date.now().toString(),
  };
  peliculas.push(nueva);
  // guardar la lista actualizada en storage (no bloquear al caller)
  guardarEnStorage();
  return nueva;
}

export async function eliminarPelicula(id: string): Promise<boolean> {
  await esperarLatencia();
  const cantidadInicial = peliculas.length;
  peliculas = peliculas.filter((pelicula) => pelicula.id !== id);
  if (peliculas.length === cantidadInicial) return false;
  await guardarEnStorage();
  return true;
}
