export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids?: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  videos?: { results: { key: string; site: string; type: string }[] };
  credits?: { cast: { id: number; name: string }[] };
  similar?: { results: Movie[] };
}
