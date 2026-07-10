'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import { getTrending, getGenres, getByGenre, searchMovies } from '@/lib/tmdb';
import { listFavorites } from '@/lib/api';
import { Movie, Genre } from '@/types/movie';
import { useAuth } from '@/lib/auth-context';

// Gêneros de destaque exibidos como fileiras — escolhidos por serem os
// pilares clássicos de um catálogo (ação, comédia, terror, romance, animação).
const FEATURED_GENRE_NAMES = ['Ação', 'Comédia', 'Terror', 'Romance', 'Animação'];

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [rows, setRows] = useState<{ title: string; movies: Movie[] }[]>([]);
  const [favorites, setFavorites] = useState<Movie[] | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  useEffect(() => {
    async function load() {
      const [trendingData, genres] = await Promise.all([getTrending(), getGenres()]);
      setTrending(trendingData);

      const featured = genres.filter((g: Genre) => FEATURED_GENRE_NAMES.includes(g.name));
      const rowsData = await Promise.all(
        featured.map(async (genre: Genre) => ({
          title: genre.name,
          movies: await getByGenre(genre.id),
        })),
      );
      setRows(rowsData);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (view === 'favorites' && user) {
      listFavorites().then((data) =>
        setFavorites(
          data.map((f: any) => ({
            id: f.movieId,
            title: f.title,
            poster_path: f.posterUrl,
            backdrop_path: null,
            overview: '',
            vote_average: 0,
            release_date: '',
          })),
        ),
      );
    } else {
      setFavorites(null);
    }
  }, [view, user]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    setSearchResults(await searchMovies(query));
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-netflix-dark text-gray-400">
        Carregando catálogo…
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-netflix-dark pb-20">
      <Navbar />

      {view === 'favorites' ? (
        <div className="px-4 pt-28 md:px-12">
          <h1 className="mb-6 text-2xl font-semibold text-white">Minha lista</h1>
          {!user ? (
            <p className="text-gray-400">Entre na sua conta para ver seus favoritos.</p>
          ) : favorites && favorites.length ? (
            <MovieRow title="" movies={favorites} />
          ) : (
            <p className="text-gray-400">Você ainda não adicionou nenhum título à sua lista.</p>
          )}
        </div>
      ) : (
        <>
          {trending[0] && <Hero movie={trending[0]} />}

          <form onSubmit={handleSearch} className="px-4 pt-6 md:px-12">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar filmes…"
              className="w-full max-w-md rounded border border-white/20 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-netflix-red focus:outline-none"
            />
          </form>

          {searchResults ? (
            <MovieRow title={`Resultados para "${query}"`} movies={searchResults} />
          ) : (
            <>
              <MovieRow title="Em alta" movies={trending} />
              {rows.map((row) => (
                <MovieRow key={row.title} title={row.title} movies={row.movies} />
              ))}
            </>
          )}
        </>
      )}
    </main>
  );
}
