'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 transition-colors duration-300 md:px-12 ${
        scrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="font-display text-3xl tracking-wide text-netflix-red">
          CATÁLOGO
        </Link>
        <div className="hidden gap-5 text-sm text-gray-200 md:flex">
          <Link href="/" className="hover:text-white">Início</Link>
          <Link href="/?view=favorites" className="hover:text-white">Minha lista</Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-gray-300 sm:inline">Olá, {user.name.split(' ')[0]}</span>
          <button
            onClick={logout}
            className="rounded border border-white/30 px-3 py-1.5 text-white transition hover:bg-white/10"
          >
            Sair
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="rounded bg-netflix-red px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Entrar
        </Link>
      )}
    </nav>
  );
}
