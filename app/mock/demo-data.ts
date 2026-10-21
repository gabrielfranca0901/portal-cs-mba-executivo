import { PopArticle, GuiaItem } from '~/lib/types/portal.types';

export const DEMO_POP_ARTICLES: PopArticle[] = [
  {
    id: 'pop-rematricula-pendencia',
    title: 'Procedimento Padrão: Rematrícula com Pendência Financeira',
    slug: 'rematricula-com-pendencia-financeira',
    category: 'Financeiro & Cobrança',
    tags: ['#rematricula', '#financeiro', '#negociacao', '#portal_aluno', '#acordo'],
    summary: 'Diretrizes oficiais para atendimento e flexibilização de rematrícula de alunos com débitos de semestres anteriores.',
    updatedAt: '20/10/2026',
    sections: [
      {
        id: 'sec-analise-previa',
        title: 'Diagnóstico da Situação Financeira no SIA/Colaborar',
        orderIndex: 1,
        content: 'Antes de iniciar a negociação, o analista deve consultar a tela financeira do SIA para [Nome do Aluno]. :::info O analista deve verificar se constam parcelas já ajuizadas ou acordos anteriores descumpridos. Caso o estudante tenha cumprido ao menos 3 parcelas de um acordo vigente, o analista pode conceder a liberação condicional da rematrícula. :::',
      },
      {
        id: 'sec-script-oferta',
        title: 'Script de Abordagem e Proposta Institucional',
        orderIndex: 2,
        content: 'O analista de suporte deve encaminhar a mensagem institucional padronizada com as opções de regularização:',
        script: 'Olá, [Nome do Aluno]! A equipe de atendimento acadêmico da Anhanguera analisou a solicitação de rematrícula. Consta uma pendência financeira no montante de [Valor do Débito]. Estão disponíveis condições facilitadas de regularização: 15% de desconto à vista via Pix ou parcelamento em até 6x sem juros no cartão, garantindo a liberação imediata da grade curricular.',
      },
      {
        id: 'sec-regras-bloqueio',
        title: 'Diretrizes de Bloqueio e Escalonamento',
        orderIndex: 3,
        content: ':::danger Casos de estudantes beneficiários de FIES ou Prouni com pendências documentais NÃO devem sofrer bloqueio de acesso ao AVA pelo analista N1 sem prévia autorização da Coordenação do Polo. ::: O analista de suporte deve abrir chamado N2 com a classificação "Regularização de Bolsa/Financiamento".',
      },
      {
        id: 'sec-confirmacao',
        title: 'Confirmação do Acordo e Registro de Protocolo',
        orderIndex: 4,
        content: 'Após a concordância do estudante, o analista deve emitir o termo de confissão digital ou solicitar a validação via token SMS [Código Token], anexando a confirmação formal ao protocolo de atendimento.',
      }
    ]
  },
  {
    id: 'pop-aproveitamento-disciplinas',
    title: 'Aproveitamento de Estudos e Dispensa Curricular',
    slug: 'aproveitamento-de-estudos-e-dispensa',
    category: 'Secretaria Acadêmica',
    tags: ['#secretaria', '#dispensa', '#ementas', '#ead', '#equivalencia'],
    summary: 'Rito de análise documental e equivalência de matriz curricular para estudantes transferidos ou portadores de diploma.',
    updatedAt: '18/10/2026',
    sections: [
      {
        id: 'sec-documentacao-exigida',
        title: 'Conferência da Relação de Documentos Obrigatórios',
        orderIndex: 1,
        content: 'O analista deve verificar se o estudante anexou no Portal do Aluno: 1. Histórico Escolar Oficial da IES de origem; 2. Ementas e conteúdos programáticos com aprovação (nota mínima 7,0). :::warning Documentos sem certificação digital (ICP-Brasil) ou carimbo legível da instituição de origem devem ser devolvidos pelo analista com solicitação de reenvio. :::',
      },
      {
        id: 'sec-script-dispensa',
        title: 'Script de Orientação de Envio de Ementas',
        orderIndex: 2,
        content: 'O analista de suporte transmite as instruções operacionais para o aluno:',
        script: 'Prezado(a) [Nome do Aluno], para o prosseguimento da análise de aproveitamento de disciplinas, é necessário acessar o Portal do Aluno > Secretaria Virtual > Solicitação de Dispensa. Devem ser anexados o Histórico Escolar e os Planos de Ensino em arquivo único PDF (limite de 15MB). O prazo de análise pelo Colegiado de Curso é de até 10 dias úteis.',
      }
    ]
  },
  {
    id: 'pop-declaracao-matricula',
    title: 'Emissão e Validação de Declaração de Matrícula Digital',
    slug: 'emissao-declaracao-matricula',
    category: 'Secretaria Acadêmica',
    tags: ['#secretaria', '#declaracao', '#portal_aluno', '#validacao_digital'],
    summary: 'Diretrizes para orientar a emissão com código de autenticidade no Portal do Aluno.',
    updatedAt: '15/10/2026',
    sections: [
      {
        id: 'sec-emissao-imediata',
        title: 'Orientações para Emissão Autônoma no Portal',
        orderIndex: 1,
        content: 'O analista deve informar ao estudante que o documento possui selo de validação digital e emissão gratuita sem exigência de abertura de chamado. :::info A declaração tem validade regulamentar de 30 dias contados da data de geração no sistema acadêmico. :::',
      }
    ]
  }
];

