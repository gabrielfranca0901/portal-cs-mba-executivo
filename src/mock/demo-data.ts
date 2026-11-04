import { 
  PopArticle, 
  GuiaItem, 
  HealthScoreItem, 
  InactivityTriggerItem, 
  PopCategory, 
  RescisaoContractParams 
} from '~/lib/types/portal.types';

export const MBA_CONTRACT_PARAMS: RescisaoContractParams = {
  duracaoMeses: 12,
  mensalidade: 500.0,
  totalContrato: 6000.0,
  percentualMulta: 0.2, // 20% sobre o saldo remanescente
};

export const DEMO_POP_ARTICLES: PopArticle[] = [
  {
    id: 'pop-jornada-onboarding',
    title: 'Jornada CS — Estágio 1: Boas-vindas & Onboarding (Dias 1 a 14)',
    slug: 'jornada-cs-boas-vindas-onboarding',
    category: 'Jornada do Aluno (CS)',
    journeyStage: 'onboarding',
    tags: ['#onboarding', '#boas_vindas', '#welcome_call', '#primeiro_acesso', '#dias_1_a_14'],
    summary: 'Rito obrigatório dos primeiros 14 dias do executivo: acolhimento pelo CSM, liberação de credenciais no AVA, sessão inaugural e diagnóstico de metas profissionais.',
    updatedAt: '04/11/2026',
    sections: [
      {
        id: 'sec-onb-dia-1-3',
        title: 'Dias 1 a 3: Ativação de Acesso e Welcome Call do CSM',
        orderIndex: 1,
        content: 'No momento da confirmação da matrícula, o CSM responsável deve verificar no sistema a geração das credenciais executivas para [Nome do Aluno]. :::info O primeiro contato deve ocorrer em até 24h úteis via WhatsApp e e-mail corporativo, transmitindo autoridade, acolhimento e exclusividade de atendimento executivo. ::: O CSM deve confirmar se o executivo conseguiu logar no Ambiente Virtual de Aprendizagem (AVA) e na Biblioteca Digital de Casos de Negócios (Harvard/Pearson).',
        script: 'Olá, [Nome do Aluno]! Seja muito bem-vindo(a) ao MBA Executivo. Eu sou o(a) [Nome do CSM], seu Gerente de Sucesso (CSM) dedicado ao longo de toda a sua jornada acadêmica e executiva. Já liberamos suas credenciais prioritárias no AVA: [Link de Acesso]. Vamos agendar nossa rápida Welcome Call de 15 minutos para calibrar seus objetivos de liderança e apresentar o cronograma da sua turma?'
      },
      {
        id: 'sec-onb-dia-4-7',
        title: 'Dias 4 a 7: Mapeamento de Expectativas e Sessão Inaugural ao Vivo',
        orderIndex: 2,
        content: 'O CSM aplica o Formulário Diagnóstico de Perfil Executivo (cargo atual, desafios de gestão imediatos e objetivos com o MBA). :::warning Executivos que não preencherem o diagnóstico até o 7º dia devem receber contato ativo individualizado, pois a ausência precoce eleva em 4x o risco de evasão no primeiro trimestre. ::: Agendamento formal da Aula Magna / Live Inaugural com o Coordenador Acadêmico.',
        script: 'Prezado(a) [Nome do Aluno], confirmamos a realização da Sessão Inaugural da sua turma no próximo dia [Data da Live], às 19h30. Teremos a presença da Coordenação do MBA e um painel sobre Liderança Estratégica. Reserve sua agenda pelo link da sala executiva: [Link da Sala].'
      },
      {
        id: 'sec-onb-dia-8-14',
        title: 'Dias 8 a 14: Primeiro Marco de Entrega (Primeiro Valor Percebido - TTV)',
        orderIndex: 3,
        content: 'Validação da conclusão do Módulo Zero (Metodologia do MBA, ferramentas de estudo e dinâmica dos cases). O CSM valida o selo de Onboarding Concluído no CRM de CS. Caso o executivo não tenha acessado a plataforma após 10 dias, acionar imediatamente o gatilho da Régua de Inatividade.',
      }
    ]
  },
  {
    id: 'pop-jornada-adocao',
    title: 'Jornada CS — Estágio 2: Adoção & Engajamento Contínuo (Meses 2 a 10)',
    slug: 'jornada-cs-adocao-engajamento-continuo',
    category: 'Jornada do Aluno (CS)',
    journeyStage: 'adocao',
    tags: ['#adocao', '#engajamento', '#networking', '#retencao_ativa', '#meses_2_a_10'],
    summary: 'Acompanhamento do ciclo central do MBA Executivo: cadência de aulas quinzenais, workshops de networking, checkpoints bimestrais de ROI e prevenção de estafa executiva.',
    updatedAt: '04/11/2026',
    sections: [
      {
        id: 'sec-adoc-cadencia',
        title: 'Cadência Quinzenal de Consumo e Presença em Masterclasses',
        orderIndex: 1,
        content: 'O CSM realiza a checagem quinzenal do progresso acadêmico no dashboard de CS. O executivo deve manter frequência mínima de 75% nos encontros síncronos e consumo contínuo das videoaulas assíncronas gravadas pelos professores especialistas. :::info Alunos que participam das rodadas mensais de Networking Executivo apresentam Health Score 35% superior à média geral. :::',
      },
      {
        id: 'sec-adoc-checkpoint-bimestral',
        title: 'Checkpoints Bimestrais de Alinhamento e Percepção de ROI',
        orderIndex: 2,
        content: 'A cada 2 meses (Mês 2, 4, 6 e 8), o CSM agenda uma breve reunião de alinhamento executivo (15 a 20 minutos) para verificar a aplicabilidade prática dos módulos concluídos no dia a dia da empresa do aluno.',
        script: 'Olá, [Nome do Aluno]! Chegamos ao encerramento do 3º módulo do seu MBA. Gostaria de entender: você já conseguiu implementar no seu time alguma das metodologias debatidas nas últimas aulas? Estamos disponíveis para apoiar suas conexões com outros executivos da turma e orientar sobre as próximas entregas práticas.'
      },
      {
        id: 'sec-adoc-prevencao-burnout',
        title: 'Protocolo de Prevenção a Desengajamento por Sobrecarga de Trabalho',
        orderIndex: 3,
        content: ':::warning Quando o executivo relatar viagens corporativas, fechamento de trimestre (quarter) ou projetos intensos na empresa, o CSM NÃO deve insistir com cobranças frias de prazos. ::: Deve ser oferecido o Plano de Estudo Flexível com extensão assistida de entrega de projetos em até 15 dias sem penalidade pedagógica.',
      }
    ]
  },
  {
    id: 'pop-jornada-conclusao',
    title: 'Jornada CS — Estágio 3: Conclusão, Formação & Advocacy (Meses 11 e 12)',
    slug: 'jornada-cs-conclusao-formacao-advocacy',
    category: 'Jornada do Aluno (CS)',
    journeyStage: 'conclusao',
    tags: ['#conclusao', '#tcc_executivo', '#formacao', '#advocacy', '#alumni', '#meses_11_e_12'],
    summary: 'Rito de finalização do MBA: entrega e banca do Projeto Aplicado, expedição do Certificado MEC, pesquisa NPS de conclusão e adesão ao Clube de Alumni.',
    updatedAt: '04/11/2026',
    sections: [
      {
        id: 'sec-conc-projeto-final',
        title: 'Mês 11: Suporte e Orientação ao Projeto Final Aplicado',
        orderIndex: 1,
        content: 'O CSM conecta o formando ao orientador executivo para a estruturação do Business Case Final. Conferência da regularidade documental completa (diploma de graduação autenticado, documento de identificação com foto e histórico escolar).',
      },
      {
        id: 'sec-conc-certificacao',
        title: 'Mês 12: Conclusão Acadêmica e Expedição do Certificado MEC',
        orderIndex: 2,
        content: 'Com a nota final homologada pela banca, a Secretaria Acadêmica inicia o protocolo de emissão e registro do certificado de especialista lato sensu (reconhecido pelo MEC com carga de 360h+). :::info O prazo regulamentar de expedição digital com chancela ICP-Brasil é de até 30 dias após o fechamento da ata de notas. :::',
        script: 'Parabéns, [Nome do Aluno]! Sua banca de conclusão do MBA Executivo foi homologada com sucesso. Você acaba de concluir uma jornada de excelência em gestão e liderança. O certificado digital oficial com registro MEC será emitido em seu nome. Foi um privilégio acompanhar sua trajetória!'
      },
      {
        id: 'sec-conc-advocacy',
        title: 'Ingresso no Clube de Alumni e Programa de Advocacy (NPS Final)',
        orderIndex: 3,
        content: 'Aplicação da Pesquisa NPS de Conclusão. Para promotores (NPS 9 e 10): convite para gravação de depoimento em vídeo profissional, publicação de case de sucesso no LinkedIn institucional e participação no programa Member-Get-Member com voucher de mentoria para indicações de novos líderes.',
      }
    ]
  },
  {
    id: 'pop-procedimento-cancelamento',
    title: 'Procedimento Operacional Padrão de Cancelamento & Retenção Prévia',
    slug: 'pop-cancelamento-retencao-previa',
    category: 'Cancelamento & Retenção',
    journeyStage: 'retencao',
    tags: ['#cancelamento', '#retencao', '#trancamento_60_dias', '#repactuacao', '#rescisao', '#multa_20_porcento'],
    summary: 'Rito mandatório para solicitações de desistência do MBA: etapas obrigatórias de contenção prévia (trancamento de até 60 dias e repactuação de cronograma) antes do cálculo rescisório.',
    updatedAt: '04/11/2026',
    sections: [
      {
        id: 'sec-canc-escuta-ativa',
        title: 'Etapa 1: Sondagem Crítica e Escuta Ativa pelo CSM',
        orderIndex: 1,
        content: 'Ao receber qualquer manifestação de cancelamento, o CSM deve realizar contato ativo em até 4 horas úteis. O objetivo primário é mapear a causa-raiz: sobrecarga corporativa passageira, dificuldade financeira pontual ou desalinhamento de conteúdo. :::danger É expressamente proibido deferir o cancelamento ou emitir guia de multa sem antes aplicar as duas opções de contenção prévia abaixo. :::',
      },
      {
        id: 'sec-canc-trancamento-60-dias',
        title: 'Etapa 2 (Contenção A): Oferta de Trancamento de Matrícula por até 60 Dias',
        orderIndex: 2,
        content: 'Apresentar a possibilidade de congelamento formal da matrícula pelo período de 30 a 60 dias. Durante esse intervalo, as cobranças de mensalidades futuras ficam suspensas, o executivo preserva todos os créditos das disciplinas já cursadas e não arca com nenhuma multa ou encargo rescisório.',
        script: 'Compreendo perfeitamente o momento desafiador na sua rotina profissional, [Nome do Aluno]. Antes de tomarmos qualquer decisão definitiva de rescisão contratual que envolva perda de vínculo e custos de multa, nossa coordenação oferece a opção de Trancamento Estratégico por até 60 dias. Suas mensalidades futuras ficam suspensas, você não perde nada do que cursou e pode retomar com a turma seguinte assim que sua rotina estabilizar. O que acha de pausarmos temporariamente?'
      },
      {
        id: 'sec-canc-repactuacao-datas',
        title: 'Etapa 3 (Contenção B): Repactuação de Datas e Flexibilização de Cronograma',
        orderIndex: 3,
        content: 'Se o motivo do aluno for o acúmulo de entregas de projetos ou ausência em masterclasses ao vivo, o CSM formaliza um Cronograma de Recuperação Assistida com a Coordenação Acadêmica, permitindo a entrega assíncrona das atividades e a participação como ouvinte nas aulas da turma posterior.',
        script: '[Nome do Aluno], alinhamos com a Coordenação Pedagógica uma flexibilização personalizada: podemos postergar os prazos de entrega dos seus projetos práticos em até 30 dias e liberar as gravações integrais dos módulos perdidos para você assistir no seu próprio ritmo, sem qualquer prejuízo à sua nota ou titulação.'
      },
      {
        id: 'sec-canc-encaminhamento-calculadora',
        title: 'Etapa 4: Inevitabilidade da Rescisão e Uso da Calculadora Oficial',
        orderIndex: 4,
        content: 'Somente quando o executivo recusar expressamente tanto o trancamento de 60 dias quanto a repactuação de cronograma, o analista deve abrir a tela da Calculadora de Rescisão Contratual (/calculadora-cancelamento). :::info Regra Contratual do MBA Executivo: O contrato totaliza 12 meses a R$ 500,00/mês (R$ 6.000,00). A multa rescisória é fixada estritamente em 20% sobre o saldo remanescente dos meses não cursados. Exemplo: 1 mês cursado e pago -> 11 meses restantes (R$ 5.500,00) geram multa de R$ 1.100,00. ::: O analista emite o Termo Formal e encaminha as opções de pagamento (PIX, Cartão ou Boleto).',
      }
    ]
  }
];

