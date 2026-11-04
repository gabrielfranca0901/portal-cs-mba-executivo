# Portal de Customer Success & Operações — MBA Executivo (Versão 2.0 | 2026)

Plataforma corporativa full-stack de **Customer Success (CS)**, **Procedimentos Operacionais Padrão (POP)**, **Guia de Saúde & Régua de Inatividade** e **Calculadora de Rescisão Contratual com Emissão de Termo Formal** desenvolvida sob medida para as equipes de CS e Atendimento Acadêmico do **MBA Executivo**.

---

## 🚀 Stack Tecnológico & Arquitetura

- **Framework Full-stack:** TanStack Start v1 (`@tanstack/react-start`) com roteamento estático/SSR tipado via `@tanstack/react-router`.
- **Motor de Build:** Vite 8 com React 19 e Rolldown/SSR.
- **UI & Estilização:** Tailwind CSS v4 nativo (`@theme`), Radix UI / shadcn style tokens e Lucide React.
- **Backend & Autenticação:** Supabase (PostgreSQL / Auth SSR com RLS) e Server Functions seguras.
- **Notificações:** Toasts animados via Sonner.
- **Tema Visual:** Dark Mode padronizado corporativo (`#121212`, `bg-card` `#18181b`, `border-neutral-800`), sem cores arbitrárias.

---

## 📂 Estrutura de Pastas & Módulos

O projeto suporta e sincroniza a estrutura de pastas tanto via `src/` quanto via `app/` (convenção TanStack Start):

```
├── app/ (e src/)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppNav.tsx                # Barra superior com atalhos para as 3 telas e status do CSM
│   │   │   └── GlobalSearchModal.tsx     # Pesquisa rápida global (Ctrl + K)
│   │   └── ui/
│   │       ├── CopyButton.tsx            # Botão de cópia em 1 clique com feedback Sonner
│   │       ├── Marked.tsx                # Marcação de termos pesquisados
│   │       └── RichTextRenderer.tsx      # Renderizador com callouts :::info, :::warning, :::danger
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Cliente browser Supabase
│   │   │   └── server.ts                 # Cliente servidor / admin Supabase
│   │   └── types/
│   │       └── portal.types.ts           # Definições TypeScript completas
│   ├── mock/
│   │   └── demo-data.ts                  # Jornada de CS, POPs, Matriz Health Score, Régua de Inatividade e parâmetros
│   ├── routes/
│   │   ├── __root.tsx                    # Root layout com tema Dark Mode e Toaster
│   │   ├── index.tsx                     # Redirecionador inteligente baseado em sessão
│   │   ├── auth.tsx                      # Autenticação (/auth): Login, Recuperação e Modo Demo CSM
│   │   ├── _authenticated.tsx            # Layout protegido com validação de sessão (beforeLoad)
│   │   ├── _authenticated.portal.tsx     # Base de Conhecimento POP CS (/portal)
│   │   ├── _authenticated.guia.tsx       # Guia & Matriz Health Score (/guia)
│   │   └── _authenticated.calculadora-cancelamento.tsx # Calculadora de Rescisão (/calculadora-cancelamento)
│   ├── server/
│   │   └── auth.ts                       # Server Function checkAccountExists
│   └── styles/
│       └── app.css                       # Design System Tailwind CSS v4 e regras de impressão
├── supabase/
│   └── schema.sql                        # Script DDL PostgreSQL (tabelas, RLS e índices)
├── vercel.json                           # Configuração oficial de deploy Vercel
├── vite.config.ts                        # Configuração Vite com TanStack Start e Tailwind v4
└── package.json                          # Dependências estáveis
```

---

## 🎯 Módulos & Telas Implementadas

### 1. Autenticação e Rotas Protegidas (`/auth` e `/_authenticated`)
- **Tela de Autenticação (`/auth`):** Login seguro com Supabase Auth (e-mail e senha) e recuperação de senha.
- **Modo Demo (Bypass Operacional):** Permite homologação rápida sem dependência imediata do banco com credenciais de CSM Sênior.
- **Layout Protegido (`/_authenticated`):** Route Guard no `beforeLoad` garantindo redirecionamento de anônimos para `/auth`.
- **Barra Superior (`AppNav`):** Identidade visual "CS & Operações — MBA Executivo (v2.0 | 2026)", atalhos para as três telas principais, status do analista conectado e botão de logout.

### 2. Base de Conhecimento POP de CS (`/portal`)
- **Jornada do Cliente (Customer Success) do MBA Executivo:**
  - **Estágio 1: Boas-vindas & Onboarding (Dias 1 a 14):** Primeiro contato de acolhimento, Welcome Call do CSM, ativação de credenciais no AVA, diagnóstico de metas executivas e aula inaugural.
  - **Estágio 2: Adoção & Engajamento Contínuo (Meses 2 a 10):** Acompanhamento quinzenal de frequência, workshops de networking executivo, checkpoints bimestrais de ROI e protocolo anti-burnout com flexibilização assistida.
  - **Estágio 3: Conclusão, Formação & Advocacy (Meses 11 e 12):** Banca do Projeto Final Aplicado (TCC Executivo), expedição do Certificado MEC, ingresso no Clube de Alumni e pesquisa NPS de Advocacy.
