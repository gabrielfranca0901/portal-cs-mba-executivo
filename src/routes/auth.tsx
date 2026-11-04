import { useState, useEffect } from 'react';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { getSupabaseBrowserClient } from '~/lib/supabase/client';
import { checkAccountExists } from '~/server/auth';
import { toast } from 'sonner';
import { 
  LogIn, 
  KeyRound, 
  Sparkles, 
  AlertCircle, 
  ArrowLeft,
  GraduationCap,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

interface AuthSearchParams {
  mode?: 'login' | 'forgot_password' | 'reset_password';
  redirect?: string;
}

export const Route = createFileRoute('/auth')({
  validateSearch: (search: Record<string, unknown>): AuthSearchParams => {
    return {
      mode: (search.mode as AuthSearchParams['mode']) || 'login',
      redirect: (search.redirect as string) || '/portal',
    };
  },
  component: AuthPage,
});

function AuthPage() {
  const search = useSearch({ from: '/auth' });
  const [mode, setMode] = useState<'login' | 'forgot_password' | 'reset_password'>(
    search.mode || 'login'
  );

  const [email, setEmail] = useState('csm.executivo@mba.edu.br');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const supabase = getSupabaseBrowserClient();

  // Se o analista já possuir sessão ativa, direciona imediatamente para o portal
  useEffect(() => {
    const checkActiveSession = async () => {
      const demo = sessionStorage.getItem('unipds_demo_session');
      if (demo) {
        navigate({ to: '/portal' });
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate({ to: '/portal' });
      }
    };
    checkActiveSession();
  }, [supabase, navigate]);

  // Sub-modo 1: Login com Sanitização e Server Function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = email.trim().toLowerCase();

    if (!sanitizedEmail || !password) {
      toast.error('Informe o e-mail corporativo do CSM e a senha cadastrada.');
      return;
    }

    setLoading(true);
    try {
      // 1. Validação no Servidor via Server Function
      const checkResult = await checkAccountExists({ data: sanitizedEmail });
      if (!checkResult.exists) {
        toast.error(checkResult.message || 'Conta não localizada no diretório do MBA Executivo.');
        setLoading(false);
        return;
      }

      // 2. Autenticação no Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password,
      });

      if (error) {
        if (sanitizedEmail.includes('demo') || sanitizedEmail.includes('csm') || error.message.includes('Invalid login credentials')) {
          toast.warning('Credenciais não localizadas no banco. Utilize o "Modo Demonstração" de CSM abaixo para acesso imediato.');
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.session) {
        toast.success('Autenticação confirmada com sucesso!', {
          description: `Sessão iniciada para: ${data.user.email?.split('@')[0]}`,
        });
        navigate({ to: search.redirect || '/portal' });
      }
    } catch {
      toast.error('Ocorreu uma falha de conexão com os servidores de autenticação.');
    } finally {
      setLoading(false);
    }
  };

  // Sub-modo 2: Esqueci Minha Senha
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = email.trim().toLowerCase();

    if (!sanitizedEmail) {
      toast.error('Informe o e-mail corporativo institucional.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
        redirectTo: `${window.location.origin}/auth?mode=reset_password`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Instruções de recuperação encaminhadas!', {
          description: 'Acesse sua caixa postal corporativa para redefinir o acesso.',
        });
        setMode('login');
      }
    } catch {
      toast.error('Não foi possível processar a recuperação de senha no momento.');
    } finally {
      setLoading(false);
    }
  };

  // Sub-modo 3: Redefinição de Senha
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error('A nova credencial deve possuir no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Credencial atualizada com sucesso!', {
          description: 'Você já pode realizar a autenticação utilizando a nova senha.',
        });
        setMode('login');
      }
    } catch {
      toast.error('Falha ao atualizar a credencial.');
    } finally {
      setLoading(false);
    }
  };

  // Modo Demo: Bypass Operacional de CSM para Homologação Rápida
  const handleDemoBypass = () => {
    const demoUser = {
      id: 'csm-mba-executivo-demo',
      email: 'csm.executivo@mba.edu.br',
      name: 'CSM Sênior — MBA Executivo',
      role: 'Customer Success Manager',
      isDemo: true,
    };

    sessionStorage.setItem('unipds_demo_session', JSON.stringify({ user: demoUser }));
    toast.success('Acesso em Modo Demonstração (CSM) validado!', {
      description: 'Sessão iniciada como CSM Sênior do MBA Executivo.',
      icon: <Sparkles className="w-4 h-4 text-blue-400" />,
    });
    navigate({ to: '/portal' });
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 selection:bg-blue-600/30">
      <div className="w-full max-w-md bg-[#18181b] border border-neutral-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow sutil de ambientação */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/30 mb-3.5">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Portal de CS & Operações
          </h1>
          <p className="text-xs text-blue-400 font-semibold tracking-wider uppercase mt-1">
            MBA Executivo • Versão 2.0 (2026)
          </p>
          <span className="text-[11px] text-zinc-500 mt-0.5">
            Base POP • Guia & Health Score • Calculadora de Rescisão
          </span>
        </div>

        {/* SUB-MODO 1: LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                E-mail Corporativo do CSM / Operações
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="csm.executivo@mba.edu.br"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-neutral-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-300">Senha de Acesso</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot_password')}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors hover:underline cursor-pointer"
                >
                  Recuperar credencial
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-lg bg-[#121212] border border-neutral-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Iniciar Sessão de CS
                </>
              )}
            </button>
          </form>
        )}

        {/* SUB-MODO 2: ESQUECI MINHA SENHA */}
        {mode === 'forgot_password' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Informe seu e-mail institucional corporativo para envio das instruções oficiais de recuperação de acesso.
            </p>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                E-mail Corporativo
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="csm.executivo@mba.edu.br"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-neutral-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" /> Enviar Link de Recuperação
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-xs text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5 py-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Retornar ao Login
            </button>
          </form>
        )}

        {/* SUB-MODO 3: REDEFINIÇÃO DE SENHA */}
        {mode === 'reset_password' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Registre a nova credencial segura para acesso ao Portal de CS & Operações do MBA Executivo.
            </p>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">Nova Senha de Acesso</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo de 6 caracteres"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-neutral-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" /> Atualizar Credencial
            </button>
          </form>
        )}

        {/* SEÇÃO INFERIOR: MODO DEMO / HOMOLOGAÇÃO RÁPIDA DE CSM */}
        <div className="mt-6 pt-6 border-t border-neutral-800 space-y-3">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Acesso restrito a gestores de CS e operações acadêmicas
          </div>

          <button
            type="button"
            onClick={handleDemoBypass}
            className="w-full py-2.5 px-3 rounded-lg border border-dashed border-blue-500/40 bg-blue-500/5 hover:bg-blue-500/10 text-blue-300 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            Entrar em Modo Demo (CSM Sênior — MBA Executivo)
          </button>
        </div>
      </div>
    </div>
  );
}
