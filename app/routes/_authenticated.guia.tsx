import { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  Filter, 
  Clock, 
  AlertTriangle, 
  Bot, 
  UserCheck, 
  Send, 
  Sliders, 
  Check, 
  Copy, 
  HelpCircle,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { CopyButton } from '~/components/ui/CopyButton';
import { RichTextRenderer } from '~/components/ui/RichTextRenderer';
import { AutonomyLevel, GuiaItem, HealthScoreLevel } from '~/lib/types/portal.types';
import { 
  DEMO_GUIA_BASE, 
  DEMO_HEALTH_SCORE_MATRIX, 
  DEMO_INACTIVITY_TRIGGERS 
} from '~/mock/demo-data';

export const Route = createFileRoute('/_authenticated/guia')({
  component: GuiaAtendimentoPage,
});

export function GuiaAtendimentoPage() {
  const [activeTab, setActiveTab] = useState<'health' | 'inatividade' | 'guia'>('health');

  // ==========================================
  // ESTADO DO SIMULADOR DE HEALTH SCORE
  // ==========================================
  const [simDiasSemLogin, setSimDiasSemLogin] = useState<number>(3);
  const [simEntregasAtrasadas, setSimEntregasAtrasadas] = useState<number>(0);
  const [simPresencaLives, setSimPresencaLives] = useState<number>(85); // %
  const [simNps, setSimNps] = useState<number>(9);
  const [simFinanceiroEmDia, setSimFinanceiroEmDia] = useState<boolean>(true);

  // Cálculo Dinâmico do Health Score (0 a 100)
  const simulatedScore = useMemo(() => {
    let score = 100;

    // Penalidade por dias sem login
    if (simDiasSemLogin > 15) {
      score -= 35;
    } else if (simDiasSemLogin > 7) {
      score -= 15;
    }

    // Penalidade por entregas atrasadas
    score -= simEntregasAtrasadas * 15;

    // Penalidade por presença baixa em lives
    if (simPresencaLives < 50) {
      score -= 20;
    } else if (simPresencaLives < 75) {
      score -= 10;
    }

    // NPS
    if (simNps <= 6) {
      score -= 20;
    } else if (simNps <= 8) {
      score -= 5;
    }

    // Financeiro
    if (!simFinanceiroEmDia) {
      score -= 20;
    }

    return Math.max(0, Math.min(100, score));
  }, [simDiasSemLogin, simEntregasAtrasadas, simPresencaLives, simNps, simFinanceiroEmDia]);

  const simulatedLevel: HealthScoreLevel = useMemo(() => {
    if (simulatedScore >= 80) return 'verde';
    if (simulatedScore >= 50) return 'amarelo';
    return 'vermelho';
  }, [simulatedScore]);

  const activeHealthScoreData = useMemo(() => {
    return DEMO_HEALTH_SCORE_MATRIX.find((h) => h.level === simulatedLevel) || DEMO_HEALTH_SCORE_MATRIX[0];
  }, [simulatedLevel]);

  // ==========================================
  // ESTADO DO GUIA TÁTICO
  // ==========================================
  const [selectedCategoria, setSelectedCategoria] = useState<string>('Retenção & Cancelamento');
  const [selectedCondicionante, setSelectedCondicionante] = useState<string>(
    'Pedido Informal de Cancelamento por Falta de Tempo'
  );

  const categorias = useMemo(() => {
    const cats = new Set<string>();
    DEMO_GUIA_BASE.forEach((g) => cats.add(g.categoria));
    return Array.from(cats);
  }, []);

  const condicionantesDisponiveis = useMemo(() => {
    return DEMO_GUIA_BASE
      .filter((g) => g.categoria === selectedCategoria)
      .map((g) => g.condicionante);
  }, [selectedCategoria]);

  const activeGuia: GuiaItem = useMemo(() => {
    const found = DEMO_GUIA_BASE.find(
      (g) => g.categoria === selectedCategoria && g.condicionante === selectedCondicionante
    );
    if (found) return found;
    return DEMO_GUIA_BASE.find((g) => g.categoria === selectedCategoria) || DEMO_GUIA_BASE[0];
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
            🟢 Autonomia Total (N1 / CSM)
          </span>
        );
      case 'parcial':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            🟡 Autonomia Parcial (Validação N2)
          </span>
        );
      case 'encaminhamento':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            🔴 Encaminhamento Obrigatório (Coordenação N3)
          </span>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6 overflow-y-auto">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Guia de Atendimento e Régua de Saúde
              </h1>
              <p className="text-xs text-zinc-400">
                MBA Executivo (Versão 2.0 | 2026) — Health Score, Régua de Inatividade e Ações do CSM
              </p>
            </div>
          </div>
        </div>

        {/* Abas Secundárias de Navegação */}
        <div className="flex items-center gap-1 bg-[#18181b] p-1 rounded-lg border border-neutral-800">
          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'health'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Matriz de Health Score
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inatividade')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'inatividade'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Régua de Inatividade (10 & 20 Dias)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guia')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'guia'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Guia Tático N1/N2
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SEÇÃO 1: MATRIZ DE HEALTH SCORE (VERDE / AMARELO / VERMELHO) */}
      {/* ======================================================== */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          {/* Simulador Interativo de Health Score */}
          <div className="p-6 rounded-2xl bg-[#18181b] border border-neutral-800 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  Simulador de Engajamento e Health Score do Executivo
                </span>
                <h2 className="text-base font-bold text-white mt-1">
                  Diagnóstico em Tempo Real da Saúde do Aluno
                </h2>
              </div>

              {/* Placar do Score */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono">Score Calculado</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-2xl font-extrabold font-mono ${
                      simulatedLevel === 'verde' ? 'text-emerald-400' :
                      simulatedLevel === 'amarelo' ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {simulatedScore}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">/ 100 pts</span>
                  </div>
                </div>

                <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-wider ${
                  simulatedLevel === 'verde' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                  simulatedLevel === 'amarelo' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                  'bg-red-500/20 text-red-300 border-red-500/30'
                }`}>
                  {simulatedLevel === 'verde' && '🟢 Verde (Saudável)'}
                  {simulatedLevel === 'amarelo' && '🟡 Amarelo (Atenção)'}
                  {simulatedLevel === 'vermelho' && '🔴 Vermelho (Risco Alto)'}
                </div>
              </div>
            </div>

            {/* Controles do Simulador */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Controle 1: Dias sem Login */}
              <div className="p-3.5 rounded-xl bg-[#121212] border border-neutral-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-medium">Dias sem Acesso:</span>
                  <span className="font-bold text-blue-400 font-mono">{simDiasSemLogin} dias</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={simDiasSemLogin}
                  onChange={(e) => setSimDiasSemLogin(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <span className="text-[10px] text-zinc-500 block">
                  {simDiasSemLogin <= 6 ? 'Frequente' : simDiasSemLogin <= 14 ? 'Alerta (7-14d)' : 'Crítico (>15d)'}
                </span>
              </div>

              {/* Controle 2: Entregas Atrasadas */}
              <div className="p-3.5 rounded-xl bg-[#121212] border border-neutral-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-medium">Projetos Atrasados:</span>
                  <span className="font-bold text-amber-400 font-mono">{simEntregasAtrasadas}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={simEntregasAtrasadas}
                  onChange={(e) => setSimEntregasAtrasadas(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-zinc-500 block">
                  {simEntregasAtrasadas === 0 ? 'Nenhum atraso' : `${simEntregasAtrasadas} módulo(s) pendente(s)`}
                </span>
              </div>

              {/* Controle 3: Frequência em Masterclasses */}
              <div className="p-3.5 rounded-xl bg-[#121212] border border-neutral-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-medium">Presença em Lives:</span>
                  <span className="font-bold text-emerald-400 font-mono">{simPresencaLives}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={simPresencaLives}
                  onChange={(e) => setSimPresencaLives(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <span className="text-[10px] text-zinc-500 block">Mínimo desejado: 75%</span>
              </div>

              {/* Controle 4: NPS & Situação Financeira */}
              <div className="p-3.5 rounded-xl bg-[#121212] border border-neutral-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-medium">Nota NPS:</span>
                  <span className="font-bold text-blue-400 font-mono">{simNps} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={simNps}
                  onChange={(e) => setSimNps(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 text-[11px]">Financeiro:</span>
                  <button
                    type="button"
                    onClick={() => setSimFinanceiroEmDia(!simFinanceiroEmDia)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      simFinanceiroEmDia
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {simFinanceiroEmDia ? 'Em dia' : 'Inadimplente'}
                  </button>
                </div>
              </div>
            </div>

            {/* Painel do Nível Selecionado: Critérios, Ações Automatizadas e Intervenções do CSM */}
            <div className="p-5 rounded-xl bg-[#121212] border border-neutral-800 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {activeHealthScoreData.level === 'verde' && <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                    {activeHealthScoreData.level === 'amarelo' && <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                    {activeHealthScoreData.level === 'vermelho' && <span className="w-2.5 h-2.5 rounded-full bg-red-500" />}
                    {activeHealthScoreData.nome} ({activeHealthScoreData.faixaScore})
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{activeHealthScoreData.descricao}</p>
                </div>
              </div>

              {/* Grid de Ações: Automatizadas vs CSM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Coluna 1: Ações Automatizadas do Sistema */}
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-3">
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Bot className="w-4 h-4 text-blue-400" /> Ações Automatizadas (Sistema)
                  </span>
                  <ul className="space-y-2">
                    {activeHealthScoreData.acoesAutomatizadas.map((acao, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{acao}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coluna 2: Intervenções Diretas do CSM */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <UserCheck className="w-4 h-4 text-emerald-400" /> Intervenções Diretas do CSM
                  </span>
                  <ul className="space-y-2">
                    {activeHealthScoreData.intervencoesCSM.map((acao, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{acao}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Script Recomendado com Cópia em 1 Clique */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Script Padronizado de Abordagem do CSM
                  </span>
                  <CopyButton textToCopy={activeHealthScoreData.scriptCSM} label="Copiar Script" />
                </div>
                <div className="p-3.5 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-200 leading-relaxed font-mono">
                  {activeHealthScoreData.scriptCSM}
                </div>
              </div>

              {/* Checklist Obrigatório */}
              <div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">
                  Checklist Operacional do CSM
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeHealthScoreData.checklist.map((chk, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-zinc-900/60 border border-neutral-800 text-xs text-zinc-300 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cards Resumo dos 3 Níveis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_HEALTH_SCORE_MATRIX.map((item) => (
              <div 
                key={item.id} 
                className={`p-5 rounded-2xl bg-[#18181b] border shadow-md space-y-3 cursor-pointer transition-all ${
                  simulatedLevel === item.level
                    ? 'border-blue-500 shadow-blue-500/10'
                    : 'border-neutral-800 hover:border-zinc-700'
                }`}
                onClick={() => {
                  if (item.level === 'verde') {
                    setSimDiasSemLogin(3);
                    setSimEntregasAtrasadas(0);
                    setSimPresencaLives(85);
                    setSimFinanceiroEmDia(true);
                  } else if (item.level === 'amarelo') {
                    setSimDiasSemLogin(9);
                    setSimEntregasAtrasadas(1);
                    setSimPresencaLives(65);
                    setSimFinanceiroEmDia(true);
                  } else {
                    setSimDiasSemLogin(20);
                    setSimEntregasAtrasadas(2);
                    setSimPresencaLives(40);
                    setSimFinanceiroEmDia(false);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${item.corBadge}`}>
                    {item.nome}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">{item.faixaScore}</span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-3">{item.descricao}</p>
                <div className="pt-2 border-t border-neutral-800 text-[11px] text-blue-400 flex items-center gap-1">
                  <span>Clique para carregar parâmetros</span> <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SEÇÃO 2: RÉGUA DE INATIVIDADE (GATILHOS 10 E 20 DIAS)    */}
      {/* ======================================================== */}
      {activeTab === 'inatividade' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3 text-xs text-blue-200">
            <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-300 block font-bold text-sm">
                Régua de Inatividade Operacional do MBA Executivo
              </strong>
              <p className="text-zinc-300 mt-0.5">
                Gatilhos operacionais mandatórios para reversão de desengajamento executivo aos <strong>10 dias</strong> (notificação automatizada) e aos <strong>20 dias</strong> (intervenção humana direta do CSM e oferta de trancamento de até 60 dias).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMO_INACTIVITY_TRIGGERS.map((trigger) => (
              <div 
                key={trigger.dias}
                className={`p-6 rounded-2xl bg-[#18181b] border shadow-xl space-y-5 ${
                  trigger.dias === 10 ? 'border-amber-500/40' : 'border-red-500/40'
                }`}
              >
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      trigger.dias === 10 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {trigger.dias}d
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{trigger.titulo}</h3>
                      <span className="text-[10px] text-zinc-500">
                        Severidade: {trigger.severidade === 'alerta' ? 'Atenção Operacional' : 'Crítica (Risco de Evasão)'}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase ${
                    trigger.dias === 10
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {trigger.dias === 10 ? 'Disparo Automatizado' : 'Intervenção Humana'}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed bg-[#121212] p-3 rounded-xl border border-neutral-800">
                  {trigger.descricao}
                </p>

                {/* Disparos Automatizados */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-blue-400" /> Disparos do Sistema
                  </span>
                  <ul className="space-y-1.5">
                    {trigger.disparosAutomatizados.map((d, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ação Humana do CSM */}
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-neutral-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" /> Ação Humana Obrigatória do CSM
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {trigger.acaoHumanaCSM}
                  </p>
                  <span className="text-[10px] text-zinc-400 block pt-1 font-mono">
                    SLA Máximo de Atendimento: {trigger.tempoLimiteResposta}
                  </span>
                </div>

                {/* Script Padronizado */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-300">Script de Mensagem (WhatsApp / E-mail)</span>
                    <CopyButton textToCopy={trigger.scriptMensagem} label="Copiar Script" />
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-200 font-mono leading-relaxed">
                    {trigger.scriptMensagem}
                  </div>
                </div>

                {/* Escalonamento */}
                <div className="text-[11px] text-zinc-400 bg-zinc-950 p-2.5 rounded-lg border border-neutral-800/80">
                  <strong className="text-zinc-300">Regra de Escalonamento:</strong> {trigger.escalonamento}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SEÇÃO 3: GUIA TÁTICO DE ATENDIMENTO RÁPIDO (N1/N2/N3)    */}
      {/* ======================================================== */}
      {activeTab === 'guia' && (
        <div className="space-y-6">
          {/* FILTROS TÁTICOS EM PÍLULA: CATEGORIA E CONDICIONANTE */}
          <div className="p-5 rounded-2xl bg-[#18181b] border border-neutral-800 shadow-md space-y-4">
            {/* Filtro 1: Categoria em Pílulas */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-blue-400" />
                1. Categoria da Demanda do Aluno
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
                        : 'bg-[#121212] text-zinc-300 hover:text-white border border-neutral-800 hover:border-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro 2: Condicionante em Pílulas */}
            <div className="pt-2 border-t border-neutral-800">
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
                        : 'bg-[#121212] text-zinc-400 hover:text-zinc-200 border border-neutral-800'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PAINEL CENTRAL DE DIRETRIZES DA DEMANDA */}
          <div className="p-6 rounded-2xl bg-[#18181b] border border-neutral-800 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold font-mono">
                  {activeGuia.nivelEnsino} • {activeGuia.categoria}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">{activeGuia.motivo}</h2>
                <p className="text-xs text-blue-400/90 mt-0.5">Condição: {activeGuia.condicionante}</p>
              </div>
              {renderAutonomyBadge(activeGuia.autonomia)}
            </div>

            {/* Ação Recomendada */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Ação Operacional do CSM
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed bg-[#121212] p-3.5 rounded-xl border border-neutral-800">
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

              <div className="p-4 rounded-lg bg-[#121212] border border-blue-500/20 text-xs text-zinc-200 leading-relaxed">
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

            {/* Se a demanda envolver cancelamento/rescisão, atalho para a calculadora */}
            {activeGuia.categoria.includes('Rescisão') || activeGuia.categoria.includes('Cancelamento') ? (
              <div className="pt-3 border-t border-neutral-800 flex justify-end">
                <Link
                  to="/calculadora-cancelamento"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-md shadow-blue-600/20"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Abrir Calculadora de Rescisão Contratual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
