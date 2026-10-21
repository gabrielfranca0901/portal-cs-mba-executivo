import { useState, useMemo, useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
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
  ChevronUp
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

  // 1. Integração com Supabase para sincronização de POPs (com fallback resiliente para DEMO_POP_ARTICLES)
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

    // Define a primeira seção como ativa por padrão
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
      <aside className="w-80 border-r border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] flex flex-col shrink-0">
        <div className="p-4 border-b border-[var(--color-dark-border)] space-y-3">
          {/* Campo de Busca em Tempo Real */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar procedimentos operacionais..."
              className="w-full pl-9 pr-7 py-1.5 rounded-lg bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
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
                <Filter className="w-3 h-3" /> Filtrar por Hashtag
              </span>
              {selectedTag && (
                <button
                  type="button"
                  onClick={() => setSelectedTag(null)}
                  className="text-[10px] text-blue-400 hover:underline cursor-pointer"
                >
                  Limpar filtro
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
                      : 'bg-zinc-900 border-zinc-700/80 text-zinc-300 hover:text-blue-300 hover:border-zinc-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Procedimentos */}
        <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-dark-border)]/40">
          {loading ? (
            <div className="p-8 text-center text-xs text-zinc-500 flex flex-col items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              O sistema está sincronizando a base de conhecimento...
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              Nenhum procedimento corresponde aos critérios especificados pelo analista.
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isSelected = activeArticle?.id === article.id;
              return (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => setActiveArticleId(article.id)}
                  className={`w-full text-left p-3.5 transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-blue-600/10 border-l-2 border-blue-500'
                      : 'hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                    <span className="font-medium text-blue-400/90 truncate max-w-[170px]">
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
        <div className="p-2.5 border-t border-[var(--color-dark-border)] bg-[var(--color-dark-bg)] text-[10px] text-zinc-500 flex items-center justify-between">
          <span>{filteredArticles.length} procedimento(s) cadastrado(s)</span>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-zinc-400" /> UNIPDS Hub
          </span>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. ÁREA CENTRAL: Leitor de Conteúdo Rico do POP         */}
      {/* ======================================================== */}
      <section 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[var(--color-dark-bg)] scroll-smooth"
      >
        {activeArticle ? (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Cabeçalho do Artigo */}
            <div className="border-b border-[var(--color-dark-border)] pb-6 space-y-3">
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

              <p className="text-sm text-zinc-300 leading-relaxed bg-[var(--color-dark-surface)] p-4 rounded-xl border border-[var(--color-dark-border)]">
                {activeArticle.summary}
              </p>

              {/* Tags do Artigo Atual em Pílulas Escuras Arredondadas */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-zinc-500">Palavras-chave:</span>
                {activeArticle.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-900 text-blue-400 border border-zinc-700/80 hover:bg-zinc-800 hover:border-blue-500/60 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Renderização das Seções com Steppers Numéricos e Blocos Recolhíveis */}
            <div className="space-y-8">
              {activeArticle.sections.map((section, idx) => {
                const isScriptCollapsed = !!collapsedScripts[section.id];
                return (
                  <div
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-6 p-5 rounded-2xl bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] space-y-4 shadow-sm"
                  >
                    {/* Stepper Numérico com Título */}
                    <div className="flex items-center gap-3 border-b border-[var(--color-dark-border)] pb-3">
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
                      <div className="mt-4 rounded-xl bg-blue-950/25 border border-blue-500/30 overflow-hidden">
                        <div className="p-3.5 flex items-center justify-between border-b border-blue-500/20 bg-blue-950/40">
                          <div className="flex items-center gap-2">
                            <Bookmark className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-semibold text-blue-300">
                              Script Institucional de Orientação
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <CopyButton textToCopy={section.script} />
                            <button
                              type="button"
                              onClick={() => toggleScriptCollapse(section.id)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
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
                          <div className="p-4 bg-[var(--color-dark-bg)] font-mono text-xs text-zinc-200 leading-relaxed shadow-inner">
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
            O analista deve selecionar um procedimento na barra lateral para visualizar as diretrizes operacionais.
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 3. ÍNDICE DINÂMICO DIREITO (Scrollspy via IntersectionObserver) */}
      {/* ======================================================== */}
      <aside className="hidden xl:block w-64 border-l border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] p-5 shrink-0 overflow-y-auto">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          Nesta página
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
                    {idx + 1}.
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
