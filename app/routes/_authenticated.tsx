import { useState, useEffect } from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getSupabaseBrowserClient } from '~/lib/supabase/client';
import { AppNav } from '~/components/layout/AppNav';
import { GlobalSearchModal } from '~/components/layout/GlobalSearchModal';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    // 1. Checagem em ambiente cliente de credencial do Modo Demonstração
    if (typeof window !== 'undefined') {
      const demo = sessionStorage.getItem('unipds_demo_session');
      if (demo) {
        return { user: JSON.parse(demo).user, isDemo: true };
      }
    }

    // 2. Validação rigorosa via supabase.auth.getUser()
    const supabase = getSupabaseBrowserClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      throw redirect({
        to: '/auth',
        search: { redirect: location.href },
      });
    }

    return { user, isDemo: false };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email?: string; isDemo?: boolean }>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const demo = sessionStorage.getItem('unipds_demo_session');
      if (demo) {
        const parsed = JSON.parse(demo);
        setCurrentUser({ email: parsed.user.email, isDemo: true });
        return;
      }
      const supabase = getSupabaseBrowserClient();
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          setCurrentUser({ email: data.user.email, isDemo: false });
        }
      });
    }
  }, []);

  // Atalho global de teclado para pesquisa rápida: Ctrl + K / Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-zinc-100 flex flex-col antialiased">
      <AppNav
        onOpenSearch={() => setSearchOpen(true)}
        userEmail={currentUser.email}
        isDemo={currentUser.isDemo}
      />

      <main className="flex-1 flex overflow-hidden">
        <Outlet />
      </main>

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}
