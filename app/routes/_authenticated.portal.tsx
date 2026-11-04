import { useState, useMemo, useEffect, useRef } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { 
  Search, 
  FileText, 
  Bookmark, 
  Clock, 
  Filter, 
  X, 
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Calculator,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Users,
  Compass
} from 'lucide-react';
import { getSupabaseBrowserClient } from '~/lib/supabase/client';
import { PopArticle } from '~/lib/types/portal.types';
import { DEMO_POP_ARTICLES } from '~/mock/demo-data';
import { RichTextRenderer } from '~/components/ui/RichTextRenderer';
import { CopyButton } from '~/components/ui/CopyButton';

export const Route = createFileRoute('/_authenticated/portal')({
  component: PortalPopPage,
});

function PortalPopPage() {
  const [articles, setArticles] = useState<PopArticle[]>(DEMO_POP_ARTICLES);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string>(DEMO_POP_ARTICLES[0].id);
  
  // Estado para blocos de script recolhíveis por seção
  const [collapsedScripts, setCollapsedScripts] = useState<Record<string, boolean>>({});

  // Estado para o Scrollspy dinâmico via IntersectionObserver
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const supabase = getSupabaseBrowserClient();

  // 1. Integração com Supabase com fallback resiliente para DEMO_POP_ARTICLES
  useEffect(() => {
    async function fetchPopArticles() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('pop_articles')
          .select(`
            id,
            title,
            slug,
            category,
            tags,
            summary,
            updated_at,
            sections:pop_sections (
              id,
              title,
              content,
              script,
              order_index
            )
          `)
          .order('title', { ascending: true });

        if (error || !data || data.length === 0) {
          setArticles(DEMO_POP_ARTICLES);
        } else {
          const mappedArticles: PopArticle[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            category: item.category,
            tags: item.tags || [],
            summary: item.summary,
            updatedAt: new Date(item.updated_at).toLocaleDateString('pt-BR'),
            sections: (item.sections || []).sort(
              (a: any, b: any) => a.order_index - b.order_index
            ).map((s: any) => ({
              id: s.id,
              title: s.title,
              content: s.content,
              script: s.script,
              orderIndex: s.order_index,
            })),
          }));
          setArticles(mappedArticles);
          if (mappedArticles.length > 0) {
            setActiveArticleId(mappedArticles[0].id);
          }
        }
      } catch {
        setArticles(DEMO_POP_ARTICLES);
      } finally {
        setLoading(false);
      }
    }

    fetchPopArticles();
  }, [supabase]);

  // Lista de tags únicas disponíveis
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [articles]);

  // Filtragem composta em tempo real (Busca + Tag + Categoria)
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.tags.some((t) => t.toLowerCase().includes(q)) ||
        art.sections.some(
          (s) => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
        );

      const matchTag = selectedTag ? art.tags.includes(selectedTag) : true;
      const matchCat = selectedCategory ? art.category === selectedCategory : true;

      return matchSearch && matchTag && matchCat;
    });
  }, [articles, searchTerm, selectedTag, selectedCategory]);

  const activeArticle =
    articles.find((a) => a.id === activeArticleId) ||
    filteredArticles[0] ||
    articles[0];

  // 2. Scrollspy Dinâmico via IntersectionObserver
  useEffect(() => {
    if (!activeArticle || !activeArticle.sections.length) return;

    setActiveSectionId(activeArticle.sections[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    activeArticle.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeArticle]);

  // Alternância de recolhimento de scripts
  const toggleScriptCollapse = (sectionId: string) => {
    setCollapsedScripts((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* ======================================================== */}
      {/* 1. SIDEBAR LATERAL ESQUERDA: Busca, Tags e Lista de POPs */}
      {/* ======================================================== */}
      <aside className="w-80 border-r border-neutral-800 bg-[#18181b] flex flex-col shrink-0">
        <div className="p-4 border-b border-neutral-800 space-y-3">
          {/* Header da Sidebar */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              POPs & Jornada do Aluno
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
              MBA Executivo
            </span>
          </div>

          {/* Campo de Busca em Tempo Real */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar POP, hashtag ou script..."
              className="w-full pl-9 pr-7 py-1.5 rounded-lg bg-[#121212] border border-neutral-800 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Badges de Hashtags em Pílulas Escuras Arredondadas */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1 font-medium">
                <Filter className="w-3 h-3 text-blue-400" /> Filtro por Estágio / Tag
              </span>
              {(selectedTag || selectedCategory) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTag(null);
                    setSelectedCategory(null);
                  }}
                  className="text-[10px] text-blue-400 hover:underline cursor-pointer"
                >
                  Limpar filtros
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-0.5">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all cursor-pointer font-medium ${
                    selectedTag === tag
                      ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                      : 'bg-zinc-900 border-neutral-800 text-zinc-300 hover:text-blue-300 hover:border-zinc-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Procedimentos */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/60">
          {loading ? (
            <div className="p-8 text-center text-xs text-zinc-500 flex flex-col items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Sincronizando base de POPs...
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              Nenhum procedimento localizado com os filtros selecionados.
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isSelected = activeArticle?.id === article.id;
              const isRetencao = article.category.includes('Cancelamento');
              return (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => setActiveArticleId(article.id)}
                  className={`w-full text-left p-3.5 transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-blue-600/15 border-l-2 border-blue-500'
                      : 'hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                    <span className={`font-semibold truncate max-w-[170px] ${
                      isRetencao ? 'text-amber-400' : 'text-blue-400'
                    }`}>
                      {article.category}
                    </span>
                    <span className="text-zinc-500">{article.updatedAt}</span>
                  </div>
                  <h3
                    className={`text-xs font-semibold line-clamp-2 leading-snug transition-colors ${
                      isSelected
                        ? 'text-white'
                        : 'text-zinc-300 group-hover:text-zinc-100'
                    }`}
                  >
                    {article.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 line-clamp-1 mt-1">
                    {article.summary}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-2.5 border-t border-neutral-800 bg-[#121212] text-[10px] text-zinc-500 flex items-center justify-between">
          <span>{filteredArticles.length} procedimento(s) ativo(s)</span>
          <span className="flex items-center gap-1 text-zinc-400">
            <GraduationCap className="w-3 h-3 text-blue-400" /> CS MBA Hub
          </span>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. ÁREA CENTRAL: Leitor de Conteúdo Rico do POP         */}
      {/* ======================================================== */}
      <section 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#121212] scroll-smooth"
      >
        {activeArticle ? (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Banner Informativo se for o POP de Cancelamento & Retenção */}
            {activeArticle.category.includes('Cancelamento') && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start justify-between gap-4 text-xs text-amber-200">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-amber-300 font-bold block text-sm">
                      Diretriz Operacional de Contenção Prévia Obrigatória
                    </strong>
                    <p className="text-zinc-300 leading-relaxed text-xs">
                      Antes de qualquer rescisão, é mandatório ofertar ao executivo o 
                      <strong className="text-amber-200"> Trancamento de Matrícula por até 60 dias</strong> (sem custos) 
                      ou a <strong className="text-amber-200">Repactuação de Cronograma</strong> com a turma seguinte.
                    </p>
                  </div>
                </div>

                <Link
                  to="/calculadora-cancelamento"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-600/30 transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculadora de Multa</span>
                </Link>
              </div>
            )}

            {/* Cabeçalho do Artigo */}
            <div className="border-b border-neutral-800 pb-6 space-y-3">
              <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                <FileText className="w-3.5 h-3.5" />
                <span>{activeArticle.category}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Atualizado em {activeArticle.updatedAt}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {activeArticle.title}
              </h1>

              <p className="text-sm text-zinc-300 leading-relaxed bg-[#18181b] p-4 rounded-xl border border-neutral-800">
                {activeArticle.summary}
              </p>

              {/* Tags do Artigo Atual em Pílulas Escuras Arredondadas */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-zinc-500">Tags operacionais:</span>
                {activeArticle.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-900 text-blue-400 border border-neutral-800 hover:bg-zinc-800 hover:border-blue-500/60 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Renderização das Seções com Steppers Numéricos e Blocos Recolhíveis */}
            <div className="space-y-6">
              {activeArticle.sections.map((section, idx) => {
                const isScriptCollapsed = !!collapsedScripts[section.id];
                return (
                  <div
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-6 p-5 rounded-2xl bg-[#18181b] border border-neutral-800 space-y-4 shadow-sm"
                  >
                    {/* Stepper Numérico com Título */}
                    <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                      <span className="px-2.5 py-1 rounded-md bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 tracking-wide uppercase font-mono">
                        Passo {idx + 1}
                      </span>
                      <h2 className="text-sm font-bold text-zinc-100 tracking-tight">
                        {section.title}
                      </h2>
                    </div>

                    {/* Conteúdo com RichText Inteligente */}
                    <RichTextRenderer
                      content={section.content}
                      onTagClick={(tag) => setSelectedTag(tag)}
                    />

                    {/* Bloco de Script Recolhível ao Aluno com Cópia em 1 Clique */}
                    {section.script && (
                      <div className="mt-4 rounded-xl bg-blue-950/20 border border-blue-500/30 overflow-hidden">
                        <div className="p-3.5 flex items-center justify-between border-b border-blue-500/20 bg-blue-950/40">
                          <div className="flex items-center gap-2">
                            <Bookmark className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-semibold text-blue-300">
                              Script Oficial do CSM para o Aluno
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <CopyButton textToCopy={section.script} />
                            <button
                              type="button"
                              onClick={() => toggleScriptCollapse(section.id)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
                              title={isScriptCollapsed ? 'Expandir script' : 'Recolher script'}
                            >
                              {isScriptCollapsed ? (
                                <>
                                  <ChevronDown className="w-3.5 h-3.5" />
                                  <span className="text-[11px]">Expandir</span>
                                </>
                              ) : (
                                <>
                                  <ChevronUp className="w-3.5 h-3.5" />
                                  <span className="text-[11px]">Recolher</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {!isScriptCollapsed && (
                          <div className="p-4 bg-[#121212] font-mono text-xs text-zinc-200 leading-relaxed shadow-inner">
                            {section.script}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
            Selecione um procedimento na barra lateral para visualizar as diretrizes operacionais.
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 3. ÍNDICE DINÂMICO DIREITO (Scrollspy via IntersectionObserver) */}
      {/* ======================================================== */}
      <aside className="hidden xl:block w-64 border-l border-neutral-800 bg-[#18181b] p-5 shrink-0 overflow-y-auto">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          Passos Operacionais
        </h4>

        {activeArticle && activeArticle.sections.length > 0 ? (
          <nav className="space-y-1 relative">
            {activeArticle.sections.map((sec, idx) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left block text-xs py-2 px-2.5 rounded-lg transition-all leading-snug cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/15 border-l-2 border-blue-500 text-blue-300 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <span className="text-[10px] text-zinc-500 mr-1.5 font-mono">
                    Passo {idx + 1}.
                  </span>
                  <span className="truncate">{sec.title}</span>
                </button>
              );
            })}
          </nav>
        ) : (
          <span className="text-xs text-zinc-500">Sem seções disponíveis.</span>
        )}
      </aside>
    </div>
  );
}
