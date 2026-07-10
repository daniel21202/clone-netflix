-- Schema do Supabase para o Catálogo estilo Netflix.
-- Rode este arquivo no SQL Editor do painel do Supabase (ou via `supabase db push`).
--
-- Autenticação: usamos o Supabase Auth (tabela auth.users) em vez de uma
-- tabela "users" própria. Nome e avatar do usuário ficam em user_metadata
-- (veja lib/auth-context.tsx no frontend).

create table if not exists public.favorites (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  movie_id   integer not null,
  title      text not null,
  poster_url text,
  created_at timestamptz not null default now(),

  unique (user_id, movie_id)
);

create index if not exists favorites_user_id_idx on public.favorites (user_id);

-- Row Level Security: cada usuário só pode ler/escrever os próprios favoritos.
alter table public.favorites enable row level security;

create policy "Usuários podem ver seus próprios favoritos"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir seus próprios favoritos"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem remover seus próprios favoritos"
  on public.favorites for delete
  using (auth.uid() = user_id);