- **POP de Cancelamento & Retenção Prévia:**
  - Protocolo obrigatório de escuta ativa e contenção antes de qualquer rescisão:
    1. **Trancamento de Matrícula por até 60 dias:** pausa formal sem custos adicionais ou juros, mantendo o vínculo e os créditos concluídos.
    2. **Repactuação de Cronograma:** flexibilização de prazos e participação na turma subsequente.
    3. **Transição Assistida:** Encaminhamento direto para a Calculadora de Rescisão Contratual caso a retenção não seja viável.
- **Recursos da Tela:** Steppers com passos numerados, callouts de severidade, blocos recolhíveis de scripts com botão de cópia em 1 clique e índice lateral com Scrollspy dinâmico.

### 3. Guia de Atendimento e Régua de Saúde (`/guia`)
- **Matriz de Indicadores de Saúde (Health Score):**
  - 🟢 **Verde (Saudável - 80 a 100 pts):** Engajamento pleno, ações automatizadas de reconhecimento e intervenções de advocacy do CSM.
  - 🟡 **Amarelo (Atenção - 50 a 79 pts):** Sinais iniciais de desengajamento, lembretes de suporte e contato ativo do CSM para plano de estudo flexível.
  - 🔴 **Vermelho (Risco Alto - 0 a 49 pts):** Inatividade crítica, alerta imediato no dashboard, reunião 1-on-1 de emergência e oferta de trancamento de 60 dias.
- **Simulador Interativo em Tempo Real:** Permite ao CSM calibrar dias sem acesso, projetos pendentes, presença em masterclasses e NPS para calcular o Health Score instantaneamente.
- **Régua de Inatividade Operacional:**
  - **Gatilho de 10 Dias:** Notificação automatizada personalizada via e-mail e WhatsApp com link para gravações resumidas.
  - **Gatilho de 20 Dias:** Marco crítico com intervenção humana direta obrigatória do CSM (ligação e oferta de trancamento ou repactuação) e escalonamento para a Coordenação Acadêmica.
- **Guia Tático de Atendimento:** Filtros táteis em pílula por categoria e condicionante com badges de autonomia (Total, Parcial, Encaminhamento).

### 4. Calculadora de Rescisão Contratual (`/calculadora-cancelamento`)
- **Parâmetros Oficiais do MBA Executivo:**
  - Duração: 12 meses
  - Mensalidade: R$ 500,00 (Total Contratado: R$ 6.000,00)
- **Motor de Cálculo da Multa Rescisória:**
  - Multa de 20% incidente sobre o saldo remanescente dos meses não cursados.
  - *Exemplo oficial:* 1 mês cursado e pago $\rightarrow$ 11 meses restantes (R$ 5.500,00) $\rightarrow$ Multa de R$ 1.100,00.
  - Tratamento para mensalidades de meses cursados em atraso com consolidação do saldo total para quitação.
  - Sliders interativos de meses cursados (1 a 11) e meses pagos.
- **Gerador de Termo Formal de Rescisão:**
  - Emissão automática de documento institucional com protocolo único, memória de cálculo discriminada e cláusulas contratuais.
  - 3 opções oficiais de pagamento:
    - **PIX Instantâneo** com chave CNPJ e identificador do protocolo.
    - **Cartão de Crédito** em até 6x sem juros.
    - **Boleto Bancário** com vencimento em 3 dias úteis.
  - Instruções de próximos passos (comprovante, emissão de histórico em 5 dias úteis e salvaguarda de créditos por 2 anos).
  - Botões de ação: **Copiar Termo Completo**, **Copiar Resumo para WhatsApp** e **Imprimir / Salvar PDF** (com estilização `@media print` otimizada).

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- **Node.js** >= 20.x ou 22.x
- **npm** >= 10.x

### Passo a Passo

1. **Acesse a pasta do projeto:**
   ```bash
   cd unipds-portal-pop
   ```

2. **Instale as dependências:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure as variáveis de ambiente:**
   Crie ou edite o arquivo `.env`:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
   SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-secreta
   ```

4. **Execute as migrações SQL no Supabase:**
   Copie o conteúdo de `supabase/schema.sql` e execute no SQL Editor do seu projeto Supabase.

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação em `http://localhost:5173`.

6. **Valide a compilação do build de produção:**
   ```bash
   npm run build
   ```

---

## 🚀 Deploy na Vercel

O projeto possui o `vercel.json` configurado conforme as diretrizes:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build"
}
```

Basta conectar o repositório na **Vercel**, preencher as variáveis do Supabase e o deploy será concluído com sucesso.
