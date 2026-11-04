-- ==============================================================================
-- ESQUEMA POSTGRESQL PARA O PORTAL DE CS & OPERAÇÕES — MBA EXECUTIVO (v2.0 | 2026)
-- Execute este script no SQL Editor do seu Dashboard Supabase
-- ==============================================================================

-- 1. Tabela de Artigos de POP (Procedimentos Operacionais Padrão e Jornada de CS)
CREATE TABLE IF NOT EXISTS public.pop_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    journey_stage TEXT, -- 'onboarding', 'adocao', 'conclusao', 'retencao'
    tags TEXT[] NOT NULL DEFAULT '{}',
    summary TEXT NOT NULL,
    views_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Tabela de Seções e Passos do POP
CREATE TABLE IF NOT EXISTS public.pop_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID NOT NULL REFERENCES public.pop_articles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    script TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Tabela de Registros de Rescisão e Cálculos de Cancelamento
CREATE TABLE IF NOT EXISTS public.rescisao_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocolo TEXT NOT NULL UNIQUE,
    aluno_nome TEXT NOT NULL,
    aluno_cpf TEXT NOT NULL,
    aluno_email TEXT NOT NULL,
    aluno_telefone TEXT,
    turma TEXT NOT NULL,
    meses_cursados INTEGER NOT NULL,
    meses_restantes INTEGER NOT NULL,
    saldo_remanescente NUMERIC(10,2) NOT NULL,
    multa_rescisoria NUMERIC(10,2) NOT NULL,
    meses_atraso INTEGER NOT NULL DEFAULT 0,
    valor_atraso NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_quitacao NUMERIC(10,2) NOT NULL,
    motivo TEXT NOT NULL,
    observacoes TEXT,
    status_quitacao TEXT NOT NULL DEFAULT 'pendente', -- 'pendente', 'pago', 'cancelado'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ativação de Row Level Security (RLS)
ALTER TABLE public.pop_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pop_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rescisao_records ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura e Escrita para Usuários Autenticados
CREATE POLICY "Leitura de POPs permitida para usuarios autenticados"
ON public.pop_articles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Leitura de secoes permitida para usuarios autenticados"
ON public.pop_sections FOR SELECT TO authenticated USING (true);

CREATE POLICY "Acesso a registros de rescisao para usuarios autenticados"
ON public.rescisao_records FOR ALL TO authenticated USING (true);

-- Índices de Performance para Consultas Rápidas
CREATE INDEX IF NOT EXISTS idx_pop_articles_category ON public.pop_articles(category);
CREATE INDEX IF NOT EXISTS idx_pop_articles_tags ON public.pop_articles USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_pop_sections_article_id ON public.pop_sections(article_id);
CREATE INDEX IF NOT EXISTS idx_rescisao_records_protocolo ON public.rescisao_records(protocolo);
CREATE INDEX IF NOT EXISTS idx_rescisao_records_aluno_cpf ON public.rescisao_records(aluno_cpf);
