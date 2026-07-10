import { Movie, MovieDetails, Genre } from '@/types/movie';

// Todas as chamadas passam pelo proxy interno /api/tmdb (ver route.ts),
// então nenhuma chave de API circula no navegador.
async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const search = new URLSearchParams(params).toString();
  const res = await fetch(`/api/tmdb/${path}${search ? `?${search}` : ''}`);
  if (!res.ok) throw new Error(`Falha ao buscar dados do TMDB: ${path}`);
  return res.json();
}

export const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export function posterUrl(path: string | null, size: 'w342' | 'w500' = 'w342') {
  return path ? `${IMAGE_BASE}/${size}${path}` : '/placeholder-poster.svg';
}

export function backdropUrl(path: string | null, size: 'w780' | 'original' = 'w780') {
  return path ? `${IMAGE_BASE}/${size}${path}` : '/placeholder-poster.svg';
}

export async function getTrending() {
  const data = await tmdbFetch<{ results: Movie[] }>('trending/movie/week');
  return data.results;
}

export async function getGenres() {
  const data = await tmdbFetch<{ genres: Genre[] }>('genre/movie/list');
  return data.genres;
}

export async function getByGenre(genreId: number) {
  const data = await tmdbFetch<{ results: Movie[] }>('discover/movie', {
    with_genres: String(genreId),
    sort_by: 'popularity.desc',
  });
  return data.results;
}

export async function searchMovies(query: string) {
  const data = await tmdbFetch<{ results: Movie[] }>('search/movie', { query });
  return data.results;
}

export async function getMovieDetails(id: number) {
  return tmdbFetch<MovieDetails>(`movie/${id}`, { append_to_response: 'videos,credits,similar' });
}
