import { NextRequest, NextResponse } from 'next/server';

// Proxy server-side para o TMDB: a chave da API nunca é exposta ao navegador.
// O frontend chama sempre /api/tmdb/... e este handler repassa para a API real.
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: 'TMDB_API_KEY não configurada no .env.local do frontend' },
      { status: 500 },
    );
  }

  const path = params.path.join('/');
  const searchParams = new URLSearchParams(req.nextUrl.searchParams);
  searchParams.set('api_key', apiKey);
  searchParams.set('language', 'pt-BR');

  const url = `${TMDB_BASE_URL}/${path}?${searchParams.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 * 30 } });
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
