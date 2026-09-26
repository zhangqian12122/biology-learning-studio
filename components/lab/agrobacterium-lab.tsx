'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（农杆菌转化法）',
    lines: [
      <>农杆菌本是一种<span className="font-semibold">弱寄生土壤菌</span>：它天然能感染植物伤口，把体内 Ti 质粒上的 <span className="font-semibold">T-DNA 段</span>转移并整合进植物细胞的染色体——让植物长出它"想让它长"的组织。</>
      ,
      <>科学家"策反"了这条通路：<span className="font-semibold">拆掉致瘤基因、装上目的基因</span>（如 Bt 抗虫基因），T-DNA 就变成"基因快递车"，把有用基因送进植物染色体。</>
      ,
      <>五步流程：<span className="font-semibold">构建重组质粒 → 转入农杆菌 → 侵染植物伤口 → T-DNA 整合 → 筛选检测</span>——转基因抗虫棉就是这样育成的。</>
      ,
    ],
  },
  {
    title: '为什么偏偏选农杆菌',
    lines: [
      <>植物基因工程的"导入"是难点：农杆菌法胜在<span className="font-semibold">天然高效且整合稳定</span>——T-DNA 装进染色体后能随细胞分裂传给后代。</>
      ,
      <>对双子叶植物（棉花·番茄·烟草）效果好；单子叶（水稻·小麦）不敏感，改用<span className="font-semibold">基因枪法</span>或花粉管通道法。</>
      ,
      <>其他导入法对比：<span className="font-semibold">显微注射</span>（动物细胞）、<span className="font-semibold">Ca²⁺ 处理法</span>（微生物感受态）——受体不同，"快递方式"不同。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>Ti 质粒要改造：<span className="font-semibold">保留 T-DNA（可转移）、切除致瘤基因</span>——"卸货能力"留下、"致病能力"拆走。</>
      ,
      <>检测分三层：<span className="font-semibold">分子检测</span>（DNA 分子杂交/抗原-抗体杂交/抗性接种）——课本强调"检测"与"筛选"不能省。</>
      ,
      <>农杆菌转化法是<span className="font-semibold">将目的基因导入植物细胞</span>最常用的方法——与"基因枪""花粉管通道"并称植物三大导入途径。</>
      ,
    ],
  },
];

const STEP_NAMES = [
  '准备：目的基因 + Ti 质粒',
  '第 1 步：构建重组质粒',
  '第 2 步：导入农杆菌',
  '第 3 步：侵染植物伤口',
  '第 4 步：T-DNA 整合染色体',
  '第 5 步：筛选与检测',
];

