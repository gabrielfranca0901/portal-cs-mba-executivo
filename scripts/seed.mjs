const url = "https://lvskzzumnhntntjdpbaa.supabase.co/rest/v1";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2c2t6enVtbmhudG50amRwYmFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjU2MzQwMywiZXhwIjoyMTAyMTM5NDAzfQ.00sofqRjTarOT-KKOD9xW1fiX69GC3q0xP3TT3eGePE";

const articles = [
  {
    id: "a1111111-1111-1111-1111-111111111111",
    title: "Jornada CS — Estágio 1: Boas-vindas & Onboarding (Dias 1 a 14)",
    slug: "jornada-cs-boas-vindas-onboarding",
    category: "Jornada do Aluno (CS)",
    journey_stage: "onboarding",
    tags: ["#onboarding", "#boas_vindas", "#welcome_call", "#primeiro_acesso", "#dias_1_a_14"],
    summary: "Rito obrigatório dos primeiros 14 dias do executivo: acolhimento pelo CSM, liberação de credenciais no AVA, sessão inaugural e diagnóstico de metas profissionais.",
    sections: [
      {
        id: "b1111111-1111-1111-1111-111111111111",
        title: "Dias 1 a 3: Ativação de Acesso e Welcome Call do CSM",
        order_index: 1,
        content: "No momento da confirmação da matrícula, o CSM responsável deve verificar no sistema a geração das credenciais executivas para [Nome do Aluno]. :::info O primeiro contato deve ocorrer em até 24h úteis via WhatsApp e e-mail corporativo, transmitindo autoridade, acolhimento e exclusividade de atendimento executivo. ::: O CSM deve confirmar se o executivo conseguiu logar no Ambiente Virtual de Aprendizagem (AVA) e na Biblioteca Digital de Casos de Negócios (Harvard/Pearson).",
        script: "Olá, [Nome do Aluno]! Seja muito bem-vindo(a) ao MBA Executivo. Eu sou o(a) [Nome do CSM], seu Gerente de Sucesso (CSM) dedicado ao longo de toda a sua jornada acadêmica e executiva. Já liberamos suas credenciais prioritárias no AVA: [Link de Acesso]. Vamos agendar nossa rápida Welcome Call de 15 minutos para calibrar seus objetivos de liderança e apresentar o cronograma da sua turma?"
      },
      {
        id: "b1111111-1111-1111-1111-111111111112",
        title: "Dias 4 a 7: Mapeamento de Expectativas e Sessão Inaugural ao Vivo",
        order_index: 2,
        content: "O CSM aplica o Formulário Diagnóstico de Perfil Executivo (cargo atual, desafios de gestão imediatos e objetivos com o MBA). :::warning Executivos que não preencherem o diagnóstico até o 7º dia devem receber contato ativo individualizado, pois a ausência precoce eleva em 4x o risco de evasão no primeiro trimestre. ::: Agendamento formal da Aula Magna / Live Inaugural com o Coordenador Acadêmico.",
        script: "Prezado(a) [Nome do Aluno], confirmamos a realização da Sessão Inaugural da sua turma no próximo dia [Data da Live], às 19h30. Teremos a presença da Coordenação do MBA e um painel sobre Liderança Estratégica. Reserve sua agenda pelo link da sala executiva: [Link da Sala]."
      },
      {
        id: "b1111111-1111-1111-1111-111111111113",
        title: "Dias 8 a 14: Primeiro Marco de Entrega (Primeiro Valor Percebido - TTV)",
        order_index: 3,
        content: "Validação da conclusão do Módulo Zero (Metodologia do MBA, ferramentas de estudo e dinâmica dos cases). O CSM valida o selo de Onboarding Concluído no CRM de CS. Caso o executivo não tenha acessado a plataforma após 10 dias, acionar imediatamente o gatilho da Régua de Inatividade."
      }
    ]
  },
  {
    id: "a2222222-2222-2222-2222-222222222222",
    title: "Jornada CS — Estágio 2: Adoção & Engajamento Contínuo (Meses 2 a 10)",
    slug: "jornada-cs-adocao-engajamento-continuo",
    category: "Jornada do Aluno (CS)",
    journey_stage: "adocao",
    tags: ["#adocao", "#engajamento", "#networking", "#retencao_ativa", "#meses_2_a_10"],
    summary: "Acompanhamento do ciclo central do MBA Executivo: cadência de aulas quinzenais, workshops de networking, checkpoints bimestrais de ROI e prevenção de estafa executiva.",
    sections: [
      {
        id: "b2222222-2222-2222-2222-222222222221",
        title: "Cadência Quinzenal de Consumo e Presença em Masterclasses",
        order_index: 1,
        content: "O CSM realiza a checagem quinzenal do progresso acadêmico no dashboard de CS. O executivo deve manter frequência mínima de 75% nos encontros síncronos e consumo contínuo das videoaulas assíncronas gravadas pelos professores especialistas. :::info Alunos que participam das rodadas mensais de Networking Executivo apresentam Health Score 35% superior à média geral. :::"
      },
      {
        id: "b2222222-2222-2222-2222-222222222222",
        title: "Checkpoints Bimestrais de Alinhamento e Percepção de ROI",
        order_index: 2,
        content: "A cada 2 meses (Mês 2, 4, 6 e 8), o CSM agenda uma breve reunião de alinhamento executivo (15 a 20 minutos) para verificar a aplicabilidade prática dos módulos concluídos no dia a dia da empresa do aluno.",
        script: "Olá, [Nome do Aluno]! Chegamos ao encerramento do 3º módulo do seu MBA. Gostaria de entender: você já conseguiu implementar no seu time alguma das metodologias debatidas nas últimas aulas? Estamos disponíveis para apoiar suas conexões com outros executivos da turma e orientar sobre as próximas entregas práticas."
      },
      {
        id: "b2222222-2222-2222-2222-222222222223",
        title: "Protocolo de Prevenção a Desengajamento por Sobrecarga de Trabalho",
        order_index: 3,
        content: ":::warning Quando o executivo relatar viagens corporativas, fechamento de trimestre (quarter) ou projetos intensos na empresa, o CSM NÃO deve insistir com cobranças frias de prazos. ::: Deve ser oferecido o Plano de Estudo Flexível com extensão assistida de entrega de projetos em até 15 dias sem penalidade pedagógica."
      }
    ]
  },
  {
    id: "a3333333-3333-3333-3333-333333333333",
    title: "Jornada CS — Estágio 3: Conclusão, Formação & Advocacy (Meses 11 e 12)",
    slug: "jornada-cs-conclusao-formacao-advocacy",
    category: "Jornada do Aluno (CS)",
    journey_stage: "conclusao",
    tags: ["#conclusao", "#tcc_executivo", "#formacao", "#advocacy", "#alumni", "#meses_11_e_12"],
    summary: "Rito de finalização do MBA: entrega e banca do Projeto Aplicado, expedição do Certificado MEC, pesquisa NPS de conclusão e adesão ao Clube de Alumni.",
    sections: [
      {
        id: "b3333333-3333-3333-3333-333333333331",
        title: "Mês 11: Suporte e Orientação ao Projeto Final Aplicado",
        order_index: 1,
        content: "O CSM conecta o formando ao orientador executivo para a estruturação do Business Case Final. Conferência da regularidade documental completa (diploma de graduação autenticado, documento de identificação com foto e histórico escolar)."
      },
      {
        id: "b3333333-3333-3333-3333-333333333332",
        title: "Mês 12: Conclusão Acadêmica e Expedição do Certificado MEC",
        order_index: 2,
        content: "Com a nota final homologada pela banca, a Secretaria Acadêmica inicia o protocolo de emissão e registro do certificado de especialista lato sensu (reconhecido pelo MEC com carga de 360h+). :::info O prazo regulamentar de expedição digital com chancela ICP-Brasil é de até 30 dias após o fechamento da ata de notas. :::",
        script: "Parabéns, [Nome do Aluno]! Sua banca de conclusão do MBA Executivo foi homologada com sucesso. Você acaba de concluir uma jornada de excelência em gestão e liderança. O certificado digital oficial com registro MEC será emitido em seu nome. Foi um privilégio acompanhar sua trajetória!"
      },
      {
        id: "b3333333-3333-3333-3333-333333333333",
        title: "Ingresso no Clube de Alumni e Programa de Advocacy (NPS Final)",
        order_index: 3,
        content: "Aplicação da Pesquisa NPS de Conclusão. Para promotores (NPS 9 e 10): convite para gravação de depoimento em vídeo profissional, publicação de case de sucesso no LinkedIn institucional e participação no programa Member-Get-Member com voucher de mentoria para indicações de novos líderes."
      }
    ]
  },
  {
    id: "a4444444-4444-4444-4444-444444444444",
    title: "Procedimento Operacional Padrão de Cancelamento & Retenção Prévia",
    slug: "pop-cancelamento-retencao-previa",
    category: "Cancelamento & Retenção",
    journey_stage: "retencao",
    tags: ["#cancelamento", "#retencao", "#trancamento_60_dias", "#repactuacao", "#rescisao", "#multa_20_porcento"],
    summary: "Rito mandatório para solicitações de desistência do MBA: etapas obrigatórias de contenção prévia (trancamento de até 60 dias e repactuação de cronograma) antes do cálculo rescisório.",
    sections: [
      {
        id: "b4444444-4444-4444-4444-444444444441",
        title: "Etapa 1: Sondagem Crítica e Escuta Ativa pelo CSM",
        order_index: 1,
        content: "Ao receber qualquer manifestação de cancelamento, o CSM deve realizar contato ativo em até 4 horas úteis. O objetivo primário é mapear a causa-raiz: sobrecarga corporativa passageira, dificuldade financeira pontual ou desalinhamento de conteúdo. :::danger É expressamente proibido deferir o cancelamento ou emitir guia de multa sem antes aplicar as duas opções de contenção prévia abaixo. :::"
      },
      {
        id: "b4444444-4444-4444-4444-444444444442",
        title: "Etapa 2 (Contenção A): Oferta de Trancamento de Matrícula por até 60 Dias",
        order_index: 2,
        content: "Apresentar a possibilidade de congelamento formal da matrícula pelo período de 30 a 60 dias. Durante esse intervalo, as cobranças de mensalidades futuras ficam suspensas, o executivo preserva todos os créditos das disciplinas já cursadas e não arca com nenhuma multa ou encargo rescisório.",
        script: "Compreendo perfeitamente o momento desafiador na sua rotina profissional, [Nome do Aluno]. Antes de tomarmos qualquer decisão definitiva de rescisão contratual que envolva perda de vínculo e custos de multa, nossa coordenação oferece a opção de Trancamento Estratégico por até 60 dias. Suas mensalidades futuras ficam suspensas, você não perde nada do que cursou e pode retomar com a turma seguinte assim que sua rotina estabilizar. O que acha de pausarmos temporariamente?"
      },
      {
        id: "b4444444-4444-4444-4444-444444444443",
        title: "Etapa 3 (Contenção B): Repactuação de Datas e Flexibilização de Cronograma",
        order_index: 3,
        content: "Se o motivo do aluno for o acúmulo de entregas de projetos ou ausência em masterclasses ao vivo, o CSM formaliza um Cronograma de Recuperação Assistida com a Coordenação Acadêmica, permitindo a entrega assíncrona das atividades e a participação como ouvinte nas aulas da turma posterior.",
        script: "[Nome do Aluno], alinhamos com a Coordenação Pedagógica uma flexibilização personalizada: podemos postergar os prazos de entrega dos seus projetos práticos em até 30 dias e liberar as gravações integrais dos módulos perdidos para você assistir no seu próprio ritmo, sem qualquer prejuízo à sua nota ou titulação."
      },
      {
        id: "b4444444-4444-4444-4444-444444444444",
        title: "Etapa 4: Inevitabilidade da Rescisão e Uso da Calculadora Oficial",
        order_index: 4,
        content: "Somente quando o executivo recusar expressamente tanto o trancamento de 60 dias quanto a repactuação de cronograma, o analista deve abrir a tela da Calculadora de Rescisão Contratual (/calculadora-cancelamento). :::info Regra Contratual do MBA Executivo: O contrato totaliza 12 meses a R$ 500,00/mês (R$ 6.000,00). A multa rescisória é fixada estritamente em 20% sobre o saldo remanescente dos meses não cursados. Exemplo: 1 mês cursado e pago -> 11 meses restantes (R$ 5.500,00) geram multa de R$ 1.100,00. ::: O analista emite o Termo Formal e encaminha as opções de pagamento (PIX, Cartão ou Boleto)."
      }
    ]
  }
];