export const DEMO_HEALTH_SCORE_MATRIX: HealthScoreItem[] = [
  {
    id: 'health-verde',
    level: 'verde',
    nome: 'Saudável (Engajamento Pleno)',
    faixaScore: '80 a 100 pontos',
    corBadge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    descricao: 'Executivo com ritmo exemplar de estudos, participação ativa nos fóruns, presença nas masterclasses síncronas e entregas de projetos rigorosamente em dia.',
    criterios: [
      'Acesso ao AVA frequente (mínimo 3 vezes por semana)',
      '100% dos projetos dos módulos entregues dentro do prazo regulamentar',
      'Presença confirmada nas aulas magnas e workshops executivos',
      'Respostas às pesquisas de satisfação com notas 9 ou 10 (Promotor NPS)',
      'Mensalidades rigorosamente em dia'
    ],
    acoesAutomatizadas: [
      'Disparo de e-mails de parabenização a cada módulo concluído com louvor',
      'Liberação automática de badge de Liderança Executiva no perfil do AVA',
      'Convites prioritários via bot para mesas redondas e webinars com CEOs'
    ],
    intervencoesCSM: [
      'Contato bimestral para sondagem de cases de sucesso aplicados na empresa do aluno',
      'Convite para atuar como mentor convidado ou painelista em debates de alunos iniciantes',
      'Apresentação do programa de Advocacy e convite para indicação corporativa de novos alunos'
    ],
    scriptCSM: 'Olá, [Nome do Aluno]! Parabéns pela sua excelente dedicação e pelos resultados no último módulo do MBA. Notamos seu engajamento exemplar nas discussões práticas. Gostaria de convidá-lo(a) para um bate-papo de 15 minutos para compartilharmos seu case em nosso canal de Alumni!',
    checklist: [
      'Validar se o executivo autorizou divulgação de depoimento profissional',
      'Checar se há interesse em mentorias 1-on-1 com os professores titulares',
      'Apresentar os benefícios de indicação institucional do MBA'
    ]
  },
  {
    id: 'health-amarelo',
    level: 'amarelo',
    nome: 'Atenção (Sinais Iniciais de Risco)',
    faixaScore: '50 a 79 pontos',
    corBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    descricao: 'Aluno apresentando queda no ritmo de acessos, ausência em masterclass recente ou uma entrega prática pendente.',
    criterios: [
      'Sem login no AVA entre 7 e 14 dias corridos',
      '1 projeto prático de módulo em atraso (até 15 dias)',
      'Ausência em encontro síncrono sem justificativa formal prévia',
      'Avaliação neutra ou feedback de dificuldade de conciliação de tempo',
      'Atraso pontual de mensalidade inferior a 15 dias'
    ],
    acoesAutomatizadas: [
      'Disparo de e-mail de alerta amigável com resumo dos conteúdos do módulo',
      'Envio de link direto no WhatsApp para acesso às gravações em 1 clique',
      'Notificação no dashboard do CSM com marcação amarela de prioridade moderada'
    ],
    intervencoesCSM: [
      'Contato ativo via WhatsApp ou ligação direta em até 24 horas',
      'Mapeamento da sobrecarga profissional e oferta de apoio pedagógico',
      'Apresentação da flexibilização do prazo de entrega do projeto sem multa pedagógica',
      'Proposta de plano de estudo compacto focado nos pontos essenciais do módulo'
    ],
    scriptCSM: 'Olá, [Nome do Aluno], tudo bem? Notei que você ainda não conseguiu acessar o módulo de [Nome do Módulo] nesta semana. Sei que a rotina executiva é puxada, mas estamos aqui para te ajudar a não acumular as atividades. Preparei um resumo dos pontos-chave e o link direto para a gravação da masterclass: [Link]. Quer alinhar um prazo flexível comigo para a entrega do seu projeto?',
    checklist: [
      'Verificar histórico de logins dos últimos 30 dias',
      'Registrar a causa apontada pelo executivo no CRM de CS',
      'Definir nova data acordada e agendar follow-up em 7 dias'
    ]
  },
  {
    id: 'health-vermelho',
    level: 'vermelho',
    nome: 'Risco Alto (Evasão Iminente)',
    faixaScore: '0 a 49 pontos',
    corBadge: 'bg-red-500/20 text-red-400 border-red-500/30',
    descricao: 'Situação crítica com probabilidade iminente de evasão, cancelamento contratual ou inadimplência crônica.',
    criterios: [
      'Mais de 15 dias consecutivos sem nenhum acesso ao AVA',
      '2 ou mais entregas de projetos atrasadas cumulativamente',
      'Manifestação de descontentamento ou pedido informal de cancelamento',
      'Falta de resposta a contatos do CSM há mais de 5 dias',
      'Inadimplência financeira superior a 30 dias'
    ],
    acoesAutomatizadas: [
      'Geração de chamado de Alerta Vermelho com SLA de 4 horas para atendimento humano',
      'Bloqueio imediato de envios de e-mails automáticos promocionais ou genéricos',
      'Notificação push prioritária ao Coordenador de Operações de CS'
    ],
    intervencoesCSM: [
      'Ligação prioritária do CSM Sênior ou Coordenador de Atendimento Acadêmico',
      'Aplicação IMEDIATA das opções de contenção prévia: Trancamento de até 60 dias sem custos ou Repactuação total da grade com turma posterior',
      'Se houver questão financeira, negociação de repactuação das parcelas sem juros moratórios',
      'Caso a retenção seja expressamente recusada, transição assistida para a Calculadora de Rescisão'
    ],
    scriptCSM: 'Prezado(a) [Nome do Aluno], como Coordenador(a) de Customer Success do MBA Executivo, estou entrando em contato direto com você. Identificamos que você está há algum tempo sem acompanhar as disciplinas. Nosso compromisso principal é com a sua formação de liderança. Antes de qualquer decisão definitiva de desligamento, podemos pausar sua matrícula por até 60 dias sem custo algum ou repactuar suas entregas. Quando podemos conversar hoje por 10 minutos?',
    checklist: [
      'Realizar tentativa de contato telefônico e mensagem executiva direta',
      'Apresentar formalmente o trancamento de matrícula de 60 dias sem ônus',
      'Se o aluno insistir no cancelamento, abrir protocolo rescisório e acionar a Calculadora de Rescisão Contratual'
    ]
  }
];

