'use client';

import { useRef } from 'react';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

export default function MovieRow({ title, movies }: { title: string; movies: Movie[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.9;
    rowRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  if (!movies?.length) return null;

  return (
    <section className="relative px-4 py-3 md:px-12">
      <h2 className="mb-2 text-lg font-semibold text-gray-100 md:text-xl">{title}</h2>

      <div className="group/row relative">
        <button
          aria-label={`Rolar ${title} para a esquerda`}
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 z-20 hidden h-full w-10 items-center justify-center bg-black/40 text-2xl text-white opacity-0 transition group-hover/row:opacity-100 md:flex hover:bg-black/60"
        >
          ‹
        </button>

        <div ref={rowRef} className="hide-scrollbar flex gap-2 overflow-x-scroll scroll-smooth py-2">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          aria-label={`Rolar ${title} para a direita`}
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 z-20 hidden h-full w-10 items-center justify-center bg-black/40 text-2xl text-white opacity-0 transition group-hover/row:opacity-100 md:flex hover:bg-black/60"
        >
          ›
        </button>
      </div>
    </section>
  );
}
