'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Sparkles, X } from 'lucide-react';

import { ATLAS_CATEGORIES, LAB_ONLY_SPECIMEN_IDS, SPECIMENS } from '@/components/cells/specimens';

/** 图鉴只保留"结构/模式图"类标本；实验操作类图解移到互动实验页展示。 */
const ATLAS_SPECIMENS = SPECIMENS.filter((item) => !LAB_ONLY_SPECIMEN_IDS.includes(item.id));
const CATEGORY_NAME_BY_ID = new Map<string, string>(
  ATLAS_CATEGORIES.flatMap((cat) => cat.ids.map((id) => [id, cat.name] as const)),
);
/** 未归入任何分类的标本兜底归入"其他" */
const UNCATEGORIZED = ATLAS_SPECIMENS.filter((item) => !CATEGORY_NAME_BY_ID.has(item.id));
const ALL_CATEGORIES = [
  ...ATLAS_CATEGORIES,
  ...(UNCATEGORIZED.length > 0 ? [{ name: '其他', icon: '📦', ids: UNCATEGORIZED.map((item) => item.id) }] : []),
];
const CIRCLED_DIGITS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];

const CELL_KEYFRAMES = `
@keyframes bio-cilia-sway { 0%, 100% { transform: skewX(0deg); } 50% { transform: skewX(2.5deg); } }
.bio-cilia { animation: bio-cilia-sway 1.8s ease-in-out infinite; transform-origin: 260px 195px; }
@keyframes bio-flagella-wave { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(7deg); } }
.bio-flagella { animation: bio-flagella-wave 1.3s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .bio-cilia, .bio-flagella { animation: none; }
}
`;

