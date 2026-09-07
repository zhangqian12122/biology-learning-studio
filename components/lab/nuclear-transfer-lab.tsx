'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（体细胞核移植）',
    lines: [
      <>动物细胞的细胞核具有<span className="font-semibold">全能性</span>：把分化的体细胞核移入去核卵母细胞，重组细胞能发育成完整胚胎——多莉羊就是这样诞生的。</>,
      <>为什么用<span className="font-semibold">卵母细胞</span>作受体？它体积大、易操作，且细胞质中含有激发细胞核全能性的物质。</>,
      <>遗传物质的来源：<span className="font-semibold">核基因几乎全部来自供核个体</span>；细胞质中的基因（线粒体 DNA）来自提供卵母细胞的个体。</>,
    ],
  },
  {
    title: '三只羊的角色',
    lines: [
      <>A 羊（苏格兰黑面羊）：提供去核卵母细胞——细胞质来源。</>,
      <>B 羊（白面绵羊）：提供乳腺体细胞核——核基因来源。</>,
      <>C 羊：代孕母亲，提供发育场所——<span className="font-semibold">遗传物质与它无关</span>。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 从 A 羊取出卵母细胞，显微操作去除细胞核。</>,
      <>② 将 B 羊乳腺细胞的细胞核移入去核卵母细胞，电激融合并激活，培养成重组胚胎。</>,
      <>③ 把胚胎移植到 C 羊子宫内，孕育出多莉——观察它的长相像谁。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>多莉羊的长相<span className="font-semibold">像 B 羊（供核方）</span>：因为控制性状的核基因几乎都来自 B。</>,
      <>克隆属于<span className="font-semibold">无性生殖</span>：没有经过两性生殖细胞结合。</>,
      <>代孕母亲 C 羊只提供子宫环境，不提供任何遗传物质——这是判断题的高频陷阱。</>,
    ],
  },
];

type Stage = 0 | 1 | 2 | 3;

const A_COLOR = '#5a3a2a'; // A 羊细胞质（深棕）
const B_COLOR = '#4a6a9a'; // B 羊细胞核（蓝）