async function runSeed() {
  console.log("Iniciando seed completo via PostgREST API...");

  for (const art of articles) {
    const { sections, ...articleData } = art;

    const resArt = await fetch(`${url}/pop_articles`, {
      method: "POST",
      headers: {
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=representation"
      },
      body: JSON.stringify(articleData)
    });

    if (!resArt.ok) {
      console.error(`Erro ao salvar artigo ${art.title}: ${resArt.status}`, await resArt.text());
      continue;
    }
    console.log(`✓ Artigo sincronizado: ${art.title}`);

    for (const sec of sections) {
      const secData = {
        id: sec.id,
        article_id: art.id,
        title: sec.title,
        content: sec.content,
        script: sec.script || null,
        order_index: sec.order_index
      };

      const resSec = await fetch(`${url}/pop_sections`, {
        method: "POST",
        headers: {
          "apikey": key,
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates,return=representation"
        },
        body: JSON.stringify(secData)
      });

      if (!resSec.ok) {
        console.error(`  Erro ao salvar seção ${sec.title}: ${resSec.status}`, await resSec.text());
      }
    }
    console.log(`  ✓ ${sections.length} seções vinculadas.`);
  }

  console.log("\n===========================================");
  console.log("Seed finalizado com sucesso!");
  console.log("===========================================");
}

runSeed().catch(console.error);