export const DEMO_GUIA_BASE: GuiaItem[] = [
  {
    id: 'guia-1',
    nivelEnsino: 'Graduação EAD',
    categoria: 'Financeiro',
    condicionante: 'Boleto Vencido (Até 15 dias)',
    motivo: 'Reemissão de Boleto com Prorrogação',
    autonomia: 'total',
    acaoRecomendada: 'O analista deve gerar a 2ª via atualizada com prorrogação de 48h sem cobrança de novos encargos ou juros moratórios.',
    scriptAluno: 'Olá, [Nome do Aluno]! O boleto de mensalidade foi atualizado com prorrogação de vencimento para [Data da Prorrogação]. A linha digitável é: [Linha Digitável do Boleto]. O documento também pode ser consultado no Portal do Aluno.',
    checklist: [
      'O analista confirma o CPF e curso do estudante',
      'O analista valida se já ocorreu prorrogação no mês vigente',
      'O analista encaminha o PDF emitido pelo sistema',
    ],
  },
  {
    id: 'guia-2',
    nivelEnsino: 'Graduação EAD',
    categoria: 'Financeiro',
    condicionante: 'Acordo com 3+ Parcelas em Atraso',
    motivo: 'Repactuação de Dívida em Cobrança',
    autonomia: 'parcial',
    acaoRecomendada: 'O analista realiza a sondagem do valor viável para entrada e abre protocolo N2 para validação da mesa de crédito.',
    scriptAluno: '[Nome do Aluno], a proposta de repactuação no valor de entrada [Valor da Entrada] foi registrada e submetida à Mesa de Crédito sob o protocolo #[Protocolo]. O retorno ocorrerá em até 24 horas úteis via e-mail cadastrado.',
    checklist: [
      'O analista levanta o valor total consolidado',
      'O analista coleta a comprovação de renda atualizada',
      'O analista registra o chamado com prioridade N2',
    ],
  },
  {
    id: 'guia-3',
    nivelEnsino: 'Presencial',
    categoria: 'Secretaria',
    condicionante: 'Cancelamento por Insatisfação com Horário',
    motivo: 'Sondagem de Retenção Acadêmica',
    autonomia: 'parcial',
    acaoRecomendada: 'O analista realiza a sondagem de transferência de turno ou polo antes de qualquer deferimento de cancelamento.',
    scriptAluno: 'Compreende-se a situação, [Nome do Aluno]. Antes da formalização do protocolo de desligamento, a Coordenação do Polo entrará em contato para analisar a possibilidade de transição de turno ou flexibilização da grade de horários.',
    checklist: [
      'O analista questiona a viabilidade de mudança de turma',
      'O analista confere a existência de pendências de bolsa de estudos',
      'O analista direciona o protocolo à Coordenação Pedagógica N2',
    ],
  },
  {
    id: 'guia-4',
    nivelEnsino: 'Pós-Graduação',
    categoria: 'Acadêmico',
    condicionante: 'Troca de Orientador ou Linha de Pesquisa',
    motivo: 'Substituição de Orientador de TCC',
    autonomia: 'encaminhamento',
    acaoRecomendada: 'Encaminhamento obrigatório e imediato para a Coordenação Geral de Pós-Graduação. O analista N1 não possui prerrogativa de deliberação.',
    scriptAluno: '[Nome do Aluno], a solicitação formal de alteração de orientador de TCC foi registrada sob o protocolo #[Protocolo]. O caso foi encaminhado ao Colegiado de Pós-Graduação, que emitirá o parecer em até 3 dias úteis.',
    checklist: [
      'O analista anexa a justificativa detalhada apresentada pelo pós-graduando',
      'O analista verifica o prazo regulamentar do cronograma do módulo',
      'O analista faz o escalonamento imediato com sinalização N3',
    ],
  }
];

export const DEMO_CATEGORIES = [
  { id: 'cat-1', name: 'Financeiro & Cobrança', slug: 'financeiro', count: 1 },
  { id: 'cat-2', name: 'Secretaria Acadêmica', slug: 'secretaria', count: 2 },
  { id: 'cat-3', name: 'Atendimento & Matrícula', slug: 'matricula', count: 0 },
  { id: 'cat-4', name: 'Polo & Infraestrutura', slug: 'polo', count: 0 }
];
