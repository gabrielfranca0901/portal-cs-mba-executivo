import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { 
  BookOpen, 
  Activity, 
  Calculator,
  Search, 
  LogOut, 
  Command, 
  GraduationCap,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { getSupabaseBrowserClient } from '~/lib/supabase/client';
import { toast } from 'sonner';

interface AppNavProps {
  onOpenSearch: () => void;
  userEmail?: string;
  isDemo?: boolean;
}

export function AppNav({ onOpenSearch, userEmail, isDemo }: AppNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const supabase = getSupabaseBrowserClient();

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('unipds_demo_session');
      }
      await supabase.auth.signOut();
      toast.info('Sessão encerrada com sucesso.');
      navigate({ to: '/auth' });
    } catch {
      window.location.href = '/auth';
    }
  };

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-neutral-800 bg-[#18181b]/95 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between">
      {/* Esquerda: Identidade Visual MBA Executivo */}
      <div className="flex items-center gap-6">
        <Link to="/portal" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
                CS & Operações
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                MBA Executivo
              </span>
              {isDemo && (
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Demo
                </span>
              )}
            </div>
            <span className="block text-[10px] text-zinc-400 leading-none">Versão 2.0 | 2026</span>
          </div>
        </Link>

        {/* Abas Principais de Navegação: Base POP, Guia de Saúde & Calculadora */}
        <nav className="flex items-center gap-1 bg-[#121212] p-1 rounded-lg border border-neutral-800">
          <Link
            to="/portal"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              location.pathname.startsWith('/portal')
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Base POP CS</span>
            <span className="sm:hidden">POP</span>
          </Link>

          <Link
            to="/guia"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              location.pathname.startsWith('/guia')
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guia & Health Score</span>
            <span className="sm:hidden">Saúde</span>
          </Link>

          <Link
            to="/calculadora-cancelamento"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              location.pathname.startsWith('/calculadora-cancelamento')
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Calculadora Rescisão</span>
            <span className="sm:hidden">Rescisão</span>
          </Link>
        </nav>
      </div>

      {/* Direita: Busca rápida (Ctrl+K) + Dados do Analista + Logout */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121212] border border-neutral-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 text-xs transition-colors cursor-pointer group"
          title="Pesquisa rápida na Base de Conhecimento (Ctrl + K)"
        >
          <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
          <span className="hidden sm:inline">Pesquisa rápida...</span>
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-400 font-mono">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        <div className="h-4 w-px bg-neutral-800" />

        {/* Status do CSM Conectado */}
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse" />
          <div className="hidden md:flex flex-col text-left">
            <span className="font-medium text-xs text-zinc-200 truncate max-w-[150px]">
              {userEmail ? userEmail.split('@')[0] : 'CSM Executivo'}
            </span>
            <span className="text-[10px] text-zinc-500">Operações MBA</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          title="Encerrar Sessão do CSM"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
