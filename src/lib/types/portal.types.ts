export interface PopSection {
  id: string;
  title: string;
  content: string;
  script?: string;
  orderIndex: number;
}

export type JourneyStage = 'onboarding' | 'adocao' | 'conclusao' | 'retencao' | 'geral';

export interface PopArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  journeyStage?: JourneyStage;
  tags: string[];
  summary: string;
  updatedAt: string;
  sections: PopSection[];
  viewsCount?: number;
}

export interface PopCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export type AutonomyLevel = 'total' | 'parcial' | 'encaminhamento';

export type HealthScoreLevel = 'verde' | 'amarelo' | 'vermelho';

export interface HealthScoreItem {
  id: string;
  level: HealthScoreLevel;
  nome: string;
  faixaScore: string;
  corBadge: string;
  descricao: string;
  criterios: string[];
  acoesAutomatizadas: string[];
  intervencoesCSM: string[];
  scriptCSM: string;
  checklist: string[];
}

export interface InactivityTriggerItem {
  dias: 10 | 20;
  titulo: string;
  severidade: 'alerta' | 'critico';
  descricao: string;
  disparosAutomatizados: string[];
  acaoHumanaCSM: string;
  tempoLimiteResposta: string;
  scriptMensagem: string;
  escalonamento: string;
}

export interface GuiaItem {
  id: string;
  nivelEnsino: string;
  categoria: string;
  condicionante: string;
  motivo: string;
  autonomia: AutonomyLevel;
  acaoRecomendada: string;
  scriptAluno: string;
  checklist: string[];
}

export interface RescisaoContractParams {
  duracaoMeses: number; // 12
  mensalidade: number; // 500.00
  totalContrato: number; // 6000.00
  percentualMulta: number; // 0.20 (20%)
}

export interface RescisaoCalculationInput {
  nomeAluno: string;
  cpf: string;
  email: string;
  telefone: string;
  turma: string;
  mesesCursados: number; // 1 a 11
  mesesPagos: number; // 0 a 11
  motivoCancelamento: string;
  observacoes?: string;
}

export interface RescisaoCalculationResult {
  params: RescisaoContractParams;
  input: RescisaoCalculationInput;
  mesesCursados: number;
  mesesRestantes: number;
  saldoRemanescente: number; // mesesRestantes * 500
  multaRescisoria: number; // saldoRemanescente * 0.20
  mesesEmAtraso: number; // Math.max(0, mesesCursados - mesesPagos)
  valorParcelasEmAtraso: number; // mesesEmAtraso * 500
  totalQuitacao: number; // multaRescisoria + valorParcelasEmAtraso
  dataCalculo: string;
  numeroProtocolo: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  isDemo?: boolean;
}