export const DEMO_INACTIVITY_TRIGGERS: InactivityTriggerItem[] = [
  {
    dias: 10,
    titulo: 'Gatilho Operacional: 10 Dias de Inatividade',
    severidade: 'alerta',
    descricao: 'O aluno está sem interações na plataforma há 10 dias consecutivos. O sistema dispara alertas automatizados e prepara o CSM para abordagem.',
    disparosAutomatizados: [
      'E-mail transacional inteligente: "Sentimos sua falta nas discussões executivas"',
      'Resumo dos principais insights da semana gerado pela tutoria',
      'Envio de link no WhatsApp via assistente virtual com opção de "Falar com meu CSM"'
    ],
    acaoHumanaCSM: 'O CSM monitora se o aluno clicou no link em até 24h. Caso permaneça inativo, envia mensagem personalizada de apoio operacional.',
    tempoLimiteResposta: '24 horas para retorno ou checagem de leitura',
    scriptMensagem: 'Olá, [Nome do Aluno]! Identificamos que já fazem 10 dias desde seu último acesso ao portal do MBA. Sabemos dos compromissos corporativos intensos. Deixei disponível na sua área as gravações resumidas do módulo vigente: [Link]. Se precisar de apoio pedagógico ou flexibilização de prazos, me avise por aqui!',
    escalonamento: 'Registro no histórico de CS. Caso não haja retorno em 48h, preparar intervenção para o gatilho de 20 dias.'
  },
  {
    dias: 20,
    titulo: 'Gatilho Operacional: 20 Dias de Inatividade',
    severidade: 'critico',
    descricao: 'Marco crítico de abandono de curso. Exige intervenção humana mandatória do CSM com escalonamento para a Coordenação Acadêmica.',
    disparosAutomatizados: [
      'Alerta sonoro e visual prioritário na central de CS',
      'Bloqueio de disparos impessoais para não causar atrito com o executivo',
      'Abertura de ticket de retenção de urgência no CRM'
    ],
    acaoHumanaCSM: 'Intervenção humana direta OBRIGATÓRIA: o CSM deve ligar para o executivo e enviar a proposta oficial de Trancamento Temporário por até 60 dias ou Repactuação de Cronograma.',
    tempoLimiteResposta: '48 horas corridas para contato efetivo',
    scriptMensagem: 'Prezado(a) [Nome do Aluno], identifiquei que seu último acesso ao MBA foi há 20 dias. Como seu gestor de sucesso, me preocupo com a continuidade do seu desenvolvimento profissional. Temos alternativas formais para que você não perca seu investimento, como o trancamento sem custos por até 60 dias. Podemos agendar uma rápida conversa hoje?',
    escalonamento: 'Se o executivo não atender ou não responder em 48h úteis, o caso é escalado à Coordenação Acadêmica para deliberação institucional.'
  }
];

