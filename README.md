# Portal POP & Guia de Atendimento (UNIPDS & Anhanguera) — Versão 2.0 (2026)

Plataforma corporativa full-stack de **Procedimentos Operacionais Padrão (POP)** e **Guia Tático de Atendimento Rápido** desenvolvida para os polos e equipes de suporte acadêmico da **UNIPDS & Anhanguera Educacional**.

---

## 🚀 Tecnologias e Arquitetura

- **Framework Full-stack:** TanStack Start v1 (`@tanstack/react-start`) com roteamento baseado em arquivos (`@tanstack/react-router`).
- **Motor de Build:** Vite 8 com SSR e geração estática/reidratação React 19.
- **UI & Estilização:** React 19, Tailwind CSS v4 nativo (`@theme`), Radix UI e Lucide React.
- **Feedback & Notificações:** Toasts animados via Sonner.
- **Backend & Autenticação:** Supabase / PostgreSQL gerenciado com Row Level Security (RLS) e Server Functions seguras.
- **Tema:** Dark Mode corporativo nativo (`#121212`).

---

## 📂 Mapa de Rotas e Telas

1. **Rota Raiz (`/`):** Redirecionador inteligente baseado em sessão (`supabase.auth.getSession()`). Direciona analistas autenticados para `/portal` e visitantes anônimos para `/auth`.
2. **Autenticação (`/auth`):**
   - **Login Corporativo:** Sanitização e validação segura no servidor (`checkAccountExists`).
   - **Esqueci a Senha:** Envio de e-mail de recuperação institucional.
   - **Redefinição de Senha:** Registro de nova credencial segura.
   - **Modo Demo (Bypass Operacional):** Acesso de homologação rápida para testes sem dependência imediata do banco.
3. **Layout Protegido (`/_authenticated`):** Route Guard validando o analista via `supabase.auth.getUser()` e renderizando a barra superior (`AppNav`).
4. **Base de Conhecimento POP (`/portal`):** 
   - Sidebar com busca em tempo real e tags em pílulas escuras arredondadas.
   - Área central com steppers numéricos (`Passo 1`, `Passo 2`), RichText inteligente (`[Variáveis]`, hashtags e callouts de severidade) e scripts institucionais recolhíveis.
   - Índice lateral direito com **Scrollspy dinâmico** via `IntersectionObserver`.
5. **Guia de Atendimento Rápido (`/guia`):**
   - Filtros táteis em pílula por **Categoria** e **Condicionante Operacional**.
   - Badges semânticos de autonomia:
     - 🟢 **Autonomia Total** (Resolução N1)
     - 🟡 **Autonomia Parcial** (Requer validação N2)
     - 🔴 **Encaminhamento Obrigatório** (Escalonamento N3)
   - Bloco de script ao aluno com botão de cópia instantânea em 1 clique.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- **Node.js** >= 20.x ou 22.x
- **npm** >= 10.x

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/unipds-portal-pop.git
   cd unipds-portal-pop
   ```

2. **Instale as dependências:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure as variáveis de ambiente:**
   Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```
   Preencha suas chaves do Supabase:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
   SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-secreta
   ```

4. **Execute as migrações SQL no Supabase:**
   Copie o conteúdo de `supabase/schema.sql` e execute no **SQL Editor** do painel do seu projeto Supabase para criar as tabelas `pop_articles`, `pop_sections`, índices e políticas RLS.

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173`.

---

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com recarregamento a quente (HMR).
- `npm run build`: Valida as rotas e compila os pacotes otimizados para cliente e SSR.
- `npm run preview`: Executa localmente o build de produção compilado.
- `npm run generate-routes`: Regenera a árvore de tipos do TanStack Router (`app/routeTree.gen.ts`).

---

## 🚀 Deploy na Vercel

O projeto já inclui o arquivo `vercel.json` pré-configurado:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build"
}
```

Basta importar o repositório no dashboard da **Vercel**, adicionar as variáveis de ambiente (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) e acionar o Deploy.
