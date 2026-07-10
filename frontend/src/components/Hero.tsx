'use client';

import Link from 'next/link';
import { Movie } from '@/types/movie';
import { backdropUrl } from '@/lib/tmdb';

export default function Hero({ movie }: { movie: Movie }) {
  return (
    <section className="relative flex h-[85vh] w-full items-end text-white">
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{ backgroundImage: `url(${backdropUrl(movie.backdrop_path, 'original')})` }}
      />
      {/* Camadas de gradiente: a "assinatura" visual que dá profundidade ao pôster,
          igual à leitura de catálogo do Netflix (texto sempre legível sobre a imagem). */}
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-dark/90 via-netflix-dark/10 to-transparent" />

      <div className="relative z-10 max-w-2xl px-4 pb-24 md:px-12">
        <h1 className="font-display text-5xl leading-tight tracking-wide md:text-7xl">
          {movie.title}
        </h1>
        <p className="mt-4 line-clamp-3 text-sm text-gray-200 md:text-base">{movie.overview}</p>
        <div className="mt-6 flex gap-3">
          <Link
            href={`/movie/${movie.id}`}
            className="flex items-center gap-2 rounded bg-white px-6 py-2.5 font-semibold text-black transition hover:bg-white/85"
          >
            ▶ Assistir
          </Link>
          <Link
            href={`/movie/${movie.id}`}
            className="flex items-center gap-2 rounded bg-white/20 px-6 py-2.5 font-semibold text-white backdrop-blur transition hover:bg-white/30"
          >
            ℹ Mais informações
          </Link>
        </div>
      </div>
    </section>
  );
}
