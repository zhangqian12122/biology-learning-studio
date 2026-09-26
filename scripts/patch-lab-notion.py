# -*- coding: utf-8 -*-
import io, re

p = 'app/lab/lab-client.tsx'
s = io.open(p, encoding='utf-8').read()

# ---------- Patch 1: imports ----------
old = "import { lazy, Suspense, useState, type ComponentType, type LazyExoticComponent } from 'react';"
new = "import { lazy, Suspense, useEffect, useRef, useState, type ComponentType, type LazyExoticComponent } from 'react';"
assert s.count(old) == 1, 'react import'
s = s.replace(old, new, 1)

old = "import { NbHero } from '@/components/nb-hero';\n"
assert s.count(old) == 1, 'NbHero import'
s = s.replace(old, '', 1)

# ---------- Patch 2: LabChunkFallback Notion 化 + 模块常量 ----------
old = """function LabChunkFallback() {
  return (
    <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-[#59767c]">
      <span className="inline-block size-2 animate-pulse rounded-full bg-[#82c6c0]" aria-hidden="true" />
      实验加载中…
    </div>
  );
}"""
new = """function LabChunkFallback() {
  return (
    <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-gray-500">
      <span className="inline-block size-2 animate-pulse rounded-[3px] bg-[#2eaadc]" aria-hidden="true" />
      实验加载中…
    </div>
  );
}

/** 目录树：册 → （过滤到该册后的）分类 → 实验。分类可能跨册，按 relatedBook 归位。 */
const BOOK_TREE = textbooks
  .map((book) => ({
    book,
    cats: EXPERIMENT_CATEGORIES
      .map((c) => ({ name: c.name, icon: c.icon, ids: c.ids.filter((id) => experimentMeta[id]?.relatedBook === book.id) }))
      .filter((c) => c.ids.length > 0),
  }))
  .filter((entry) => entry.cats.length > 0);

function locateExperiment(id: ExperimentId) {
  const book = textbooks.find((b) => experimentMeta[id].relatedBook === b.id) ?? null;
  const cat = EXPERIMENT_CATEGORIES.find((c) => c.ids.includes(id)) ?? null;
  return { book, cat };
}"""
assert s.count(old) == 1, 'fallback'
s = s.replace(old, new, 1)

# ---------- Patch 3: LabClient 布局段整体替换（到文件尾，含旧 cnChip） ----------
marker = 'export function LabClient() {'
idx = s.index(marker)
head = s[:idx]

