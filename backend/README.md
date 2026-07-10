# Backend — Netflix Clone (NestJS + Arquitetura Hexagonal + MySQL)

## Estrutura (Arquitetura Hexagonal)

```
src/modules/<nome>/
  domain/             # Regras de negócio e contratos (não depende de nada externo)
    entities/          # Modelos puros (ex: user.entity.ts)
    ports/              # Contratos exigidos pelo domínio (ex: users.repository.ts)
  application/         # Casos de uso e DTOs
    use-cases/          # Orquestração da regra de negócio
    dto/                # Estruturas de entrada
  infrastructure/       # Adapters de infraestrutura
    prisma/              # Implementação concreta dos repositórios
    mappers/             # Conversores DB <-> Entity
  presentation/         # Adapters de apresentação
    controllers/         # Endpoints REST
```

Módulos implementados: `users`, `auth` (JWT), `movies` (proxy TMDB), `favorites`.

## Como rodar

1. Suba um MySQL local (ou use Docker: `docker run --name mysql-netflix -e MYSQL_ROOT_PASSWORD=senha -e MYSQL_DATABASE=netflix_clone -p 3306:3306 -d mysql:8`).
2. Copie `.env.example` para `.env` e ajuste `DATABASE_URL`, `JWT_SECRET` e `TMDB_API_KEY` (pegue sua chave grátis em https://www.themoviedb.org/settings/api).
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode a migration do Prisma (cria as tabelas `users` e `favorites`):
   ```bash
   npm run prisma:migrate
   ```
5. Suba o servidor:
   ```bash
   npm run start:dev
   ```

A API sobe em `http://localhost:3001/api`.

## Endpoints principais

- `POST /api/auth/register` — `{ name, email, password }`
- `POST /api/auth/login` — `{ email, password }`
- `GET /api/users/:id` — (requer `Authorization: Bearer <token>`)
- `GET /api/movies/trending`
- `GET /api/movies/by-genre/:genreId`
- `GET /api/movies/search?q=...`
- `GET /api/movies/:id`
- `GET /api/favorites` — (autenticado)
- `POST /api/favorites` — `{ movieId, title, posterUrl }` (autenticado)
- `DELETE /api/favorites/:movieId` — (autenticado)
