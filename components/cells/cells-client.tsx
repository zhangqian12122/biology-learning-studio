'use client';

import { useState } from 'react';

import { LAB_ONLY_SPECIMEN_IDS, SPECIMENS } from '@/components/cells/specimens';

/** 图鉴只保留"结构/模式图"类标本；实验操作类图解移到互动实验页展示。 */
const ATLAS_SPECIMENS = SPECIMENS.filter((item) => !LAB_ONLY_SPECIMEN_IDS.includes(item.id));

/** 收录原则：有特殊性的生物（含病毒）归"特色生物"，其余概念/结构归"专有名词与结构"。 */
const ORGANISM_IDS = new Set([
  'cyanobacteria',
  'yeast',
  'ecoli',
  'paramecium',
  'redBloodCell',
  'hiv',
  'fluVirus',
  'phage',
  'nitrobacteria',
  'spirogyra',
  'lactobacillus',
  'tmv',
]);
const ORGANISM_SPECIMENS = ATLAS_SPECIMENS.filter((item) => ORGANISM_IDS.has(item.id));
const CONCEPT_SPECIMENS = ATLAS_SPECIMENS.filter((item) => !ORGANISM_IDS.has(item.id));

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

  const specimen = ATLAS_SPECIMENS.find((item) => item.id === specimenId) ?? ATLAS_SPECIMENS[0];
  const SpecimenSvg = specimen.Svg;
  const isStoma = specimen.id === 'stoma';
  const selectedPart = activePart == null ? null : specimen.parts[activePart];

  return (
    <div>
      <style>{CELL_KEYFRAMES}</style>

      <div className="mb-5">
        <p className="text-xs font-semibold tracking-[0.1em] text-[#398086]">CELL ATLAS</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-normal text-[#13333a] sm:text-3xl">
          图鉴：把结构看清楚
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#59767c]">
          图鉴收录两类内容：<span className="font-semibold text-[#0a626a]">特色生物</span>（蓝细菌、玉米、烟草花叶病毒这类"有故事"的生物与病毒）
          和<span className="font-semibold text-[#0a626a]">专有名词与结构</span>（DNA、染色体、抗体、细胞器……）。
          点图中的编号或右侧的结构名，对应结构会高亮并显示功能说明；实验操作类图解已移到互动实验页。
        </p>
      </div>

      <div className="space-y-5">
        {/* 标本选择：特色生物 */}
        <section className="rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] p-3 shadow-[0_12px_30px_rgba(18,65,72,0.06)]">
          <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
            🦠 特色生物与病毒（{ORGANISM_SPECIMENS.length} 个）
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
            {ORGANISM_SPECIMENS.map((item) => {
              const current = item.id === specimenId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSpecimenId(item.id);
                    setActivePart(null);
                    setUseWebGL(false);
                  }}
                  aria-pressed={current}
                  className={`flex min-h-11 flex-col items-center justify-center rounded-md border px-2 py-1.5 text-xs font-semibold transition-colors ${
                    current
                      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                  }`}
                >
                  {item.name}
                  <span className="mt-0.5 block text-[10px] font-normal opacity-70">
                    {item.extension ? '⚡ 课外拓展' : item.kicker.split(' · ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 标本选择：专有名词与结构 */}
        <section className="rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] p-3 shadow-[0_12px_30px_rgba(18,65,72,0.06)]">
          <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
            🧬 专有名词与结构（{CONCEPT_SPECIMENS.length} 个）
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
            {CONCEPT_SPECIMENS.map((item) => {
              const current = item.id === specimenId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSpecimenId(item.id);
                    setActivePart(null);
                    setUseWebGL(false);
                  }}
                  aria-pressed={current}
                  className={`flex min-h-11 flex-col items-center justify-center rounded-md border px-2 py-1.5 text-xs font-semibold transition-colors ${
                    current
                      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                  }`}
                >
                  {item.name}
                  <span className="mt-0.5 block text-[10px] font-normal opacity-70">
                    {item.extension ? '⚡ 课外拓展' : item.kicker.split(' · ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 图 + 结构列表 */}
        <section className="grid gap-5 rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] p-4 shadow-[0_12px_30px_rgba(18,65,72,0.06)] sm:p-5 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs text-[#638087]">{specimen.kicker}</p>
                <h2 className="text-lg font-semibold text-[#173b42]">{specimen.name}结构图</h2>
              </div>
              {isStoma ? (
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setStomaOpen(true)}
                    aria-pressed={stomaOpen}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      stomaOpen ? 'bg-[#0e6f75] text-white' : 'bg-[#eef7f6] text-[#4b6c73] hover:bg-[#e2f1ef]'
                    }`}
                  >
                    吸水 · 张开
                  </button>
                  <button
                    type="button"
                    onClick={() => setStomaOpen(false)}
                    aria-pressed={!stomaOpen}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      !stomaOpen ? 'bg-[#b0483a] text-white' : 'bg-[#eef7f6] text-[#4b6c73] hover:bg-[#e2f1ef]'
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
                      !useWebGL ? 'bg-[#0e6f75] text-white' : 'bg-[#eef7f6] text-[#4b6c73] hover:bg-[#e2f1ef]'
                    }`}
                  >
                    教学剖面
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseWebGL(true)}
                    aria-pressed={useWebGL}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      useWebGL ? 'bg-[#0e6f75] text-white' : 'bg-[#eef7f6] text-[#4b6c73] hover:bg-[#e2f1ef]'
                    }`}
                  >
                    实景 3D
                  </button>
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => setActivePart(null)}
                className="rounded-md border border-[#cbdede] bg-white px-3 py-1.5 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
              >
                取消高亮
              </button>
            </div>

            <div className="relative min-w-0 overflow-hidden rounded-md border border-[#dceaea] bg-gradient-to-b from-[#f2fafa] to-[#e7f3f1]">
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
              <p className="mt-2 text-xs leading-5 text-[#799398]">
                演示原理：保卫细胞<span className="font-semibold">吸水膨胀</span> → 薄的外壁向外弯曲，增厚的内壁被拉开 → 气孔张开；
                <span className="font-semibold">失水</span> → 两细胞回落靠拢 → 气孔闭合。一般白天张开、夜间闭合。
              </p>
            ) : null}
          </div>

          <div className="min-w-0">
            <p className="text-sm leading-6 text-[#49676d]">{specimen.intro}</p>
            <p className="mt-3 mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
              结构清单（点按查看功能，共 {specimen.parts.length} 项）
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-1">
              {specimen.parts.map((part, index) => {
                const current = activePart === index;
                return (
                  <button
                    key={part.name}
                    type="button"
                    onClick={() => setActivePart(current ? null : index)}
                    aria-pressed={current}
                    className={`flex items-center gap-2 rounded-md border px-2.5 py-2.5 text-left text-xs font-medium transition-colors ${
                      current
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        current ? 'bg-[#0e6f75] text-white' : 'bg-[#e8f4f3] text-[#0c696f]'
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
              className={`mt-3 rounded-md border px-3 py-3 transition-colors ${
                selectedPart ? 'border-[#82c6c0] bg-[#f2faf9]' : 'border-dashed border-[#cbdede] bg-[#f9fcfc]'
              }`}
            >
              {selectedPart ? (
                <>
                  <p className="text-sm font-semibold text-[#0a626a]">
                    {activePart != null ? ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'][activePart] : ''} {selectedPart.name}
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
        </section>

        <p className="text-xs leading-5 text-[#799398]">
          说明：以上均为教学<span className="font-semibold">模式图</span>——细胞膜、内质网、高尔基体等细微结构需在电子显微镜下才能看清；
          图中结构位置与数量做了示意化处理，以课本插图为准。
        </p>
      </div>
    </div>
  );
}