export function NuclearTransferLab() {
  const [stage, setStage] = useState<Stage>(0);
  const [guess, setGuess] = useState<'A' | 'B' | 'C' | null>(null);

  const step = () => setStage((s) => (Math.min(3, s + 1) as Stage));
  const reset = () => {
    setStage(0);
    setGuess(null);
  };

  const observation = (() => {
    if (stage === 0) return '三只羊已就位：A 提供卵母细胞、B 提供乳腺细胞核、C 代孕。点「开始第一步」逐段看克隆羊多莉的诞生。';
    if (stage === 1) return '第一步完成：A 羊的卵母细胞被去除了细胞核（留下"空壳"）——去核是为了腾出位置，并保留能激发全能性的细胞质。';
    if (stage === 2) return '第二步完成：B 羊乳腺细胞的核移入后电激活融合，重组细胞开始分裂成胚胎。此刻遗传信息的"总指挥"已经是 B 羊的细胞核。';
    if (!guess) return '多莉出生了！它长得最像 A、B、C 三只羊中的哪一只？点下方按钮作答。';
    if (guess === 'B') return '答对了！多莉几乎就是 B 羊的"复制品"——核基因来自 B 羊。但严格说它是 B 羊的"同卵妹妹"：细胞质基因（线粒体 DNA）来自 A 羊，且属于无性生殖。';
    if (guess === 'A') return '不对——A 羊只提供了细胞质（含少量线粒体 DNA），决定毛色、脸型等性状的核基因来自 B 羊，所以多莉像 B 羊。';
    return '不对——C 羊是代孕母亲，只提供发育的"温床"（子宫与营养），胚胎里没有任何 C 羊的遗传物质。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= 3}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '① 取 A 羊卵母细胞去核' : stage === 1 ? '② 移入 B 羊细胞核并激活' : stage === 2 ? '③ 胚胎移植到 C 羊（代孕）' : '克隆羊多莉已出生'}
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              核基因来源：<span className="font-bold text-[#3d6a94]">B 羊</span>
              <br />
              细胞质基因来源：<span className="font-bold text-[#8a5a2a]">A 羊</span>
              <br />
              代孕（不供基因）：<span className="font-bold text-[#59767c]">C 羊</span>
            </div>
            {stage >= 3 ? (
              <div>
                <p className="mb-1.5 text-sm font-medium text-[#37585f]">考考你：多莉最像谁？</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['A', 'B', 'C'] as const).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setGuess(w)}
                      className={`min-h-10 rounded-md border px-2 text-xs font-bold transition-colors ${
                        guess === w
                          ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                          : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                      }`}
                    >
                      {w} 羊
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        }
      >
        <SceneBox label="体细胞核移植流程（克隆羊多莉）" heightClass="h-[320px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* A 羊：卵母细胞 */}
            <g>
              <rect x="18" y="42" width="128" height="150" rx="14" fill="#fdf3e2" stroke="#c9a882" strokeWidth="2.4" />
              <text x="82" y="64" textAnchor="middle" fontSize="11" fill="#8a5a2a" fontWeight="700">A 羊 · 卵母细胞</text>
              {/* 卵细胞 */}
              <circle cx="82" cy="132" r="34" fill="#fbe9c8" stroke="#c9a882" strokeWidth="2.5" />
              {stage >= 1 ? (
                <text x="82" y="138" textAnchor="middle" fontSize="10.5" fill="#b0483a" fontWeight="700">已去核</text>
              ) : (
                <>
                  <circle cx="82" cy="132" r="13" fill="#e8b890" stroke="#a5603a" strokeWidth="2" />
                  <text x="82" y="136" textAnchor="middle" fontSize="8.5" fill="#7a3a1a" fontWeight="700">核</text>
                </>
              )}
              {stage >= 1 ? <text x="82" y="180" textAnchor="middle" fontSize="9" fill="#8a5a2a">细胞质（含线粒体基因）保留</text> : null}
            </g>
            {/* B 羊：体细胞核 */}
            <g>
              <rect x="168" y="42" width="120" height="150" rx="14" fill="#e8f0fa" stroke="#4d7ea8" strokeWidth="2.4" />
              <text x="228" y="64" textAnchor="middle" fontSize="11" fill="#3d6a94" fontWeight="700">B 羊 · 乳腺细胞</text>
              <circle cx="228" cy="128" r="30" fill="#f6e2d2" stroke="#a5603a" strokeWidth="2.5" />
              <circle cx="228" cy="128" r="12" fill={B_COLOR} stroke="#2c5a84" strokeWidth="2" />
              <text x="228" y="132" textAnchor="middle" fontSize="8.5" fill="#ffffff" fontWeight="700">核</text>
              {stage >= 2 ? (
                <>
                  <path d="M258 92 Q 286 76 306 66" fill="none" stroke="#4d7ea8" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#nt-arrow)" />
                  <text x="296" y="96" fontSize="9" fill="#3d6a94" fontWeight="600">核移入</text>
                </>
              ) : null}
            </g>
            {/* 重组细胞 / 胚胎 / C 羊 */}
            <g>
              <rect x="300" y="42" width="126" height="150" rx="14" fill="#eef7f0" stroke="#6aa86a" strokeWidth="2.4" />
              <text x="363" y="64" textAnchor="middle" fontSize="11" fill="#3f7f3a" fontWeight="700">
                {stage >= 3 ? 'C 羊 · 代孕（已产下多莉）' : stage >= 2 ? '重组细胞 → 胚胎' : 'C 羊 · 代孕母'}
              </text>
              {stage === 0 ? (
                <text x="363" y="120" textAnchor="middle" fontSize="9.5" fill="#8aa1a6">等待移植</text>
              ) : stage === 2 ? (
                <g>
                  <circle cx="363" cy="120" r="24" fill="#c8e2d8" stroke="#4a9a8a" strokeWidth="2.5" />
                  <circle cx="363" cy="120" r="10" fill={B_COLOR} />
                  <text x="363" y="158" textAnchor="middle" fontSize="9" fill="#3f7f3a">重组胚胎（核来自 B）</text>
                </g>
              ) : (
                <g>
                  {/* 多莉羊头像：脸（核基因 B）+ 细胞质基因提示 */}
                  <path d="M330 96 Q 326 130 344 142 L382 142 Q 400 130 396 96 Q 398 76 363 74 Q 328 76 330 96 Z" fill="#f6efe2" stroke="#b5a582" strokeWidth="3" />
                  <circle cx="350" cy="112" r="4.5" fill="#13333a" />
                  <circle cx="376" cy="112" r="4.5" fill="#13333a" />
                  <path d="M352 130 Q 363 138 374 130" fill="none" stroke="#b5a582" strokeWidth="2" />
                  <path d="M330 96 Q 322 84 330 76 M396 96 Q 404 84 396 76" fill="none" stroke="#e8dcc8" strokeWidth="6" strokeLinecap="round" />
                  <text x="363" y="160" textAnchor="middle" fontSize="9.5" fill="#8a5a2a">多莉：白脸（随 B 羊）</text>
                  <text x="363" y="176" textAnchor="middle" fontSize="8.5" fill="#8a5a2a">（细胞质基因随 A 羊）</text>
                </g>
              )}
            </g>
            {/* 步骤连线 */}
            <path d="M148 118 L166 118" stroke="#5f7076" strokeWidth="2" markerEnd="url(#nt-arrow)" />
            <path d="M290 118 L298 118" stroke="#5f7076" strokeWidth="2" markerEnd="url(#nt-arrow)" />
            <defs>
              <marker id="nt-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#5f7076" />
              </marker>
            </defs>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
