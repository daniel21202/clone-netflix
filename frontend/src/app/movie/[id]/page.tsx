'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import MovieRow from '@/components/MovieRow';
import { getMovieDetails, backdropUrl } from '@/lib/tmdb';
import { addFavorite, removeFavorite, listFavorites } from '@/lib/api';
import { MovieDetails } from '@/types/movie';
import { useAuth } from '@/lib/auth-context';

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [savingFavorite, setSavingFavorite] = useState(false);

  useEffect(() => {
    getMovieDetails(Number(id)).then(setMovie);
  }, [id]);

  useEffect(() => {
    if (user) {
      listFavorites().then((favs: any[]) =>
        setIsFavorite(favs.some((f) => f.movieId === Number(id))),
      );
    }
  }, [user, id]);

  async function toggleFavorite() {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!movie) return;
    setSavingFavorite(true);
    try {
      if (isFavorite) {
        await removeFavorite(movie.id);
        setIsFavorite(false);
      } else {
        await addFavorite(movie.id, movie.title, movie.poster_path ?? undefined);
        setIsFavorite(true);
      }
    } finally {
      setSavingFavorite(false);
    }
  }

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-netflix-dark text-gray-400">
        Carregando…
      </div>
    );
  }

  const trailer = movie.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const cast = movie.credits?.cast.slice(0, 6) ?? [];

  return (
    <main className="min-h-screen bg-netflix-dark pb-20 text-white">
      <Navbar />

      <section className="relative h-[60vh] w-full">
        <Image
          src={backdropUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/40 to-transparent" />
      </section>

      <div className="-mt-24 px-4 md:px-12">
        <h1 className="font-display text-4xl tracking-wide md:text-6xl">{movie.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-300">
          <span className="font-semibold text-green-400">★ {movie.vote_average.toFixed(1)}</span>
          <span>{movie.release_date?.slice(0, 4)}</span>
          {movie.runtime ? <span>{movie.runtime} min</span> : null}
          <span>{movie.genres?.map((g) => g.name).join(', ')}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded bg-white px-6 py-2.5 font-semibold text-black transition hover:bg-white/85"
            >
              ▶ Assistir trailer
            </a>
          )}
          <button
            onClick={toggleFavorite}
            disabled={savingFavorite}
            className="flex items-center gap-2 rounded bg-white/20 px-6 py-2.5 font-semibold text-white backdrop-blur transition hover:bg-white/30 disabled:opacity-60"
          >
            {isFavorite ? '✓ Na minha lista' : '+ Minha lista'}
          </button>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-200 md:text-base">
          {movie.overview}
        </p>

        {cast.length > 0 && (
          <p className="mt-4 text-sm text-gray-400">
            <span className="text-gray-500">Elenco: </span>
            {cast.map((c) => c.name).join(', ')}
          </p>
        )}
      </div>

      {movie.similar?.results?.length ? (
        <div className="mt-10">
          <MovieRow title="Títulos parecidos" movies={movie.similar.results} />
        </div>
      ) : null}
    </main>
  );
}
