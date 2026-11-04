import { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  Calculator, 
  FileText, 
  QrCode, 
  CreditCard, 
  Barcode, 
  Printer, 
  Copy, 
  Check, 
  RotateCcw, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Info,
  Building,
  UserCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { MBA_CONTRACT_PARAMS } from '~/mock/demo-data';
import { RescisaoCalculationInput, RescisaoCalculationResult } from '~/lib/types/portal.types';

export const Route = createFileRoute('/_authenticated/calculadora-cancelamento')({
  component: CalculadoraCancelamentoPage,
});

export function CalculadoraCancelamentoPage() {
  // Estado dos dados do formulário
  const [nomeAluno, setNomeAluno] = useState('Carlos Eduardo Silva');
  const [cpf, setCpf] = useState('123.456.789-00');
  const [email, setEmail] = useState('carlos.silva@executivo.com.br');
  const [telefone, setTelefone] = useState('(11) 98765-4321');
  const [turma, setTurma] = useState('Turma MBA Liderança Executiva - 2026/1');
  const [motivoCancelamento, setMotivoCancelamento] = useState('Sobrecarga profissional / Projetos corporativos intensos');
  const [mesesCursados, setMesesCursados] = useState<number>(1);
  const [mesesPagos, setMesesPagos] = useState<number>(1);
  const [observacoes, setObservacoes] = useState('Aluno informado sobre a opção de trancamento por 60 dias, porém optou pela rescisão imediata.');
  const [copiedFormal, setCopiedFormal] = useState(false);
  const [copiedWhats, setCopiedWhats] = useState(false);

  // Motor de cálculo baseado estritamente nas regras do MBA Executivo
  const calculation: RescisaoCalculationResult = useMemo(() => {
    const duracaoTotal = MBA_CONTRACT_PARAMS.duracaoMeses; // 12
    const valorMensalidade = MBA_CONTRACT_PARAMS.mensalidade; // 500.00
    const percentualMulta = MBA_CONTRACT_PARAMS.percentualMulta; // 0.20

    const cursados = Math.max(1, Math.min(duracaoTotal - 1, mesesCursados));
    const restantes = duracaoTotal - cursados;
    const saldo = restantes * valorMensalidade;
    const multa = saldo * percentualMulta;

    const pagos = Math.min(cursados, Math.max(0, mesesPagos));
    const atraso = Math.max(0, cursados - pagos);
    const valorAtraso = atraso * valorMensalidade;

    const total = multa + valorAtraso;

    const protocolo = `REC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const inputData: RescisaoCalculationInput = {
      nomeAluno,
      cpf,
      email,
      telefone,
      turma,
      mesesCursados: cursados,
      mesesPagos: pagos,
      motivoCancelamento,
      observacoes,
    };

    return {
      params: MBA_CONTRACT_PARAMS,
      input: inputData,
      mesesCursados: cursados,
      mesesRestantes: restantes,
      saldoRemanescente: saldo,
      multaRescisoria: multa,
      mesesEmAtraso: atraso,
      valorParcelasEmAtraso: valorAtraso,
      totalQuitacao: total,
      dataCalculo: new Date().toLocaleDateString('pt-BR'),
      numeroProtocolo: protocolo,
    };
  }, [nomeAluno, cpf, email, telefone, turma, motivoCancelamento, mesesCursados, mesesPagos, observacoes]);

  // Carregar exemplo prático do edital/prompt (1 mês cursado e pago -> R$ 1.100,00 de multa)
  const handleLoadOfficialExample = () => {
    setNomeAluno('Rodrigo Mendonça Alencar');
    setCpf('234.567.890-11');
    setEmail('rodrigo.mendonca@corporativo.com.br');
    setTelefone('(11) 99123-4567');
    setTurma('MBA Executivo em Gestão e Estratégia - Edição 2026');
    setMesesCursados(1);
    setMesesPagos(1);
    setMotivoCancelamento('Incompatibilidade de horários decorrente de promoção e viagens corporativas');
    setObservacoes('Contenção prévia (trancamento por até 60 dias) foi ofertada pelo CSM em conformidade com o POP de CS, porém o executivo solicitou a rescisão formal imediata.');
    toast.success('Exemplo oficial carregado!', {
      description: '1 mês cursado e pago, 11 meses restantes -> Saldo de R$ 5.500,00 e Multa de R$ 1.100,00.',
    });
  };

  const handleReset = () => {
    setNomeAluno('');
    setCpf('');
    setEmail('');
    setTelefone('');
    setMesesCursados(1);
    setMesesPagos(1);
    setObservacoes('');
    toast.info('Formulário redefinido.');
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  // Texto formal oficial para cópia / e-mail
  const termoFormalTexto = `TERMO FORMAL DE RESCISÃO CONTRATUAL E DEMONSTRATIVO FINANCEIRO
PORTAL DE CUSTOMER SUCCESS & OPERAÇÕES — MBA EXECUTIVO (2026)
Protocolo Oficial: ${calculation.numeroProtocolo}
Data de Emissão: ${calculation.dataCalculo}

DADOS DO CONTRATANTE:
Nome do(a) Aluno(a): ${calculation.input.nomeAluno || 'Não informado'}
CPF: ${calculation.input.cpf || 'Não informado'}
E-mail: ${calculation.input.email || 'Não informado'}
Telefone/WhatsApp: ${calculation.input.telefone || 'Não informado'}
Curso / Turma: ${calculation.input.turma}
Motivo Declarado: ${calculation.input.motivoCancelamento}

PARÂMETROS CONTRATUAIS DO MBA EXECUTIVO:
- Duração Total do Contrato: ${calculation.params.duracaoMeses} meses
- Valor da Mensalidade Contratada: ${formatCurrency(calculation.params.mensalidade)}
- Valor Total do Curso Contratado: ${formatCurrency(calculation.params.totalContrato)}
- Regra Contratual de Multa: 20% (vinte por cento) incidente sobre o saldo remanescente das mensalidades dos meses não cursados.

MEMÓRIA DE CÁLCULO RESCISÓRIO:
1. Meses Efetivamente Cursados: ${calculation.mesesCursados} mês(es)
2. Meses Remanescentes Não Cursados: ${calculation.mesesRestantes} mês(es)
3. Saldo Remanescente dos Meses Não Cursados: ${calculation.mesesRestantes} x ${formatCurrency(calculation.params.mensalidade)} = ${formatCurrency(calculation.saldoRemanescente)}
4. Multa Rescisória Contratual (20% sobre saldo remanescente): ${formatCurrency(calculation.multaRescisoria)}
${calculation.mesesEmAtraso > 0 ? `5. Mensalidades Cursadas em Aberto (${calculation.mesesEmAtraso} parcela(s)): ${formatCurrency(calculation.valorParcelasEmAtraso)}\n` : ''}
VALOR TOTAL LÍQUIDO PARA QUITAÇÃO RESCISÓRIA: ${formatCurrency(calculation.totalQuitacao)}

FORMAS DE PAGAMENTO AUTORIZADAS:
- OPÇÃO 1: PIX Instantâneo
  Chave PIX (CNPJ Oficial): 12.345.678/0001-99
  Identificador / Descrição: MBA-${calculation.numeroProtocolo}
  Compensação: Imediata

- OPÇÃO 2: Cartão de Crédito
  Parcelamento em até 6x sem juros de ${formatCurrency(calculation.totalQuitacao / 6)}
  Link Seguro: https://pagamentos.mbaexecutivo.edu.br/checkout/${calculation.numeroProtocolo}

- OPÇÃO 3: Boleto Bancário
  Linha Digitável: 23793.38128 60000.123456 78000.123456 1 98760000${Math.round(calculation.totalQuitacao)}
  Vencimento: 3 (três) dias úteis a contar desta emissão.

PRÓXIMOS PASSOS OPERACIONAIS:
1. Efetuar o pagamento da quitação rescisória por uma das opções acima até o vencimento.
2. Encaminhar o comprovante de pagamento ao CSM via WhatsApp ou respondendo a este e-mail.
3. A Secretaria Acadêmica emitirá a Certidão de Desligamento e o Histórico Escolar Parcial das disciplinas cursadas no prazo de até 5 (cinco) dias úteis.
4. Os créditos das disciplinas concluídas com aproveitamento permanecem válidos por até 2 (dois) anos para eventual reaproveitamento futuro.

Observações da Operação: ${calculation.input.observacoes || 'Sem observações adicionais.'}

Atenciosamente,
Gerência de Customer Success & Operações Acadêmicas
MBA Executivo — Versão 2.0 (2026)`;

  // Mensagem resumida e direta para envio por WhatsApp
  const termoWhatsTexto = `Olá, *${calculation.input.nomeAluno || 'Aluno(a)'}*! Aqui é do *Customer Success do MBA Executivo*.

Conforme alinhamos a respeito da solicitação de encerramento de matrícula, formalizamos o demonstrativo financeiro rescisório sob o protocolo *#${calculation.numeroProtocolo}*:

📊 *Resumo Contratual:*
• Meses Cursados: ${calculation.mesesCursados} de 12 meses
• Meses Restantes: ${calculation.mesesRestantes} meses (Saldo: ${formatCurrency(calculation.saldoRemanescente)})
• *Multa Rescisória (20% sobre saldo não cursado):* *${formatCurrency(calculation.multaRescisoria)}*
${calculation.mesesEmAtraso > 0 ? `• Mensalidades em Aberto (${calculation.mesesEmAtraso}x): ${formatCurrency(calculation.valorParcelasEmAtraso)}\n` : ''}💰 *Total para Quitação Rescisória:* *${formatCurrency(calculation.totalQuitacao)}*

💳 *Opções de Pagamento:*
1️⃣ *PIX:* Chave CNPJ: \`12.345.678/0001-99\` (Identificador: ${calculation.numeroProtocolo})
2️⃣ *Cartão:* Em até 6x de ${formatCurrency(calculation.totalQuitacao / 6)} sem juros no link: https://pagamentos.mbaexecutivo.edu.br/checkout/${calculation.numeroProtocolo}
3️⃣ *Boleto:* Linha digitável com vencimento em 3 dias úteis.

Após o envio do comprovante, sua Certidão de Desligamento e Histórico Parcial serão emitidos em até 5 dias úteis. Permanecemos sempre à disposição caso deseje retornar no futuro!`;

  const handleCopyFormal = async () => {
    try {
      await navigator.clipboard.writeText(termoFormalTexto);
      setCopiedFormal(true);
      toast.success('Termo Formal copiado com sucesso!', {
        description: 'Documento completo pronto para colagem em e-mail institucional ou sistema de tickets.',
      });
      setTimeout(() => setCopiedFormal(false), 2500);
    } catch {
      toast.error('Não foi possível copiar o termo formal.');
    }
  };

  const handleCopyWhats = async () => {
    try {
      await navigator.clipboard.writeText(termoWhatsTexto);
      setCopiedWhats(true);
      toast.success('Mensagem de WhatsApp copiada!', {
        description: 'Formatação pronta para envio direto pelo WhatsApp Web.',
      });
      setTimeout(() => setCopiedWhats(false), 2500);
    } catch {
      toast.error('Não foi possível copiar a mensagem de WhatsApp.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 overflow-y-auto">
      {/* Alerta de Contenção Prévia Obrigatória (Diretriz do POP de CS) */}
      <div className="no-print p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Atenção CSM / Analista: Diretriz de Contenção Prévia Obrigatória
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
              POP-RET-04
            </span>
          </div>
          <p className="leading-relaxed text-zinc-300">
            Antes de emitir o termo rescisório e a guia de multa, verifique se foram ofertadas as duas alternativas de contenção:
            <strong className="text-amber-200"> 1. Trancamento de Matrícula por até 60 dias</strong> (sem custos ou juros) e 
            <strong className="text-amber-200"> 2. Repactuação de Datas e Cronograma Flexível</strong>.
          </p>
          <div className="pt-1">
            <Link
              to="/portal"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 hover:underline"
            >
              Consultar Procedimento Padrão de Cancelamento & Retenção <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Cabeçalho da Página */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Calculadora de Rescisão Contratual
              </h1>
              <span className="text-xs text-zinc-400">
                MBA Executivo (Versão 2.0 | 2026) — 12 meses • R$ 500,00/mês • Multa de 20% sobre saldo
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadOfficialExample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 text-xs font-medium transition-colors cursor-pointer"
            title="Carregar caso prático do regulamento (1 mês cursado = R$ 1.100 multa)"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Exemplo Prático (1 Mês Cursado)
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>
      </div>

      {/* Cards de Métricas em Tempo Real */}
      <div className="no-print grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Meses Cursados */}
        <div className="p-4 rounded-xl bg-[var(--color-dark-surface)] border border-neutral-800 shadow-md">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Meses Cursados
          </span>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-white font-mono">{calculation.mesesCursados}</span>
            <span className="text-xs text-zinc-500 font-mono">/ 12 meses</span>
          </div>
          <span className="text-[10px] text-zinc-400 mt-1 block">
            {calculation.mesesRestantes} meses restantes
          </span>
        </div>

        {/* Card 2: Saldo Remanescente */}
        <div className="p-4 rounded-xl bg-[var(--color-dark-surface)] border border-neutral-800 shadow-md">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Saldo Não Cursado
          </span>
          <div className="mt-1.5">
            <span className="text-2xl font-bold text-zinc-200 font-mono">
              {formatCurrency(calculation.saldoRemanescente)}
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 mt-1 block">
            {calculation.mesesRestantes} x R$ 500,00
          </span>
        </div>

        {/* Card 3: Multa Rescisória (20%) */}
        <div className="p-4 rounded-xl bg-[var(--color-dark-surface)] border border-blue-500/40 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider block">
              Multa Rescisória (20%)
            </span>
            <span className="text-[9px] px-1 rounded bg-blue-500/20 text-blue-300 font-bold">20%</span>
          </div>
          <div className="mt-1.5">
            <span className="text-2xl font-bold text-blue-400 font-mono">
              {formatCurrency(calculation.multaRescisoria)}
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 mt-1 block">
            20% de {formatCurrency(calculation.saldoRemanescente)}
          </span>
        </div>

        {/* Card 4: Total para Quitação */}
        <div className="p-4 rounded-xl bg-[var(--color-dark-surface)] border border-emerald-500/40 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block">
              Total Quitação Rescisória
            </span>
            <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">Liquidação</span>
          </div>
          <div className="mt-1.5">
            <span className="text-2xl font-bold text-emerald-400 font-mono">
              {formatCurrency(calculation.totalQuitacao)}
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 mt-1 block">
            {calculation.mesesEmAtraso > 0 ? `Multa + ${calculation.mesesEmAtraso} parcela(s) pendente(s)` : 'Sem parcelas em atraso'}
          </span>
        </div>
      </div>

      {/* Grid Principal: Formulário de Parâmetros vs Gerador de Termo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUNA ESQUERDA: FORMULÁRIO DE ENTRADA (5 Colunas no Desktop) */}
        <div className="no-print lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-[var(--color-dark-surface)] border border-neutral-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" /> Parâmetros do Executivo
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono">
                12 meses • R$ 500/mês
              </span>
            </div>

            {/* Nome do Aluno */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Nome Completo do(a) Aluno(a)
              </label>
              <input
                type="text"
                value={nomeAluno}
                onChange={(e) => setNomeAluno(e.target.value)}
                placeholder="Ex: Carlos Eduardo Silva"
                className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* CPF e Telefone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(11) 90000-0000"
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* E-mail e Turma */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                E-mail Institucional / Pessoal
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="executivo@empresa.com.br"
                className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Turma / Edição do MBA
              </label>
              <input
                type="text"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                placeholder="Ex: MBA Executivo em Liderança - 2026/1"
                className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* SELETORES DE MESES: SLIDERS INTERATIVOS */}
            <div className="pt-2 border-t border-neutral-800 space-y-3">
              {/* Slider 1: Meses Cursados */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-200">
                    Meses Efetivamente Cursados:
                  </label>
                  <span className="text-xs font-bold text-blue-400 font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                    {mesesCursados} mês(es)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="11"
                  step="1"
                  value={mesesCursados}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMesesCursados(val);
                    if (mesesPagos > val) setMesesPagos(val);
                  }}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-0.5">
                  <span>1 mês (Início)</span>
                  <span>6 meses (Metade)</span>
                  <span>11 meses (Final)</span>
                </div>
              </div>

              {/* Slider 2: Meses Pagos */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-200">
                    Meses Efetivamente Pagos:
                  </label>
                  <span className="text-xs font-bold text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {mesesPagos} pago(s)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={mesesCursados}
                  step="1"
                  value={mesesPagos}
                  onChange={(e) => setMesesPagos(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-0.5">
                  <span>0 pagos</span>
                  <span>Até {mesesCursados} cursados</span>
                </div>
                {mesesCursados > mesesPagos && (
                  <div className="mt-1 text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Constam {mesesCursados - mesesPagos} parcela(s) cursada(s) em aberto ({formatCurrency((mesesCursados - mesesPagos) * 500)}).</span>
                  </div>
                )}
              </div>
            </div>

            {/* Motivo do Cancelamento */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Motivo Declarado do Cancelamento
              </label>
              <select
                value={motivoCancelamento}
                onChange={(e) => setMotivoCancelamento(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-100 focus:outline-none focus:border-blue-500"
              >
                <option value="Sobrecarga profissional / Projetos corporativos intensos">
                  Sobrecarga profissional / Projetos corporativos intensos
                </option>
                <option value="Viagens ou mudança de país/cidade a trabalho">
                  Viagens ou mudança de país/cidade a trabalho
                </option>
                <option value="Dificuldades financeiras temporárias">
                  Dificuldades financeiras temporárias
                </option>
                <option value="Desalinhamento com expectativas de liderança">
                  Desalinhamento com expectativas de liderança
                </option>
                <option value="Outro motivo justificado">Outro motivo justificado</option>
              </select>
            </div>

            {/* Observações Operacionais */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Observações Operacionais do CSM
              </label>
              <textarea
                rows={2}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Registro de tentativas de contenção prévia, trancamento ofertado, etc."
                className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: TERMO FORMAL OFICIAL & COMUNICAÇÃO (7 Colunas no Desktop) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Barra de Ações Rápidas de Emissão */}
          <div className="no-print p-4 rounded-2xl bg-[var(--color-dark-surface)] border border-neutral-800 shadow-md flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                Termo Formal Gerado
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-semibold">
                Protocolo #{calculation.numeroProtocolo}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCopyFormal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors cursor-pointer shadow-md shadow-blue-600/20"
                title="Copiar texto formal completo para e-mail institucional ou chamado"
              >
                {copiedFormal ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Termo Completo</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyWhats}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium transition-colors cursor-pointer shadow-md shadow-emerald-700/20"
                title="Copiar versão formatada com emojis e negritos para WhatsApp"
              >
                {copiedWhats ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Copiar p/ WhatsApp</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-neutral-800 transition-colors cursor-pointer"
                title="Imprimir documento timbrado ou salvar em PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / PDF</span>
              </button>
            </div>
          </div>

          {/* DOCUMENTO FORMAL VISUALIZÁVEL E IMPRIMÍVEL (CONTAINER PRINCIPAL) */}
          <div className="print-only-container p-6 sm:p-8 rounded-2xl bg-[var(--color-dark-surface)] border border-neutral-800 shadow-2xl text-zinc-100 space-y-6">
            {/* Cabeçalho Oficial Institucional */}
            <div className="border-b border-neutral-800 pb-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    PORTAL DE CUSTOMER SUCCESS & OPERAÇÕES ACADÊMICAS
                  </h3>
                  <p className="text-xs text-blue-400 font-medium">
                    MBA Executivo • Termo Formal de Rescisão e Memória de Cálculo
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-zinc-200">
                  Protocolo: #{calculation.numeroProtocolo}
                </div>
                <div className="text-[11px] text-zinc-500">
                  Emissão: {calculation.dataCalculo}
                </div>
              </div>
            </div>

            {/* Identificação do Aluno */}
            <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800 space-y-2 text-xs">
              <div className="font-bold text-zinc-300 uppercase tracking-wider text-[10px]">
                Identificação do Contratante
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                <div>
                  <span className="text-zinc-500">Nome:</span>{' '}
                  <strong className="text-white">{calculation.input.nomeAluno || 'Nome não preenchido'}</strong>
                </div>
                <div>
                  <span className="text-zinc-500">CPF:</span>{' '}
                  <strong className="text-white">{calculation.input.cpf || 'Não informado'}</strong>
                </div>
                <div>
                  <span className="text-zinc-500">Curso:</span>{' '}
                  <strong className="text-zinc-200">{calculation.input.turma}</strong>
                </div>
                <div>
                  <span className="text-zinc-500">Contato:</span>{' '}
                  <strong className="text-zinc-200">{calculation.input.email} | {calculation.input.telefone}</strong>
                </div>
              </div>
            </div>

            {/* Memória de Cálculo Financeiro & Cláusula Contratual */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-blue-400" />
                  Demonstrativo e Memória de Cálculo Rescisório
                </h4>
                <span className="text-[10px] text-zinc-500 font-mono">
                  Cláusula 11ª do Contrato de Prestação de Serviços Educacionais
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-neutral-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#121212] text-zinc-400 font-semibold border-b border-neutral-800">
                    <tr>
                      <th className="p-3">Item / Rubrica Financeira</th>
                      <th className="p-3 text-center">Referência</th>
                      <th className="p-3 text-right">Valor Consolidado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 bg-[var(--color-dark-surface)] text-zinc-300">
                    <tr>
                      <td className="p-3">
                        <span className="font-medium text-white">Valor Total Contratado (12 meses)</span>
                        <span className="block text-[10px] text-zinc-500">12 mensalidades de R$ 500,00</span>
                      </td>
                      <td className="p-3 text-center font-mono">12 meses</td>
                      <td className="p-3 text-right font-mono text-zinc-200">
                        {formatCurrency(calculation.params.totalContrato)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <span className="font-medium text-zinc-200">Meses Cursados com Aproveitamento</span>
                        <span className="block text-[10px] text-zinc-500">Disciplinas liberadas na grade</span>
                      </td>
                      <td className="p-3 text-center font-mono">{calculation.mesesCursados} mês(es)</td>
                      <td className="p-3 text-right font-mono text-zinc-300">
                        {formatCurrency(calculation.mesesCursados * 500)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <span className="font-medium text-zinc-200">Saldo Remanescente (Meses Não Cursados)</span>
                        <span className="block text-[10px] text-zinc-500">
                          {calculation.mesesRestantes} meses x R$ 500,00
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono">{calculation.mesesRestantes} mês(es)</td>
                      <td className="p-3 text-right font-mono text-zinc-200">
                        {formatCurrency(calculation.saldoRemanescente)}
                      </td>
                    </tr>
                    <tr className="bg-blue-950/20">
                      <td className="p-3">
                        <span className="font-bold text-blue-300">Multa Rescisória Contratual (20%)</span>
                        <span className="block text-[10px] text-blue-400/80">
                          20% incidente estritamente sobre o saldo de {formatCurrency(calculation.saldoRemanescente)}
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-blue-400">20%</td>
                      <td className="p-3 text-right font-mono font-bold text-blue-400 text-sm">
                        {formatCurrency(calculation.multaRescisoria)}
                      </td>
                    </tr>
                    {calculation.mesesEmAtraso > 0 && (
                      <tr className="bg-amber-950/20 text-amber-200">
                        <td className="p-3">
                          <span className="font-bold">Parcelas Cursadas Vencidas em Aberto</span>
                          <span className="block text-[10px] text-amber-300/80">
                            {calculation.mesesEmAtraso} mensalidade(s) cursada(s) e pendente(s) de liquidação
                          </span>
                        </td>
                        <td className="p-3 text-center font-mono">{calculation.mesesEmAtraso} parcela(s)</td>
                        <td className="p-3 text-right font-mono font-bold text-amber-300">
                          {formatCurrency(calculation.valorParcelasEmAtraso)}
                        </td>
                      </tr>
                    )}
                    <tr className="bg-emerald-950/30 border-t-2 border-emerald-500/50">
                      <td className="p-3.5">
                        <span className="font-bold text-sm text-emerald-300">TOTAL PARA QUITAÇÃO RESCISÓRIA</span>
                        <span className="block text-[10px] text-emerald-400/80">
                          Valor total líquido para emissão do termo de encerramento
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-emerald-400">—</td>
                      <td className="p-3.5 text-right font-mono font-extrabold text-base text-emerald-400">
                        {formatCurrency(calculation.totalQuitacao)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Opções de Pagamento Oficiais */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                Opções Autorizadas para Liquidação Financeira
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Opção 1: PIX */}
                <div className="p-3.5 rounded-xl bg-[#121212] border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>1. PIX Instantâneo</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Compensação bancária imediata e liberação célere do histórico escolar.
                  </p>
                  <div className="p-2 rounded bg-zinc-900 border border-neutral-800 font-mono text-[10px] text-emerald-300 break-all select-all">
                    Chave: 12.345.678/0001-99
                    <br />
                    Ref: MBA-{calculation.numeroProtocolo}
                  </div>
                </div>

                {/* Opção 2: Cartão de Crédito */}
                <div className="p-3.5 rounded-xl bg-[#121212] border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span>2. Cartão de Crédito</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Parcelamento em até 6x sem juros no portal seguro de pagamentos.
                  </p>
                  <div className="p-2 rounded bg-zinc-900 border border-neutral-800 text-[10px] text-blue-300">
                    <strong>Até 6x de {formatCurrency(calculation.totalQuitacao / 6)}</strong>
                    <br />
                    Link seguro no portal
                  </div>
                </div>

                {/* Opção 3: Boleto Bancário */}
                <div className="p-3.5 rounded-xl bg-[#121212] border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Barcode className="w-4 h-4 text-amber-400" />
                    <span>3. Boleto Bancário</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Vencimento padrão de 3 dias úteis a contar da data de emissão.
                  </p>
                  <div className="p-2 rounded bg-zinc-900 border border-neutral-800 font-mono text-[10px] text-amber-300">
                    Vencimento: 3 dias úteis
                    <br />
                    Banco do Brasil / Bradesco
                  </div>
                </div>
              </div>
            </div>

            {/* Próximos Passos Operacionais */}
            <div className="p-4 rounded-xl bg-[#121212] border border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Próximos Passos e Disposições Finais
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-xs text-zinc-400 leading-relaxed">
                <li>
                  O aluno deve efetuar a quitação do valor total indicado por uma das opções acima até o vencimento estipulado.
                </li>
                <li>
                  O comprovante deve ser enviado ao CSM via WhatsApp ou por resposta ao e-mail institucional do MBA.
                </li>
                <li>
                  Após a liquidação financeira, a Secretaria Acadêmica emitirá a <strong>Certidão de Desligamento Definitivo</strong> e o <strong>Histórico Parcial de Disciplinas Cursadas</strong> no prazo de até 5 dias úteis.
                </li>
                <li>
                  Os créditos e notas das disciplinas cursadas com aprovação permanecem salvaguardados por até 2 anos para futuro reingresso ou equivalência curricular.
                </li>
              </ol>
            </div>

            {/* Assinaturas Formais (Visíveis na Impressão e PDF) */}
            <div className="pt-8 border-t border-neutral-800 grid grid-cols-2 gap-8 text-center text-xs">
              <div className="space-y-1">
                <div className="border-b border-zinc-700 pb-1 font-semibold text-zinc-300">
                  {calculation.input.nomeAluno || 'Assinatura do(a) Aluno(a)'}
                </div>
                <div className="text-[10px] text-zinc-500">
                  CPF: {calculation.input.cpf || 'Contratante'}
                </div>
              </div>
              <div className="space-y-1">
                <div className="border-b border-zinc-700 pb-1 font-semibold text-zinc-300">
                  Coordenação de Customer Success & Operações
                </div>
                <div className="text-[10px] text-zinc-500">
                  MBA Executivo • Versão 2.0 (2026)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