export const DEMO_CATEGORIES: PopCategory[] = [
  { id: 'cat-jornada', name: 'Jornada do Aluno (CS)', slug: 'jornada', count: 3 },
  { id: 'cat-retencao', name: 'Cancelamento & Retenção', slug: 'retencao', count: 1 },
  { id: 'cat-secretaria', name: 'Secretaria Acadêmica', slug: 'secretaria', count: 2 },
  { id: 'cat-financeiro', name: 'Financeiro & Contratos', slug: 'financeiro', count: 1 }
];

export const DEMO_GUIA_BASE: GuiaItem[] = [
  {
    id: 'guia-mba-1',
    nivelEnsino: 'MBA Executivo',
    categoria: 'Retenção & Cancelamento',
    condicionante: 'Pedido Informal de Cancelamento por Falta de Tempo',
    motivo: 'Contenção com Trancamento de 60 Dias ou Repactuação',
    autonomia: 'total',
    acaoRecomendada: 'O analista N1/CSM possui autonomia total para aplicar o Trancamento Estratégico de até 60 dias sem juros ou prorrogar prazos de projetos em até 30 dias sem necessidade de aprovação da diretoria.',
    scriptAluno: 'Compreendo perfeitamente sua rotina corrida, [Nome do Aluno]. Para proteger seu investimento acadêmico, temos a prerrogativa de conceder um Trancamento Estratégico por até 60 dias sem qualquer cobrança adicional ou repactuar as datas de entrega dos seus projetos com a turma seguinte. Posso formalizar essa pausa para você retomar no próximo ciclo?',
    checklist: [
      'Verificar quantos meses e módulos o executivo já concluiu',
      'Oferecer a pausa de 60 dias como primeira alternativa de contenção',
      'Caso o aluno recuse, abrir a Calculadora de Rescisão Contratual (/calculadora-cancelamento)'
    ]
  },
  {
    id: 'guia-mba-2',
    nivelEnsino: 'MBA Executivo',
    categoria: 'Financeiro & Rescisão',
    condicionante: 'Rescisão Contratual Definitiva (Contenção Recusada)',
    motivo: 'Cálculo de Multa Rescisória de 20% sobre Saldo Remanescente',
    autonomia: 'total',
    acaoRecomendada: 'Calcular a multa rescisória fixada em 20% sobre o saldo dos meses não cursados com base no valor de R$ 500,00/mês e contrato de 12 meses (R$ 6.000,00 total). Emitir o Termo Formal e enviar as opções de pagamento (PIX, Cartão ou Boleto).',
    scriptAluno: 'Prezado(a) [Nome do Aluno], conforme alinhado e diante da impossibilidade de pausa ou repactuação, emitimos o Termo Oficial de Rescisão Contratual do MBA Executivo. O cálculo segue estritamente o contrato: com [X] meses cursados, a multa de 20% sobre o saldo remanescente é de R$ [Valor Multa]. Seguem as opções de liquidação via PIX, Cartão em até 6x ou Boleto.',
    checklist: [
      'Confirmar número exato de meses cursados (1 a 11)',
      'Checar se há mensalidades vencidas de meses já cursados',
      'Emitir o Termo Formal pelo Portal com protocolo registrado',
      'Encaminhar comprovante de quitação para a Secretaria Acadêmica após o pagamento'
    ]
  },
  {
    id: 'guia-mba-3',
    nivelEnsino: 'MBA Executivo',
    categoria: 'Acadêmico & Mentoria',
    condicionante: 'Troca de Orientador ou Linha de Projeto Aplicado',
    motivo: 'Remanejamento de Orientador de TCC Executivo',
    autonomia: 'parcial',
    acaoRecomendada: 'O CSM pode coletar o novo briefing e tema profissional do aluno, verificando a disponibilidade dos docentes da pós-graduação e submetendo à Coordenação para validação em até 48 horas úteis.',
    scriptAluno: '[Nome do Aluno], acolhemos a solicitação de alinhamento de orientador para focar seu Projeto Aplicado na área de [Área Desejada]. Encaminhei sua proposta de business case à Coordenação Acadêmica e retornarei com a confirmação do novo orientador em até 2 dias úteis.',
    checklist: [
      'Coletar justificativa executiva e escopo pretendido do projeto',
      'Conferir se o aluno está no mês 10 ou 11 da grade',
      'Submeter protocolo para parecer da Coordenação Acadêmica N2'
    ]
  },
  {
    id: 'guia-mba-4',
    nivelEnsino: 'MBA Executivo',
    categoria: 'Advocacy & Alumni',
    condicionante: 'Aluno Promotor (NPS 9-10) Concluindo o Curso',
    motivo: 'Convite para Programa de Embaixador e Alumni',
    autonomia: 'total',
    acaoRecomendada: 'Convidar o executivo formando para ingressar na Comunidade de Alumni, gravar depoimento em vídeo profissional para as redes do MBA e receber benefícios em novos cursos e mentorias.',
    scriptAluno: 'Parabéns pela conclusão brilhante do MBA Executivo, [Nome do Aluno]! Devido ao seu excelente desempenho e feedback positivo, gostaríamos de convidá-lo(a) oficialmente para fazer parte do nosso Conselho Consultivo de Alumni e gravar um breve depoimento sobre a transformação na sua carreira.',
    checklist: [
      'Confirmar aprovação final no Projeto Aplicado (nota >= 8.5)',
      'Enviar termo de autorização de uso de imagem e depoimento',
      'Disponibilizar acesso vitalício ao grupo restrito de executivos no LinkedIn/WhatsApp'
    ]
  }
];
