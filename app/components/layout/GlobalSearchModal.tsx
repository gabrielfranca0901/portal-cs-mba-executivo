import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ArrowRight, BookOpen, Compass, Calculator } from 'lucide-react';
import { Marked } from '~/components/ui/Marked';
import { DEMO_POP_ARTICLES } from '~/mock/demo-data';
import { useNavigate } from '@tanstack/react-router';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle?: (articleId: string) => void;
}

export function GlobalSearchModal({ isOpen, onClose, onSelectArticle }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? DEMO_POP_ARTICLES.filter((art) => {
        const q = query.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.tags.some((t) => t.toLowerCase().includes(q)) ||
          art.sections.some(
            (s) => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
          )
        );
      })
    : [];

  const handleSelect = (articleId: string) => {
    if (onSelectArticle) {
      onSelectArticle(articleId);
    } else {
      navigate({ to: '/portal' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in-50">
      <div 
        className="w-full max-w-2xl bg-[#18181b] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra de Entrada de Pesquisa */}
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por POP, etapa da jornada, retenção, health score ou #tags..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-200 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-400 font-mono">
            ESC
          </kbd>
        </div>

        {/* Atalhos Rápidos */}
        <div className="p-2.5 bg-[#121212] border-b border-neutral-800 flex items-center gap-2 overflow-x-auto text-[11px] text-zinc-400">
          <span className="text-zinc-500 shrink-0">Atalhos:</span>
          <button
            type="button"
            onClick={() => {
              navigate({ to: '/portal' });
              onClose();
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-neutral-800 hover:text-white cursor-pointer"
          >
            <Compass className="w-3 h-3 text-blue-400" /> Jornada do Aluno
          </button>
          <button
            type="button"
            onClick={() => {
              navigate({ to: '/guia' });
              onClose();
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-neutral-800 hover:text-white cursor-pointer"
          >
            <BookOpen className="w-3 h-3 text-emerald-400" /> Régua de Saúde
          </button>
          <button
            type="button"
            onClick={() => {
              navigate({ to: '/calculadora-cancelamento' });
              onClose();
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-neutral-800 hover:text-white cursor-pointer"
          >
            <Calculator className="w-3 h-3 text-amber-400" /> Calculadora de Rescisão
          </button>
        </div>

        {/* Resultados */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-neutral-800/50">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              Digite termos como <span className="text-blue-400 font-mono">#onboarding</span>,{' '}
              <span className="text-blue-400 font-mono">#cancelamento</span> ou{' '}
              <span className="text-blue-400 font-mono">trancamento 60 dias</span> para pesquisar...
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400">
              Nenhum procedimento localizado para &ldquo;<span className="text-zinc-200">{query}</span>&rdquo;.
            </div>
          ) : (
            results.map((art) => (
              <button
                key={art.id}
                type="button"
                onClick={() => handleSelect(art.id)}
                className="w-full text-left p-3 rounded-xl hover:bg-zinc-800/40 transition-colors flex items-start justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] text-blue-400 font-medium">
                    <FileText className="w-3 h-3" />
                    <span>{art.category}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-100 group-hover:text-blue-300 transition-colors">
                    <Marked text={art.title} query={query} />
                  </h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">
                    <Marked text={art.summary} query={query} />
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors shrink-0 mt-2" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