body = '''export function LabClient() {
  // 深链：/lab?exp=xxx 直达某个实验（知识图谱跳转用）
  const [activeExperiment, setActiveExperiment] = useState<ExperimentId>(() => {
    if (typeof window === 'undefined') return 'enzyme';
    const want = new URLSearchParams(window.location.search).get('exp');
    return want && want in experimentMeta ? (want as ExperimentId) : 'enzyme';
  });
  const [resetCount, setResetCount] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  /** 桌面目录：展开的册与分类 */
  const [openBooks, setOpenBooks] = useState<string[]>([]);
  const [openCats, setOpenCats] = useState<string[]>([]);
  /** ≥1024px 切换为「左目录 + 右内容」双栏；SSR 先按窄屏渲染 */
  const [isWide, setIsWide] = useState(false);
  const currentItemRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const experiment = experimentMeta[activeExperiment];
  const ExperimentIcon = EXPERIMENT_ICONS[activeExperiment];
  const ActiveExperiment = EXPERIMENT_COMPONENTS[activeExperiment];

  const searchLower = search.trim().toLowerCase();
  // 搜索时在全目录中匹配（忽略分类筛选），否则按分类显示
  const visibleIds = (searchLower
    ? experimentOrder
    : categoryFilter != null
      ? (EXPERIMENT_CATEGORIES.find((c) => c.name === categoryFilter)?.ids ?? experimentOrder)
      : experimentOrder
  ).filter((id) => {
    if (!searchLower) return true;
    const meta = experimentMeta[id];
    return `${meta.title} ${meta.description} ${meta.kicker}`.toLowerCase().includes(searchLower);
  });

  // 目录：切换实验时自动展开其所在册与分类
  useEffect(() => {
    const { book, cat } = locateExperiment(activeExperiment);
    if (book) setOpenBooks((prev) => (prev.includes(book.id) ? prev : [...prev, book.id]));
    if (cat) setOpenCats((prev) => (prev.includes(cat.name) ? prev : [...prev, cat.name]));
  }, [activeExperiment]);

  // 当前条目自动滚入视野
  useEffect(() => {
    currentItemRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeExperiment, isWide]);

  const pickExperiment = (id: ExperimentId) => {
    setActiveExperiment(id);
    preloadExperiment(id);
  };

  const toggleBook = (id: string) =>
    setOpenBooks((prev) => (prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]));
  const toggleCat = (name: string) =>
    setOpenCats((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  /* ==================== 共用块 ==================== */

  const labSearchBox = (
    <div className="relative flex items-center">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="搜索实验名称或关键词（如“光合”“种群”）…"
        aria-label="搜索实验"
        className="min-h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-9 text-sm text-[#37352f] placeholder-gray-400 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500/30"
      />
      {search ? (
        <button
          type="button"
          onClick={() => setSearch('')}
          aria-label="清除搜索"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors duration-150 hover:bg-[#efedea]"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );

  const detailPanel = (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#2eaadc]">
            <ExperimentIcon className="size-4.5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-gray-500">
              {experiment.kicker}
              {experiment.extension ? (
                <span className="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-1.5 py-0.5 text-[10px] font-semibold text-[#9a7b00]">⚡ 课外拓展</span>
              ) : null}
            </p>
            <h2 className="mt-0.5 text-lg font-semibold text-[#37352f]">{experiment.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{experiment.description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setResetCount((count) => count + 1)}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium text-gray-700 transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
        >
          <RefreshCw className="size-3.5" aria-hidden="true" />
          重置条件
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <Suspense fallback={<LabChunkFallback />}>
          <ActiveExperiment key={`${activeExperiment}-${resetCount}`} />
        </Suspense>
        {(EXPERIMENT_DIAGRAMS[activeExperiment] ?? []).length > 0 ? (
          <section className="mt-5">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="size-4 text-[#dfab01]" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-[#37352f]">相关图解（点结构名高亮图中位置）</h3>
            </div>
            <div className="grid gap-3 xl:grid-cols-2">
              {(EXPERIMENT_DIAGRAMS[activeExperiment] ?? []).map((specimenId) => (
                <Suspense key={specimenId} fallback={<LabChunkFallback />}>
                  <SpecimenCard id={specimenId} />
                </Suspense>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );

  const switcherSection = (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-[#37352f]">选择实验（{searchLower
          ? `搜索“${search.trim()}” · ${visibleIds.length} 个`
          : categoryFilter
            ? `分类：${categoryFilter} · ${visibleIds.length} 个`
            : `覆盖五册教材 · ${experimentOrder.length} 个`}）</h2>
        {categoryFilter && !searchLower ? (
          <button
            type="button"
            onClick={() => setCategoryFilter(null)}
            className="rounded-md px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
          >
            显示全部
          </button>
        ) : null}
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {visibleIds.length === 0 ? (
          <p className="col-span-full rounded-md border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-500">
            没有匹配「{search.trim()}」的实验——换个关键词试试（如“酶”“遗传”“血糖”）。
          </p>
        ) : null}
        {textbooks.map((book) =>
          visibleIds
            .filter((id) => experimentMeta[id].relatedBook === book.id)
            .map((id) => {
              const Icon = EXPERIMENT_ICONS[id];
              const active = id === activeExperiment;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => pickExperiment(id)}
                  onMouseEnter={() => preloadExperiment(id)}
                  aria-pressed={active}
                  className={cnChip(active)}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold">
                      {experimentMeta[id].title}
                    </span>
                    <span className="block text-[10px] opacity-75">{book.volume}</span>
                  </span>
                </button>
              );
            }),
        )}
      </div>
    </section>
  );

  const bottomCards = (
    <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-4 text-[#dfab01]" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-[#37352f]">实验设计清单</h2>
        </div>
        <ol className="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
          {[
            ['01', '明确自变量和因变量'],
            ['02', '控制无关变量'],
            ['03', '用数据支持结论'],
          ].map(([no, text]) => (
            <li key={no} className="rounded-md bg-[#f7f6f3] px-3 py-2.5">
              <span className="block font-mono text-[10px] font-semibold text-gray-400">{no}</span>
              {text}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-gray-500">下一步</p>
            <h2 className="mt-1 text-sm font-semibold text-[#37352f]">用本册题目检验实验理解</h2>
          </div>
          <Link
            href={`/practice?book=${experiment.relatedBook}`}
            aria-label="前往相关题库"
            title="前往相关题库"
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#2eaadc] px-3 text-xs font-medium text-white transition-colors duration-150 hover:bg-[#2596bd] active:bg-[#1d7fa8]"
          >
            前往题库
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );

  /* ==================== 桌面：左目录 + 右内容 ==================== */
  if (isWide) {
    return (
      <div>
        <div className="flex h-[calc(100dvh-116px)] gap-5">
          <aside aria-label="实验目录" className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-[#f7f6f3] shadow-sm">
            <div className="border-b border-gray-200 px-4 py-3">
              <p className="text-[10px] font-semibold tracking-[0.28em] text-gray-400">BIOLOGY LAB</p>
              <p className="mt-0.5 text-base font-semibold leading-6 text-[#37352f]">互动实验 · 目录</p>
              <p className="mt-0.5 text-[11px] text-gray-500">共 {experimentOrder.length} 个 · 覆盖 5 册教材</p>
            </div>
            <div className="border-b border-gray-200 p-3">{labSearchBox}</div>
            <nav className="flex-1 overflow-y-auto p-2.5">
              {searchLower ? (
                <div>
                  <p className="px-2 pb-1.5 pt-0.5 text-[11px] font-medium text-gray-500">
                    搜索“{search.trim()}” · {visibleIds.length} 个结果
                  </p>
                  {visibleIds.length === 0 ? (
                    <p className="rounded-md border border-dashed border-gray-200 bg-white px-3 py-6 text-center text-xs text-gray-500">
                      没有匹配的实验——换个关键词试试。
                    </p>
                  ) : null}
                  {visibleIds.map((id) => {
                    const active = id === activeExperiment;
                    const Icon = EXPERIMENT_ICONS[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        ref={active ? currentItemRef : undefined}
                        onClick={() => pickExperiment(id)}
                        onMouseEnter={() => preloadExperiment(id)}
                        aria-current={active}
                        className={`nb-book-item group ${active ? 'nb-book-item-open' : ''}`}
                      >
                        <span aria-hidden="true" className="w-4 shrink-0 text-center text-[10px] leading-none text-gray-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">⋮⋮</span>
                        <Icon className="size-3.5 shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate">{experimentMeta[id].title}</span>
                        {experimentMeta[id].extension ? <span aria-hidden="true" className="shrink-0 text-[10px]">⚡</span> : null}
                      </button>
                    );
                  })}
                </div>
              ) : (
                BOOK_TREE.map(({ book, cats }, bi) => {
                  const bookOpen = openBooks.includes(book.id);
                  const total = cats.reduce((n, c) => n + c.ids.length, 0);
                  return (
                    <div key={book.id} className="mb-1">
                      <button
                        type="button"
                        onClick={() => toggleBook(book.id)}
                        aria-expanded={bookOpen}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
                      >
                        <span className="font-mono text-[10px] font-semibold text-gray-400">{String(bi + 1).padStart(2, '0')}</span>
                        <span aria-hidden="true">{book.icon}</span>
                        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#37352f]">
                          {book.volume} · {book.title}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400">{total}</span>
                        <span aria-hidden="true" className="w-2 text-[10px] text-gray-400">{bookOpen ? '▾' : '▸'}</span>
                      </button>
                      {bookOpen
                        ? cats.map((c) => {
                            const catOpen = openCats.includes(c.name);
                            return (
                              <div key={c.name} className="ml-4 border-l border-gray-200 pl-1.5">
                                <button
                                  type="button"
                                  onClick={() => toggleCat(c.name)}
                                  aria-expanded={catOpen}
                                  className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs font-semibold text-gray-600 transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
                                >
                                  <span aria-hidden="true">{c.icon}</span>
                                  <span className="min-w-0 flex-1 truncate">{c.name}</span>
                                  <span className="text-[10px] font-medium text-gray-400">{c.ids.length}</span>
                                  <span aria-hidden="true" className="w-2 text-[9px] text-gray-400">{catOpen ? '▾' : '▸'}</span>
                                </button>
                                {catOpen
                                  ? c.ids.map((id) => {
                                      const active = id === activeExperiment;
                                      return (
                                        <button
                                          key={id}
                                          type="button"
                                          ref={active ? currentItemRef : undefined}
                                          onClick={() => pickExperiment(id)}
                                          onMouseEnter={() => preloadExperiment(id)}
                                          aria-current={active}
                                          className={`nb-book-item group ${active ? 'nb-book-item-open' : ''}`}
                                        >
                                          <span aria-hidden="true" className="w-4 shrink-0 text-center text-[10px] leading-none text-gray-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">⋮⋮</span>
                                          <span className="min-w-0 flex-1 truncate">{experimentMeta[id].title}</span>
                                          {experimentMeta[id].extension ? <span aria-hidden="true" className="shrink-0 text-[10px]">⚡</span> : null}
                                        </button>
                                      );
                                    })
                                  : null}
                              </div>
                            );
                          })
                        : null}
                    </div>
                  );
                })
              )}
            </nav>
            <div className="border-t border-gray-200 px-4 py-2 text-[10.5px] leading-4 text-gray-500">
              ⚡ = 课外拓展 · 悬停条目提前预载
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto pr-0.5">
            {detailPanel}
            {bottomCards}
          </div>
        </div>
      </div>
    );
  }

  /* ==================== 窄屏：纵向（Notion 化） ==================== */
  return (
    <div>
      <div className="mb-6 border-b border-gray-200 pb-6">
        <p className="text-[11px] font-semibold tracking-[0.24em] text-[#2eaadc]">BIOLOGY LAB · 互动实验</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#37352f]">从变量到结论，亲眼看过程</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
          {experimentOrder.length} 个过程动画互动实验覆盖五册教材：调参数、看曲线、读结论；悬停实验名即可预载，点开几乎零等待。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[`互动实验 ${experimentOrder.length} 个`, `九大主题分类`, `点图高亮考点`].map((chip) => (
            <span key={chip} className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-[#2eaadc]">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[#37352f]">📋 实验目录（按主题分类 · 共 {experimentOrder.length} 个）</h2>
            {categoryFilter && !searchLower ? (
              <button
                type="button"
                onClick={() => setCategoryFilter(null)}
                className="rounded-md px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
              >
                显示全部
              </button>
            ) : null}
          </div>
          {labSearchBox}
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {EXPERIMENT_CATEGORIES.map((cat) => {
              const filtered = categoryFilter != null && categoryFilter !== cat.name;
              const active = categoryFilter === cat.name;
              return (
                <div
                  key={cat.name}
                  className={`rounded-lg border px-3 py-2.5 transition-colors duration-150 ${
                    active ? 'border-[#2eaadc] bg-blue-50' : 'border-gray-200 bg-white hover:bg-[#efedea]'
                  } ${filtered ? 'opacity-45' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setCategoryFilter(active ? null : cat.name)}
                    aria-pressed={active}
                    className="flex w-full items-center gap-2 text-left"
                  >
                    <span aria-hidden="true" className="text-base">{cat.icon}</span>
                    <span className="text-xs font-semibold text-[#37352f]">{cat.name}</span>
                    <span className="ml-auto rounded-md bg-[#f7f6f3] px-1.5 text-[10px] font-semibold text-gray-500">
                      {cat.ids.length}
                    </span>
                  </button>
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
                    {cat.ids.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setActiveExperiment(id);
                          setCategoryFilter(cat.name);
                        }}
                        onMouseEnter={() => preloadExperiment(id)}
                        className={`text-[11px] underline-offset-2 transition-colors duration-150 ${
                          id === activeExperiment
                            ? 'font-semibold text-[#2eaadc] underline'
                            : 'text-gray-500 hover:text-[#2eaadc] hover:underline'
                        }`}
                      >
                        {experimentMeta[id].title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {switcherSection}
        {detailPanel}
        {bottomCards}
      </div>

      <style>{LAB_KEYFRAMES}</style>
    </div>
  );
}

function cnChip(active: boolean) {
  return `group flex min-h-11 items-center gap-2 rounded-md border px-2.5 text-left transition-colors duration-150 ${
    active
      ? 'border-[#2eaadc] bg-blue-50 text-[#1d7fa8]'
      : 'border-gray-200 bg-white text-gray-600 hover:bg-[#efedea] active:bg-[#e3e1db]'
  }`;
}
'''

s = head + body
with io.open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('LabClient rebuilt, total lines:', s.count(chr(10)) + 1)
