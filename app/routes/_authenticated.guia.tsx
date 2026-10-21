import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Headset, Sparkles, CheckCircle2, ShieldAlert, Award, Filter } from 'lucide-react';
import { CopyButton } from '~/components/ui/CopyButton';
import { RichTextRenderer } from '~/components/ui/RichTextRenderer';
import { AutonomyLevel, GuiaItem } from '~/lib/types/portal.types';
import { DEMO_GUIA_BASE } from '~/mock/demo-data';

export const Route = createFileRoute('/_authenticated/guia')({
  component: GuiaAtendimentoPage,
});

function GuiaAtendimentoPage() {
  const [selectedCategoria, setSelectedCategoria] = useState<string>('Financeiro');
  const [selectedCondicionante, setSelectedCondicionante] = useState<string>('Boleto Vencido (Até 15 dias)');

  // Categorias disponíveis
  const categorias = useMemo(() => {
    const cats = new Set<string>();
    DEMO_GUIA_BASE.forEach((g) => cats.add(g.categoria));
    return Array.from(cats);
  }, []);

  // Condicionantes disponíveis filtradas pela Categoria selecionada
  const condicionantesDisponiveis = useMemo(() => {
    return DEMO_GUIA_BASE
      .filter((g) => g.categoria === selectedCategoria)
      .map((g) => g.condicionante);
  }, [selectedCategoria]);

  // Atualiza a condicionante selecionada se a atual não pertencer à nova categoria
  const activeGuia: GuiaItem = useMemo(() => {
    const found = DEMO_GUIA_BASE.find(
      (g) => g.categoria === selectedCategoria && g.condicionante === selectedCondicionante
    );
    if (found) return found;

    const fallback = DEMO_GUIA_BASE.find((g) => g.categoria === selectedCategoria) || DEMO_GUIA_BASE[0];
    return fallback;
  }, [selectedCategoria, selectedCondicionante]);

  const handleSelectCategoria = (cat: string) => {
    setSelectedCategoria(cat);
    const related = DEMO_GUIA_BASE.find((g) => g.categoria === cat);
    if (related) {
      setSelectedCondicionante(related.condicionante);
    }
  };

  const renderAutonomyBadge = (autonomia: AutonomyLevel) => {
    switch (autonomia) {
      case 'total':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            🟢 Autonomia Total
          </span>
        );
      case 'parcial':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            🟡 Autonomia Parcial
          </span>
        );
      case 'encaminhamento':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            🔴 Encaminhamento Obrigatório
          </span>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 lg:p-10 max-w-5xl mx-auto w-full space-y-6 overflow-y-auto">
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Headset className="w-5 h-5 text-blue-500" /> Guia Tático de Atendimento Rápido
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          O analista de suporte deve selecionar a Categoria e a Condicionante para obter a diretriz de autonomia e o script oficial.
        </p>
      </div>

      {/* FILTROS TÁTICOS EM PÍLULA: CATEGORIA E CONDICIONANTE */}
      <div className="p-5 rounded-2xl bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] shadow-md space-y-4">
        {/* Filtro 1: Categoria em Pílulas */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            1. Categoria da Demanda
          </label>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategoria(cat)}
                className={`py-2 px-4 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategoria === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[var(--color-dark-bg)] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro 2: Condicionante em Pílulas */}
        <div className="pt-2 border-t border-[var(--color-dark-border)]">
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
            2. Condicionante Operacional
          </label>
          <div className="flex flex-wrap gap-2">
            {condicionantesDisponiveis.map((cond) => (
              <button
                key={cond}
                type="button"
                onClick={() => setSelectedCondicionante(cond)}
                className={`py-1.5 px-3.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeGuia.condicionante === cond
                    ? 'bg-zinc-800 text-blue-400 border border-blue-500/50 shadow-sm'
                    : 'bg-[var(--color-dark-bg)] text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PAINEL CENTRAL DE DIRETRIZES DA DEMANDA */}
      <div className="p-6 rounded-2xl bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-dark-border)] pb-4">
          <div>
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold font-mono">
              {activeGuia.nivelEnsino} • {activeGuia.categoria}
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">{activeGuia.motivo}</h2>
            <p className="text-xs text-blue-400/90 mt-0.5">Condição: {activeGuia.condicionante}</p>
          </div>
          {renderAutonomyBadge(activeGuia.autonomia)}
        </div>

        {/* Bloco de Ação Recomendada */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Ação Operacional do Analista
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed bg-[var(--color-dark-bg)] p-3.5 rounded-xl border border-zinc-800">
            {activeGuia.acaoRecomendada}
          </p>
        </div>

        {/* Script ao Aluno com Cópia Instantânea e Feedback Sonner */}
        <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Script Padronizado ao Aluno
            </span>
            <CopyButton textToCopy={activeGuia.scriptAluno} label="Copiar Script" />
          </div>

          <div className="p-4 rounded-lg bg-[var(--color-dark-bg)] border border-blue-500/20 text-xs text-zinc-200 leading-relaxed">
            <RichTextRenderer content={activeGuia.scriptAluno} />
          </div>
        </div>

        {/* Checklist Obrigatório */}
        <div>
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
            Checklist de Validação Obrigatório
          </h3>
          <ul className="space-y-2">
            {activeGuia.checklist.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
