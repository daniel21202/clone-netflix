'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { posterUrl } from '@/lib/tmdb';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative w-[160px] flex-shrink-0 overflow-hidden rounded-md transition-transform duration-300 hover:z-10 hover:scale-110 md:w-[200px]"
    >
      <div className="relative aspect-[2/3] w-full bg-neutral-800">
        <Image
          src={posterUrl(movie.poster_path, 'w342')}
          alt={movie.title}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/0 to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-xs font-semibold text-white line-clamp-2">{movie.title}</p>
        <p className="text-[11px] text-green-400">★ {movie.vote_average.toFixed(1)}</p>
      </div>
    </Link>
  );
}
