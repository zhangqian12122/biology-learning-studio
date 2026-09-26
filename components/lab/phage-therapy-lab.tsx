'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（噬菌体治疗）',
    lines: [
      <>噬菌体是<span className="font-semibold">专门感染细菌的病毒</span>：它像"精准导弹"一样吸附并注入核酸，在细菌内大量复制，最终裂解细菌。</>
      ,
      <>超级细菌时代：抗生素滥用催生了<span className="font-semibold">多重耐药菌</span>，抗生素"失灵"——噬菌体治疗重新受到重视（"以菌治菌"的病毒版）。</>
      ,
      <>与抗生素的区别：抗生素是"广谱轰炸"（好坏通杀），噬菌体是<span className="font-semibold">"精确制导"</span>（只攻击特定细菌）、能随细菌增殖自我扩增、且不伤害人体细胞。</>
      ,
    ],
  },
  {
    title: '治疗的"鸡尾酒"策略',
    lines: [
      <>细菌会通过<span className="font-semibold">变异</span>产生抗性——单一种噬菌体容易"脱靶失效"。</>
      ,
      <>"噬菌体鸡尾酒"：把多种噬菌体混合使用——细菌逃过一种，还有"后援部队"。</>
      ,
      <>个性化治疗：针对患者感染的菌株<span className="font-semibold">现配现用</span>（筛选噬菌体组合）——精准医疗的极致。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>噬菌体治疗的局限：谱系太窄（需要先鉴定病原菌）、可能引起免疫清除、细菌也会进化出抗性——"军备竞赛"仍在继续。</>
      ,
      <>联系课本：噬菌体侵染实验（赫尔希-蔡斯）证明 DNA 是遗传物质；CRISPR 系统最初就是细菌对抗噬菌体的"免疫系统"。</>
      ,
      <>应用拓展：食品保鲜（抑制致病菌）· 农业防病（喷洒噬菌体）· 污水处理——病毒也有"善用"的一面。</>
      ,
    ],
  },
];

type Treatment = 'antibiotic' | 'phage';

export function PhageTherapyLab() {
  const [treatment, setTreatment] = useState<Treatment | 'none'>('none');
  const [bacteria, setBacteria] = useState<number[]>([100]);
  const [day, setDay] = useState(0);

  const step = () => {
    if (day >= 6) return;
    const b = bacteria[bacteria.length - 1];
    let nb = b;
    if (treatment === 'antibiotic') nb = b * 1.4; // 抗药菌存活并繁殖
    else if (treatment === 'phage') nb = Math.max(1, b * 0.2); // 噬菌体持续裂解
    else nb = b * 1.7;
    setBacteria((prev) => [...prev, nb]);
    setDay((d) => d + 1);
  };

  const reset = () => {
    setBacteria([100]);
    setDay(0);
  };

  const cur = bacteria[bacteria.length - 1];

  const observation = (() => {
    if (treatment === 'none')
      return `超级细菌感染中（细菌量 ${cur.toFixed(0)}）。不治疗的话细菌每 20 分钟翻倍——选择一种"武器"开始治疗。`;
    if (treatment === 'antibiotic')
      return `第 ${day} 天：常规抗生素对耐药菌"无能为力"——细菌继续繁殖到 ${cur.toFixed(0)}。这就是"超级细菌"的可怕：选择压力让抗性菌株存活并扩散。`;
    return `第 ${day} 天：噬菌体"精确制导"持续裂解细菌——细菌量降到 ${cur.toFixed(0)}。噬菌体随细菌增殖自我扩增，且能追上细菌的变异（共同演化"军备赛"）。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择治疗方式</p>
              <div className="grid gap-1.5">
                <button
                  type="button"
                  onClick={() => { setTreatment('antibiotic'); setDay(0); setBacteria([100]); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${treatment === 'antibiotic' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  常规抗生素（耐药菌感染）
                </button>
                <button
                  type="button"
                  onClick={() => { setTreatment('phage'); setDay(0); setBacteria([100]); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${treatment === 'phage' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  噬菌体鸡尾酒治疗
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={day >= 6}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一天（{day}/6）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置感染
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              细菌量：<span className="text-base font-bold text-[#b0483a]">{cur.toFixed(0)}</span>（相对值）
            </div>
          </>
        }
      >
        <SceneBox label="噬菌体治疗 vs 抗生素（细菌量模拟）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 噬菌体示意 */}
            <g>
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <path d={`M${70 + i * 60} 60 v 22`} stroke="#4d7ea8" strokeWidth="3.4" strokeLinecap="round" />
                  <circle cx={70 + i * 60} cy={54} r="11" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="2" />
                  {[0, 1, 2].map((j) => (
                    <path key={j} d={`M${64 + i * 60 + j * 7} 84 l ${j * 4 - 4} 8`} stroke="#2c5a84" strokeWidth="2.2" strokeLinecap="round" />
                  ))}
                </g>
              ))}
              <text x="220" y="120" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">噬菌体：吸附 → 注入核酸 → 复制 → 裂解</text>
            </g>
            {/* 对比条 */}
            {[
              { label: '常规抗生素', v: treatment === 'antibiotic' ? cur : treatment === 'none' ? 100 : 30, c: '#a54838' },
              { label: '噬菌体治疗', v: treatment === 'phage' ? cur : 60, c: '#3f7f3a' },
            ].map((row, i) => (
              <g key={row.label}>
                <text x="60" y={176 + i * 36} fontSize="11" fill="#37585f" fontWeight="700">{row.label}</text>
                <rect x="190" y={162 + i * 36} width={Math.min(210, row.v * 2.1)} height="20" rx="5" fill={row.c} opacity="0.85" />
                <text x={Math.min(210, row.v * 2.1) + 198} y={177 + i * 36} fontSize="10" fill="#37585f" fontWeight="700">{row.v.toFixed(0)}</text>
              </g>
            ))}
            <text x="220" y="252" textAnchor="middle" fontSize="10" fill="#799398">噬菌体"鸡尾酒"：多种噬菌体混合，细菌难以同时抗性</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
