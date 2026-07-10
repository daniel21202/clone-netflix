import { supabase } from './supabase';

// Camada de acesso a dados que antes falava com o backend NestJS.
// Agora os favoritos são lidos/gravados diretamente no Postgres do Supabase,
// protegidos por Row Level Security (cada usuário só enxerga os próprios registros).

export interface FavoriteRecord {
  movieId: number;
  title: string;
  posterUrl: string | null;
}

function mapRow(row: { movie_id: number; title: string; poster_url: string | null }): FavoriteRecord {
  return { movieId: row.movie_id, title: row.title, posterUrl: row.poster_url };
}

export async function listFavorites(): Promise<FavoriteRecord[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('movie_id, title, poster_url')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRow);
}

export async function addFavorite(movieId: number, title: string, posterUrl?: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Você precisa estar logado para favoritar.');

  const { error } = await supabase
    .from('favorites')
    .upsert(
      { user_id: user.id, movie_id: movieId, title, poster_url: posterUrl ?? null },
      { onConflict: 'user_id,movie_id' },
    );

  if (error) throw new Error(error.message);
}

export async function removeFavorite(movieId: number): Promise<void> {
  const { error } = await supabase.from('favorites').delete().eq('movie_id', movieId);
  if (error) throw new Error(error.message);
}
