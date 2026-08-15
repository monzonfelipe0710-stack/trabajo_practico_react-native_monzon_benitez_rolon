export type Pelicula = {
  id: string;
  titulo: string;
  genero: string;
  anio: number;
  descripcion: string;
};

let peliculas: Pelicula[] = [
  {
    id: "1",
    titulo: "Nueve Reinas",
    genero: "Thriller",
    anio: 2000,
    descripcion:
      "Dos estafadores porteños se cruzan en un golpe que parece demasiado bueno para ser verdad.",
  },
  {
    id: "2",
    titulo: "Matrix",
    genero: "Ciencia ficción",
    anio: 1999,
    descripcion:
      "Un programador descubre que la realidad es una simulación y se une a la rebelión contra las máquinas.",
  },
  {
    id: "3",
    titulo: "El Secreto de Sus Ojos",
    genero: "Suspenso",
    anio: 2009,
    descripcion:
      "Un jubilado decide escribir una novela sobre un caso de homicidio que investigó décadas atrás.",
  },
  {
    id: "4",
    titulo: "Interstellar",
    genero: "Ciencia ficción",
    anio: 2014,
    descripcion:
      "Un grupo de exploradores viaja por un agujero de gusano buscando un nuevo hogar para la humanidad.",
  },
];

function esperarLatencia(): Promise<void> {
  const milisegundos = 500 + Math.random() * 500;
  return new Promise((resolve) => setTimeout(resolve, milisegundos));
}

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
  datos: Omit<Pelicula, "id">
): Promise<Pelicula> {
  await esperarLatencia();
  const nueva: Pelicula = {
    ...datos,
    id: Date.now().toString(),
  };
  peliculas.push(nueva);
  return nueva;
}
