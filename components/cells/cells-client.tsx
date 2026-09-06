'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Sparkles, X } from 'lucide-react';

import { ATLAS_CATEGORIES, ATLAS_GROUPS, LAB_ONLY_SPECIMEN_IDS, SPECIMENS } from '@/components/cells/specimens';

/** 图鉴只保留"结构/模式图"类标本；实验操作类图解移到互动实验页展示。 */
const ATLAS_SPECIMENS = SPECIMENS.filter((item) => !LAB_ONLY_SPECIMEN_IDS.includes(item.id));

const CELL_KEYFRAMES = `
@keyframes bio-cilia-sway { 0%, 100% { transform: skewX(0deg); } 50% { transform: skewX(2.5deg); } }
.bio-cilia { animation: bio-cilia-sway 1.8s ease-in-out infinite; transform-origin: 260px 195px; }
@keyframes bio-flagella-wave { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(7deg); } }
.bio-flagella { animation: bio-flagella-wave 1.3s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .bio-cilia, .bio-flagella { animation: none; }
}
`;

const CIRCLED_DIGITS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

export function CellsClient() {
  const [specimenId, setSpecimenId] = useState(ATLAS_SPECIMENS[0].id);
  const [activePart, setActivePart] = useState<number | null>(null);
  const [stomaOpen, setStomaOpen] = useState(true);
  const [useWebGL, setUseWebGL] = useState(false);
  /** 两级导航：home = 大分类入口；group = 点进某个大分类浏览 */
  const [level, setLevel] = useState<'home' | 'group'>('home');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const specimen = ATLAS_SPECIMENS.find((item) => item.id === specimenId) ?? ATLAS_SPECIMENS[0];
  const SpecimenSvg = specimen.Svg;
  const isStoma = specimen.id === 'stoma';
  const selectedPart = activePart == null ? null : specimen.parts[activePart];

  const searchLower = search.trim().toLowerCase();
  const group = ATLAS_GROUPS.find((g) => g.name === activeGroup) ?? null;

  const browsing = level === 'group' || searchLower !== '';
  const visibleSpecimens = ATLAS_SPECIMENS.filter((item) => {
    if (searchLower) {
      return `${item.name} ${item.kicker} ${item.intro}`.toLowerCase().includes(searchLower);
    }
    if (level !== 'group' || !group) return false;
    const catNames = ATLAS_CATEGORIES.filter((c) => group.categories.includes(c.name));
    const inSub = !subCategory || catNames.some((c) => c.name === subCategory && c.ids.includes(item.id));
    const inGroup = catNames.some((c) => c.ids.includes(item.id));
    return inGroup && inSub;
  });

  const groupCount = (g: (typeof ATLAS_GROUPS)[number]) =>
    ATLAS_SPECIMENS.filter((item) =>
      ATLAS_CATEGORIES.some((c) => g.categories.includes(c.name) && c.ids.includes(item.id)),
    ).length;

  const fineCategories = group
    ? ATLAS_CATEGORIES.filter((c) => group.categories.includes(c.name))
    : [];

  const openGroup = (name: string) => {
    setActiveGroup(name);
    setSubCategory(null);
    setLevel('group');
  };
  const backHome = () => {
    setLevel('home');
    setActiveGroup(null);
    setSubCategory(null);
  };

  const pickSpecimen = (id: string) => {
    setSpecimenId(id);
    setActivePart(null);
    setUseWebGL(false);
  };

  const visibleIdx = visibleSpecimens.findIndex((item) => item.id === specimen.id);
  const step = (dir: 1 | -1) => {
    if (visibleIdx === -1 || visibleSpecimens.length === 0) return;
    const next = visibleSpecimens[(visibleIdx + dir + visibleSpecimens.length) % visibleSpecimens.length];
    pickSpecimen(next.id);
  };

  return (
    <div>
      <style>{CELL_KEYFRAMES}</style>

      {/* Hero 头图（明日方舟式深色战术风） */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-[#1d3a40] bg-[#0b1e22] px-6 py-8 text-white shadow-[0_18px_40px_rgba(5,25,29,0.5)] sm:px-9 sm:py-10">
        {/* 网格纹理 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{ backgroundImage: 'linear-gradient(#2f9e8f 1px, transparent 1px), linear-gradient(90deg, #2f9e8f 1px, transparent 1px)', backgroundSize: '34px 34px' }}
        />
        {/* 斜切亮面 */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rotate-45 bg-gradient-to-br from-[#2f9e8f]/25 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rotate-12 bg-[#0e6f75]/40" />
        {/* 底部扫描线 */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#2f9e8f] via-[#0e6f75] to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-3.5 w-1.5 bg-[#4fe3c1]" />
            <p className="text-[11px] font-bold tracking-[0.32em] text-[#7fd8c8]">CELL ATLAS · 生物图鉴 // ARCHIVE</p>
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-wide sm:text-4xl">
            图鉴<span className="mx-2 text-[#4fe3c1]">/</span>把结构看清楚
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75">
            {ATLAS_SPECIMENS.length} 张课本级教学模式图归档入库：选一个分类进入检索，点图中的编号或右侧结构名即可高亮并显示考点说明。
            <span className="ml-1 text-[#f4c76a]">⚡ 标记为课外拓展档案</span>；实验操作类图解已移至互动实验页。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {[
              `已归档 ${ATLAS_SPECIMENS.length}`,
              `分类 ${ATLAS_GROUPS.length}`,
              `覆盖五册教材`,
            ].map((chip, i) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 border border-[#2a4a50] bg-[#0f2a2f]/80 px-3 py-1 text-xs font-semibold text-[#a8e6dc] [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]"
              >
                <span aria-hidden="true" className="text-[#4fe3c1]">{String(i + 1).padStart(2, '0')}</span>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {browsing ? (
          /* ===== 二级：组内浏览 / 搜索结果 ===== */
          <section className="rounded-2xl border border-[#dceaea] bg-white p-4 shadow-[0_10px_28px_rgba(18,65,72,0.07)] sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { backHome(); setSearch(''); }}
                  className="inline-flex min-h-9 items-center gap-1 rounded-full border border-[#d9e7e7] bg-white px-3 text-xs font-semibold text-[#537078] transition-colors hover:border-[#82c6c0] hover:text-[#0a626a]"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  返回目录
                </button>
                <h2 className="text-base font-bold text-[#13333a]">
                  {searchLower ? `搜索“${search.trim()}”` : `${group!.icon} ${group!.name}`}
                  <span className="ml-2 text-xs font-medium text-[#79939a]">{visibleSpecimens.length} 个</span>
                </h2>
              </div>
              <p className="text-xs text-[#79939a]">{group && !searchLower ? group.desc : '点标本卡片在下方查看大图'}</p>
            </div>

            {/* 细分类二次筛选（仅组内浏览时） */}
            {group && !searchLower && fineCategories.length > 1 ? (
              <div className="mb-3 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSubCategory(null)}
                  aria-pressed={subCategory == null}
                  className={`inline-flex min-h-8 items-center rounded-full border px-3 text-xs font-semibold transition-colors ${
                    subCategory == null
                      ? 'border-[#0e6f75] bg-[#0e6f75] text-white'
                      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#82c6c0]'
                  }`}
                >
                  全部
                </button>
                {fineCategories.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSubCategory(subCategory === c.name ? null : c.name)}
                    aria-pressed={subCategory === c.name}
                    className={`inline-flex min-h-8 items-center gap-1 rounded-full border px-3 text-xs font-semibold transition-colors ${
                      subCategory === c.name
                        ? 'border-[#0e6f75] bg-[#0e6f75] text-white'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#82c6c0]'
                    }`}
                  >
                    <span aria-hidden="true">{c.icon}</span>
                    {c.name}（{c.ids.length}）
                  </button>
                ))}
              </div>
            ) : null}

            {/* 搜索框（组内也可继续搜） */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#79939a]" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="在图鉴中搜索（如“线粒体”“病毒”“染色体”）…"
                aria-label="搜索图鉴标本"
                className="min-h-10 w-full rounded-xl border border-[#d9e7e7] bg-[#f9fcfc] pl-9 pr-10 text-sm text-[#173b42] transition-colors placeholder:text-[#9ab0b5] focus:border-[#82c6c0] focus:bg-white focus:outline-none"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="清除搜索"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#79939a] transition-colors hover:bg-[#eef7f7]"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            {/* 标本卡片网格 */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 xl:grid-cols-7">
              {visibleSpecimens.length === 0 ? (
                <p className="col-span-full rounded-xl border border-dashed border-[#c9dedd] bg-white px-4 py-8 text-center text-sm text-[#59767c]">
                  没有匹配的标本——换个关键词或返回目录试试。
                </p>
              ) : null}
              {visibleSpecimens.map((item) => {
                const current = item.id === specimen.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => pickSpecimen(item.id)}
                    aria-pressed={current}
                    className={`flex min-h-14 flex-col items-center justify-center rounded-xl border-2 px-2 py-2.5 text-xs font-bold transition-all ${
                      current
                        ? 'border-[#0e6f75] bg-[#f0faf9] text-[#0a626a] shadow-[0_6px_16px_rgba(14,111,117,0.18)]'
                        : 'border-[#e2eeec] bg-white text-[#537078] hover:-translate-y-0.5 hover:border-[#82c6c0] hover:shadow-[0_8px_18px_rgba(18,65,72,0.10)]'
                    }`}
                  >
                    {item.name}
                    <span className={`mt-0.5 block text-[10px] font-medium ${item.extension ? 'text-[#b57c16]' : 'text-[#8aa1a6]'}`}>
                      {item.extension ? '⚡ 课外拓展' : item.kicker.split(' · ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          /* ===== 一级：大分类入口（明日方舟式深色磁贴） ===== */
          <section>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm font-bold tracking-wider text-[#13333a]">
                <span aria-hidden="true" className="inline-block h-3.5 w-1.5 bg-[#0e6f75]" />
                选择分类 // 进入检索
              </h2>
              <span className="text-xs text-[#79939a]">进入后可再按细分主题筛选</span>
            </div>
            <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-5">
              {ATLAS_GROUPS.map((g, i) => (
                <button
                  key={g.name}
                  type="button"
                  onClick={() => openGroup(g.name)}
                  className="group relative min-h-40 overflow-hidden border-2 border-[#25454c] bg-[#0e262b] p-4 text-left text-white transition-all duration-200 hover:-translate-y-1 hover:border-[#4fe3c1] hover:shadow-[0_16px_34px_rgba(5,25,29,0.45)] [clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))] max-lg:first:col-span-2"
                >
                  {/* 网格纹理 */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.12]"
                    style={{ backgroundImage: 'linear-gradient(#2f9e8f 1px, transparent 1px), linear-gradient(90deg, #2f9e8f 1px, transparent 1px)', backgroundSize: '22px 22px' }}
                  />
                  {/* 序号 + 状态条 */}
                  <span aria-hidden="true" className="absolute right-3 top-2 font-mono text-[11px] font-bold tracking-widest text-[#4fe3c1]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#4fe3c1] to-transparent transition-all duration-300 group-hover:w-full" />
                  <span aria-hidden="true" className="absolute bottom-4 right-4 text-4xl opacity-20 transition-all duration-300 group-hover:scale-125 group-hover:opacity-40">
                    {g.icon}
                  </span>
                  <span aria-hidden="true" className="mb-2 inline-block h-0.5 w-8 bg-[#4fe3c1]" />
                  <p className="relative text-lg font-black leading-6 tracking-wide">{g.name}</p>
                  <p className="relative mt-1.5 text-xs leading-5 text-white/60">{g.desc}</p>
                  <span className="relative mt-3 inline-flex items-center gap-1.5 border border-[#3a6a64] bg-[#0a2226]/90 px-2.5 py-1 text-[11px] font-bold text-[#7fd8c8] [clip-path:polygon(5px_0,100%_0,100%_calc(100%-5px),calc(100%-5px)_100%,0_100%,0_5px)]">
                    {groupCount(g)}标本
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 主展示区 */}
        {browsing || specimen.id ? (
          <section className="overflow-hidden rounded-2xl border border-[#dceaea] bg-white shadow-[0_14px_34px_rgba(18,65,72,0.09)]">
            {/* 工具栏 */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e4efee] bg-gradient-to-r from-[#f4fbfa] to-[#fbfdfd] px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0e6f75] text-lg text-white shadow-sm" aria-hidden="true">
                  🔬
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-[#67858b]">
                    {CATEGORY_LABEL(specimen.id)} · {specimen.kicker}
                    {specimen.extension ? (
                      <span className="ml-1.5 inline-flex items-center rounded-full bg-[#fdf1e3] px-1.5 py-0.5 text-[10px] font-bold text-[#b57c16]">⚡ 课外拓展</span>
                    ) : null}
                  </p>
                  <h2 className="truncate text-lg font-bold leading-6 text-[#13333a]">{specimen.name}结构图</h2>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {visibleIdx !== -1 ? (
                  <div className="mr-1 flex items-center gap-1" role="group" aria-label="上一个/下一个标本">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="上一个标本"
                      className="inline-flex size-8 items-center justify-center rounded-full border border-[#d9e7e7] bg-white text-[#537078] transition-colors hover:border-[#82c6c0] hover:text-[#0a626a]"
                    >
                      <ChevronLeft className="size-4" aria-hidden="true" />
                    </button>
                    <span className="text-[11px] font-semibold text-[#79939a]">{visibleIdx + 1}/{visibleSpecimens.length}</span>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="下一个标本"
                      className="inline-flex size-8 items-center justify-center rounded-full border border-[#d9e7e7] bg-white text-[#537078] transition-colors hover:border-[#82c6c0] hover:text-[#0a626a]"
                    >
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                ) : null}
                {isStoma ? (
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setStomaOpen(true)}
                      aria-pressed={stomaOpen}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        stomaOpen ? 'bg-[#0e6f75] text-white shadow-sm' : 'bg-[#eef7f6] text-[#4b6c73] hover:bg-[#e2f1ef]'
                      }`}
                    >
                      吸水 · 张开
                    </button>
                    <button
                      type="button"
                      onClick={() => setStomaOpen(false)}
                      aria-pressed={!stomaOpen}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        !stomaOpen ? 'bg-[#b0483a] text-white shadow-sm' : 'bg-[#eef7f6] text-[#4b6c73] hover:bg-[#e2f1ef]'
                      }`}
                    >
                      失水 · 闭合
                    </button>
                  </div>
                ) : null}
                {specimen.StageWebGL ? (
                  <div className="flex gap-1.5" role="group" aria-label="视角模式">
                    <button
                      type="button"
                      onClick={() => setUseWebGL(false)}
                      aria-pressed={!useWebGL}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        !useWebGL ? 'bg-[#0e6f75] text-white shadow-sm' : 'bg-[#eef7f6] text-[#4b6c73] hover:bg-[#e2f1ef]'
                      }`}
                    >
                      教学剖面
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseWebGL(true)}
                      aria-pressed={useWebGL}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        useWebGL ? 'bg-[#0e6f75] text-white shadow-sm' : 'bg-[#eef7f6] text-[#4b6c73] hover:bg-[#e2f1ef]'
                      }`}
                    >
                      实景 3D
                    </button>
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => setActivePart(null)}
                  className="rounded-full border border-[#d9e7e7] bg-white px-3 py-1.5 text-xs font-medium text-[#366169] transition-colors hover:border-[#82c6c0] hover:text-[#0a626a]"
                >
                  取消高亮
                </button>
              </div>
            </div>

            {/* 主体：图 + 结构清单 */}
            <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="min-w-0">
                <div className="relative overflow-hidden rounded-xl border border-[#dceaea] bg-gradient-to-b from-[#f4fbfa] to-[#e3f1ee] shadow-inner">
                  <div className="max-sm:overflow-x-auto">
                    <div className="relative mx-auto aspect-[52/38] w-full max-w-[620px] max-sm:w-[520px]">
                      {specimen.StageWebGL && useWebGL ? (
                        <>
                          <specimen.StageWebGL active={activePart} open={stomaOpen} />
                          <p className="pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-[#4b6c73] shadow-sm">
                            🖐 单指旋转 · 双指缩放 · 松手后自动摆动
                          </p>
                        </>
                      ) : specimen.Stage3d ? (
                        <specimen.Stage3d active={activePart} open={stomaOpen} />
                      ) : (
                        <SpecimenSvg active={activePart} open={stomaOpen} />
                      )}
                    </div>
                  </div>
                </div>
                {isStoma ? (
                  <p className="mt-2.5 rounded-lg bg-[#f4faf8] px-3 py-2 text-xs leading-5 text-[#5f7076]">
                    演示原理：保卫细胞<span className="font-semibold">吸水膨胀</span> → 薄的外壁向外弯曲，增厚的内壁被拉开 → 气孔张开；
                    <span className="font-semibold">失水</span> → 两细胞回落靠拢 → 气孔闭合。一般白天张开、夜间闭合。
                  </p>
                ) : null}
              </div>

              <div className="min-w-0">
                <div className="rounded-xl border border-[#e4efee] bg-[#f7fbfa] px-3.5 py-3">
                  <p className="flex items-start gap-1.5 text-sm leading-6 text-[#3d5a60]">
                    <Sparkles className="mt-1 size-4 shrink-0 text-[#0e6f75]" aria-hidden="true" />
                    {specimen.intro}
                  </p>
                </div>
                <p className="mb-2 mt-4 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
                  结构清单（点按查看功能，共 {specimen.parts.length} 项）
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {specimen.parts.map((part, index) => {
                    const current = activePart === index;
                    return (
                      <button
                        key={part.name}
                        type="button"
                        onClick={() => setActivePart(current ? null : index)}
                        aria-pressed={current}
                        className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-all ${
                          current
                            ? 'border-[#0e6f75] bg-[#0e6f75] text-white shadow-sm'
                            : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#82c6c0] hover:text-[#0a626a]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`inline-flex size-4.5 items-center justify-center rounded-full text-[10px] font-bold ${
                            current ? 'bg-white/25 text-white' : 'bg-[#e8f4f3] text-[#0c696f]'
                          }`}
                        >
                          {index + 1}
                        </span>
                        {part.name}
                      </button>
                    );
                  })}
                </div>

                <div
                  className={`mt-4 rounded-xl border-l-4 px-4 py-3.5 transition-colors ${
                    selectedPart ? 'border-l-[#0e6f75] bg-[#f0faf9] ring-1 ring-[#c9e5e2]' : 'border-l-[#cbdede] bg-[#f9fcfc]'
                  }`}
                >
                  {selectedPart ? (
                    <>
                      <p className="text-sm font-bold text-[#0a626a]">
                        {activePart != null ? CIRCLED_DIGITS[activePart] : ''} {selectedPart.name}
                      </p>
                      <p className="mt-1 text-xs leading-6 text-[#49676d]">{selectedPart.desc}</p>
                    </>
                  ) : (
                    <p className="text-xs leading-5 text-[#799398]">
                      在图中或清单里点选任一结构，这里会显示它的名称、功能与考点说明。
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <p className="text-xs leading-5 text-[#799398]">
          说明：以上均为教学<span className="font-semibold">模式图</span>——细胞膜、内质网、高尔基体等细微结构需在电子显微镜下才能看清；
          图中结构位置与数量做了示意化处理，以课本插图为准。
        </p>
      </div>
    </div>
  );
}

/** 标本所属大分类名（用于展示区面包屑） */
function CATEGORY_LABEL(id: string): string {
  for (const g of ATLAS_GROUPS) {
    const cats = ATLAS_CATEGORIES.filter((c) => g.categories.includes(c.name));
    if (cats.some((c) => c.ids.includes(id))) return `${g.icon} ${g.name}`;
  }
  return '🗂 图鉴';
}
