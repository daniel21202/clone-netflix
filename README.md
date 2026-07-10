# Catálogo estilo Netflix

Projeto **frontend-only em Next.js + Tailwind**, consumindo dados reais do **TMDB** e usando o
**Supabase** como backend (autenticação + banco de dados Postgres).

```
netflix-clone/
├── supabase/    → schema.sql (tabela de favoritos + Row Level Security)
└── frontend/    → Next.js (interface estilo Netflix, autenticação e favoritos via Supabase)
```

## Passo a passo rápido

### 1. Crie um projeto no Supabase
Acesse https://supabase.com/ → **New project**. Depois de criado:
- Vá em **Settings → API** e copie a **Project URL** e a **anon public key**.
- Vá em **SQL Editor**, cole o conteúdo de `supabase/schema.sql` e rode. Isso cria a tabela
  `favorites` com as policies de RLS (cada usuário só vê os próprios favoritos).
- (Opcional) Em **Authentication → Providers**, confirme que o login por e-mail/senha está
  habilitado (vem habilitado por padrão).

### 2. Pegue uma chave gratuita do TMDB
Crie uma conta em https://www.themoviedb.org/ → Configurações → API → "API Key (v3 auth)".

### 3. Frontend
```bash
cd frontend
cp .env.local.example .env.local
# edite o .env.local: TMDB_API_KEY, NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```
Sobe em `http://localhost:3000`.

## O que já vem pronto

- **Tela inicial** com banner (hero), busca e fileiras de filmes por gênero (Ação, Comédia, Terror, Romance, Animação), estilo Netflix.
- **Página de detalhes** do filme com trailer, elenco e títulos parecidos.
- **Login / Cadastro** de usuário via **Supabase Auth** (e-mail e senha).
- **Minha lista**: adicionar/remover favoritos, salvos na tabela `favorites` do Supabase (Postgres), protegida por Row Level Security.
- **Proxy server-side do TMDB** (`src/app/api/tmdb`), para a chave da API nunca ser exposta ao navegador.

## Próximos passos sugeridos

- Trocar a busca "client-side" por um debounce, se quiser resultados enquanto o usuário digita.
- Adicionar paginação nas fileiras de gênero.
- Adicionar login social (Google/GitHub) usando os providers do Supabase Auth.
- Fazer o deploy: frontend na Vercel (o Supabase já é hospedado/gerenciado).