export function AgrobacteriumLab() {
  const [step, setStep] = useState(0);

  const reset = () => setStep(0);

  const observation = (() => {
    if (step === 0)
      return '图中黄色段是 Ti 质粒上的 T-DNA（可转移区），绿色段是要送入植物的 Bt 抗虫基因。按"推进"开始五步投递流程——看"土壤细菌"如何变身"基因快递员"。';
    if (step === 1)
      return '第 1 步：用同种限制酶切割目的基因与 Ti 质粒，DNA 连接酶把 Bt 基因拼进 T-DNA 段——重组质粒完工（注意：致瘤基因已被拆除）。';
    if (step === 2)
      return '第 2 步：重组质粒转入农杆菌——细菌经 Ca²⁺ 处理成"感受态"，主动地吸收外源 DNA。现在它成了一辆装好货的"快递车"。';
    if (step === 3)
      return '第 3 步：农杆菌涌向植物伤口（伤口分泌酚类化合物是它的"门铃"），把 T-DNA 连同 Bt 基因"注射"进植物细胞。';
    if (step === 4)
      return '第 4 步：T-DNA 精准找到植物染色体并整合进去——Bt 基因从此成为棉花遗传物质的一部分，能随细胞分裂传给子细胞。';
    return '第 5 步：含目的基因的细胞经植物组织培养再生为幼苗——分子检测确认基因在、抗虫接种确认"真能抗虫"。转基因抗虫棉育成！';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前阶段：<span className="font-bold text-[#0a626a]">{STEP_NAMES[step]}</span>
              <br />
              <span className="text-[#799398]">农杆菌转化法 = 天然"基因快递"系统的改造利用</span>
            </div>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              disabled={step >= 5}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进下一步（{step}/5）
            </button>
            <button
              type="button"
              onClick={reset}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重置
            </button>
            <div className="rounded-md border border-[#d9e7e7] bg-white px-3 py-2.5 text-[10.5px] leading-4 text-[#799398]">
              考点提示：T-DNA = 转移的关键；致瘤基因必须拆除；单子叶植物常用基因枪法。
            </div>
          </>
        }
      >
        <SceneBox label="农杆菌转化法：五步把 Bt 基因送进棉花" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 步骤标签 */}
            <text x="220" y="26" textAnchor="middle" fontSize="12.5" fill="#0e6f75" fontWeight="800">{STEP_NAMES[step]}</text>

            {/* 游离的目的基因（始终显示，第 1 步后并入质粒） */}
            {step === 0 && (
              <g>
                <rect x="40" y="70" width="120" height="16" rx="8" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" />
                <text x="100" y="60" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="700">Bt 抗虫基因</text>
              </g>
            )}

            {/* Ti 质粒（0~2 步显示环） */}
            {step <= 2 && (
              <g>
                <circle cx="300" cy="120" r="52" fill="none" stroke="#8a9a9f" strokeWidth="9" />
                <path d="M300 68 A 52 52 0 0 1 351 105" fill="none" stroke="#e8c83a" strokeWidth="11" strokeLinecap="round" />
                <text x="300" y="118" textAnchor="middle" fontSize="11" fill="#59767c">Ti 质粒</text>
                <text x="398" y="86" textAnchor="end" fontSize="11.5" fill="#8a671b" fontWeight="700">黄色 = T-DNA 段</text>
                {step >= 1 && (
                  <g>
                    <path d="M320 72 A 52 52 0 0 1 338 78" fill="none" stroke="#4aa54a" strokeWidth="12" strokeLinecap="round" />
                    <text x="398" y="106" textAnchor="end" fontSize="11.5" fill="#2f6f2a" fontWeight="700">绿色 = 装上的 Bt 基因</text>
                  </g>
                )}
              </g>
            )}

            {/* 农杆菌（2~3 步） */}
            {step >= 2 && step <= 3 && (
              <g>
                <rect x="40" y="150" width="150" height="52" rx="26" fill="#c9e0ef" stroke="#3a6a8a" strokeWidth="2.4" />
                {[0, 1, 2].map((i) => (
                  <path key={i} d={`M40 ${164 + i * 13} q -18 -4 -26 ${i === 1 ? 4 : -2}`} fill="none" stroke="#3a6a8a" strokeWidth="2.4" strokeLinecap="round" />
                ))}
                <circle cx="115" cy="176" r="14" fill="none" stroke="#8a671b" strokeWidth="4" />
                {step >= 2 && <path d="M104 172 A 14 14 0 0 1 118 163" fill="none" stroke="#4aa54a" strokeWidth="5.5" />}
                <text x="115" y="222" textAnchor="middle" fontSize="12" fill="#3a6a8a" fontWeight="700">农杆菌（+ 重组质粒）</text>
                {step === 3 && (
                  <g>
                    <path d="M92 202 q 0 18 18 22" fill="none" stroke="#e8c83a" strokeWidth="4" strokeDasharray="5 3" />
                    <text x="118" y="248" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="700">T-DNA 送入植物细胞</text>
                  </g>
                )}
              </g>
            )}

            {/* 植物细胞（3 步起显示） */}
            {step >= 3 && (
              <g>
                <rect x="270" y="160" width="130" height="100" rx="14" fill="#eaf4e2" stroke="#5a9a3a" strokeWidth="3" />
                <circle cx="335" cy="210" r="22" fill="#f2e2c9" stroke="#a5761d" strokeWidth="2.2" />
                {step >= 4 ? (
                  <g>
                    <path d="M316 206 q 10 -6 18 2 q 10 8 20 2" fill="none" stroke="#4d7ea8" strokeWidth="3.4" />
                    <path d="M316 216 q 10 -6 18 2 q 10 8 20 2" fill="none" stroke="#4d7ea8" strokeWidth="3.4" />
                    <path d="M322 205 l 12 12" fill="none" stroke="#4aa54a" strokeWidth="5" strokeLinecap="round" />
                    <text x="335" y="250" textAnchor="middle" fontSize="11.5" fill="#2f6f2a" fontWeight="700">Bt 基因已并入染色体</text>
                  </g>
                ) : (
                  <text x="335" y="250" textAnchor="middle" fontSize="11.5" fill="#59767c">棉花细胞（染色体待整合）</text>
                )}
                <text x="335" y="152" textAnchor="middle" fontSize="12" fill="#3a5a7a">{step >= 4 ? '整合完成 → 组织培养' : '伤口处细胞被侵染'}</text>
              </g>
            )}

            {/* 最终检测：发光幼苗 */}
            {step >= 5 && (
              <g>
                <path d="M120 258 L120 226 M120 236 q -14 -4 -18 -18 q 16 -2 18 12 M120 244 q 14 -2 18 -16 q -16 -4 -18 10" fill="none" stroke="#3f8a3f" strokeWidth="4.4" strokeLinecap="round" />
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx={104 + i * 18} cy={208 + (i % 2) * 8} r="4" fill="#8ee06a" opacity="0.9" />
                ))}
                <text x="120" y="282" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="700">抗虫检测通过 · 抗虫棉育成</text>
              </g>
            )}

            {/* 底部流程条 */}
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <circle cx={60 + i * 80} cy={288} r="7" fill={step > i ? '#0e8a75' : '#d9e7e7'} stroke="#8aa8a8" strokeWidth="1.4" />
                {i < 4 && <line x1={67 + i * 80} y1={288} x2={125 + i * 80} y2={288} stroke={step > i ? '#0e8a75' : '#d9e7e7'} strokeWidth="3" />}
              </g>
            ))}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
