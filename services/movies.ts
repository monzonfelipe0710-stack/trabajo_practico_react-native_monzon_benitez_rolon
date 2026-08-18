export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  posterUrl: string;
  synopsis: string;
}

const movies: Movie[] = [
  {
    id: 1,
    title: 'Dune: Parte dos',
    genre: 'Ciencia ficción',
    year: 2024,
    posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Paul Atreides se enfrenta a un futuro épico mientras lidera una rebelión en un universo lleno de peligros.',
  },
  {
    id: 2,
    title: 'Oppenheimer',
    genre: 'Drama',
    year: 2023,
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    synopsis: 'La historia de J. Robert Oppenheimer y el impacto de la bomba atómica en la historia mundial.',
  },
  {
    id: 3,
    title: 'La La Land',
    genre: 'Musical',
    year: 2016,
    posterUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Una historia de amor y arte en Los Ángeles, donde la pasión por la música y el cine colisionan.',
  },
  {
    id: 4,
    title: 'Whiplash',
    genre: 'Drama musical',
    year: 2014,
    posterUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Un joven baterista se somete a la intensa disciplina de un legendario maestro con obsesión por la perfección.',
  },
  {
    id: 5,
    title: 'Interstellar',
    genre: 'Ciencia ficción',
    year: 2014,
    posterUrl: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Un equipo de exploradores atraviesa un agujero de gusano para encontrar un nuevo hogar para la humanidad.',
  },
  {
    id: 6,
    title: 'Spider-Man: Across the Spider-Verse',
    genre: 'Animación',
    year: 2023,
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Miles Morales se embarca en una aventura multiversal con otros Spider-Hombres y descubre más sobre sí mismo.',
  },
];

export const getMovies = async (): Promise<Movie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies);
    }, 800);
  });
};
