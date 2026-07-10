'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-900 via-netflix-dark to-black px-4">
      <div className="absolute inset-0 bg-black/70" />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-md bg-black/80 p-10 text-white"
      >
        <Link href="/" className="mb-6 block font-display text-3xl text-netflix-red">
          CATÁLOGO
        </Link>
        <h1 className="mb-6 text-2xl font-semibold">Entrar</h1>

        {error && <p className="mb-4 rounded bg-yellow-900/40 px-3 py-2 text-sm text-yellow-300">{error}</p>}

        <input
          type="email"
          required
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded bg-neutral-800 px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
        />
        <input
          type="password"
          required
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded bg-neutral-800 px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-netflix-red"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-netflix-red py-3 font-semibold transition hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>

        <p className="mt-6 text-sm text-gray-400">
          Novo por aqui?{' '}
          <Link href="/register" className="text-white hover:underline">
            Crie sua conta agora
          </Link>
          .
        </p>
      </form>
    </main>
  );
}