export function CellsClient() {
  const [specimenId, setSpecimenId] = useState(ATLAS_SPECIMENS[0].id);
  const [activePart, setActivePart] = useState<number | null>(null);
  const [stomaOpen, setStomaOpen] = useState(true);
  const [useWebGL, setUseWebGL] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const specimen = ATLAS_SPECIMENS.find((item) => item.id === specimenId) ?? ATLAS_SPECIMENS[0];
  const SpecimenSvg = specimen.Svg;
  const isStoma = specimen.id === 'stoma';
  const selectedPart = activePart == null ? null : specimen.parts[activePart];

  const searchLower = search.trim().toLowerCase();
  const visibleSpecimens = ATLAS_SPECIMENS.filter((item) => {
    const inCategory = category == null || (ALL_CATEGORIES.find((c) => c.name === category)?.ids ?? []).includes(item.id);
    const inSearch = !searchLower || `${item.name} ${item.kicker} ${item.intro}`.toLowerCase().includes(searchLower);
    return inCategory && inSearch;
  });
  const visibleIdx = visibleSpecimens.findIndex((item) => item.id === specimen.id);
  const step = (dir: 1 | -1) => {
    if (visibleIdx === -1 || visibleSpecimens.length === 0) return;
    const next = visibleSpecimens[(visibleIdx + dir + visibleSpecimens.length) % visibleSpecimens.length];
    setSpecimenId(next.id);
    setActivePart(null);
    setUseWebGL(false);
  };

  const pickSpecimen = (id: string) => {
    setSpecimenId(id);
    setActivePart(null);
    setUseWebGL(false);
  };

  return (
    <div>
      <style>{CELL_KEYFRAMES}</style>

      {/* Hero 头图 */}
      <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c5f64] via-[#128087] to-[#2f9e8f] px-6 py-7 text-white shadow-[0_18px_40px_rgba(12,95,100,0.25)] sm:px-8 sm:py-9">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 right-32 size-44 rounded-full bg-white/8" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-6 size-20 rounded-full bg-white/8" />
        <div className="relative">
          <p className="text-[11px] font-bold tracking-[0.28em] text-white/70">CELL ATLAS · 生物图鉴</p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-normal sm:text-3xl">图鉴：把结构看清楚</h1>
          <p className="mt-2.5 max-w-3xl text-sm leading-6 text-white/85">
            {ATLAS_SPECIMENS.length} 张课本级教学模式图：点图中的编号或右侧结构名，对应结构高亮并显示功能与考点说明。
            ⚡ 标记为课外拓展内容；实验操作类图解已移到互动实验页。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              `🖼 ${ATLAS_SPECIMENS.length} 张模式图`,
              `🗂 ${ALL_CATEGORIES.length} 个主题分类`,
              `📚 覆盖五册教材`,
            ].map((chip) => (
              <span key={chip} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* 目录：分类筛选 + 搜索 */}
        <section className="rounded-2xl border border-[#dceaea] bg-white p-4 shadow-[0_10px_28px_rgba(18,65,72,0.07)] sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold text-[#173b42]">
              <span aria-hidden="true">📖</span> 图鉴目录
            </h2>
            <span className="text-xs text-[#79939a]">点击分类筛选，支持关键词搜索</span>
          </div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setCategory(null)}
              aria-pressed={category == null}
              className={`inline-flex min-h-9 items-center gap-1 rounded-full border px-3.5 text-xs font-semibold transition-all ${
                category == null
                  ? 'border-[#0e6f75] bg-[#0e6f75] text-white shadow-sm'
                  : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#82c6c0] hover:text-[#0a626a]'
              }`}
            >
              全部（{ATLAS_SPECIMENS.length}）
            </button>
            {ALL_CATEGORIES.map((cat) => {
              const active = category === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setCategory(active ? null : cat.name)}
                  aria-pressed={active}
                  className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-all ${
                    active
                      ? 'border-[#0e6f75] bg-[#0e6f75] text-white shadow-sm'
                      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#82c6c0] hover:text-[#0a626a]'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  {cat.name}
                  <span className={`rounded-full px-1.5 text-[10px] ${active ? 'bg-white/25 text-white' : 'bg-[#e8f4f3] text-[#0c696f]'}`}>
                    {cat.ids.length}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#79939a]" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索标本或关键词（如“线粒体”“病毒”“染色体”）…"
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
        </section>

        {/* 标本卡片网格 */}
        <section>
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[#173b42]">
              标本（{category ? `分类：${category}` : '全部分类'} · {visibleSpecimens.length} 个）
              {searchLower ? <span className="ml-1 font-normal text-[#799398]">搜索“{search.trim()}”</span> : null}
            </h2>
            {category || searchLower ? (
              <button
                type="button"
                onClick={() => { setCategory(null); setSearch(''); }}
                className="rounded-full bg-[#eef7f6] px-3 py-1 text-xs font-medium text-[#4b6c73] transition-colors hover:bg-[#e2f1ef]"
              >
                清除筛选
              </button>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 xl:grid-cols-7">
            {visibleSpecimens.length === 0 ? (
              <p className="col-span-full rounded-xl border border-dashed border-[#c9dedd] bg-white px-4 py-8 text-center text-sm text-[#59767c]">
                没有匹配的标本——换个关键词或分类试试。
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

        {/* 主展示区 */}
        <section className="overflow-hidden rounded-2xl border border-[#dceaea] bg-white shadow-[0_14px_34px_rgba(18,65,72,0.09)]">
          {/* 工具栏 */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e4efee] bg-gradient-to-r from-[#f4fbfa] to-[#fbfdfd] px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0e6f75] text-lg text-white shadow-sm" aria-hidden="true">
                🔬
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-[#67858b]">
                  {category ?? '全部分类'} {category ? '·' : ''} {specimen.kicker}
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

        <p className="text-xs leading-5 text-[#799398]">
          说明：以上均为教学<span className="font-semibold">模式图</span>——细胞膜、内质网、高尔基体等细微结构需在电子显微镜下才能看清；
          图中结构位置与数量做了示意化处理，以课本插图为准。
        </p>
      </div>
    </div>
  );
}
